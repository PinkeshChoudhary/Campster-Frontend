<template>
  <div class="overflow-x-auto py-6 px-4 bg-black scrollbar-none" style="-ms-overflow-style: none; scrollbar-width: none;">
    <div class="flex space-x-3 min-w-max">
      
      <!-- Rent a Tent -->
      <router-link to="/tent" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
        <div class="p-3 bg-gradient-to-tl from-purple-700/30 to-indigo-700/30 border border-indigo-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all h-full">
          <div class="text-xl mb-1">⛺</div>
          <h3 class="text-base font-semibold mb-1">Rent a Tent</h3>
          <p class="text-xs opacity-80">Book a comfy tent for your next adventure.</p>
        </div>
      </router-link>

      <!-- Community Chat -->
      <router-link to="/ChatGround" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
        <div class="p-3 bg-gradient-to-br from-yellow-600/20 to-blue-600/20 border border-yellow-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-yellow-400 transition-all h-full">
          <div class="text-xl mb-1">💬</div>
          <h3 class="text-base font-semibold mb-1">Community Chat</h3>
          <p class="text-xs opacity-80">Chat, ask questions & meet travelers.</p>
        </div>
      </router-link>

      <!-- Play Games -->
      <router-link to="/bingolobby" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
        <div class="p-3 bg-gradient-to-tr from-blue-700/30 to-pink-600/30 border border-blue-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-400 transition-all h-full">
          <div class="text-xl mb-1">🎮</div>
          <h3 class="text-base font-semibold mb-1">Play Games</h3>
          <p class="text-xs opacity-80">Have fun with fellow Campsters!</p>
        </div>
      </router-link>

    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Webkit-based browsers */
::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
import BingoLobby from './bingo/BingoLobby.vue'
</script>
