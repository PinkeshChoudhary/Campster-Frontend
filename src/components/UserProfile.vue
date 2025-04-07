<template>
<div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-300 ease-out">
    <div class="bg-gray-900 p-8 rounded-2xl shadow-2xl w-96 relative overflow-hidden transform transition-all scale-100 hover:scale-105 border border-gray-700">
        <!-- Close Button -->
        <button @click="closePopup" class="absolute top-4 right-4 text-gray-400 hover:text-gray-300 focus:outline-none transition duration-200 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <!-- Title -->
        <!-- Avatar with Circular Progress -->
        <div class="relative flex justify-center mb-6">
            <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path class="text-gray-700" stroke-width="4" fill="none" stroke="currentColor" d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path :stroke-dasharray="completion + ', 100'" class="text-yellow-500" stroke-width="4" fill="none" stroke-linecap="round" stroke="currentColor" d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <img :src="avatarUrl" class="w-16 h-16 rounded-full absolute top-4" />
        </div>

        <!-- Input Fields -->
        <div class="space-y-4">
            <input v-model="userStore.name" placeholder="Full Name" class="input-field" />
            <input v-model="dob" type="date" placeholder="DOB" class="input-field" />
            <input v-model="userStore.email" placeholder="Email Address" class="input-field" />
            <input v-model="userStore.phone" disabled class="input-field bg-gray-800 text-gray-500 cursor-not-allowed" />
            <select v-model="userStore.gender" class="input-field bg-gray-800 text-white">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>

        <!-- Save Button -->
        <button @click="saveProfile" class="w-full mt-6 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
            Save Profile
        </button>
    </div>
</div>
</template>

<script>
import {
    ref,
    onMounted,
    computed
} from "vue";
import axios from "axios";
import {
    getAuth
} from "firebase/auth";
import {
    useRouter
} from "vue-router";
import {
    useUserStore
} from "../store/user";

export default {
    setup() {
        const auth = getAuth();
        const showPopup = ref(true);
        const dob = ref("");
        const userStore = useUserStore();
        const router = useRouter();

        const avatarUrl = ref(`https://avatars.dicebear.com/api/avataaars/${Math.random().toString(36).substring(7)}.svg`);
        const completion = computed(() => {
      let filled = 0;
      if (userStore.name) filled++;
      if (dob.value) filled++;
      if (userStore.email) filled++;
      if (userStore.phone) filled++;
      if (userStore.gender) filled++;
      return Math.round((filled / 5) * 100);
    });

        onMounted(async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    userStore.phone = user.phoneNumber;
                    try {
                        const {
                            data
                        } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${user.uid}`);
                        if (data.success) {
                            userStore.name = data.user.name || "";
                            dob.value = data.user.dob ? data.user.dob.split("T")[0] : "";
                            userStore.email = data.user.email || "";
                            userStore.gender = data.user.gender || "";
                            if (data.user.avatarUrl) avatarUrl.value = data.user.avatarUrl;
                        } else {
                            showPopup.value = true;
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
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
                uid: user.uid,
                name: userStore.name,
                dob: dob.value,
                email: userStore.email,
                gender: userStore.gender,
                phone: userStore.phone,
                avatarUrl: avatarUrl.value,
            });
            showPopup.value = false;
            router.push("/");
        };

        const closePopup = () => {
            showPopup.value = false;
            router.push("/");
        };

        return {
            showPopup,
            dob,
            saveProfile,
            closePopup,
            userStore,
            avatarUrl,
            completion
        };
    },
};
</script>

<style scoped>
.input-field {
    width: 100%;
    padding: 12px;
    color: #f9f9f9;
    background-color: #1f2937;
    border: 2px solid #374151;
    border-radius: 12px;
    outline: none;
    transition: all 0.3s ease-in-out;
}

.input-field:focus {
    border-color: #f59e0b;
    background-color: #111827;
    box-shadow: 0px 0px 10px rgba(245, 158, 11, 0.5);
}
</style>
