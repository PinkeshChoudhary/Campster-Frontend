<template>
    <div>
      <transition name="fade">
        <div v-if="showPopup" class="fixed inset-0 backdrop-blur-lg bg-black/50 flex items-center justify-center z-50">
          <div class="relative p-8 rounded-3xl shadow-2xl max-w-md w-full text-center animate-float border border-white/20 overflow-hidden">
            
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 via-white/10 to-purple-400/20 pointer-events-none animate-shine"></div>
            
            <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-slow">
              <span class="text-5xl text-white">📱</span>
            </div>
  
            <h2 class="text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Mobile is 🔥
            </h2>
  
            <p class="text-white/80 text-base leading-relaxed mb-8 px-2">
              Experience Campster at its best — smoother, faster, and made just for mobile magic. 🚀
            </p>
  
            <button @click="closePopup"
              class="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all">
              Continue Anyway
            </button>
  
            <p class="mt-4 text-xs text-white/60">Prefer desktop? No worries, continue browsing. 😉</p>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const showPopup = ref(false);
  
  onMounted(() => {
    if (window.innerWidth > 768) {
      showPopup.value = true;
    }
  });
  
  const closePopup = () => {
    showPopup.value = false;
  };
  </script>
  
  <style scoped>
  /* Fade transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  /* Float up effect */
  @keyframes float {
    0% {
      transform: scale(0.8) rotateX(10deg) rotateY(10deg);
      opacity: 0;
    }
    100% {
      transform: scale(1) rotateX(0deg) rotateY(0deg);
      opacity: 1;
    }
  }
  .animate-float {
    animation: float 0.7s ease forwards;
  }
  
  /* Slow Bounce icon */
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  .animate-bounce-slow {
    animation: bounce-slow 2.5s infinite;
  }
  
  /* Shine Effect */
  @keyframes shine {
    0% {
      background-position: -500px 0;
    }
    100% {
      background-position: 500px 0;
    }
  }
  .animate-shine {
    background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
    background-size: 1000px 100%;
    animation: shine 3s infinite linear;
  }
  </style>
  