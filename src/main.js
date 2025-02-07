import { createApp } from 'vue'
import App from './App.vue'
import router from './RouteFolder/router'
import { createPinia } from 'pinia'
import './assets/Main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
