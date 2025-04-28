<template>
<div class="p-4 pb-20">
    <!-- Admin view: Display pending places -->
     <ButtonAI />
    <div v-if="isAdmin">
        <AdminDashboard />
        <BlockBlogEditor />
    </div>
    <div v-else>
        <!-- Slideshow remains visible -->
        <SlideShow class="mt-10" />
        <HomeScrollCards />
<div
  @click="goToTripPlanner"
  class="w-full overflow-x-auto whitespace-nowrap cursor-pointer rounded bg-gradient-to-r from-yellow-500 to-yellow-700 p-3 shadow hover:brightness-105 transition-all duration-300 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100"
>
  <div class="inline-block text-white text-center font-semibold px-6">
    ➤ Plan Your Trip →
  </div>
</div>

        <CityFilter @places-updated="updatePlaces" class="p-5" />
        <h4 class="text-lg md:text-xl  text-yellow-500 pt-5 mb-5 text-center opacity-0 animate-fadeInUp">
            Your Next Adventure Awaits – Explore Local Wonders
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard v-for="place in approvedPlaces" :key="place._id" :place="place" />
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
