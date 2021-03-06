import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import './assets/css/main.css'

Vue.use(Buefy, {
	defaultIconPack: 'fas'
})

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.$cookies.config('2m')

new Vue({
	store: store,
	router: router,
	render: h => h(App)
}).$mount('#app')
