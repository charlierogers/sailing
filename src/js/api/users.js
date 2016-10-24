require('mongodb');

module.exports = function(router, db) {

	var users = db.collection("users");

	// --------------------- //
	//		User 			 //
	// --------------------- //

	//GET /users/:userId
	router.get('/users/:userId', function(req, res) {
		users.findOne({
			_id: new ObjectId(req.params.userId)
		}, function(err, user) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(user);
			}
		});
	});

	//PUT /users/:userId
	router.put('/users/:userId', function(req, res) {

	});

	//DELETE /users/:userId
	router.delete('/users/:userId', function(req, res) {

	});

	// --------------------- //
	//	User Collection  	 //
	// --------------------- //

	//GET /users
	router.get('/users', function(req, res) {
		users.find().toArray(function(err, items) {
			res.send(items);
		});
	});

	//POST /users
	router.post('/users', function(req, res) {
		
	});

}