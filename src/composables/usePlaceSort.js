import { ref, computed } from 'vue';

export function usePlaceSort() {
  const userLocation = ref(null);
  const sortType = ref('default');

  // Get user's current location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(userLocation.value);
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Parse location coordinates from string format
  const parseCoordinates = (locationCoordinates) => {
    if (!locationCoordinates) return null;
    
    if (typeof locationCoordinates === 'object' && locationCoordinates.lat && locationCoordinates.lng) {
      return {
        lat: parseFloat(locationCoordinates.lat),
        lng: parseFloat(locationCoordinates.lng)
      };
    }
    
    if (typeof locationCoordinates === 'string') {
      const [latStr, lngStr] = locationCoordinates.split(',');
      const lat = parseFloat(latStr?.trim());
      const lng = parseFloat(lngStr?.trim());
      
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    
    return null;
  };

  // Sort places based on the selected sort type
  const sortPlaces = (places, sortBy = 'default') => {
    if (!places || places.length === 0) return [];

    const sortedPlaces = [...places];

    switch (sortBy) {
      case 'likes':
        return sortedPlaces.sort((a, b) => {
          const likesA = a.likedBy ? a.likedBy.length : 0;
          const likesB = b.likedBy ? b.likedBy.length : 0;
          return likesB - likesA; // Descending order (most liked first)
        });

      case 'distance':
        if (!userLocation.value) {
          console.warn('User location not available for distance sorting');
          return sortedPlaces;
        }

        return sortedPlaces.sort((a, b) => {
          const coordsA = parseCoordinates(a.locationCoordinates);
          const coordsB = parseCoordinates(b.locationCoordinates);

          // Places without coordinates go to the end
          if (!coordsA && !coordsB) return 0;
          if (!coordsA) return 1;
          if (!coordsB) return -1;

          const distanceA = calculateDistance(
            userLocation.value.lat,
            userLocation.value.lng,
            coordsA.lat,
            coordsA.lng
          );

          const distanceB = calculateDistance(
            userLocation.value.lat,
            userLocation.value.lng,
            coordsB.lat,
            coordsB.lng
          );

          return distanceA - distanceB; // Ascending order (nearest first)
        });

      case 'alphabetical':
        return sortedPlaces.sort((a, b) => {
          const nameA = (a.destination || '').toLowerCase();
          const nameB = (b.destination || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });

      case 'default':
      default:
        return sortedPlaces; // Return original order
    }
  };

  // Enhanced sorting with distance calculation for display
  const sortPlacesWithDistance = (places, sortBy = 'default') => {
    if (!places || places.length === 0) return [];

    const placesWithDistance = places.map(place => {
      const coords = parseCoordinates(place.locationCoordinates);
      let distance = null;

      if (coords && userLocation.value) {
        distance = calculateDistance(
          userLocation.value.lat,
          userLocation.value.lng,
          coords.lat,
          coords.lng
        );
      }

      return {
        ...place,
        calculatedDistance: distance
      };
    });

    return sortPlaces(placesWithDistance, sortBy);
  };

  // Set sort type
  const setSortType = (type) => {
    sortType.value = type;
  };

  // Initialize user location on first use
  const initializeLocation = async () => {
    try {
      await getUserLocation();
      return true;
    } catch (error) {
      console.error('Failed to get user location:', error);
      return false;
    }
  };

  return {
    userLocation: computed(() => userLocation.value),
    sortType: computed(() => sortType.value),
    getUserLocation,
    calculateDistance,
    parseCoordinates,
    sortPlaces,
    sortPlacesWithDistance,
    setSortType,
    initializeLocation
  };
}