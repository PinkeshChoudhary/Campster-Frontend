<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center px-4">
    <div class="bg-black/60 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-6 border border-gray-700">

      <!-- Instructions -->
      <div class="space-y-5">
        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            📝 <span>Lobby Instructions</span>
          </h2>
          <p class="mt-2 text-sm text-gray-300 leading-relaxed">
            🧑‍🤝‍🧑 <span class="font-medium text-white">Only two players</span> can join a single lobby.
          </p>
          <p class="text-sm text-gray-300">
            ⏳ Once both players join, the game <span class="text-white font-medium">starts automatically</span>.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-white flex items-center gap-2 mt-4">
             <span>Task Status Guide</span>
          </h2>
          <ul class="mt-2 space-y-2 text-sm">
            <li><span class="text-yellow-400 font-medium">🟡 Open</span>: Task is up for grabs by any player.</li>
            <li><span class="text-orange-400 font-medium">🟠 Pending</span>: Submitted and waiting for verification.</li>
            <li><span class="text-green-400 font-medium"> Approved</span>: Task has been reviewed and accepted.</li>
          </ul>
        </div>
      </div>

      <!-- Join Button -->
      <button
        @click="joinGame"
        class="w-full bg-yellow-500 text-black hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
         Join Lobby
      </button>

    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  import { getAuth } from "firebase/auth";
  import { useUserStore } from "../../store/user";
  
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
   console.info('user nme', user)
    router.push({ name: "BingoBoard", params: { gameId, playerId: user  } });
  };
  </script>
  