const app = require('express')
const router = app.Router()

router.post('/', function(request, response) {
	let username = request.body.username
	let password = request.body.password

	if (username && password) {
        // Authenticate the user
        request.session.loggedin = true
        request.session.username = username
        // Redirect to home page
        response.send({username: username})
        response.end()
    } else {
		response.send('Please enter Username and Password!')
		response.end()
	}
})

module.exports = router
