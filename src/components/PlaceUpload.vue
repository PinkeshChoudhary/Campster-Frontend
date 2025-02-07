<template>
    <div class="flex justify-center items-center  p-4">
      <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg backdrop-blur-md bg-white/50">
        <h3 class="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 text-center">
          Share a Hidden Gem
        </h3>
        <form @submit.prevent="submitPlace">
          <!-- Place Name Input -->
          <div class="mb-4">
            <input v-model="place.name" type="text" id="name" placeholder="Enter the Site name" class="w-full p-3 border-2 border-gray-300 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 ease-in-out" required />
          </div>
  
          <!-- Description Input -->
          <div class="mb-4">
            <textarea v-model="place.description" id="description" placeholder="Site description" class="w-full p-3 border-2 border-gray-300 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 ease-in-out" required></textarea>
          </div>
  
          <!-- Image Upload -->
          <div class="mb-4">
            <input type="file" id="images" @change="handleImageUpload" multiple placeholder="Upload images (Max 8)" class="w-full p-3 border-2 border-gray-300 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 ease-in-out" />
          </div>
  
          <!-- Submit Button -->
          <button type="submit" class="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300">
            Share
          </button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        place: {
          name: '',
          description: '',
          images: [],
        },
      };
    },
    methods: {
      handleImageUpload(event) {
        const files = event.target.files;
        this.place.images = Array.from(files);
      },
      async submitPlace() {
        try {
          const formData = new FormData();
          formData.append('name', this.place.name);
          formData.append('description', this.place.description);
          this.place.images.forEach((image) => {
            formData.append('images', image);
          });
  
          const response = await axios.post('http://localhost:5000/api/places/submit', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          this.place.name = '';
          this.place.description = '';
          this.place.images = [];
          alert('Place submitted successfully!');
        } catch (error) {
          console.error(error);
          alert('Failed to submit place');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles */
  .w-full {
    width: 100%;
  }
  
  .bg-green-500 {
    background-color: #48bb78;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  </style>
  