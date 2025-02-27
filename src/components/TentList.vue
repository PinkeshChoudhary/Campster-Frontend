<template>
  <div class="p-6 max-w-4xl mx-auto mb-20 pt-20">
    <button @click="goBack" class="text-yellow-900 hover:text-yellow-700 transition duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
    </button>
    <h2 class="text-2xl text-yellow-900 font-bold mb-4 text-center">Available Tents</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="tent in tents" :key="tent.size" class="p-4 border rounded-lg  border-gray-600 shadow hover:shadow-lg transition">
        <!-- Click Image to View Details -->
        <img 
          :src="tent.images[0]" 
          :alt="tent.size" 
          class="w-full h-40 object-cover rounded cursor-pointer"
          @click="viewTentDetails(tent)"
        />
        <h3 class="mt-2 text-lg font-semibold text-yellow-900">{{ tent.size }} Tent</h3>
        <p class="text-yellow-900">Colors: {{ tent.colors.join(", ") }}</p>

        <!-- Book Now Button -->
        <button @click="goToBooking(tent.size)"
          class="mt-2 bg-green-400 text-black w-full py-2 rounded hover:bg-green-700">
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
        images: ["/6person.webp"], 
        colors: ["Red", "Blue", "Green"]
      },
      { 
        size: "Medium", 
        images: ["/2person.webp"], 
        colors: ["Yellow", "Black", "White"]
      },
      { 
        size: "Large", 
        images: ["/4person.webp"], 
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

    const goBack = () => {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push('/');
            }
        };

    return { tents, viewTentDetails, goToBooking, goBack };
  },
};
</script>
