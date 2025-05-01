<template>
  <div
    class="relative w-full overflow-hidden images mt-0 pt-0"
    :style="{ height: `calc(100vh - 80px - 120px)` }"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-contain bg-center bg-no-repeat object-fill"
      :style="{ backgroundImage: `url(${currentImage})` }"
    >
      <!-- Blur overlay only on larger screens -->
      <div class="absolute inset-0 bg-black bg-opacity-60 md:block hidden blur-overlay"></div>
    </div>

    <!-- Content Section -->
    <div class="absolute inset-0 flex items-center justify-center text-white z-10 px-6 py-8">
      <div class="text-center animate-fadeIn md:w-2/3 mobile-text">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-shadow animate-slideIn">Escape to Adventure</h1>
        <p class="text-lg md:text-xl font-medium mb-8 animate-slideIn animation-delay-300ms">
          A journey of love, nature, and unforgettable memories.
        </p>
        <div class="border-t-4 border-pink-500 w-32 mx-auto mb-8 animate-lineDraw"></div>
        <h3 class="text-2xl md:text-3xl font-semibold mb-4 animate-slideIn animation-delay-600ms">
          "Love is in the air, and so is the adventure."
        </h3>
        <p class="text-lg md:text-xl font-light animate-slideIn animation-delay-900ms">
          Let the adventure begin with the one you love.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const currentImage = ref('/friendscam.avif');
    return { currentImage };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');

/* Background image fill */
.absolute {
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat;
  z-index: -1;
}

/* Text shadow */
.text-shadow {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 2s ease-out forwards;
}

@keyframes slideIn {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slideIn {
  animation: slideIn 1.5s ease-out forwards;
}

@keyframes lineDraw {
  from { width: 0%; }
  to { width: 100%; }
}
.animate-lineDraw {
  animation: lineDraw 2s ease-out forwards;
}

/* Only blur on larger screens */
@media (min-width: 1025px) {
  .blur-overlay {
    backdrop-filter: blur(10px);
  }

  h1, h3 {
    font-family: 'Playfair Display', serif;
  }

  p {
    font-family: 'Poppins', sans-serif;
  }

  .animation-delay-300ms {
    animation-delay: 0.3s;
  }

  .animation-delay-600ms {
    animation-delay: 0.6s;
  }

  .animation-delay-900ms {
    animation-delay: 0.9s;
  }
}

/* Mobile-specific overrides */
@media (max-width: 1024px) {
  .mobile-text {
    display: none;
  }

  .blur-overlay {
    backdrop-filter: none !important;
  }
}
</style>

<!-- const backgroundImages = [
'/homeimage.avif',
'/couplecamp.avif',
'/friendscam.avif',
'/mancamping.avif'
];  -->