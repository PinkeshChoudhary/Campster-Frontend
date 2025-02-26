<template>
  <div class="p-6">
    <!-- Back Arrow Button -->
    <button @click="goBack" class="mt-20 p-2 bg-black rounded-full hover:bg-gray-400">
      <svg class="h-6 w-6" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <h1 class="text-2xl font-semibold mb-4">My Bookings</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center">
      <svg
        class="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>

    <div v-else-if="bookings.length === 0" class="text-gray-500">No bookings found.</div>

    <div v-else>
      <div v-for="booking in bookings" :key="booking._id" class="p-4 mb-4 bg-gray-300 rounded-lg">
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
import { useRouter } from "vue-router";
import axios from "axios";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const router = useRouter();
const bookings = ref([]);
const loading = ref(true);

const formatDate = (date) => new Date(date).toLocaleDateString();

const getStatusColor = (status) => {
  return status === "Cancelled" ? "text-red-500" : "text-green-500";
};

// Back button function
const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  const userId = auth.currentUser;
  if (!userId) {
    loading.value = false;
    return;
  }

  try {
    console.info("userid", userId.uid);
    const response = await axios.get(`https://campster-backend-production.up.railway.app/api/bookings/my-bookings/${userId.uid}`);
    bookings.value = response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
  } finally {
    loading.value = false;
  }
});
</script>
