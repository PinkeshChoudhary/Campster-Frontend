<template>
  <div class="fixed bottom-0 w-full bg-black border-t border-gray-700 shadow-md flex justify-around items-center pt-2 pb-4 z-50">
    <!-- Home -->
    <router-link to="/" :class="activeClass('/')" class="nav-item">
      <i class="fas fa-home icon"></i>
    </router-link>

    <!-- Events -->
    <router-link to="/events" :class="activeClass('/events')" class="nav-item">
      <i class="fas fa-calendar-alt icon"></i>
    </router-link>

    <!-- Center Floating Add Button -->
    <div class="relative -mt-12 z-50">
      <router-link
        to="/submit-place"
        class="flex items-center justify-center bg-yellow-500 w-14 h-14 rounded-full shadow-lg border-4 border-black"
        :class="activeClass('/submit-place')"
      >
        <i class="fas fa-plus text-white text-2xl"></i>
      </router-link>
    </div>

    <!-- Glamping Sites -->
    <router-link to="/ChatGround" :class="activeClass('/ChatGround')" class="nav-item">
      <i class="fas fa-users icon"></i>
    </router-link>

    <!-- Profile -->
    <router-link to="/blog" :class="activeClass('/blog')" class="nav-item">
      <i class="fas fa-newspaper icon"></i>
    </router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const activeClass = (path) => {
      return route.path === path ? "active" : "";
    };

    return { activeClass };
  },
};
</script>

<style scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #aaa;
  padding: 8px;
  transition: all 0.3s ease;
}

.icon {
  font-size: 20px;
  color: transparent;
  -webkit-text-stroke: 1px #888;
  transition: color 0.3s ease, -webkit-text-stroke 0.3s ease;
}

.nav-item.active .icon {
  color: white;
  -webkit-text-stroke: 0;
}

.nav-item.active {
  color: white;
}

.text-xs {
  font-size: 12px;
  margin-top: 2px;
  color: white;
}
</style>
