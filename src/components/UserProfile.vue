<template>
<div class="min-h-screen bg-black p-4 pt-20 pb-20">
    <div class="max-w-3xl mx-auto">
        <!-- Header Section -->
        <div class="bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700 mb-8">
            <div class="relative p-8">
                <!-- Title -->
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                        👤 User Profile
                    </h1>
                    <p class="text-gray-400 text-sm">Manage your personal information and preferences</p>
                </div>

                <!-- Avatar with Progress Ring -->
                <div class="relative flex justify-center mb-6">
                    <div class="relative">
                        <!-- Progress Ring -->
                        <svg class="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                            <path class="text-gray-700" stroke-width="2" fill="none" stroke="currentColor" d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path :stroke-dasharray="completion + ', 100'" class="text-yellow-400 transition-all duration-700 ease-out" stroke-width="2.5" fill="none" stroke-linecap="round" stroke="currentColor" d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <!-- Avatar -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="relative">
                                <img :src="avatarUrl" class="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-xl bg-white" />
                                <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-black">
                                    <svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <!-- Progress Percentage -->
                        <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-black">
                            {{ completion }}% Complete
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Form Section -->
        <div class="bg-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            <!-- Form Header -->
            <div class="bg-black p-6 border-b border-gray-700">
                <h2 class="text-xl font-semibold text-white flex items-center gap-3">
                    <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    Personal Information
                </h2>
                <p class="text-gray-400 text-sm mt-1">Update your profile details below</p>
            </div>

            <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Full Name -->
                    <div class="form-group md:col-span-2">
                        <label class="form-label">
                            <div class="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
                                <svg class="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            Full Name
                        </label>
                        <input v-model="userStore.name" placeholder="Enter your full name" class="input-field" />
                    </div>

                    <!-- Date of Birth -->
                    <div class="form-group">
                        <label class="form-label">
                            <div class="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
                                <svg class="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            Date of Birth
                        </label>
                        <input v-model="dob" type="date" class="input-field" />
                    </div>

                    <!-- Gender -->
                    <div class="form-group">
                        <label class="form-label">
                            <div class="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
                                <svg class="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            Gender
                        </label>
                        <select v-model="userStore.gender" class="input-field">
                            <option value="" disabled>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <!-- Email -->
                    <div class="form-group md:col-span-2">
                        <label class="form-label">
                            <div class="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
                                <svg class="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            Email Address
                        </label>
                        <input v-model="userStore.email" type="email" placeholder="Enter your email address" class="input-field" />
                    </div>

                    <!-- Phone (Disabled) -->
                    <div class="form-group md:col-span-2">
                        <label class="form-label">
                            <div class="w-5 h-5 bg-gray-500 rounded flex items-center justify-center">
                                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            Phone Number
                            <span class="ml-2 px-2 py-1 bg-green-500 text-black text-xs rounded-full font-medium">Verified</span>
                        </label>
                        <input v-model="userStore.phone" disabled class="input-field input-disabled" />
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
                    <button @click="goBack" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-600">
                        <span class="flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </span>
                    </button>
                    <button @click="saveProfile" class="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg shadow-yellow-400/20">
                        <span class="flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Save Profile
                        </span>
                    </button>
                </div>
            </div>
        </div>
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
        const dob = ref("");
        const userStore = useUserStore();
        const router = useRouter();

        const seed = Math.random().toString(36).substring(7);
        const avatarUrl = ref(`https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`);

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
                        }
                    } catch (error) {
                        console.error("Error fetching user:", error);
                    }
                }
            });
        });

        const saveProfile = async () => {
            try {
                const user = auth.currentUser;
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
                    uid: user.uid,
                    name: userStore.name,
                    dob: dob.value,
                    email: userStore.email,
                    gender: userStore.gender,
                    phone: userStore.phone,
                });
                // Show success message or redirect
                router.push("/");
            } catch (error) {
                console.error("Error saving profile:", error);
            }
        };

        const goBack = () => {
            router.go(-1);
        };

        return {
            dob,
            saveProfile,
            goBack,
            userStore,
            avatarUrl,
            completion
        };
    },
};
</script>

<style scoped>
.form-group {
    @apply space-y-3;
}

.form-label {
    @apply flex items-center gap-3 text-sm font-semibold text-white mb-3;
}

.input-field {
    @apply w-full px-4 py-4 bg-black border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400;
}

.input-field:focus {
    @apply bg-gray-900 shadow-xl shadow-yellow-400/10 transform scale-[1.01];
}

.input-field:hover:not(:disabled) {
    @apply border-gray-600 bg-gray-900;
}

.input-disabled {
    @apply bg-gray-800 text-gray-500 cursor-not-allowed border-gray-600 opacity-60;
}

.input-disabled:focus {
    @apply ring-0 scale-100 shadow-none border-gray-600;
}

.input-disabled:hover {
    @apply border-gray-600 bg-gray-800;
}

/* Custom dropdown arrow for select */
select.input-field {
    @apply appearance-none bg-no-repeat;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 1rem center;
    background-size: 1.25em 1.25em;
    padding-right: 3rem;
}

/* Smooth animations */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.form-group {
    animation: slideInUp 0.4s ease-out forwards;
    opacity: 0;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }

/* Focus within form group */
.form-group:focus-within .form-label {
    @apply text-yellow-400;
}

.form-group:focus-within .form-label > div {
    @apply bg-yellow-300 scale-110;
}

/* Input field focus states */
.input-field::placeholder {
    @apply text-gray-600;
}

.input-field:focus::placeholder {
    @apply text-gray-500;
}

/* Button hover effects */
button:hover {
    @apply shadow-lg;
}


/* Avatar glow effect */
img {
    @apply transition-all duration-300;
}

img:hover {
    @apply shadow-2xl shadow-yellow-400/30;
}

/* Progress ring animation */
svg path {
    @apply transition-all duration-700 ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    @apply bg-gray-900;
}

::-webkit-scrollbar-thumb {
    @apply bg-gray-700 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-yellow-400;
}
</style>
