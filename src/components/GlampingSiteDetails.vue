<template>
  <button @click="goBack" class="text-yellow-400 hover:text-yellow-300 transition duration-200 pt-20 p-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <div class="max-w-4xl mx-auto bg-black text-white shadow-lg rounded-lg overflow-hidden pb-10">
    <!-- First Image -->
    <div v-if="site?.images?.length" class="relative">
      <img :src="site.images[0]" alt="Main Image" class="w-full h-80 object-cover" />
    </div>

    <div class="p-6">
      <h2 class="text-2xl font-bold text-yellow-400">{{ site.name }}</h2>
      <p class="text-gray-400">{{ site.location }}</p>
      <p class="text-lg font-semibold text-yellow-500 mt-2">₹ {{ site.pricePerNight }} / Night</p>

      <p class="text-gray-300 leading-relaxed">
        {{ site.description }}
      </p>

      <!-- Amenities -->
      <div v-if="amenityList.length" class="mt-4">
        <h3 class="text-lg font-semibold text-yellow-300">Amenities</h3>
        <ul class="flex flex-wrap gap-2 mt-2">
          <li v-for="(amenity, index) in amenityList" :key="index"
              class="bg-yellow-800 text-yellow-100 px-3 py-1 rounded-md">
            {{ amenity }}
          </li>
        </ul>
      </div>

      <!-- Permissions -->
      <div v-if="permissionList.length" class="mt-6">
        <h3 class="text-lg font-semibold text-yellow-300">Permissions</h3>
        <ul class="flex flex-wrap gap-2 mt-2">
          <li v-for="(perm, index) in permissionList" :key="index"
              class="bg-yellow-600 text-yellow-100 px-3 py-1 rounded-md">
            {{ perm }}
          </li>
        </ul>
      </div>

      <!-- Gallery -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold text-yellow-300 mb-2">Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <img
            v-for="(img, index) in site.images.slice(1)"
            :key="index"
            :src="img"
            class="rounded-lg object-cover w-full h-32 hover:scale-105 transition"
            alt="Gallery Image"
          />
        </div>
      </div>

      <!-- WhatsApp CTA -->
      <a :href="whatsappLink" target="_blank"
        class="mt-6 bg-green-500 text-white w-full py-3 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.937.546 3.78 1.487 5.347L2 22l4.887-1.41A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.946 7.946 0 0 1-4.27-1.21l-.303-.19L5 19l.744-2.41-.19-.304A8 8 0 1 1 12 20Zm3.477-5.198c-.187-.094-1.106-.546-1.278-.61s-.296-.094-.42.093c-.125.188-.48.61-.589.736s-.218.14-.405.047a6.37 6.37 0 0 1-2.723-2.415c-.205-.352.205-.327.586-1.092.065-.137.032-.253-.032-.347-.063-.094-.42-1.01-.575-1.384-.152-.373-.306-.32-.42-.326l-.358-.006a.78.78 0 0 0-.566.266c-.194.213-.738.722-.738 1.759s.756 2.047.861 2.191c.107.143 1.49 2.308 3.609 3.234.504.218.899.349 1.206.446.508.161.97.139 1.337.084.407-.06 1.106-.452 1.262-.888s.156-.81.109-.888-.171-.125-.358-.219Z" />
        </svg>
        Contact via WhatsApp
      </a>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const site = ref(null);
    const router = useRouter();

    const fetchGlampingSite = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/glamping/${route.params.id}`);
        site.value = response.data;
      } catch (error) {
        console.error("Error fetching glamping site:", error);
      }
    };

    const goBack = () => {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    };

    const whatsappLink = computed(() => {
      const phoneNumber = "917568095317";
      const message = `Hello, I am interested in booking ${site.value?.name || ''}. Could you please provide more details?`;
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    });

    const amenityList = computed(() => {
      if (!site.value?.amenities) return [];
      return Object.entries(site.value.amenities)
        .filter(([_, value]) => value)
        .map(([key]) => formatKey(key));
    });

    const permissionList = computed(() => {
      if (!site.value?.permissions) return [];
      return Object.entries(site.value.permissions)
        .filter(([_, value]) => value)
        .map(([key]) => formatKey(key));
    });

    const formatKey = (key) => {
      return key
        .replace(/([A-Z])/g, " $1")       // camelCase to spaced
        .replace(/^./, str => str.toUpperCase()); // Capitalize
    };

    fetchGlampingSite();

    return {
      site,
      goBack,
      whatsappLink,
      amenityList,
      permissionList,
    };
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s ease-in-out;
}
</style>
