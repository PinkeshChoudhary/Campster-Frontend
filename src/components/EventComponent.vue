<template>
  <div class="p-6 mt-16 mb-12 max-w-4xl mx-auto bg-black text-white">
    <!-- Heading -->
    <h4 class="text-2xl font-bold text-yellow-500 text-center tracking-wide">
      <i class="fas fa-calendar-alt"></i> Discover Events & Activities
    </h4>

    <!-- Filter Dropdown -->
    <div class="mb-6 flex justify-end pr-4" ref="dropdownRef">
      <div class="relative">
        <div 
          @click="toggleDropdown" 
          class="w-10 h-10 bg-black border border-yellow-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition hover:border-yellow-400"
        >
          <svg 
            class="w-5 h-5 text-yellow-500 transition-transform duration-300"
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
          class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border border-yellow-500 rounded-lg w-48 max-h-60 overflow-y-auto shadow-lg custom-scrollbar text-sm"
        >
          <div 
            v-for="cat in categories"
            :key="cat"
            @click="toggleCategory(cat)"
            class="px-4 py-2 cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
            :class="{ 'bg-yellow-500 text-black font-semibold': selectedCategories.includes(cat) }"
          >
            {{ cat }}
          </div>
        </div>
      </div>
    </div>

    <!-- Event List -->
    <div class="space-y-6">
      <div 
        v-for="event in filteredEvents" 
        :key="event._id" 
        @click="viewDetails(event._id)"
        class="relative flex items-start bg-black hover:bg-[#262626] cursor-pointer rounded-lg shadow-md hover:shadow-yellow-500/40 transition duration-200"
      >
        <!-- Share Button (Top Right Corner) -->
        <button 
          @click.stop="shareEvent(event)" 
          class="absolute top-2 right-2 text-yellow-800  z-10"
          title="Share this event"
        >
          <i class="fas fa-share-alt"></i>
        </button>

        <!-- Square Thumbnail -->
        <div class="w-24 h-24 bg-[#111] flex-shrink-0 overflow-hidden rounded-l-lg">
          <img 
            :src="event.images[0]" 
            class="w-full h-full object-cover" 
            alt="event thumbnail"
          />
        </div>

        <!-- Event Info -->
        <div class="flex-1 px-4 py-3">
          <p class="text-xs text-yellow-400 font-semibold mb-1">
            {{ formatDate(event.date) }}
          </p>
          <h3 class="text-sm font-bold text-white leading-tight truncate">
            {{ event.name }}
          </h3>
          <p class="text-xs text-gray-400 mt-1 truncate">
            {{ event.location }}
          </p>
          <p class="text-xs text-gray-300 mt-1">
            <span class="text-white font-semibold">
              {{ event.ticketType && event.price ? `₹${event.price}` : "" }}
            </span>
          </p>
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
