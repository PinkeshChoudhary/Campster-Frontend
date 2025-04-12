<template>
    <div class=" bg-gray-900 text-white flex flex-col items-center justify-center pt-20  p-6">
      <div class="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 class="text-3xl font-bold mb-6 text-center text-blue-400">🎲 Join a Bingo Game</h1>
  
        <!-- Player Name Input -->
        <label class="block mb-2 text-sm font-medium text-gray-300" for="playerId">Your Name or ID</label>
        <input
          v-model="playerId"
          type="text"
          id="playerId"
          placeholder="Enter your name or ID"
          class="w-full p-3 mb-6 rounded-lg border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
  
  const games = ref([]);
  const playerId = ref("");
  const router = useRouter();
  
  onMounted(async () => {
  });
  
  const joinGame = async () => {
    if (!playerId.value) return alert("Enter your ID first!");
  
   const res =  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/bingo/join`, { playerName: playerId.value });
   console.info("response h ue " , res)
   const gameId = res.data.gameId;
    router.push({ name: "BingoBoard", params: { gameId, playerId: playerId.value } });
  };
  </script>
  