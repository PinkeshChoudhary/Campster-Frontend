<template>
  <div class="p-6 mt-10 mb-12 max-w-6xl mx-auto bg-black text-white overflow-hidden">
    <!-- Heading -->
    <h4 class="text-2xl font-bold text-yellow-500 text-center tracking-wide mb-6">
      <i class="fas fa-music"></i> Listen to Stories
    </h4>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
    </div>

    <!-- Stories List -->
    <div v-else class="space-y-6">
      <div
        v-for="story in stories"
        :key="story._id"
        class="relative flex items-stretch bg-black hover:bg-[#1a1a1a] cursor-pointer rounded-lg shadow-md hover:shadow-yellow-500/30 transition duration-200 overflow-hidden"
      >
        <!-- Share Button -->
        <button
          @click.stop="shareStory(story)"
          class="absolute top-0 right-0 text-yellow-800 z-10 p-2"
          title="Share this story"
        >
          <i class="fas fa-share-alt"></i>
        </button>

        <!-- Cover Image: full height -->
        <div class="w-28 bg-[#111] flex-shrink-0 overflow-hidden rounded-l-lg">
          <img
            v-if="story.coverImageUrl"
            :src="story.coverImageUrl"
            alt="Story cover image"
            class="w-full h-full object-fit block"
            style="height: 100%;"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-600 text-sm"
            style="height: 100%;"
          >
            No Image
          </div>
        </div>

        <!-- Story Info -->
        <div class="flex-1 px-4 py-3 min-w-0 flex flex-col justify-between">
          <!-- Place Name -->
          <p class="text-xs text-yellow-400 font-semibold mb-1 truncate">
            {{ story.place || 'Unknown Place' }}
          </p>

          <!-- Story Title -->
          <h3 class="text-sm font-bold text-white leading-tight break-words w-full">
            {{ story.title }}
          </h3>

          <!-- Audio Player -->
          <CustomAudioPlayer
            :src="story.audioUrl"
            :id="story._id"
            :onPlay="handlePlay"
            :playingAudioId="playingAudioId"
            class="mt-3"
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
