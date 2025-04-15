<template>
  <div class="relative w-full overflow-hidden images mt-0 pt-0" :style="{ height: `calc(100vh - 80px - 120px)` }">
    <div
      class="absolute inset-0 bg-contain bg-center bg-no-repeat object-fill"
      :style="{ backgroundImage: `url(${currentImage})` }"
    ></div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const currentImage = ref('/friendscam.avif'); 

    return {
      currentImage,
    };
  },
};
</script>

<style scoped>
.absolute {
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>

<!-- const backgroundImages = [
'/homeimage.avif',
'/couplecamp.avif',
'/friendscam.avif',
'/mancamping.avif'
];  -->