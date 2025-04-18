<template>
  <div class="fixed bottom-0 w-full bg-black shadow-md flex justify-around items-center py-2">
    <!-- Home -->
    <router-link to="/" :class="activeClass('/')" class="nav-item">
      <i class="fas fa-home icon"></i>
    </router-link>

    <!-- Events -->
    <router-link to="/events" :class="activeClass('/events')" class="nav-item">
      <i class="fas fa-calendar-alt icon"></i>
    </router-link>

    <!-- Add Place -->
    <router-link to="/submit-place" :class="activeClass('/submit-place')" class="nav-item">
      <i class="fas fa-plus icon"></i>
    </router-link>

    <!-- Glamping Sites -->
    <router-link to="/glamping" :class="activeClass('/glamping')" class="nav-item">
      <i class="fas fa-campground icon"></i>
    </router-link>

    <!-- Profile -->
    <router-link to="/myPost" :class="activeClass('/myPost')" class="nav-item">
      <i class="fas fa-user icon"></i>
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
  color: white;
  padding: 8px;
  transition: all 0.3s ease;
}

/* Default icon styling */
.icon {
  font-size: 20px; /* Larger icon size */
  color: transparent;
  -webkit-text-stroke: 1px rgb(141, 139, 139); /* White outline for inactive state */
  transition: color 0.3s ease, -webkit-text-stroke 0.3s ease;
}

/* Active state */
.nav-item.active .icon {
  color: white; /* Fully white active icon */
  -webkit-text-stroke: 0; /* Remove stroke */
}

.text-xs {
  font-size: 12px; /* Adjust text size as needed */
  color: white;
}
</style>
