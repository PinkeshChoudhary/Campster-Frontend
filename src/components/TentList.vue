<template>
  <div class="p-6 max-w-4xl mx-auto mb-20">
    <h2 class="text-2xl font-bold mb-4">Available Tents</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="tent in tents" :key="tent.size" class="p-4 border rounded-lg shadow hover:shadow-lg transition">
        <!-- Click Image to View Details -->
        <img 
          :src="tent.images[0]" 
          :alt="tent.size" 
          class="w-full h-40 object-cover rounded cursor-pointer"
          @click="viewTentDetails(tent)"
        />
        <h3 class="mt-2 text-lg font-semibold">{{ tent.size }} Tent</h3>
        <p class="text-gray-600">Colors: {{ tent.colors.join(", ") }}</p>

        <!-- Book Now Button -->
        <button @click="goToBooking(tent.size)"
          class="mt-2 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Book Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const tents = [
      { 
        size: "Small", 
        images: ["../../public/6person.webp"], 
        colors: ["Red", "Blue", "Green"]
      },
      { 
        size: "Medium", 
        images: ["../../public/2person.webp"], 
        colors: ["Yellow", "Black", "White"]
      },
      { 
        size: "Large", 
        images: ["../../public/4person.webp"], 
        colors: ["Brown", "Gray", "Orange"]
      },
    ];

    // Navigate to Tent Details Page
    const viewTentDetails = (tent) => {
      router.push({ name: "TentDetails", query: { size: tent.size } });
    };

    // Navigate to Booking Page (Prefilled Size)
    const goToBooking = (size) => {
      router.push({ name: "Booking", query: { size } });
    };

    return { tents, viewTentDetails, goToBooking };
  },
};
</script>
