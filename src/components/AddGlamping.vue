<template>
    <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Add Glamping Site</h2>
  
      <!-- Name -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Name</label>
        <input v-model="name" type="text" placeholder="Enter site name"
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
      </div>
  
      <!-- Location -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Location</label>
        <input v-model="location" type="text" placeholder="Enter location"
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
      </div>
  
      <!-- Price -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Price per Night</label>
        <input v-model="pricePerNight" type="number" placeholder="₹ per night"
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
      </div>
  
      <!-- Description -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Description</label>
        <textarea v-model="description" placeholder="Describe the glamping experience..."
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"></textarea>
      </div>
  
      <!-- Amenities -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Amenities (comma-separated)</label>
        <input v-model="amenities" type="text" placeholder="WiFi, BBQ, Pool..."
          class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
      </div>
  
      <!-- Image Upload -->
      <div class="mb-6">
        <label class="block text-gray-700 font-semibold">Upload Images</label>
        <input type="file" @change="handleImageUpload" multiple class="w-full p-2 border rounded-md">
        <div v-if="imagePreviews.length" class="flex gap-2 mt-2">
          <img v-for="(img, index) in imagePreviews" :key="index" :src="img" class="w-16 h-16 rounded-md shadow">
        </div>
      </div>
  
      <!-- Submit Button -->
      <button @click="addGlampingSite"
        class="bg-yellow-500 text-white font-semibold w-full p-3 rounded-md hover:bg-yellow-600 transition">
        Add Site
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const name = ref("");
  const location = ref("");
  const pricePerNight = ref("");
  const description = ref("");
  const amenities = ref("");
  const images = ref([]);
  const imagePreviews = ref([]);
  
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files.length) return;
  
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
      images.value.push(file);
    }
  };
  
  const addGlampingSite = async () => {
    if (!name.value || !location.value || !pricePerNight.value || !description.value || !images.value.length) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("location", location.value);
    formData.append("pricePerNight", pricePerNight.value);
    formData.append("description", description.value);
    formData.append("amenities", amenities.value);
    images.value.forEach((img) => formData.append("images", img));
  
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/glamping/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Glamping site added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding site", error);
    }
  };
  
  const resetForm = () => {
    name.value = "";
    location.value = "";
    pricePerNight.value = "";
    description.value = "";
    amenities.value = "";
    images.value = [];
    imagePreviews.value = [];
  };
  </script>
  