<template>
  <div class="place-details-wrapper bg-black text-white min-h-screen pb-10 pt-10" v-if="place">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="fixed top-16 left-2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Hero Image -->
      <div class="relative h-96 overflow-hidden">
        <img
          v-if="place.images && place.images.length"
          :src="place.images[0]"
          alt="Place Hero"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <!-- Title Overlay -->
        <div class="absolute bottom-8 left-8 right-8">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
            {{ place.destination }}
          </h1>
          <div class="flex items-center gap-2 text-white/80">
            <div class="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <p class="text-lg">{{ place.location }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-6 py-12 space-y-12">
      
      <!-- Image Gallery -->
      <section v-if="place.images && place.images.length > 1" class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
            <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
            Photos
            <span class="text-sm text-white/60 ml-2">{{ place.images.length - 1 }}</span>
          </h2>
          <button
            @click="openGalleryModal(0)"
            class="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
          >
            See all photos
          </button>
        </div>
        
        <!-- Horizontal Scrolling Gallery -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <!-- Main featured image -->
          <div class="mb-4">
            <div
              class="group relative h-80 overflow-hidden rounded-xl cursor-pointer bg-white/5"
              @click="openGalleryModal(0)"
            >
              <img
                :src="place.images[1]"
                alt="Featured Gallery Image"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              <div class="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                Featured Photo
              </div>
              <div class="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                1 / {{ place.images.length - 1 }}
              </div>
            </div>
          </div>
          
          <!-- Horizontal scrolling thumbnails -->
          <div class="relative">
            <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div
                v-for="(image, index) in place.images.slice(1)"
                :key="index"
                class="group relative flex-shrink-0 w-32 h-24 overflow-hidden rounded-lg cursor-pointer bg-white/5 transition-all duration-300 hover:scale-105"
                @click="openGalleryModal(index)"
              >
                <img
                  :src="image"
                  alt="Gallery Thumbnail"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                
                <!-- Image number -->
                <div class="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {{ index + 1 }}
                </div>
                
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

      <!-- Description -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          About
        </h2>
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p class="text-white/80 leading-relaxed text-lg">{{ place.description }}</p>
          
          <!-- Like Counter -->
          <div class="flex items-center gap-2 mt-6 pt-6 border-t border-white/10">
            <div class="flex items-center gap-2 text-red-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">{{ likes }} likes</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Vibe -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Latest Vibe
          <span class="text-sm text-white/60 ml-2">Share your moment</span>
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div v-if="place.todaysVibe" class="space-y-4">
            <div class="flex items-center justify-between text-sm text-white/60">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{{ new Date(place.todaysVibe.uploadedAt).toLocaleDateString() }}</span>
              </div>
              <span v-if="place.todaysVibe.uploader" class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                {{ place.todaysVibe.uploader }}
              </span>
            </div>

            <!-- Image Vibe -->
            <div v-if="place.todaysVibe.mediaType === 'image'" class="relative">
              <img
                :src="place.todaysVibe.mediaUrl"
                alt="Latest vibe"
                class="w-full object-cover max-h-96 rounded-xl"
              />
              <div class="absolute top-4 left-4 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
                Photo
              </div>
            </div>

            <!-- Video Vibe -->
            <div v-else class="relative">
              <video
                controls
                class="w-full shadow-md max-h-96 rounded-xl"
                poster=""
              >
                <source :src="place.todaysVibe.mediaUrl" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div class="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Video
              </div>
            </div>

            <!-- Replace/Update Options -->
            <div class="border-t border-white/10 pt-4">
              <div class="flex items-center justify-between mb-3">
                <p class="text-sm text-white/70">Want to update latest vibe?</p>
                <span class="text-xs text-white/50">New upload will replace current content</span>
              </div>
              
              <input
                id="vibeReplaceUpload"
                type="file"
                accept="image/*,video/*"
                @change="handleVibeUpload"
                class="hidden"
              />

              <div class="flex gap-3">
                <!-- Camera Button -->
                <button
                  @click="openCamera"
                  class="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg cursor-pointer transition-all duration-300"
                  title="Take New Photo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm font-medium">Take New Photo</span>
                </button>

                <!-- Upload Button -->
                <label
                  for="vibeReplaceUpload"
                  class="flex items-center gap-2 px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 rounded-lg cursor-pointer transition-all duration-300"
                  title="Upload New Media"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span class="text-sm font-medium">Upload New Media</span>
                </label>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-12 space-y-6">
            <div class="text-center space-y-2">
              <h3 class="text-lg font-medium text-white">Share Today's Vibe</h3>
              <p class="text-white/60 text-sm">Capture the moment with a photo or video</p>
            </div>

            <input
              id="vibeUpload"
              type="file"
              accept="image/*,video/*"
              @change="handleVibeUpload"
              class="hidden"
            />

            <div class="grid grid-cols-2 gap-4 w-full max-w-xs">
              <!-- Camera Button -->
              <button
                @click="openCamera"
                class="flex flex-col items-center gap-3 p-6 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl cursor-pointer transition-all duration-300"
                title="Take Photo"
              >
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span class="text-sm font-medium">Take Photo</span>
              </button>

              <!-- Upload Button -->
              <label
                for="vibeUpload"
                class="flex flex-col items-center gap-3 p-6 bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 rounded-xl cursor-pointer transition-all duration-300"
                title="Upload Photo or Video"
              >
                <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <span class="text-sm font-medium">Upload Media</span>
              </label>
            </div>

            <div class="text-center space-y-1">
              <p class="text-white/60 text-sm">Supported formats:</p>
              <div class="flex items-center justify-center gap-4 text-xs text-white/50">
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                  </svg>
                  JPG, PNG, WEBP
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  MP4, MOV, AVI
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Instagram Profile -->
      <section v-if="place.influncerInstaGramProfile" class="space-y-6">
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <a
            :href="place.influncerInstaGramProfile"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 text-pink-400 hover:text-pink-300 transition-colors group"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <i class="fab fa-instagram text-white text-xl"></i>
            </div>
            <div>
              <p class="font-semibold">Follow on Instagram</p>
              <p class="text-sm text-white/60">Influencer Profile</p>
            </div>
            <svg class="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <!-- Map Section -->
      <section v-if="place.locationCoordinates" class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Location
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4">
          <button
            @click="openGoogleMaps"
            class="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Navigate with Google Maps
          </button>

          <div class="h-64 w-full rounded-xl overflow-hidden">
            <iframe
              class="w-full h-full"
              :src="`https://www.google.com/maps?q=${place.locationCoordinates.lat},${place.locationCoordinates.lng}&z=15&output=embed`"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <!-- Comments Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Comments
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-6">
          <div v-if="comments.length" class="space-y-4">
            <div
              v-for="(comment, index) in comments"
              :key="index"
              class="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-white">{{ comment.user }}</span>
                <span class="text-xs text-white/60">{{ new Date(comment.createdAt).toLocaleDateString('en-GB') }}</span>
              </div>
              <p class="text-white/80">{{ comment.text }}</p>
            </div>
          </div>
          <p v-else class="text-white/60 text-center py-8">No comments yet. Be the first to comment!</p>

          <div class="space-y-4">
            <textarea
              v-model="newComment"
              class="w-full p-4 bg-white/5 text-white rounded-xl border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
              rows="3"
              placeholder="Write a comment..."
            ></textarea>
            <button
              @click="addComment"
              class="w-full bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors font-semibold"
            >
              Post Comment
            </button>
          </div>
        </div>
      </section>

      <!-- CampsterAI Assistant -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-white flex items-center gap-3">
          <div class="w-1 h-6 bg-yellow-400 rounded-full"></div>
          Ask CampsterAI
        </h2>
        
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-6">
          <div class="flex flex-wrap gap-3">
            <button
              v-for="option in quickPrompts"
              :key="option.label"
              @click="askQuickPrompt(option.prompt)"
              class="px-4 py-2 bg-white/10 hover:bg-yellow-400 hover:text-black text-white rounded-full text-sm transition-all duration-300 border border-white/20 hover:border-yellow-400"
            >
              {{ option.label }}
            </button>
          </div>

          <div class="flex gap-4">
            <input
              v-model="travelPrompt"
              type="text"
              placeholder="Ask about travel, blogs, tips..."
              class="flex-1 p-4 bg-white/5 text-white rounded-xl border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <button
              @click="askSakhiAI"
              class="px-6 py-4 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 transition-colors font-semibold"
            >
              Ask
            </button>
          </div>

          <div
            v-if="sakhiResponse"
            class="bg-white/5 p-6 rounded-xl border border-white/10 text-white/90 whitespace-pre-wrap"
          >
            {{ sakhiResponse }}
          </div>
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
          <h3 class="text-xl font-semibold">Gallery</h3>
          <span class="text-white/60">{{ currentImageIndex + 1 }} of {{ place.images.length - 1 }}</span>
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
            :src="place.images[currentImageIndex + 1]"
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
            v-if="currentImageIndex < place.images.length - 2"
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
            v-for="(image, index) in place.images.slice(1)"
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

    <!-- Camera Modal -->
    <div
      v-if="cameraModalOpen"
      class="fixed inset-0 bg-black/95 z-50 flex flex-col"
      @click="closeCameraModal"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 text-white">
        <div class="flex items-center gap-4">
          <h3 class="text-xl font-semibold">Take Photo</h3>
        </div>
        <button
          @click="closeCameraModal"
          class="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Camera View -->
      <div class="flex-1 flex items-center justify-center p-6" @click.stop>
        <div class="relative max-w-2xl w-full">
          <!-- Video Stream -->
          <video
            ref="videoElement"
            v-show="!capturedImage"
            autoplay
            playsinline
            class="w-full h-auto rounded-xl bg-black"
          ></video>

          <!-- Captured Image Preview -->
          <img
            v-if="capturedImage"
            :src="capturedImage"
            alt="Captured photo"
            class="w-full h-auto rounded-xl"
          />

          <!-- Camera Controls -->
          <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              v-if="!capturedImage"
              @click="capturePhoto"
              class="w-16 h-16 bg-white rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center justify-center shadow-lg"
            >
              <div class="w-12 h-12 bg-red-500 rounded-full"></div>
            </button>

            <template v-else>
              <button
                @click="retakePhoto"
                class="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-colors"
              >
                Retake
              </button>
              <button
                @click="uploadCapturedPhoto"
                class="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors"
              >
                Upload
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="text-center text-white/60 text-sm pb-6">
        <p v-if="!capturedImage">Click the red button to take a photo</p>
        <p v-else>Review your photo and choose to retake or upload</p>
      </div>
    </div>
  </div>

  <div v-else class="bg-black min-h-screen flex items-center justify-center">
    <div class="text-center text-white">
      <div class="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-lg">Loading details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
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
    const galleryModalOpen = ref(false);
    const currentImageIndex = ref(0);
    const travelPrompt = ref("");
    const sakhiResponse = ref("");
    const cameraModalOpen = ref(false);
    const videoElement = ref(null);
    const capturedImage = ref(null);
    const cameraStream = ref(null);

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

    const openGalleryModal = (index) => {
      currentImageIndex.value = index;
      galleryModalOpen.value = true;
    };

    const closeGalleryModal = () => {
      galleryModalOpen.value = false;
    };

    const nextImage = () => {
      if (currentImageIndex.value < place.value.images.length - 2) {
        currentImageIndex.value++;
      }
    };

    const previousImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
      }
    };

    const quickPrompts = computed(() => {
      const destination = place.value?.destination || 'this place';
      const city = place.value?.location || '';

      return [
        { label: "Best Day Time", prompt: `What is the best Day Time to visit ${destination}, ${city}?` },
        { label: "Best Season", prompt: `What is the best season to visit ${destination}, ${city}?` },
        { label: "Safety", prompt: `Is ${destination}, ${city} safe for tourists?` },
        { label: "Things to Do", prompt: `What are the top things to do in ${destination}, ${city}?` },
        { label: "Backpack Tips", prompt: `backpack tips when traveling to ${destination}, ${city}?` }
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

    // Camera functionality
    const openCamera = async () => {
      try {
        cameraStream.value = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Use back camera if available
          audio: false
        });
        cameraModalOpen.value = true;
        
        // Wait for modal to render, then set video stream
        setTimeout(() => {
          if (videoElement.value) {
            videoElement.value.srcObject = cameraStream.value;
          }
        }, 100);
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions and try again.');
      }
    };

    const closeCameraModal = () => {
      if (cameraStream.value) {
        cameraStream.value.getTracks().forEach(track => track.stop());
        cameraStream.value = null;
      }
      cameraModalOpen.value = false;
      capturedImage.value = null;
    };

    const capturePhoto = () => {
      if (!videoElement.value) return;

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = videoElement.value.videoWidth;
      canvas.height = videoElement.value.videoHeight;
      
      context.drawImage(videoElement.value, 0, 0);
      capturedImage.value = canvas.toDataURL('image/jpeg', 0.8);
    };

    const retakePhoto = () => {
      capturedImage.value = null;
    };

    const uploadCapturedPhoto = async () => {
      if (!capturedImage.value) return;

      try {
        // Convert base64 to blob
        const response = await fetch(capturedImage.value);
        const blob = await response.blob();
        
        // Create file from blob
        const file = new File([blob], `camera-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        await uploadTodaysVibe(file);
        await fetchPlaceDetails(); // Refresh place to show updated vibe
        closeCameraModal();
      } catch (error) {
        console.error('Error uploading captured photo:', error);
        alert('Failed to upload photo. Please try again.');
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

    onMounted(() => {
      fetchPlaceDetails();
      fetchComments();
      likeCount();
      document.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
      // Clean up camera stream if still active
      if (cameraStream.value) {
        cameraStream.value.getTracks().forEach(track => track.stop());
      }
    });

    return {
      place,
      comments,
      newComment,
      addComment,
      goBack,
      likes,
      openGoogleMaps,
      galleryModalOpen,
      currentImageIndex,
      openGalleryModal,
      closeGalleryModal,
      nextImage,
      previousImage,
      travelPrompt,
      sakhiResponse,
      askSakhiAI,
      askQuickPrompt,
      quickPrompts,
      handleVibeUpload,
      // Camera functionality
      cameraModalOpen,
      videoElement,
      capturedImage,
      openCamera,
      closeCameraModal,
      capturePhoto,
      retakePhoto,
      uploadCapturedPhoto
    };
  },
};
</script>

<style scoped>
.place-details-wrapper {
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

/* Horizontal Gallery Styles */
.flex {
  transition: all 0.3s ease;
}

/* Smooth image loading */
img {
  transition: opacity 0.3s ease;
}

img:not([src]) {
  opacity: 0;
}

/* Hover effects for horizontal gallery */
.group:hover {
  transform: scale(1.05);
}

.group img {
  transition: transform 0.3s ease;
}

.group:hover img {
  transform: scale(1.1);
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling */
.overflow-x-auto {
  scroll-behavior: smooth;
}

/* Flex shrink for horizontal items */
.flex-shrink-0 {
  flex-shrink: 0;
}

/* Featured image styling */
.h-80 {
  height: 20rem;
}

/* Thumbnail sizing */
.w-32 {
  width: 8rem;
}

.h-24 {
  height: 6rem;
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: fadeIn 0.4s ease-out;
}

.group:nth-child(2) {
  animation-delay: 0.05s;
}

.group:nth-child(3) {
  animation-delay: 0.1s;
}

.group:nth-child(4) {
  animation-delay: 0.15s;
}

.group:nth-child(5) {
  animation-delay: 0.2s;
}

.group:nth-child(6) {
  animation-delay: 0.25s;
}

.group:nth-child(7) {
  animation-delay: 0.3s;
}

.group:nth-child(8) {
  animation-delay: 0.35s;
}

/* Responsive adjustments for mobile */
@media (max-width: 768px) {
  .h-80 {
    height: 16rem;
  }
  
  .w-32 {
    width: 7rem;
  }
  
  .h-24 {
    height: 5rem;
  }
}

@media (max-width: 480px) {
  .h-80 {
    height: 12rem;
  }
  
  .w-32 {
    width: 6rem;
  }
  
  .h-24 {
    height: 4rem;
  }
}

/* Gradient scroll indicators */
.bg-gradient-to-r {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent);
}

.bg-gradient-to-l {
  background: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent);
}

/* Badge styling */
.bg-yellow-400 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Smooth hover transitions for buttons */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}
</style>

<style scoped>
.place-details-wrapper {
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
</style>
