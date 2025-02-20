<template>
  <div class="flex justify-center items-center p-4 mb-20 pt-20">
    <div class="w-full max-w-lg p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
      <h3 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        🌲 Share Your Camping Experience
      </h3>

      <form @submit.prevent="submitExperience">
        <!-- Destination Name -->
        <div class="mb-4">
          <input v-model="experience.destination" type="text" placeholder="Where did you camp?" class="input-field" required />
        </div>

        <!-- Trip Date & Duration -->
        <div class="mb-4 flex space-x-2">
          <input v-model="experience.date" type="date" class="input-field w-1/2" required />
          <input v-model="experience.duration" type="number" placeholder="Days Stayed" class="input-field w-1/2" min="1" required />
        </div>

        <!-- Group Size & Rating -->
        <div class="mb-4 grid grid-cols-2 gap-2">
          <input v-model="experience.groupSize" type="number" placeholder="Number of people" class="input-field" min="1" required />
          <select v-model="experience.rating" class="input-field" required>
            <option value="">⭐ Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <!-- Tent Condition & Comfort Level -->
        <div class="mb-4 grid grid-cols-2 gap-2">
          <select v-model="experience.tentCondition" class="input-field" required>
            <option value="">🏕️ Tent Condition</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
          <select v-model="experience.comfort" class="input-field" required>
            <option value="">🛌 Comfort Level</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <!-- Amenities Provided -->
        <div class="mb-4">
          <input v-model="experience.amenities" type="text" placeholder="Amenities provided (e.g. Wifi, BBQ, Shower)" class="input-field" required />
        </div>

        <!-- Best Part of the Trip -->
        <div class="mb-4">
          <textarea v-model="experience.bestPart" placeholder="Best part of your trip" class="input-field" required></textarea>
        </div>

        <!-- Upload Images -->
        <div class="mb-4">
          <input type="file" @change="handleImageUpload" multiple accept="image/*" class="input-field" />
        </div>

        <!-- Image Preview -->
        <div v-if="imagePreviews.length" class="mb-4 grid grid-cols-3 gap-2">
          <div v-for="(image, index) in imagePreviews" :key="index" class="relative">
            <img :src="image" class="w-24 h-24 object-cover rounded-lg shadow-md" />
            <button type="button" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2" @click="removeImage(index)">
              ✖
            </button>
          </div>
        </div>

        <!-- Submit Button (Disabled until form is filled or submitting) -->
        <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
          {{ isSubmitting ? "Sharing your experience..." : "🚀 Share Experience" }}
        </button>
      </form>

      <!-- Social Sharing -->
      <div class="mt-6 text-center">
        <p class="text-gray-600 mb-2">📢 Share your story with friends:</p>
        <div class="flex justify-center space-x-4">
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank" class="share-btn bg-blue-600">Facebook</a>
          <a :href="`https://twitter.com/intent/tweet?text=Check out my camping experience! ${shareUrl}`" target="_blank" class="share-btn bg-sky-500">Twitter</a>
          <a :href="`https://wa.me/?text=Check out my camping experience! ${shareUrl}`" target="_blank" class="share-btn bg-green-500">WhatsApp</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default {
  setup() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const experience = ref({
      destination: "",
      date: "",
      duration: "",
      groupSize: "",
      tentCondition: "",
      comfort: "",
      rating: "",
      amenities: "",
      bestPart: "",
      images: [],
    });

    const imagePreviews = ref([]);
    const isSubmitting = ref(false);
    const shareUrl = ref("https://campster.com/share");

    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        experience.value.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    const removeImage = (index) => {
      experience.value.images.splice(index, 1);
      imagePreviews.value.splice(index, 1);
    };

    const isFormValid = computed(() => {
      return Object.values(experience.value).every((val) => val !== "" && val !== null);
    });

    const submitExperience = async () => {
      if (!isFormValid.value) return;

      isSubmitting.value = true;

      try {
        const formData = new FormData();
        Object.keys(experience.value).forEach((key) => {
          if (key === "images") {
            experience.value.images.forEach((image) => formData.append("images", image));
          } else {
            formData.append(key, experience.value[key]);
          }
        });
        formData.append("userId", user.uid);

        await axios.post("http://localhost:5000/api/places/submit", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        experience.value = { destination: "", date: "", duration: "", groupSize: "", tentCondition: "", comfort: "", rating: "", amenities: "", bestPart: "", images: [] };
        imagePreviews.value = [];
        alert("Experience submitted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to submit experience");
      } finally {
        isSubmitting.value = false;
      }
    };

    return { experience, imagePreviews, handleImageUpload, removeImage, submitExperience, isFormValid, isSubmitting, shareUrl };
  },
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;
}
.input-field:focus {
  border-color: #38b2ac;
}
.submit-btn {
  width: 100%;
  background: linear-gradient(to right, #4caf50, #388e3c);
  color: white;
  padding: 12px;
  border-radius: 10px;
  font-weight: bold;
  transition: transform 0.2s;
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.share-btn {
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: bold;
}
</style>
