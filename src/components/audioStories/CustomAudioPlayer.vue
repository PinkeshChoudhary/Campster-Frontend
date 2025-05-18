<template>
  <div class="custom-audio-player w-full max-w-xs flex items-center space-x-4 text-white select-none">
    <audio
      ref="audioRef"
      :src="src"
      @ended="onEnded"
      @timeupdate="updateTime"
      @loadedmetadata="onLoadedMetadata"
    ></audio>

    <!-- Play/Pause Button -->
    <button
      @click="togglePlay"
      aria-label="Play or pause audio"
      class="p-2 rounded-full bg-gray-800 hover:bg-green-600 transition-colors duration-300 focus:outline-none flex items-center justify-center"
    >
      <svg v-show="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
      <svg v-show="isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="5" width="4" height="14" />
        <rect x="14" y="5" width="4" height="14" />
      </svg>
    </button>

    <!-- Progress Bar -->
    <div
      class="flex-1 h-2 bg-gray-700 rounded cursor-pointer relative"
      @click="seek($event)"
      @mousedown.prevent="startDrag"
      @mouseup.prevent="stopDrag"
      @mouseleave.prevent="stopDrag"
      @mousemove.prevent="onDrag"
    >
      <div class="h-2 bg-green-500 rounded" :style="{ width: progressPercent + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: String,
})

const audioRef = ref(null)
const isPlaying = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const dragging = ref(false)

const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

const onLoadedMetadata = () => {
  duration.value = audioRef.value.duration
}

const updateTime = () => {
  if (!dragging.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

const progressPercent = computed(() => {
  return duration.value ? (currentTime.value / duration.value) * 100 : 0
})

const seek = (event) => {
  if (!audioRef.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const seekTime = (clickX / rect.width) * duration.value
  audioRef.value.currentTime = seekTime
  currentTime.value = seekTime
}

const startDrag = () => {
  dragging.value = true
}

const stopDrag = () => {
  dragging.value = false
  audioRef.value.currentTime = currentTime.value
}

const onDrag = (event) => {
  if (!dragging.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  let dragX = event.clientX - rect.left
  dragX = Math.max(0, Math.min(dragX, rect.width))
  const dragTime = (dragX / rect.width) * duration.value
  currentTime.value = dragTime
}
</script>

<style scoped>
.custom-audio-player {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
