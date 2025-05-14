<template>
  <div class="w-full bg-black border-t border-b border-gray-500 pb-0">
    <div class="flex space-x-3 px-3 py-3 whitespace-nowrap overflow-x-auto no-scrollbar items-center">
      <div 
        v-for="city in cities" 
        :key="city.name"
        @click="selectCity(city.name)"
        class="px-4 py-2 text-sm rounded-full cursor-pointer transition duration-150 flex-shrink-0"
        :class="selectedCity === city.name 
          ? 'bg-yellow-300 text-black font-semibold' 
          : 'bg-gray-100 text-black hover:bg-gray-200'"
      >
        {{ city.name }}
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, defineEmits } from "vue";

const selectedCity = ref("");
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

const selectCity = async (city) => {
  selectedCity.value = city;

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
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
