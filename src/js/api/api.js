var express = require('express');

module.exports = function(app, db, io) {

	var router = express.Router();

	require('./practices.js')(router, db, io);
	require('./events.js')(router, db);
	require('./users.js')(router, db);
	require('./regattas.js')(router);

	app.use('/api/v1.0', router);

}