<template>
  <div v-if="isLoading" class="flex items-center justify-center h-screen bg-black-100">
    <div class="wave-spinner">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  </div>
  <div v-else>
   <Navbar v-if="shouldShowNavbar" />
    <div class="container mx-auto">
      <RouterView />
    </div>
    <BottomNavigation />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import OtpLogin from "./components/OtpLogin.vue";
import BottomNavigation from "./components/BottomNavigation.vue";
import ProgramList from "./components/menus/programList.vue";

export default {
  components: {
    Navbar,
    OtpLogin,
    BottomNavigation,
    ProgramList,
  },
  setup() {
    const route = useRoute();
    const isAuthenticated = ref(false);
    const isLoading = ref(true);

    // Computed property to determine if navbar should be shown
    const shouldShowNavbar = computed(() => {
        // Show navbar on desktop/tablet for main routes: Home, Events, Community
        return route.path === '/' || route.path === '/events' || route.path === '/ChatGround';
    });

    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = user; // If user exists, they are authenticated
        isLoading.value = false; // Stop loading once authentication is checked
      });
    });

    return { isAuthenticated, isLoading, shouldShowNavbar };
  },
};
</script>

<style>
/* Global styles */
body {
  font-family: 'Arial', sans-serif;
  background-color: black;
}
.ctnr {
  display: flex;
  flex-direction: row;
}
.wave-spinner {
  display: flex;
  gap: 5px;
}

.wave {
  width: 8px;
  height: 20px;
  background: #c6de14;
  border-radius: 4px;
  animation: wave-animation 1s infinite ease-in-out;
}

.wave:nth-child(2) { animation-delay: 0.2s; }
.wave:nth-child(3) { animation-delay: 0.4s; }

@keyframes wave-animation {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
}
</style>