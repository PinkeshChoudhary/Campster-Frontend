<template>
  <div class="relative p-6 pb-20 pt-20 min-h-screen overflow-hidden bg-black">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 bg-black opacity-90"></div>
    <div class="absolute top-10 left-1/4 w-72 h-72 bg-blue-300 opacity-20 rounded-full animate-float"></div>
    <div class="absolute bottom-20 right-1/4 w-60 h-60 bg-purple-300 opacity-20 rounded-full animate-float delay-1000"></div>

    <!-- Heading -->
    <h1 
  class="text-4xl md:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg opacity-0 animate-fadeInUp"
>
  My Posts ✨
</h1>


    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!myPosts.length" class="text-center text-gray-300 text-lg">
      <p>You haven't posted anything yet.</p>
    </div>

    <!-- User Posts Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <PlaceCard
        v-for="(place, index) in myPosts"
        :key="place._id"
        :place="place"
        class="opacity-0 animate-fade-in"
        :style="{ animationDelay: `${index * 150}ms` }"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import PlaceCard from '../components/PlaceCard.vue';

export default {
  components: { PlaceCard },
  setup() {
    const auth = getAuth();
    const myPosts = ref([]);
    const loading = ref(true);

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places/user/${auth.currentUser.uid}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Smooth loading effect
        myPosts.value = response.data.places;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchPlaces);

    return { myPosts, loading };
  },
};
</script>

<style scoped>
/* Background Animation */
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
.animate-float {
  animation: float 6s infinite ease-in-out;
}

/* Fade-in animation for posts */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Card Hover Effect */
.transform {
  transition: transform 0.3s ease-in-out;
}
.transform:hover {
  transform: scale(1.05);
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

</style>