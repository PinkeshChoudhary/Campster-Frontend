<template>
  <div
    @click="viewDetails"
    class="relative cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300"
  >
    <div class="relative">
      <img :src="place.images[0]" alt="Place image" class="w-full h-60 object-cover rounded-2xl">
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      <!-- Like Button -->
      <button @click.stop="likePlace" class="absolute top-3 right-3 p-2 bg-white/70 rounded-full backdrop-blur-sm">
        <svg v-if="likedByUser" class="heart-icon liked" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg v-else class="heart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="black" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
      
      <!-- Place Info -->
      <div class="absolute bottom-4 left-4 text-white font-semibold text-lg">
        {{ place.destination }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default {
  props: ['place'],
  setup(props) {
    const router = useRouter();
    const likedByUser = ref(false);
    const auth = getAuth();

    const viewDetails = () => {
      router.push(`/place/${props.place._id}`);
    };

    const checkLikedStatus = () => {
      const user = auth.currentUser;
      if (user && props.place.likedBy.includes(user.uid)) {
        likedByUser.value = true;
      }
    };

    const likePlace = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert("Please login to like places!");
        return;
      }

      if (likedByUser.value) {
        alert("You have already liked this place!");
        return;
      }

      try {
        await axios.post(`https://campster-backend-production.up.railway.app/api/places/like/${props.place._id}`, { userId: user.uid });
        likedByUser.value = true;
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    onMounted(checkLikedStatus);

    return { 
      viewDetails,
      likedByUser,
      likePlace
    };
  },
};
</script>

<style scoped>
.heart-icon {
  width: 26px;
  height: 26px;
  transition: transform 0.2s ease-in-out;
}

.heart-icon.liked {
  transform: scale(1.2);
}
</style>