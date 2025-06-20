<template>
  <div class="glamping-details-wrapper bg-black text-white min-h-screen" v-if="site">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="fixed top-6 left-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Hero Image -->
      <div class="relative h-96 overflow-hidden">
        <img
          v-if="site.images && site.images.length"
          :src="site.images[0]"
          alt="Glamping Site Hero"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <!-- Title Overlay -->
        <div class="absolute bottom-8 left-8 right-8">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
            {{ site.name }}
          </h1>
          <div class="flex items-center gap-2 text-white/80 mb-3">
            <div class="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <p class="text-lg">{{ site.location }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-3xl font-bold text-yellow-400">₹{{ site.pricePerNight }}</span>
            <span class="text-white/80">/ night</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-6 py-12 space-y-12">
      
      <!-- Site Info -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          About This Place
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p class="text-white/80 leading-relaxed text-lg">{{ site.description }}</p>
        </div>
      </section>

      <!-- Pricing & Details -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Pricing & Details
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-white/60 text-sm">Price per night</p>
                <p class="text-green-400 font-bold text-xl">₹{{ site.pricePerNight }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-white/60 text-sm">Location</p>
                <p class="text-white font-medium">{{ site.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Amenities -->
      <section v-if="amenityList.length" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Amenities
          <span class="text-sm text-white/60 ml-2">{{ amenityList.length }} available</span>
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="(amenity, index) in amenityList"
              :key="index"
              class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div class="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
              <span class="text-white/90">{{ amenity }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Permissions -->
      <section v-if="permissionList.length" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          What's Allowed
          <span class="text-sm text-white/60 ml-2">{{ permissionList.length }} permissions</span>
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="(permission, index) in permissionList"
              :key="index"
              class="flex items-center gap-3 p-3 bg-green-400/10 rounded-xl border border-green-400/20 hover:bg-green-400/20 transition-colors"
            >
              <div class="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-white/90">{{ permission }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section v-if="site.images && site.images.length > 1" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Gallery
          <span class="text-sm text-white/60 ml-2">{{ site.images.length - 1 }} photos</span>
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <div
              v-for="(image, index) in site.images.slice(1)"
              :key="index"
              class="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-white/5 hover:scale-105 transition-all duration-300"
              @click="openGalleryModal(index)"
            >
              <img
                :src="image"
                alt="Glamping Gallery Image"
                class="w-full h-full object-cover"
              />
              
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
              </div>
              
              <div class="absolute bottom-2 right-2 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full">
                {{ index + 1 }}
              </div>
            </div>
          </div>
          
          <div class="mt-4 text-center text-white/60 text-sm">
            Click any image to browse all photos
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Book Your Stay
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div class="text-center mb-6">
            <p class="text-white/80 text-lg mb-2">Ready to experience this amazing place?</p>
            <p class="text-white/60">Contact us via WhatsApp for instant booking</p>
          </div>
          
          <a 
            :href="whatsappLink" 
            target="_blank" 
            class="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.937.546 3.78 1.487 5.347L2 22l4.887-1.41A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.946 7.946 0 0 1-4.27-1.21l-.303-.19L5 19l.744-2.41-.19-.304A8 8 0 1 1 12 20Zm3.477-5.198c-.187-.094-1.106-.546-1.278-.61s-.296-.094-.42.093c-.125.188-.48.61-.589.736s-.218.14-.405.047a6.37 6.37 0 0 1-2.723-2.415c-.205-.352.205-.327.586-1.092.065-.137.032-.253-.032-.347-.063-.094-.42-1.01-.575-1.384-.152-.373-.306-.32-.42-.326l-.358-.006a.78.78 0 0 0-.566.266c-.194.213-.738.722-.738 1.759s.756 2.047.861 2.191c.107.143 1.49 2.308 3.609 3.234.504.218.899.349 1.206.446.508.161.97.139 1.337.084.407-.06 1.106-.452 1.262-.888s.156-.81.109-.888-.171-.125-.358-.219Z" />
            </svg>
            Contact via WhatsApp
          </a>
        </div>
      </section>
    </div>

    <!-- Gallery Modal -->
    <div
      v-if="galleryModalOpen"
      class="fixed inset-0 bg-black/95 z-50 flex flex-col"
      @click="closeGalleryModal"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 text-white">
        <div class="flex items-center gap-4">
          <h3 class="text-xl font-semibold">{{ site.name }} Gallery</h3>
          <span class="text-white/60">{{ currentImageIndex + 1 }} of {{ site.images.length - 1 }}</span>
        </div>
        <button
          @click="closeGalleryModal"
          class="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Main Image Display -->
      <div class="flex-1 flex items-center justify-center p-6" @click.stop>
        <div class="relative max-w-4xl max-h-full">
          <img 
            :src="site.images[currentImageIndex + 1]" 
            :alt="`Gallery image ${currentImageIndex + 1}`"
            class="max-w-full max-h-full object-contain rounded-xl"
          />
          
          <!-- Navigation Arrows -->
          <button
            v-if="currentImageIndex > 0"
            @click="previousImage"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            v-if="currentImageIndex < site.images.length - 2"
            @click="nextImage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Thumbnail Strip -->
      <div class="p-6 pt-0" @click.stop>
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
          <div
            v-for="(image, index) in site.images.slice(1)"
            :key="index"
            class="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg cursor-pointer bg-white/5 border-2 transition-all duration-300"
            :class="currentImageIndex === index ? 'border-yellow-400' : 'border-transparent hover:border-white/40'"
            @click="currentImageIndex = index"
          >
            <img
              :src="image"
              alt="Thumbnail"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="text-center text-white/60 text-sm pb-6">
        Use arrow keys or click thumbnails to navigate • Click outside to close
      </div>
    </div>
  </div>

  <div v-else class="bg-black min-h-screen flex items-center justify-center">
    <div class="text-center text-white">
      <div class="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-lg">Loading glamping site details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const site = ref(null);
const galleryModalOpen = ref(false);
const currentImageIndex = ref(0);

const openGalleryModal = (index) => {
  currentImageIndex.value = index;
  galleryModalOpen.value = true;
};

const closeGalleryModal = () => {
  galleryModalOpen.value = false;
};

const nextImage = () => {
  if (currentImageIndex.value < site.value.images.length - 2) {
    currentImageIndex.value++;
  }
};

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

// Keyboard navigation for gallery
const handleKeydown = (event) => {
  if (!galleryModalOpen.value) return;
  
  if (event.key === 'ArrowLeft') {
    previousImage();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'Escape') {
    closeGalleryModal();
  }
};

const fetchGlampingSite = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/glamping/${route.params.id}`);
    site.value = response.data;
  } catch (error) {
    console.error("Error fetching glamping site:", error);
  }
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};

const whatsappLink = computed(() => {
  const phoneNumber = "917568095317";
  const message = `Hello, I am interested in booking ${site.value?.name || ''}. Could you please provide more details?`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
});

const amenityList = computed(() => {
  if (!site.value?.amenities) return [];
  return Object.entries(site.value.amenities)
    .filter(([_, value]) => value)
    .map(([key]) => formatKey(key));
});

const permissionList = computed(() => {
  if (!site.value?.permissions) return [];
  return Object.entries(site.value.permissions)
    .filter(([_, value]) => value)
    .map(([key]) => formatKey(key));
});

const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")       // camelCase to spaced
    .replace(/^./, str => str.toUpperCase()); // Capitalize
};

onMounted(() => {
  fetchGlampingSite();
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.glamping-details-wrapper {
  scroll-behavior: smooth;
}

/* Hide scrollbar for thumbnail strip */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Custom scrollbar for main content */
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
</style>
