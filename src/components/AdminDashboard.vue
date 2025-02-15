<template>
    <div>
        <h2 class="text-xl font-semibold">Pending Places</h2>

        <!-- Popup Notification -->
        <div v-if="showNotification" class="fixed top-5 right-5 bg-white shadow-lg p-4 rounded-lg border border-gray-300">
            <p class="font-semibold">{{ notificationMessage }}</p>
            <button @click="showNotification = false" class="bg-red-500 text-white px-3 py-1 rounded mt-2">Close</button>
        </div>

        <div v-for="place in pendingPlaces" :key="place._id" class="mb-4">
            <div class="flex justify-between items-center">
                <div class="shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white">
                    <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-semibold">{{ place.name }}</h3>
                        <button @click="approvePlace(place._id)" class="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
                        <button @click="rejectPlace(place._id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bookings Section -->
        <h2 class="text-xl font-semibold mt-8">Bookings</h2>
        <div v-if="bookings.length === 0" class="text-gray-500">No bookings found.</div>
        <div v-for="booking in bookings" :key="booking._id" class="border p-4 rounded-lg shadow-lg my-4 bg-white">
            <h3 class="font-semibold">Tent: {{ booking.tentId?.name || "Unknown Tent" }}</h3>
            <p>User ID: {{ booking.userId }}</p>
            <p>From: {{ formatDate(booking.fromDate) }}</p>
            <p>To: {{ formatDate(booking.toDate) }}</p>
            <p>Quantity: {{ booking.quantity }}</p>
            <p class="font-bold" :class="booking.status === 'Pending' ? 'text-yellow-500' : 'text-green-600'">
                Status: {{ booking.status }}
            </p>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, onUnmounted } from "vue";
import { useStore } from "../store/store";
import axios from "axios";
import { io } from "socket.io-client";

export default {
    setup() {
        const store = useStore();
        const pendingPlaces = computed(() => store.pendingPlaces);
        const showNotification = ref(false);
        const notificationMessage = ref("");
        const bookings = ref([]);

        // Fetch pending places for admins
        const fetchPendingPlaces = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/pending-places", {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                store.setPendingPlaces(response.data.places);
            } catch (error) {
                console.error(error);
            }
        };

        // Approve a place (admin)
        const approvePlace = async (placeId) => {
            try {
                await axios.post(`http://localhost:5000/api/admin/approve-place/${placeId}`, {}, {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                fetchPendingPlaces(); // Refresh the pending places
            } catch (error) {
                console.error(error);
            }
        };

        // Reject (delete) a place (admin)
        const rejectPlace = async (placeId) => {
            try {
                await axios.delete(`http://localhost:5000/api/admin/reject-place/${placeId}`, {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                fetchPendingPlaces(); // Refresh the pending places
            } catch (error) {
                console.error(error);
            }
        };

         // Fetch all pending and confirmed bookings
         const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/allbookings", {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                bookings.value = response.data.bookings;
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

          // Format date
          const formatDate = (dateString) => {
            const options = { year: "numeric", month: "short", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        // Connect to Socket.io
        const socket = io("http://localhost:5000");

        // Handle booking notification
        const handleBookingNotification = (data) => {
            console.log("📢 Received booking notification:", data);

            notificationMessage.value = `${data.message} (From: ${data.fromDate} To: ${data.toDate})`;
            showNotification.value = true;

            // Show browser notification if permission granted
            if (Notification.permission === "granted") {
                new Notification("New Booking", {
                    body: data.message,
                    icon: "/logo.png", // Add a relevant icon if needed
                });
            } else {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        new Notification("New Booking", {
                            body: data.message,
                            icon: "/logo.png",
                        });
                    }
                });
            }

            // Auto-hide notification after 9 seconds
            setTimeout(() => {
                showNotification.value = false;
            }, 9000);
        };

        // Listen for booking notifications
        onMounted(() => {
            fetchPendingPlaces();
            fetchBookings();
            socket.on("bookingNotification", handleBookingNotification);
            if ("serviceWorker" in navigator) {
    (async () => {
        try {
            const registration = await navigator.serviceWorker.register("../../public/sw.js");
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "BCups309q-fqWyo3imYG0oiUVzlb8cm4lF2iNm9xDfn7bmtSOEO0YBwjdL0Og9PPvMr2tTMrtKURMPJhX_30apQ", // If using Web Push API
            });

            console.log("Service Worker Registered:", registration);
            console.log("Push Subscription:", subscription);
        } catch (error) {
            console.error("Service Worker Registration Failed:", error);
        }
    })();
}
        });

        // Cleanup on unmount
        onUnmounted(() => {
            socket.off("bookingNotification", handleBookingNotification);
        });

        return {
            pendingPlaces,
            approvePlace,
            rejectPlace,
            showNotification,
            notificationMessage,
            bookings,
            formatDate,
        };
    },
};
</script>

<style scoped>
.fixed {
    position: fixed;
}
.top-5 {
    top: 20px;
}
.right-5 {
    right: 20px;
}
.shadow-lg {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
