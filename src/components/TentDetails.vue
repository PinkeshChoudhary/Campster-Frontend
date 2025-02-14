<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">{{ tent.size }} Tent</h2>

    <!-- Image Gallery -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <img v-for="(img, index) in tent.images" :key="index" :src="img" class="w-full h-40 object-cover rounded" />
    </div>

    <p class="mt-4 text-gray-700">Available Colors: {{ tent.colors.join(", ") }}</p>

    <!-- Book Now Button -->
    <button @click="goToBooking" class="mt-4 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
      Book Now
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tent = ref(null);

    const tentsData = {
      Small: { 
        size: "Small", 
        images: ["https://via.placeholder.com/200?text=Small+Tent", "https://via.placeholder.com/200?text=Small+Tent+2"],
        colors: ["Red", "Blue", "Green"] 
      },
      Medium: { 
        size: "Medium", 
        images: ["https://via.placeholder.com/200?text=Medium+Tent", "https://via.placeholder.com/200?text=Medium+Tent+2"], 
        colors: ["Yellow", "Black", "White"] 
      },
      Large: { 
        size: "Large", 
        images: ["https://via.placeholder.com/200?text=Large+Tent", "https://via.placeholder.com/200?text=Large+Tent+2"], 
        colors: ["Brown", "Gray", "Orange"] 
      },
    };

    onMounted(() => {
      tent.value = tentsData[route.query.size];
    });

    const goToBooking = () => {
      router.push({ name: "Booking", query: { size: tent.value.size } });
    };

    return { tent, goToBooking };
  },
};
</script>
