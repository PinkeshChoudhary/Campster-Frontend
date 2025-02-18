<template>
<div class="p-4 pb-20">
        <!-- Non-admin view: Display approved post -->
        <div>
            <h1 class="text-2xl font-semibold mb-4">My Posts</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PlaceCard v-for="place in myPosts" :key="place._id" :place="place" />
            </div>
        </div>
 </div>
    </template>
    
    <script>
    import {
        onMounted,
        ref
    } from 'vue';
    import axios from 'axios';
    import { getAuth } from "firebase/auth";
    import PlaceCard from '../components/PlaceCard.vue';
    
    export default {
        components: {
            PlaceCard,
        },
        setup() {
            const auth = getAuth();
            const myPosts = ref()
            const fetchPlaces = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/places/user/${auth.currentUser.uid}`);
                    myPosts.value = response.data.places
                } catch (error) {
                    console.error(error);
                }
            };
            onMounted(() => {
                fetchPlaces();
            });
    
            return {
                myPosts,
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
    