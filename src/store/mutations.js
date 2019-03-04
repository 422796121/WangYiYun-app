import * as types from './mutation-types'
import BScroll from 'better-scroll'

export default {
	//获取数据
	[types.RECEIVE_DATA](state, data) {
		state.data = data
	},
	//是否数据加载中(启动页)
	[types.IS_LOADING](state, status) {
		state.isLoading = status
	},
	//修改ajax状态
	[types.REFRESH_AJAX](state, status) {
		state.isAjax = status
	},
	//创建better-scroll
	[types.SET_SCROLL](state, {
		name,
		scroll,
		ref
	}) {
		if (!scroll) {
			scroll = new BScroll(ref, {
				click: true,
				probeType: 3,
				pullDownRefresh: {
					threshold: 5
				},
				pullUpLoad: {
					threshold: 3
				}
			})
		} else {
			this.dispatch('refreshScroll', scroll)
		}
		state.scroll[name] = scroll
	},
	//更新滑动插件
	[types.REFRESH_SCROLL](state, scroll) {
		scroll.refresh()
	},
	[types.CLEAR_SCROLL](state) {
		state.scroll = null
	},


	//是否显示底部播放器
	[types.SHOW_BOTTOM_PLAYER](state, status) {
		state.showBottomPlayer = status
	},
	//设置播放状态
	[types.SET_MUSIC_PLAYER_STATUS](state) {
		state.musicPlayer.playState = !state.musicPlayer.playState
	},
	//获取音乐播放器音乐时长
	[types.GET_PLAYER_DATA](state, ele) {
		state.musicPlayer.playerTimer.duration = 0
		ele.addEventListener('loadedmetadata', () => {
			state.musicPlayer.playerTimer.duration = ele.duration
		})
	},
	//保存播放器、时间条
	[types.SAVE_MUSIC_PLAYER_TOOL](state, eles) {
		state.musicPlayer.tools.player = eles.player
		state.musicPlayer.tools.timestamp = eles.show
	},
	//音乐播放器
	[types.SET_MUSIC_PLAYER](state, eles) {
		// let list = state.musicPlayer.lyricList
		let list = state.musicPlayer.playList
		let index = state.musicPlayer.playIndex
		if (eles.conti !== true) {
			eles.player.src = `https://music.163.com/song/media/outer/url?id=${list[index].musicId}.mp3`
			console.log(eles)
		}
		if (state.musicPlayer.playState === true) {
			eles.player.play()
		} else {
			eles.player.pause()
		}
		eles.player.addEventListener('timeupdate', () => {
			this.dispatch('setTimeProgess', {
				current: eles.player.currentTime,
				timeShow: eles.show
			})
		})
	},
	//播放进度条
	[types.SET_TIME_PROGESS](state, data) {
		state.musicPlayer.playerTimer.currentTime = data.current
		let progress = (data.current / state.musicPlayer.playerTimer.duration) * 100.0
		data.timeShow.style.width = `${progress}%`
		state.musicPlayer.playerTimer.percent = progress
	},
	//获取歌词 音乐id
	[types.GET_LYRIC_DATA](state, {
		musicid,
		data
	}) {
		state.musicPlayer.lyricList[state.musicPlayer.playIndex].lyrics = data.lrc
		// 		if (lyc.length === 0) {
		// 			data.lrc['musicid'] = musicid
		// 			lyc.push(data.lrc)
		// 		} else if (!lyc.find(item => item.musicid === musicid)) {
		// 			data.lrc['musicid'] = musicid
		// 			lyc.push(data.lrc)
		// 		}
	},
	// 处理歌词数据
	[types.PROCESSING_LYRIC_DATA](state) {
		let index = state.musicPlayer.playIndex
		// let currentTime = state.musicPlayer.playerTimer.currentTime
		let result = []
		let data = state.musicPlayer.lyricList[index].lyrics.lyric
		let line = data.split('\n')
		for (let i = 0; i < line.length; i++) {
			let temp = line[i]
			let tempArr = temp.split(':')[0].replace('[', '')
			if (!isNaN(tempArr)) {
				let timeArr = temp.split(']')[0].replace('[', '').split(':')
				let min = parseInt(timeArr[0])
				let totalSecond = min * 60 + parseInt(timeArr[1])
				let content = temp.split(']')[1]

				let obj = {
					time: totalSecond,
					content: content
				}
				result.push(obj)
			}
		}
		state.musicPlayer.lyric = result
	},


	//实现轮播图
	[types.SET_SLIDE](state, ele) {
		ele.scroll = new BScroll(ele.carousel, {
			click: true,
			scrollX: true,
			scrollY: false,
			momentum: false, //关闭或者打开惯性运动的执行
			snap: {
				loop: true, //无限滚动
				threshold: 0.3,
				speed: 400 //滑动的时间
			}
		})
		ele.scroll.on('beforeScrollStart', () => {
			if (state.slide.play) {
				clearTimeout(state.slide.timer)
			}
			state.slide.play = false
		})
		ele.scroll.on('scrollEnd', () => {
			if (!state.slide.play) {
				let index = ele.scroll.getCurrentPage().pageX
				state.slide.currentSlideIndex = index
				this.dispatch('playCarousel', ele)
			}
			state.slide.play = true
		})

	},
	//获取轮播图宽度
	[types.GET_SLIDE_WIDTH](state, ele) {
		let width = 0
		state.slide.slideArr.length = ele.slide.children.length
		let carouselWidth = ele.carousel.clientWidth
		for (let i = 0; i <= state.slide.slideArr.length; i++) {
			if (i < state.slide.slideArr.length) {
				ele.slide.children[i].style.width = carouselWidth + 'px'
			}
			width += carouselWidth
		}
		width += carouselWidth
		ele.slide.style.width = width + 'px'
	},
	//播放轮播图
	[types.PLEY_SLIDE](state, ele) {
		let index = state.slide.currentSlideIndex
		state.slide.timer = setInterval(() => {
			index++
			if (index >= state.slide.slideArr.length) {
				index = 0
			}
			state.slide.currentSlideIndex = index
			ele.scroll.goToPage(index, 0, 400) //跳转到的页数 初始化页数 滑动总时间
		}, state.slide.interval)
	},

	//歌单内容
	[types.GET_SONG_LIST_DETAIL](state, data) {
		state.songList = data
	},

	//歌曲列表
	//存放播放列表
	[types.SAVE_SONG_LIST](state, {
		list,
		num
	}) {
		state.musicPlayer.defaultPlay = false
		state.musicPlayer.tools.player.pause()
		state.musicPlayer.playState = false
		state.musicPlayer.playIndex = num
		for (let i = 0; i < list.length; i++) {
			state.musicPlayer.playList[i] = {
				musicId: '',
				imfo: {}
			}
			state.musicPlayer.lyricList[i] = {
				musicId: '',
				lyrics: {}
			}
			state.musicPlayer.playList[i].musicId = list[i].id
			state.musicPlayer.lyricList[i].musicId = list[i].id
		}
	},
	// 获取音乐详情
	[types.GET_SONG_DETAIL](state, {
		data,
		num
	}) {
		state.musicPlayer.playList[num].imfo = data
	},
	// 修改播放序号
	[types.CHANGE_PLAY_INDEX](state, {
		num
	}) {
		state.musicPlayer.tools.player.pause()
		state.musicPlayer.playState = false
		state.musicPlayer.playIndex = num
	},
	//展示播放页
	[types.SHOW_SONG_VIEW](state) {
		state.showSongDetail = !state.showSongDetail
	},
	//改变播放模式
	[types.CHANGE_PLAY_TYPE](state, num) {
		state.musicPlayer.playType = num
	},
	//改变播放时间
	[types.CHANGE_PLAY_TIME](state, num) {
		state.musicPlayer.playerTimer.percent = num
		state.musicPlayer.playerTimer.currentTime = (num / 100.0) * state.musicPlayer.playerTimer.duration
		state.musicPlayer.tools.player.currentTime = state.musicPlayer.playerTimer.currentTime
	},
	//更改播放类型
	[types.CHANGE_PLAYER_TYPE](state, type) {
		state.audioType = type
	},
	// 获取电台详情
	[types.GET_RADIO_DETAIL](state, {
		list,
		num
	}) {
		state.musicPlayer.playList[num].imfo = list[num]
		console.log(state.musicPlayer.playList)
	}
	
}
