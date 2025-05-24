<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto text-white pb-20">
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
        class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative"
      >
        <!-- Cover Image container relative -->
        <div class="relative">
          <img
            :src="story.coverImageUrl"
            :alt="`${story.title} cover image`"
            class="h-48 w-full object-cover"
          />
          <!-- Share button on top-right corner -->
          <button
            @click="shareStory(story)"
            class="absolute top-2 right-2 bg-transparent text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
             <i class="fas fa-share-alt text-black"></i>
          </button>
           <button
  @click="shareStory(story)"
  class="absolute top-2 right-2 bg-transparent text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
>
  <i class="fas fa-share-alt text-black"></i>
</button>
        </div>

        <!-- Story Info + Custom Audio Player -->
        <div class="flex flex-col justify-between flex-grow p-4 space-y-3">
          <!-- Story Title -->
          <h2 class="text-xl font-semibold text-white mb-2">{{ story.title }}</h2>

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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CustomAudioPlayer from './CustomAudioPlayer.vue'

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
  playingAudioId.value = playingAudioId.value === id ? null : id
}

const shareStory = async (story) => {
  const shareData = {
    title: story.title,
    text: `Listen to this audio story: ${story.title}`,
    url: `${window.location.origin}/story/${story._id}`,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
      console.log('Story shared successfully')
    } else {
      await navigator.clipboard.writeText(shareData.url)
      alert('Story URL copied to clipboard')
    }
  } catch (err) {
    console.error('Sharing failed:', err)
  }
}

onMounted(fetchStories)
</script>

<style scoped>
body {
  background-color: #121212;
  font-family: 'Helvetica Neue', sans-serif;
}
</style>
