import { createApp } from 'vue'
import './style.css'
//import App from './App.vue'
import PaymentForm from './views/payments/PaymentForm.vue'
import store from './store'

createApp(PaymentForm).use(store).mount('#app')
