import * as types from '../mutation-types'

const state = {
	//左侧抽屉
	leftOpen: false,
	// 加载页数(更多)
	songListPage: 10,
	// 最新MV加载页数
	videoListPage: 10,
	//加载更多
	loadMore: false,
	//服务器数据
	discoverData: {
		recommdList: [], //对剑歌单
		exclusiveList: [], //独家放送
		newmusicList: [], //最新音乐
		mvList: [], //推荐MV
		radioList: [], //推荐电台
		friendEvent: {}, //朋友动态
		goodSongList: {}, //精品歌单
		goodListOrder: 'new', //精品歌单排序
		newMVList: {}, //最新MV
		mvUrl: {}, // MV链接
		playMV: {} // 播放的MV

	}
}

const getters = {
	//左侧工具栏
	leftBar: state => state.leftOpen,
	//推荐歌单
	recommdList: state => {
		let rl = state.discoverData.recommdList
		rl.length = 6
		return rl
	},
	//推荐歌单(我的音乐)
	recommdSongSheet: state => {
		let rss = state.discoverData.recommdList
		rss.length = 3
		return rss
	},
	//独家放送
	exclusiveList: state => {
		let el = state.discoverData.exclusiveList
		el.length = 3
		return el
	},
	//最新音乐
	newmusicList: state => {
		let nml = state.discoverData.newmusicList
		nml.length = 6
		return nml
	},
	//最新MV
	mvList: state => {
		let mvl = state.discoverData.mvList
		mvl.length = 4
		return mvl
	},
	//主播电台
	radioList: state => {
		let rl = state.discoverData.radioList
		rl.length = 6
		return rl
	},
	//朋友动态
	friendEvent: state => state.discoverData.friendEvent.event,
	//精选歌单
	goodSongList: state => state.discoverData.goodSongList.playlists,
	//精品歌单排序
	goodListOrder: state => state.discoverData.goodListOrder,
	//最新MV
	newMVList: state => state.discoverData.newMVList.data,
	//视频播放
	showMvVideo: state => {
		let obj = {}
		obj['url'] = state.discoverData.mvUrl.url
		obj['name'] = state.discoverData.playMV.name
		obj['artist'] = state.discoverData.playMV.artistName
		obj['briefDesc'] = state.discoverData.playMV.briefDesc
		obj['desc'] = state.discoverData.playMV.desc
		obj['img'] = state.discoverData.playMV.cover
		obj['count'] = state.discoverData.playMV.playCount
		obj['time'] = state.discoverData.playMV.publishTime
		return obj
	}	

}

const mutations = {
	//左侧工具栏
	[types.OPEN_LEFT_ACTION](state) {
		state.leftOpen = !state.leftOpen
	},
	//推荐歌单
	[types.GET_RECOMMD_LIST](state, data) {
		state.discoverData.recommdList = data.result
	},
	//独家放送
	[types.GET_EXCLUSIVE_LIST](state, data) {
		state.discoverData.exclusiveList = data.result
	},
	//最新音乐
	[types.GET_NEWMUSIC_LIST](state, data) {
		state.discoverData.newmusicList = data.result
	},
	//最新MV
	[types.GET_MV_LIST](state, data) {
		state.discoverData.mvList = data.result
	},
	//主播电台
	[types.GET_RADIO_LIST](state, data) {
		state.discoverData.radioList = data.result
	},
	//朋友动态
	[types.GET_FRINED_EVENT](state, data) {
		state.discoverData.friendEvent = data
	},
	//获取精品歌单
	[types.GET_GOOD_SONG_LIST](state, data) {
		state.discoverData.goodSongList = data
	},
	//默认精品歌单页数
	[types.DEFAULT_GOOD_SONG_PAGE](state, order) {
		state.songListPage = 10
		state.discoverData.goodListOrder = order
	},
	//精品歌单页数
	[types.CHANGE_GOOD_SONG_PAGE](state) {
		state.songListPage = state.songListPage + 10
	},
	//加载更多状态
	[types.CHANGE_LOAD_MORE_STATUS](state, status) {
		state.loadMore = status
	},
	// 最新MV加载页数
	[types.CHANGE_NEW_VIDEO_PAGE](state) {
		state.songListPage = state.songListPage + 10
	},
	//获取最新MV
	[types.GET_NEW_VIDEO_LIST](state, data) {
		state.discoverData.newMVList = data
	},
	//视频链接
	[types.GET_VIDEO_URL_LIST](state, data) {
		state.discoverData.mvUrl = data.data
	},
	//mv详情
	[types.GET_MV_DETAIL](state, data) {
		state.discoverData.playMV = data.data
	}
}

const actions = {
	//获取Discovery数据
	async getDiscoveryData({
		commit
	}, axios) {
		commit(types.IS_LOADING, true)
		let carousel = await axios.get('/api/carousel')
		carousel = carousel.data.data
		commit(types.RECEIVE_DATA, {
			carousel
		})
		await this.dispatch('getRecommdList', axios)

		await this.dispatch('getExclusiveList', axios)

		await this.dispatch('getNewMusicList', axios)

		await this.dispatch('getMVList', axios)

		await this.dispatch('getRadioList', axios)

		commit(types.IS_LOADING, false)
	},
	//重新加载Discovery数据
	async reGetDiscoveryData({
		commit
	}, axios) {
		commit(types.REFRESH_AJAX, true)
		let carousel = await axios.get('/api/carousel')
		carousel = carousel.data.data
		commit(types.RECEIVE_DATA, {
			carousel
		})
		await this.dispatch('getRecommdList', axios)

		await this.dispatch('getExclusiveList', axios)

		await this.dispatch('getNewMusicList', axios)

		await this.dispatch('getMVList', axios)

		await this.dispatch('getRadioList', axios)

		commit(types.REFRESH_AJAX, false)
	},
	// 左侧工具栏
	setLeftOpen({
		commit
	}) {
		commit('OPEN_LEFT_ACTION')
	},
	//推荐歌单 无参数
	getRecommdList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/recommdlist')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_RECOMMD_LIST', data)
					resolve()
				})
		})
	},
	//独家放送 无参数
	getExclusiveList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/exclusivelist')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_EXCLUSIVE_LIST', data)
					resolve()
				})
		})
	},
	//最新音乐 无参数
	getNewMusicList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/newmusiclist')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_NEWMUSIC_LIST', data)
					resolve()
				})
		})
	},
	//最新MV 无参数
	getMVList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/mvlist')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_MV_LIST', data)
					resolve()
				})
		})
	},
	//主播电台 无参数
	getRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/radiolist')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_RADIO_LIST', data)
					resolve()
				})
		})
	},
	//朋友动态 无参数
	getFriendEvent({
		state,
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/friendevent')
				.then(res => {
					// let data = JSON.parse(res.data)
					if (data.code === 200) {
						// commit('GET_FRINED_EVENT', data)
					}
					resolve()
				})
		})
	},
	//前往精选歌单
	async toGoodSongList({
		state,
		commit
	}, {
		axios,
		router,
		order
	}) {
		commit(types.DEFAULT_GOOD_SONG_PAGE, order)
		await this.dispatch('getGoodSongList', {
			axios,
			order
		})
		await router.push('/morelistview')
	},
	//精选歌单 数据条数limit 类型order 标签cat
	getGoodSongList({
		state,
		commit
	}, {
		axios,
		order
	}) {
		commit(types.CHANGE_LOAD_MORE_STATUS, true)
		let limit = state.songListPage
		let timestamp = new Date().getTime()
		return new Promise(resolve => {
			axios.get('/api/goodsonglist', {
					params: {
						limit,
						order,
						timestamp
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_GOOD_SONG_LIST', data)
					commit(types.CHANGE_GOOD_SONG_PAGE)
					resolve()
					commit(types.CHANGE_LOAD_MORE_STATUS, false)
				})
		})
	},
	//最新mv 数据条数limit
	getNewMVList({
		state,
		commit
	}, {
		axios
	}) {
		commit(types.CHANGE_LOAD_MORE_STATUS, true)
		let limit = state.songListPage
		let timestamp = new Date().getTime()
		return new Promise(resolve => {
			axios.get('/api/newvideolist', {
					params: {
						limit,
						timestamp
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_NEW_VIDEO_LIST', data)
					commit(types.CHANGE_NEW_VIDEO_PAGE)
					resolve()
					commit(types.CHANGE_LOAD_MORE_STATUS, false)
				})
		})
	},
	// 获取视频播放连接
	getVideoURL({
		commit
	}, {
		axios,
		router,
		id
	}) {
		console.log('0')
		let timestamp = new Date().getTime()
		return new Promise(resolve => {
			axios.get('/api/videourl', {
					params: {
						id,
						timestamp
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit(types.GET_VIDEO_URL_LIST, data)
					resolve()
				})
		})
	},
	//mv详情
	getMvDetail({
		commit
	}, {
		axios,
		router,
		id
	}) {
		console.log('1')
		let timestamp = new Date().getTime()
		return new Promise(resolve => {
			axios.get('/api/mvdetail', {
					params: {
						id,
						timestamp
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit(types.GET_MV_DETAIL, data)
					resolve()
				})
		})
	},
	//视频显示
	async showVideo({
		commit
	}, {
		axios,
		router,
		id
	}) {
		commit(types.REFRESH_AJAX, true)
		await this.dispatch('getVideoURL', {
			axios,
			id
		})
		await this.dispatch('getMvDetail', {
			axios,
			id
		})
		commit(types.REFRESH_AJAX, false)
		router.push('/videoplayview/' + id)
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
