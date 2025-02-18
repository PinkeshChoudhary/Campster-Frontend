<template>
    <div class="fixed bottom-0 w-full bg-white shadow-md border-t flex justify-around items-center py-3 ">
      <!-- Home -->
      <router-link to="/" :class="activeClass('/')" class="nav-item">
        <i class="fas fa-home text-xl"></i>
        <span class="text-xs">Home</span>
      </router-link>
  
      <!-- Events -->
      <router-link to="/events" :class="activeClass('/events')" class="nav-item">
        <i class="fas fa-calendar-alt text-xl"></i>
        <span class="text-xs">Events</span>
      </router-link>
  
      <!-- Add Place -->
      <router-link to="/submit-place" :class="activeClass('/submit-place')" class="nav-item">
        <i class="fas fa-plus text-2xl"></i>
        <span class="text-xs">Post</span>
      </router-link>
  
      <!-- Glamping Sites -->
      <router-link to="/glamping" :class="activeClass('/glamping')" class="nav-item">
        <i class="fas fa-campground text-xl"></i>
        <span class="text-xs">Glamping</span>
      </router-link>
  
      <!-- Profile -->
      <router-link to="/myPost" :class="activeClass('/myPost')" class="nav-item">
        <i class="fas fa-user text-xl"></i>
        <span class="text-xs">MyPost  </span>
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
    color: #4b5563;
    transition: color 0.2s;
  }
  
  .nav-item.active {
    color: #2563eb;
    font-weight: bold;
  }
  
  .add-btn {
    background-color: #3b82f6;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s;
    color: white;
  }
  
  .add-btn:hover {
    background-color: #2563eb;
  }
  </style>
  