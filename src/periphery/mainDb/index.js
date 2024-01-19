const dbPool = require('../dbPool');
const makeMainDb = require('./mainDbFactory');
const mainDb = makeMainDb({ dbPool });

module.exports = mainDb;