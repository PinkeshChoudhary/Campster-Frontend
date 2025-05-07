<template>
<div class="p-4 pb-20">
    <!-- Admin view: Display pending places -->
    <div v-if="isAdmin">
        <AdminDashboard />
        <BlockBlogEditor />
    </div>
    <div v-else>
        <!-- Slideshow remains visible -->
        <SlideShow class="mt-10" />
        <HomeScrollCards />
        <img src="/sakhionlt.png" alt="SakhiAI" class="fixed bottom-20 right-4 z-50 w-32 h-32 cursor-pointer hover:scale-105 transition-transform" @click="goToGenerativeAI" />

        <CityFilter @places-updated="updatePlaces" class="" />

        <!-- <h4 class="text-lg md:text-xl text-yellow-500 pt-5 mb-5 text-center opacity-0 animate-fadeInUp">
            Your Next Adventure Awaits – Explore Local Wonders
        </h4> -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard v-for="place in approvedPlaces" :key="place._id" :place="place" />
        </div>

        <div class="mt-20 px-4">
    <div class="max-w-5xl mx-auto relative rounded-3xl bg-gradient-to-br from-yellow-100 via-white to-yellow-50 shadow-2xl border border-yellow-400 p-4 sm:p-6 md:max-w-3xl">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full shadow-md text-sm font-bold animate-bounce z-10">
            🚀 Start Planning
        </div>
        <div class="flex justify-center">
            <img src="/mapimage.png" alt="Map Your Destinations" @click="goToTripPlanner" class="w-full md:w-[80vw] max-w-3xl md:max-w-2xl h-[40vh] md:h-[30vh] object-cover rounded-2xl border-4 border-yellow-500 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-pulse" />
        </div>
        <p class="mt-4 text-center text-yellow-700 font-medium text-base sm:text-lg">
            Tap the map anytime to explore your perfect journey!
        </p>
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
import PlaceCard from '../components/PlaceCard.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import SlideShow from '../components/Images/SlideShow.vue';
import {
    getAuth
} from "firebase/auth";
import {
    useUserStore
} from "../store/user";
import CityFilter from '../components/CityFilter.vue';
import BingoLobby from '../components/bingo/BingoLobby.vue';
import HomeScrollCards from '../components/HomeScrollCards.vue';
import router from '../RouteFolder/router';
import BlockBlogEditor from '../components/blog/BlockBlogEditor.vue';
import BlogList from '../components/blog/BlogList.vue';
import ButtonAI from '../components/generativeAI/ButtonAI.vue';

export default {
    components: {
        PlaceCard,
        AdminDashboard,
        SlideShow,
        CityFilter,
        HomeScrollCards,
        BlockBlogEditor,
        BlogList,
        ButtonAI,
    },
    setup() {
        const store = useStore();
        const isAdmin = computed(() => store.isAdmin);
        const approvedPlaces = computed(() => store.approvedPlaces);
        const auth = getAuth();
        const userStore = useUserStore();

        const goToTripPlanner = () => {
            router.push('/Tripplanner');
        }

        const goToGenerativeAI = () => {
            router.push('/generativeAI')
        }
        const checkIfAdmin = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/adminfire/dashboard`, {
                    params: {
                        uid: auth.currentUser.uid
                    }
                });
                store.setIsAdmin(response.data.isAdmin);
                // localStorage.setItem("dashboardAPICalled", "true");
            } catch (error) {
                console.error('Error checking admin status', error);
                return false;
            }
        }

        const fetchPlaces = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/places`);
                store.setApprovedPlaces(response.data.places);
            } catch (error) {
                console.error(error);
            }
        };

        const updatePlaces = (newPlaces) => {
            store.setApprovedPlaces(newPlaces);
        };

        // Fetch places on component mount
        onMounted(() => {
            // const dashboardAPICalled = localStorage.getItem("dashboardAPICalled");
            // if (!dashboardAPICalled) {
            // checkIfAdmin() 
            // } 
            checkIfAdmin()
            fetchPlaces();
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    userStore.phone = user.phoneNumber;
                    try {
                        const {
                            data
                        } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${user.uid}`);
                        if (data.success) {
                            userStore.name = data.user.name || "";
                            userStore.email = data.user.email || "";
                            userStore.gender = data.user.gender || "";

                        } else {
                            showPopup.value = true;
                        }
                    } catch (error) {
                        console.error("Error fetching user:", error);
                        showPopup.value = true;
                    }
                }
            });
        });

        return {
            isAdmin,
            approvedPlaces,
            updatePlaces,
            // currentImage,
            goToTripPlanner,
            goToGenerativeAI,
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

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out forwards;
}
</style>
