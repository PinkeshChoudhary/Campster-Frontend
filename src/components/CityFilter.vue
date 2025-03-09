<template>
    <div class="flex space-x-4 px-4 pt-4 overflow-x-auto">
      <!-- City Circles -->
      <div 
        v-for="city in cities" 
        :key="city.name"
        class="flex flex-col items-center cursor-pointer"
        @click="selectCity(city.name)"
      >
        <div 
          class="w-20 h-20 flex items-center justify-center rounded-full text-center text-sm font-bold p-2"
          :class="{
            'bg-gray-300': selectedCity !== city.name,
            'bg-yellow-500': selectedCity === city.name
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
    { name: "Udaipur", },
    { name: "Mount Abu", },
    { name: "Jaipur", },
    { name: "Jaisalmer", }
  ]);
  
  const selectCity = async (city) => {
    selectedCity.value = city;
    try {
      const response = await fetch(`https://campster-backend-production.up.railway.app/api/places/location?city=selectedCity.value}`);
      const newdata = response.data.places;
      emit("places-updated", newdata); // Send data to parent
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
  