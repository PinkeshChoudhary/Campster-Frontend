<template>
<div class="relative w-full h-screen">
    <!-- Background Image Slideshow -->
    <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" :style="{ backgroundImage: `url(${currentImage})`, opacity: fadeOpacity }"></div>

    <!-- Overlay for readability -->
    <!-- <div class="absolute inset-0 bg-black bg-opacity-40"></div> -->
</div>
<div class="p-4">
    <!-- Admin view: Display pending places -->
    <div v-if="isAdmin">
        <h2 class="text-xl font-semibold">Pending Places</h2>
        <div v-for="place in pendingPlaces" :key="place._id" class="mb-4">
            <div class="flex justify-between items-center">
                <div class=" shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white">
                    <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-cover">
                    <div class="p-4 ">
                        <h3 class="text-xl font-semibold">{{ place.name }}</h3>
                        <button @click="approvePlace(place._id)" class="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
                        <button @click="rejectPlace(place._id)" class="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Non-admin view: Display approved places -->
    <div v-else>
        <h4 class="text-sm mb-5">Your Next Adventure Awaits – Explore Local Wonders</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard v-for="place in approvedPlaces" :key="place._id" :place="place" />
        </div>
        <div class="fixed bottom-0 right-0 p-9">
      <button
        class="bg-gray-500 text-green p-4 mb-13 shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        <span class="text-xl md:text-2xl">Rent a camp</span>
      </button>
  </div>
    </div>
</div>
</template>

<script>
import {
    computed,
    onMounted,
    ref
} from 'vue';
import {
    useStore
} from '../store/store';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard.vue';
import PlaceUpload from '../components/PlaceUpload.vue';

export default {
    components: {
        PlaceCard,
        PlaceUpload,
    },
    setup() {
        const store = useStore();
        const isAdmin = computed(() => store.isAdmin);
        const approvedPlaces = computed(() => store.approvedPlaces);
        const pendingPlaces = computed(() => store.pendingPlaces);

        const backgroundImages = [
            '../../public/homeimage.avif',
            '../../public/couplecamp.avif',
            '../../public/friendscam.avif',
            '../../public/mancamping.avif'
        ];
        const currentImage = ref(backgroundImages[0]); // Start with the first image
        const fadeOpacity = ref(1);
        let imageIndex = 0;

        // Function to cycle through images every 3 seconds
        const changeBackgroundImage = () => {
            setInterval(() => {
                fadeOpacity.value = 0; // Fade out effect
                setTimeout(() => {
                    imageIndex = (imageIndex + 1) % backgroundImages.length;
                    currentImage.value = backgroundImages[imageIndex]; // Change image
                    fadeOpacity.value = 1; // Fade in effect
                }, 500);
            }, 3000);
        };
        // Fetch approved places
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places');
                store.setApprovedPlaces(response.data.places);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch pending places for admins
        const fetchPendingPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/pending-places', {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                });
                store.setPendingPlaces(response.data.places);
            } catch (error) {
                console.error(error);
            }
        };

        // Approve a place (admin)
        const approvePlace = async (placeId) => {
            try {
                await axios.post(`http://localhost:5000/api/admin/approve-place/${placeId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                });
                fetchPendingPlaces(); // Refresh the pending places
            } catch (error) {
                console.error(error);
            }
        };

        // Reject (delete) a place (admin)
        const rejectPlace = async (placeId) => {
            try {
                await axios.delete(`http://localhost:5000/api/admin/reject-place/${placeId}`, {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                });
                fetchPendingPlaces(); // Refresh the pending places
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch places on component mount
        onMounted(() => {
            changeBackgroundImage(); // Start the slideshow
            if (isAdmin.value) {
                fetchPendingPlaces();
            } else {
                fetchPlaces();
            }
        });

        return {
            isAdmin,
            approvedPlaces,
            pendingPlaces,
            approvePlace,
            rejectPlace,
            currentImage,
            fadeOpacity,
        };
    },
};
</script>

<style scoped>
.fixed {
    position: fixed;
}

.transform {
    transform: translateX(-50%);
}

.z-10 {
    z-index: 10;
}

.bg-gray-800 {
    background-color: rgba(0, 0, 0, 0.5);
}

.card {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
