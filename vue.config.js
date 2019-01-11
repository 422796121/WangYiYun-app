const ajax = require('superagent')
//假数据
const data = require('./mydata.json')
const carousel = data.carousel

module.exports = {
	devServer: {
		before: function(app) {
			//轮播图数据
			app.get('/api/carousel', (req, res) => {
					res.json({
						data: carousel
					})
				}),
				//推荐歌单
				app.get('/api/recommdlist', (req, res) => {
					ajax.post('http://localhost:3000/personalized')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//独家放送
				app.get('/api/exclusivelist', (req, res) => {
					ajax.post('http://localhost:3000/personalized/privatecontent')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//最新音乐
				app.get('/api/newmusiclist', (req, res) => {
					ajax.post('http://localhost:3000/personalized/newsong')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//最新MV
				app.get('/api/mvlist', (req, res) => {
					ajax.post('http://localhost:3000/personalized/mv')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//主播电台
				app.get('/api/radiolist', (req, res) => {
					ajax.post('http://localhost:3000/personalized/djprogram')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//搜索
				app.get('/api/search', (req, res) => {
					let keywords = req.query.keywords
					ajax.post('http://localhost:3000/search')
						.send({
							keywords
						})
						.end((err, data) => {
							if (err) {
								// console.log(err)
							}
							res.json({
								data: data.text
							})
						})

				}),
				//歌曲详情 音乐id
				app.get('/api/musicdetail', (req, res) => {
					let ids = req.query.musicid
					ajax.post('http://localhost:3000/song/detail')
						.send({
							ids
						})
						.end((err, data) => {
							if (err) {
								console.log('[Error]:' + err)
							}
							res.json({
								data: data.text
							})
						})
				})
		}
	}
}
