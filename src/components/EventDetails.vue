<template>
    <div class="w-full min-h-screen flex flex-col items-center px-4 pb-14 pt-14 bg-[#1A1A1A] text-white">
      <button @click="goBack" class="self-start flex items-center text-gray-400 hover:text-yellow-500 transition duration-200 mb-4 mt-4">
        <i class="fas fa-arrow-left text-xl mr-2"></i> Back
      </button>
  
      <div class="w-full max-w-5xl flex-grow">
        <!-- First Image at the Top -->
        <img :src="event?.images?.[0]" alt="Event Image" class="w-full h-96 object-cover rounded-lg">
  
        <div class="mt-6">
          <h2 class="text-2xl text-white font-semibold text-lg">{{ event?.name }}</h2>
  
          <!-- Location & Time -->
          <div class="mt-4 space-y-3 text-gray-300 text-lg">
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt text-white text-xl mr-3"></i>
              <a :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event?.location)}`" target="_blank" class="text-white font-semibold hover:underline">
                {{ event?.location }}
                <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
            <div class="flex items-center">
              <i class="fas fa-calendar-alt text-white text-xl mr-3"></i>
              <span>{{ formatDate(event?.date) }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-clock text-white text-xl mr-3"></i>
              <span>{{ event?.time }}</span>
            </div>
          </div>
  
          <p class="mt-4 text-lg font-semibold" :class="event?.isPaid ? 'text-green-500' : 'text-white'">
            {{ event?.ticketType === "paid" ? `₹${event.price} / Ticket` : "Free Event" }}
          </p>
          <p class="mt-4 text-gray-300 leading-relaxed bg-gray-800 p-4 rounded-lg">{{ event?.description }}</p>

        </div>    
      </div>
  
      <!-- Gallery Section -->
      <div v-if="event?.images?.length > 1" class="mt-10 w-full max-w-5xl">
        <h3 class="text-2xl text-white font-semibold text-lg mb-4">Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <img v-for="(image, index) in event.images.slice(1)" :key="index" :src="image" alt="Event Image" class="w-full h-48 object-cover rounded-lg">
        </div>
      </div>
  
      <!-- Book Now Button -->
      <button @click="bookNow" class="w-full max-w-5xl mt-6 bg-yellow-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-green-600 transition">
        Buy Pass ( {{ event?.ticketType === "paid" ? `₹${event.price} / Ticket` : "Free Event" }})
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  
  const route = useRoute();
  const router = useRouter();
  const event = ref(null);
  const timeLeft = ref(null);
  const updateCountdown = () => {
    const eventDate = new Date(event.value?.date).getTime();
    console.info("date",eventDate )
    setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
    console.info("distance",distance )

      if (distance < 0) {
        timeLeft.value = "Event has started!";
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft.value = `${days}d ${hours}h ${minutes}m`;
    }, 60000);
  };
  
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/${route.params.id}`);
      event.value = response.data;
      updateCountdown();
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  
  const goBack = () => window.history.length > 1 ? router.back() : router.push("/");
  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const bookNow = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/generate-ticket`, {
            eventId: event.value?._id,
            eventName: event.value?.name,
            eventDate: event.value?.createdAt,
            location: event.value?.location,
            userName: "John Doe"
        }, { responseType: "blob" });

        // Create a Blob URL to download the PDF
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ticket-${event.value?.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error generating ticket:", error);
    }
};

  
  onMounted(fetchEventDetails);
  </script>
  
  <style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
  </style>
