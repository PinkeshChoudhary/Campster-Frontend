// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    gender: '',
    avatarUrl: '',

  }),
});
