const ajax = require('superagent')

module.exports = {
	devServer: {
		before: function(app) {
			app.post('/api/search', (req, res) => {
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

			})

		}
	}
}
