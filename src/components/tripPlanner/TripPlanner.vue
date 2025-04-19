<template>
    <div class="p-6 relative">
      <h2 class="text-2xl text-yellow-500 font-bold text-center pt-20 mb-6">Trip Planner </h2>
  
      <div v-if="loadingLocation" class="text-gray-500 text-center">Getting your location...</div>
  
      <div v-else-if="!snakeTripWithUser.length" class="text-red-500 text-center">
        No places to plan the trip yet!
      </div>
  
      <!-- Snake path (timeline style) -->
      <div v-else class="relative  border-blue-300 ml-6">
        <div
          v-for="(place, index) in snakeTripWithUser"
          :key="index"
          :class="[ 'mb-10 flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse' ]"
        >
          <!-- Place Name & Map Link -->
          <div class="w-1/2 px-4 text-center">
            <p class="text-lg text-yellow-500  mb-1"> {{ place.destination }}</p>
          </div>
  
          <!-- Circle with Image -->
          <div
            class="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg hover:scale-105 transition cursor-pointer"
            @click="openMap(place.locationCoordinates)"
          >
            <img
              :src="place.images?.[0] || userPlaceholder"
              class="w-full h-full object-cover"
              :alt="place.name"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from '../../store/store';
  
  const store = useStore();
  const approvedPlaces = computed(() => store.approvedPlaces);
  
  const userLocation = ref({ lat: null, lng: null });
  const loadingLocation = ref(true);
  
  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocation.value.lat = pos.coords.latitude;
        userLocation.value.lng = pos.coords.longitude;
        loadingLocation.value = false;
      },
      (err) => {
        console.error('Location error:', err);
        loadingLocation.value = false;
      }
    );
  });
  
  // Arrow function for distance calculation
  const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const sortByDistance = (places, userLoc) => {
  return [...places].sort((a, b) => {
    const [latA, lonA] = a.locationCoordinates.split(',').map(Number);
    const [latB, lonB] = b.locationCoordinates.split(',').map(Number);
    
    const distA = getDistance(userLoc.lat, userLoc.lng, latA, lonA);
    const distB = getDistance(userLoc.lat, userLoc.lng, latB, lonB);

    return distA - distB;
  });
};

  // Arrow function for snake sorting
  const snakeSort = (list) => {
    const result = [];
    let left = 0, right = list.length - 1;
    let toggle = true;
    while (left <= right) {
      if (toggle) result.push(list[left++]);
      else result.push(list[right--]);
      toggle = !toggle;
    }
    return result;
  };
  
  // Final trip plan + user's location as starting point
  const snakeTripWithUser = computed(() => {
    if (!approvedPlaces.value.length || !userLocation.value.lat) return [];
    const sorted = sortByDistance(approvedPlaces.value, userLocation.value);
    const snakeSorted = snakeSort(sorted);
    return [
      {
        destination: 'starting point',
        location: userLocation.value,
        images: ['https://img.icons8.com/emoji/96/person-walking-light-skin-tone.png'] // placeholder for user
      },
      ...snakeSorted
    ];
  });
  
  // Arrow function for opening the map
  const openMap = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates}`;
    window.open(url, '_blank');
  };
  
  const userPlaceholder = 'https://img.icons8.com/color/96/marker.png';
  </script>
  
