import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import discover from './modules/discover'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isAjax: false,
		data: {
			carousel: [],
			search: []
		},
		slide: { // 轮播图
			play: true, //播放
			slideArr: [],
			currentSlideIndex: 0 ,//序号,
			timer: null, //定时器
			interval: 3000 //定时器时间,
		},
		musicPlayer: {
			playIndex: 0,
			playList: [],
			lyricList: [],
			currentTime: 0
		}
	},
	mutations,
	actions,
	getters,
	modules: {
		discover
	}
})
