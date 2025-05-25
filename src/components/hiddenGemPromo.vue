<template>
  <div class="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-6 max-w-md mx-auto animate-fadeIn hover:shadow-pink-400 transition-shadow duration-300 ease-in-out">
    
    <div class="absolute -top-3 -right-3 bg-violet-600 text-white text-[10px] font-bold uppercase py-1 px-3 rounded-full shadow-md tracking-wide">
      ✨ Limited Offer
    </div>

    <h2 class="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
      🗺️ Got a Hidden Paradise? <span class="text-violet-600">Earn ₹200</span>
    </h2>

    <p class="text-gray-700 text-sm leading-relaxed mb-4">
      Help us uncover <span class="font-semibold text-gray-900">hidden travel spots</span>. Share one and get 
      <span class="font-bold text-emerald-600">₹200</span> if approved!
      <span v-if="expanded">
        <br />Just upload 5+ quality images, include the name, location, and a short description.
      </span>
    </p>

    <button @click="expanded = !expanded" class="text-violet-600 text-sm font-medium hover:underline focus:outline-none mb-4 transition duration-200">
      {{ expanded ? "🔽 Show Less" : "🔼 Read More" }}
    </button>

    <router-link
      to="/submit-place"
      class="block bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-center text-sm font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
    >
      🚀 Submit Now & Claim ₹200
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
const expanded = ref(false);
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>
