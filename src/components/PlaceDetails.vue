<template>
  <div class="p-4" v-if="place">
    <h2 class="text-xl font-semibold">{{ place.name }}</h2>
    <div v-if="place.images && place.images.length">
      <div class="carousel">
        <img 
          v-for="(image, index) in place.images" 
          :key="index" 
          :src="image" 
          alt="Place image" 
          class="w-full h-64 object-cover rounded-md" 
        />
      </div>
      <div class="mt-4">
        <p>{{ place.description }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading place details...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();  // Access the current route here
    const place = ref(null);

    const fetchPlaceDetails = async () => {
      const placeId = route.params.id;  // Access 'id' from route parameters
      try {
        const response = await axios.get(`http://localhost:5000/api/places/${placeId}`);
        place.value = response.data;
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    onMounted(fetchPlaceDetails);

    return { place };
  },
};
</script>

<style scoped>
</style>
