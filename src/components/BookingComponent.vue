<template>
    <div class="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Rent a Tent</h2>
  
      <!-- Select Tent Size (Prefilled & Read-only) -->
      <label class="block font-semibold">Selected Tent Size:</label>
      <select v-model="selectedSize" class="w-full p-2 border rounded">
        <option v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <!-- Select Tent Color -->
      <label class="block font-semibold mt-3">Select Tent Color:</label>
      <select v-model="selectedColor" class="w-full p-2 border rounded">
        <option v-for="color in colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
  
      <!-- Select Quantity -->
      <label class="block font-semibold mt-3">Select Quantity:</label>
      <input
        type="number"
        v-model="quantity"
        min="1"
        class="w-full p-2 border rounded"
      />
  
      <!-- Select Date Range -->
      <label class="block font-semibold mt-3">Booking Dates:</label>
      <input type="date" v-model="fromDate" class="w-full p-2 border rounded" />
      <input
        type="date"
        v-model="toDate"
        class="w-full p-2 border rounded mt-2"
      />
  
      <!-- Availability Status -->
      <p v-if="availability !== null" class="mt-3 text-sm">
        <span v-if="availability" class="text-green-600">Available</span>
        <span v-else class="text-red-600">Not Available for Given Criteria</span>
      </p>
  
      <!-- Book Tent Button -->
      <button
        @click="bookTent"
        :disabled="!availability"
        class="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Book Tent
      </button>
  
      <!-- Booking Status -->
      <div v-if="bookingStatus" class="mt-4 p-3 border rounded bg-gray-100">
        <p><strong>Status:</strong> {{ bookingStatus }}</p>
  
        <!-- Cancel Booking Button -->
        <button
          v-if="bookingStatus === 'Pending' || bookingStatus === 'Confirmed'"
          @click="cancelBooking"
          class="mt-2 bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref, watch } from "vue";
  import debounce from "lodash.debounce"; 
  import { getAuth } from "firebase/auth";
  
  export default {
    setup() {
      const colors = ref(["Red", "Blue", ]);
      const sizes = ref(["Small", "Medium", "Large"]);
      const selectedColor = ref("");
      const fromDate = ref("");
      const selectedSize = ref("");
      const toDate = ref("");
      const quantity = ref(1);
      const availability = ref(null);
      const bookingStatus = ref(null);
      const bookingId = ref(null);
      const tentId = ref(null);
      const auth = getAuth();

      const checkAvailability = debounce(async () => {
        if ( !selectedSize.value || !selectedColor.value || !fromDate.value || !toDate.value) {
          console.info(selectedColor, selectedSize )
          availability.value = null;
          return;
        }
  
        try {
          const response = await axios.get("http://localhost:5000/api/tents/available", {
            params: {
              size: selectedSize.value,
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
        sizes,
        selectedSize,
      };
    },
  };
  </script>
  