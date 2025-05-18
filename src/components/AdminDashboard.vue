<template>
    <div>
        <h2 class="text-white font-semibold pt-20">Pending Places</h2>

        <!-- Popup Notification -->
        <div v-if="showNotification" class="fixed top-5 right-5 bg-white shadow-lg p-4 rounded-lg border border-gray-300">
            <p class="font-semibold">{{ notificationMessage }}</p>
            <button @click="showNotification = false" class="bg-red-500 text-white px-3 py-1 rounded mt-2">Close</button>
        </div>

        <!-- Pending Places List -->
        <div v-for="place in pendingPlaces" :key="place._id" class="mb-4">
            <div class="flex justify-between items-center">
                <div class="shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white" @click="selectedPlace = place">
                    <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-semibold">{{ place.destination }}</h3>
                        <button @click.stop="approvePlace(place._id)" class="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
                        <button @click.stop="rejectPlace(place._id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Place Details Modal -->
        <div v-if="selectedPlace" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <!-- Loop through all images -->
        <div class="flex overflow-x-auto space-x-2">
            <img v-for="(image, index) in selectedPlace.images" :key="index" :src="image" 
                 class="w-40 h-40 object-cover rounded-lg">
        </div>
        
        <h3 class="text-2xl font-semibold mt-4">{{ selectedPlace.destination }}</h3>
        <p class="mt-2">{{ selectedPlace.description }}</p>
        <p class="mt-2">{{ selectedPlace.location }}</p>
        <p class="mt-2">{{ selectedPlace.locationCoordinates }}</p>



        <div class="mt-4 flex justify-between">
            <button @click="approvePlace(selectedPlace._id)" class="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
            <button @click="rejectPlace(selectedPlace._id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
            <button @click="selectedPlace = null" class="bg-gray-500 text-white px-4 py-2 rounded-md">Close</button>
        </div>
    </div>
</div>

        <!-- Bookings Section -->
        <h2 class="text-white font-semibold mt-8">Bookings</h2>
        <div v-if="bookings.length === 0" class="text-gray-500">No bookings found.</div>
        <div v-for="booking in bookings" :key="booking._id" class="border p-4 rounded-lg shadow-lg my-4 bg-white">
            <h3 class="font-semibold">Tent: {{ booking.tentId?.size || "Unknown Tent" }}  - {{ booking.tentId?.color }}</h3>
            <p>User ID: {{ booking.userId }}</p>
            <p>User Phone: {{ booking.userPhone }}</p>
            <p>From: {{ formatDate(booking.fromDate) }}</p>
            <p>To: {{ formatDate(booking.toDate) }}</p>
            <p>Quantity: {{ booking.quantity }}</p>
            <p class="font-bold" :class="booking.status === 'Pending' ? 'text-yellow-500' : 'text-green-600'">
                Status: {{ booking.status }}
            </p>
        </div>
    </div>
    <AdminContactMessage />
    <EventVerified />
    <AddGlamping />
    <AudioStories class="my-6" />
</template>

<script>
import { computed, onMounted, ref, onUnmounted } from "vue";
import { useStore } from "../store/store";
import axios from "axios";
import { io } from "socket.io-client";
import AddGlamping from "./AddGlamping.vue";
import EventVerified from "./EventVerified.vue";
import AdminContactMessage from "./AdminContactMessage.vue";
import AudioStories from './audioStories/AudioStories.vue';

export default {
    components: {
        AddGlamping,
        EventVerified,
        AdminContactMessage,
        AudioStories,
    },
    setup() {
        const store = useStore();
        const pendingPlaces = computed(() => store.pendingPlaces);
        const showNotification = ref(false);
        const notificationMessage = ref("");
        const bookings = ref([]);
        const selectedPlace = ref(null);

        const fetchPendingPlaces = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-places`, {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                store.setPendingPlaces(response.data.places);
            } catch (error) {
                console.error(error);
            }
        };

        const approvePlace = async (placeId) => {
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/approve-place/${placeId}`, {}, {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                fetchPendingPlaces();
                selectedPlace.value = null;
            } catch (error) {
                console.error(error);
            }
        };

        const rejectPlace = async (placeId) => {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/reject-place/${placeId}`, {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                fetchPendingPlaces();
                selectedPlace.value = null;
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/allbookings`, {
                    headers: { Authorization: `Bearer ${store.token}` },
                });
                bookings.value = response.data.bookings;
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        const formatDate = (dateString) => {
            const options = { year: "numeric", month: "short", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        const socket = io(`${import.meta.env.VITE_API_BASE_URL}`);

        const handleBookingNotification = (data) => {
            notificationMessage.value = `${data.message} (From: ${data.fromDate} To: ${data.toDate})`;
            showNotification.value = true;

            if (Notification.permission === "granted") {
                new Notification("New Booking", { body: data.message, icon: "/logo.png" });
            } else {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        new Notification("New Booking", { body: data.message, icon: "/logo.png" });
                    }
                });
            }

            setTimeout(() => {
                showNotification.value = false;
            }, 9000);
        };

        onMounted(() => {
            fetchPendingPlaces();
            fetchBookings();
            socket.on("bookingNotification", handleBookingNotification);
        });

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
            selectedPlace,
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
