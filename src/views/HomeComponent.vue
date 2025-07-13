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

          <!-- Segmented Control with Icons -->
          <div class="flex justify-center mb-8">
            <div class="flex border-b border-gray-700">
              <!-- Popular Tab -->
              <div
                class="relative px-8 py-3 cursor-pointer group"
                @click="switchTab('popular')"
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
                class="relative px-8 py-3 cursor-pointer group"
                @click="switchTab('hidden')"
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

          <!-- Places Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="place in (tab === 'popular' ? popularPlaces : hiddenPlaces)"
              :key="place._id"
            >
              <PlaceCard :place="place" />
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="(tab === 'popular' ? popularPlaces : hiddenPlaces).length === 0"
               class="text-center py-12">
            <div class="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <h3 class="text-lg font-medium text-white mb-2">No Places Found</h3>
              <p class="text-gray-400 text-sm">
                {{ tab === 'popular' ? 'No popular places available at the moment.' : 'No hidden gems discovered yet.' }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
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
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places`);
        store.setApprovedPlaces(response.data.places);
      } catch (error) {
        console.error(error);
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
      tab.value = newTab;
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
    };
  },
};
</script>

<style scoped>
.home-wrapper {
  scroll-behavior: smooth;
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

/* Simple button transitions */
button {
  transition: background-color 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>