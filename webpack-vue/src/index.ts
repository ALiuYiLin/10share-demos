import { createApp } from 'vue'
import App from './APP.vue'
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

createApp(App).mount('#root')