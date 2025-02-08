<template>
  <div @click="viewDetails" class=" shadow-xl cursor-pointer rounded-2xl overflow-hidden bg-white">
    <img :src="place.images[0]" alt="Place image" class="w-full h-48 object-cover">
    <div class="p-4 ">
      <h3 class="text-xl font-semibold">{{ place.name }}</h3>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['place'],
  setup(props) {
    const router = useRouter();

    const viewDetails = () => {
      router.push(`/place/${props.place._id}`);
    };

    return { 
      viewDetails,

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
