<template>
<div class="p-4 pb-20">
    <!-- Admin view: Display pending places -->
    <div v-if="isAdmin">
        <AdminDashboard />
    </div>

    <!-- Non-admin view: Display approved post -->
    <div v-else>
        <!-- Slideshow remains visible -->
        <SlideShow class="mt-20" />

        <h4 class="text-sm mb-5">Your Next Adventure Awaits – Explore Local Wonders</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard v-for="place in approvedPlaces" :key="place._id" :place="place" />
        </div>
        <router-link to="/tent">
            <div class="fixed bottom-0 right-0 py-20 px-3">
                <button class="bg-gray-500 text-green p-4 mb-13 shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out">
                    <span class="text-xl md:text-2xl">Rent a camp</span>
                </button>

            </div>
        </router-link>
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
import AdminDashboard from '../components/AdminDashboard.vue';
import SlideShow from '../components/Images/SlideShow.vue';
import { getAuth } from "firebase/auth";

export default {
    components: {
        PlaceCard,
        AdminDashboard,
        SlideShow,
    },
    setup() {
        const store = useStore();
        const isAdmin = computed(() => store.isAdmin);
        const approvedPlaces = computed(() => store.approvedPlaces);
        const auth = getAuth();

        const checkIfAdmin = async ()  =>{
            try {
                console.info("userid",auth.currentUser.uid)
                const response = await axios.get(`http://localhost:5000/api/adminfire/dashboard`, {
                              params: { uid: auth.currentUser.uid }
                               });
                store.setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error checking admin status', error);
                return false;
            }
        }

        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places');
                store.setApprovedPlaces(response.data.places);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch places on component mount
        onMounted(() => {
            checkIfAdmin()
            // changeBackgroundImage();
            fetchPlaces();
        });

        return {
            isAdmin,
            approvedPlaces,
            // currentImage,
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
