<template>
  <div
    class="bg-gradient-to-br from-amber-50 via-fuchsia-100 to-rose-200 border-2 border-dashed border-fuchsia-300 rounded-2xl shadow-md p-4 md:p-6 my-6 animate-fadeIn relative overflow-hidden max-w-md mx-auto"
  >
    <!-- Limited Offer Badge -->
    <div
      class="absolute top-0 right-3 rotate-3 bg-rose-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md select-none"
    >
      ✨ Limited Offer
    </div>

    <h2 class="text-xl md:text-3xl font-black text-gray-900 mb-3 mt-3 leading-tight">
      🗺️ Got a Hidden Paradise? Let’s Reward You ₹200!
    </h2>

    <p class="text-gray-700 text-sm md:text-base font-medium mb-4 leading-snug">
      <span v-if="!expanded">
        We're on a mission to map the <strong>undiscovered</strong>. Know a dreamy waterfall, quiet hill, or untouched trail? Share it with us — if your story checks out, we’ll hand you
        <span class="text-green-700 font-bold">₹200</span> as a thank-you!
      </span>

      <span v-else>
        We're on a mission to map the <strong>undiscovered</strong>. Know a dreamy waterfall, quiet hill, or untouched trail? Share it with us — if your story checks out, we’ll hand you
        <span class="text-green-700 font-bold">₹200</span> as a thank-you! Upload 5+ stunning, original photos, add the place name, exact location, and a short vibe-check description. Once approved, the reward is transferred instantly.
      </span>
    </p>

    <button
      @click="expanded = !expanded"
      class="text-pink-600 font-semibold hover:underline mb-4 focus:outline-none"
      aria-label="Toggle read more"
    >
      {{ expanded ? "Read Less" : "Read More" }}
    </button>

    <router-link
      to="/submit-place"
      class="block bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white text-center text-sm md:text-base font-semibold px-5 py-2 rounded-xl shadow transition transform hover:scale-105"
    >
      🚀 Submit Your Spot & Claim ₹200
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
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.7s ease-out;
}
</style>
