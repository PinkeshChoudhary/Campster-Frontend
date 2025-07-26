<template>
  <div class="event-wrapper bg-black text-white min-h-screen pt-10 pb-6">
    <!-- Events Section -->
    <div class="event-container p-4 sm:p-6 pt-12 sm:pt-16 pb-8 sm:pb-12 max-w-4xl mx-auto">
      <!-- Heading -->
      <h4 class="text-xl sm:text-2xl font-bold text-yellow-500 text-center tracking-wide mb-4 sm:mb-6">
        <i class="fas fa-calendar-alt"></i> Discover Events & Activities
      </h4>

      <!-- Filter Dropdown -->
      <div class="mb-4 sm:mb-6 flex justify-end pr-2 sm:pr-4" ref="dropdownRef">
        <div class="relative">
          <div 
            @click="toggleDropdown" 
            class="w-8 h-8 sm:w-10 sm:h-10 bg-black border border-yellow-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition hover:border-yellow-400"
          >
            <svg 
              class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 transition-transform duration-300"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Dropdown Menu -->
          <div 
            v-if="isDropdownOpen" 
            class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border border-yellow-500 rounded-lg w-40 sm:w-48 max-h-60 overflow-y-auto shadow-lg custom-scrollbar text-xs sm:text-sm"
          >
            <div 
              v-for="cat in categories"
              :key="cat"
              @click="toggleCategory(cat)"
              class="px-3 sm:px-4 py-2 cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
              :class="{ 'bg-yellow-500 text-black font-semibold': selectedCategories.includes(cat) }"
            >
              {{ cat }}
            </div>
          </div>
        </div>
      </div>

      <!-- Event List -->
      <div class="space-y-3 sm:space-y-6">
        <div
          v-for="event in filteredEvents"
          :key="event._id"
          @click="viewDetails(event._id)"
          class="event-card group relative flex items-center bg-white/5 backdrop-blur-sm hover:bg-white/10 cursor-pointer rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
        >
          <!-- Share Button -->
          <button
            @click.stop="shareEvent(event)"
            class="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-md text-white/70 z-10 rounded-full hover:bg-white/20 hover:text-white transition-all duration-300 flex items-center justify-center"
            title="Share this event"
          >
            <i class="fas fa-share-alt text-xs"></i>
          </button>

          <!-- Thumbnail -->
          <div class="event-thumbnail w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex-shrink-0 overflow-hidden m-4 bg-white/5">
            <img
              :src="event?.images[0]"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              alt="event thumbnail"
            />
          </div>

          <!-- Event Info -->
          <div class="flex-1 pr-12 py-4">
            <!-- Date -->
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1 h-1 bg-yellow-400 rounded-full"></div>
              <p class="text-xs text-yellow-400 font-medium uppercase tracking-wide">
                {{ formatDate(event.date) }}
              </p>
            </div>
            
            <!-- Event Title -->
            <h3 class="text-sm sm:text-base lg:text-lg font-semibold text-white leading-tight mb-2 group-hover:text-yellow-400 transition-colors duration-300">
              {{ event.name }}
            </h3>
            
            <!-- Location & Price -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <div class="w-1 h-1 bg-white/40 rounded-full"></div>
                <p class="text-xs text-white/60 truncate">
                  {{ event.location }}
                </p>
              </div>
              
              <div v-if="event.ticketType && event.price" class="text-right">
                <span class="text-sm font-bold text-white">
                  ₹{{ event.price }}
                </span>
              </div>
            </div>
          </div>

          <!-- Subtle Glow Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <!-- Bottom Border Accent -->
          <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>
    </div>

    <!-- Organizer Hero Section -->
    <section class="relative bg-black text-white py-12 sm:py-20 px-4 sm:px-6 pb-16 sm:pb-24">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4">
          Are You an <span class="text-yellow-400">Organizer</span>?
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 px-2">
          Host events, list travel experiences, and reach thousands in minutes.
        </p>
        <button
          @click="goToListEvent"
          class="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-yellow-300 transition text-sm sm:text-base"
        >
          List Your Event
        </button>
      </div>
      <div class="pt-12 sm:pt-20 max-w-5xl mx-auto text-center">
        <h2 class="text-xs sm:text-sm uppercase tracking-widest text-yellow-400 mb-2">How It Works</h2>
        <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 sm:mb-12 px-2">
          We Make <span class="text-yellow-400">Event Hosting</span> Effortless
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-lg sm:text-xl mb-2 sm:mb-3">1</div>
            <p class="text-xs sm:text-sm px-2">Create Profile With Whatsapp no.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-lg sm:text-xl mb-2 sm:mb-3">2</div>
            <p class="text-xs sm:text-sm px-2">List Events or Activities</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-lg sm:text-xl mb-2 sm:mb-3">3</div>
            <p class="text-xs sm:text-sm px-2">We Help Promote It</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-lg sm:text-xl mb-2 sm:mb-3">4</div>
            <p class="text-xs sm:text-sm px-2">Start Getting Bookings</p>
          </div>
        </div>
      </div>
    </section>
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

const shareEvent = (event) => {
  const shareData = {
    title: event.name,
    text: `Check out this event: ${event.name} at ${event.location}`,
    url: `${window.location.origin}/events/${event._id}`
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Event shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  } else {
    alert('Sharing not supported in this browser.');
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

const goToListEvent = () => {
  router.push('/organizer');
}

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
/* Consistent black background wrapper */
.event-wrapper {
  background-color: #000000;
  width: 100%;
}

/* Base responsive styles */
.event-container {
  width: 100%;
  max-width: 100%;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .event-container {
    padding: 12px;
    padding-top: 48px;
    margin-bottom: 16px;
  }
  
  .event-card {
    padding: 8px;
    border-radius: 8px;
  }
  
  .event-card {
    margin-bottom: 12px;
    padding: 0;
  }
  
  .event-thumbnail {
    width: 64px;
    height: 64px;
    margin: 12px;
  }
  
  .event-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .event-card h3 {
    font-size: 14px;
  }
  
  .event-card .text-xs {
    font-size: 11px;
  }
  
  .event-card .pr-12 {
    padding-right: 40px;
  }
  
  /* Better touch targets */
  button {
    min-height: 32px;
    min-width: 32px;
  }
}

/* Tablet optimizations */
@media (min-width: 641px) and (max-width: 1024px) {
  .event-container {
    padding: 16px 20px;
    padding-top: 64px;
  }
  
  .event-card {
    margin-bottom: 16px;
    padding: 0;
  }
  
  .event-thumbnail {
    width: 80px;
    height: 80px;
    margin: 16px;
  }
  
  .event-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .event-card h3 {
    font-size: 16px;
  }
  
  .event-card .text-xs {
    font-size: 12px;
  }
  
  .event-card .pr-12 {
    padding-right: 48px;
  }
}

/* Laptop optimizations - specific for laptop screens */
@media (min-width: 1025px) and (max-width: 1366px) {
  .event-container {
    padding: 20px 24px;
    padding-top: 64px;
    max-width: 900px;
  }
  
  .event-card {
    margin-bottom: 20px;
    padding: 0;
  }
  
  .event-thumbnail {
    width: 96px;
    height: 96px;
    margin: 20px;
  }
  
  .event-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .event-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(255, 255, 255, 0.1);
  }
  
  .event-card h3 {
    font-size: 18px;
  }
  
  .event-card .text-xs {
    font-size: 13px;
  }
  
  .event-card .pr-12 {
    padding-right: 56px;
  }
}

/* Large laptop/desktop optimizations */
@media (min-width: 1367px) and (max-width: 1920px) {
  .event-container {
    padding: 24px;
    padding-top: 80px;
    max-width: 1000px;
  }
  
  .event-card {
    padding: 16px;
  }
  
  .event-thumbnail {
    width: 112px;
    height: 112px;
    margin: 24px;
  }
  
  .event-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .event-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 223, 0, 0.2);
  }
}

/* Ultra-wide screens */
@media (min-width: 1921px) {
  .event-container {
    padding: 32px;
    padding-top: 96px;
    max-width: 1200px;
  }
  
  .event-card {
    padding: 20px;
  }
  
  .event-thumbnail {
    width: 128px;
    height: 128px;
    margin: 28px;
  }
  
  .event-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

/* Custom scrollbar for dropdown */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1E1E1E;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #fbbf24;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}

/* Animations */
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

/* Responsive text truncation */
@media (max-width: 640px) {
  .truncate {
    max-width: 150px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .truncate {
    max-width: 200px;
  }
}

@media (min-width: 1025px) {
  .truncate {
    max-width: 300px;
  }
}

/* Ensure proper spacing on very small screens */
@media (max-width: 375px) {
  .event-container {
    padding: 8px;
    padding-top: 40px;
  }
  
  .event-card {
    padding: 6px;
  }
  
  .event-thumbnail {
    width: 56px;
    height: 56px;
  }
}

/* Large screen optimizations */
@media (min-width: 1440px) {
  .event-container {
    max-width: 1200px;
  }
}
</style>
