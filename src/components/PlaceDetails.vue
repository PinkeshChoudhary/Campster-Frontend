<template>
  <div class="p-4 max-w-3xl mx-auto" v-if="place">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ place.destination }}</h2>
    <p class="text-gray-600 text-sm">{{ formatDate(place.date) }} - Stayed for {{ place.duration }} days</p>

    <!-- Image Carousel -->
    <div v-if="place.images && place.images.length" class="carousel-container">
      <div class="carousel">
        <img 
          v-for="(image, index) in place.images" 
          :key="index" 
          :src="image" 
          alt="Camping Image" 
          class="carousel-image"
        />
      </div>
    </div>

    <!-- Details Section -->
    <div class="mt-4 bg-white p-4 rounded-lg shadow-lg">
      <p class="text-lg font-semibold"><strong>Group Size:</strong> {{ place.groupSize }} people</p>
      <p><strong>Rating:</strong> ⭐ {{ place.rating }} / 5</p>
      <p><strong>Comfort Level:</strong> ⭐ {{ place.comfort }} / 5</p>
      <p><strong>Tent Condition:</strong> {{ place.tentCondition }}</p>

      <div v-if="place.amenities.length" class="mt-3">
        <p class="font-semibold">Amenities Provided:</p>
        <ul class="list-disc pl-5 text-gray-700">
          <li v-for="(amenity, index) in place.amenities" :key="index">{{ amenity }}</li>
        </ul>
      </div>

      <div v-if="place.wildlife" class="mt-3">
        <p><strong>Wildlife Spotted:</strong> {{ place.wildlife }}</p>
      </div>

      <p class="mt-3"><strong>Best Part of the Trip:</strong> {{ place.bestPart }}</p>
      <p v-if="place.challenges"><strong>Challenges Faced:</strong> {{ place.challenges }}</p>
      <p v-if="place.tips"><strong>Tips for Future Campers:</strong> {{ place.tips }}</p>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 p-6">
    <p>Loading place details...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const place = ref(null);

    const fetchPlaceDetails = async () => {
      const placeId = route.params.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/places/${placeId}`);
        place.value = response.data;
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    onMounted(fetchPlaceDetails);

    return { place, formatDate };
  },
};
</script>

<style scoped>
/* Centering & Layout */
.p-4 {
  max-width: 800px;
  margin: auto;
}

/* Image Carousel */
.carousel-container {
  margin-top: 10px;
  overflow: hidden;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding-bottom: 10px;
}

.carousel-image {
  flex: 0 0 auto;
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.carousel-image:hover {
  transform: scale(1.05);
}

/* Card Styling */
.bg-white {
  background: #ffffff;
  transition: box-shadow 0.3s ease-in-out;
}

.bg-white:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 640px) {
  .carousel-image {
    width: 150px;
    height: 120px;
  }
}
</style>
