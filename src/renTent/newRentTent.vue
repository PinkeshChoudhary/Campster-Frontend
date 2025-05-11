<template>
    <div class="bg-black text-gray-200 min-h-screen pt-20 pb-20 px-4">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-white">🛖 Explore Our Tent Collection</h1>
        <p class="text-lg text-gray-400">Select your perfect camping experience</p>
      </div>
  
      <!-- Image Masonry Gallery -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[180px]">
        <div
          v-for="(img, index) in images"
          :key="index"
          @click="openPreview(img)"
          class="overflow-hidden rounded-xl cursor-pointer group relative"
        >
          <img
            :src="img"
            class="object-cover h-full w-full group-hover:scale-110 transition duration-300"
            alt="Tent"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white font-bold text-xl">
            Preview
          </div>
        </div>
      </div>
  
      <!-- Fullscreen Image Preview Modal -->
      <div v-if="isPreviewOpen" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <img :src="previewImage" class="max-w-3xl max-h-[80vh] object-contain rounded-xl shadow-xl" />
        <button @click="closePreview" class="absolute top-6 right-6 text-white text-4xl font-bold">&times;</button>
      </div>
  
      <!-- Description -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-xl mt-12">
        <h2 class="text-3xl font-bold text-teal-400 mb-4">Quechua Tents on Rent</h2>
        <p class="text-gray-300">We offer clean, new Quechua tents for 2, 3 & 4 persons.</p>
  
        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-200">Use Cases:</h3>
          <ul class="list-disc pl-6 text-gray-400 mt-2 space-y-1">
            <li>Camping at remote natural spots</li>
            <li>Pre-wedding shoots</li>
            <li>Corporate retreats</li>
            <li>Trekking adventures</li>
            <li>Environmental research</li>
          </ul>
        </div>
      </div>
  
      <!-- Contact Form -->
      <div class="mt-10 max-w-xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-600">
        <h3 class="text-2xl font-bold text-teal-300 mb-4 text-center">📩 Book Your Tent</h3>
  
        <form @submit.prevent="bookTent">
          <input v-model="contact.name" type="text" placeholder="Name" class="input-field mb-4" required />
          <input v-model="contact.email" type="tel" placeholder="Phone Number" class="input-field mb-4" required />
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Booking...' : 'Confirm Booking' }}
          </button>
        </form>
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
  
  onMounted(() => {
    images.value = gallery.sort(() => 0.5 - Math.random()).slice(0, 6)
  })
  
  const openPreview = (img) => {
    previewImage.value = img
    isPreviewOpen.value = true
  }
  
  const closePreview = () => {
    isPreviewOpen.value = false
    previewImage.value = ''
  }
  
  const bookTent = async () => {
    if (!contact.value.name || !contact.value.email) {
      alert('Please fill in all fields')
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
      alert('Tent booking successful! Our team will contact you soon.')
      contact.value = { name: '', email: '' }
    } catch (err) {
      console.error(err)
      alert('Booking failed')
    } finally {
      isSubmitting.value = false
    }
  }
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 12px;
    background-color: #111;
    color: #f0f0f0;
    border: 1px solid #444;
    border-radius: 10px;
    outline: none;
    transition: 0.3s ease;
  }
  .input-field:focus {
    border-color: #38b2ac;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(to right, #11998e, #38ef7d);
    color: white;
    font-weight: bold;
    border-radius: 10px;
    transition: 0.2s;
  }
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  </style>
  