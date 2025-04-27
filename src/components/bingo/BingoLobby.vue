<template>
    <div class=" bg-gray-900 text-white flex flex-col items-center justify-center pt-20  p-6">
      <div class="bg-black shadow-xl rounded-xl p-8 w-full max-w-md">
        <!-- Join Button -->
        <button
          @click="joinGame"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Join Game
        </button>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  import { getAuth } from "firebase/auth";
  import { useUserStore } from "../store/user";
  
  const games = ref([]);
  const auth = getAuth();
  const userAuth = auth.currentUser;
  const playerId = ref("");
  const router = useRouter();
  const userStore = useUserStore();
  const user = userStore?.name || 'Guest'
  
  onMounted(async () => {
  });
  
  const joinGame = async () => {
    if (!userAuth?.uid) return alert("Please Login First");
  
   const res =  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/bingo/join`, { playerName: userAuth?.uid });
   const gameId = res.data.gameId;
    router.push({ name: "BingoBoard", params: { gameId, playerId: user  } });
  };
  </script>
  