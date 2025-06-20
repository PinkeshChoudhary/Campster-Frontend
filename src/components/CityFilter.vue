<template>
  <div class="city-filter-dropdown relative" ref="dropdownRef">
    <!-- Dropdown Trigger -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 min-w-[180px]"
    >
      <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="flex-1 text-left">
        {{ selectedCity || 'All Cities' }}
      </span>
      <svg 
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-2 w-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl z-50 overflow-hidden"
      >
        <!-- All Cities Option -->
        <button
          @click="selectCity('')"
          class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors"
          :class="selectedCity === '' ? 'bg-yellow-400/20 text-yellow-400' : 'text-white'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">All Cities</span>
          <svg 
            v-if="selectedCity === ''" 
            class="w-4 h-4 ml-auto text-yellow-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        <!-- Divider -->
        <div class="border-t border-white/10"></div>

        <!-- Individual Cities -->
        <button
          v-for="city in cities"
          :key="city.name"
          @click="selectCity(city.name)"
          class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors"
          :class="selectedCity === city.name ? 'bg-yellow-400/20 text-yellow-400' : 'text-white'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span class="font-medium">{{ city.name }}</span>
          <svg 
            v-if="selectedCity === city.name" 
            class="w-4 h-4 ml-auto text-yellow-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, onBeforeUnmount } from "vue";

const selectedCity = ref("");
const isOpen = ref(false);
const dropdownRef = ref(null);
const emit = defineEmits(["places-updated"]);

const cities = ref([
  { name: "Udaipur" },
  { name: "Mount Abu" },
  { name: "Jaipur" },
  { name: "Jaisalmer" },
  { name: "Pushkar" },
  { name: "Ajmer" },
  { name: "Kumbhalgarh" },
]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectCity = async (city) => {
  selectedCity.value = city;
  closeDropdown();

  try {
    if (city === '') {
      // Fetch all places when no city is selected
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/places`);
      const data = await response.json();
      emit("places-updated", data.places);
    } else {
      // Fetch places for specific city
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/places/location?city=${city}`);
      const data = await response.json();
      emit("places-updated", data);
    }
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.city-filter-dropdown {
  position: relative;
}

/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

/* Hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Dropdown animation */
.transition {
  transform-origin: top;
}

/* Custom scrollbar for dropdown if needed */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
