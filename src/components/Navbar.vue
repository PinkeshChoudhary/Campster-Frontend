<template>
  <!-- Navbar -->
  <div
    class="fixed top-0 w-full shadow-md p-0 bg-black   transition-transform duration-300 z-50 border-b border-gray-800 transition-transform duration-300 navbar-shadow"
    :class="{ '-translate-y-full': !isVisible }"
  >
    <!-- Single Horizontal Row -->
    <div class="flex justify-between items-center p-3 text-yellow-500">
      <!-- Left: Logo -->
      <div class="flex-shrink-0">
        <h1 class="text-lg md:text-xl lg:text-2xl font-bold px-2">
          <span class="text-yellow-500">C</span>
          <span class="text-black bg-yellow-500 px-1 rounded">a</span>
          <span class="text-yellow-500">m</span>
          <span class="text-black bg-yellow-500 px-1 rounded">p</span>
          <span class="text-yellow-500">s</span>
          <span class="text-black bg-yellow-500 px-1 rounded">t</span>
          <span class="text-yellow-500">e</span>
          <span class="text-black bg-yellow-500 px-1 rounded">r</span>
        </h1>
      </div>

      <!-- Center: Navigation Items and Search Bar (visible on laptop/desktop) -->
      <div class="hidden md:flex items-center space-x-6 flex-1 justify-end mr-12">
        <!-- Navigation Items -->
        <div class="flex items-center space-x-16">
          <router-link to="/" :class="activeClass('/')" class="nav-item">
            
            <span class="nav-text">Home</span>
          </router-link>

          <router-link to="/events" :class="activeClass('/events')" class="nav-item">
            <span class="nav-text">Events</span>
          </router-link>

     

          <router-link to="/ChatGround" :class="activeClass('/ChatGround')" class="nav-item">
            <span class="nav-text">Community</span>
          </router-link>

        </div>
      </div>

      <!-- Right: Hamburger Menu -->
      <div class="flex-shrink-0">
        <ProgramList />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import ProgramList from "./menus/programList.vue";

export default {
  components: {
    ProgramList,
  },
  setup() {
    const route = useRoute();
    const isVisible = ref(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.value = currentScrollY < lastScrollY || currentScrollY < 10;
      lastScrollY = currentScrollY;
    };

    const activeClass = (path) => {
      return route.path === path ? "active" : "";
    };


    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { isVisible, activeClass, };
  },
};
</script>

<style scoped>
.navbar-shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 10px rgba(0, 0, 0, 0.2);
}

.images {
  margin-top: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #aaa;
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-radius: 10px;
  position: relative;
}

.nav-text {
  font-size: 16px;
  color: #aaa;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item.active .nav-text {
  color: #eab308;
  text-shadow: 0 0 8px rgba(234, 179, 8, 0.3);
}

.nav-item.active {
  color: #eab308;
  background-color: rgba(234, 179, 8, 0.1);
}


/* Mobile search bar */
@media (max-width: 768px) {
  .search-mobile {
    display: block;
    margin: 0 16px 12px 16px;
  }
}
</style>
