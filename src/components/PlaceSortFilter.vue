<template>
  <div class="place-sort-filter relative" ref="sortRef">
    <!-- Sort Trigger Button -->
    <button
      @click="toggleSortDropdown"
      class="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 min-w-[200px]"
    >
      <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
      <span class="flex-1 text-left">
        {{ currentSortLabel }}
      </span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isSortOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Sort Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isSortOpen"
        class="absolute top-full left-0 mt-2 w-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl z-50 overflow-hidden"
      >
        <!-- Sort Options -->
        <button
          v-for="option in sortOptions"
          :key="option.value"
          @click="selectSort(option)"
          class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors"
          :class="currentSort === option.value ? 'bg-yellow-400/20 text-yellow-400' : 'text-white'"
        >
          <!-- Default Icon -->
          <svg v-if="option.value === 'default'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          
          <!-- Likes Icon -->
          <svg v-else-if="option.value === 'likes'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
          
          <!-- Distance Icon -->
          <svg v-else-if="option.value === 'distance'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          
          <!-- Alphabetical Icon -->
          <svg v-else-if="option.value === 'alphabetical'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          
          <span class="font-medium">{{ option.label }}</span>
          <svg
            v-if="currentSort === option.value"
            class="w-4 h-4 ml-auto text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['sort-changed']);

const currentSort = ref('default');
const isSortOpen = ref(false);
const sortRef = ref(null);

// Sort options with icons
const sortOptions = ref([
  {
    value: 'default',
    label: 'Default Order'
  },
  {
    value: 'likes',
    label: 'Most Liked'
  },
  {
    value: 'distance',
    label: 'Nearest First'
  },
  {
    value: 'alphabetical',
    label: 'A to Z'
  }
]);

const currentSortLabel = computed(() => {
  const option = sortOptions.value.find(opt => opt.value === currentSort.value);
  return option ? option.label : 'Sort By';
});

const toggleSortDropdown = () => {
  isSortOpen.value = !isSortOpen.value;
};

const closeSortDropdown = () => {
  isSortOpen.value = false;
};

const selectSort = (option) => {
  currentSort.value = option.value;
  closeSortDropdown();
  emit('sort-changed', option.value);
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (sortRef.value && !sortRef.value.contains(event.target)) {
    closeSortDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.place-sort-filter {
  position: relative;
}

/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

/* Hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Dropdown animation */
.transition {
  transform-origin: top;
}
</style>