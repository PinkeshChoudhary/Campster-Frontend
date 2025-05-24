<template>
  <div class="bg-gradient-to-br from-amber-50 to-rose-200 border-dashed border-fuchsia-300 rounded-xl shadow-md p-4 max-w-md mx-auto relative animate-fadeIn">
    <div class="absolute top-0 right-3 rotate-3 bg-rose-500 text-white text-xs font-bold py-1 px-2 rounded-full select-none">✨ Limited Offer</div>

    <h2 class="text-xl font-black text-gray-900 mb-3">🗺️ Got a Hidden Paradise? ₹200 Reward!</h2>

    <p class="text-gray-700 text-sm mb-4">
      We're mapping the <strong>undiscovered</strong>. Know a hidden gem? Share it! 
      <span class="text-green-700 font-bold">₹200</span> reward if approved.
      <span v-if="expanded"> Upload 5+ photos, name, location & description.</span>
    </p>

    <button @click="expanded = !expanded" class="text-pink-600 font-semibold hover:underline mb-4 focus:outline-none">
      {{ expanded ? "Read Less" : "Read More" }}
    </button>

    <router-link to="/submit-place" class="block bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-center text-sm font-semibold px-5 py-2 rounded-xl shadow hover:scale-105 transition transform">
      🚀 Submit & Claim ₹200
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
const expanded = ref(false);
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.7s ease-out; }
</style>
