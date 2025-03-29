<template>
    <div class="p-4 pb-20 max-w-5xl mx-auto mb-20 pt-20" v-if="place">
      <!-- Back Button -->
      <button @click="goBack" class="text-yellow-900 hover:text-yellow-700 transition duration-200 flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="ml-2">Back</span>
      </button>
  
      <!-- Destination Title -->
      <h2 class="text-4xl font-bold text-yellow-900 mb-6 text-center">{{ place.destination }}</h2>
  
      <!-- Images Stack -->
      <div v-if="place.images && place.images.length" class="image-stack">
        <img
          v-for="(image, index) in place.images"
          :key="index"
          :src="image"
          alt="Place Image"
          class="stacked-image"
          @click="openFullScreen(image)"
        />
      </div>
  
      <!-- Fullscreen Image Overlay -->
      <div v-if="fullScreenImage" class="fullscreen-overlay" @click="closeFullScreen">
        <img :src="fullScreenImage" class="fullscreen-image" />
      </div>
  
      <!-- Like Counter -->
      <h2 class="text-lg text-yellow-900 font-semibold transition-all duration-300 mt-6 text-center">
        Like {{ likes }}
      </h2>
  
      <!-- Details Section -->
      <div class="mt-6 bg-black text-white p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-bold mb-4 text-yellow-900">Details</h3>
        <p class="text-lg text-yellow-900"><strong>Description:</strong> {{ place.description }}</p>
        <p class="text-lg text-yellow-900"><strong>Location:</strong> {{ place.location }}</p>
  
        <!-- Google Maps Button -->
        <p v-if="place.locationCoordinates" class="text-sm mt-2 text-yellow-900">
          <button @click="openGoogleMaps" class="text-blue-500 underline hover:text-blue-700">
            View on Google Maps
          </button>
        </p>
      </div>
  
      <!-- Comments Section -->
      <div class="mt-8 p-6 bg-gray-100 rounded-lg bg-gray-800 shadow-lg">
        <h3 class="text-2xl font-bold text-yellow-900 mb-4">Comments</h3>
  
        <!-- Display Existing Comments -->
        <div v-if="comments.length">
          <div v-for="(comment, index) in comments" :key="index" class="mb-4 p-3 bg-gray-500 shadow-md rounded-lg flex items-start">
            <div class="mr-3">
              <i class="fas fa-user-circle text-2xl text-gray-800"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="text-base text-gray-900">{{ comment.user }}</p>
                <p class="text-xs text-gray-800"><i class="far fa-clock"></i> {{ new Date(comment.createdAt).toLocaleDateString('en-GB') }}</p>
              </div>
              <p class="text-lg mt-1">{{ comment.text }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-600">No comments yet. Be the first to comment!</p>
  
        <!-- Add New Comment -->
        <div class="mt-6">
          <textarea v-model="newComment" class="w-full p-3 border bg-gray-500 rounded-lg" rows="3" placeholder="Write a comment..."></textarea>
          <button @click="addComment" class="mt-2 bg-yellow-900 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition duration-200">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  
    <div v-else class="text-center text-yellow-900 pt-40">
      <p><i class="fas fa-spinner fa-spin"></i> Loading details...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { useUserStore } from '../store/user';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const place = ref(null);
      const comments = ref([]);
      const newComment = ref("");
      const userStore = useUserStore();
      const userName = ref(userStore.name || "Guest");
      const likes = ref(0);
      const fullScreenImage = ref(null);
  
      // Fetch Place Details
      const fetchPlaceDetails = async () => {
        const placeId = route.params.id;
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places/${placeId}`);
          place.value = response.data;
        } catch (error) {
          console.error('Error fetching place details:', error);
        }
      };
  
      // Fetch Comments
      const fetchComments = async () => {
        const placeId = route.params.id;
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places/${placeId}/comments`);
          comments.value = response.data;
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      // Add Comment
      const addComment = async () => {
        if (!newComment.value.trim()) return;
  
        const placeId = route.params.id;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/places/${placeId}/comments`, {
            text: newComment.value.trim(),
            user: userName.value,
          });
          comments.value = response.data;
          newComment.value = "";
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      };
  
      const likeCount = async () => {
        const placeId = route.params.id;
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places/${placeId}/likes`);
          likes.value = response.data;
        } catch (error) {
          console.error('Error loading likes:', error);
        }
      };
  
      const goBack = () => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      };
  
      const openGoogleMaps = () => {
        if (place.value && place.value.location) {
          window.open(`https://www.google.com/maps?q=${place.value.locationCoordinates}`, '_blank');
        }
      };
  
      const openFullScreen = (image) => {
        fullScreenImage.value = image;
      };
  
      const closeFullScreen = () => {
        fullScreenImage.value = null;
      };
  
      onMounted(() => {
        fetchPlaceDetails();
        fetchComments();
        likeCount();
      });
  
      return {
        place,
        comments,
        newComment,
        addComment,
        goBack,
        likes,
        openGoogleMaps,
        fullScreenImage,
        openFullScreen,
        closeFullScreen,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Image Stack Styling */
  .image-stack {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .stacked-image {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stacked-image:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Fullscreen Image Overlay */
  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .fullscreen-image {
    max-width: 90%;
    max-height: 90%;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .stacked-image {
      border-radius: 8px;
    }
    .fullscreen-image {
      width: 100%;
      height: auto;
    }
  }
  </style>
  