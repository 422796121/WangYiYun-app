import * as types from '../mutation-types'

const state = {
	//服务器数据
	radioData: {
		recommdRadioList: [], // 今日优选
		createRadioList: [], // 创作翻唱
		threedRadioList: [], // 3d电音
		feelRadioList: [], // 情感调频
		storyRadioList: [], // 音乐故事
	},
	classifyRadioList: [] // 电台分类
}

const getters = {
	//热门分类
	hotClassifyRadioList: state => {
		let hcrl = state.classifyRadioList.categories
		if (hcrl !== undefined) {
			return hcrl.slice(0, 6)
		} else {
			return null
		}
	},
	//更多分类
	moreClassifyRadioList: state => {
		let mcrl = state.classifyRadioList.categories
		if (mcrl !== undefined) {
			return mcrl.slice(6, -1)
		} else {
			return null
		}
	},
	//今日优选
	recommdRadioList: state => {
		let rrl = state.radioData.recommdRadioList.djRadios
		if (rrl !== undefined) {
			rrl.length = 3
			return rrl
		} else {
			return null
		}
	},
	//创作翻唱
	createRadioList: state => {
		let crl = state.radioData.createRadioList.djRadios
		if (crl !== undefined) {
			crl.length = 3
			return crl
		} else {
			return null
		}
	},
	//3d电音
	threedRadioList: state => {
		let trl = state.radioData.threedRadioList.djRadios
		if (trl !== undefined) {
			trl.length = 3
			return trl
		} else {
			return null
		}
	},
	//情感调频
	feelRadioList: state => {
		let frl = state.radioData.feelRadioList.djRadios
		if (frl !== undefined) {
			frl.length = 3
			return frl
		} else {
			return null
		}
	},
	//音乐故事
	storyRadioList: state => {
		let srl = state.radioData.storyRadioList.djRadios
		if (srl !== undefined) {
			srl.length = 3
			return srl
		} else {
			return null
		}
	}
}

const mutations = {
	//电台分类
	[types.GET_CLASSIFY_RADIO_LIST](state, data) {
		state.classifyRadioList = data
	},
	//今日优选
	[types.GET_RECOMMD_RADIO_LIST](state, data) {
		state.radioData.recommdRadioList = data
	},
	//创作翻唱
	[types.GET_CREATE_RADIO_LIST](state, data) {
		state.radioData.createRadioList = data
	},
	//3d电音
	[types.GET_3D_RADIO_LIST](state, data) {
		state.radioData.threedRadioList = data
	},
	//情感调频
	[types.GET_FEEL_RADIO_LIST](state, data) {
		state.radioData.feelRadioList = data
	},
	//音乐故事
	[types.GET_STORY_RADIO_LIST](state, data) {
		state.radioData.storyRadioList = data
	}
}

const actions = {
	//获取Radio数据
	async getRadioData({
		commit
	}, axios) {
		commit(types.REFRESH_AJAX, true)
		let carousel = await axios.get('/api/carousel')
		carousel = carousel.data.data
		commit(types.RECEIVE_DATA, {
			carousel
		})
		await this.dispatch('getClassifyRadioList', axios)
		await this.dispatch('getRecommdRadioList', axios)
		await this.dispatch('getCreateRadioList', axios)
		await this.dispatch('getThreeDRadioList', axios)
		await this.dispatch('getFeelRadioList', axios)
		await this.dispatch('getStoryRadioList', axios)

		commit(types.REFRESH_AJAX, false)
	},
	//电台分类 无参数
	getClassifyRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/typeradio')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_CLASSIFY_RADIO_LIST', data)
					resolve()
				})
		})
	},
	//今日优选 无参数
	getRecommdRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/recommdradio')
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_RECOMMD_RADIO_LIST', data)
					resolve()
				})
		})
	},
	//创作翻唱 type=2001
	getCreateRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/typeradio/type', {
					params: {
						type: 2001,
						timestamp: new Date().getTime()
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_CREATE_RADIO_LIST', data)
					resolve()
				})
		})
	},
	//3d电音 type=10002
	getThreeDRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/typeradio/type', {
					params: {
						type: 10002,
						timestamp: new Date().getTime()
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_3D_RADIO_LIST', data)
					resolve()
				})
		})
	},
	//情感调频 type=3
	getFeelRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/typeradio/type', {
					params: {
						type: 3,
						timestamp: new Date().getTime()
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_FEEL_RADIO_LIST', data)
					resolve()
				})
		})
	},
	// 音乐故事 type=2
	getStoryRadioList({
		commit
	}, axios) {
		return new Promise(resolve => {
			axios.get('/api/typeradio/type', {
					params: {
						type: 2,
						timestamp: new Date().getTime()
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit('GET_STORY_RADIO_LIST', data)
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
