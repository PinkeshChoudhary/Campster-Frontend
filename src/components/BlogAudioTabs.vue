<template>
  <div class="max-w-5xl mx-auto px-4 py-8 pt-24">
    <!-- Tab Headers -->
    <div class="flex justify-center mb-8">
      <div class="inline-flex bg-gray-100 p-1 rounded-full shadow">
        <button
          :class="tab === 'blogs' ? activeTabClass : tabClass"
          @click="tab = 'blogs'"
        >
          📖 Blogs
        </button>
        <button
          :class="tab === 'audio' ? activeTabClass : tabClass"
          @click="tab = 'audio'"
        >
          🎧 Audio Stories
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <transition name="fade" mode="out-in">
      <div :key="tab">
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

const tabClass =
  'px-5 py-2 text-gray-600 rounded-full transition duration-200 hover:bg-white hover:text-black'
const activeTabClass =
  'px-5 py-2 bg-white text-blue-600 font-semibold rounded-full shadow'
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
