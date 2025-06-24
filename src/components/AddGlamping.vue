<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-2">Add Glamping Site</h2>
      <p class="text-gray-300">Create a new glamping experience for travelers</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column - Basic Information -->
      <div class="space-y-6">
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Basic Information
          </h3>
          
          <!-- Name -->
          <div class="mb-4">
            <label class="block text-gray-300 font-medium mb-2">Site Name</label>
            <input v-model="name" type="text" placeholder="Enter site name"
              class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label class="block text-gray-300 font-medium mb-2">Location</label>
            <input v-model="location" type="text" placeholder="Enter location"
              class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
          </div>

          <!-- Type of Stay -->
          <div class="mb-4">
            <label class="block text-gray-300 font-medium mb-2">Type of Stay</label>
            <select v-model="typeOfStay" class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
              <option disabled value="" class="bg-gray-800">Select type</option>
              <option value="Cafes" class="bg-gray-800">Cafes</option>
              <option value="Resort" class="bg-gray-800">Resort</option>
              <option value="Tent & Camps" class="bg-gray-800">Tent & Camps</option>
              <option value="Villa" class="bg-gray-800">Villa</option>
            </select>
          </div>

          <!-- Price -->
          <div class="mb-4">
            <label class="block text-gray-300 font-medium mb-2">Price per Night</label>
            <div class="relative">
              <span class="absolute left-3 top-3 text-gray-400">₹</span>
              <input v-model="pricePerNight" type="number" placeholder="0"
                class="w-full p-3 pl-8 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="block text-gray-300 font-medium mb-2">Description</label>
            <textarea v-model="description" placeholder="Describe the glamping experience..." rows="4"
              class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"></textarea>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Images
          </h3>
          
          <div class="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
            <input type="file" @change="handleImageUpload" multiple class="hidden" id="imageUpload" accept="image/*">
            <label for="imageUpload" class="cursor-pointer">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-gray-300 mb-2">Click to upload images</p>
              <p class="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
            </label>
          </div>
          
          <div v-if="imagePreviews.length" class="grid grid-cols-3 gap-3 mt-4">
            <div v-for="(img, index) in imagePreviews" :key="index" class="relative group">
              <img :src="img" class="w-full h-20 object-cover rounded-lg border border-white/20">
              <button @click="removeImage(index)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Amenities and Permissions -->
      <div class="space-y-6">
        <!-- Amenities -->
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            Amenities
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
            <label v-for="(value, key) in amenities" :key="key"
                   class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <input type="checkbox" v-model="amenities[key]"
                     class="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2">
              <span class="text-gray-300 text-sm capitalize">{{ formatAmenityName(key) }}</span>
            </label>
          </div>
        </div>

        <!-- Permissions -->
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Permissions
          </h3>
          
          <div class="space-y-3">
            <label class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <input type="checkbox" v-model="permissions.pets"
                     class="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2">
              <span class="text-gray-300">Pets Allowed</span>
            </label>
            <label class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <input type="checkbox" v-model="permissions.music"
                     class="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2">
              <span class="text-gray-300">Loud Music Allowed</span>
            </label>
            <label class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <input type="checkbox" v-model="permissions.bonfire"
                     class="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2">
              <span class="text-gray-300">Bonfire Allowed</span>
            </label>
            <label class="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <input type="checkbox" v-model="permissions.open24hrs"
                     class="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2">
              <span class="text-gray-300">Open 24 Hours</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="mt-8 text-center">
      <button @click="addGlampingSite"
        class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Glamping Site
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const location = ref("");
const pricePerNight = ref("");
const description = ref("");
const typeOfStay = ref("");
const amenities = ref({
  wifi: false,
  pool: false,
  bbq: false,
  parking: false,
  hotWater: false,
  privateBathroom: false,
  outdoorShower: false,
  airConditioner: false,
  heater: false,
  kitchenAccess: false,
  breakfastIncluded: false,
  mountainView: false,
  lakeView: false,
  hammock: false,
  boardGames: false,
  bikeRental: false,
  miniFridge: false,
  chargingPorts: false,
  mosquitoNet: false,
  yogaDeck: false,
  firePit: false,
  swing: false,
  firstAidKit: false,
  campfireCooking: false,
});

const images = ref([]);
const imagePreviews = ref([]);

const permissions = ref({
  pets: false,
  music: false,
  bonfire: false,
  open24hrs: false,
});

// Helper function to format amenity names
const formatAmenityName = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (!files.length) return;

  for (let file of files) {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert(`File ${file.name} is too large. Please select files under 10MB.`);
      continue;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(`File ${file.name} is not an image. Please select image files only.`);
      continue;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
    images.value.push(file);
  }
};

const removeImage = (index) => {
  imagePreviews.value.splice(index, 1);
  images.value.splice(index, 1);
};

const addGlampingSite = async () => {
  // Validation
  if (!name.value.trim()) {
    alert("Please enter a site name.");
    return;
  }
  if (!location.value.trim()) {
    alert("Please enter a location.");
    return;
  }
  if (!pricePerNight.value || pricePerNight.value <= 0) {
    alert("Please enter a valid price per night.");
    return;
  }
  if (!description.value.trim()) {
    alert("Please enter a description.");
    return;
  }
  if (!typeOfStay.value) {
    alert("Please select a type of stay.");
    return;
  }
  if (!images.value.length) {
    alert("Please upload at least one image.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value.trim());
  formData.append("location", location.value.trim());
  formData.append("pricePerNight", pricePerNight.value);
  formData.append("typeOfStay", typeOfStay.value);
  formData.append("description", description.value.trim());
  formData.append("amenities", JSON.stringify(amenities.value));
  formData.append("permissions", JSON.stringify(permissions.value));
  images.value.forEach((img) => formData.append("images", img));

  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/glamping/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Glamping site added successfully!");
    resetForm();
  } catch (error) {
    console.error("Error adding site", error);
    alert("Failed to add glamping site. Please try again.");
  }
};

const resetForm = () => {
  name.value = "";
  location.value = "";
  pricePerNight.value = "";
  description.value = "";
  typeOfStay.value = "";
  
  // Reset amenities
  Object.keys(amenities.value).forEach(key => {
    amenities.value[key] = false;
  });
  
  // Reset permissions
  Object.keys(permissions.value).forEach(key => {
    permissions.value[key] = false;
  });
  
  images.value = [];
  imagePreviews.value = [];
};
</script>

<style scoped>
/* Custom scrollbar for amenities section */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Enhanced glass morphism effect */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-colors {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

/* Input focus effects */
input:focus,
textarea:focus,
select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.15);
}

/* Button hover effects */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(147, 51, 234, 0.3);
}

button:active {
  transform: translateY(0);
}

/* Checkbox styling */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="checkbox"]:checked {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-color: #8b5cf6;
}

input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 1px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

input[type="checkbox"]:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

/* File upload area hover effect */
.border-dashed:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

/* Image preview hover effects */
.group:hover img {
  transform: scale(1.05);
}

/* Gradient backgrounds */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Custom select styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Text selection styling */
::selection {
  background-color: rgba(147, 51, 234, 0.3);
  color: white;
}

/* Focus states for accessibility */
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
button:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.5);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-3xl {
    font-size: 2rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Loading animation for images */
img {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

img:not([src]) {
  opacity: 0;
}

/* Enhanced border effects */
.border-white\/10 {
  border-color: rgba(255, 255, 255, 0.1);
}

.border-white\/20 {
  border-color: rgba(255, 255, 255, 0.2);
}

/* Background opacity utilities */
.bg-white\/5 {
  background-color: rgba(255, 255, 255, 0.05);
}

.bg-white\/10 {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Hover state for cards */
.bg-white\/5:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.bg-white\/10:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
