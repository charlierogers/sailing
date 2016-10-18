

module.exports = function(app) {

	var rootUrl = '/api/v1';

	// --------------------- //
	//		User 			 //
	// --------------------- //

	//GET /users/:userId
	app.get(rootUrl + '/users/:userId', function(req, res) {

	});

	//PUT /users/:userId
	app.put(rootUrl + '/users/:userId', function(req, res) {

	});

	//DELETE /users/:userId
	app.delete(rootUrl + '/users/:userId', function(req, res) {

	});

	// --------------------- //
	//	User Collection  	 //
	// --------------------- //

	//GET /users
	app.get(rootUrl + '/users', function(req, res) {
		res.send('/users');
	});

	//POST /users
	app.post(rootUrl + '/users', function(req, res) {
		
	});

}