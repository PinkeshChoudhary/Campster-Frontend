<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-200 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login with OTP</h2>
      <p class="text-gray-500 text-center mt-1">Enter your phone number to receive an OTP</p>
      
      <div class="mt-6">
        <label class="block text-gray-700 font-medium">Phone Number</label>
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-1">
          <span class="px-3 text-gray-600">+91</span>
          <input v-model="phoneNumber" type="text" placeholder="Enter phone number" 
                 class="w-full p-3 focus:outline-none" @input="validatePhoneNumber" />
        </div>
      </div>
      
      <button @click="sendOTP" :disabled="isSendingOTP || !isPhoneNumberValid"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-4 transition duration-300 disabled:opacity-50">
        {{ isSendingOTP ? 'Sending...' : 'Send OTP' }}
      </button>
      
      <div v-if="showOTPInput" class="mt-4">
        <label class="block text-gray-700 font-medium">Enter OTP</label>
        <input v-model="otp" type="text" placeholder="Enter OTP" 
               class="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none" />
        
        <button @click="verifyOTP" :disabled="isVerifyingOTP"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg mt-4 transition duration-300 disabled:opacity-50">
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
