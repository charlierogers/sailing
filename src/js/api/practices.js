require('mongodb');
_ = require('underscore');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(router, db) {

	var practices = db.collection("practices");
	var practiceSignups = db.collection("practiceSignups");

	//GET /practices/testData
	router.get('/practices/testData', function(req, res) {
		practices.remove();

		practices.insert({
			startDate: "2016-10-20T03:00:00",
			endDate: "2016-10-20T07:00:00",
			title: "Practice",
			description: "Boat handling"
		});

		practices.insert({
			startDate: "2016-10-25T03:00:00",
			endDate: "2016-10-25T07:00:00",
			title: "Practice",
			description: "Boat handling"
		});

		practices.insert({
			startDate: "2016-10-27T03:00:00",
			endDate: "2016-10-27T07:00:00",
			title: "Practice",
			description: "Boat handling"
		});

		practiceSignups

		res.send("done");
	});

	// --------------------- //
	//		Practice 		 //
	// --------------------- //

	//GET /practices/:practiceId
	router.get('/practices/:practiceId', function(req, res) {

		practices.findOne({
			_id: ObjectId(req.params.practiceId)
		}, function(err, item) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(item);
			}
		});

	});

	//PUT /practices/:practiceId
	router.put('/practices/:practiceId', function(req, res) {
		console.log('PUT practices/'+req.params.practiceId);
		console.log(req.body);
		res.send('test');
	});

	//DELETE /practices/:practiceId
	router.delete('/practices/:practiceId', function(req, res) {

	});


	// --------------------- //
	//	Practice Collection  //
	// --------------------- //

	//GET /practices
	router.get('/practices', function(req, res) {

		practices.find().toArray(function(err, items) {

			var practiceIds = _.map(items, function(practice) {
				return practice._id.toString();
			});

			practiceSignups.find({practiceId: {
				$in: practiceIds
			}}).toArray(function(signupsErr, signups) {

				_.each(items, function(practice) {
					var cars = _.filter(signups, function(signup) {
						return signup["practiceId"] == practice._id.toString() 
								&& signup["parentSignupId"] == "" 
								&& signup["passengerLimit"] != 0;
					});

					_.each(cars, function(car) {
						var childSignups = _.filter(signups, function(signup) {
							return signup["practiceId"] == practice._id.toString() 
									&& signup["parentSignupId"] == car._id.toString();
						});
						car["passengers"] = childSignups;
					});

					practice["signups"] = cars;

					var carIds = _.map(cars, function(car) {
						return car._id.toString();
					});
					var pool = _.filter(signups, function(signup) {
						return signup["practiceId"] == practice._id.toString() 
								&& signup["passengerLimit"] == 0
								&& !_.contains(carIds, signup["parentSignupId"])
					});
					practice["pool"] = pool;
				});

				if (err) {
					res.status(500).send(err);
				} else {
					res.send(items);
				}
			});
			
		});

	});

	//POST /practices
	router.post('/practices', function(req, res) {

		practices.insert({
			title: req.body.title
		}, function(err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(item);
			}
		});

	});


	// --------------------- //
	//	  PracticeSignup 	 //
	// --------------------- //

	//GET /practices/signups/:signupId
	router.get('/practices/signups/:signupId', function(req, res) {

	});

	//PUT /practices/signups/:signupId
	router.put('/practices/signups/:signupId', function(req, res) {

	});

	//DELETE /practices/signups/:signupId
	router.put('/practices/signups/:signupId', function(req, res) {

	});


	// -------------------------  //
	//	PracticeSignup Collection //
	// -------------------------  //

	//GET /practices/:practiceId/signups
	router.get('/practices/:practiceId/signups', function(req, res) {

	});

	router.post('/practices/signups', function(req, res) {
		console.log("POST /practices/signups");
		practiceSignups.insert(req.body, function(err, result) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				//result.ops[0] COULD BREAK
				var item = result.ops[0];

				var additionalPassengersCount = req.body['passengerLimit']-1;
				practiceSignups.find({
					practiceId: '580988af18f3f93ca19c3428'
				},
									{},
									{limit: 3}).forEach(function(e) {
										console.log(e);
									});

				res.send(item);
			}
		});
	});

	router.delete('/practices/signups/:signupId', function(req, res) {
		console.log("DELETE /practices/signups/" + req.params.signupId);
		console.log(req.body);
		practiceSignups.remove({
			_id: ObjectId(req.params.signupId)
		}, function(err, result) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				res.send("success");
			}
		});
	});

	//POST /practices/:practiceId/signups
	router.post('/practices/:practiceId/signups', function(req, res) {
		console.log("POST /practices/" + req.params.practiceId + "/signups");
		console.log(req.body);
		practiceSignups.insert(req.body, function(err, result) {
			res.send(result);
		});

	});

}