import Vue from 'vue'
import store from './store'
import App from './App'
import util from '@/common/util' 
import Drawer from '@/components/drawer/Drawer.vue'

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$util = util;

Vue.component('drawer', Drawer)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
