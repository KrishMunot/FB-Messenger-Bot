var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.configure(function() {
	app.use(express.bodyParser())
	app.use(app.router)
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extendd: false}))
 
 // parse application/json
 app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Hello World! I am new born bot!')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
	console.log(req.body)
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
