import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { reveal } from './utils/reveal.js'

createApp(App).directive('reveal', reveal).mount('#app')
