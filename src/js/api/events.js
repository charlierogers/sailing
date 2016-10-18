require('mongodb');

module.exports = function(app, db) {

	var rootUrl = '/api/v1';
	var events = db.collection("events");


	// --------------------- //
	//			Event  		 //
	// --------------------- //

	//GET /events/:eventId
	app.get(rootUrl + '/events/:eventId', function(req, res) {
		var eventId = req.params.eventId;

		res.send(eventId);
	});

	//PUT /events/:eventId
	app.put(rootUrl + '/events/:eventId', function(req, res) {

	});

	//DELETE /events/:eventId
	app.delete(rootUrl + '/events/:eventId', function(req, res) {

	});


	// --------------------- //
	//	Event Collection 	 //
	// --------------------- //

	//GET /events
	app.get(rootUrl + '/events', function(req, res) {
		events.find().toArray(function(err, items) {
			res.send(items);
		});
	});

	//POST /events
	app.post(rootUrl + '/events', function(req, res) {
		events.insert(req.body);

		res.send("inserted?");
	});

	

}