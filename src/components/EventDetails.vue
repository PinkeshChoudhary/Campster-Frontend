<template>
    <div class="w-full min-h-screen flex flex-col items-center px-6 pb-16 pt-16 bg-black text-white">
      <button @click="goBack" class="self-start flex items-center text-gray-400 hover:text-yellow-500 transition duration-200 mb-6">
        <i class="fas fa-arrow-left text-2xl mr-3"></i> Back
      </button>
  
      <div class="w-full max-w-5xl flex-grow">
        <img :src="event?.images?.[0]" alt="Event Image" class="w-full h-[400px] object-fit" />
  
        <div class="mt-8 bg-black p-6 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-white">{{ event?.name }}</h2>
  
          <div class="mt-6 flex space-x-4">
            <a v-if="event?.instagramLink" :href="event.instagramLink" target="_blank" class="text-pink-500 hover:text-pink-400 text-3xl">
              <i class="fab fa-instagram"></i>
            </a>
            <a v-if="event?.youtubeLink" :href="event.youtubeLink" target="_blank" class="text-red-500 hover:text-red-400 text-3xl">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
  
          <div class="mt-4 space-y-4 text-gray-300 text-lg">
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-yellow-500 text-2xl mr-4"></i>
              <a :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event?.location)}`" target="_blank" class="text-white font-semibold hover:underline">
                {{ event?.location }}
              </a>
            </div>
            <div class="flex items-center">
              <i class="fas fa-calendar-alt text-yellow-500 text-2xl mr-4"></i>
              <span>{{ formatDate(event?.date) }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-clock text-yellow-500 text-2xl mr-4"></i>
              <span>{{ event?.time }}</span>
            </div>
          </div>
  
          <p class="mt-4 text-xl font-semibold" :class="event?.isPaid ? 'text-green-400' : 'text-gray-300'">
            {{ event?.ticketType === "paid" ? `₹${event.price} / Ticket` : "" }}
          </p>
          <p class="mt-4 text-gray-300 leading-relaxed bg-black rounded-lg shadow-md">{{ event?.description }}</p>
        </div>
      </div>
  
      <div v-if="event?.images?.length > 1" class="mt-12 w-full max-w-5xl">
        <h3 class="text-2xl font-bold text-white mb-4">Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <img
            v-for="(image, index) in event.images.slice(1)"
            :key="index"
            :src="image"
            alt="Event Image"
            class="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300 cursor-pointer"
            @click="selectedImage = image"
          />
        </div>
      </div>
  
      <!-- Fullscreen Image Viewer Modal -->
      <div v-if="selectedImage" @click.self="selectedImage = null" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <img :src="selectedImage" class="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
        <button @click="selectedImage = null" class="absolute top-6 right-6 text-white text-3xl hover:text-red-400">
          <i class="fas fa-times"></i>
        </button>
      </div>
  
      <a :href="whatsappLink" target="_blank" class="mt-6 bg-green-500 text-white w-full py-3 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.937.546 3.78 1.487 5.347L2 22l4.887-1.41A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.946 7.946 0 0 1-4.27-1.21l-.303-.19L5 19l.744-2.41-.19-.304A8 8 0 1 1 12 20Zm3.477-5.198c-.187-.094-1.106-.546-1.278-.61s-.296-.094-.42.093c-.125.188-.48.61-.589.736s-.218.14-.405.047a6.37 6.37 0 0 1-2.723-2.415c-.205-.352.205-.327.586-1.092.065-.137.032-.253-.032-.347-.063-.094-.42-1.01-.575-1.384-.152-.373-.306-.32-.42-.326l-.358-.006a.78.78 0 0 0-.566.266c-.194.213-.738.722-.738 1.759s.756 2.047.861 2.191c.107.143 1.49 2.308 3.609 3.234.504.218.899.349 1.206.446.508.161.97.139 1.337.084.407-.06 1.106-.452 1.262-.888s.156-.81.109-.888-.171-.125-.358-.219Z" />
        </svg>
        Contact via WhatsApp
      </a>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  
  const route = useRoute();
  const router = useRouter();
  const event = ref(null);
  const selectedImage = ref(null);
  
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/${route.params.id}`);
      event.value = response.data;
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };
  
  const goBack = () => (window.history.length > 1 ? router.back() : router.push("/"));
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const whatsappLink = computed(() => {
    const message = `Hello, I am interested to join with you`;
    return `https://wa.me/${event.value?.organizerPhone}?text=${encodeURIComponent(message)}`;
  });
  
  onMounted(fetchEventDetails);
  </script>
  
  <style scoped>
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
  </style>
  