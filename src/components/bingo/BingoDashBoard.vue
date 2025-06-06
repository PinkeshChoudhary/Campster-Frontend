<template>
  <div class="bg-gray-900 text-white p-4 rounded-b-lg shadow-xl">
    <h2 class="text-xl font-bold mb-4">🎮 Game Info</h2>

    <!-- Scoreboard with Hidden Identities -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Scoreboard</h3>
      <ul class="space-y-1">
        <li
          v-for="(player, index) in players"
          :key="index"
        >
          🧑‍🎭 <span class="font-medium text-blue-400">Player {{ index === 0 ? 'A' : 'B' }}</span>
        </li>
      </ul>
    </div>

    <!-- Anonymous Chat -->
    <div>
      <h3 class="text-lg font-semibold mb-2">💬 Anonymous Chat</h3>
      <div class="h-32 overflow-y-auto bg-gray-800 p-3 rounded-lg mb-2 space-y-1 text-sm">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
        >
          <span class="text-yellow-400 font-semibold">
            {{ msg.sender === players[0].name ? 'Player A' : 'Player B' }}:
          </span> {{ msg.message }}
        </div>
      </div>
      <div class="flex gap-2">
        <input
          v-model="newMessage"
          @keydown.enter="sendMessage"
          class="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Send an anonymous message..."
        />
        <button
          @click="sendMessage"
          class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    gameId: String,
    playerId: String,
    players: Array
  });
  
  const messages = ref([]);
  const newMessage = ref('');
  
  // Fetch chat history on load
  onMounted(() => {
    if (props.gameId) {
      fetchMessages();
    }
  });
  
  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bingo/${props.gameId}/chat`);
      const data = await res.json();
      messages.value = data;
    } catch (err) {
      console.error('Failed to fetch chat messages:', err);
    }
  };
  
  // Send a message and refetch
  const sendMessage = async () => {
    if (!newMessage.value.trim()) return;
  
    const payload = {
      sender: props.playerId,
      message: newMessage.value
    };
  
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bingo/${props.gameId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      newMessage.value = '';
      await fetchMessages(); // 🔁 Fetch new messages after sending
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };
  </script>
  