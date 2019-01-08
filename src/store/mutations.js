import * as types from './mutation-types'
import BScroll from 'better-scroll'

export default {
	[types.RECEIVE_DATA](state, data) {
		state.data = data
	},
	[types.REFRESH_AJAX](state, status) {
		state.isAjax = status
	},
	[types.SET_SCROLL](state,scroll){
		console.log(scroll)
		if (!scroll.discoveryScroll) {
			scroll.discoveryScroll = new BScroll(scroll.descovery, {
				click: true
			})
		} else {
			scroll.discoveryScroll.refresh()
		}
	}
}
