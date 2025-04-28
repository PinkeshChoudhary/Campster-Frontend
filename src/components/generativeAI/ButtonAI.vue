<template>
    <div>
      <!-- Floating "Ask AI" Button -->
      <button 
    :class="['fixed bottom-20 right-1 z-50 hover:bg-gray-700 text-yellow-500 font-semibold py-3 px-6 rounded-full shadow-lg transition-transform duration-300', zoomClass]"
    @click="showModal = true"
  >
  <i class="fas fa-paper-plane text-2xl"></i> 
    Ask AI
  </button>
  
      <!-- Modal -->
      <teleport to="body">
        <transition name="fade">
          <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-gray-900 text-white rounded-2xl p-6 w-11/12 max-w-md shadow-2xl relative">
  
              <!-- Close Button -->
              <button 
                class="absolute top-4 right-4 text-gray-400 hover:text-white"
                @click="showModal = false"
              >
                ✖
              </button>
  
              <!-- Modal Content -->
              <h2 class="text-2xl font-bold mb-6 text-center text-yellow-500">Travel Buddy</h2>
              
              <div class="flex items-center space-x-2">
                <input 
                  type="text"
                  v-model="travelPrompt"
                  placeholder="Type your travel query..."
                  class="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
  
                <!-- FontAwesome Send Icon -->
                <button 
                  @click="getTravelPlan"
                  class="bg-violet-600 hover:bg-blue-700 p-3 rounded-lg transition"
                >
                  <i class="fas fa-paper-plane text-white"></i>
                </button>
              </div>
  
              <!-- Status & Results -->
              <div v-if="loading" class="text-center text-gray-400 mt-6">Loading...</div>
              <div v-else-if="error" class="text-center text-red-400 mt-6">{{ error }}</div>
              <div v-else-if="results" class="mt-6 prose prose-invert max-w-full" v-html="results"></div>
  
            </div>
          </div>
        </transition>
      </teleport>
    </div>
  </template>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showModal = ref(false);
const travelPrompt = ref('');
const results = ref('');
const loading = ref(false);
const error = ref('');
const zoomClass = ref('');
let intervalId;

const getTravelPlan = async () => {
  if (!travelPrompt.value.trim()) {
    return;
  }

  loading.value = true;
  error.value = '';
  results.value = '';

  try {
    // Construct the full API URL using the base URL from environment variables
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/travel-plan`;
    const updatedPrompt = travelPrompt.value + 'in short';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: updatedPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      error.value = errorData.error || 'Failed to fetch travel plan.'; // Use the 'error' field from the backend
      return;
    }

    const data = await response.json();
    results.value = data.result; // The backend sends the result in the 'result' field
  } catch (err) {
    console.error('Error fetching travel plan:', err);
    error.value = 'An unexpected error occurred.';
  } finally {
    loading.value = false;
    travelPrompt.value = ''; // Clear the input after successful retrieval
  }
};
onMounted(() => {
  intervalId = setInterval(() => {
    zoomClass.value = 'scale-110';  // Zoom in
    setTimeout(() => {
      zoomClass.value = 'scale-100'; // Zoom out
    }, 500); // after 500ms shrink back
  }, 1500); // every 1.5 seconds do zoom effect
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Basic styling for the component */
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.modal {
  display: block; /* Initially hidden using v-if */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}

.modal input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.modal button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
}

.modal button:last-child {
  background-color: #dc3545;
}

.modal > div {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 3px;
  white-space: pre-wrap; /* Preserve line breaks from the API */
}

.loading {
  font-style: italic;
  color: #555;
}

.error {
  color: #dc3545;
  font-weight: bold;
}
</style>