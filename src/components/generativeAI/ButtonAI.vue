<template>
    <div class="bg-black min-h-screen px-4 py-20 sm:px-6 md:px-16 md:py-20">
      <div class="w-full max-w-5xl mx-auto text-gray-300 animate-fade-in-down">
        <img src="/sakhionlt.png" alt="SakhiAI" class="mx-auto w-32 sm:w-40 md:w-48 mb-6" />
        <!-- Welcome Text -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-yellow-400 mb-8 sm:mb-10 drop-shadow-md">
          Welcome to SakhiAI
        </h2>
  
        <!-- Features List -->
        <div class="space-y-8 sm:space-y-10">
          <div class="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 bg-gray-800/50 backdrop-blur-md rounded-3xl p-5 hover:shadow-2xl transition-all duration-300">
            <div class="bg-yellow-700/80 p-3 rounded-2xl shadow-inner mb-4 sm:mb-0">
              <i class="fas fa-map-marked-alt text-yellow-400 text-2xl sm:text-3xl"></i>
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">Explore Destinations</h3>
              <p class="text-gray-400 text-sm sm:text-base">
                Discover and explore new places with your AI travel assistant.
              </p>
            </div>
          </div>
  
          <div class="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 bg-gray-800/50 backdrop-blur-md rounded-3xl p-5 hover:shadow-2xl transition-all duration-300">
            <div class="bg-yellow-700/80 p-3 rounded-2xl shadow-inner mb-4 sm:mb-0">
              <i class="fas fa-comments text-yellow-400 text-2xl sm:text-3xl"></i>
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">Interactive Chat</h3>
              <p class="text-gray-400 text-sm sm:text-base">
                Ask questions about your travel preferences and get instant suggestions.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Input and Send Button -->
        <div class="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            v-model="travelPrompt"
            placeholder="Ask about travel / Paste Reels, Shorts, Blogs"
            class="w-full bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-4 sm:p-5 focus:ring-2 focus:ring-yellow-500 focus:outline-none placeholder-gray-500 text-sm sm:text-base text-white shadow-inner transition"
          />
          <button 
            @click="getTravelPlan"
            class="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 p-4 sm:p-5 rounded-2xl transition-transform transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            <i class="fas fa-paper-plane text-black text-lg sm:text-2xl"></i>
          </button>
        </div>
  
        <!-- Loading, Error or Result Section -->
        <div class="mt-8 sm:mt-10 min-h-[100px]">
          <div v-if="loading" class="text-center text-yellow-400 animate-pulse text-xl sm:text-2xl">
            Generating your travel plan...
          </div>
          <div v-else-if="error" class="text-center text-red-400 text-xl sm:text-2xl">
            {{ error }}
          </div>
          <div v-else-if="results" class="bg-black backdrop-blur-md p-5 rounded-2xl text-gray-300 text-lg sm:text-lg whitespace-pre-line mt-4 shadow-lg">
            {{ results }}
          </div>
        </div>
  
      </div>
    </div>
  </template>
  

  
  <script setup>
  import { ref } from 'vue';
  const travelPrompt = ref('');
  const results = ref('');
  const loading = ref(false);
  const error = ref('');
  
  const getTravelPlan = async () => {
    if (!travelPrompt.value.trim()) return;
    loading.value = true;
    error.value = '';
    results.value = '';
  
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/travel-plan`;
    //   const updatedPrompt = travelPrompt.value + ' not more than 300 words';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: travelPrompt.value }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        error.value = errorData.error || 'Failed to fetch travel plan.';
        return;
      }
  
      const data = await response.json();
      results.value = data.result;
    } catch (err) {
      console.error('Error fetching travel plan:', err);
      error.value = 'An unexpected error occurred.';
    } finally {
      loading.value = false;
      travelPrompt.value = '';
    }
  };
  </script>
  
  <style scoped>
  @keyframes fade-in-down {
    0% { opacity: 0; transform: translateY(-30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out;
  }
  </style>
  