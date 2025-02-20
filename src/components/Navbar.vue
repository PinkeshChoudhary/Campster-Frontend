<template>
  <!-- Navbar -->
  <div
    class="fixed top-0 w-full shadow-md p-0 bg-white transition-transform duration-300 z-50  border-b-2 border-black"
    :class="{ '-translate-y-full': !isVisible }"
  >
    <div class="flex justify-between items-center p-2" style="background-color: rgb(146 161 191)">
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
        <p class="text-sm text-blue-500 mt-1">Explore Hidden Gems Udaipur</p>
      </div>

      <!-- Right: Admin Buttons
      <div class="flex items-center space-x-4 ml-auto">
        <router-link to="/my-bookings" class="mr-4">My Bookings</router-link>
        <button v-if="!isAdmin" @click="goToLogin" class="mr-4">
          Admin
        </button>
        <button v-if="isAdmin" @click="logout" class="text-gray-600 px-2  md:px-3 rounded-md shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out">
          Logout
        </button>
      </div> -->

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
