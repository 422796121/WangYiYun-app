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
	//获取音乐播放器音乐时长
	[types.GET_PLAYER_DATA](state, ele) {
		state.musicPlayer.playerTimer.duration = 0
		ele.addEventListener('loadedmetadata', () => {
			state.musicPlayer.playerTimer.duration = ele.duration
		})
	},
	//音乐播放器
	[types.SET_MUSIC_PLAYER](state, eles) {
		if (state.musicPlayer.playState === false) {
			eles.player.play()
			state.musicPlayer.playState = true
		} else {
			eles.player.pause()
			state.musicPlayer.playState = false
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
	},
	//获取歌词 音乐id
	[types.GET_LYRIC_DATA](state, {
		musicid,
		data
	}) {
		let lyc = state.musicPlayer.lyricList
		if (lyc.length === 0) {
			data.lrc['musicid'] = musicid
			lyc.push(data.lrc)
		} else if (!lyc.find(item => item.musicid === musicid)) {
			data.lrc['musicid'] = musicid
			lyc.push(data.lrc)
		}
	},
	// 处理歌词数据
	[types.PROCESSING_LYRIC_DATA](state) {
		let index = state.musicPlayer.playIndex
		// let currentTime = state.musicPlayer.playerTimer.currentTime
		let result = []
		let data = state.musicPlayer.lyricList[index].lyric
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
	}




}
