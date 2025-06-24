<template>
  <div class="min-h-screen bg-black text-white pb-10 pt-20">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-black border-b border-yellow-500">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold text-center text-yellow-400">Community Chat</h1>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <!-- City Selection -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-white">Choose Your City</h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            v-for="city in cities"
            :key="city"
            @click="selectCity(city)"
            :class="[
              'px-4 py-3 rounded-lg font-medium transition-all',
              selectedCity === city
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700 hover:border-yellow-500'
            ]"
          >
            {{ city }}
          </button>
        </div>
      </div>

      <!-- Message Input -->
      <div v-if="selectedCity" class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <div class="space-y-3">
          <div class="text-sm text-zinc-400">Chatting in {{ selectedCity }}</div>
          
          <textarea
            v-model="newMessage"
            rows="3"
            placeholder="Type your message..."
            class="w-full bg-black text-white px-3 py-2 rounded border border-zinc-700 resize-none focus:border-white focus:outline-none"
          />
          
          <div class="flex justify-end">
            <button
              @click="sendMessage"
              :disabled="!newMessage.trim()"
              class="bg-yellow-400 text-black px-4 py-2 rounded font-medium hover:bg-yellow-300 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-yellow-400/20"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <!-- Messages List -->
      <div v-if="messages.length" class="space-y-4">
        <div
          v-for="msg in messages"
          :key="msg._id"
          class="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
        >
          <div class="flex gap-3 items-start">
            <!-- Profile Avatar -->
            <div class="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-yellow-400/20">
              {{ getInitials(msg.username) }}
            </div>

            <div class="flex-1">
              <div class="flex justify-between items-center mb-1">
                <span class="font-semibold text-white">{{ msg.username }}</span>
                <span class="text-xs text-zinc-500">{{ formatDate(msg.createdAt) }}</span>
              </div>
              <p class="text-zinc-200">{{ msg.message }}</p>
            </div>
          </div>

          <!-- Replies -->
          <div v-if="msg.replies.length" class="mt-4 pl-6 space-y-3">
            <div class="border-l-2 border-yellow-500 pl-4 space-y-3">
              <div
                v-for="(reply, idx) in msg.replies"
                :key="idx"
                class="bg-black rounded p-3 border border-zinc-800"
              >
                <div class="flex gap-3 items-start">
                  <div class="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold text-xs">
                    {{ getInitials(reply.username) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                      <span class="font-medium text-sm text-white">{{ reply.username }}</span>
                      <span class="text-xs text-zinc-500">{{ formatDate(reply.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-zinc-300">{{ reply.message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reply Button -->
          <div class="mt-3 pl-6">
            <button
              @click="toggleReplyBox(msg._id)"
              class="text-sm text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              {{ activeReplyBox === msg._id ? 'Cancel' : 'Reply' }}
            </button>

            <!-- Reply Input -->
            <div v-if="activeReplyBox === msg._id" class="mt-3 space-y-2">
              <input
                v-model="replyText[msg._id]"
                placeholder="Write a reply..."
                class="w-full bg-black text-white px-3 py-2 rounded border border-zinc-700 focus:border-white focus:outline-none"
              />
              <div class="flex justify-end">
                <button
                  @click="sendReply(msg._id)"
                  :disabled="!replyText[msg._id]?.trim()"
                  class="bg-yellow-500 text-black px-3 py-1 rounded text-sm hover:bg-yellow-400 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-all"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="selectedCity && messages.length === 0" class="text-center py-12">
        <div class="text-zinc-500">
          <p>No messages in <span class="text-yellow-400 font-semibold">{{ selectedCity }}</span> yet.</p>
          <p class="text-sm mt-1">Be the first to start a conversation!</p>
        </div>
      </div>

      <!-- Welcome Message -->
      <div v-if="!selectedCity" class="text-center py-12">
        <div class="text-zinc-400">
          <h2 class="text-xl font-semibold text-yellow-400 mb-2">Welcome to Community Chat</h2>
          <p>Select a city above to start chatting with fellow campers.</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useUserStore } from "../store/user";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const userAuth = auth.currentUser;
const userStore = useUserStore();
const cities = ['Udaipur', 'Jaisalmer', 'Jaipur' , 'Mount Abu']
const selectedCity = ref('')
const newMessage = ref('')
const messages = ref([])
const replyText = reactive({})
const activeReplyBox = ref(null)

const user = {
  userId: userAuth?.uid || 'Guest',
  username: userStore.name || 'Guest'
}

// Socket.io for real-time messages
const socket = io(`${import.meta.env.VITE_API_BASE_URL}`)
socket.on('receive-message', (data) => {
  if (data.city === selectedCity.value) fetchMessages()
})

// Select city via buttons
const selectCity = (city) => {
  selectedCity.value = city
  fetchMessages()
}

const fetchMessages = async () => {
  if (!selectedCity.value) return
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/citychat/${selectedCity.value}`)
  messages.value = res.data
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/citychat`, {
    city: selectedCity.value,
    message: newMessage.value,
    ...user
  })
  newMessage.value = ''
  fetchMessages()
  socket.emit('send-message', { city: selectedCity.value })
}

const sendReply = async (messageId) => {
  const text = replyText[messageId]
  if (!text?.trim()) return
  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/citychat/reply/${messageId}`, {
    message: text,
    ...user
  })
  replyText[messageId] = ''
  activeReplyBox.value = null
  fetchMessages()
  socket.emit('send-message', { city: selectedCity.value })
}

const toggleReplyBox = (id) => {
  activeReplyBox.value = activeReplyBox.value === id ? null : id
}

const formatDate = (iso) => new Date(iso).toLocaleString()

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
