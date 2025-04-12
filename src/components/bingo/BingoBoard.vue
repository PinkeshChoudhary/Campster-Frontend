<template>
    <div
      class="relative w-full h-screen bg-black text-yellow-100 pt-8 pb-18 overflow-hidden"
      ref="container"
      @click="handleOutsideClick"
    >
        <!-- 🔘 Toggle Dashboard Button -->
        <div class="fixed top-0 left-0 w-full bg-gray-900 text-white p-2 z-50 shadow">
      <button @click="showDashboard = !showDashboard" class="w-full text-center font-semibold bg-yellow-500 text-black py-2 rounded">
        {{ showDashboard ? '🔽 Hide Game Dashboard' : '📊 Show Game Dashboard' }}
      </button>
    </div>

    <!-- 🔽 Slide Down Dashboard -->
    <transition name="slide">
      <div v-if="showDashboard" class="absolute top-12 left-0 w-full z-40">
        <BingoDashboard :gameId="gameId" :playerId="playerId" :players="players" />
      </div>
    </transition>
      <div
        v-for="(task, idx) in flatBoard"
        :key="idx"
        class="absolute transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center text-center text-xs shadow-lg"
        :class="ballStyle(task.status, idx)"
        :style="getPositionStyle(idx)"
        @click.stop="handleBallClick(idx)"
      >
        <!-- OPEN TASK CONTENT WHEN SELECTED -->
        <div v-if="selectedIdx === idx" class="w-full h-full overflow-hidden relative rounded-xl">
          
          <!-- ✅ TASK IMAGE FULL COVER -->
          <div
            v-if="task.proofPhoto?.length"
            class="absolute top-0 left-0 w-full h-full z-0"
          >
            <img
              :src="task.proofPhoto[0]"
              class="w-full h-full object-cover"
            />
          </div>
  
          <!-- ✅ TASK TEXT OVERLAY -->
          <div class="absolute top-2 left-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
            {{ task.task }}
          </div>
  
          <!-- 🟡 HINT FOR UNCLAIMED TASKS -->
          <p
            v-if="task.status === 'open' && task.submittedBy !== playerId"
            class="absolute bottom-2 left-2 right-2 text-xs italic text-yellow-100 px-2 z-10 bg-black/60 py-1 rounded"
          >
            👉 Click to complete this task
          </p>
  
          <!-- ✅ VERIFY BUTTON ON PENDING -->
          <div
            v-if="task.status === 'pending' && task.submittedBy !== playerId"
            class="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10"
          >
            <button
              class="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 text-xs rounded shadow"
              @click.stop="verifyTask(idx)"
            >
              ✅ Verify
            </button>
          </div>
        </div>
  
        <!-- 🔼 HIDDEN INPUT FOR UPLOAD -->
        <input
          type="file"
          :ref="el => (inputRefs[idx] = el)"
          @change="uploadDirectly($event, idx)"
          accept="image/*"
          hidden
        />
      </div>
  
      <!-- 🔄 WAITING TEXT -->
      <div class="text-center mt-8 pb-6">
        <span
          v-if="gameStatus !== 'active'"
          class="inline-block px-4 py-2 text-sm rounded bg-yellow-200 text-yellow-900 font-medium shadow"
        >
          ⏳ Waiting for another player to join...
        </span>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, computed, nextTick } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import BingoDashboard from './BingoDashBoard.vue';
  
  const route = useRoute();
  const gameId = route.params.gameId;
  const playerId = route.params.playerId;
  const showDashboard = ref(false);
const players = ref([]);
  
  const board = ref([]);
  const gameStatus = ref("");
  const inputRefs = ref({});
  const positions = ref([]);
  const selectedIdx = ref(null);
  const container = ref(null);
  
  const flatBoard = computed(() => board.value.flat());
  
  const fetchGame = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bingo/${gameId}`);
    board.value = res.data.board;
    gameStatus.value = res.data.status;
    players.value = res.data.players;

  
    await nextTick();
    randomizePositions();
  };
  
  const randomizePositions = () => {
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    const size = 50;
    const topPadding = 80;
  
    positions.value = flatBoard.value.map(() => {
      return {
        x: Math.random() * (width - size),
        y: topPadding + Math.random() * (height - size - topPadding),
      };
    });
  };
  
  const handleBallClick = (idx) => {
  if (selectedIdx.value === idx) {
    if (gameStatus.value !== "active") return;
    inputRefs.value[idx]?.click();
    selectedIdx.value = null;
  } else {
    selectedIdx.value = idx;
  }
};

  
  const handleOutsideClick = () => {
    selectedIdx.value = null;
  };
  
  const uploadDirectly = async (event, idx) => {
  if (gameStatus.value !== "active") return;

  const files = event.target.files;
  if (!files.length) return;

  const row = Math.floor(idx / 5);
  const col = idx % 5;

  const formData = new FormData();
  formData.append("playerId", playerId);
  formData.append("images", files[0]);

  await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/bingo/${gameId}/tasks/${row}/${col}/submit`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  await fetchGame();
};

  
  const verifyTask = async (idx) => {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
  
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/bingo/${gameId}/tasks/${row}/${col}/verify`,
      { verifierId: playerId }
    );
  
    await fetchGame();
  };
  
  const ballStyle = (status, idx) => {
    const isSelected = selectedIdx.value === idx;
  
    const base = isSelected
      ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-64 h-64 p-4"
      : "w-12 h-12 p-2";
  
    const colorMap = {
      open: "bg-yellow-400 text-black",
      pending: "bg-orange-400 text-black",
      approved: "bg-green-400 text-black",
    };
  
    const shapeClass = isSelected ? "rounded-xl" : "rounded-full";
  
    return `${base} ${colorMap[status] || "bg-gray-300"} ${shapeClass}`;
  };
  
  const getPositionStyle = (idx) => {
    if (selectedIdx.value === idx) return {}; // fixed center doesn't need style
    return {
      top: `${positions.value[idx]?.y}px`,
      left: `${positions.value[idx]?.x}px`,
    };
  };
  
  onMounted(fetchGame);
  </script>
  
  <style scoped>
  input[type="file"] {
    display: none;
  }
  .slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  overflow: hidden;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 400px;
}

  </style>
  