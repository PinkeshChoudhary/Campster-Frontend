import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    isAdmin: false,
    token: localStorage.getItem('token') || null,
    approvedPlaces: [],
    pendingPlaces: [],
  }),
  actions: {
    setIsAdmin(status) {
      this.isAdmin = status;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setApprovedPlaces(places) {
      this.approvedPlaces = places;
    },
    setPendingPlaces(places) {
      this.pendingPlaces = places;
    },
    logout() {
      this.token = null;
      this.isAdmin = false;
      localStorage.removeItem('token');
    },
  },
});
