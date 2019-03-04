import * as types from './mutation-types'

export default {

	// 播放器
	//是否显示底部播放器
	setBottonPlayer({
		commit
	}, bool) {
		commit(types.SHOW_BOTTOM_PLAYER, bool)
	},
	//设置播放状态
	setMusicPlayerStatus({
		commit
	}) {
		commit(types.SET_MUSIC_PLAYER_STATUS)
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
	//保存播放器、时间条
	saveMusicPlayerTool({
		commit
	}, eles) {
		commit(types.SAVE_MUSIC_PLAYER_TOOL, eles)
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
		musicId,
		num
	}) {
		let timestamp = new Date().getTime()
		return new Promise(resolve => {
			axios.get('/api/musicdetail', {
					params: {
						musicId,
						timestamp
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					commit(types.GET_SONG_DETAIL, {
						data,
						num
					})
					this.dispatch('setBottonPlayer', true)
					resolve()
				})
		})
	},

	//歌单内容
	getSongListDetail({
		commit
	}, {
		axios,
		router,
		listid,
		audioType
	}) {
		commit(types.CHANGE_PLAYER_TYPE, audioType)
		if (listid === null) {
			router.push('/songlistview')
		} else {
			let timestamp = new Date().getTime()
			return new Promise(resolve => {
				axios.get('/api/songlistdetail', {
						params: {
							listid,
							timestamp
						}
					})
					.then(res => {
						let data = JSON.parse(res.data.data)
						commit('GET_SONG_LIST_DETAIL', data)
						resolve()
						router.push('/songlistview')
					})
			})
		}
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
	},

	//后退
	goBack({
		commit
	}, {
		router
	}) {
		router.go(-1)
	},

	//获取歌曲详情
	async getSongDetail({
		state,
		commit
	}, {
		axios,
		list,
		musicId,
		num,
		playStatus,
		saveList
	}) {
		commit(types.SHOW_BOTTOM_PLAYER, false)
		// 处理数组
		if (saveList === false) {
			await commit(types.SAVE_SONG_LIST, {
				list,
				num
			})
		}
		if (state.audioType == 'music') {
			//获取歌曲详情 贮存在数组
			await this.dispatch('getMusicDetail', {
				axios,
				musicId,
				num
			})
			console.log('1')
		} else {
			console.log('2')
			commit(types.GET_RADIO_DETAIL, {
				list,
				num
			})
		}

		if (saveList === true) {
			commit(types.CHANGE_PLAY_INDEX, {
				num
			})
		}
		if (playStatus === true) {
			if (state.musicPlayer.playState === false) {
				this.dispatch('setMusicPlayerStatus')
			}
			// 存储播放器
			this.dispatch('setMusicPlayer', {
				player: state.musicPlayer.tools.player,
				show: state.musicPlayer.tools.timestamp
			})
			// 时间 歌词
			this.dispatch('getPlayerData', {
				ele: state.musicPlayer.tools.player,
				axios: axios,
				musicid: musicId
			})
		}

		await commit(types.SHOW_BOTTOM_PLAYER, true)
	},
	//播放器上一首/下一首
	changePlayerSong({
		state,
		commit
	}, {
		axios,
		num,
		isEnd
	}) {
		let player = state.musicPlayer
		let type = state.musicPlayer.playType
		let count = state.musicPlayer.playList.length
		let index = 0
		if (type == 0) {
			index = parseInt(num) + player.playIndex
			if (index >= count) {
				index = 0
			} else if (index < 0) {
				index = count - 1
			}
		} else if (type == 1) {
			if (isEnd === true) {
				index = player.playIndex
			} else {
				index = parseInt(num) + player.playIndex
				if (index >= count) {
					index = 0
				} else if (index < 0) {
					index = count - 1
				}
			}
		} else if (type == 2) {
			index = Math.floor(Math.random() * (count + 1))
		}

		this.dispatch('getSongDetail', {
			axios: axios,
			list: player.playList,
			musicId: player.playList[index].musicId,
			num: index,
			playStatus: true,
			saveList: true
		})

	},
	//展示播放页
	showSongView({
		commit
	}) {
		commit(types.SHOW_SONG_VIEW)
	},
	//改变播放模式
	changePlayType({
		commit
	}, num) {
		commit(types.CHANGE_PLAY_TYPE, num)
	},
	//改变播放时间
	changePlayTime({
		commit
	}, value) {
		commit(types.CHANGE_PLAY_TIME, value)
	}
}
