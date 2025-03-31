<template>
<!-- Back Button -->
<button @click="goBack" class="text-yellow-500 hover:text-yellow-400 transition duration-200 pt-10 p-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
</button>

<!-- Form Container -->
<div class="flex justify-center items-center p-4 mb-20 pt-20">
    <div class="w-full max-w-lg p-8 bg-black/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700">

        <h3 class="text-3xl font-semibold text-yellow-400 mb-6 text-center">
            🎟️ List Your Event
        </h3>

        <form @submit.prevent="submitEvent" class="space-y-4">
            <!-- Event Name -->
            <input v-model="event.name" type="text" placeholder="Event Name" class="input-field" required />

            <!-- Location -->
            <input v-model="event.location" type="text" placeholder="Event Location" class="input-field" required />

            <!-- Date -->
            <div>
                <label for="event-date" class="block text-gray-300 mb-1">📅 Event Date</label>
                <input id="event-date" v-model="event.date" type="date" class="input-field" required />
            </div>

            <!-- Time -->
            <div>
                <label for="event-time" class="block text-gray-300 mb-1">⏰ Event Time</label>
                <input id="event-time" v-model="event.time" type="time" class="input-field" required />
            </div>

            <!-- Description -->
            <textarea v-model="event.description" placeholder="Event Description" class="input-field h-24 resize-none" required></textarea>

            <!-- Ticket Type -->
            <select v-model="event.ticketType" class="input-field" required>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
            </select>

            <!-- Ticket Price (if paid) -->
            <input v-if="event.ticketType === 'paid'" v-model="event.price" type="number" placeholder="Ticket Price" class="input-field" required />
            <select v-model="event.category" class="input-field" required>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Festival">Festival</option>
                <option value="Other">Other</option>
            </select>
            <input  v-model="event.totalTickets" type="number" placeholder="Total Tickets " class="input-field" required />
            <input  v-model="event.availableTickets" type="number" placeholder="Available Tickets" class="input-field" required />
            <!-- Upload Images -->
            <div class="p-3 border border-dashed border-gray-400 rounded-lg hover:border-yellow-400 transition">
                <input type="file" @change="handleImageUpload" multiple accept="image/*" class="w-full text-sm text-gray-300" />
            </div>

            <!-- Image Preview -->
            <div v-if="imagePreviews.length" class="grid grid-cols-3 gap-2">
                <div v-for="(image, index) in imagePreviews" :key="index" class="relative">
                    <img :src="image" class="w-24 h-24 object-cover rounded-lg shadow-md" />
                    <button type="button" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2" @click="removeImage(index)">
                        ✖
                    </button>
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg shadow-md transition duration-200 w-full" :disabled="!isFormValid || isSubmitting">
                {{ isSubmitting ? "Submitting..." : "🚀 Submit Event" }}
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
    useRouter
} from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const event = ref({
            name: "",
            location: "",
            date: "",
            time: "",
            description: "",
            ticketType: "free",
            category: "Music",
            price: "",
            totalTickets: "",
            availableTickets: "",
            images: []
        });
        const imagePreviews = ref([]);
        const isSubmitting = ref(false);

        const handleImageUpload = (e) => {
            const files = Array.from(e.target.files);
            files.forEach((file) => {
                if (!file.type.startsWith("image/")) return;

                // Push the file to the event object for form submission
                event.value.images.push(file);

                // Create image preview
                const reader = new FileReader();
                reader.onload = (event) => {
                    imagePreviews.value.push(event.target.result);
                };
                reader.readAsDataURL(file);
            });
        };

        const removeImage = (index) => {
            event.value.images.splice(index, 1);
            imagePreviews.value.splice(index, 1);
        };

        const isFormValid = computed(() => {
            return event.value.name && event.value.location && event.value.date && event.value.totalTickets && event.value.availableTickets && event.value.time && event.value.description;
        });

        const submitEvent = async () => {
            if (!isFormValid.value) return;
            isSubmitting.value = true;
            try {
                const formData = new FormData();
                Object.keys(event.value).forEach((key) => {
                    if (key === "images") {
                        event.value.images.forEach((image) => formData.append("images", image));
                    } else {
                        formData.append(key, event.value[key]);
                    }
                });
                console.info("form data", formData )
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/events/submit`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                event.value = {
                    name: "",
                    location: "",
                    date: "",
                    time: "",
                    description: "",
                    ticketType: "free",
                    category: "Music",
                    totalTickets: "",
                    availableTickets: "",
                    price: "",
                    images: []
                };
                imagePreviews.value = [];
                alert("Event submitted successfully!");
            } catch (error) {
                console.error(error);
                alert("Failed to submit event");
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

        return {
            event,
            imagePreviews,
            handleImageUpload,
            removeImage,
            submitEvent,
            isFormValid,
            isSubmitting,
            goBack
        };
    }
};
</script>

<style scoped>
.input-field {
    width: 100%;
    padding: 12px;
    color: whitesmoke;
    background-color: black;
    border: 2px solid #2c2d2d;
    border-radius: 10px;
    outline: none;
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
</style>
