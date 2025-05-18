<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto text-white pb-20">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
      🎧 Listen to Audio Stories
    </h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
    </div>

    <!-- No Stories -->
    <div v-else-if="stories.length === 0" class="text-gray-400 text-center text-lg">
      No stories uploaded yet.
    </div>

    <!-- Audio Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="story in stories"
        :key="story._id"
        class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
      >
        <!-- Cover Image -->
        <img
          :src="story.coverImageUrl"
          :alt="`${story.title} cover image`"
          class="h-48 w-full object-cover"
        />

      <!-- Story Info + Custom Audio Player -->
<div class="flex flex-col justify-between flex-grow p-4 space-y-3">
  <!-- Story Title and Category -->
  <div>
    <h2 class="text-xl font-semibold text-white mb-2">
      {{ story.title }}
    </h2>
  </div>

  <!-- Custom Audio Player -->
  <CustomAudioPlayer
    :src="story.audioUrl"
    :id="story._id"
    :onPlay="handlePlay"
    :playingAudioId="playingAudioId"
  />
</div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import CustomAudioPlayer from './CustomAudioPlayer.vue' // We'll create this component below

const stories = ref([])
const loading = ref(true)
const playingAudioId = ref(null)

const fetchStories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/audio-stories`)
    stories.value = res.data.reverse()
  } catch (err) {
    console.error('Failed to fetch stories', err)
  } finally {
    loading.value = false
  }
}

const handlePlay = (id) => {
  // If clicked audio is already playing, toggle off
  playingAudioId.value = playingAudioId.value === id ? null : id
}

onMounted(fetchStories)
</script>

<style scoped>
body {
  background-color: #121212;
  font-family: 'Helvetica Neue', sans-serif;
}
</style>
