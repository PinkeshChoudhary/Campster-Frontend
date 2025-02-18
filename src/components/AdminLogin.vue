<!-- <template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Admin Login</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-lg">Email</label>
        <input v-model="email" type="email" id="email" class="w-full p-2 border rounded-md" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-lg">Password</label>
        <input v-model="password" type="password" id="password" class="w-full p-2 border rounded-md" required />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/admin/login", {
          email: email.value,
          password: password.value,
        });

        const { token } = response.data;
        store.setToken(token);
        store.setIsAdmin(true);
        router.push("/");
      } catch (error) {
        console.error(error);
        alert("Login failed");
      }
    };

    return { email, password, login };
  },
};
</script>

<style scoped>
/* Add your styling here */
</style> -->
<template>
  <div class="flex justify-center items-center p-4">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg backdrop-blur-md bg-white/50">
      <h2
        class="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg p-2 rounded-md">
        Partner
      </h2>
      <input v-model="email" type="email" placeholder="Email"
        class="shadow-lg bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div class="relative mb-4">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
          class="shadow-lg bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button @click="toggleShowPassword" type="button"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c3.333 0 6 2.667 6 6 0 2.667-1.667 4.667-4 5.333V15a3 3 0 1 1-6 0v-.667c-2.333-.666-4-2.667-4-5.333 0-3.333 2.667-6 6-6z" />
          </svg>
        </button>
      </div>
      <button @click="login"
        class="w-full p-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Login
      </button>

      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const showPassword = ref(false); // Track password visibility
    const store = useStore(); // Access the Pinia store
    const router = useRouter(); // Access Vue Router

    const login = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value, password: password.value }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token in Pinia store
          store.setToken(data.token);
          store.setIsAdmin(true); // Mark user as admin
          router.push('/'); // Redirect to the homepage
        } else {
          errorMessage.value = data.message;
        }
      } catch (error) {
        errorMessage.value = 'An error occurred. Please try again.';
      }
    };

    // Toggle the visibility of the password
    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      email,
      password,
      errorMessage,
      login,
      showPassword,
      toggleShowPassword,
    };
  },
};
</script>

<style scoped>
/* Custom styles */
.bg-gray-200 {
  background-color: #f7fafc;
}
</style>
