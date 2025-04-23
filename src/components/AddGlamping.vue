<template>
  <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Add Glamping Site</h2>

    <!-- Name -->
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Name</label>
      <input v-model="name" type="text" placeholder="Enter site name"
        class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
    </div>

    <!-- Location -->
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Location</label>
      <input v-model="location" type="text" placeholder="Enter location"
        class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
    </div>
    <div class="mb-4">
  <label for="type" class="block text-sm font-medium  mb-1">Type of Stay</label>
  <select id="type" v-model="typeOfStay" class="w-full bg-gray-800 text-white p-2 rounded-md">
  <option disabled value="">Select type</option>
  <option>Cafes</option>
  <option>Resort</option>
  <option>Tent & Camps</option>
  <option>Villa</option>
  </select>
</div>


    <!-- Price -->
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Price per Night</label>
      <input v-model="pricePerNight" type="number" placeholder="₹ per night"
        class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500">
    </div>

    <!-- Description -->
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold">Description</label>
      <textarea v-model="description" placeholder="Describe the glamping experience..."
        class="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"></textarea>
    </div>

<!-- Amenities -->
<div class="mb-4">
  <label class="block text-gray-700 font-semibold mb-2">Amenities</label>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
    <label><input type="checkbox" v-model="amenities.wifi" /> WiFi</label>
    <label><input type="checkbox" v-model="amenities.pool" /> Pool</label>
    <label><input type="checkbox" v-model="amenities.bbq" /> BBQ</label>
    <label><input type="checkbox" v-model="amenities.parking" /> Parking</label>
    <label><input type="checkbox" v-model="amenities.hotWater" /> Hot Water</label>
    <label><input type="checkbox" v-model="amenities.privateBathroom" /> Private Bathroom</label>
    <label><input type="checkbox" v-model="amenities.outdoorShower" /> Outdoor Shower</label>
    <label><input type="checkbox" v-model="amenities.airConditioner" /> Air Conditioner</label>
    <label><input type="checkbox" v-model="amenities.heater" /> Heater</label>
    <label><input type="checkbox" v-model="amenities.kitchenAccess" /> Kitchen Access</label>
    <label><input type="checkbox" v-model="amenities.breakfastIncluded" /> Breakfast Included</label>
    <label><input type="checkbox" v-model="amenities.mountainView" /> Mountain View</label>
    <label><input type="checkbox" v-model="amenities.lakeView" /> Lake View</label>
    <label><input type="checkbox" v-model="amenities.hammock" /> Hammock</label>
    <label><input type="checkbox" v-model="amenities.boardGames" /> Board Games</label>
    <label><input type="checkbox" v-model="amenities.bikeRental" /> Bike Rental</label>
    <label><input type="checkbox" v-model="amenities.miniFridge" /> Mini Fridge</label>
    <label><input type="checkbox" v-model="amenities.chargingPorts" /> Charging Ports</label>
    <label><input type="checkbox" v-model="amenities.mosquitoNet" /> Mosquito Net</label>
    <label><input type="checkbox" v-model="amenities.yogaDeck" /> Yoga Deck</label>
    <label><input type="checkbox" v-model="amenities.firePit" /> Fire Pit</label>
    <label><input type="checkbox" v-model="amenities.swing" /> Swing</label>
    <label><input type="checkbox" v-model="amenities.firstAidKit" /> First Aid Kit</label>
    <label><input type="checkbox" v-model="amenities.campfireCooking" /> Campfire Cooking</label>
  </div>
</div>



    <!-- Permissions -->
    <div class="mb-4">
      <label class="block text-gray-700 font-semibold mb-2">Permissions</label>
      <div class="space-y-2">
        <div><input type="checkbox" v-model="permissions.pets" /> Pets Allowed</div>
        <div><input type="checkbox" v-model="permissions.music" /> Loud Music Allowed</div>
        <div><input type="checkbox" v-model="permissions.bonfire" /> Bonfire Allowed</div>
        <div><input type="checkbox" v-model="permissions.open24hrs" /> Open 24 Hours</div>
      </div>
    </div>

    <!-- Image Upload -->
    <div class="mb-6">
      <label class="block text-gray-700 font-semibold">Upload Images</label>
      <input type="file" @change="handleImageUpload" multiple class="w-full p-2 border rounded-md">
      <div v-if="imagePreviews.length" class="flex gap-2 mt-2 flex-wrap">
        <img v-for="(img, index) in imagePreviews" :key="index" :src="img" class="w-16 h-16 rounded-md shadow">
      </div>
    </div>

    <!-- Submit Button -->
    <button @click="addGlampingSite"
      class="bg-yellow-500 text-white font-semibold w-full p-3 rounded-md hover:bg-yellow-600 transition">
      Add Site
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const location = ref("");
const pricePerNight = ref("");
const description = ref("");
const typeOfStay = ref("");
const amenities = ref({
  wifi: false,
  pool: false,
  bbq: false,
  parking: false,
  hotWater: false,
  privateBathroom: false,
  outdoorShower: false,
  airConditioner: false,
  heater: false,
  kitchenAccess: false,
  breakfastIncluded: false,
  mountainView: false,
  lakeView: false,
  hammock: false,
  boardGames: false,
  bikeRental: false,
  miniFridge: false,
  chargingPorts: false,
  mosquitoNet: false,
  yogaDeck: false,
  firePit: false,
  swing: false,
  firstAidKit: false,
  campfireCooking: false,
});


const images = ref([]);
const imagePreviews = ref([]);

const permissions = ref({
  pets: false,
  music: false,
  bonfire: false,
  open24hrs: false,
});

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (!files.length) return;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
    images.value.push(file);
  }
};

const addGlampingSite = async () => {
  if (!name.value || !location.value || !pricePerNight.value || !description.value  || !typeOfStay.value || !images.value.length) {
    alert("Please fill all fields and upload at least one image.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("location", location.value);
  formData.append("pricePerNight", pricePerNight.value);
  formData.append("typeOfStay", typeOfStay.value);
  formData.append("description", description.value);
  formData.append("amenities", JSON.stringify(amenities.value));
  formData.append("permissions", JSON.stringify(permissions.value));
  images.value.forEach((img) => formData.append("images", img));

  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/glamping/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Glamping site added successfully!");
    resetForm();
  } catch (error) {
    console.error("Error adding site", error);
  }
};

const resetForm = () => {
  name.value = "";
  location.value = "";
  pricePerNight.value = "";
  description.value = "";
  typeOfStay.value = "";
  amenities.value = "";
  amenities.value = {
   wifi: false,
  pool: false,
  bbq: false,
  parking: false,
  hotWater: false,
  privateBathroom: false,
  outdoorShower: false,
  airConditioner: false,
  heater: false,
  kitchenAccess: false,
  breakfastIncluded: false,
  mountainView: false,
  lakeView: false,
  hammock: false,
  boardGames: false,
  bikeRental: false,
  miniFridge: false,
  chargingPorts: false,
  mosquitoNet: false,
  yogaDeck: false,
  firePit: false,
  swing: false,
  firstAidKit: false,
  campfireCooking: false,
};
  permissions.value = {
    alcohol: false,
    pets: false,
    music: false,
    bonfire: false,
    open24hrs: false,
  };
  images.value = [];
  imagePreviews.value = [];
};
</script>
