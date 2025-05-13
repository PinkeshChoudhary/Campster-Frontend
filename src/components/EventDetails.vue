<template>
  <div class="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 pb-20 pt-16 bg-black text-white">
    <!-- Back Button -->
    <button @click="goBack" class="self-start flex items-center text-gray-400 hover:text-yellow-500 transition duration-200 mb-6">
      <i class="fas fa-arrow-left text-2xl mr-3"></i> Back
    </button>

    <!-- Event Info -->
    <div class="w-full max-w-screen-lg lg:max-w-5xl flex-grow">
      <img :src="event?.images?.[0]" alt="Event Image" class="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-md shadow-md" />

      <div class="mt-8 bg-black p-6 md:p-8 rounded-lg shadow-md space-y-6">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{{ event?.name }}</h2>

        <!-- Social Links -->
        <div class="flex space-x-4 border-b border-gray-700 pb-4">
          <a v-if="event?.instagramLink" :href="event.instagramLink" target="_blank" class="text-pink-500 hover:text-pink-400 text-3xl">
            <i class="fab fa-instagram"></i>
          </a>
          <a v-if="event?.youtubeLink" :href="event.youtubeLink" target="_blank" class="text-red-500 hover:text-red-400 text-3xl">
            <i class="fab fa-youtube"></i>
          </a>
        </div>

        <!-- Event Details -->
        <div class="space-y-4 text-gray-300 text-base md:text-lg border-b border-gray-700 pb-4">
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

        <!-- Price -->
        <p class="text-xl font-semibold" :class="event?.isPaid ? 'text-green-400' : 'text-gray-300'">
          {{ event?.ticketType === 'paid' ? `₹${event.price} / Ticket` : '' }}
        </p>

        <!-- Description -->
        <p class="text-gray-300 leading-relaxed border-t border-gray-700 pt-4 text-sm sm:text-base">
          {{ event?.description }}
        </p>
      </div>
    </div>

    <!-- Gallery -->
    <div v-if="event?.images?.length > 1" class="mt-12 w-full max-w-screen-lg lg:max-w-5xl">
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Gallery</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

    <!-- Terms & Conditions -->
    <div class="w-full max-w-screen-lg lg:max-w-5xl mt-12 border-t border-gray-700 pt-6">
      <div class="overflow-hidden shadow-xl transition-all duration-300">
        <div class="flex items-center justify-between p-4 cursor-pointer" @click="toggleTerms">
          <h3 class="text-lg sm:text-xl text-gray-400">Terms & Conditions</h3>
          <i :class="['fas', showFullTerms ? 'fa-chevron-up' : 'fa-chevron-down', 'text-gray-400 text-xl transition-transform duration-300']"></i>
        </div>
        <transition name="fade-slide">
          <div v-if="showFullTerms" class="px-4 pb-6 text-gray-500 text-sm sm:text-base leading-relaxed space-y-3 border-t border-gray-700 pt-4">
            <ul class="list-disc list-inside">
              <li>Campster is a platform for independent organizers to list their events.</li>
              <li>Campster is not responsible for fraud, miscommunication, or cancellations by organizers.</li>
              <li>For cancellations, refunds, or updates, please contact the event organizer directly.</li>
              <li>Campster does not verify every event. Attend at your own discretion.</li>
              <li>Any disputes must be resolved between the user and the organizer.</li>
              <li>We may remove events or ban organizers who violate platform policies.</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <!-- WhatsApp Button -->
    <a :href="whatsappLink" target="_blank" class="mt-6 bg-green-500 text-white w-full py-3 md:py-4 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2 max-w-screen-lg lg:max-w-5xl text-sm sm:text-base md:text-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.937.546 3.78 1.487 5.347L2 22l4.887-1.41A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.946 7.946 0 0 1-4.27-1.21l-.303-.19L5 19l.744-2.41-.19-.304A8 8 0 1 1 12 20Zm3.477-5.198c-.187-.094-1.106-.546-1.278-.61s-.296-.094-.42.093c-.125.188-.48.61-.589.736s-.218.14-.405.047a6.37 6.37 0 0 1-2.723-2.415c-.205-.352.205-.327.586-1.092.065-.137.032-.253-.032-.347-.063-.094-.42-1.01-.575-1.384-.152-.373-.306-.32-.42-.326l-.358-.006a.78.78 0 0 0-.566.266c-.194.213-.738.722-.738 1.759s.756 2.047.861 2.191c.107.143 1.49 2.308 3.609 3.234.504.218.899.349 1.206.446.508.161.97.139 1.337.084.407-.06 1.106-.452 1.262-.888s.156-.81.109-.888-.171-.125-.358-.219Z" />
      </svg>
      Contact Organizer
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
const showFullTerms = ref(false);
const toggleTerms = () => {
  showFullTerms.value = !showFullTerms.value;
};


  
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
  
  .fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

  </style>
  