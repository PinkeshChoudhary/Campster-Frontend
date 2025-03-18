<template>
    <div class="flex space-x-4 p-4 overflow-x-auto">
      <!-- City Circles -->
      <div 
        v-for="city in cities" 
        :key="city.name"
        class="flex flex-col items-center cursor-pointer"
        @click="selectCity(city.name)"
      >
      <div 
  class="w-20 h-20 flex items-center justify-center rounded-full text-center text-base font-bold p-2 shadow-lg transition-all duration-300 cursor-pointer"
  :class="{
    'bg-gradient-to-r from-gray-200 to-gray-400 text-black': selectedCity !== city.name,
    'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white scale-110': selectedCity === city.name
  }"
>
  {{ city.name }}
</div>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  
  const selectedCity = ref(""); // Track selected city
  const emit = defineEmits(["places-updated"]); // Emit event to parent
  
  const cities = ref([
    { name: "Udaipur" },
    { name: "Mount Abu" },
    { name: "Jaipur" },
    { name: "Jaisalmer" },
  ]);
  
  const selectCity = async (city) => {
    selectedCity.value = city;
    try {
      const response = await fetch(`https://campster-backend-production.up.railway.app/api/places/location?city=selectedCity.value}`);
    //   const newdata = response.data;
      emit("places-updated", response); // Send data to parent
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  </script>
  
  <style scoped>
  div {
    transition: all 0.3s ease-in-out;
  }
  </style>
  