<template>
  <div class="p-4 mt-6 mb-10">
    <div class="0 p-6 rounded-2xl shadow-lg">
  <h2 
    class="text-xl md:text-2xl font-extrabold text-gray-700 text-center opacity-0 animate-fadeInUp"
  >
    Resorts, Camps & Glamping Sites
  </h2>
</div>

<div class="mb-8 flex justify-end pr-4" ref="dropdownRef">
  <div class="relative">
    <!-- Icon Button Toggle -->
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
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown List -->
    <div 
      v-if="isDropdownOpen" 
      class="absolute right-0 z-50 mt-2 bg-[#1E1E1E] border text-white border-yellow-500 rounded-lg w-52 max-h-60 overflow-y-auto shadow-lg custom-scrollbar"
     >
      <div 
        v-for="cat in typeOfStay" 
        :key="cat"
        @click="toggleCategory(cat)"
        class="px-4 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-black transition duration-150"
        :class="{ 'bg-yellow-500 text-black font-semibold': selectedTypeOfStay.includes(cat) }"
      >
        {{ cat }}
      </div>
    </div>
  </div>
</div>


    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="site in filteredStay" :key="site._id" class="shadow-lg rounded-lg overflow-hidden">
        <img :src="site.images[0]" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl text-gray-600 font-bold">{{ site.name }}</h3>
          <p class="text-gray-600">{{ site.location }}</p>
          <p class="text-green-500 font-semibold">₹{{ site.pricePerNight }} / Night</p>
          <button @click="viewDetails(site._id)" class="mt-3 bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
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
    const router = useRouter();

    const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleCategory = (cat) => {
  selectedTypeOfStay.value = [cat]; // single select
  isDropdownOpen.value = false;
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
    console.error("Error fetching typeofstay", error);
  }
};

const filteredStay = computed(() => {
  if (selectedTypeOfStay.value.length === 0) return glampingSites.value;
  return glampingSites.value.filter(stay =>
  selectedTypeOfStay.value.includes(stay.typeOfStay)
  );
});


    const fetchGlampingSites = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/glamping`);
        glampingSites.value = response.data;
      } catch (error) {
        console.error("Error fetching glamping sites", error);
      }
    };

    const viewDetails = (id) => {
      router.push(`/glamping/${id}`);
    };

    onMounted(() => {
      fetchGlampingSites();
      fetchTypeOfStay();
  document.addEventListener('click', handleClickOutside);
   });
     onBeforeUnmount(() => {
     document.removeEventListener('click', handleClickOutside);
   });
    return {
      glampingSites,
      viewDetails,
      toggleDropdown,
      toggleCategory,
      isDropdownOpen,
      typeOfStay,
      selectedTypeOfStay,
      filteredStay,
      dropdownRef,
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

</style>
