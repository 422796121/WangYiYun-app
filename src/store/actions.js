import * as types from './mutation-types'
// import qs from 'qs'

export default {

	// 播放器
	//是否显示底部播放器
	setBottonPlayer({
		commit
	}, bool) {
		commit(types.SHOW_BOTTOM_PLAYER, bool)
	},
	//获取音乐播放器音乐时长
	async getPlayerData({
		commit
	}, {
		ele,
		axios,
		musicid
	}) {
		commit(types.GET_PLAYER_DATA, ele)

		commit(types.REFRESH_AJAX, true)
		await this.dispatch('getLyricList', {
			axios,
			musicid
		})
		commit(types.REFRESH_AJAX, false)
	},
	//音乐播放器
	setMusicPlayer({
		commit
	}, eles) {
		commit(types.SET_MUSIC_PLAYER, eles)
	},
	//播放器进度条
	setTimeProgess({
		commit
	}, data) {
		commit(types.SET_TIME_PROGESS, data)
	},
	//获取歌词数据
	getLyricList({
		commit
	}, {
		axios,
		musicid
	}) {
		return new Promise(resolve => {
			axios.get('/api/lyric', {
					params: {
						musicid
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_LYRIC_DATA', {
						musicid,
						data
					})
					resolve()
					commit('PROCESSING_LYRIC_DATA')
				})
		})
	},


	//歌曲详情 音乐id
	getMusicDetail({
		commit
	}, {
		axios,
		arr,
		musicid
	}) {
		return new Promise(resolve => {
			axios.get('/api/musicdetail', {
					params: {
						musicid
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					console.log(data)
					resolve()
				})
		})
	},





	//轮播图
	setCarousel({
		commit
	}, ele) {
		commit(types.GET_SLIDE_WIDTH, ele)
		commit(types.SET_SLIDE, ele)
		this.dispatch('playCarousel', ele)
	},
	//播放轮播图
	playCarousel({
		commit
	}, ele) {
		commit(types.PLEY_SLIDE, ele)
	},

	//滑动插件
	setScroll({
		commit
	}, {
		name,
		scroll,
		ref
	}) {
		commit(types.SET_SCROLL, {
			name,
			scroll,
			ref
		})
	},
	//更新滑动插件
	refreshScroll({
		commit
	}, scroll) {
		commit(types.REFRESH_SCROLL, scroll)
	},
	//清除滑动
	clearScroll({
		commit
	}) {
		commit(types.CLEAR_SCROLL)
	}
}
