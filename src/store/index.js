import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import discover from './modules/discover'
import radio from './modules/radio'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLoading: false, //是否加载中(启动页)
		isAjax: false, //进行ajax请求
		scroll: {}, //滑动
		showSongDetail: false, //展示歌曲播放页
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
		showBottomPlayer: false, //显示底部播放器
		musicPlayer: {
			defaultPlay: true, //初始状态
			playState: false, //播放状态
			playIndex: 0, //播放序号
			playList: [], //播放列表
			lyric: [], //歌词
			lyricList: [], //歌词列表
			playerTimer: {
				duration: 0,
				currentTime: 0,
				percent: 0
			},
			tools: {
				player: null,
				timestamp: null
			},
			playType: 0, //播放模式 0列表循环，1单曲循环，2随机播放
		},
		songList: {} ,//歌单内容
		audioType: 'music' //播放类型
	},
	mutations,
	actions,
	getters,
	modules: {
		discover,
		radio,
		account
	}
})