<template>
  <div class="home-wrapper bg-black text-white min-h-screen">
    <!-- Admin view: Display pending places -->
    <div v-if="isAdmin" class="p-6">
      <AdminDashboard />
      <BlockBlogEditor />
    </div>
    
    <div v-else>
      <!-- Hero Section with Slideshow -->
      <section class="relative overflow-hidden">
        <SlideShow class="h-screen" />
        
        <!-- City Filter - Top Left Position -->
        <div class="absolute top-20 left-6 z-20">
          <CityFilter @places-updated="updatePlaces" />
        </div>
        
        <!-- Hero Overlay Content -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
          <div class="w-full p-8 pb-28">
            <div class="max-w-4xl mx-auto text-center">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp">
                Discover Hidden Gems
              </h1>
              <p class="text-xl sm:text-2xl text-white/80 mb-8 animate-fadeInUp animation-delay-200">
                Your Next Adventure Awaits – Explore Local Wonders
              </p>
              
              <!-- Quick Stats -->
              <div class="flex justify-center gap-8 text-center animate-fadeInUp animation-delay-400">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-2xl font-bold text-yellow-400">{{ popularPlaces.length }}</div>
                  <div class="text-sm text-white/80">Popular Places</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-2xl font-bold text-yellow-400">{{ hiddenPlaces.length }}</div>
                  <div class="text-sm text-white/80">Hidden Gems</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-2xl font-bold text-yellow-400">{{ approvedPlaces.length }}</div>
                  <div class="text-sm text-white/80">Total Places</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Scroll Cards Section -->
      <!-- <section class="py-12">
        <div class="max-w-7xl mx-auto px-6">
          <HomeScrollCards />
        </div>
      </section> -->

      <!-- Hidden Gem Promo -->
      <!-- <section class="py-12">
        <div class="max-w-7xl mx-auto px-6">
          <hiddenGemPromo />
        </div>
      </section> -->

      <!-- Places Section -->
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-6">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore Amazing Places
            </h2>
            <p class="text-lg text-white/70 max-w-2xl mx-auto">
              Discover breathtaking destinations and hidden treasures waiting to be explored
            </p>
          </div>

          <!-- Enhanced Tabs -->
          <div class="flex justify-center mb-12">
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
              <div class="flex">
                <!-- Popular Picks Tab -->
                <button
                  class="relative px-8 py-4 rounded-xl transition-all duration-300 font-medium"
                  :class="tab === 'popular' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'"
                  @click="switchTab('popular')"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Popular Picks
                    <span class="ml-2 px-2 py-1 text-xs rounded-full" 
                          :class="tab === 'popular' ? 'bg-black/20 text-black' : 'bg-yellow-400/20 text-yellow-400'">
                      {{ popularPlaces.length }}
                    </span>
                  </div>
                </button>

                <!-- Hidden Gems Tab -->
                <button
                  class="relative px-8 py-4 rounded-xl transition-all duration-300 font-medium"
                  :class="tab === 'hidden' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'"
                  @click="switchTab('hidden')"
                >
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Hidden Gems
                    <span class="ml-2 px-2 py-1 text-xs rounded-full" 
                          :class="tab === 'hidden' ? 'bg-black/20 text-black' : 'bg-yellow-400/20 text-yellow-400'">
                      {{ hiddenPlaces.length }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Places Grid with Enhanced Animation -->
          <div
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
            class="relative overflow-hidden"
          >
            <transition :name="swipeDirection" mode="out-in">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                :key="tab"
              >
                <div
                  v-for="(place, index) in (tab === 'popular' ? popularPlaces : hiddenPlaces)"
                  :key="place._id"
                  class="animate-fadeInUp"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <PlaceCard :place="place" />
                </div>
              </div>
            </transition>
          </div>

          <!-- Empty State -->
          <div v-if="(tab === 'popular' ? popularPlaces : hiddenPlaces).length === 0" 
               class="text-center py-16">
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <svg class="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 class="text-xl font-semibold text-white mb-2">No Places Found</h3>
              <p class="text-white/60">
                {{ tab === 'popular' ? 'No popular places available at the moment.' : 'No hidden gems discovered yet.' }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <!-- <section class="py-16">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-12 border border-yellow-400/30">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of explorers who have discovered amazing places through Campster. Start your journey today!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-xl transition-colors">
                Explore Places
              </button>
              <button class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors">
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>
      </section> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../store/store';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import SlideShow from '../components/Images/SlideShow.vue';
import { getAuth } from "firebase/auth";
import { useUserStore } from "../store/user";
import CityFilter from '../components/CityFilter.vue';
import HomeScrollCards from '../components/HomeScrollCards.vue';
import router from '../RouteFolder/router';
import BlockBlogEditor from '../components/blog/BlockBlogEditor.vue';
import hiddenGemPromo from '../components/hiddenGemPromo.vue';

export default {
  components: {
    PlaceCard,
    AdminDashboard,
    SlideShow,
    CityFilter,
    HomeScrollCards,
    BlockBlogEditor,
    hiddenGemPromo,
  },
  setup() {
    const store = useStore();
    const isAdmin = computed(() => store.isAdmin);
    const approvedPlaces = computed(() => store.approvedPlaces);
    const auth = getAuth();
    const userStore = useUserStore();

    const goToTripPlanner = () => {
      router.push('/Tripplanner');
    }

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

    const popularPlaces = computed(() =>
      approvedPlaces.value.filter(place => place.typeOfPlace === 'popular')
    );

    const hiddenPlaces = computed(() =>
      approvedPlaces.value.filter(place => place.typeOfPlace === 'hidden')
    );

    const swipeDirection = ref('slide-left');

    const switchTab = (newTab) => {
      if (newTab !== tab.value) {
        swipeDirection.value = newTab === 'hidden' ? 'slide-left' : 'slide-right';
        tab.value = newTab;
      }
    };

    // Swipe logic
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) < 50) return;

      if (diff > 0 && tab.value === 'popular') {
        switchTab('hidden');
      } else if (diff < 0 && tab.value === 'hidden') {
        switchTab('popular');
      }
    };

    // Fetch places on component mount
    onMounted(() => {
      checkIfAdmin();
      fetchPlaces();
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
      goToTripPlanner,
      tab,
      popularPlaces,
      hiddenPlaces,
      handleTouchStart,
      handleTouchEnd,
      switchTab,
      swipeDirection,
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

/* Enhanced slide animations */
.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

/* Enhanced fade in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* Animation delays */
.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* Card hover effects */
.grid > div {
  transition: transform 0.3s ease;
}

.grid > div:hover {
  transform: translateY(-5px);
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

/* Button hover effects */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>