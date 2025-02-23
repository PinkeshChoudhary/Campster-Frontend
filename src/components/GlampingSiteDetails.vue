<template>
    <div class="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Image Carousel -->
      <div class="relative">
        <img :src="currentImage" alt="Glamping Site" class="w-full h-80 object-cover">
        <button 
          @click="prevImage" 
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
          ◀
        </button>
        <button 
          @click="nextImage" 
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
          ▶
        </button>
      </div>
  
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800">{{ site.name }}</h2>
        <p class="text-gray-600">{{ site.location }}</p>
        <p class="text-lg font-semibold text-yellow-600 mt-2">₹ {{ site.pricePerNight }} / NPP</p>
  
        <p class="mt-4 text-gray-700">{{ site.description }}</p>
  
        <!-- Amenities List -->
        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-800">Amenities</h3>
          <ul class="flex flex-wrap gap-2 mt-2">
            <li v-for="(amenity, index) in site.amenities" :key="index" class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md">
              {{ amenity }}
            </li>
          </ul>
        </div>
  
        <!-- Book Now Button -->
        <button @click="bookNow"
          class="mt-6 bg-yellow-500 text-white w-full py-3 rounded-md hover:bg-yellow-600 transition">
          Book Now
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default {
    setup() {
      const route = useRoute();
      const site = ref(null);
      const currentImageIndex = ref(0);
  
      // Fetch glamping site details from API
      const fetchGlampingSite = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/glamping/${route.params.id}`);
          site.value = response.data;
        } catch (error) {
          console.error("Error fetching glamping site:", error);
        }
      };
  
      // Computed property for current image
      const currentImage = computed(() => {
        return site.value?.images?.[currentImageIndex.value] || "";
      });
  
      // Carousel navigation
      const prevImage = () => {
        if (currentImageIndex.value > 0) {
          currentImageIndex.value--;
        } else {
          currentImageIndex.value = site.value.images.length - 1;
        }
      };
  
      const nextImage = () => {
        if (currentImageIndex.value < site.value.images.length - 1) {
          currentImageIndex.value++;
        } else {
          currentImageIndex.value = 0;
        }
      };
  
      // Book Now function
      const bookNow = () => {
        alert(`Booking request sent for ${site.value.name}`);
      };
  
      fetchGlampingSite();
  
      return {
        site,
        currentImage,
        prevImage,
        nextImage,
        bookNow,
      };
    },
  };
  </script>
  
  <style scoped>
  button {
    transition: all 0.3s ease-in-out;
  }
  </style>
  