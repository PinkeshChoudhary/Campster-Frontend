<template>
<!-- Back Button -->
<button @click="goBack" class="text-yellow-900 hover:text-yellow-700 transition duration-200 pt-16 p-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
</button>
<div class="flex justify-center items-center p-4 mb-20">
    <div class="w-full max-w-lg p-6 bg-black/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-600">
        <h3 class="text-3xl font-bold text-yellow-900 mb-6 text-center">
            Share Hidden Gem
        </h3>
        <form @submit.prevent="submitplace">
            <!-- Destination Name -->
            <div class="mb-4">
                <input v-model="place.destination" type="text" placeholder="Destination Name?" class="input-field" required />
            </div>
            <div class="mb-4">
                <input v-model="place.location" type="text" placeholder="City " class="input-field" required />
            </div>
           
            <div class="mb-4">
                <input v-model="place.locationCoordinates" type="text" placeholder="Location Coordinates (lat,lng)" class="input-field" required />
                <button @click="getUserLocation"  :disabled="place.locationCoordinates !== ''"  class="text-white bg-yellow-800 px-4 py-2 rounded-md mt-2">
                    📍 Use My Current Location
                </button>
            </div>

            <div class="mb-4">
                <textarea v-model="place.description" placeholder="Description" class="input-field" required></textarea>
            </div>

              <div class="mb-4">
                <input v-model="place.instagramProfile" type="url"
                  placeholder="Instagram Profile Link (https://instagram.com/yourprofile)"
                  class="input-field"
                />
              </div>

              <div class="mb-4">
          <label for="placeType" class="block text-gray-500">Place Type</label>
          <select v-model="place.typeOfPlace" id="placeType" class="input-field">
            <option value="popular">Popular Picks</option>
            <option value="hidden">Hidden Gem</option>
          </select>
        </div>

            <!-- Upload Images -->
            <div class="mb-4">
                <input type="file" @change="handleImageUpload" multiple accept="image/*" class="input-field" />
            </div>

            <!-- Image Preview -->
            <div v-if="imagePreviews.length" class="mb-4 grid grid-cols-3 gap-2">
                <div v-for="(image, index) in imagePreviews" :key="index" class="relative">
                    <img :src="image" class="w-24 h-24 object-cover rounded-lg shadow-md" />
                    <button type="button" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2" @click="removeImage(index)">
                        ✖
                    </button>
                </div>
            </div>
            <!-- Cover Charges Checkbox -->
<div class="mb-4 flex items-center gap-2">
    <input v-model="place.paid" type="checkbox" id="coverCharges" class="w-5 h-5 text-green-600">
    <label for="coverCharges" class="checkbox-field">sponsored</label>
</div>

            <!-- Submit Button (Disabled until form is filled or submitting) -->
            <button type="submit" class="submit-btn" :disabled="!isFormValid || isSubmitting">
                {{ isSubmitting ? "Sharing your place..." : "🚀 Share place" }}
            </button>
        </form>

    </div>
</div>
</template>

<script>
import {
    ref,
    computed
} from "vue";
import axios from "axios";
import {
    getAuth
} from "firebase/auth";
import {
    useRoute,
    useRouter
} from 'vue-router';

export default {
    setup() {
        const auth = getAuth();
        const user = auth.currentUser;
        const route = useRoute();
        const router = useRouter();
        const place = ref({
            destination: "",
            description: "",
            location: "",
            locationCoordinates: "",
            images: [],
            typeOfPlace: "",
            paid: false, // Default to false
            instagramProfile: "",
        });

        const imagePreviews = ref([]);
        const isSubmitting = ref(false);
        // const shareUrl = ref("https://campster.com/share");

        const handleImageUpload = (event) => {
            const files = Array.from(event.target.files);
            files.forEach((file) => {
                if (!file.type.startsWith("image/")) return;
                place.value.images.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreviews.value.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        };

        const removeImage = (index) => {
            place.value.images.splice(index, 1);
            imagePreviews.value.splice(index, 1);
        };

        const isFormValid = computed(() => {
            return Object.values(place.value).every((val) => val !== "" && val !== null);
        });

        const submitplace = async () => {
            if (!isFormValid.value) return;

            isSubmitting.value = true;

            try {
                const formData = new FormData();
                Object.keys(place.value).forEach((key) => {
                    if (key === "images") {
                        place.value.images.forEach((image) => formData.append("images", image));
                    } else {
                        formData.append(key, place.value[key]);
                    }
                });
                formData.append("userId", user.uid);

                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/places/submit`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                });

                place.value = {
                    destination: "",
                    description: "",
                    locationCoordinates: "",
                    location: "",
                    instagramProfile: "",
                    images: []
                };
                imagePreviews.value = [];
                alert("Gem submitted successfully!");
            } catch (error) {
                console.error(error);
                alert("Failed to submit Gem");
            } finally {
                isSubmitting.value = false;
            }
        };
        const goBack = () => {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push('/');
            }
        };

        const getUserLocation = () => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    place.value.locationCoordinates = `${lat},${lng}`;
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not fetch location. Please enter manually.");
                }
            );
        };

        return {
            place,
            imagePreviews,
            handleImageUpload,
            removeImage,
            submitplace,
            isFormValid,
            isSubmitting,
            goBack,
            getUserLocation,
        };
    },
};
</script>

<style scoped>
.input-field {
    width: 100%;
    padding: 12px;
    color: rgb(205, 86, 50);
    background-color: black;
    border: 2px solid #2c2d2d;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s;
}
.checkbox-field {
    width: 100%;
    padding: 12px;
    color: rgb(205, 86, 50);
    background-color: black;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #38b2ac;
}

.submit-btn {
    width: 100%;
    background: linear-gradient(to right, #4caf50, #388e3c);
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-weight: bold;
    transition: transform 0.2s;
}

.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.share-btn {
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: bold;
}
</style>
