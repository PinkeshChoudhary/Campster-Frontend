<template>
    <div class="blog-list bg-black pt-24 px-4 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-white text-center">Explore Our Blogs</h2>
  
      <div v-if="loading" class="text-center text-white text-lg animate-pulse">Loading...</div>
  
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="blog in blogs"
          :key="blog._id"
          class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
        >
          <img
            v-if="getFirstImage(blog)"
            :src="getFirstImage(blog)"
            alt="Blog cover"
            class="h-48 w-full object-cover"
          />
  
          <div class="p-5">
            <h3 class="text-xl font-semibold text-white mb-2">{{ blog.title }}</h3>
            <p class="text-sm text-gray-400 mb-4">Published on {{ formatDate(blog.createdAt) }}</p>
  
            <router-link
              :to="`/blog/${blog._id}`"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const blogs = ref([])
  const loading = ref(true)
  
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`)
      blogs.value = response.data
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString()
  }
  
  const getFirstImage = (blog) => {
    const imageBlock = blog.blocks?.find(block => block.type === 'image')
    return imageBlock ? imageBlock.content : null
  }
  
  onMounted(() => {
    fetchBlogs()
  })
  </script>
  
  <style scoped>
  .blog-list {
    min-height: 100vh;
  }
  </style>
  