//获取数据
export const apiData = state => state.data

//播放状态
export const playState = state => state.musicPlayer.playState

export const currentTime = state => {
	return state.musicPlayer.playerTimer.currentTime
}

//歌词显示
export const lyric = (state) => {
	let currentTime = state.musicPlayer.playerTimer.currentTime
	let result = state.musicPlayer.lyric
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
}


