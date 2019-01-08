import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTouch from 'vue-touch'
import Muse from './muse-ui.config.js'

//css
import '../public/css/reset.css'
import 'muse-ui/lib/styles/base.less'


Vue.use(VueAxios, axios)
Vue.use(Muse)
Vue.use(VueTouch, {
	name: 'v-touch'
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

store.dispatch('getAllData', axios)

router.push('/discover/stylerecommd')
