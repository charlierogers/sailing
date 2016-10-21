require('mongodb');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(router) {


	// --------------------- //
	//		Regatta 		 //
	// --------------------- //

	//GET /regattas/:regattaId
	router.get('/regattas/:regattaId', function(req, res) {

	});

	//PUT /regattas/:regattaId
	router.put('/regattas/:regattaId', function(req, res) {

	});

	//DELETE /regattas/:regattaId
	router.delete('/regattas/:regattaId', function(req, res) {

	});


	// --------------------- //
	//	Regatta Collection 	 //
	// --------------------- //

	//GET /regattas
	router.get('/regattas', function(req, res) {
		res.send('/regattas');
	});

	//POST /regattas
	router.post('/regattas', function(req, res) {

	});


	// --------------------- //
	//	RegattaSignup 		 //
	// --------------------- //

	//GET /regattas/signups/:signupId
	router.get('/regattas/signups/:signupId', function(req, res) {

	});

	//PUT /regattas/signups/:signupId
	router.put('/regattas/signups/:signupId', function(req, res) {

	});

	//DELETE /regattas/signups/:signupId
	router.delete('/regattas/signups/:signupId', function(req, res) {

	});


	// -------------------------- 	//
	//  RegattaSignup Collection 	//
	// -------------------------- 	//

	//GET /regattas/:regattaId/signups
	router.get('/regattas/:regattaId/signups', function(req, res) {

	});

	//POST /regattas/:regattaId/signups
	router.post('/regattas/:regattaId/signups', function(req, res) {

	});

}