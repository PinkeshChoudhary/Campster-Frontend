<template>
  <div @click="viewDetails" class=" shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white">
    <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-cover">
    <div class="p-4 ">
      <h3 class="text-xl font-semibold">{{ place.name }}</h3>
      <button @click="likePlace" class="text-blue-500">👍 {{ place.likes }}</button>
      <button @click="toggleComments" class="text-gray-500">💬 {{ place.comments.length }}</button>
    </div>
    <!-- Comment Section -->
    <div v-if="showComments" class="mt-2">
      <div v-for="comment in place.comments" :key="comment._id" class="border p-2 rounded mt-1">
        <strong>{{ comment.user }}</strong>: {{ comment.text }}
      </div>
      <input v-model="newComment" placeholder="Add a comment..." class="w-full p-1 border rounded mt-2" />
      <button @click="addComment" class="bg-blue-500 text-white p-1 rounded mt-2 w-full">Comment</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from '../store/store';
import { useRouter } from 'vue-router';

export default {
  props: ['place'],
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const likes = ref(props.place.likes);
    const comments = ref(props.place.comments);
    const showComments = ref(false);
    const newComment = ref("");

    // Toggle comments section
    const toggleComments = () => {
      showComments.value = !showComments.value;
    };

     // Like a place
     const likePlace = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/places/like/${props.place._id}`);
        likes.value = response.data.likes;
      } catch (error) {
        console.error("Error liking place:", error);
      }
    };


    // Add a new comment
    const addComment = async () => {
      if (!newComment.value.trim()) return;
      try {
        const response = await axios.post(`http://localhost:5000/api/places/comment/${props.place._id}`, {
          user: "Anonymous", // Replace with actual user if authentication is implemented
          text: newComment.value,
        });
        comments.value = response.data.comments;
        newComment.value = "";
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };

    const viewDetails = () => {
      store.setSelectedPlace(props.place);
      router.push(`/place/${props.place._id}`);
    };

    return { 
      viewDetails,
      likes,
      comments,
      showComments,
      newComment,
      toggleComments,
      likePlace,
      addComment,

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
</style>
