<template>
  <div class="w-full bg-black text-white min-h-screen pt-24 px-4">
    <div class="flex justify-center">
      <div class="flex w-full max-w-2xl justify-between border-b border-gray-700">
        <!-- Blogs Tab -->
        <button
          class="w-1/2 text-center py-3 relative transition duration-200"
          :class="tab === 'blogs' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'"
          @click="tab = 'blogs'"
        >
          Blogs
          <span
            class="absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300"
            :class="tab === 'blogs' ? 'w-full' : 'w-0'"
          ></span>
        </button>

        <!-- Audio Tab -->
        <button
          class="w-1/2 text-center py-3 relative transition duration-200"
          :class="tab === 'audio' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'"
          @click="tab = 'audio'"
        >
          Audio Blogs
          <span
            class="absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300"
            :class="tab === 'audio' ? 'w-full' : 'w-0'"
          ></span>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <!-- Tab Content with Swipe Handling -->
<transition name="fade" mode="out-in">
  <div
    :key="tab"
    class="mt-10 max-w-4xl mx-auto"
     @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
  >
    <BlogList v-if="tab === 'blogs'" />
    <AudioList v-else />
  </div>
</transition>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import BlogList from './blog/BlogList.vue'
import AudioList from './audioStories/AudioList.vue'

const tab = ref('blogs')

let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const diff = touchStartX - touchEndX
  if (Math.abs(diff) < 50) return // Ignore small swipes

  if (diff > 0 && tab.value === 'blogs') {
    tab.value = 'audio'
  } else if (diff < 0 && tab.value === 'audio') {
    tab.value = 'blogs'
  }
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
