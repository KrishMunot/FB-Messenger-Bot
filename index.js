var express = require('express')
var app = express()
var request = require('request')
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000))

app.configure(function() {
	app.use(express.bodyParser())
	app.use(app.router)
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
 
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
	messaging_events = req.body.entry[0].messaging
 	for (i = 0; i < messaging_events.length; i++) {
 		event = req.body.entry[0].messaging[i]
 		sender = event.sender.id
 		if (event.message && event.message.text) {
 			text = event.message.text
 			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
 		}
 	}
	res.sendStatus(200)
})

function sendTextMessage(sender, text) {
	messageData = {
		text:text
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
