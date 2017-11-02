const fs = require('fs');

exports.moment = require('moment');

exports.dump = obj => JSON.stringify(obj, null, 2);
