<template>
  <div class="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 min-h-screen">
    <!-- Animated Background Pattern -->
    <div class="fixed inset-0 opacity-5">
      <div class="absolute inset-0 bg-dots-pattern"></div>
    </div>

    <div class="relative z-10 pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <!-- Enhanced Header -->
      <div class="text-center mb-16 animate-fade-in">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
          <span class="text-3xl">🏕️</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Premium Tent Collection
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Discover our curated selection of high-quality camping tents for your next adventure
        </p>
      </div>

      <!-- Enhanced Image Gallery -->
      <div class="mb-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(img, index) in images"
            :key="index"
            @click="openPreview(img)"
            class="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            :class="getCardClass(index)"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img
              :src="img"
              class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              alt="Premium Camping Tent"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
            <div class="absolute bottom-4 left-4 right-4 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div class="flex items-center justify-between">
                <span class="text-white font-semibold text-lg">Premium Tent</span>
                <div class="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Modal -->
      <Transition name="modal">
        <div v-if="isPreviewOpen" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="relative max-w-5xl max-h-[90vh] w-full">
            <img
              :src="previewImage"
              class="w-full h-full object-contain rounded-2xl shadow-2xl"
              alt="Tent Preview"
            />
            <button
              @click="closePreview"
              class="absolute -top-4 -right-4 w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-200 shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      </Transition>

      <!-- Enhanced Description Section -->
      <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-700/50 mb-16">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
            <span class="text-2xl">🏕️</span>
          </div>
          <h2 class="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Quechua Tents on Rent
          </h2>
        </div>
        
        <p class="text-gray-300 text-lg mb-8 leading-relaxed">
          Experience the outdoors with our premium collection of clean, new Quechua tents designed for 2, 3 & 4 persons.
          Built for comfort and durability in any weather condition.
        </p>

        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-semibold text-emerald-400 mb-4 flex items-center">
              <span class="mr-2">🎯</span> Perfect For
            </h3>
            <div class="space-y-3">
              <div v-for="useCase in useCases" :key="useCase.title" class="flex items-center p-3 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <span class="text-2xl mr-3">{{ useCase.icon }}</span>
                <div>
                  <div class="font-medium text-gray-200">{{ useCase.title }}</div>
                  <div class="text-sm text-gray-400">{{ useCase.description }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-2xl font-semibold text-emerald-400 mb-4 flex items-center">
              <span class="mr-2">⭐</span> Features
            </h3>
            <div class="space-y-3">
              <div v-for="feature in features" :key="feature" class="flex items-center p-3 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <div class="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span class="text-gray-200">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Booking Form -->
      <div class="max-w-2xl mx-auto">
        <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-700/50">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4">
              <span class="text-2xl">📅</span>
            </div>
            <h3 class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Book Your Adventure
            </h3>
            <p class="text-gray-400">Reserve your premium tent today</p>
          </div>

          <form @submit.prevent="bookTent" class="space-y-6">
            <div class="space-y-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  v-model="contact.name"
                  type="text"
                  placeholder="Enter your full name"
                  class="input-field"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  v-model="contact.email"
                  type="tel"
                  placeholder="Enter your phone number"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              class="submit-btn group"
              :disabled="isSubmitting"
            >
              <span class="flex items-center justify-center">
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Processing...' : 'Confirm Booking' }}
                <svg v-if="!isSubmitting" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const contact = ref({
    name: '',
    email: '',
    message: 'I want to book a camping tent'
  })
  
  const isSubmitting = ref(false)
  const images = ref([])
  const isPreviewOpen = ref(false)
  const previewImage = ref('')
  
  const gallery = [
    '/tent1.jpg',
    '/tent2.jpeg',
    '/tent3.jpg',
    '/tent4.jpeg',
    '/tent5.jpeg',
  ]
  
  const useCases = ref([
    {
      icon: '🏔️',
      title: 'Mountain Adventures',
      description: 'Perfect for high-altitude camping'
    },
    {
      icon: '💒',
      title: 'Pre-wedding Shoots',
      description: 'Romantic outdoor photography'
    },
    {
      icon: '🏢',
      title: 'Corporate Retreats',
      description: 'Team building experiences'
    },
    {
      icon: '🥾',
      title: 'Trekking Expeditions',
      description: 'Multi-day hiking adventures'
    },
    {
      icon: '🔬',
      title: 'Research Projects',
      description: 'Environmental field studies'
    }
  ])
  
  const features = ref([
    'Waterproof and weather-resistant',
    'Easy setup in under 10 minutes',
    'Spacious interior with ventilation',
    'Lightweight and portable design',
    'UV protection coating',
    'Reinforced stress points'
  ])
  
  onMounted(() => {
    images.value = gallery.sort(() => 0.5 - Math.random())
  })
  
  const getCardClass = (index) => {
    const heights = ['h-64', 'h-80', 'h-72', 'h-64', 'h-80', 'h-72']
    return heights[index % heights.length]
  }
  
  const openPreview = (img) => {
    previewImage.value = img
    isPreviewOpen.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closePreview = () => {
    isPreviewOpen.value = false
    previewImage.value = ''
    document.body.style.overflow = 'auto'
  }
  
  const bookTent = async () => {
    if (!contact.value.name || !contact.value.email) {
      showNotification('Please fill in all fields', 'error')
      return
    }
  
    const payload = {
      email: contact.value.email,
      name: contact.value.name,
      message: contact.value.message,
    }
  
    isSubmitting.value = true
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      await res.json()
      showNotification('Tent booking successful! Our team will contact you soon.', 'success')
      contact.value = { name: '', email: '', message: 'I want to book a camping tent' }
    } catch (err) {
      console.error(err)
      showNotification('Booking failed. Please try again.', 'error')
    } finally {
      isSubmitting.value = false
    }
  }
  
  const showNotification = (message, type) => {
    // Simple notification - you can enhance this with a proper notification system
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success'
        ? 'bg-emerald-500 text-white'
        : 'bg-red-500 text-white'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
  </script>
  
  <style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
  
  .bg-dots-pattern {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
  }
  
  .input-field {
    width: 100%;
    padding: 16px 20px;
    background: rgba(17, 24, 39, 0.8);
    backdrop-filter: blur(10px);
    color: #f9fafb;
    border: 2px solid rgba(75, 85, 99, 0.3);
    border-radius: 16px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 16px;
  }
  
  .input-field:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    background: rgba(17, 24, 39, 0.9);
  }
  
  .input-field::placeholder {
    color: #9ca3af;
  }
  
  .submit-btn {
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #10b981, #059669, #047857);
    background-size: 200% 200%;
    color: white;
    font-weight: 600;
    font-size: 16px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .submit-btn:hover:not(:disabled) {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }
  
  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .form-group {
    position: relative;
  }
  
  /* Modal Transitions */
  .modal-enter-active, .modal-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  
  .modal-enter-from .relative, .modal-leave-to .relative {
    transform: scale(0.9) translateY(20px);
  }
  
  /* Hover effects for cards */
  .group:hover .absolute {
    backdrop-filter: blur(4px);
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(17, 24, 39, 0.5);
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(16, 185, 129, 0.5);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(16, 185, 129, 0.7);
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .input-field {
      padding: 14px 16px;
      font-size: 16px; /* Prevents zoom on iOS */
    }
    
    .submit-btn {
      padding: 14px 20px;
    }
  }
  </style>
  