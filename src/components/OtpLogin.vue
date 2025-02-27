<template>
  <div class="relative flex items-end justify-center min-h-screen bg-black bg-cover bg-center"
       style="background-image: url('/lbg.webp');">
    
    <!-- Remove Black Overlay for Full Transparency -->
    
    <!-- Transparent Glassmorphism Login Box -->
    <div class="relative z-10 p-8 rounded-2xl w-full max-w-sm border border-gray-500 shadow-2xl"
         style="backdrop-filter: blur(15px); background: rgba(255, 255, 255, 0.05);">
      
      <h2 class="text-3xl font-bold text-center text-white">Login with OTP</h2>
      <p class="text-gray-300 text-center mt-1">Enter your phone number to receive an OTP</p>

      <!-- Phone Number Input -->
      <div class="mt-6">
        <label class="block text-gray-300 font-medium">Phone Number</label>
        <div class="flex items-center bg-transparent border border-gray-500 rounded-lg overflow-hidden mt-1">
          <span class="px-3 text-gray-400">+91</span>
          <input v-model="phoneNumber" type="text" placeholder="Enter phone number"
                 class="w-full p-3 bg-transparent text-white focus:outline-none placeholder-gray-400" 
                 @input="validatePhoneNumber" />
        </div>
      </div>

      <!-- Send OTP Button -->
      <button @click="sendOTP" :disabled="isSendingOTP || !isPhoneNumberValid"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        {{ isSendingOTP ? 'Sending...' : 'Send OTP' }}
      </button>

      <!-- OTP Input Field -->
      <div v-if="showOTPInput" class="mt-6">
        <label class="block text-gray-300 font-medium">Enter OTP</label>
        <input v-model="otp" type="text" placeholder="Enter OTP"
               class="w-full p-3 bg-transparent text-white border border-gray-500 rounded-lg mt-1 focus:outline-none placeholder-gray-400" />

        <!-- Verify OTP Button -->
        <button @click="verifyOTP" :disabled="isVerifyingOTP"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isVerifyingOTP ? 'Verifying...' : 'Verify OTP' }}
        </button>
      </div>

      <div id="recaptcha-container" class="mt-4"></div>
    </div>
  </div>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../fireconfig/fireBase.js";

export default {
  setup() {
    const phoneNumber = ref("");
    const otp = ref("");
    const showOTPInput = ref(false);
    const isSendingOTP = ref(false);
    const isVerifyingOTP = ref(false);
    let confirmationResult;

    const isPhoneNumberValid = computed(() => {
      return phoneNumber.value.length === 10 && /^\d+$/.test(phoneNumber.value);
    });

    const validatePhoneNumber = (event) => {
      phoneNumber.value = event.target.value.replace(/\D/g, "").slice(0, 10);
    };

    onMounted(() => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA Verified");
          },
        });
      }
    });

    const sendOTP = async () => {
      if (!isPhoneNumberValid.value) return;
      try {
        isSendingOTP.value = true;
        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
        confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber.value}`, verifier);
        showOTPInput.value = true;
      } catch (error) {
        console.error("Error sending OTP:", error);
      } finally {
        isSendingOTP.value = false;
      }
    };

    const verifyOTP = async () => {
      try {
        isVerifyingOTP.value = true;
        const result = await confirmationResult.confirm(otp.value);
        const idToken = await result.user.getIdToken();
        localStorage.setItem("token", idToken);
        window.location.href = "/";
      } catch (error) {
        console.error("Error verifying OTP:", error);
      } finally {
        isVerifyingOTP.value = false;
      }
    };

    return { phoneNumber, otp, showOTPInput, isSendingOTP, isVerifyingOTP, sendOTP, verifyOTP, isPhoneNumberValid, validatePhoneNumber };
  },
};
</script>
