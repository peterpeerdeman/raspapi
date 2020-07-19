var kat = require('../lib/kat');

module.exports.search = function(query) {
    return kat.search(query).then(function(list) {
        return(list);
    });
};
