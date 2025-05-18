<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto text-white">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
      🎧 Listen to Audio Stories
    </h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="loader"></div>
    </div>

    <!-- No Stories -->
    <div v-else-if="stories.length === 0" class="text-gray-400 text-center">No stories uploaded yet.</div>

    <!-- Audio Cards -->
    <div v-else class="grid gap-6">
      <div
        v-for="story in stories"
        :key="story._id"
        class="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#1e1e1e] rounded-lg p-4 hover:bg-[#2a2a2a] transition duration-200"
      >
        <img :src="story.coverImageUrl" alt="cover" class="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-md" />

        <div class="flex flex-col justify-between flex-grow">
          <div>
            <h2 class="text-lg sm:text-xl font-semibold text-white">{{ story.title }}</h2>
            <p class="text-gray-400 text-sm">{{ story.category }}</p>
          </div>

          <audio
            class="w-full mt-3 sm:mt-0 sm:w-48"
            controls
            :ref="el => setAudioRef(story._id, el)"
            @play="handlePlay(story._id)"
            :src="story.audioUrl"
          ></audio>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stories = ref([])
const loading = ref(true)
const audioRefs = ref({})

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

const setAudioRef = (id, el) => {
  if (el) {
    audioRefs.value[id] = el
  }
}

const handlePlay = (currentId) => {
  for (const id in audioRefs.value) {
    if (id !== currentId && audioRefs.value[id]) {
      audioRefs.value[id].pause()
    }
  }
}

onMounted(fetchStories)
</script>
<style scoped>
body {
  background-color: #121212;
  font-family: 'Helvetica Neue', sans-serif;
}

.loader {
  border: 5px solid #2e2e2e;
  border-top: 5px solid #1db954;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
