<template>
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

export default {
    components: {

    },
    setup() {
        const store = useStore();
        const pendingPlaces = computed(() => store.pendingPlaces);

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
                fetchPendingPlaces();
        });

        return {
            pendingPlaces,
            approvePlace,
            rejectPlace,
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
