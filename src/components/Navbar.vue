<template>
  <div class="sticky top-0 w-full shadow-md p-2 bg-white">
    <div class="flex justify-between items-center">
      <!-- Left: Logo with alternating blue and white letters -->
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

      <!-- Right: Admin Buttons -->
      <!-- <div class="flex items-center space-x-4 ml-auto">
        <router-link to="/my-bookings" class="mr-4">My Bookings</router-link>
        <button v-if="!isAdmin" @click="goToLogin" class="mr-4">
          Admin
        </button>
        <button v-if="isAdmin" @click="logout" class="text-gray-600 px-2 md:px-3 rounded-md shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out">
          Logout
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAdmin = computed(() => store.isAdmin);

    const goToLogin = () => {
      router.push("/login");
    };

    const logout = () => {
      store.logout();
      router.push("/");
    };

    return { isAdmin, goToLogin, logout };
  },
};
</script>

<style scoped>
/* Add your styles for the sticky navbar here */
</style>
