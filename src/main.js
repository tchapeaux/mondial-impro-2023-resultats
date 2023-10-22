import './assets/main.css'

import { createApp } from 'vue'
import { inject } from '@vercel/analytics'

import App from './App.vue'

inject() // Vercel analytics
createApp(App).mount('#app')
