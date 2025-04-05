<template>
  <div class="p-8 mt-16 mb-12 max-w-7xl mx-auto bg-[#121212] text-white">
    <h4 
      class="text-2xl md:text-xl font-extrabold text-yellow-500 text-center mb-8 tracking-wide animate-fadeInUp"
    >
      <i class="fas fa-calendar-alt"></i> Discover Unforgettable Events, Camps & Treks
    </h4>

    <div class="mb-8 flex justify-end pr-4" ref="dropdownRef">
  <div class="relative">
    <!-- Icon Button Toggle -->
    <div 
      @click="toggleDropdown" 
      class="w-11 h-11 bg-[#1E1E1E] border border-yellow-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition hover:border-yellow-400"
    >
      <svg 
        class="w-5 h-5 text-yellow-500 transition-transform duration-300"
        :class="{ 'rotate-180': isDropdownOpen }" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown List -->
    <div 
      v-if="isDropdownOpen" 
      class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border border-yellow-500 rounded-lg w-52 max-h-60 overflow-y-auto shadow-lg custom-scrollbar"
     >
      <div 
        v-for="cat in categories" 
        :key="cat"
        @click="toggleCategory(cat)"
        class="px-4 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
        :class="{ 'bg-yellow-500 text-black font-semibold': selectedCategories.includes(cat) }"
      >
        {{ cat }}
      </div>
    </div>
  </div>
</div>



    <!-- Event Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div 
        v-for="event in filteredEvents" 
        :key="event._id" 
        class="bg-[#1E1E1E] shadow-yellow-500/50 shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 relative"
      >
        <img :src="event.images[0]" class="w-full h-72 object-cover rounded-t-2xl">

        <!-- Verified Tag -->
        <div 
          v-if="event.isverified" 
          class="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 premium-shine"
        >
          <i class="fas fa-circle-check text-white text-sm"></i> 
          <span class="text-white">Campster Verified</span>
        </div>

        <!-- Ticket Info -->
        <div class="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          <i class="fas fa-ticket-alt"></i> 
          {{ event.ticketType && event.price ? `₹${event.price} / Ticket` : "FREE" }}
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
          <button 
            @click="viewDetails(event._id)" 
            class="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition duration-200"
          >
            <i class="fas fa-info-circle"></i> View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const events = ref([]);
const categories = ref([]);
const selectedCategories = ref([]);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const router = useRouter();

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleCategory = (cat) => {
  selectedCategories.value = [cat]; // single select
  isDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
    events.value = response.data;
  } catch (error) {
    console.error("Error fetching events", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

const filteredEvents = computed(() => {
  if (selectedCategories.value.length === 0) return events.value;
  return events.value.filter(event =>
    selectedCategories.value.includes(event.category)
  );
});

const viewDetails = (id) => {
  router.push(`/events/${id}`);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchEvents();
  fetchCategories();
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
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

@keyframes shine {
  0% { box-shadow: 0px 0px 5px rgba(255, 223, 0, 0.5); }
  50% { box-shadow: 0px 0px 15px rgba(255, 223, 0, 0.9); }
  100% { box-shadow: 0px 0px 5px rgba(255, 223, 0, 0.5); }
}

.premium-shine {
  animation: shine 2s infinite alternate ease-in-out;
}
</style>
