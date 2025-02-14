<template>
    <div class="p-6">
      <h1 class="text-2xl font-semibold mb-4">My Bookings</h1>
  
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="bookings.length === 0" class="text-gray-500">No bookings found.</div>
      
      <div v-else>
        <div v-for="booking in bookings" :key="booking._id" class="p-4 mb-4 bg-gray-100 rounded-lg">
          <p class="font-semibold">Tent: {{ booking.tentId?.size }} - {{ booking.tentId?.color }}</p>
          <p>From: {{ formatDate(booking.fromDate) }} | To: {{ formatDate(booking.toDate) }}</p>
          <p>Quantity: {{ booking.quantity }}</p>
          <p class="font-semibold">
            Status: <span :class="getStatusColor(booking.status)">{{ booking.status }}</span>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { getAuth } from "firebase/auth";
  const auth = getAuth();
  const bookings = ref([]);
  const loading = ref(true);
  
  const formatDate = (date) => new Date(date).toLocaleDateString();
  
  const getStatusColor = (status) => {
    return status === "Cancelled" ? "text-red-500" : "text-green-500";
  };
  
  onMounted(async () => {
    const userId = auth.currentUser;
    if (!userId) {
      loading.value = false;
      return;
    }
  
    try {
        console.info("userid", userId.uid)
      const response = await axios.get(`http://localhost:5000/api/bookings/my-bookings/${userId.uid}`);
      bookings.value = response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  