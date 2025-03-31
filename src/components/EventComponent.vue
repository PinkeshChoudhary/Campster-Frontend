<template>
  <div class="p-6 mt-16 mb-12 max-w-7xl mx-auto bg-[#1A1A1A] text-white">
    <h2 
      class="text-xl md:text-5xl font-bold text-yellow-500 text-center mb-12 animate-fadeInUp"
    >
      <i class="fas fa-calendar-alt"></i> Discover Unforgettable Events
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="event in events" :key="event._id" 
        class="bg-[#2A2A2A] shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative">
        <img :src="event.images[0]" class="w-full h-64 object-cover rounded-t-lg">
        <div class="absolute top-4 right-4 bg-yellow-100 text-black px-3 py-1 rounded-full text-sm font-medium">
          <i class="fas fa-ticket-alt"></i> {{ event.ticketType  && event.price ? `₹${event.price} / Ticket` : "FREE" }}
        </div>
        <div class="p-6 flex flex-col gap-2">
          <h3 class="text-2xl text-white font-semibold text-lg"> {{ event.name }}</h3>
          <p class="text-gray-400 flex items-center">
            <i class="fas fa-map-marker-alt mr-2"></i>{{ event.location }}
          </p>
          <p class="text-gray-300">
            <i class="fas fa-calendar-day"></i> {{ formatDate(event.date) }} | 
            <i class="fas fa-clock"></i> {{ event.time }}
          </p>
          <button @click="viewDetails(event._id)" 
            class="mt-5 w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-yellow-600 transition duration-200">
            <i class="fas fa-info-circle"></i> View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const events = ref([]);
const router = useRouter();

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
    events.value = response.data;
  } catch (error) {
    console.error("Error fetching events", error);
  }
};

const viewDetails = (id) => {
  router.push(`/events/${id}`);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(fetchEvents);
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.shadow-2xl {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>

<!-- Add FontAwesome in your main HTML file -->
<!-- <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head> -->
