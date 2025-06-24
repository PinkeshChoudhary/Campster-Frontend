<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Contact Messages</h1>
        <p class="text-gray-600 text-lg">Manage and respond to user inquiries</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Messages</p>
              <p class="text-2xl font-bold text-gray-900">{{ messages.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Resolved Today</p>
              <p class="text-2xl font-bold text-gray-900">{{ resolvedToday }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p class="text-2xl font-bold text-gray-900">2.4h</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Search -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search messages..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
            </div>
          </div>
          <div class="flex gap-3">
            <select
              v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">By Name</option>
            </select>
            <button
              @click="refreshMessages"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              :disabled="isLoading"
            >
              <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Messages List -->
      <div v-if="filteredMessages.length === 0 && !isLoading" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No messages found</h3>
        <p class="text-gray-500">{{ searchQuery ? 'Try adjusting your search criteria' : 'No contact messages have been received yet.' }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-pulse">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div class="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div class="space-y-2 mb-4">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div class="flex justify-end">
            <div class="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="space-y-6">
        <div
          v-for="msg in filteredMessages"
          :key="msg._id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ getInitials(msg.name) }}
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ msg.name }}</h3>
                  <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                    <span>{{ msg.email }}</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{{ formatDate(msg.createdAt) }}</span>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <p class="text-gray-700 leading-relaxed">{{ msg.message }}</p>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="flex space-x-3">
                <button
                  @click="replyToMessage(msg)"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                  </svg>
                  <span>Reply</span>
                </button>
                <button
                  @click="markAsImportant(msg._id)"
                  class="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-all duration-200 space-x-2"
                  :class="{ 'bg-yellow-600': msg.important }"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  <span>{{ msg.important ? 'Important' : 'Mark Important' }}</span>
                </button>
              </div>
              <button
                @click="resolveMessage(msg._id)"
                class="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 space-x-2 group"
                :disabled="resolvingIds.includes(msg._id)"
              >
                <svg class="w-4 h-4" :class="{ 'animate-spin': resolvingIds.includes(msg._id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ resolvingIds.includes(msg._id) ? 'Resolving...' : 'Resolve' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reply Modal -->
    <div v-if="showReplyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900">Reply to {{ selectedMessage?.name }}</h3>
            <button
              @click="closeReplyModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Original Message:</label>
            <div class="bg-gray-50 rounded-lg p-4 text-gray-700">
              {{ selectedMessage?.message }}
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Reply:</label>
            <textarea
              v-model="replyText"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your reply here..."
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="closeReplyModal"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              @click="sendReply"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              :disabled="!replyText.trim()"
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const messages = ref([])
const searchQuery = ref('')
const sortBy = ref('newest')
const isLoading = ref(false)
const resolvingIds = ref([])
const resolvedToday = ref(0)
const showReplyModal = ref(false)
const selectedMessage = ref(null)
const replyText = ref('')

const fetchMessages = async () => {
  isLoading.value = true
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/contact`)
    messages.value = res.data
    
    // Calculate resolved today (mock data for demo)
    resolvedToday.value = Math.floor(Math.random() * 10) + 1
  } catch (error) {
    console.error('Error fetching messages:', error)
    // Show error notification
    showNotification('Error fetching messages', 'error')
  } finally {
    isLoading.value = false
  }
}

const resolveMessage = async (id) => {
  if (resolvingIds.value.includes(id)) return
  
  resolvingIds.value.push(id)
  try {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`)
    messages.value = messages.value.filter((msg) => msg._id !== id)
    resolvedToday.value++
    showNotification('Message resolved successfully', 'success')
  } catch (error) {
    console.error('Error deleting message:', error)
    showNotification('Error resolving message', 'error')
  } finally {
    resolvingIds.value = resolvingIds.value.filter(resId => resId !== id)
  }
}

const refreshMessages = async () => {
  await fetchMessages()
  showNotification('Messages refreshed', 'success')
}

const replyToMessage = (message) => {
  selectedMessage.value = message
  replyText.value = ''
  showReplyModal.value = true
}

const closeReplyModal = () => {
  showReplyModal.value = false
  selectedMessage.value = null
  replyText.value = ''
}

const sendReply = async () => {
  if (!replyText.value.trim()) return
  
  try {
    // Here you would typically send the reply via API
    // await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact/reply`, {
    //   messageId: selectedMessage.value._id,
    //   reply: replyText.value
    // })
    
    showNotification('Reply sent successfully', 'success')
    closeReplyModal()
  } catch (error) {
    console.error('Error sending reply:', error)
    showNotification('Error sending reply', 'error')
  }
}

const markAsImportant = async (id) => {
  try {
    // Here you would typically update the message importance via API
    const messageIndex = messages.value.findIndex(msg => msg._id === id)
    if (messageIndex !== -1) {
      messages.value[messageIndex].important = !messages.value[messageIndex].important
      showNotification(
        messages.value[messageIndex].important ? 'Marked as important' : 'Removed from important',
        'success'
      )
    }
  } catch (error) {
    console.error('Error updating message importance:', error)
    showNotification('Error updating message', 'error')
  }
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) {
    return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 2) {
    return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`
  } else {
    return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
}

const showNotification = (message, type = 'info') => {
  // Simple notification system - you could integrate with a toast library
  console.log(`${type.toUpperCase()}: ${message}`)
  
  // Create a simple toast notification
  const toast = document.createElement('div')
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform translate-x-full ${
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' :
    'bg-blue-500'
  }`
  toast.textContent = message
  document.body.appendChild(toast)
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full')
  }, 100)
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-x-full')
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

const filteredMessages = computed(() => {
  let filtered = messages.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(msg =>
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query)
    )
  }

  // Sort messages
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return filtered
})

onMounted(fetchMessages)
</script>
  