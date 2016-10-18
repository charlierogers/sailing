

module.exports = function(app) {

	var rootUrl = '/api/v1';


	// --------------------- //
	//		Regatta 		 //
	// --------------------- //

	//GET /regattas/:regattaId
	app.get(rootUrl + '/regattas/:regattaId', function(req, res) {

	});

	//PUT /regattas/:regattaId
	app.put(rootUrl + '/regattas/:regattaId', function(req, res) {

	});

	//DELETE /regattas/:regattaId
	app.delete(rootUrl + '/regattas/:regattaId', function(req, res) {

	});


	// --------------------- //
	//	Regatta Collection 	 //
	// --------------------- //

	//GET /regattas
	app.get(rootUrl + '/regattas', function(req, res) {
		res.send('/regattas');
	});

	//POST /regattas
	app.post(rootUrl + '/regattas', function(req, res) {

	});


	// --------------------- //
	//	RegattaSignup 		 //
	// --------------------- //

	//GET /regattas/signups/:signupId
	app.get(rootUrl + '/regattas/signups/:signupId', function(req, res) {

	});

	//PUT /regattas/signups/:signupId
	app.put(rootUrl + '/regattas/signups/:signupId', function(req, res) {

	});

	//DELETE /regattas/signups/:signupId
	app.delete(rootUrl + '/regattas/signups/:signupId', function(req, res) {

	});


	// -------------------------- 	//
	//  RegattaSignup Collection 	//
	// -------------------------- 	//

	//GET /regattas/:regattaId/signups
	app.get(rootUrl + '/regattas/:regattaId/signups', function(req, res) {

	});

	//POST /regattas/:regattaId/signups
	app.post(rootUrl + '/regattas/:regattaId/signups', function(req, res) {

	});

}