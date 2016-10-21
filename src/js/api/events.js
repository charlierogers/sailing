require('mongodb');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(router, db) {

	var events = db.collection("events");


	// --------------------- //
	//			Event  		 //
	// --------------------- //

	//GET /events/:eventId
	router.get('/events/:eventId', function(req, res) {
		var eventId = req.params.eventId;

		res.send(eventId);
	});

	//PUT /events/:eventId
	router.put('/events/:eventId', function(req, res) {

	});

	//DELETE /events/:eventId
	router.delete('/events/:eventId', function(req, res) {

	});


	// --------------------- //
	//	Event Collection 	 //
	// --------------------- //

	//GET /events
	router.get('/events', function(req, res) {
		events.find().toArray(function(err, items) {
			res.send(items);
		});
	});

	//POST /events
	router.post('/events', function(req, res) {
		events.insert(req.body);

		res.send("inserted?");
	});

	

}