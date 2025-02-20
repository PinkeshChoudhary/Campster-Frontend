<template>
    <div v-if="isAuthenticated">
    <Navbar />
    <div class="container mx-auto">
      <RouterView />
    </div>
    <BottomNavigation />
  </div>
  <div v-else >
   <OtpLogin />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    const isAuthenticated = ref(false);
console.info("isAuthenticated", isAuthenticated.value)
    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.info("user", user , auth)
        isAuthenticated.value = user; // If user exists, they are authenticated
      });
    });

    return { isAuthenticated };
  },
};
</script>

<style>
/* Global styles */
body {
  font-family: 'Arial', sans-serif;
}
.ctnr {
  display: flex;
  flex-direction: row;
}
</style>
