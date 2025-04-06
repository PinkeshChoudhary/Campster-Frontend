<template>
    <div class="min-h-screen bg-zinc-900 text-white px-4 sm:px-6 py-6 space-y-6 pt-20">
  
      <!-- City Selection as Buttons -->
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold mb-6 tracking-wide text-white flex items-center gap-3">
   <span class="bg-gradient-to-r from-blue-400 to-yellow-500 bg-clip-text text-transparent">Select Community Chat Ground</span>
</h1>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button
            v-for="city in cities"
            :key="city"
            @click="selectCity(city)"
            :class="[
              'px-4 py-3 rounded-xl font-semibold transition-all text-white shadow-md',
              selectedCity === city ? 'bg-blue-600 ring-2 ring-blue-300 scale-105' : 'bg-zinc-800 hover:bg-zinc-700'
            ]"
          >
            {{ city }}
          </button>
        </div>
      </div>
  
      <!-- New Message -->
      <div v-if="selectedCity" class="bg-zinc-800 rounded-xl p-4 shadow-lg">
        <textarea
          v-model="newMessage"
          rows="2"
          placeholder="Ask Your Query"
          class="w-full bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-700 resize-none focus:ring-2 focus:ring-blue-500" />
        <div class="text-right mt-3">
          <button
            @click="sendMessage"
            class="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition shadow-sm">
            Send
          </button>
        </div>
      </div>
  
      <!-- Messages List -->
      <div v-if="messages.length" class="space-y-5">
        <div
          v-for="msg in messages"
          :key="msg._id"
          class="bg-zinc-800 p-4 rounded-xl shadow-md">
          <div class="flex gap-3 items-start">
            <!-- Profile Circle -->
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
              {{ getInitials(msg.username) }}
            </div>
  
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-sm">{{ msg.username }}</span>
                <span class="text-xs text-zinc-400">{{ formatDate(msg.createdAt) }}</span>
              </div>
              <p class="text-sm mt-1 text-zinc-200">{{ msg.message }}</p>
            </div>
          </div>
  
          <!-- Replies -->
          <div v-if="msg.replies.length" class="mt-4 pl-6 space-y-3">
            <div
              v-for="(reply, idx) in msg.replies"
              :key="idx"
              class="bg-zinc-700 p-3 rounded-lg flex gap-3 items-start">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {{ getInitials(reply.username) }}
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-sm">{{ reply.username }}</span>
                  <span class="text-xs text-zinc-400">{{ formatDate(reply.createdAt) }}</span>
                </div>
                <p class="text-sm mt-1 text-zinc-100">{{ reply.message }}</p>
              </div>
            </div>
          </div>
  
          <!-- Toggle Reply Box -->
          <div class="mt-3 pl-6">
            <button
              @click="toggleReplyBox(msg._id)"
              class="text-sm text-green-400 hover:underline">
              {{ activeReplyBox === msg._id ? 'Cancel' : 'Reply' }}
            </button>
  
            <!-- Reply Box -->
            <div v-if="activeReplyBox === msg._id" class="mt-2">
              <input
                v-model="replyText[msg._id]"
                placeholder="Write a reply..."
                class="w-full bg-zinc-900 text-white px-3 py-2 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-500 text-sm" />
              <div class="text-right mt-2">
                <button
                  @click="sendReply(msg._id)"
                  class="bg-green-600 hover:bg-green-700 text-sm px-4 py-1.5 rounded-lg font-medium transition">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- No Messages -->
      <div v-if="selectedCity && messages.length === 0" class="text-center text-zinc-500 pt-10 text-sm">
        No chats in <strong>{{ selectedCity }}</strong> yet. Start the conversation!
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
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 6px;
  }
  </style>
  