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

	router.get('/practices/signups/testData', function(req, res) {

		// practiceSignups.remove();

		// practiceSignups.insertMany([
		// 		{
		// 			practiceId: "580988af18f3f93ca19c3428",
		// 			user: {
		// 				name: "Mason Wolters"
		// 			},
		// 			parentSignupId: "",
		// 			passengerLimit: 6
		// 		},
		// 		{
		// 			practiceId: "580988af18f3f93ca19c3429",
		// 			user: {
		// 				name: "Lane Tobin"
		// 			},
		// 			parentSignupId: "",
		// 			passengerLimit: 5
		// 		}
		// 	]);

		practiceSignups.insertMany([
				{
					practiceId: "580988af18f3f93ca19c3428",
					user: {
						name: "Charlie Rogers"
					},
					parentSignupId: "5809895682bbfc3cd964f66b",
					passengerLimit: 0
				},
				{
					practiceId: "580988af18f3f93ca19c3428",
					user: {
						name: "Mike Gapuz"
					},
					parentSignupId: "5809895682bbfc3cd964f66b",
					passengerLimit: 0
				},
				{
					practiceId: "580988af18f3f93ca19c3429",
					user: {
						name: "Amy Baer"
					},
					parentSignupId: "5809895682bbfc3cd964f66c",
					passengerLimit: 0
				}
			]);
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
						return signup["practiceId"] == practice._id.toString() && signup["parentSignupId"] == "" && signup["passengerLimit"] != 0;
					});

					_.each(cars, function(car) {
						var childSignups = _.filter(signups, function(signup) {
							return signup["practiceId"] == practice._id.toString() && signup["parentSignupId"] == car._id.toString();
						});
						// car["passengers"] = _.map(childSignups, function(signup) {
						// 	return {
						// 		name: signup["user"]["name"]
						// 	}
						// });
						car["passengers"] = childSignups;
					});

					practice["signups"] = cars;
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
		console.log(req.body);
		practiceSignups.insert(req.body, function(err, result) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				console.log("result: ");
				console.log(result.ops[0]);
				//result.ops[0] COULD BREAK
				res.send(result.ops[0]);
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