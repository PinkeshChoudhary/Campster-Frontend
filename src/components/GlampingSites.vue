<template>
  <div class="p-4 mt-10 mb-10">
    <h2 class="text-3xl text-gray-500 font-bold text-center mb-6">Glamping Sites</h2>
    
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
        const response = await axios.get("http://localhost:5000/api/glamping");
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
