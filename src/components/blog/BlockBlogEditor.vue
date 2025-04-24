<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
    <h2 class="text-2xl font-semibold mb-6">🧱 Create Blog</h2>

    <!-- Blog Title -->
    <input v-model="title" placeholder="Enter Blog Title" class="w-full border p-2 mb-4 rounded" />

    <!-- Blog Content Blocks -->
    <div v-for="(block, index) in blocks" :key="index" class="mb-6 p-4 bg-gray-50 rounded-xl">
      <div class="flex justify-between items-center mb-2">
        <select v-model="block.type" class="border px-2 py-1 rounded">
          <option value="heading">Heading</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
        <button @click="removeBlock(index)" class="text-red-600 text-sm hover:underline">Remove</button>
      </div>

      <!-- Heading -->
      <input v-if="block.type === 'heading'" v-model="block.content" class="w-full border p-2 rounded" placeholder="Enter heading..." />

      <!-- Image -->
      <div v-else-if="block.type === 'image'">
        <input type="file" @change="e => handleImageUpload(e, index)" />
        <img v-if="block.preview" :src="block.preview" class="w-full mt-2 rounded-xl" />
      </div>

      <!-- Text -->
      <textarea
        v-else-if="block.type === 'text'"
        v-model="block.content"
        rows="4"
        class="w-full border p-2 rounded"
        placeholder="Write text here..."
      />
    </div>

    <!-- Add Blocks -->
    <div class="flex gap-4 mb-6">
      <button @click="addBlock('heading')" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Add Heading</button>
      <button @click="addBlock('image')" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Add Image</button>
      <button @click="addBlock('text')" class="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Add Text</button>
    </div>

    <!-- Submit Button -->
    <button @click="submitBlog" class="bg-black text-white px-6 py-2 rounded hover:opacity-80">
      🚀 Publish Blog
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const blocks = ref([])

const addBlock = (type) => {
  blocks.value.push({ type, content: '', file: null, preview: '' })
}

const removeBlock = (index) => {
  blocks.value.splice(index, 1)
}

const handleImageUpload = (e, index) => {
  const file = e.target.files[0]
  if (file) {
    blocks.value[index].file = file
    blocks.value[index].preview = URL.createObjectURL(file)
  }
}

const submitBlog = async () => {
  const formData = new FormData();
  
  formData.append('title', title.value);

  // Log blocks array content before adding to formData
  blocks.value.forEach((block, i) => {
    console.log(`Appending Block ${i}:`, block);
    formData.append(`blocks[${i}][type]`, block.type);
    if (block.type === 'image' && block.file) {
      console.log(`Appending Block ${i} Image file:`, block.file);
      formData.append(`blocks[${i}][file]`, block.file);
    } else {
      formData.append(`blocks[${i}][content]`, block.content);
    }
  });

  // Log all formData entries
  for (const [key, val] of formData.entries()) {
    console.log(`${key}:`, val);
  }

  try {
    console.log('📦 Sending Blog to Backend...');
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/add`, formData);
    alert('✅ Blog published!');
    title.value = '';
    blocks.value = [];
  } catch (err) {
    console.error('Error submitting blog:', err);
    alert('❌ Failed to publish blog.');
  }
};

</script>

<style scoped>
textarea {
  resize: none;
}
</style>
