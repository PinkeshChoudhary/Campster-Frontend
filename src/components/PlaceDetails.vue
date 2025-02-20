<template>
  <div class="p-4 pb-20 max-w-3xl mx-auto mb-20 pt-20" v-if="place">
    <!-- Title & Date -->
    <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ place.destination }}</h2>
    <p class="text-gray-500 text-sm">
      <i class="fas fa-calendar-alt mr-1"></i> {{ formatDate(place.date) }} - Stayed for {{ place.duration }} days
    </p>

    <!-- Image Carousel -->
    <div v-if="place.images && place.images.length" class="carousel-container my-4">
      <div class="carousel">
        <img 
          v-for="(image, index) in place.images" 
          :key="index" 
          :src="image" 
          alt="Camping Image" 
          class="carousel-image rounded-lg shadow-md"
        />
      </div>
    </div>

    <!-- Trip Overview -->
    <div class="mt-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Trip Overview</h3>
      
      <div class="grid grid-cols-2 gap-4 text-gray-800">
        <p class="text-lg font-medium">
          <i class="fas fa-users mr-2"></i> Group Size: <span class="font-normal">{{ place.groupSize }} people</span>
        </p>
        <p class="text-lg font-medium">
          <i class="fas fa-star mr-2 text-yellow-500"></i> Rating: <span class="font-normal">{{ place.rating }} / 5</span>
        </p>
        <p class="text-lg font-medium">
          <i class="fas fa-campground mr-2"></i> Comfort Level: <span class="font-normal">{{ place.comfort }} / 5</span>
        </p>
        <p class="text-lg font-medium">
          <i class="fas fa-tent mr-2"></i> Tent Condition: <span class="font-normal">{{ place.tentCondition }}</span>
        </p>
      </div>

      <div v-if="place.amenities.length" class="mt-4">
        <p class="text-lg font-medium">
          <i class="fas fa-check-circle mr-2 text-green-500"></i> Amenities Provided:
        </p>
        <ul class="list-disc pl-5 text-gray-700">
          <li v-for="(amenity, index) in place.amenities" :key="index">{{ amenity }}</li>
        </ul>
      </div>
    </div>

    <!-- Trip Highlights Section -->
    <div class="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Trip Highlights</h3>

      <div class="space-y-6">
        <div v-if="place.wildlife" class="p-4 border-b border-gray-300 shadow-sm bg-gray-50 rounded-lg">
          <p class="text-lg font-semibold text-gray-800">
            <i class="fas fa-paw mr-2 text-green-500"></i> Wildlife Spotted
          </p>
          <p class="text-gray-700">{{ place.wildlife }}</p>
        </div>

        <div class="p-4 border-b border-gray-300 shadow-sm bg-gray-50 rounded-lg">
          <p class="text-lg font-semibold text-gray-800">
            <i class="fas fa-heart mr-2 text-red-500"></i> Best Part of the Trip
          </p>
          <p class="text-gray-700">{{ place.bestPart }}</p>
        </div>

        <div v-if="place.challenges" class="p-4 border-b border-gray-300 shadow-sm bg-gray-50 rounded-lg">
          <p class="text-lg font-semibold text-gray-800">
            <i class="fas fa-exclamation-triangle mr-2 text-orange-500"></i> Challenges Faced
          </p>
          <p class="text-gray-700">{{ place.challenges }}</p>
        </div>

        <div v-if="place.tips" class="p-4 shadow-sm bg-gray-50 rounded-lg">
          <p class="text-lg font-semibold text-gray-800">
            <i class="fas fa-lightbulb mr-2 text-yellow-500"></i> Tips for Future Campers
          </p>
          <p class="text-gray-700">{{ place.tips }}</p>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div class="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Reviews & Comments</h3>

      <!-- Comments Display -->
      <div v-if="comments.length" class="space-y-4">
        <div v-for="(comment, index) in comments" :key="index" class="p-4 border-b border-gray-300 shadow-sm bg-gray-50 rounded-lg">
          <p class="text-lg font-semibold text-gray-800">
            <i class="fas fa-user mr-2 text-blue-500"></i> {{ comment.user }}
          </p>
          <p class="text-gray-700">{{ comment.text }}</p>
          <p class="text-sm text-gray-500">
  {{ new Date(comment.createdAt).toLocaleDateString('en-GB') }}
</p>

        </div>
      </div>

      <!-- No Comments Yet -->
      <p v-else class="text-gray-500">No comments yet. Be the first to comment!</p>

      <!-- Add Comment Form -->
      <div class="mt-4 p-4 border-t border-gray-300 bg-gray-50 rounded-lg">
        <textarea v-model="newComment" placeholder="Write a comment..." rows="4" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
        <button @click="addComment" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Post Comment
        </button>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center text-gray-500 pt-40">
    <p><i class="fas fa-spinner fa-spin"></i> Loading details.....</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useUserStore } from "../store/user";

export default {
  setup() {
    const route = useRoute();
    const place = ref(null);
    const comments = ref([]);
    const newComment = ref("");
    const userStore = useUserStore();
    const userName = ref(userStore.name || "Guest");

    const fetchPlaceDetails = async () => {
      const placeId = route.params.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/places/${placeId}`);
        place.value = response.data;
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const fetchComments = async () => {
      const placeId = route.params.id;
      try {
        const response = await axios.get(`http://localhost:5000/api/places/${placeId}/comments`);
        comments.value = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const addComment = async () => {
      const placeId = route.params.id;
      if (!newComment.value.trim()) return;
      try {
        const response = await axios.post(`http://localhost:5000/api/places/${placeId}/comments`, {
          user: userName.value,
          text: newComment.value.trim(),
        });
        comments.value = response.data;
        newComment.value = "";
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
    onMounted(() => {
      fetchPlaceDetails();
      fetchComments();
    });


    return { place, formatDate, comments, newComment, addComment, userName };
  },
};
</script>

<style scoped>
/* Centering & Layout */
.p-4 {
  max-width: 800px;
  margin: auto;
}

/* Image Carousel */
.carousel-container {
  margin-top: 10px;
  overflow: hidden;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding-bottom: 10px;
}

.carousel-image {
  flex: 0 0 auto;
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.carousel-image:hover {
  transform: scale(1.05);
}

/* Card Styling */
.bg-white {
  background: #ffffff;
  transition: box-shadow 0.3s ease-in-out;
}

.bg-white:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 640px) {
  .carousel-image {
    width: 150px;
    height: 120px;
  }
}
</style>
