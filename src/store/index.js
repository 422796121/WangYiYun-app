import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import discover from './modules/discover'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isAjax: false,
		data: {
			search: []
		}
	},
	mutations,
	actions,
	modules: {
		discover
	}
})
