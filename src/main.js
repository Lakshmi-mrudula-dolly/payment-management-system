import { createApp } from 'vue'
import './style.css'
//import App from './App.vue'
import UserList from './views/users/UserList.vue'
import store from './store'

createApp(UserList).use(store).mount('#app')
