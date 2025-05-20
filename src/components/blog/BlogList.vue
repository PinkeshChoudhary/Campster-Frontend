<template>
  <div class="blog-list bg-black pt-5 px-4 max-w-6xl mx-auto">
    <!-- <h2 class="text-3xl font-bold mb-6 text-white text-center">Explore Our Blogs</h2> -->

   <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="blog in blogs"
        :key="blog._id"
        class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
      >
        <div class="relative">
          <img
            v-if="getFirstImage(blog)"
            :src="getFirstImage(blog)"
            alt="Blog cover"
            class="h-48 w-full object-cover"
          />
          
          <!-- Share Icon -->
  <button
  @click="shareBlog(blog)"
  class="absolute top-2 right-2 bg-transparent text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
>
  <i class="fas fa-share-alt text-black"></i>
</button>


        </div>

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

// Function to share blog
const shareBlog = (blog) => {
  const blogUrl = `${window.location.origin}/blog/${blog._id}`

  if (navigator.share) {
    // Web Share API
    navigator.share({
      title: blog.title,
      url: blogUrl,
    }).then(() => {
      console.log('Blog shared successfully');
    }).catch((error) => {
      console.error('Error sharing the blog:', error);
    });
  } else {
    // Fallback to copy link
    navigator.clipboard.writeText(blogUrl).then(() => {
      alert('Blog link copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy the link:', error);
    });
  }
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
