import * as types from './mutation-types'
// import qs from 'qs'

export default {
	//获取Discovery数据
	async getDiscoveryData({
		commit
	}, axios) {
		commit(types.REFRESH_AJAX, true)
		let carousel = await axios.get('/api/carousel')
		carousel = carousel.data.data
		commit(types.RECEIVE_DATA, {
			carousel
		})
		await this.dispatch('getRecommdList', axios)

		await this.dispatch('getExclusiveList', axios)
		
		await this.dispatch('getNewMusicList', axios)
		
		await this.dispatch('getMVList', axios)
		
		await this.dispatch('getRadioList', axios)

		commit(types.REFRESH_AJAX, false)
	},





	//歌曲详情 音乐id
	getMusicDetail({
		commit
	}, {
		axios,
		arr,
		musicid
	}) {
		return new Promise(resolve => {
			axios.get('/api/musicdetail', {
					params: {
						musicid
					}
				})
				.then(res => {
					let data = JSON.parse(res.data.data)
					console.log(data)
					resolve()
				})
		})
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
	}


}
