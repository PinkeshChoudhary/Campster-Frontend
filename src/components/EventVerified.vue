<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Event Verification</h1>
        <p class="text-gray-600 text-lg">Review and manage pending event submissions</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending Events</p>
              <p class="text-2xl font-bold text-gray-900">{{ pendingEvents.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Verified Today</p>
              <p class="text-2xl font-bold text-gray-900">{{ verifiedToday }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-full">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Rejected Today</p>
              <p class="text-2xl font-bold text-gray-900">{{ rejectedToday }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Avg Review Time</p>
              <p class="text-2xl font-bold text-gray-900">1.2h</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Search -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search events..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
            </div>
          </div>
          <div class="flex gap-3">
            <select
              v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">By Name</option>
            </select>
            <button
              @click="refreshEvents"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              :disabled="isLoading"
            >
              <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEvents.length === 0 && !isLoading" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
        <p class="text-gray-500">{{ searchQuery ? 'Try adjusting your search criteria' : 'No pending events to review at the moment.' }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-6">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="flex gap-2">
              <div class="h-8 bg-gray-200 rounded w-20"></div>
              <div class="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in filteredEvents"
          :key="event._id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          @click="openEventModal(event)"
        >
          <div class="relative">
            <img 
              :src="event.images?.[0] || '/placeholder-event.jpg'" 
              :alt="event.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <div class="absolute top-3 right-3">
              <span v-if="event.isverified" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Verified
              </span>
              <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                Pending
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ event.name }}</h3>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ formatDate(event.date) }}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ event.location || 'Location not specified' }}
              </div>
            </div>
            
            <div class="flex gap-2">
              <button
                @click.stop="verifyEvent(event._id)"
                class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                :disabled="processingIds.includes(event._id)"
              >
                <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': processingIds.includes(event._id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ processingIds.includes(event._id) ? 'Verifying...' : 'Verify' }}
              </button>
              <button
                @click.stop="deleteEvent(event._id)"
                class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200"
                :disabled="processingIds.includes(event._id)"
              >
                <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': processingIds.includes(event._id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                {{ processingIds.includes(event._id) ? 'Deleting...' : 'Reject' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Details Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="relative">
          <img 
            :src="selectedEvent?.images?.[0] || '/placeholder-event.jpg'" 
            :alt="selectedEvent?.name"
            class="w-full h-64 object-cover"
          >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ selectedEvent?.name }}</h2>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(selectedEvent?.date) }}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ selectedEvent?.location || 'Location not specified' }}
                </div>
              </div>
            </div>
            <span v-if="selectedEvent?.isverified" class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Verified
            </span>
            <span v-else class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              Pending Review
            </span>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p class="text-gray-700 leading-relaxed">{{ selectedEvent?.description || 'No description provided.' }}</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Event Details</h4>
              <div class="space-y-2 text-sm text-gray-600">
                <div><span class="font-medium">Date:</span> {{ formatDate(selectedEvent?.date) }}</div>
                <div><span class="font-medium">Location:</span> {{ selectedEvent?.location || 'Not specified' }}</div>
                <div><span class="font-medium">Status:</span> {{ selectedEvent?.isverified ? 'Verified' : 'Pending' }}</div>
              </div>
            </div>
            <div v-if="selectedEvent?.images && selectedEvent.images.length > 1">
              <h4 class="font-semibold text-gray-900 mb-2">Additional Images</h4>
              <div class="grid grid-cols-2 gap-2">
                <img 
                  v-for="(image, index) in selectedEvent.images.slice(1, 5)" 
                  :key="index"
                  :src="image" 
                  :alt="`Event image ${index + 2}`"
                  class="w-full h-20 object-cover rounded-lg"
                >
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button
              @click="closeModal"
              class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
            <button
              @click="deleteEvent(selectedEvent._id)"
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              :disabled="processingIds.includes(selectedEvent._id)"
            >
              {{ processingIds.includes(selectedEvent._id) ? 'Rejecting...' : 'Reject Event' }}
            </button>
            <button
              @click="verifyEvent(selectedEvent._id)"
              class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              :disabled="processingIds.includes(selectedEvent._id)"
            >
              {{ processingIds.includes(selectedEvent._id) ? 'Verifying...' : 'Verify Event' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div v-if="showNotification" class="fixed top-4 right-4 z-50">
      <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg v-if="notificationType === 'success'" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else-if="notificationType === 'error'" class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ notificationMessage }}</p>
          </div>
          <div class="ml-auto pl-3">
            <button @click="hideNotification" class="text-gray-400 hover:text-gray-600">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const pendingEvents = ref([]);
    const selectedEvent = ref(null);
    const showNotification = ref(false);
    const notificationMessage = ref("");
    const notificationType = ref("info");
    const searchQuery = ref("");
    const sortBy = ref("newest");
    const isLoading = ref(false);
    const processingIds = ref([]);
    const verifiedToday = ref(0);
    const rejectedToday = ref(0);

    const fetchPendingEvents = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
        pendingEvents.value = response.data;
        
        // Mock stats for demo
        verifiedToday.value = Math.floor(Math.random() * 10) + 1;
        rejectedToday.value = Math.floor(Math.random() * 5) + 1;
      } catch (error) {
        console.error(error);
        showNotificationMessage("Error fetching events", "error");
      } finally {
        isLoading.value = false;
      }
    };

    const verifyEvent = async (eventId) => {
      if (processingIds.value.includes(eventId)) return;
      
      processingIds.value.push(eventId);
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
        await fetchPendingEvents();
        selectedEvent.value = null;
        verifiedToday.value++;
        showNotificationMessage("Event verified successfully", "success");
      } catch (error) {
        console.error(error);
        showNotificationMessage("Error verifying event", "error");
      } finally {
        processingIds.value = processingIds.value.filter(id => id !== eventId);
      }
    };

    const deleteEvent = async (eventId) => {
      if (processingIds.value.includes(eventId)) return;
      
      processingIds.value.push(eventId);
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
        await fetchPendingEvents();
        selectedEvent.value = null;
        rejectedToday.value++;
        showNotificationMessage("Event rejected successfully", "success");
      } catch (error) {
        console.error(error);
        showNotificationMessage("Error rejecting event", "error");
      } finally {
        processingIds.value = processingIds.value.filter(id => id !== eventId);
      }
    };

    const refreshEvents = async () => {
      await fetchPendingEvents();
      showNotificationMessage("Events refreshed", "success");
    };

    const openEventModal = (event) => {
      selectedEvent.value = event;
    };

    const closeModal = () => {
      selectedEvent.value = null;
    };

    const showNotificationMessage = (message, type = "info") => {
      notificationMessage.value = message;
      notificationType.value = type;
      showNotification.value = true;
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        hideNotification();
      }, 3000);
    };

    const hideNotification = () => {
      showNotification.value = false;
      notificationMessage.value = "";
      notificationType.value = "info";
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return 'Date not specified';
      const date = new Date(dateStr);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffDays === 2) {
        return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
      } else {
        return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    };

    const filteredEvents = computed(() => {
      let filtered = pendingEvents.value;

      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(event =>
          event.name.toLowerCase().includes(query) ||
          (event.location && event.location.toLowerCase().includes(query)) ||
          (event.description && event.description.toLowerCase().includes(query))
        );
      }

      // Sort events
      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case 'newest':
            return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
          case 'oldest':
            return new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt);
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });

      return filtered;
    });

    onMounted(fetchPendingEvents);

    return {
      pendingEvents,
      selectedEvent,
      verifyEvent,
      deleteEvent,
      showNotification,
      notificationMessage,
      notificationType,
      searchQuery,
      sortBy,
      isLoading,
      processingIds,
      verifiedToday,
      rejectedToday,
      refreshEvents,
      openEventModal,
      closeModal,
      showNotificationMessage,
      hideNotification,
      formatDate,
      filteredEvents,
    };
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Premium shining effect for verified badges */
@keyframes shine {
  0% { box-shadow: 0px 0px 5px rgba(34, 197, 94, 0.5); }
  50% { box-shadow: 0px 0px 15px rgba(34, 197, 94, 0.9); }
  100% { box-shadow: 0px 0px 5px rgba(34, 197, 94, 0.5); }
}

.premium-shine {
  animation: shine 2s infinite alternate ease-in-out;
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Spin animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
