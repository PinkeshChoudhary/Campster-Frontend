<template>
    <div class="p-6 max-w-4xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 class="text-3xl font-bold mb-6 text-yellow-900 text-center">📩 User Messages</h2>
  
      <div v-if="messages.length === 0" class="text-gray-500 text-center py-10">
        No messages yet.
      </div>
  
      <div
        v-for="msg in messages"
        :key="msg._id"
        class="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <p class="text-lg font-semibold text-gray-800">{{ msg.name }}</p>
            <p class="text-sm text-gray-500">{{ msg.email }}</p>
          </div>
          <p class="text-xs text-gray-400">{{ formatDate(msg.createdAt) }}</p>
        </div>
        <p class="text-gray-700 mb-4">{{ msg.message }}</p>
        <div class="flex justify-end">
          <button
            @click="resolveMessage(msg._id)"
            class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            ✅ Resolve
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const messages = ref([])
  
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/contact`)
      messages.value = res.data
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }
  
  const resolveMessage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`)
      messages.value = messages.value.filter((msg) => msg._id !== id)
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }
  
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleString()
  }
  
  onMounted(fetchMessages)
  </script>
  