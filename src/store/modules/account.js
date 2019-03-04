import * as types from '../mutation-types'

const state = {
	pageType: "", //注册或登陆页面
	loginStatus: {
		uesrId: '', //用户id
		status: false, //登陆状态(默认未登录)
		loginCode: 0, //登陆状态码
		loginImfor: {}, //登陆资料
		imfor: {}, //账号资料
		msg: "" //提示信息
	},
	songList: {
		allList: [] // 所有用户歌单
	}
}

const getters = {
	//登陆状态
	loginUserStatus: state => state.loginStatus.status,
	//登陆状态码
	loginCode: state => state.loginStatus.loginCode,
	// 注册或登陆页面
	pageType: state => state.pageType,
	//提示信息
	loginMsg: state => state.loginStatus.msg,
	// 用户详情
	userDetail: state => state.loginStatus.imfor,
	// 按钮类型
	pageBtn: state => {
		if (state.pageType === 'register') {
			return '注册'
		} else {
			return '登陆'
		}
	},
	// 页面标题
	pageTitle: state => {
		if (state.pageType === 'cellphone') {
			return '手机号登陆'
		} else if (state.pageType === 'email') {
			return '邮箱登陆'
		} else {
			return '手机号注册'
		}
	},
	//创建的歌单
	createList: state => {
		var create = []
		var list = state.songList.allList
		for (let i in list) {
			if(list[i].creator.userId === state.loginStatus.uesrId){
				create.push(list[i])
			}
		}
		return create
	},
	// 收藏的歌单
	collectList: state => {
		var collect = []
		var list = state.songList.allList
		for (let i in list) {
			if(list[i].creator.userId !== state.loginStatus.uesrId){
				collect.push(list[i])
			}
		}
		return collect
	}
}

const mutations = {
	//登陆注册页面
	[types.CHANGE_PAGE_TYPE](state, type) {
		state.pageType = type
	},
	//保存登陆信息
	[types.SAVE_LOGIN_IMFO](state, data) {
		state.loginStatus.loginImfor = data
		state.loginStatus.loginCode = data.code
		state.loginStatus.uesrId = data.account.id
	},
	//用户详情
	[types.GET_USER_DETAIL](state, data) {
		state.loginStatus.imfor = data
	},
	//修改提示信息
	[types.CHANGE_LOGIN_MSG](state, str) {
		state.loginStatus.msg = str
	},
	//获取用户歌单
	[types.GET_PLAY_LIST](state, data) {
		state.songList.allList = data.playlist
		console.log(data)
	},
	//登陆状态
	[types.SET_LOGIN_STATUS](state) {
		state.loginStatus.status = !state.loginStatus.status
	}
}

const actions = {
	//账号
	//登陆注册页面
	changePageType({
		commit
	}, type) {
		commit(types.CHANGE_PAGE_TYPE, type)
	},
	//提交
	//登陆注册提交
	async loginSubmit({
		commit,
		state
	}, {
		axios,
		type,
		username,
		password,
		showTooltips,
		toIndex,
		cookie
	}) {
		if (type === 'cellphone') {
			await this.dispatch('phoneSubmit', {
				axios,
				username,
				password,
				cookie
			})
		} else if (type === 'email') {
			await this.dispatch('emailSubmit', {
				axios,
				username,
				password,
				cookie
			})
		}
		toIndex()
		showTooltips()
	},
	// 手机
	//用户名 密码
	phoneSubmit({
		commit
	}, {
		axios,
		username,
		password,
		cookie
	}) {
		return new Promise(resolve => {
			axios.post('/api/phonelogin', {
					phone: username,
					password: password
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					withCredentials: true
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					if (data.code === 200) {
						commit(types.SAVE_LOGIN_IMFO, data)
						this.dispatch('changeLoginMsg', '登陆成功')
						this.dispatch('saveUserDetail', {
							axios,
							cookie
						})
					} else {
						this.dispatch('changeLoginMsg', data.msg)
					}
					resolve()
				})
		})
	},
	// 邮箱
	//用户名 密码
	emailSubmit({
		commit
	}, {
		axios,
		username,
		password,
		cookie
	}) {
		return new Promise(resolve => {
			axios.post('/api/emaillogin', {
					email: username,
					password: password
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Access-Control-Allow-Origin': true,
						'Access-Control-Allow-Credentials': true
					},
					withCredentials: true
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					if (data.code === 200) {
						commit(types.SAVE_LOGIN_IMFO, data)
						this.dispatch('changeLoginMsg', '登陆成功')
						this.dispatch('saveUserDetail', {
							axios,
							cookie
						})
					} else {
						this.dispatch('changeLoginMsg', data.msg)
					}
					resolve()
				})
		})
	},
	//修改提示信息
	changeLoginMsg({
		commit
	}, str) {
		commit(types.CHANGE_LOGIN_MSG, str)
	},
	//获取用户详情
	//用户id
	getUserDetail({
		commit
	}, {
		axios,
		userid
	}) {
		return new Promise(resolve => {
			axios.get('/api/userdetail', {
					params: {
						userid
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit(types.GET_USER_DETAIL, data)
					commit(types.SET_LOGIN_STATUS)
					resolve()
				})
		})
	},
	//保存详情
	saveUserDetail({
		commit,
		state
	}, {
		axios
	}) {
		this.dispatch('getUserDetail', {
			axios: axios,
			userid: state.loginStatus.uesrId
		})
	},
	//用户歌单 用户id
	getPlaylist({
		commit,
		state
	}, axios) {
		commit(types.REFRESH_AJAX, true)
		return new Promise(resolve => {
			axios.get('/api/playlist', {
					params: {
						userid: state.loginStatus.uesrId
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit(types.GET_PLAY_LIST, data)
					resolve()
					commit(types.REFRESH_AJAX, false)
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
