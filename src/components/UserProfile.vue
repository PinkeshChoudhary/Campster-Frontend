<template>
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 class="text-2xl font-semibold text-center mb-4">Complete Your Profile</h2>
        
        <div class="space-y-3">
          <input v-model="name" placeholder="Name" class="input-field" />
          <input v-model="dob" type="date" class="input-field" />
          <input v-model="email" placeholder="Email" class="input-field" />
          <input v-model="phone" disabled class="input-field bg-gray-100 text-gray-500" />
        </div>
  
        <button @click="saveProfile"
          class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
          Save
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { getAuth } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const auth = getAuth();
      const showPopup = ref(true);
      const name = ref("");
      const dob = ref("");
      const email = ref("");
      const phone = ref(""); // Store mobile number from Firebase
      const router = useRouter();
  
      onMounted(async () => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            phone.value = user.phoneNumber; // Pre-fill phone from Firebase
            try {
              const { data } = await axios.get(`http://localhost:5000/api/user/${user.uid}`);
              if (data.success) {
                name.value = data.user.name || "";
                dob.value = data.user.dob ? data.user.dob.split("T")[0] : "";
                email.value = data.user.email || "";
              } else {
                showPopup.value = true; // Show popup if user data is missing
              }
            } catch (error) {
              console.error("Error fetching user:", error);
              showPopup.value = true;
            }
          }
        });
      });
  
      const saveProfile = async () => {
        const user = auth.currentUser;
        await axios.post("http://localhost:5000/api/user", {
          uid: user.uid,
          name: name.value,
          dob: dob.value,
          email: email.value,
          phone: phone.value, // Use pre-filled phone
        });
        showPopup.value = false;
        router.push("/");
      };
  
      return { showPopup, name, dob, email, phone, saveProfile };
    },
  };
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 10px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .input-field:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
  }
  </style>
  