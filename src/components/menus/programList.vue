<template>
  <div class="relative">
    <!-- Hamburger Icon -->
    <button 
      @click.stop="toggleMenu" 
      class="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      aria-label="Toggle Menu"
    >
      <svg v-if="!menuOpen" class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

    <!-- Full-Screen Slide Menu -->
    <transition name="slide">
      <div 
        v-if="menuOpen" 
        ref="menu" 
        class="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-black shadow-lg z-[101] flex flex-col p-6 text-gray-800 transition-transform"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          @click="toggleMenu" 
          class="self-end p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close Menu"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Profile Section (Collapsible) -->
        <div @click="toggleProfile" class="cursor-pointer">
          <div class="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg shadow-md">
            <div class="w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-full">
              <i class="fas fa-user text-xl"></i>
            </div>
            <div>
              <p class="text-lg font-semibold text-yellow-500">{{ userStore.name || "Guest" }}</p>
            </div>
          </div>
        </div>

        <!-- Expanded Profile Details -->
        <transition name="fade">
          <div v-if="profileExpanded" class="mt-4 p-4 bg-black  rounded-lg shadow-md">
            <p class="text-lg font-semibold text-yellow-500 ">{{ userStore.name || "Guest" }}</p>
            <p class="text-lg text-yellow-500">{{ userStore.email || "No email" }}</p>
            <p class="text-lg text-yellow-500">{{ userStore.phone || "No phone" }}</p>
            <button 
              @click="editProfile"
              class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </transition>

        <!-- Menu Items -->
        <ul class="mt-6 space-y-6 text-lg text-gray-800">
          <li @click="navigate('glamping')" class=" text-yellow-500 menu-item flex items-center space-x-3 py-3 border-b border-gray-400 hover:bg-gray-200 rounded-lg transition">
            <span>Explore Sites</span>
          </li>
          <li @click="navigate('tent')" class="text-yellow-500 menu-item flex items-center space-x-3 py-3 border-b border-gray-400 hover:bg-gray-200 rounded-lg transition">
            <span>Rent a Tent</span>
          </li>
          <li @click="navigate('my-bookings')" class=" text-yellow-500 menu-item flex items-center space-x-3 py-3 border-b border-gray-400 hover:bg-gray-200 rounded-lg transition">
            <span>My Bookings</span>
          </li>
          <li @click="navigate('contact')" class="text-yellow-500 menu-item flex items-center space-x-3 py-3 border-b border-gray-400 hover:bg-gray-200 rounded-lg transition">
            <span>Contact Us</span>
          </li>
          <li @click="navigate('organizer')" class="text-yellow-500 menu-item flex items-center space-x-3 py-3 border-b border-gray-400 hover:bg-gray-200 rounded-lg transition">
            <span>Organize event & activity</span>
          </li>
        </ul>

        <!-- Login Button -->
<div class="mt-8">
  <button
    @click="navigate('login')"
    class="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow hover:bg-yellow-600 transition"
  >
    Login
  </button>
</div>


      </div>
    </transition>

    <!-- Overlay when menu is open -->
    <div v-if="menuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleMenu"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user"; // Import the user store

const menuOpen = ref(false);
const profileExpanded = ref(false);
const menu = ref(null);
const router = useRouter();
const userStore = useUserStore(); // Use the store for user data

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (!menuOpen.value) profileExpanded.value = false; // Close profile when menu closes
};

const toggleProfile = () => {
  profileExpanded.value = !profileExpanded.value;
};

const editProfile = () => {
  menuOpen.value = false; // Close menu when navigating to edit profile
  router.push("/profile");
};

// Close on Escape key
const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    menuOpen.value = false;
    profileExpanded.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
});

// Navigation function
const navigate = (route) => {
  menuOpen.value = false;
  router.push(`/${route}`);
};
</script>
