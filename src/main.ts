import { createApp } from 'vue'
import router from './router'
import store, { setupStore } from './store'
import App from './App.vue'
import { globalRegister } from '@/global'
import 'normalize.css'
import './assets/css/base.less'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
