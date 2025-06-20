<template>
  <div class="glamping-wrapper p-3 sm:p-4 lg:p-6 mt-4 sm:mt-6 mb-8 sm:mb-10 ">
    <div class="p-4 sm:p-6 rounded-2xl shadow-lg">
      <h2 class="text-lg sm:text-xl lg:text-2xl pt-10 font-extrabold text-gray-700 text-center opacity-0 animate-fadeInUp">
        Resorts, Camps & Glamping Sites
      </h2>
    </div>

    <!-- Dropdown -->
    <div class="mb-6 sm:mb-8 flex justify-end pr-2 sm:pr-4" ref="dropdownRef">
      <div class="relative">
        <div
          @click="toggleDropdown"
          class="w-9 h-9 sm:w-11 sm:h-11 bg-[#1E1E1E] border border-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition hover:border-yellow-400"
        >
          <svg
            class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 transition-transform duration-300"
            :class="{ 'rotate-180': isDropdownOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div
          v-if="isDropdownOpen"
          class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border text-white border-yellow-500 rounded-lg w-44 sm:w-52 max-h-60 overflow-y-auto shadow-lg custom-scrollbar"
        >
          <div
            v-for="cat in typeOfStay"
            :key="cat"
            @click="selectCategory(cat)"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
            :class="{ 'bg-yellow-500 text-black font-semibold': selectedTypeOfStay.includes(cat) }"
          >
            {{ cat }}
          </div>
        </div>
      </div>
    </div>

    <!-- Glamping Cards -->
    <div ref="resultRef" class="glamping-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      <div
        v-for="site in filteredStay"
        :key="site._id"
        class="glamping-card bg-black text-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div class="relative">
          <img :src="site.images[currentIndex[site._id] || 0]" class="w-full h-48 sm:h-56 lg:h-60 object-cover transition-all duration-300" />
          <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-1 sm:gap-2">
            <span
              v-for="(img, index) in site.images"
              :key="index"
              class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-all"
              :class="{
                'bg-white': currentIndex[site._id] === index,
                'bg-gray-500': currentIndex[site._id] !== index
              }"
              @click="setCurrentImage(site._id, index)"
            ></span>
          </div>
        </div>
        <div class="p-3 sm:p-4">
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-lg sm:text-xl font-semibold truncate">{{ site.name }}</h3>
          </div>
          <p class="text-gray-300 text-xs sm:text-sm mb-1 truncate">{{ site.location }}</p>
          <p class="text-yellow-500 text-xs font-medium">Flat {{ site.discount || 15 }}% OFF</p>
          <button @click="viewDetails(site._id)" class="mt-2 sm:mt-3 bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm hover:bg-blue-600 transition-colors w-full">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const glampingSites = ref([]);
    const typeOfStay = ref([]);
    const selectedTypeOfStay = ref([]);
    const isDropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const resultRef = ref(null);
    const router = useRouter();
    const currentIndex = ref({});
    let carouselInterval = null;

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const selectCategory = (cat) => {
      selectedTypeOfStay.value = [cat];
      isDropdownOpen.value = false;

      // Scroll to the result section smoothly
      setTimeout(() => {
        resultRef.value?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    const setCurrentImage = (siteId, index) => {
      currentIndex.value[siteId] = index;
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isDropdownOpen.value = false;
      }
    };

    const fetchTypeOfStay = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/glamping/typeOfStay`);
        typeOfStay.value = response.data;
      } catch (error) {
        console.error("Error fetching typeOfStay", error);
      }
    };

    const filteredStay = computed(() => {
      if (selectedTypeOfStay.value.length === 0) return glampingSites.value;
      return glampingSites.value.filter((stay) =>
        selectedTypeOfStay.value.includes(stay.typeOfStay)
      );
    });

    const fetchGlampingSites = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/glamping`);
        glampingSites.value = response.data;
        glampingSites.value.forEach(site => {
          currentIndex.value[site._id] = 0;
        });
      } catch (error) {
        console.error("Error fetching glamping sites", error);
      }
    };

    const viewDetails = (id) => {
      router.push(`/glamping/${id}`);
    };

    const startAutoScroll = () => {
      carouselInterval = setInterval(() => {
        glampingSites.value.forEach(site => {
          const current = currentIndex.value[site._id] || 0;
          const nextIndex = (current + 1) % site.images.length;
          currentIndex.value[site._id] = nextIndex;
        });
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
    };

    onMounted(() => {
      fetchGlampingSites().then(() => {
        startAutoScroll();
      });
      fetchTypeOfStay();
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
      stopAutoScroll();
    });

    return {
      glampingSites,
      typeOfStay,
      selectedTypeOfStay,
      filteredStay,
      isDropdownOpen,
      toggleDropdown,
      selectCategory,
      viewDetails,
      dropdownRef,
      resultRef,
      currentIndex,
      setCurrentImage,
    };
  },
};
</script>

<style scoped>
/* Base responsive wrapper */
.glamping-wrapper {
  width: 100%;
  max-width: 100%;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .glamping-wrapper {
    padding: 12px;
    margin-top: 16px;
    margin-bottom: 32px;
  }
  
  .glamping-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .glamping-card {
    max-width: 100%;
  }
  
  .glamping-card img {
    height: 180px;
  }
  
  .glamping-card .p-3 {
    padding: 12px;
  }
  
  .glamping-card h3 {
    font-size: 16px;
  }
  
  .glamping-card button {
    padding: 8px 12px;
    font-size: 12px;
  }
}

/* Tablet optimizations */
@media (min-width: 641px) and (max-width: 1024px) {
  .glamping-wrapper {
    padding: 16px 20px;
    margin-top: 24px;
    margin-bottom: 40px;
  }
  
  .glamping-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .glamping-card {
    max-width: 100%;
  }
  
  .glamping-card img {
    height: 200px;
  }
}

/* Laptop optimizations - specific for laptop screens */
@media (min-width: 1025px) and (max-width: 1366px) {
  .glamping-wrapper {
    padding: 20px 24px;
    margin-top: 32px;
    margin-bottom: 48px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .glamping-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .glamping-card {
    max-width: 380px;
    margin: 0 auto;
  }
  
  .glamping-card img {
    height: 220px;
  }
  
  .glamping-card .p-3 {
    padding: 16px;
  }
  
  .glamping-card h3 {
    font-size: 18px;
  }
  
  .glamping-card p {
    font-size: 13px;
  }
  
  .glamping-card button {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .glamping-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
}

/* Large laptop/desktop optimizations */
@media (min-width: 1367px) and (max-width: 1920px) {
  .glamping-wrapper {
    padding: 24px 32px;
    margin-top: 40px;
    margin-bottom: 56px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .glamping-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  
  .glamping-card {
    max-width: 320px;
  }
  
  .glamping-card img {
    height: 240px;
  }
  
  .glamping-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  }
}

/* Ultra-wide screens */
@media (min-width: 1921px) {
  .glamping-wrapper {
    padding: 32px 40px;
    margin-top: 48px;
    margin-bottom: 64px;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .glamping-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 28px;
  }
  
  .glamping-card {
    max-width: 300px;
  }
  
  .glamping-card img {
    height: 260px;
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

/* Smooth transitions for all interactive elements */
.glamping-card {
  transition: all 0.3s ease;
}

.glamping-card button {
  transition: all 0.2s ease;
}

/* Responsive text truncation */
@media (max-width: 640px) {
  .truncate {
    max-width: 200px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .truncate {
    max-width: 250px;
  }
}

@media (min-width: 1025px) {
  .truncate {
    max-width: 280px;
  }
}

/* Ensure proper spacing on very small screens */
@media (max-width: 375px) {
  .glamping-wrapper {
    padding: 8px;
  }
  
  .glamping-card {
    margin-bottom: 12px;
  }
  
  .glamping-card img {
    height: 160px;
  }
}

html {
  scroll-behavior: smooth;
}
</style>
