<template>
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
  import { useStore } from '../store/store';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/admin/login', {
            email: this.email,
            password: this.password,
          });
  
          const { token } = response.data;
          store.setToken(token);
          store.setIsAdmin(true);
          router.push('/');
        } catch (error) {
          console.error(error);
          alert('Login failed');
        }
      };
  
      return { login };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  