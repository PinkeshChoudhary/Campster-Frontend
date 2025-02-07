<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <RouterView />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
    FooterComponent,
  }
};
</script>

<style>
/* Global styles */
body {
  font-family: 'Arial', sans-serif;
}
</style>
