<template>
  <div class="flex justify-center items-center p-4">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h3 class="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Share Your Camping Experience
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
            <option value="">Rating</option>
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
            <option value="">Tent Condition</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
            <option>Poor</option>
          </select>
          <select v-model="experience.comfort" class="input-field" required>
            <option value="">Comfort Level</option>
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

        <!-- Wildlife Spotted -->
        <div class="mb-4">
          <input v-model="experience.wildlife" type="text" placeholder="Wildlife spotted (e.g. Deer, Birds)" class="input-field" />
        </div>

        <!-- Best Part of the Trip -->
        <div class="mb-4">
          <textarea v-model="experience.bestPart" placeholder="Best part of your trip" class="input-field" required></textarea>
        </div>

        <!-- Challenges Faced -->
        <div class="mb-4">
          <textarea v-model="experience.challenges" placeholder="Any challenges faced?" class="input-field"></textarea>
        </div>

        <!-- Tips for Future Visitors -->
        <div class="mb-4">
          <textarea v-model="experience.tips" placeholder="Tips for future campers" class="input-field"></textarea>
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

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">
          Share Experience
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
    const experience = ref({
      destination: "",
      date: "",
      duration: "",
      groupSize: "",
      tentCondition: "",
      comfort: "",
      rating: "",
      amenities: "",
      wildlife: "",
      bestPart: "",
      challenges: "",
      tips: "",
      images: [],
    });

    const imagePreviews = ref([]);

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

    const submitExperience = async () => {
      try {
        const formData = new FormData();
        Object.keys(experience.value).forEach((key) => {
          if (key === "images") {
            experience.value.images.forEach((image) => formData.append("images", image));
          } else {
            formData.append(key, experience.value[key]);
          }
        });

        await axios.post("http://localhost:5000/api/places/submit", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        experience.value = { destination: "", date: "", duration: "", groupSize: "", tentCondition: "", comfort: "", rating: "", amenities: "", wildlife: "", bestPart: "", challenges: "", tips: "", images: [] };
        imagePreviews.value = [];

        alert("Experience submitted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to submit experience");
      }
    };

    return { experience, imagePreviews, handleImageUpload, removeImage, submitExperience };
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
}
.input-field:focus {
  border-color: #3b82f6;
}
.submit-btn {
  width: 100%;
  background: linear-gradient(to right, #38a169, #2f855a);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.2s;
}
.submit-btn:hover {
  transform: scale(1.05);
}
</style>
