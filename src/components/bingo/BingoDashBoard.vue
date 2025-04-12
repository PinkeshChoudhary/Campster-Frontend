<template>
    <div class="bg-gray-900 text-white p-4 rounded-b-lg shadow-xl">
      <h2 class="text-xl font-bold mb-4">🎮 Game Info</h2>
  
      <!-- Scoreboard -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Scoreboard</h3>
        <ul>
          <li
            v-for="player in players"
            :key="player.name"
            class="mb-1"
          >
            {{ player.name }} - {{ player.score || 0 }} pts
          </li>
        </ul>
      </div>
  
      <!-- Chat -->
      <div>
        <h3 class="text-lg font-semibold mb-2">Chat</h3>
        <div class="h-32 overflow-y-auto bg-gray-800 p-2 rounded mb-2">
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
          >
            <strong>{{ msg.sender }}:</strong> {{ msg.message }}
          </div>
        </div>
        <div class="flex gap-2">
          <input
            v-model="newMessage"
            @keydown.enter="sendMessage"
            class="w-full p-2 rounded bg-gray-700"
            placeholder="Type message..."
          />
          <button
            @click="sendMessage"
            class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
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
  