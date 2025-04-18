<template>
  <div class="p-4 mt-6 mb-10">
    <div class="p-6 rounded-2xl shadow-lg">
      <h2 class="text-xl md:text-2xl font-extrabold text-gray-700 text-center opacity-0 animate-fadeInUp">
        Resorts, Camps & Glamping Sites
      </h2>
    </div>

    <!-- Dropdown -->
    <div class="mb-8 flex justify-end pr-4" ref="dropdownRef">
      <div class="relative">
        <div
          @click="toggleDropdown"
          class="w-11 h-11 bg-[#1E1E1E] border border-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition hover:border-yellow-400"
        >
          <svg
            class="w-5 h-5 text-blue-500 transition-transform duration-300"
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
          class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border text-white border-yellow-500 rounded-lg w-52 max-h-60 overflow-y-auto shadow-lg custom-scrollbar"
        >
          <div
            v-for="cat in typeOfStay"
            :key="cat"
            @click="selectCategory(cat)"
            class="px-4 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
            :class="{ 'bg-yellow-500 text-black font-semibold': selectedTypeOfStay.includes(cat) }"
          >
            {{ cat }}
          </div>
        </div>
      </div>
    </div>

    <!-- Glamping Cards -->
    <div ref="resultRef" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="site in filteredStay"
        :key="site._id"
        class="bg-black text-white rounded-lg overflow-hidden shadow-xl"
      >
        <div class="relative">
          <img :src="site.images[currentIndex[site._id] || 0]" class="w-full h-60 object-cover transition-all duration-300" />
          <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            <span
              v-for="(img, index) in site.images"
              :key="index"
              class="w-2 h-2 rounded-full cursor-pointer"
              :class="{
                'bg-white': currentIndex[site._id] === index,
                'bg-gray-500': currentIndex[site._id] !== index
              }"
              @click="setCurrentImage(site._id, index)"
            ></span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-1">
            <h3 class="text-xl font-semibold">{{ site.name }}</h3>
          </div>
          <p class="text-gray-300 text-sm mb-1">{{ site.location }}</p>
          <p class="text-yellow-500 text-xs font-medium">Flat {{ site.discount || 15 }}% OFF</p>
          <button @click="viewDetails(site._id)" class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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

html {
  scroll-behavior: smooth;
}
</style>
