<template>
  <div class="sticky top-0 w-full shadow-md p-2 bg-white">
    <div class="flex justify-between items-center">
      <!-- Left: Logo -->
      <div>
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
          <span class="text-blue-600">C</span>
          <span class="text-white bg-blue-600 px-1 rounded">a</span>
          <span class="text-blue-600">m</span>
          <span class="text-white bg-blue-600 px-1 rounded">p</span>
          <span class="text-blue-600">s</span>
          <span class="text-white bg-blue-600 px-1 rounded">t</span>
          <span class="text-blue-600">e</span>
          <span class="text-white bg-blue-600 px-1 rounded">r</span>
        </h1>
        <p class="text-sm text-gray-500 mt-1">Explore Hidden Gems Udaipur</p>
      </div>

      <!-- Right: Hamburger Menu -->
      <ProgramList />
    </div>
  </div>
</template>

<script>
import ProgramList from "./menus/programList.vue";

export default {
  components: {
    ProgramList,
  },
};
</script>
