<template>
  <div class="home-wrapper bg-black text-white min-h-screen pb-10 pt-10">
    <div>
      <!-- Places Section -->
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-6">
          <!-- Filters - Above Tabs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-between mb-8">
            <!-- City Filter - Left -->
            <CityFilter @places-updated="updatePlaces" />
            
            <!-- Sort Filter - Right -->
            <PlaceSortFilter @sort-changed="handleSortChange" />
          </div>

          <!-- Segmented Control with Icons (Original Design + Swipe Support) -->
          <div class="flex justify-center mb-8">
            <div
              class="flex border-b border-gray-700 relative transition-all duration-200 swipe-container"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              @touchcancel="handleTouchEnd"
            >
              <!-- Swipe indicator -->
              <div
                v-if="isSwipeInProgress"
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 animate-pulse"
              >
                {{ swipeDirection === 'left' ? '← Switching to Hidden' : swipeDirection === 'right' ? '→ Switching to Popular' : 'Swipe to switch tabs' }}
              </div>
              
              <!-- Popular Tab -->
              <div
                class="relative px-8 py-3 cursor-pointer group tab-item"
                @click="handleTabClick('popular')"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" :class="tab === 'popular' ? 'text-yellow-400' : 'text-gray-500'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span :class="tab === 'popular' ? 'text-white font-medium' : 'text-gray-400'" class="text-sm">
                    Popular
                  </span>
                </div>
                <div
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 transition-all duration-200"
                  :class="tab === 'popular' ? 'opacity-100' : 'opacity-0'"
                ></div>
              </div>

              <!-- Hidden Tab -->
              <div
                class="relative px-8 py-3 cursor-pointer group tab-item"
                @click="handleTabClick('hidden')"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" :class="tab === 'hidden' ? 'text-purple-400' : 'text-gray-500'" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                  <span :class="tab === 'hidden' ? 'text-white font-medium' : 'text-gray-400'" class="text-sm">
                    Hidden
                  </span>
                </div>
                <div
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 transition-all duration-200"
                  :class="tab === 'hidden' ? 'opacity-100' : 'opacity-0'"
                ></div>
              </div>
            </div>
          </div>

          <!-- Loading Skeleton -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <div v-for="n in 8" :key="n" class="animate-pulse">
              <div class="bg-gray-800 rounded-xl overflow-hidden">
                <div class="h-48 bg-gray-700"></div>
                <div class="p-4 space-y-3">
                  <div class="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div class="flex space-x-2">
                    <div class="h-6 bg-gray-700 rounded w-16"></div>
                    <div class="h-6 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Places Grid with Transition -->
          <div v-else class="relative">
            <transition name="slide" mode="out-in">
              <div :key="tab" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div
                  v-for="(place, index) in (tab === 'popular' ? popularPlaces : hiddenPlaces)"
                  :key="place._id"
                  class="transform transition-all duration-300 hover:scale-105"
                  :style="{ animationDelay: `${index * 50}ms` }"
                >
                  <PlaceCard :place="place" />
                </div>
              </div>
            </transition>
          </div>

          <!-- Empty State -->
          <div v-if="!isLoading && (tab === 'popular' ? popularPlaces : hiddenPlaces).length === 0"
               class="text-center py-12">
            <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 max-w-md mx-auto border border-gray-700/50 backdrop-blur-sm">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">No Places Found</h3>
              <p class="text-gray-400 text-sm">
                {{ tab === 'popular' ? 'No popular places available at the moment.' : 'No hidden gems discovered yet.' }}
              </p>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="mt-16 mb-8">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-white mb-2">What Campers Say</h2>
              <p class="text-gray-400">Real experiences from our community</p>
            </div>
            
            <!-- Reviews Carousel -->
            <div class="relative overflow-hidden">
              <div
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentReviewIndex * 100}%)` }"
              >
                <div
                  v-for="(review, index) in reviews"
                  :key="index"
                  class="w-full flex-shrink-0 px-4"
                >
                  <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm max-w-2xl mx-auto">
                    <div class="flex items-center mb-4">
                      <img :src="review.avatar" :alt="review.name" class="w-12 h-12 rounded-full mr-4 border-2 border-gray-600">
                      <div>
                        <h4 class="text-white font-semibold">{{ review.name }}</h4>
                        <div class="flex items-center">
                          <div class="flex text-yellow-400 mr-2">
                            <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Review Navigation Dots -->
              <div class="flex justify-center mt-6 space-x-2">
                <button
                  v-for="(review, index) in reviews"
                  :key="index"
                  @click="currentReviewIndex = index"
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="currentReviewIndex === index ? 'bg-yellow-400 w-6' : 'bg-gray-600'"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, onUnmounted } from 'vue';
import { useStore } from '../store/store';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import { getAuth } from "firebase/auth";
import { useUserStore } from "../store/user";
import CityFilter from '../components/CityFilter.vue';
import PlaceSortFilter from '../components/PlaceSortFilter.vue';
import router from '../RouteFolder/router';
import { usePlaceSort } from '../composables/usePlaceSort.js';

export default {
  components: {
    PlaceCard,
    AdminDashboard,
    CityFilter,
    PlaceSortFilter,
  },
  setup() {
    const store = useStore();
    const isAdmin = computed(() => store.isAdmin);
    const approvedPlaces = computed(() => store.approvedPlaces);
    const auth = getAuth();
    const userStore = useUserStore();
    
    // Initialize sorting functionality
    const { sortPlacesWithDistance, initializeLocation, setSortType } = usePlaceSort();
    const currentSortType = ref('default');

    // Loading state
    const isLoading = ref(true);

    // Touch/Swipe functionality
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const touchStartY = ref(0);
    const touchEndY = ref(0);
    const minSwipeDistance = 50;
    const maxVerticalDistance = 100;
    const isSwipeInProgress = ref(false);
    const swipeDirection = ref('');

    // Reviews data and state
    const currentReviewIndex = ref(0);
    const reviews = ref([
  
      {
        name: "Rahul",
        rating: 5,
        comment: "Hidden gem discovered through this app! The peaceful environment and stunning views made our weekend unforgettable."
      },
      {
        name: "Priya Sharma",
        rating: 4,
        comment: "Great platform for finding unique camping spots. ."
      },
      {
        name: "Ashish",
        rating: 5,
        comment: "Exceeded all expectations! The app made it so easy to find  perfect camping spot for our group."
      }
    ]);

    // Auto-rotate reviews
    let reviewInterval;

    const startReviewRotation = () => {
      reviewInterval = setInterval(() => {
        currentReviewIndex.value = (currentReviewIndex.value + 1) % reviews.value.length;
      }, 4000);
    };

    const stopReviewRotation = () => {
      if (reviewInterval) {
        clearInterval(reviewInterval);
      }
    };

    // Touch event handlers for swipe functionality
    const handleTouchStart = (e) => {
      touchStartX.value = e.touches[0].clientX;
      touchStartY.value = e.touches[0].clientY;
      isSwipeInProgress.value = false;
      swipeDirection.value = '';
      console.log('Touch start:', touchStartX.value, touchStartY.value);
    };

    const handleTouchMove = (e) => {
      if (!touchStartX.value) return;
      
      touchEndX.value = e.touches[0].clientX;
      touchEndY.value = e.touches[0].clientY;
      
      const swipeDistanceX = touchStartX.value - touchEndX.value;
      const swipeDistanceY = Math.abs(touchStartY.value - touchEndY.value);
      
      // Check if this is a horizontal swipe
      if (Math.abs(swipeDistanceX) > 20 && Math.abs(swipeDistanceX) > swipeDistanceY) {
        isSwipeInProgress.value = true;
        swipeDirection.value = swipeDistanceX > 0 ? 'left' : 'right';
        e.preventDefault(); // Prevent scrolling during swipe
      }
    };

    const handleTouchEnd = (e) => {
      if (!touchStartX.value) return;
      
      const swipeDistanceX = touchStartX.value - touchEndX.value;
      const swipeDistanceY = Math.abs(touchStartY.value - touchEndY.value);
      
      console.log('Touch end - swipeX:', swipeDistanceX, 'swipeY:', swipeDistanceY);
      
      // Only process horizontal swipes that meet minimum distance
      if (Math.abs(swipeDistanceX) > minSwipeDistance && swipeDistanceY < maxVerticalDistance) {
        if (swipeDistanceX > 0) {
          // Swipe left - switch to hidden tab
          console.log('Swiped left - switching to hidden');
          switchTab('hidden');
        } else {
          // Swipe right - switch to popular tab
          console.log('Swiped right - switching to popular');
          switchTab('popular');
        }
        e.preventDefault();
      }
      
      // Reset swipe state
      setTimeout(() => {
        isSwipeInProgress.value = false;
        swipeDirection.value = '';
      }, 300);
      
      touchStartX.value = 0;
      touchEndX.value = 0;
      touchStartY.value = 0;
      touchEndY.value = 0;
    };

    // Handle tab clicks (separate from touch events)
    const handleTabClick = (newTab) => {
      // Only process click if we're not in the middle of a swipe
      if (!isSwipeInProgress.value) {
        console.log('Tab clicked:', newTab);
        switchTab(newTab);
      }
    };

    const checkIfAdmin = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/adminfire/dashboard`, {
          params: {
            uid: auth.currentUser.uid
          }
        });
        store.setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status', error);
        return false;
      }
    }

    const fetchPlaces = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places`);
        store.setApprovedPlaces(response.data.places);
        
        // Simulate loading delay for better UX
        setTimeout(() => {
          isLoading.value = false;
        }, 1000);
      } catch (error) {
        console.error(error);
        isLoading.value = false;
      }
    };

    const updatePlaces = (newPlaces) => {
      store.setApprovedPlaces(newPlaces);
    };

    const tab = ref('popular');

    const popularPlaces = computed(() => {
      const filtered = approvedPlaces.value.filter(place => place.typeOfPlace === 'popular');
      return sortPlacesWithDistance(filtered, currentSortType.value);
    });

    const hiddenPlaces = computed(() => {
      const filtered = approvedPlaces.value.filter(place => place.typeOfPlace === 'hidden');
      return sortPlacesWithDistance(filtered, currentSortType.value);
    });

    const switchTab = (newTab) => {
      console.log('Switching to tab:', newTab, 'Current tab:', tab.value);
      if (newTab !== tab.value) {
        tab.value = newTab;
        console.log('Tab switched to:', tab.value);
      }
    };

    // Handle sort change
    const handleSortChange = (sortType) => {
      currentSortType.value = sortType;
      setSortType(sortType);
    };

    // Fetch places on component mount
    onMounted(async () => {
      checkIfAdmin();
      fetchPlaces();
      startReviewRotation();
      
      // Initialize user location for distance sorting
      await initializeLocation();
      
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          userStore.phone = user.phoneNumber;
          try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${user.uid}`);
            if (data.success) {
              userStore.name = data.user.name || "";
              userStore.email = data.user.email || "";
              userStore.gender = data.user.gender || "";
            }
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        }
      });
    });

    onUnmounted(() => {
      stopReviewRotation();
    });

    return {
      isAdmin,
      approvedPlaces,
      updatePlaces,
      tab,
      popularPlaces,
      hiddenPlaces,
      switchTab,
      handleSortChange,
      currentSortType,
      isLoading,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleTabClick,
      reviews,
      currentReviewIndex,
      isSwipeInProgress,
      swipeDirection,
    };
  },
};
</script>

<style scoped>
.home-wrapper {
  scroll-behavior: smooth;
}

/* Slide transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Staggered animation for place cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Pulse animation for loading skeleton */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Tab hover effects */
.group:hover .w-5 {
  transform: scale(1.1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Enhanced button transitions */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Gradient text effect */
.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Enhanced focus states */
button:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  /* Improve touch targets on mobile */
  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Reduce animation delays on mobile */
  .grid > div {
    animation-delay: 0ms !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .bg-gray-800 {
    background-color: rgba(31, 41, 55, 0.8);
  }
  
  .border-gray-700 {
    border-color: rgba(55, 65, 81, 0.6);
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Loading shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-pulse {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200px 100%;
  animation: shimmer 2s infinite;
}

/* Touch-friendly improvements */
.flex.border-b {
  touch-action: pan-x; /* Allow horizontal panning only */
  user-select: none; /* Prevent text selection during swipe */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Swipe feedback animations */
@keyframes swipeHint {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.swipe-hint {
  animation: swipeHint 1s ease-in-out infinite;
}

/* Enhanced touch targets */
@media (max-width: 768px) {
  .relative.px-8.py-3 {
    padding: 1rem 1.5rem; /* Larger touch targets on mobile */
    min-height: 48px; /* Minimum touch target size */
  }
}

</style>