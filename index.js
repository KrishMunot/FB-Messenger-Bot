var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('Hello World! I am new born bot!')
})

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post(console.log())

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
