//获取数据
export const apiData = state => state.data

//播放状态
export const playState = state => state.musicPlayer.playState

// 播放时间
export const currentTime = state => {
	return state.musicPlayer.playerTimer.currentTime
}
//时间轴百分比
export const timePercent = state => state.musicPlayer.playerTimer.percent

//歌词显示
export const lyric = (state) => {
	let currentTime = state.musicPlayer.playerTimer.currentTime
	let result = state.musicPlayer.lyric
	if (result != null) {
		for (let j in result) {
			let obj = result[j]
			if (currentTime > obj.time) {
				continue
			} else {
				if (j > 0) {
					return result[j - 1].content
				} else {
					return null
				}
			}
		}
	} else {
		return null
	}

}

// 歌单内容
export const songList = state => state.songList

//播放列表
export const playList = state => state.musicPlayer.playList
//播放序号
export const playIndex = state => state.musicPlayer.playIndex
//播放详情
export const playImfo = state => {
	let playImfo = {}
	let list = state.musicPlayer.playList
	let index = state.musicPlayer.playIndex
	if (state.musicPlayer.defaultPlay === false && state.showBottomPlayer === true) {
		if (state.audioType === 'music') {
			playImfo['musicId'] = list[index].musicId
			playImfo['img'] = list[index].imfo.songs[0].al.picUrl
			playImfo['bg'] = list[index].imfo.songs[0].al.pic
			playImfo['name'] = list[index].imfo.songs[0].name
			playImfo['author'] = list[index].imfo.songs[0].ar[0].name
		} else {
			playImfo['musicId'] = list[index].imfo.id
			playImfo['img'] = list[index].imfo.coverUrl
			playImfo['bg'] = list[index].imfo.blurCoverUrl
			playImfo['name'] = list[index].imfo.name
			playImfo['author'] = list[index].imfo.dj.nickname
		}

	}
	return playImfo
}

//底部默认不显示状态
export const defaultPlay = state => state.musicPlayer.defaultPlay

// 播放器工具
export const playerTools = state => state.musicPlayer.tools

//播放模式
export const playType = state => state.musicPlayer.playType

//播放页时间滑条
export const playerTimer = state => {
	let timer = state.musicPlayer.playerTimer
	let timestamp = {
		duration: '',
		currentTime: '',
		percent: 0
	}
	for (let i in timer) {
		if (i === 'percent') {
			continue
		}
		let secondTime = parseInt(timer[i]) // 秒
		let minuteTime = 0 // 分
		let hourTime = 0 // 小时
		if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
			//获取分钟，除以60取整数，得到整数分钟
			minuteTime = parseInt(secondTime / 60)
			//获取秒数，秒数取佘，得到整数秒数
			secondTime = parseInt(secondTime % 60)
			//如果分钟大于60，将分钟转换成小时
			if (minuteTime > 60) {
				//获取小时，获取分钟除以60，得到整数小时
				hourTime = parseInt(minuteTime / 60)
				//获取小时后取佘的分，获取分钟除以60取佘的分
				minuteTime = parseInt(minuteTime % 60)
			}
		}
		let result = ''
		if (secondTime < 10) {
			result = '0' + parseInt(secondTime)
		} else {
			result = '' + parseInt(secondTime)
		}

		if (minuteTime > 0) {
			if (minuteTime < 10) {
				result = '0' + parseInt(minuteTime) + ':' + result
			} else {
				result = '' + parseInt(minuteTime) + ':' + result
			}
		} else {
			result = '00:' + result
		}
		if (hourTime > 0) {
			if (hourTime < 10) {
				result = '0' + parseInt(hourTime) + ':' + result
			} else {
				result = '' + parseInt(hourTime) + ':' + result
			}
		}
		timestamp[i] = result
	}
	timestamp.percent = timer.percent
	return timestamp
}

//播放类型
export const audioType = state => {
	let type = state.audioType
	if(type === 'music'){
		return 0
	}else{
		return 1
	}
}
