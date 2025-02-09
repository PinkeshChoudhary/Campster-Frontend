<template>
    <div class="p-4" v-if="tent">
      <h2 class="text-xl font-semibold">{{ tent.name }}</h2>
      <div v-if="tent.images && tent.images.length">
        <div class="carousel">
          <img 
            v-for="(image, index) in tent.images" 
            :key="index" 
            :src="image" 
            alt="tent image" 
            class="w-full h-64 object-cover rounded-md" 
          />
        </div>
        <div class="mt-4">
          <p>{{ tent.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading tent details...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const route = useRoute();  // Access the current route here
      const tent = ref(null);
  
      const fetchtentDetails = async () => {
        const tentId = route.params.id;  // Access 'id' from route parameters
        try {
          const response = await axios.get(`http://localhost:5000/api/tents/${tentId}`);
          tent.value = response.data;
        } catch (error) {
          console.error('Error fetching tent details:', error);
        }
      };
  
      onMounted(fetchtentDetails);
  
      return { tent };
    },
  };
  </script>
  
  <style scoped>
  </style>
  