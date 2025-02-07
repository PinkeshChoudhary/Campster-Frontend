import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue';
import AdminLogin from '../views/AdminLogin.vue';
import PlaceUpload from '../components/PlaceUpload.vue';  // Import the new component
import PlaceDetails from '../components/PlaceDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
  },
  {
    path: '/login',
    name: 'Login',
    component: AdminLogin,
  },
  {
    path: '/place/:id',
    name: 'place',
    component: PlaceDetails,
  },
  {
    path: '/submit-place',
    name: 'PlaceUpload', // New route for uploading a place
    component: PlaceUpload,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
