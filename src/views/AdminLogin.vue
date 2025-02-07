<template>
  <div class="flex justify-center items-center  p-4">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg backdrop-blur-md bg-white/50">
      <h2 class="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 shadow-lg p-2 rounded-md">Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="shadow-lg bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
<input v-model="password" type="password" placeholder="Password" class="shadow-lg bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
<button @click="login" class="w-full p-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg shadow-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
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

    return {
      email,
      password,
      errorMessage,
      login,
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
