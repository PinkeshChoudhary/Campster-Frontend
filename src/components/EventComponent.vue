<template>
  <div class="p-8 mt-16 mb-12 max-w-7xl mx-auto bg-[#121212] text-white">
    <h4 
      class="text-2xl md:text-xl font-extrabold text-yellow-500 text-center mb-8 tracking-wide animate-fadeInUp"
    >
      <i class="fas fa-calendar-alt"></i> Discover Unforgettable Events, Camps & Treks
    </h4>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="event in events" :key="event._id" 
        class="bg-[#1E1E1E] shadow-yellow-500/50 shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 relative">
        <img :src="event.images[0]" class="w-full h-72 object-cover rounded-t-2xl">
           <!-- Premium Verified Tag -->
           <div v-if="event.isverified" 
          class="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2  rounded-full text-xs font-bold shadow-lg flex items-center gap-2 premium-shine">
          <i class="fas fa-circle-check text-white text-sm"></i> 
          <span class="text-white">Campster Verified</span>
        </div>
        <div class="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          <i class="fas fa-ticket-alt"></i> {{ event.ticketType && event.price ? `₹${event.price} / Ticket` : "FREE" }}
        </div>
        <div class="p-6 flex flex-col gap-4">
          <h3 class="text-2xl font-bold text-white">{{ event.name }}</h3>
          <p class="text-gray-400 flex items-center text-lg">
            <i class="fas fa-map-marker-alt mr-2"></i>{{ event.location }}
          </p>
          <p class="text-gray-300 text-lg flex items-center">
            <i class="fas fa-calendar-day mr-2"></i> {{ formatDate(event.date) }} | 
            <i class="fas fa-clock ml-2 mr-2"></i> {{ event.time }}
          </p>
          <button @click="viewDetails(event._id)" 
            class="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition duration-200">
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
/* PREMIUM SHINING EFFECT */
@keyframes shine {
  0% { box-shadow: 0px 0px 5px rgba(255, 223, 0, 0.5); }
  50% { box-shadow: 0px 0px 15px rgba(255, 223, 0, 0.9); }
  100% { box-shadow: 0px 0px 5px rgba(255, 223, 0, 0.5); }
}

.premium-shine {
  animation: shine 2s infinite alternate ease-in-out;
}
</style>