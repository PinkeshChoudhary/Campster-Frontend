<template>
  <div class=" flex justify-end" ref="dropdownRef">
    <div class="relative">
      <!-- Icon Button Toggle -->
      <div 
        @click="toggleDropdown" 
        class="w-11 h-11 bg-[#1E1E1E] border border-yellow-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition hover:border-yellow-400"
      >
        <svg 
          class="w-5 h-5 text-yellow-500 transition-transform duration-300"
          :class="{ 'rotate-180': isDropdownOpen }" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Dropdown List -->
      <div 
        v-if="isDropdownOpen" 
        class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border text-white border-yellow-500 rounded-lg w-52 max-h-60 overflow-y-auto shadow-lg custom-scrollbar"
      >
        <div 
          v-for="city in cities" 
          :key="city.name"
          @click="selectCity(city.name)"
          class="px-4 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
          :class="{ 'bg-yellow-500 text-black font-semibold': selectedCity === city.name }"
        >
          {{ city.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from "vue";

const selectedCity = ref("");
const isDropdownOpen = ref(false);
const emit = defineEmits(["places-updated"]);
const dropdownRef = ref(null);

const cities = ref([
  { name: "Udaipur" },
  { name: "Mount Abu" },
  { name: "Jaipur" },
  { name: "Jaisalmer" },
]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

const selectCity = async (city) => {
  selectedCity.value = city;
  isDropdownOpen.value = false;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/places/location?city=${city}`);
    const data = await response.json();
    emit("places-updated", data);
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #facc15; /* Tailwind yellow-500 */
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
