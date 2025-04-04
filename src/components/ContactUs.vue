<template>
    <!-- Back Button -->
    <button @click="goBack" class="text-yellow-900 hover:text-yellow-700 transition duration-200 pt-10 p-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  
    <div class="flex justify-center items-center p-4 mb-20 pt-20">
      <div class="w-full max-w-lg p-6 bg-black/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-600">
        <h3 class="text-3xl font-bold text-yellow-900 mb-6 text-center">Contact Us</h3>
  
        <form @submit.prevent="submitContact">
          <!-- Name -->
          <div class="mb-4">
            <input v-model="contact.name" type="text" placeholder="Your Name" class="input-field" required />
          </div>
  
          <!-- Email -->
          <div class="mb-4">
            <input v-model="contact.email" type="email" placeholder="Your Email" class="input-field" required />
          </div>
  
          <!-- Message -->
          <div class="mb-4">
            <textarea v-model="contact.message" placeholder="Your Message" class="input-field" required></textarea>
          </div>
  
          <!-- Submit Button -->
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? "Sending..." : "📩 Send Message" }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const contact = ref({
    name: "",
    email: "",
    message: "",
  });
  const isSubmitting = ref(false);
  
  const submitContact = async () => {
    if (!contact.value.name || !contact.value.email || !contact.value.message) return;
  
    isSubmitting.value = true;
  
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, contact.value);
      alert("Message sent successfully!");
      contact.value = { name: "", email: "", message: "" };
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
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
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 12px;
    color: rgb(205, 86, 50);
    background-color: black;
    border: 2px solid #2c2d2d;
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
  </style>
  