<template>
  <div class="min-h-screen bg-black py-8 px-4">
    <!-- Back Button -->
    <button
      @click="goBack"
      class="fixed top-6 left-6 z-10 flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 border border-white/10 hover:border-white/20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-sm font-medium">Back</span>
    </button>

    <div class="flex justify-center items-center pt-20 pb-8">
      <div class="w-full max-w-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-bold text-white mb-2">Share Hidden Gem</h1>
          <p class="text-slate-400 text-lg">Discover and share amazing places with the community</p>
        </div>

        <!-- Form Container -->
        <div class="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-8">
          <form @submit.prevent="submitplace" class="space-y-6">
            <!-- Destination Name -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Destination Name
              </label>
              <input
                v-model="place.destination"
                type="text"
                placeholder="Enter the name of your hidden gem"
                class="form-input"
                required
              />
            </div>

            <!-- City -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                City
              </label>
              <input
                v-model="place.location"
                type="text"
                placeholder="Which city is this place in?"
                class="form-input"
                required
              />
            </div>

            <!-- Location Coordinates -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Location Coordinates
              </label>
              <div class="space-y-3">
                <input
                  v-model="place.locationCoordinates"
                  type="text"
                  placeholder="Latitude, Longitude (e.g., 40.7128, -74.0060)"
                  class="form-input"
                  required
                />
                <button
                  type="button"
                  @click="getUserLocation"
                  :disabled="place.locationCoordinates !== '' || isGettingLocation"
                  class="location-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ isGettingLocation ? 'Getting location...' : 'Use My Current Location' }}
                </button>
              </div>
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </label>
              <textarea
                v-model="place.description"
                placeholder="Tell us what makes this place special..."
                class="form-textarea"
                rows="4"
                required
              ></textarea>
            </div>

            <!-- Instagram Profile -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Instagram Profile (Optional)
              </label>
              <input
                v-model="place.instagramProfile"
                type="url"
                placeholder="https://instagram.com/yourprofile"
                class="form-input"
              />
            </div>

            <!-- Place Type -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Place Type
              </label>
              <select v-model="place.typeOfPlace" class="form-select" required>
                <option value="">Select place type</option>
                <option value="popular">Popular Picks</option>
                <option value="hidden">Hidden Gem</option>
              </select>
            </div>

            <!-- Image Upload -->
            <div class="form-group">
              <label class="form-label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Images
              </label>
              <div
                class="upload-area"
                @dragover.prevent
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
              >
                <input
                  ref="fileInput"
                  type="file"
                  @change="handleImageUpload"
                  multiple
                  accept="image/*"
                  class="hidden"
                />
                <div class="upload-content">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-slate-400 mx-auto mb-4">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="text-white font-medium mb-2">Drop images here or click to browse</p>
                  <p class="text-slate-400 text-sm">Support: JPG, PNG, GIF (Max 10MB each)</p>
                </div>
              </div>
            </div>

            <!-- Image Preview -->
            <div v-if="imagePreviews.length" class="form-group">
              <label class="form-label">Preview Images</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div v-for="(image, index) in imagePreviews" :key="index" class="image-preview-container">
                  <img :src="image" class="w-full h-24 object-cover rounded-xl" />
                  <button
                    type="button"
                    class="remove-image-btn"
                    @click="removeImage(index)"
                    title="Remove image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-3 h-3">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sponsored Checkbox -->
            <div class="form-group">
              <div class="flex items-center gap-3">
                <input
                  v-model="place.paid"
                  type="checkbox"
                  id="coverCharges"
                  class="checkbox-input"
                >
                <label for="coverCharges" class="checkbox-label">
                  This is a sponsored place
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="submit-btn"
              :disabled="!isFormValid || isSubmitting"
            >
              <div v-if="isSubmitting" class="flex items-center gap-3">
                <div class="loading-spinner"></div>
                <span>Sharing your place...</span>
              </div>
              <div v-else class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Share Hidden Gem</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    ref,
    computed
} from "vue";
import axios from "axios";
import {
    getAuth
} from "firebase/auth";
import {
    useRoute,
    useRouter
} from 'vue-router';

export default {
    setup() {
        const auth = getAuth();
        const user = auth.currentUser;
        const route = useRoute();
        const router = useRouter();
        const fileInput = ref(null);
        const isGettingLocation = ref(false);
        
        const place = ref({
            destination: "",
            description: "",
            location: "",
            locationCoordinates: "",
            images: [],
            typeOfPlace: "",
            paid: false,
            instagramProfile: "",
        });

        const imagePreviews = ref([]);
        const isSubmitting = ref(false);

        const processFiles = (files) => {
            Array.from(files).forEach((file) => {
                if (!file.type.startsWith("image/")) return;
                if (file.size > 10 * 1024 * 1024) { // 10MB limit
                    alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                    return;
                }
                
                place.value.images.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreviews.value.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        };

        const handleImageUpload = (event) => {
            const files = event.target.files;
            processFiles(files);
        };

        const handleDrop = (event) => {
            const files = event.dataTransfer.files;
            processFiles(files);
        };

        const triggerFileInput = () => {
            fileInput.value?.click();
        };

        const removeImage = (index) => {
            place.value.images.splice(index, 1);
            imagePreviews.value.splice(index, 1);
        };

        const isFormValid = computed(() => {
            const requiredFields = ['destination', 'location', 'locationCoordinates', 'description', 'typeOfPlace'];
            return requiredFields.every(field => place.value[field] && place.value[field].trim() !== '');
        });

        const submitplace = async () => {
            if (!isFormValid.value) return;

            isSubmitting.value = true;

            try {
                const formData = new FormData();
                Object.keys(place.value).forEach((key) => {
                    if (key === "images") {
                        place.value.images.forEach((image) => formData.append("images", image));
                    } else {
                        formData.append(key, place.value[key]);
                    }
                });
                formData.append("userId", user.uid);

                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/places/submit`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                });

                // Reset form
                place.value = {
                    destination: "",
                    description: "",
                    locationCoordinates: "",
                    location: "",
                    instagramProfile: "",
                    images: [],
                    typeOfPlace: "",
                    paid: false
                };
                imagePreviews.value = [];
                
                // Success notification
                alert("Hidden gem shared successfully! 🎉");
                
                // Navigate back
                goBack();
            } catch (error) {
                console.error(error);
                alert("Failed to share your hidden gem. Please try again.");
            } finally {
                isSubmitting.value = false;
            }
        };

        const goBack = () => {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push('/');
            }
        };

        const getUserLocation = () => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser.");
                return;
            }

            isGettingLocation.value = true;

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lng = position.coords.longitude.toFixed(6);
                    place.value.locationCoordinates = `${lat},${lng}`;
                    isGettingLocation.value = false;
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not fetch location. Please enter manually.");
                    isGettingLocation.value = false;
                }
            );
        };

        return {
            place,
            imagePreviews,
            fileInput,
            isGettingLocation,
            handleImageUpload,
            handleDrop,
            triggerFileInput,
            removeImage,
            submitplace,
            isFormValid,
            isSubmitting,
            goBack,
            getUserLocation,
        };
    },
};
</script>

<style scoped>
/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

/* Form Labels */
.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

/* Form Inputs */
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgb(148, 163, 184);
}

.form-input:focus {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.form-input:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  outline: none;
  resize: none;
  min-height: 100px;
}

.form-textarea::placeholder {
  color: rgb(148, 163, 184);
}

.form-textarea:focus {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.form-textarea:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  outline: none;
  cursor: pointer;
}

.form-select:focus {
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.form-select:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.form-select option {
  background-color: rgb(30, 41, 59);
  color: white;
}

/* Location Button */
.location-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgb(16, 185, 129);
  color: white;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.location-btn:hover:not(:disabled) {
  background-color: rgb(5, 150, 105);
}

.location-btn:disabled {
  background-color: rgb(71, 85, 105);
  cursor: not-allowed;
}

/* Upload Area */
.upload-area {
  border: 2px dashed rgba(255, 255, 255, 0.4);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.3);
}

.upload-area:hover {
  border-color: rgba(16, 185, 129, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
}

.upload-content {
  pointer-events: none;
}

.upload-area:hover .upload-content svg {
  color: rgb(52, 211, 153);
  transform: scale(1.1);
}

.upload-area:hover .upload-content p {
  color: rgb(110, 231, 183);
}

/* Image Preview */
.image-preview-container {
  position: relative;
  overflow: visible;
  border-radius: 0.75rem;
}

.image-preview-container:hover .remove-image-btn {
  opacity: 1;
  transform: scale(1.1);
}

.remove-image-btn {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: rgb(239, 68, 68);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 1;
  transform: scale(1);
  border: 2px solid white;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.remove-image-btn:hover {
  background-color: rgb(220, 38, 38);
  transform: scale(1.2);
}

/* Checkbox */
.checkbox-input {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  accent-color: rgb(16, 185, 129);
  transition: all 0.3s ease;
}

.checkbox-input:focus {
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  background: linear-gradient(to right, rgb(16, 185, 129), rgb(20, 184, 166));
  color: white;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  transform: scale(1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136));
  transform: scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  background: linear-gradient(to right, rgb(71, 85, 105), rgb(71, 85, 105));
  cursor: not-allowed;
  transform: scale(1);
  box-shadow: none;
}

/* Loading Spinner */
.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Custom Scrollbar for Textarea */
.form-textarea::-webkit-scrollbar {
  width: 0.5rem;
}

.form-textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
}

.form-textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
}

.form-textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 640px) {
  .form-input,
  .form-textarea,
  .form-select {
    font-size: 1rem; /* Prevent zoom on iOS */
  }
}

/* Focus visible for accessibility */
.form-input:focus-visible,
.form-textarea:focus-visible,
.form-select:focus-visible,
.location-btn:focus-visible,
.submit-btn:focus-visible,
.checkbox-input:focus-visible {
  outline: 2px solid rgb(16, 185, 129);
  outline-offset: 2px;
}

/* Animation for form validation */
.form-input:invalid,
.form-textarea:invalid,
.form-select:invalid {
  border-color: rgba(239, 68, 68, 0.5);
}

.form-input:invalid:focus,
.form-textarea:invalid:focus,
.form-select:invalid:focus {
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

/* Smooth transitions for all interactive elements */
* {
  transition: color 0.3s ease;
}
</style>
