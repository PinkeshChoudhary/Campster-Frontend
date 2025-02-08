<template>
  <div class="flex justify-center items-center p-4">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg backdrop-blur-md bg-white/50">
      <h3
        class="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 text-center"
      >
        Share a Hidden Gem
      </h3>
      <form @submit.prevent="submitPlace">
        <!-- Place Name Input -->
        <div class="mb-4">
          <input
            v-model="place.name"
            type="text"
            placeholder="Enter the Site name"
            class="input-field"
            required
          />
        </div>

        <!-- Description Input -->
        <div class="mb-4">
          <textarea
            v-model="place.description"
            placeholder="Site description"
            class="input-field"
            required
          ></textarea>
        </div>

        <!-- Image Upload -->
        <div class="mb-4">
          <input type="file" @change="handleImageUpload" multiple accept="image/*" class="input-field" />
        </div>

        <!-- Image Preview -->
        <div v-if="imagePreviews.length" class="mb-4 grid grid-cols-3 gap-2">
          <div v-for="(image, index) in imagePreviews" :key="index" class="relative">
            <img :src="image" class="w-24 h-24 object-cover rounded-lg shadow-md" />
            <button
              type="button"
              class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2"
              @click="removeImage(index)"
            >
              ✖
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">
          Share
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const place = ref({
      name: "",
      description: "",
      images: [],
    });

    const imagePreviews = ref([]);

    // Handle file input change
    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      
      files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        
        place.value.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    // Remove image from list
    const removeImage = (index) => {
      place.value.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };

    // Submit form data
    const submitPlace = async () => {
      try {
        const formData = new FormData();
        formData.append("name", place.value.name);
        formData.append("description", place.value.description);
        place.value.images.forEach((image) => formData.append("images", image));

        await axios.post("http://localhost:5000/api/places/submit", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Reset form
        place.value.name = "";
        place.value.description = "";
        place.value.images = [];
        imagePreviews.value = [];

        alert("Place submitted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to submit place");
      }
    };

    return { place, imagePreviews, handleImageUpload, removeImage, submitPlace };
  },
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  background: linear-gradient(to right, #ebf8ff, #c6f6d5);
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(to right, #38a169, #2f855a);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
}

.submit-btn:hover {
  transform: scale(1.05);
}
</style>
