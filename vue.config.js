const ajax = require('superagent')
const querystring = require('querystring')
//假数据
const data = require('./mydata.json')
const carousel = data.carousel


module.exports = {
	devServer: {
		before: function(app) {
			// 手机登录
			app.post('/api/phonelogin', (req, response) => {
					var alldata = ''
					req.addListener('data', function(chunk) {
						alldata += chunk
					})
					req.addListener('end', function() {
						var datastring = alldata.toString()
						var data = JSON.parse(datastring)
						const agent = ajax.agent()
						agent.post('http://localhost:3000/login/cellphone')
							.set({
								'Access-Control-Allow-Origin': 'http://localhost:8080',
								'Access-Control-Allow-Headers': 'Content-Type',
								'Access-Control-Allow-Credentials': true
							})
							.send({
								phone: data.phone,
								password: data.password
							})
							.then(res => {
								cookie = res.headers["set-cookie"];
								response.setHeader('set-cookie', cookie);
								response.json({
									data: res.text
								})
							})
					})

				}),
				// 邮箱登录
				app.post('/api/emaillogin', (req, response) => {
					var alldata = ''
					req.addListener('data', function(chunk) {
						alldata += chunk
					})
					req.addListener('end', function() {
						var datastring = alldata.toString()
						var data = JSON.parse(datastring)
						const agent = ajax.agent()
						agent.post('http://localhost:3000/login/cellphone')
							.set({
								'Access-Control-Allow-Origin': 'http://localhost:8080',
								'Access-Control-Allow-Headers': 'Content-Type',
								'Access-Control-Allow-Credentials': true
							})
							.send({
								email: data.email,
								password: data.password
							})
							.then(res => {
								cookie = res.headers["set-cookie"];
								response.setHeader('set-cookie', cookie);
								response.json({
									data: res.text
								})
							})
					})

				}),
				//用户详情
				app.get('/api/userdetail', (req, res) => {
					let id = req.query.userid
					ajax.post('http://localhost:3000/user/detail')
						.send({
							uid: id
						})
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//用户歌单
				app.get('/api/playlist', (req, res) => {
					let id = req.query.userid
					ajax.post('http://localhost:3000/user/playlist')
						.send({
							uid: id
						})
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//歌单详情
				app.get('/api/songlistdetail', (req, res) => {
					let id = req.query.listid
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/playlist/detail?id=${id}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				})
			//朋友动态
			app.get('/api/friendevent', (req, res) => {
					ajax.get('http://localhost:3000/event')
						.set({
							'Access-Control-Allow-Origin': '*',
							'Location': 'http://localhost:8080/discover/friends',
							'Access-Control-Allow-Credentials': true
						})
						.end((err, data) => {
							res.setHeader('Location', 'http://localhost:8080/discover/friends')
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),

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
				//推荐MV
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
				//朋友动态
				app.get('/api/friendevent', (req, res) => {
					ajax.post('http://localhost:3000/event')
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
				app.get('/api/newvideolist', (req, res) => {
					var limit = req.query.limit
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/mv/first?limit=${limit}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//视频播放连接
				app.get('/api/videourl', (req, res) => {
					var id = req.query.id
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/mv/url?id=${id}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//mv详情
				app.get('/api/mvdetail', (req, res) => {
					var mvid = req.query.id
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/mv/detail?mvid=${mvid}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				// 相似mv
				app.get('/api/simimv', (req, res) => {
					var mvid = req.query.id
					ajax.post('http://localhost:3000/simi/mv')
						.send({
							mvid
						})
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),

				//电台
				//电台分类
				app.get('/api/typeradio', (req, res) => {
					ajax.post('http://localhost:3000/dj/catelist')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//电台推荐
				app.get('/api/recommdradio', (req, res) => {
					ajax.post('http://localhost:3000/dj/recommend')
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//电台各个分类列表
				app.get('/api/typeradio/type', (req, res) => {
					let type = req.query.type
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/dj/recommend/type?type=${type}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//电台节目列表 电台id 单页条数
				app.get('/api/raidolistdetail', (req, res) => {
					let id = req.query.id
					let timestamp = req.query.timestamp
					let limit = req.query.limit
					ajax.get(`http://localhost:3000/dj/program?rid=${id}&limit=${limit}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})
				})

			//歌词
			app.get('/api/lyric', (req, res) => {
					let id = req.query.musicid
					ajax.post('http://localhost:3000/lyric')
						.send({
							id
						})
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
								console.log(err)
							}
							res.json({
								data: data.text
							})
						})

				}),
				//歌曲详情 音乐id
				app.get('/api/musicdetail', (req, res) => {
					let ids = req.query.musicId
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/song/detail?ids=${ids}&timestamp=${timestamp}`)
						.end((err, data) => {
							if (err) {
								console.log('[Error]:' + err)
							}
							res.json({
								data: data.text
							})
						})
				}),
				//精选歌单 数据条数limit 类型order 标签cat
				app.get('/api/goodsonglist', (req, res) => {
					let limit = req.query.limit
					let order = req.query.order
					let timestamp = req.query.timestamp
					ajax.get(`http://localhost:3000/top/playlist?limit=${limit}&order=${order}&timestamp=${timestamp}`)
						// 						.send({
						// 							limit,
						// 							order
						// 						})
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
