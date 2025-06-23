<template>
<div class="min-h-screen bg-black p-4 pt-20 pb-20">
    <div class="max-w-2xl mx-auto">
        <!-- Header Section -->
        <div class="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800 mb-6">
            <div class="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 pb-20">
                <!-- Title -->
                <div class="text-center mb-6">
                    <p class="text-white/80 text-base">Manage your personal information</p>
                </div>

                <!-- Avatar with Progress Ring -->
                <div class="relative flex justify-center">
                    <div class="relative">
                        <!-- Progress Ring -->
                        <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path class="text-white/30" stroke-width="3" fill="none" stroke="currentColor" d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path :stroke-dasharray="completion + ', 100'" class="text-white transition-all duration-500" stroke-width="3" fill="none" stroke-linecap="round" stroke="currentColor" d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <!-- Avatar -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <img :src="avatarUrl" class="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white" />
                        </div>
                        <!-- Progress Percentage -->
                        <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-yellow-600 text-sm font-bold px-3 py-1 rounded-full shadow-md">
                            {{ completion }}% Complete
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form Section -->
        <div class="bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 p-8">
            <div class="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700">
                <div class="space-y-5">
                    <!-- Full Name -->
                    <div class="form-group">
                        <label class="form-label">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Full Name
                        </label>
                        <input v-model="userStore.name" placeholder="Enter your full name" class="input-field" />
                    </div>

                    <!-- Date of Birth -->
                    <div class="form-group">
                        <label class="form-label">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Date of Birth
                        </label>
                        <input v-model="dob" type="date" class="input-field" />
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                        <label class="form-label">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email Address
                        </label>
                        <input v-model="userStore.email" type="email" placeholder="Enter your email" class="input-field" />
                    </div>

                    <!-- Phone (Disabled) -->
                    <div class="form-group">
                        <label class="form-label text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Phone Number (Verified)
                        </label>
                        <input v-model="userStore.phone" disabled class="input-field input-disabled" />
                    </div>

                    <!-- Gender -->
                    <div class="form-group">
                        <label class="form-label">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            Gender
                        </label>
                        <select v-model="userStore.gender" class="input-field">
                            <option value="" disabled>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4 mt-10">
                    <button @click="goBack" class="flex-1 bg-gray-700 text-gray-300 font-medium py-4 px-6 rounded-xl transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancel
                    </button>
                    <button @click="saveProfile" class="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg">
                        Save Profile
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
    @apply space-y-2;
}

.form-label {
    @apply flex items-center gap-2 text-sm font-medium text-gray-300 mb-2;
}

.input-field {
    @apply w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent;
}

.input-field:focus {
    @apply bg-gray-600 shadow-lg transform scale-[1.01];
}

.input-disabled {
    @apply bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700;
}

.input-disabled:focus {
    @apply ring-0 scale-100 shadow-none;
}

/* Custom dropdown arrow for select */
select.input-field {
    @apply appearance-none bg-no-repeat;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%9ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.75rem center;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}

/* Smooth animations */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.form-group {
    animation: slideIn 0.3s ease-out forwards;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }

/* Hover effects */
.input-field:hover:not(:disabled) {
    @apply border-yellow-500;
}

/* Focus within form group */
.form-group:focus-within .form-label {
    @apply text-yellow-400;
}

/* Black theme specific styles */
.input-field::placeholder {
    @apply text-gray-500;
}

.input-field:focus::placeholder {
    @apply text-gray-400;
}
</style>
