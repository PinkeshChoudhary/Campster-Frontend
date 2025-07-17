<template>
  <div class="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
    <!-- Image Section -->
    <div class="relative h-48 overflow-hidden cursor-pointer" @click="viewDetails">
      <img
        :src="place.images[0]"
        :alt="place.destination"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <!-- Distance Badge -->
      <div v-if="displayDistance && !showEditButton" class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-gray-800 text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-3 h-3 text-orange-500">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
        {{ displayDistance }} km
      </div>

      <!-- Action Buttons for MyPosts -->
      <div v-if="showEditButton" class="absolute top-3 right-3 flex gap-2">
        <!-- Edit Button -->
        <button
          @click.stop="editPlace"
          class="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          title="Edit Post"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <!-- Delete Button -->
        <button
          @click.stop="deletePlace"
          class="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          title="Delete Post"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v1m0 0h8m-8 0v3a1 1 0 001 1h6a1 1 0 001-1V4" />
          </svg>
        </button>
      </div>

      <!-- Regular Action Buttons for other views -->
      <div v-else class="absolute top-3 right-3 flex gap-2">
        <!-- Like Button -->
        <button @click.stop="likePlace" class="bg-black/30 hover:bg-black/50 backdrop-blur-sm p-2 rounded-full transition-all duration-300">
          <svg v-if="likedByUser" class="heart-icon liked" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg v-else class="heart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="white" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <!-- Share Button -->
        <button
          @click.stop="sharePlace"
          class="bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>

      <!-- Status Badge for MyPosts -->
      <div v-if="showEditButton" class="absolute top-3 left-3">
        <span
          class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
          :class="getStatusBadgeClass()"
        >
          {{ getStatusText() }}
        </span>
      </div>

      <!-- Type Badge for regular view -->
      <div v-else class="absolute top-3 left-3">
        <span
          class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          :class="place.typeOfPlace === 'popular' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'"
        >
          {{ place.typeOfPlace === 'popular' ? '🔥 Popular' : '💎 Hidden Gem' }}
        </span>
      </div>

      <!-- Place Title -->
      <div class="absolute bottom-4 left-4 right-4">
        <h3 class="text-white text-xl font-bold mb-1 line-clamp-1">
          {{ place.destination }}
        </h3>
        <p class="text-gray-300 text-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ place.location }}
        </p>
      </div>
    </div>

    <!-- Content Section for MyPosts -->
    <div v-if="showEditButton" class="p-5">
      <!-- Description -->
      <p class="text-gray-300 text-sm mb-4 line-clamp-2">
        {{ place.description }}
      </p>

      <!-- Stats Row -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <!-- Likes -->
          <div class="flex items-center gap-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="text-xs font-medium">{{ place.likedBy?.length || 0 }} likes</span>
          </div>

          <!-- Views -->
          <div class="flex items-center gap-1 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span class="text-xs font-medium">{{ place.views || 0 }} views</span>
          </div>
        </div>

        <!-- Posted Date -->
        <span class="text-gray-500 text-xs">
          {{ formatDate(place.createdAt) }}
        </span>
      </div>

      <!-- Action Buttons Row -->
      <div class="flex gap-3">
        <button
          @click="viewDetails"
          class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
        
        <button
          @click="sharePlace"
          class="bg-gray-700 hover:bg-gray-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default {
  props: ['place', 'showEditButton'],
  setup(props) {
    const router = useRouter();
    const likedByUser = ref(false);
    const distance = ref(null);

    const auth = getAuth();

    // Use calculated distance from props if available, otherwise calculate it
    const displayDistance = computed(() => {
      if (props.place.calculatedDistance !== undefined && props.place.calculatedDistance !== null) {
        return props.place.calculatedDistance.toFixed(1);
      }
      return distance.value;
    });

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = angle => (angle * Math.PI) / 180;
      const R = 6371; // Radius of Earth in km

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

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
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/places/like/${props.place._id}`, {
          userId: user.uid
        });
        likedByUser.value = true;
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    const sharePlace = async () => {
      const shareText = `Check out this amazing place: ${props.place.destination}`;
      const shareUrl = `${window.location.origin}/place/${props.place._id}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: props.place.destination,
            text: shareText,
            url: shareUrl,
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        alert("Share functionality is not supported on this device.");
      }
    };

    const editPlace = () => {
      router.push(`/submit-place?edit=${props.place._id}`);
    };

    const deletePlace = async () => {
      if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        try {
          // Add delete API call here when backend is ready
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/places/${props.place._id}`);
          alert('Post deleted successfully!');
          // Emit event to parent to refresh the list
          window.location.reload();
        } catch (error) {
          console.error('Error deleting place:', error);
          alert('Failed to delete post. Please try again.');
        }
      }
    };

    const getStatusBadgeClass = () => {
      // You can customize this based on place status
      if (props.place.approved === false) {
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      } else if (props.place.approved === true) {
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      } else {
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      }
    };

    const getStatusText = () => {
      if (props.place.approved === false) {
        return '⏳ Pending';
      } else if (props.place.approved === true) {
        return '✅ Approved';
      } else {
        return '📝 Draft';
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'Recently';
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
      return `${Math.ceil(diffDays / 365)} years ago`;
    };

    onMounted(() => {
      checkLikedStatus();

      if (navigator.geolocation && props.place.locationCoordinates) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            const [placeLatStr, placeLonStr] = props.place.locationCoordinates.split(',');
            const placeLat = parseFloat(placeLatStr.trim());
            const placeLon = parseFloat(placeLonStr.trim());

            if (!isNaN(placeLat) && !isNaN(placeLon)) {
              const dist = calculateDistance(userLat, userLon, placeLat, placeLon);
              distance.value = dist.toFixed(1);
            }
          },
          error => {
            console.error('Geolocation error:', error.message);
          }
        );
      }
    });

    return {
      viewDetails,
      likedByUser,
      likePlace,
      distance,
      displayDistance,
      sharePlace,
      editPlace,
      deletePlace,
      getStatusBadgeClass,
      getStatusText,
      formatDate,
    };
  },
};
</script>

<style scoped>
.heart-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease-in-out;
}

.heart-icon.liked {
  transform: scale(1.2);
}

/* Text truncation utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Enhanced hover effects */
.transform {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Button hover animations */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Gradient text effect for titles */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced shadow effects */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Responsive design improvements */
@media (max-width: 640px) {
  .text-xl {
    font-size: 1.125rem;
  }
  
  .p-5 {
    padding: 1rem;
  }
  
  .gap-4 {
    gap: 0.75rem;
  }
}
</style>
