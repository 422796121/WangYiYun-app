import * as types from './mutation-types'
import BScroll from 'better-scroll'

export default {
	//获取数据
	[types.RECEIVE_DATA](state, data) {
		state.data = data
	},
	//修改ajax状态
	[types.REFRESH_AJAX](state, status) {
		state.isAjax = status
	},
	//创建better-scroll
	[types.SET_SCROLL](state, scroll) {
		if (!scroll.discoveryScroll) {
			scroll.discoveryScroll = new BScroll(scroll.descovery, {
				click: true
			})
		} else {
			scroll.discoveryScroll.refresh()
		}
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
			if(state.slide.play){
				clearTimeout(state.slide.timer)
			}
			state.slide.play = false
		})
		ele.scroll.on('scrollEnd', () => {
			if(!state.slide.play){
				let index = ele.scroll.getCurrentPage().pageX
				console.log(index)
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
			if(i < state.slide.slideArr.length){
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
			if(index >= state.slide.slideArr.length){
				index = 0
			}
			state.slide.currentSlideIndex = index
			ele.scroll.goToPage(index, 0, 400) //跳转到的页数 初始化页数 滑动总时间
		}, state.slide.interval)
	}
}
