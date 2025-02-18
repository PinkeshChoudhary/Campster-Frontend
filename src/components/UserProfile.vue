<template>
  <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 transition-opacity duration-300 ease-out">
    <div class="bg-gray-100 p-8 rounded-xl shadow-lg w-96 relative overflow-hidden">
      <!-- Close Button -->
      <button 
        @click="closePopup" 
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none transition duration-200 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Title -->
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-700">Complete Your Profile</h2>
      
      <!-- Input Fields -->
      <div class="space-y-4">
        <input v-model="userStore.name" placeholder="Full Name" class="input-field" />
        <input v-model="dob" type="date" class="input-field" />
        <input v-model="userStore.email" placeholder="Email Address" class="input-field" />
        <input v-model="userStore.phone" disabled class="input-field bg-gray-200 text-gray-500" />
      </div>

      <!-- Save Button -->
      <button @click="saveProfile"
        class="w-full mt-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out">
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
import { useUserStore } from "../store/user"; // Import the store

export default {
  setup() {
    const auth = getAuth();
    const showPopup = ref(true);
    const dob = ref("");
    const userStore = useUserStore(); // Use the user store
    const router = useRouter();

    onMounted(async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          userStore.phone = user.phoneNumber; // Pre-fill phone from Firebase
          try {
            const { data } = await axios.get(`http://localhost:5000/api/user/${user.uid}`);
            if (data.success) {
              userStore.name = data.user.name || "";
              dob.value = data.user.dob ? data.user.dob.split("T")[0] : "";
              userStore.email = data.user.email || "";
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
        name: userStore.name,
        dob: dob.value,
        email: userStore.email,
        phone: userStore.phone, // Use pre-filled phone
      });
      showPopup.value = false;
      router.push("/"); // Navigate to home route
    };

    const closePopup = () => {
      showPopup.value = false;
      router.push("/"); // Navigate to home route
    };

    return { showPopup, dob, saveProfile, closePopup, userStore };
  },
};
</script>
