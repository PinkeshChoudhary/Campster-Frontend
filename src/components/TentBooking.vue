<template>
  <div class="p-6 mt-20 max-w-lg mx-auto bg-gray-900 shadow-lg rounded-xl mx-10 text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-6 text-center text-green-400">🏕 Rent a Tent</h2>

    <!-- Selected Tent Size (Read-only) -->
    <label class="block font-semibold text-gray-300">Selected Tent Size:</label>
    <input
      type="text"
      v-model="selectedSize"
      class="w-full p-3 border border-gray-600 bg-gray-800 rounded-lg text-gray-400 cursor-not-allowed opacity-75"
      readonly
    />

    <!-- Select Tent Color -->
    <label class="block font-semibold mt-4 text-gray-300">Select Tent Color:</label>
    <select v-model="selectedColor" 
      class="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all">
      <option v-for="color in colors" :key="color" :value="color">
        {{ color }}
      </option>
    </select>

    <!-- Select Quantity (Read-only) -->
    <label class="block font-semibold mt-4 text-gray-300">Select Quantity:</label>
    <input
      type="number"
      v-model="quantity"
      min="1"
      class="w-full p-3 border border-gray-600 bg-gray-800 rounded-lg text-gray-400 cursor-not-allowed opacity-75"
      readonly
    />

    <!-- Select Date Range -->
    <label class="block font-semibold mt-4 text-gray-300">Booking Dates:</label>
    <input type="date" 
      v-model="fromDate" 
      class="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
    
    <input type="date" 
      v-model="toDate" 
      class="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg mt-2 focus:ring-2 focus:ring-blue-500 transition-all" />

    <!-- Availability Status -->
    <p v-if="availability !== null" class="mt-4 text-lg font-semibold">
      <span v-if="availability" class="text-green-400">✔ Available</span>
      <span v-else class="text-red-500">✖ Not Available for Given Criteria</span>
    </p>

    <!-- Book Tent Button -->
    <button
      @click="bookTent"
      :disabled="!availability"
      class="w-full mt-6 bg-green-600 text-white p-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all
      disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      📌 Book Tent
    </button>

    <!-- Booking Status -->
    <div v-if="bookingStatus" class="mt-6 p-4 border border-gray-600 rounded-lg bg-gray-800">
      <p><strong>Status:</strong> {{ bookingStatus }}</p>

      <!-- Cancel Booking Button -->
      <button
        v-if="bookingStatus === 'Pending' || bookingStatus === 'Confirmed'"
        @click="cancelBooking"
        class="mt-3 w-full bg-red-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all"
      >
        ❌ Cancel Booking
      </button>
    </div>
  </div>
</template>

  
  <script>
  import axios from "axios";
  import { ref, watch } from "vue";
  import debounce from "lodash.debounce"; 
  import { getAuth } from "firebase/auth";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const colors = ref(["Red", "Blue", ]);
      const route = useRoute();
      const selectedSize = route.query.size; 
      const selectedColor = ref("");
      const fromDate = ref("");
      const toDate = ref("");
      const quantity = ref(1);
      const availability = ref(null);
      const bookingStatus = ref(null);
      const bookingId = ref(null);
      const tentId = ref(null);
      const auth = getAuth();

      const checkAvailability = debounce(async () => {
        if ( !selectedColor.value || !fromDate.value || !toDate.value) {
          console.info(selectedColor, selectedSize )
          availability.value = null;
          return;
        }
  
        try {
          const response = await axios.get("http://localhost:5000/api/tents/available", {
            params: {
              size: selectedSize,
              color: selectedColor.value,
              fromDate: fromDate.value,
              toDate: toDate.value,
              quantity: quantity.value,
            },
          });
          if (response.data.length > 0 && response.data[0].quantity >= quantity.value) {
    tentId.value = response.data[0]._id;
    availability.value = true;
} else {
    tentId.value = null; // Or any default value you prefer
    availability.value = false;
}
        // availability.value = response.data.length > 0;

        } catch (error) {
          console.error("Error checking availability:", error);
          availability.value = null;
        }
      }, 1000); // Debounce for 1 second
  
      // Watch for changes in form inputs to trigger availability check
      watch([selectedColor, fromDate, toDate ,selectedSize, quantity], checkAvailability);
  
      // Book a Tent
      const bookTent = async () => {
        if (!availability.value) {
          alert("Tent is not available for selected dates!");
          return;
        }
        const user = auth.currentUser;
        console.info("userid",user.uid)
        try {
          const response = await axios.post("http://localhost:5000/api/bookings/rent", {
            userPhone: user.phoneNumber,
            userId: user.uid,
            tentId: tentId.value,  
            fromDate: fromDate.value,
            toDate: toDate.value,
            quantity: quantity.value,
          });
  
          bookingStatus.value = response.data.booking.status; // "Confirmed default"
          bookingId.value = response.data.booking._id;
          availability.value = false;
        } catch (error) {
          console.error("Booking error:", error);
        }
      };
  
      // Cancel Booking
      const cancelBooking = async () => {
        if (!bookingId.value) return;
  
        try {
          await axios.patch(`http://localhost:5000/api/bookings/cancel/${bookingId.value}`);
          bookingStatus.value = "Cancelled";
          availability.value = true;
        } catch (error) {
          console.error("Cancellation error:", error);
        }
      };
  
      return {
        colors,
        selectedColor,
        fromDate,
        toDate,
        quantity,
        availability,
        bookingStatus,
        bookTent,
        cancelBooking,
        selectedSize,
      };
    },
  };
  </script>
  