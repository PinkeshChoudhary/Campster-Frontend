<template>
  <div
    class="p-4 pb-20 max-w-5xl mx-auto mb-20 pt-20 text-white bg-black"
    v-if="place"
  >
    <!-- Back Button -->
    <button
      @click="goBack"
      class="text-yellow-400 hover:text-yellow-200 transition duration-200 flex items-center mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-8 h-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span class="ml-2">Back</span>
    </button>

    <!-- Destination Title -->
    <h2 class="text-4xl font-bold text-yellow-400 mb-6 text-center">
      {{ place.destination }}
    </h2>

    <!-- Images Grid -->
    <div
      v-if="place.images && place.images.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10"
    >
      <img
        v-for="(image, index) in place.images"
        :key="index"
        :src="image"
        alt="Place Image"
        class="rounded-lg shadow-md cursor-pointer"
        @click="openFullScreen(image)"
      />
    </div>

    <!-- Fullscreen Overlay -->
    <div
      v-if="fullScreenImage"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center"
      @click="closeFullScreen"
    >
      <img :src="fullScreenImage" class="max-w-full max-h-full rounded-lg" />
    </div>

    <!-- Today's Vibe -->
    <div v-if="place.typeOfPlace === 'hidden'" class="mt-4 p-4 bg-black rounded-xl shadow-lg">
      <div v-if="place.todaysVibe" class="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
        <p class="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <span class="font-semibold text-gray-700">Today's Vibe</span> •
          {{ new Date(place.todaysVibe.uploadedAt).toLocaleString() }}
        </p>

        <!-- Image Vibe -->
        <img
          v-if="place.todaysVibe.mediaType === 'image'"
          :src="place.todaysVibe.mediaUrl"
          alt="Today's vibe"
          class="rounded-xl w-full object-cover max-h-96 shadow-md transition hover:scale-[1.02]"
        />

        <!-- Video Vibe -->
        <video
          v-else
          controls
          class="rounded-xl w-full shadow-md max-h-96 mt-2"
        >
          <source :src="place.todaysVibe.mediaUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div v-if="place.todaysVibe.uploader" class="text-xs text-gray-400 mt-2">
          Uploaded by {{ place.todaysVibe.uploader }}
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center space-y-4">
        <input
          id="vibeUpload"
          type="file"
          accept="image/*,video/*"
          @change="handleVibeUpload"
          class="hidden"
        />

        <label
          for="vibeUpload"
          class="w-20 h-20 bg-yellow-500 hover:bg-yellow-400 hover:shadow-xl transition-all duration-300 text-black flex items-center justify-center rounded-full cursor-pointer relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7h4l1-2h8l1 2h4v12H3V7zm9 3a4 4 0 110 8 4 4 0 010-8z"
            />
          </svg>
          <span class="absolute top-0 left-0 w-full h-full rounded-full animate-ping bg-yellow-400 opacity-30"></span>
        </label>

        <p class="text-gray-400 text-sm">Capture or upload your vibe</p>
      </div>
    </div>

    <!-- Like Counter -->
    <h2 class="text-lg text-yellow-400 font-semibold transition-all duration-300 mt-2 text-center">
      ❤️ Like {{ likes }}
    </h2>

    <!-- Details Section -->
    <div class="mt-6 pt-2 border-t border-gray-700">
      <p class="text-lg mb-2">{{ place.description }}</p>
      <p class="text-lg mb-4">
        <strong>Location:</strong> {{ place.location }}
      </p>

      <div class="my-2 border-t-2 border-gray-700"></div>

      <div
        v-if="place.influncerInstaGramProfile"
        class="flex items-center gap-2 mt-4"
      >
        <a
          :href="place.influncerInstaGramProfile"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-pink-500 hover:text-pink-400 text-lg font-semibold relative group"
        >
          <i class="fab fa-instagram text-2xl"></i>
          <span>Instagram</span>
          <span class="ml-2 bg-pink-600 text-white text-xs font-semibold rounded-full px-2 py-0.5">
            Influencer Profile
          </span>
        </a>
      </div>
    </div>

    <div class="my-4 border-t-2 border-gray-700"></div>
<!-- Comments Section -->
<div class="pt-6 bg-black p-4 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-800">
  <h3 class="text-3xl font-extrabold text-yellow-400 mb-6 text-center">Comments</h3>

  <div v-if="comments.length">
    <div
      v-for="(comment, index) in comments"
      :key="index"
      class="mb-4 p-4 bg-gray-800 rounded-lg shadow-sm"
    >
      <div class="flex justify-between text-sm text-gray-300 mb-2">
        <span><i class="fas fa-user-circle mr-1"></i>{{ comment.user }}</span>
        <span><i class="far fa-clock mr-1"></i>{{ new Date(comment.createdAt).toLocaleDateString('en-GB') }}</span>
      </div>
      <p class="text-base text-white">{{ comment.text }}</p>
    </div>
  </div>
  <p v-else class="text-gray-500 text-center">No comments yet. Be the first to comment!</p>

  <div class="mt-6">
    <textarea
      v-model="newComment"
      class="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      rows="3"
      placeholder="Write a comment..."
    ></textarea>
    <button
      @click="addComment"
      class="mt-3 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition duration-200 font-semibold shadow w-full"
    >
      Post Comment
    </button>
  </div>
</div>

<!-- Map Section -->
<div v-if="place.locationCoordinates" class="mt-6 bg-black p-4 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-800">
  <button
    @click="openGoogleMaps"
    class="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-md transition duration-200 w-full justify-center"
  >
    <i class="fas fa-map-marked-alt text-lg"></i>
    <span>Navigate with Google Maps</span>
  </button>

  <div class="mt-4 h-48 w-full rounded-xl overflow-hidden shadow-inner border border-gray-700">
    <iframe
      class="w-full h-full"
      :src="`https://www.google.com/maps?q=${place.locationCoordinates.lat},${place.locationCoordinates.lng}&z=15&output=embed`"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
</div>

<!-- Divider -->
<div class="my-6 border-t-2 border-gray-700 max-w-3xl mx-auto"></div>

<!-- CampsterAI Assistant Section -->
<div class="bg-black p-4 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-800">
  <h3 class="text-3xl font-extrabold text-yellow-400 mb-6 text-center">
    Ask CampsterAI
  </h3>

  <div class="flex flex-wrap justify-center gap-3 mb-6">
    <button
      v-for="option in quickPrompts"
      :key="option.label"
      @click="askQuickPrompt(option.prompt)"
      class="bg-gray-800 hover:bg-yellow-500 hover:text-black text-white px-5 py-2 rounded-full text-sm transition duration-200 shadow-sm"
    >
      {{ option.label }}
    </button>
  </div>

  <div class="flex flex-col sm:flex-row gap-4 items-center mb-6">
    <input
      v-model="travelPrompt"
      type="text"
      placeholder="Ask about travel, blogs, tips..."
      class="flex-1 w-full p-3 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
    />
    <button
      @click="askSakhiAI"
      class="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition duration-200 font-semibold shadow"
    >
      Ask
    </button>
  </div>

  <div
    v-if="sakhiResponse"
    class="bg-gray-900 p-5 rounded-lg shadow-inner text-white whitespace-pre-wrap border border-gray-700"
  >
    {{ sakhiResponse }}
  </div>
</div>

  </div>

  <div v-else class="text-center text-yellow-400 pt-40 bg-black h-screen">
    <p><i class="fas fa-spinner fa-spin"></i> Loading details...</p>
  </div>
</template>
<script>
import {
    ref,
    onMounted,
    computed
} from 'vue';
import {
    useRoute,
    useRouter
} from 'vue-router';
import axios from 'axios';
import {
    useUserStore
} from '../store/user';

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
        const travelPrompt = ref("");
        const sakhiResponse = ref("");

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

        // Fetch Likes
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
            if (place.value && place.value.locationCoordinates) {
                window.open(`https://www.google.com/maps?q=${place.value.locationCoordinates}`, '_blank');
            }
        };

        const openFullScreen = (image) => {
            fullScreenImage.value = image;
        };

        const closeFullScreen = () => {
            fullScreenImage.value = null;
        };
  const quickPrompts = computed(() => {
  const destination = place.value?.destination || 'this place';
  const city = place.value?.location || '';

  return [
    { label: "Best Day Time", prompt: `What is the best Day Time to visit ${destination}, ${city}?` },
    { label: "Best Season", prompt: `What is the best season to visit ${destination}, ${city}?` },
    { label: "Safety", prompt: `Is ${destination}, ${city} safe for tourists?` },
    { label: "Things to Do", prompt: `What are the top things to do in ${destination}, ${city}?` },
    { label: "Backpack Tips", prompt: `backpack tips  when traveling to ${destination}, ${city}?` }
  ];
});

        const askQuickPrompt = async (prompt) => {
            travelPrompt.value = prompt;
            await askSakhiAI();
        };

        // Ask SakhiAI
        const askSakhiAI = async () => {
            if (!travelPrompt.value.trim()) return;
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/travel-plan`, {
                    prompt: travelPrompt.value.trim()
                });
                sakhiResponse.value = response.data.result || "No response received.";
            } catch (error) {
                console.error("SakhiAI error:", error);
                sakhiResponse.value = "Error fetching response.";
            }
        };
const handleVibeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        await uploadTodaysVibe(file);
        await fetchPlaceDetails(); // Refresh place to show updated vibe
    } catch (err) {
        console.error("Error uploading vibe:", err);
        alert("Failed to upload vibe. Please try again.");
    }
};

const uploadTodaysVibe = async (file) => {

    const formData = new FormData();
    formData.append("media", file);
    formData.append("uploadedBy", userName.value); // optional, based on your backend

    try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/places/${place.value._id}/todays-vibe`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        throw new Error(error.response?.data?.message || "Upload failed");
    }
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
            travelPrompt,
            sakhiResponse,
            askSakhiAI,
            askQuickPrompt,
            quickPrompts,
            handleVibeUpload
        };
    },
};
</script>
