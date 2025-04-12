<template>
    <div class="overflow-x-auto py-6 px-4">
      <div class="flex space-x-6 min-w-max">
  
        <!-- Play Games -->
        <router-link to="/bingolobby" class="min-w-[300px] max-w-xs transform hover:scale-[1.03] transition duration-300">
          <div class="p-6 bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-2xl shadow-xl flex flex-col items-start justify-between h-full">
            <div class="mb-2">
              <div class="text-3xl mb-3">
                🎮
              </div>
              <h3 class="text-xl font-bold">Play Games</h3>
              <p class="text-sm opacity-90 mt-1">Have fun with fellow campsters in exciting games!</p>
            </div>
          </div>
        </router-link>
  
        <!-- Community Chat -->
        <router-link to="/ChatGround" class="min-w-[300px] max-w-xs transform hover:scale-[1.03] transition duration-300">
          <div class="p-6 bg-gradient-to-br from-yellow-400 to-blue-500 text-white rounded-2xl shadow-xl flex flex-col items-start justify-between h-full">
            <div class="mb-2">
              <div class="text-3xl mb-3">
                💬
              </div>
              <h3 class="text-xl font-bold">Join the Community Chat</h3>
              <p class="text-sm opacity-90 mt-1">Ask questions, share stories & meet fellow travelers.</p>
            </div>
          </div>
        </router-link>
  
        <!-- Rent a Tent -->
        <router-link to="/tent" class="min-w-[300px] max-w-xs transform hover:scale-[1.03] transition duration-300">
          <div class="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col items-start justify-between h-full">
            <div class="text-3xl mb-3">
              ⛺
            </div>
            <h3 class="text-xl font-bold">Rent a Tent</h3>
            <p class="text-sm opacity-90 mt-1">Book a comfy tent for your next adventure.</p>
          </div>
        </router-link>
  
      </div>
    </div>
  </template>
  
  
  <script setup>
  import BingoLobby from './bingo/BingoLobby.vue'
  </script>
  