<template>
  <div @click="viewDetails" class=" shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white p-8" style="background-color: rgb(229 232 239)">
    <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-fill">
    <div class="p-4 ">
      <h3 class="text-xl font-semibold">{{ place.destination }}</h3>
      <div class="like-container">
    <button @click.stop="likePlace" class="like-button">
      <transition name="like">
        <svg
          v-if="likedByUser"
          class="heart-icon liked"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </transition>

      <svg
        v-if="!likedByUser"
        class="heart-icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" stroke="black" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
    <span class="like-count">{{ likes }}</span>
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
    const likes = ref(props.place.likes);
    const likedByUser = ref(false);
    const auth = getAuth();

    const viewDetails = () => {
      router.push(`/place/${props.place._id}`);
    };


    // Check if the user already liked the place
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
        const response = await axios.post(`http://localhost:5000/api/places/like/${props.place._id}`, { userId: user.uid });
        likes.value = response.data.likes;
        likedByUser.value = true;
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    onMounted(checkLikedStatus);

    return { 
      viewDetails,
      likes,
      likedByUser,
      likePlace

    };
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: scale(1.02);
}
.like-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.like-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.heart-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease-in-out;
}

.heart-icon.liked {
  transform: scale(1.2);
}

.like-count {
  font-size: 16px;
  font-weight: bold;
}
</style>
