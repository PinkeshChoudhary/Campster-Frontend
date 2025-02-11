<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-semibold text-center">Login with OTP</h2>
      
      <input v-model="phoneNumber" type="text" placeholder="Enter phone number" class="w-full p-2 border rounded mt-2" />
      <button @click="sendOTP" class="w-full bg-blue-500 text-white py-2 rounded mt-2">Send OTP</button>

      <div v-if="showOTPInput">
        <input v-model="otp" type="text" placeholder="Enter OTP" class="w-full p-2 border rounded mt-2" />
        <button @click="verifyOTP" class="w-full bg-green-500 text-white py-2 rounded mt-2">Verify OTP</button>
      </div>

      <div id="recaptcha-container"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../fireconfig/fireBase.js";

export default {
  setup() {
    const phoneNumber = ref("");
    const otp = ref("");
    const showOTPInput = ref(false);
    let confirmationResult;

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
      try {
        const abc =  new RecaptchaVerifier(auth, "recaptcha-container", {})
        confirmationResult = await signInWithPhoneNumber(auth, phoneNumber.value, abc );
        showOTPInput.value = true;
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    };

    const verifyOTP = async () => {
      try {
        const result = await confirmationResult.confirm(otp.value);
        const idToken = await result.user.getIdToken();
        localStorage.setItem("token", idToken);
        window.location.href = "/";
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    };

    return { phoneNumber, otp, showOTPInput, sendOTP, verifyOTP };
  },
};
</script>
