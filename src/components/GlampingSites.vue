<template>
  <div class="p-4 mt-14 mb-10">
    <h2 
  class="text-3xl md:text-4xl font-bold text-gray-500 text-center mb-6 opacity-0 animate-fadeInUp"
>
  Glamping Sites ⛺✨
</h2>

    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="site in glampingSites" :key="site._id" class="shadow-lg rounded-lg overflow-hidden">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const glampingSites = ref([]);
    const router = useRouter();

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

    onMounted(fetchGlampingSites);

    return {
      glampingSites,
      viewDetails,
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
