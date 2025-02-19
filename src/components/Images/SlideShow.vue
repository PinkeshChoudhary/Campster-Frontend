<template>
  <div class="relative w-full overflow-hidden images mt-0 pt-0" :style="{ height: `calc(100vh - 80px - 120px)` }">
    <div
      class="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-1000 object-fill"
      :style="{ backgroundImage: `url(${currentImage})`, filter: 'blur(2px)' }"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const backgroundImages = [
      '/homeimage.avif',
      '/couplecamp.avif',
      '/friendscam.avif',
      '/mancamping.avif'
    ]; 
    const currentImage = ref(backgroundImages[0]);
    let imageIndex = 0;

    const changeBackgroundImage = () => {
      setInterval(() => {
        imageIndex = (imageIndex + 1) % backgroundImages.length;
        currentImage.value = backgroundImages[imageIndex];
      }, 5000); // Increased duration for a smoother transition
    };

    onMounted(() => {
      changeBackgroundImage();
    });

    return {
      currentImage,
    };
  },
};
</script>

<style scoped>
.absolute {
  transition: background-image 1s ease-in-out;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
