<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-20">
        <!-- Header Section -->
        <div class="pt-20 pb-8 px-6">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p class="text-gray-300">Manage places, bookings, and platform content</p>
                </div>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-300 text-sm">Pending Places</p>
                                <p class="text-3xl font-bold text-white">{{ pendingPlaces.length }}</p>
                            </div>
                            <div class="bg-yellow-500/20 p-3 rounded-lg">
                                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-300 text-sm">Total Bookings</p>
                                <p class="text-3xl font-bold text-white">{{ bookings.length }}</p>
                            </div>
                            <div class="bg-blue-500/20 p-3 rounded-lg">
                                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-300 text-sm">Active Status</p>
                                <p class="text-3xl font-bold text-green-400">Online</p>
                            </div>
                            <div class="bg-green-500/20 p-3 rounded-lg">
                                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popup Notification -->
        <div v-if="showNotification" class="fixed top-5 right-5 z-50 bg-white/95 backdrop-blur-lg shadow-2xl p-6 rounded-xl border border-gray-200 max-w-sm">
            <div class="flex items-start space-x-3">
                <div class="bg-blue-500/20 p-2 rounded-lg">
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
                    </svg>
                </div>
                <div class="flex-1">
                    <p class="font-semibold text-gray-900 text-sm">{{ notificationMessage }}</p>
                </div>
            </div>
            <button @click="showNotification = false" class="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Dismiss
            </button>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-6 pb-12">
            <!-- Pending Places Section -->
            <div class="mb-12">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-white">Pending Places</h2>
                    <span class="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                        {{ pendingPlaces.length }} pending
                    </span>
                </div>

                <div v-if="pendingPlaces.length === 0" class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-gray-300 text-lg">No pending places to review</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="place in pendingPlaces" :key="place._id"
                         class="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group"
                         @click="selectedPlace = place">
                        <div class="relative">
                            <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-white mb-2">{{ place.destination }}</h3>
                            <p class="text-gray-300 text-sm mb-4 line-clamp-2">{{ place.description }}</p>
                            <div class="flex space-x-3">
                                <button @click.stop="approvePlace(place._id)"
                                        class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                    Approve
                                </button>
                                <button @click.stop="rejectPlace(place._id)"
                                        class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Place Details Modal -->
            <div v-if="selectedPlace" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <!-- Image Gallery -->
                        <div class="flex overflow-x-auto space-x-4 mb-6 pb-2">
                            <img v-for="(image, index) in selectedPlace.images" :key="index" :src="image"
                                 class="w-32 h-32 object-cover rounded-xl flex-shrink-0 border-2 border-gray-200">
                        </div>
                        
                        <!-- Place Details -->
                        <div class="space-y-4">
                            <h3 class="text-3xl font-bold text-gray-900">{{ selectedPlace.destination }}</h3>
                            <div class="bg-gray-50 p-4 rounded-xl">
                                <p class="text-gray-700 leading-relaxed">{{ selectedPlace.description }}</p>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-blue-50 p-4 rounded-xl">
                                    <h4 class="font-semibold text-blue-900 mb-2">Location</h4>
                                    <p class="text-blue-700">{{ selectedPlace.location }}</p>
                                </div>
                                <div class="bg-purple-50 p-4 rounded-xl">
                                    <h4 class="font-semibold text-purple-900 mb-2">Coordinates</h4>
                                    <p class="text-purple-700 text-sm">{{ selectedPlace.locationCoordinates }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex space-x-4 mt-8">
                            <button @click="approvePlace(selectedPlace._id)"
                                    class="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                                Approve Place
                            </button>
                            <button @click="rejectPlace(selectedPlace._id)"
                                    class="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                                Reject Place
                            </button>
                            <button @click="selectedPlace = null"
                                    class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bookings Section -->
            <div class="mb-12">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-white">Recent Bookings</h2>
                    <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        {{ bookings.length }} total
                    </span>
                </div>

                <div v-if="bookings.length === 0" class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    <p class="text-gray-300 text-lg">No bookings found</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div v-for="booking in bookings" :key="booking._id"
                         class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-white mb-1">
                                    {{ booking.tentId?.size || "Unknown Tent" }} - {{ booking.tentId?.color }}
                                </h3>
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                      :class="booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'">
                                    {{ booking.status }}
                                </span>
                            </div>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p class="text-gray-400">User ID</p>
                                    <p class="text-white font-medium">{{ booking.userId }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400">Phone</p>
                                    <p class="text-white font-medium">{{ booking.userPhone }}</p>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p class="text-gray-400">Check-in</p>
                                    <p class="text-white font-medium">{{ formatDate(booking.fromDate) }}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400">Check-out</p>
                                    <p class="text-white font-medium">{{ formatDate(booking.toDate) }}</p>
                                </div>
                            </div>
                            
                            <div class="text-sm">
                                <p class="text-gray-400">Quantity</p>
                                <p class="text-white font-medium">{{ booking.quantity }} tent(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Additional Components -->
        <div class="max-w-7xl mx-auto px-6 space-y-8">
            <AdminContactMessage />
            <EventVerified />
            <AddGlamping />
        </div>
    </div>
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
/* Text truncation for descriptions */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom scrollbar for image gallery */
.overflow-x-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}

/* Enhanced glass morphism effect */
.backdrop-blur-lg {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

/* Smooth hover animations */
.transition-all {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-transform {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

/* Hover scale effect */
.group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
}

/* Enhanced shadows */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom gradient background */
.bg-gradient-to-br {
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-t {
    background-image: linear-gradient(to top, var(--tw-gradient-stops));
}

/* Status badge pulse animation */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Card hover effects */
.bg-white\/10:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

/* Button hover effects */
button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
    transform: translateY(0);
}

/* Modal backdrop */
.bg-black\/70 {
    background-color: rgba(0, 0, 0, 0.7);
}

/* Enhanced border effects */
.border-white\/20 {
    border-color: rgba(255, 255, 255, 0.2);
}

.border-white\/40 {
    border-color: rgba(255, 255, 255, 0.4);
}

/* Text selection styling */
::selection {
    background-color: rgba(147, 51, 234, 0.3);
    color: white;
}

/* Focus states for accessibility */
button:focus,
button:focus-visible {
    outline: 2px solid rgba(147, 51, 234, 0.5);
    outline-offset: 2px;
}

/* Loading state for images */
img {
    transition: opacity 0.3s ease;
}

img:not([src]) {
    opacity: 0;
}

/* Responsive text sizing */
@media (max-width: 768px) {
    .text-4xl {
        font-size: 2.5rem;
    }
    
    .text-3xl {
        font-size: 1.875rem;
    }
    
    .text-2xl {
        font-size: 1.5rem;
    }
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
}
</style>
