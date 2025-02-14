import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue';
import AdminLogin from '../views/AdminLogin.vue';
import PlaceUpload from '../components/PlaceUpload.vue';  // Import the new component
import PlaceDetails from '../components/PlaceDetails.vue';
import UserProfile from '../components/UserProfile.vue';
import TentList from '../components/TentList.vue';
import EventComponent from '../components/EventComponent.vue';
import GlampingSites from '../components/GlampingSites.vue';
import BookingComponent from '../components/BookingComponent.vue';
import MyBooking from '../components/MyBooking.vue';



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
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
  },
  {
    path: '/glamping',
    name: 'Glamping',
    component: GlampingSites,
  },
  {
    path: '/events',
    name: 'Events',
    component: EventComponent,
  },
  {
    path: '/tent',
    name: 'Tent',
    component: TentList,
  },
  {
    path: '/tentbooking',
    name: 'Booking',
    component: BookingComponent,
  },
  { path: "/my-bookings",
    name: 'MyBooking',
    component: MyBooking
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
