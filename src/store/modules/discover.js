import * as types from '../mutation-types'

const state = {
	leftOpen: false
}

const mutations = {
	[types.OPEN_LEFT_ACTION](state) {
		state.leftOpen = !state.leftOpen
		console.log(state.leftOpen)
	}
}

const actions = {
	setLfetOpen({
		commit
	}) {
		commit('OPEN_LEFT_ACTION')
	}
}

export default{
	state,
	mutations,
	actions
}
