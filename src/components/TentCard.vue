<template>
    <div @click="viewTentDetails" class=" shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white">
      <img :src="tent.images[0]" alt="Tent image" class="w-full h-48 object-cover">
      <div class="p-4 ">
        <h3 class="text-xl font-semibold">{{ tent.name }}</h3>
      </div>
  
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    props: ['tent'],
    setup(props) {
      const router = useRouter();
  
      const viewTentDetails = () => {
        router.push(`/tent/${props.tent._id}`);
      };
  
      return { 
        viewTentDetails,
  
      };
    },
  };
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.2s ease-in-out;
  }
  .card:hover {
    transform: scale(1.02);
  }
  </style>
  