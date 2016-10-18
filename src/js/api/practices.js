

module.exports = function(app) {

	var rootUrl = '/api/v1';

	// --------------------- //
	//		Practice 		 //
	// --------------------- //

	//GET /practices/:practiceId
	app.get(rootUrl + '/practices/:practiceId', function(req, res) {
		res.send({
			id: req.params.practiceId,
			title: "Practice test title"
		});
	});

	//PUT /practices/:practiceId
	app.put(rootUrl + '/practices/:practiceId', function(req, res) {
		console.log('PUT practices/'+req.params.practiceId);
		console.log(req.body);
		res.send('test');
	});

	//DELETE /practices/:practiceId
	app.delete(rootUrl + '/practices/:practiceId', function(req, res) {

	});


	// --------------------- //
	//	Practice Collection  //
	// --------------------- //

	//GET /practices
	app.get(rootUrl + '/practices', function(req, res) {
		res.send([

		{
			id: 1,
			title: "Practice 1"
		},
		{
			id: 2,
			title: "Practice 2"
		},
		{
			id: 3,
			title: "Practice 3"
		}

			]);
	});

	//POST /practices
	app.post(rootUrl + '/practices', function(req, res) {

		console.log('POST /practices');
		console.log(req.body);

		res.send({
			id: 98,
			title: req.body.title
		});

	});


	// --------------------- //
	//	  PracticeSignup 	 //
	// --------------------- //

	//GET /practices/signups/:signupId
	app.get(rootUrl + '/practices/signups/:signupId', function(req, res) {

	});

	//PUT /practices/signups/:signupId
	app.put(rootUrl + '/practices/signups/:signupId', function(req, res) {

	});

	//DELETE /practices/signups/:signupId
	app.put(rootUrl + '/practices/signups/:signupId', function(req, res) {

	});


	// -------------------------  //
	//	PracticeSignup Collection //
	// -------------------------  //

	//GET /practices/:practiceId/signups
	app.get(rootUrl + '/practices/:practiceId/signups', function(req, res) {

	});

	//POST /practices/:practiceId/signups
	app.post(rootUrl + '/practices/:practiceId/signups', function(req, res) {
		
	});

}