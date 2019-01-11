import * as types from '../mutation-types'

const state = {
	leftOpen: false,
	//服务器数据
	discoverData: {
		recommdList: [],
		exclusiveList: [],
		newmusicList: [],
		mvList: [],
		radioList: []
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
	//独家放送
	exclusiveList: state =>{
		let el = state.discoverData.exclusiveList
		el.length = 3
		return el
	},
	//最新音乐
	newmusicList: state =>{
		let nml = state.discoverData.newmusicList
		nml.length = 6
		return nml
	},
	//最新MV
	mvList: state =>{
		let mvl = state.discoverData.mvList
		mvl.length = 4
		return mvl
	},
	//主播电台
	radioList: state =>{
		let rl = state.discoverData.radioList
		rl.length = 6
		return rl
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
	[types.GET_NEWMUSIC_LIST](state,data){
		state.discoverData.newmusicList = data.result
	},
	//最新MV
	[types.GET_MV_LIST](state,data){
		state.discoverData.mvList = data.result
	},
	//主播电台
	[types.GET_RADIO_LIST](state,data){
		state.discoverData.radioList = data.result
	}
}

const actions = {
	setLfetOpen({
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
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
