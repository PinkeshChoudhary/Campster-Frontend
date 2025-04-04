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
import OtpLogin from '../components/OtpLogin.vue';
import { getAuth } from 'firebase/auth';
import TicketEventOrganizer from '../components/TicketEventOrganizer.vue';
import EventDetails from '../components/EventDetails.vue';
import ContactUs from '../components/ContactUs.vue';



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
    meta: { requiresAuth: true }
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
    path: '/events/:id',
    name: 'eventdetails',
    component: EventDetails,
    // meta: { requiresAuth: true }
  },
  {
    path: '/organizer',
    name: 'Organizer',
    component: TicketEventOrganizer,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs,
  },
  {
    path: '/login',
    name: 'Login',
    component: OtpLogin,
  },
  {
    path: '/tent',
    name: 'Tent',
    component: TentList,
    meta: { requiresAuth: true }
  },
  {
    path: '/tentbooking',
    name: 'Booking',
    component: TentBooking,
    meta: { requiresAuth: true }
  },
  { path: "/my-bookings",
    name: 'MyBooking',
    component: MyTentBooking,
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
  },
  {
    path: '/submit-place',
    name: 'PlaceUpload', // New route for uploading a place
    component: PlaceUpload,
    meta: { requiresAuth: true }
  },
  {
    path: '/myPost',
    name: 'MyPost', // New route for uploading a place
    component: MyPosts,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next("/login"); // Redirect unauthenticated users
  } else {
    next(); // Proceed to the route
  }
});

export default router;
