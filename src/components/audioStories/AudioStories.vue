<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">🎧 Audio Stories</h1>

    <!-- Upload form -->
    <form @submit.prevent="uploadAudio" class="bg-white p-4 rounded shadow mb-6">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Title</label>
        <input v-model="form.title" type="text" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea v-model="form.description" class="w-full border p-2 rounded" required></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Category</label>
        <select v-model="form.category" class="w-full border p-2 rounded">
          <option value="travel">Travel</option>
          <option value="love">Love</option>
          <option value="horror">Horror</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Cover Image URL</label>
        <input v-model="form.coverImageUrl" type="text" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Audio File</label>
        <input type="file" @change="handleFileChange" accept="audio/*" class="w-full" required />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload Audio Story
      </button>
    </form>

    <!-- Audio story list -->
    <div class="space-y-6">
      <div v-for="story in stories" :key="story._id" class="p-4 bg-white rounded shadow">
        <div class="flex items-center space-x-4">
          <img :src="story.coverImageUrl" alt="cover" class="w-20 h-20 object-cover rounded" />
          <div>
            <h2 class="text-xl font-semibold">{{ story.title }}</h2>
            <p class="text-sm text-gray-600">{{ story.category }}</p>
          </div>
        </div>
        <p class="mt-2 text-gray-700">{{ story.description }}</p>
        <audio class="w-full mt-3" controls :src="story.audioUrl"></audio>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AudioStories',
  data() {
    return {
      stories: [],
      form: {
        title: '',
        description: '',
        category: 'travel',
        coverImageUrl: '',
        uploadedBy: 'admin', // or use Firebase UID if available
      },
      file: null,
    };
  },
  methods: {
    async fetchStories() {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/audio-stories`);
      this.stories = res.data.reverse();
    },
    handleFileChange(e) {
      this.file = e.target.files[0];
    },
    async uploadAudio() {
      if (!this.file) return alert('Please select an audio file');

      const formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      formData.append('category', this.form.category);
      formData.append('coverImageUrl', this.form.coverImageUrl);
      formData.append('uploadedBy', this.form.uploadedBy);
      formData.append('audio', this.file);

      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/audio-stories`, formData);
        this.form = {
          title: '',
          description: '',
          category: 'travel',
          coverImageUrl: '',
          uploadedBy: 'admin',
        };
        this.file = null;
        await this.fetchStories();
        alert('Uploaded successfully');
      } catch (err) {
        alert('Upload failed');
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchStories();
  },
};
</script>

<style scoped>
body {
  background-color: #f5f5f5;
}
</style>
