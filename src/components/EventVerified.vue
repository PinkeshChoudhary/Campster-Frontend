<template>
<div>
    <h2 class="text-white font-semibold pt-20">Pending Events</h2>

    <!-- Popup Notification -->
    <div v-if="showNotification" class="fixed top-5 right-5 bg-white shadow-lg p-4 rounded-lg border border-gray-300">
        <p class="font-semibold">{{ notificationMessage }}</p>
        <button @click="showNotification = false" class="bg-red-500 text-white px-3 py-1 rounded mt-2">Close</button>
    </div>

    <!-- Pending Events List -->
    <div v-for="event in pendingEvents" :key="event._id" class="mb-4">
        <div class="flex justify-between items-center">
            <div class="shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white" @click="selectedEvent = event">
                <img :src="event.images[0]" alt="Event image" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold">{{ event.name }}</h3>
                    <div v-if="event.isverified" class=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2  rounded-full text-xs font-bold shadow-lg flex items-center gap-2 premium-shine">
                        <i class="fas fa-circle-check text-white text-sm"></i>
                        <span class="text-white">Campster Verified</span>
                    </div>

                    <p class="text-gray-500">{{ event.date }}</p>
                    <button @click.stop="verifyEvent(event._id)" class="bg-green-500 text-white px-4 py-2 rounded-md">Verify</button>
                    <button @click.stop="deleteEvent(event._id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Event Details Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <img :src="selectedEvent?.images?.[0]" class="w-full h-60 object-cover rounded-lg" />
            <h3 class="text-2xl font-semibold mt-4">{{ selectedEvent?.name }}</h3>
            <p class="mt-2">{{ selectedEvent?.description }}</p>
            <p class="mt-2">Date: {{ selectedEvent?.date }}</p>
            <p class="mt-2">Location: {{ selectedEvent?.location }}</p>

            <div class="mt-4 flex justify-between">
                <button @click="verifyEvent(selectedEvent._id)" class="bg-green-500 text-white px-4 py-2 rounded-md">Verify</button>
                <button @click="deleteEvent(selectedEvent._id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                <button @click="selectedEvent = null" class="bg-gray-500 text-white px-4 py-2 rounded-md">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref,
    onMounted
} from "vue";
import axios from "axios";

export default {
    setup() {
        const pendingEvents = ref([]);
        const selectedEvent = ref(null);
        const showNotification = ref(false);
        const notificationMessage = ref("");

        const fetchPendingEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
                pendingEvents.value = response.data.events;
            } catch (error) {
                console.error(error);
            }
        };

        const verifyEvent = async (eventId) => {
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
                fetchPendingEvents();
                selectedEvent.value = null;
            } catch (error) {
                console.error(error);
            }
        };

        const deleteEvent = async (eventId) => {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
                fetchPendingEvents();
                selectedEvent.value = null;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(fetchPendingEvents);

        return {
            pendingEvents,
            selectedEvent,
            verifyEvent,
            deleteEvent,
            showNotification,
            notificationMessage,
        };
    }
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
/* PREMIUM SHINING EFFECT */
@keyframes shine {
  0% { box-shadow: 0px 0px 5px rgba(255, 223, 0, 0.5); }
  50% { box-shadow: 0px 0px 15px rgba(255, 223, 0, 0.9); }
  100% { box-shadow: 0px 0px 5px rgba(255, 223, 0, 0.5); }
}

.premium-shine {
  animation: shine 2s infinite alternate ease-in-out;
}
</style>
