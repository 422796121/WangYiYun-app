import * as types from './mutation-types'
// import qs from 'qs'

export default {
	async getAllData({
		commit
	}, axios) {
		commit(types.REFRESH_AJAX, true)
// 		let keywords = '海阔天空'
// 		console.log(keywords)
// 		let search = await axios({
// 			method:'post',
// 			headers: { 'content-type': 'application/x-www-form-urlencoded' },
// 			params: {
// 				keywords : keywords
// 			},
// 			url: '/api/search'
// 		})
// 		console.log(search)
// 		// search = search.data
// 		commit(types.RECEIVE_DATA, {
// 			search
// 		})
		commit(types.REFRESH_AJAX, false)
	}
}
