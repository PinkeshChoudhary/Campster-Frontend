<template>
  <div class="p-6 mt-10 mb-12 max-w-6xl mx-auto bg-black text-white overflow-hidden">
    <!-- Heading -->
    <h4 class="text-2xl font-bold text-yellow-500 text-center tracking-wide mb-6">
      <i class="fas fa-pen-nib"></i> Discover Latest Blogs
    </h4>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
    </div>

    <!-- Blog List -->
    <div v-else class="space-y-6">
      <div
        v-for="blog in blogs"
        :key="blog._id"
        class="relative flex items-start bg-black hover:bg-[#1a1a1a] cursor-pointer rounded-lg shadow-md hover:shadow-yellow-500/30 transition duration-200 overflow-hidden"
      >
        <!-- Share Button -->
        <button
          @click.stop="shareBlog(blog)"
          class="absolute top-0 right-0 text-yellow-800 z-10 p-2"
          title="Share this blog"
        >
          <i class="fas fa-share-alt"></i>
        </button>

        <!-- Thumbnail -->
        <div class="w-28 h-28 bg-[#111] flex-shrink-0 overflow-hidden rounded-l-lg">
          <img
            v-if="getFirstImage(blog)"
            :src="getFirstImage(blog)"
            class="w-full h-full object-cover block"
            alt="Blog thumbnail"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            No Image
          </div>
        </div>

        <!-- Blog Info -->
        <div class="flex-1 px-4 py-3 min-w-0">
          <p class="text-xs text-yellow-400 font-semibold mb-1">
            {{ formatDate(blog.createdAt) }}
          </p>
          <!-- Truncate title with line clamp (requires plugin) -->
          <h3 class="text-sm font-bold text-white leading-tight truncate overflow-hidden whitespace-nowrap w-full">
            {{ blog.title }}
          </h3>
          <router-link
            :to="`/blog/${blog._id}`"
            class="inline-block mt-2 text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md transition"
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
