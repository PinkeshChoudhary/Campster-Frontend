<template>
  <!-- Navbar -->
  <div
    class="fixed top-0 w-full shadow-md p-0 bg-black   transition-transform duration-300 z-50 "
    :class="{ '-translate-y-full': !isVisible }"
  >
    <div class="flex justify-between items-center p-2  text-yellow-900 " >
        <!-- Left: Logo -->
      <div>
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold px-2">
          <span class="text-yellow-600">C</span>
          <span class="text-black bg-yellow-600 px-1 rounded">a</span>
          <span class="text-yellow-600">m</span>
          <span class="text-black bg-yellow-600 px-1 rounded">p</span>
          <span class="text-yellow-600">s</span>
          <span class="text-black bg-yellow-600 px-1 rounded">t</span>
          <span class="text-yellow-600">e</span>
          <span class="text-black bg-yellow-600 px-1 rounded">r</span>
        </h1>
      </div>

      <!-- Right: Hamburger Menu -->
      <ProgramList />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import ProgramList from "./menus/programList.vue";

export default {
  components: {
    ProgramList,
  },
  setup() {
    const isVisible = ref(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.value = currentScrollY < lastScrollY || currentScrollY < 10;
      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { isVisible };
  },
};
</script>
<style>
.images {
  margin-top: 0;
}
</style>
