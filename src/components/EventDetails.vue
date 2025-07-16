<template>
  <div class="event-details-wrapper bg-black text-white min-h-screen pb-10" v-if="event">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="absolute top-6 left-6 z-50 w-8 h-8 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-all duration-300 flex items-center justify-center shadow-xl border border-white/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Hero Image -->
      <div class="relative h-96 overflow-hidden">
        <img
          v-if="event.images && event.images.length"
          :src="event.images[0]"
          alt="Event Hero"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <!-- Title Overlay -->
        <div class="absolute bottom-8 left-8 right-8">
          <h1 class="text-xl sm:text-xl lg:text-6xl font-bold text-white mb-2">
            {{ event.name }}
          </h1>
          <div class="flex items-center gap-2 text-white/80">
            <div class="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <p class="text-lg">{{ event.location }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Tab Navigation -->
    <div
      ref="tabNavigation"
      class="sticky top-0 z-40 backdrop-blur-md"
      :class="{ 'shadow-lg': isTabsSticky }"
    >
      <div class="max-w-4xl mx-auto px-6">
        <div class="flex overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :data-tab="tab.id"
            @click="scrollToSection(tab.id)"
            class="flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 whitespace-nowrap"
            :class="activeTab === tab.id
              ? 'text-yellow-400 border-yellow-400'
              : 'text-white/70 border-transparent hover:text-white hover:border-white/30'"
          >
            <div class="flex items-center gap-2">
              <component :is="tab.icon" class="w-4 h-4" />
              {{ tab.label }}
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-6 py-12 space-y-12">
      
      <!-- Event Info -->
      <section
        id="details"
        ref="detailsSection"
        class="space-y-6"
      >
        <h2 class="text-lg font-medium text-white">
          Event Details
        </h2>
        
        <div class="space-y-6">
          <!-- Date & Time -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-white/60 text-sm">Date</p>
                <p class="text-white font-medium">{{ formatDate(event.date) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-white/60 text-sm">Time</p>
                <p class="text-white font-medium">{{ event.time }}</p>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-white/60 text-sm">Location</p>
              <a 
                :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.location)}`" 
                target="_blank" 
                class="text-white font-medium hover:text-yellow-400 transition-colors flex items-center gap-2"
              >
                {{ event.location }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Price -->
          <div v-if="event.ticketType === 'paid'" class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-white/60 text-sm">Price</p>
              <p class="text-green-400 font-bold text-xl">₹{{ event.price }} / Ticket</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Description -->
      <section
        id="about"
        ref="aboutSection"
        class="space-y-6"
      >
        <h2 class="text-lg font-medium text-white">
          About Event
        </h2>
        <div>
          <p class="text-white/80 leading-relaxed text-lg">{{ event.description }}</p>
        </div>
      </section>

      <!-- Social Links -->
      <section
        id="social"
        ref="socialSection"
        v-if="event.instagramLink || event.youtubeLink"
        class="space-y-6"
      >
        <h2 class="text-lg font-medium text-white">
          Follow Us
        </h2>
        <div>
          <div class="flex gap-4">
            <a 
              v-if="event.instagramLink" 
              :href="event.instagramLink" 
              target="_blank" 
              class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:from-pink-400 hover:to-purple-500 transition-all text-white"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            
            <a 
              v-if="event.youtubeLink" 
              :href="event.youtubeLink" 
              target="_blank" 
              class="flex items-center gap-3 px-4 py-3 bg-red-600 rounded-xl hover:bg-red-500 transition-all text-white"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section
        id="photos"
        ref="photosSection"
        v-if="event.images && event.images.length > 1"
        class="space-y-6"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-white">
            Photos
            <span class="text-sm text-white/60 ml-2">{{ event.images.length - 1 }}</span>
          </h2>
          <button
            @click="openGalleryModal(0)"
            class="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
          >
            See all photos
          </button>
        </div>
        
        <div class="rounded-2xl">
          <!-- Main featured image -->
          <div class="mb-4">
            <div
              class="group relative h-80 overflow-hidden rounded-xl cursor-pointer"
              @click="openGalleryModal(0)"
            >
              <img
                :src="event.images[1]"
                alt="Featured Gallery Image"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          </div>
          
          <!-- Horizontal scrolling thumbnails -->
          <div class="relative">
            <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div
                v-for="(image, index) in event.images.slice(1)"
                :key="index"
                class="group relative flex-shrink-0 w-32 h-24 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                @click="openGalleryModal(index)"
              >
                <img
                  :src="image"
                  alt="Gallery Thumbnail"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                <!-- Hover zoom icon -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Scroll indicators -->
            <div class="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none rounded-l-lg"></div>
            <div class="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none rounded-r-lg"></div>
          </div>
        </div>
      </section>

      <!-- Terms & Conditions -->
      <section
        id="terms"
        ref="termsSection"
        class="space-y-6"
      >
        <div class="overflow-hidden">
          <button
            @click="toggleTerms"
            class="w-full flex items-center justify-between text-left transition-colors"
          >
            <h3 class="text-lg font-medium text-white">Terms & Conditions</h3>
            <svg
              class="w-6 h-6 text-white transition-transform duration-300"
              :class="{ 'rotate-180': showFullTerms }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <transition name="fade-slide">
            <div v-if="showFullTerms">
              <div class="text-white/70 space-y-3">
                <ul class="space-y-2">
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Campster is a platform for independent creators to list their events.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Campster is not responsible for fraud, miscommunication, or cancellations by creators.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>For cancellations, refunds, or updates, please contact the event creator directly.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Campster does not verify every event. Attend at your own discretion.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Any disputes must be resolved between the user and the creator.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>We may remove events or ban creators who violate platform policies.</span>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- Contact Creator Button -->
      <section
        id="contact"
        ref="contactSection"
        class="space-y-6"
      >
        <div>
          <a
            :href="whatsappLink"
            target="_blank"
            class="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.937.546 3.78 1.487 5.347L2 22l4.887-1.41A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.946 7.946 0 0 1-4.27-1.21l-.303-.19L5 19l.744-2.41-.19-.304A8 8 0 1 1 12 20Zm3.477-5.198c-.187-.094-1.106-.546-1.278-.61s-.296-.094-.42.093c-.125.188-.48.61-.589.736s-.218.14-.405.047a6.37 6.37 0 0 1-2.723-2.415c-.205-.352.205-.327.586-1.092.065-.137.032-.253-.032-.347-.063-.094-.42-1.01-.575-1.384-.152-.373-.306-.32-.42-.326l-.358-.006a.78.78 0 0 0-.566.266c-.194.213-.738.722-.738 1.759s.756 2.047.861 2.191c.107.143 1.49 2.308 3.609 3.234.504.218.899.349 1.206.446.508.161.97.139 1.337.084.407-.06 1.106-.452 1.262-.888s.156-.81.109-.888-.171-.125-.358-.219Z" />
            </svg>
            Contact Creator
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
          <h3 class="text-xl font-semibold">Event Gallery</h3>
          <span class="text-white/60">{{ currentImageIndex + 1 }} of {{ event.images.length - 1 }}</span>
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
            :src="event.images[currentImageIndex + 1]" 
            :alt="`Event gallery image ${currentImageIndex + 1}`"
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
            v-if="currentImageIndex < event.images.length - 2"
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
            v-for="(image, index) in event.images.slice(1)"
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
      <p class="text-lg">Loading event details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Tab Icons as inline SVG components
const DetailsIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`
};

const AboutIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>`
};

const PhotoIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>`
};

const SocialIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0v2a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
  </svg>`
};

const TermsIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>`
};

const ContactIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>`
};

export default {
  components: {
    DetailsIcon,
    AboutIcon,
    PhotoIcon,
    SocialIcon,
    TermsIcon,
    ContactIcon
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const event = ref(null);
    const showFullTerms = ref(false);
    const galleryModalOpen = ref(false);
    const currentImageIndex = ref(0);

    // Tab functionality
    const activeTab = ref('details');
    const isTabsSticky = ref(false);
    const tabNavigation = ref(null);
    const detailsSection = ref(null);
    const aboutSection = ref(null);
    const photosSection = ref(null);
    const socialSection = ref(null);
    const termsSection = ref(null);
    const contactSection = ref(null);

    // Tab configuration
    const tabs = computed(() => {
      const tabList = [
        { id: 'details', label: 'Details', icon: 'DetailsIcon' },
        { id: 'about', label: 'About', icon: 'AboutIcon' }
      ];

      // Add Photos tab if images exist
      if (event.value?.images && event.value.images.length > 1) {
        tabList.push({ id: 'photos', label: 'Photos', icon: 'PhotoIcon' });
      }

      // Add Social tab if social links exist
      if (event.value?.instagramLink || event.value?.youtubeLink) {
        tabList.push({ id: 'social', label: 'Social', icon: 'SocialIcon' });
      }

      // Add other tabs
      tabList.push(
        { id: 'terms', label: 'Terms', icon: 'TermsIcon' },
        { id: 'contact', label: 'Contact', icon: 'ContactIcon' }
      );

      return tabList;
    });

    const toggleTerms = () => {
      showFullTerms.value = !showFullTerms.value;
    };

    const openGalleryModal = (index) => {
      currentImageIndex.value = index;
      galleryModalOpen.value = true;
    };

    const closeGalleryModal = () => {
      galleryModalOpen.value = false;
    };

    const nextImage = () => {
      if (currentImageIndex.value < event.value.images.length - 2) {
        currentImageIndex.value++;
      }
    };

    const previousImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
      }
    };

    // Tab functionality methods
    const scrollToSection = (sectionId) => {
      const sectionRef = getSectionRef(sectionId);
      if (sectionRef?.value) {
        const tabHeight = tabNavigation.value?.offsetHeight || 60;
        const offsetTop = sectionRef.value.offsetTop - tabHeight - 10;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    };

    const getSectionRef = (sectionId) => {
      const refs = {
        details: detailsSection,
        about: aboutSection,
        photos: photosSection,
        social: socialSection,
        terms: termsSection,
        contact: contactSection
      };
      return refs[sectionId];
    };

    // Intersection Observer for scroll-based tab switching
    const setupIntersectionObserver = () => {
      const options = {
        root: null,
        rootMargin: '-70px 0px -50% 0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && tabs.value.some(tab => tab.id === sectionId)) {
              activeTab.value = sectionId;
            }
          }
        });
      }, options);

      nextTick(() => {
        [detailsSection, aboutSection, photosSection, socialSection, termsSection, contactSection].forEach(ref => {
          if (ref?.value) {
            observer.observe(ref.value);
          }
        });
      });

      return observer;
    };

    // Handle scroll for sticky tabs
    const handleScroll = () => {
      if (tabNavigation.value) {
        const rect = tabNavigation.value.getBoundingClientRect();
        isTabsSticky.value = rect.top <= 0;
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

    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/${route.params.id}`);
        event.value = response.data;
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    const goBack = () => (window.history.length > 1 ? router.back() : router.push("/"));

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const whatsappLink = computed(() => {
      const message = `Hi! I found your "${event?.value?.name}" on Campster. I'm interested and would like some more details, please.`;
      return `https://wa.me/${event.value?.organizerPhone}?text=${encodeURIComponent(message)}`;
    });

    let intersectionObserver = null;

    onMounted(async () => {
      await fetchEventDetails();
      
      await nextTick();
      intersectionObserver = setupIntersectionObserver();
      
      document.addEventListener('keydown', handleKeydown);
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', handleScroll);
      
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    });

    return {
      event,
      showFullTerms,
      galleryModalOpen,
      currentImageIndex,
      toggleTerms,
      openGalleryModal,
      closeGalleryModal,
      nextImage,
      previousImage,
      fetchEventDetails,
      goBack,
      formatDate,
      whatsappLink,
      // Tab functionality
      activeTab,
      isTabsSticky,
      tabs,
      scrollToSection,
      tabNavigation,
      detailsSection,
      aboutSection,
      photosSection,
      socialSection,
      termsSection,
      contactSection
    };
  }
};
</script>

<style scoped>
.event-details-wrapper {
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

/* Transition animations */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>