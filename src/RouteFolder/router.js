import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue';
import PlaceUpload from '../components/PlaceUpload.vue'; 
import PlaceDetails from '../components/PlaceDetails.vue';
import UserProfile from '../components/UserProfile.vue';
import TentList from '../components/TentList.vue';
import EventComponent from '../components/EventComponent.vue';
import GlampingSites from '../components/GlampingSites.vue';
import TentBooking from '../components/TentBooking.vue';
import MyTentBooking from '../components/MyTentBooking.vue';
import MyPosts from '../components/MyPosts.vue';
import GlampingSiteDetails from '../components/GlampingSiteDetails.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
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
    component: TentBooking,
  },
  { path: "/my-bookings",
    name: 'MyBooking',
    component: MyTentBooking
   },
  {
    path: '/place/:id',
    name: 'place',
    component: PlaceDetails,
  },
  {
    path: '/glamping/:id',
    name: 'glamping',
    component: GlampingSiteDetails,
  },
  {
    path: '/submit-place',
    name: 'PlaceUpload', // New route for uploading a place
    component: PlaceUpload,
  },
  {
    path: '/myPost',
    name: 'MyPost', // New route for uploading a place
    component: MyPosts,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
