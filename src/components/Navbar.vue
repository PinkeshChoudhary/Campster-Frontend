<template>
  <div class="sticky top-0 w-full  shadow-md p-2">
    <div class="flex justify-between items-center">
      <!-- Left: Logo -->
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">Campster</h1>

      <!-- Right: Admin Buttons -->
      <div class="flex items-center space-x-4 ml-auto">
        <button class="nav-item">
        <i class="fas fa-search text-xl"></i>
      </button>
        <button v-if="!isAdmin" @click="goToLogin" class="text-gray-600 px-2  md:px-3 rounded-md shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out">
          Admin
        </button>
        <button v-if="isAdmin" @click="logout" class="text-gray-600 px-2  md:px-3 rounded-md shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from 'vue';
import { useStore } from '../store/store';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAdmin = computed(() => store.isAdmin);

    const goToLogin = () => {
      router.push('/login');
    };

    const logout = () => {
      store.logout();
      router.push('/');
    };

    return { isAdmin, goToLogin, logout };
  },
};
</script>

<style scoped>
/* Add your styles for the sticky navbar here */
</style>
