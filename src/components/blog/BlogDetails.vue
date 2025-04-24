<template>
    <div class="blog-detail pt-24 px-4 max-w-3xl mx-auto">
      <div v-if="loading" class="text-center text-white text-lg animate-pulse">Loading...</div>
  
      <div v-else>
        <h2 class="text-3xl text-white font-extrabold mb-2">{{ blog.title }}</h2>
        <p class="text-sm text-gray-400 mb-6">Published on {{ formatDate(blog.createdAt) }}</p>
  
        <div v-for="block in blog.blocks" :key="block._id" class="mt-6">
          <div v-if="block.type === 'heading'" class="text-2xl text-white font-semibold mb-2">{{ block.content }}</div>
          <div v-if="block.type === 'text'" class="text-base text-gray-200 leading-relaxed">{{ block.content }}</div>
          <div v-if="block.type === 'image'" class="mt-4">
            <img 
              :src="block.content" 
              alt="Blog Image" 
              class="w-full max-h-[500px] object-cover rounded-xl shadow-lg transition duration-300 hover:scale-105" 
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const blog = ref(null)
  const loading = ref(true)
  
  const fetchBlog = async () => {
    try {
      const blogId = route.params.id
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${blogId}`)
      blog.value = response.data // ✅ Use the actual blog data from response
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString()
  }
  
  onMounted(() => {
    fetchBlog()
  })
  </script>
  
  <style scoped>
  .blog-detail {
    margin-top: 20px;
  }
  </style>
  