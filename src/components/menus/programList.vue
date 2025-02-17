<template>
  <div class="relative">
    <!-- Hamburger Icon -->
    <button @click.stop="toggleMenu" class="p-2 focus:outline-none">
      <svg v-if="!menuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
      <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Menu Dropdown -->
    <div
      v-if="menuOpen"
      ref="menu"
      @click.stop
      class=""
    >
      <ul class="text-gray-800">
        <li class="px-4 py-3 hover:bg-gray-200 cursor-pointer" @click="navigate('explore')">Explore Sites</li>
        <li class="px-4 py-3 hover:bg-gray-200 cursor-pointer" @click="navigate('profile')">Profile</li>
        <li class="px-4 py-3 hover:bg-gray-200 cursor-pointer" @click="navigate('rate')">Rate a Place?</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const menuOpen = ref(false);
const menu = ref(null);
const router = useRouter();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (menu.value && !menu.value.contains(event.target)) {
    menuOpen.value = false;
  }
};

// Close on Escape key
const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
});

// Navigation function
const navigate = (route) => {
  menuOpen.value = false;
  router.push(`/${route}`);
};
</script>
