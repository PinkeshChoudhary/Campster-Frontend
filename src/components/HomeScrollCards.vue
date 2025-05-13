<template>
<div class="overflow-x-auto py-6 px-4 bg-black scrollbar-none" style="-ms-overflow-style: none; scrollbar-width: none;">
    <div class="flex space-x-3 min-w-max">

        <!-- Rent a Tent -->
        <router-link to="/tent" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
            <div class="p-3 bg-gradient-to-tr from-blue-700/30 to-pink-600/30 border border-blue-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-400 transition-all h-full">
                <div class="text-xl mb-1">⛺</div>
                <h3 class="text-base font-semibold mb-1">Rent a Tent</h3>
                <p class="text-xs opacity-80">Book a comfy tent for your next adventure.</p>
            </div>
        </router-link>

        <!-- Play Games -->
        <router-link to="/bingolobby" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
            <div class="p-3 bg-gradient-to-tr from-blue-700/30 to-pink-600/30 border border-blue-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-400 transition-all h-full">
                <div class="text-xl mb-1">🏆</div>
                <h3 class="text-base font-semibold mb-1">Join Challenges</h3>
                <p class="text-xs opacity-80">Compete with fellow Campsters — winner takes the prize!</p>
            </div>
        </router-link>
<!-- Sakhi AI -->
<router-link to="/generativeAI" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
    <div class="p-3 bg-gradient-to-tr from-blue-700/30 to-pink-600/30 border border-blue-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-400 transition-all h-full">
        <div class="mb-1">
            <img src="/sakhionlt.png" alt="Sakhi AI" class="w-10 h-10 object-contain" />
        </div>
        <h3 class="text-base font-semibold mb-1">Sakhi AI</h3>
        <p class="text-xs opacity-80">Your smart camp assistant for quick help & tips.</p>
    </div>
</router-link>

         <!-- Community Chat -->
        <router-link to="/ChatGround" class="min-w-[180px] max-w-[200px] transition-transform hover:scale-105">
            <div class="p-3 bg-gradient-to-tr from-blue-700/30 to-pink-600/30 border border-blue-500/30 backdrop-blur-md text-white rounded-xl shadow-lg hover:ring-2 hover:ring-blue-400 transition-all h-full">
                <div class="text-xl mb-1">💬</div>
                <h3 class="text-base font-semibold mb-1">Community Chat</h3>
                <p class="text-xs opacity-80">Chat, ask questions & meet travelers.</p>
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

<script>
import BingoLobby from './bingo/BingoLobby.vue'
</script>
