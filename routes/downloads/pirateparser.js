var cheerio = require('cheerio');
var request = require('request');

var URL = process.env.THEPIRATEBAY_DEFAULT_ENDPOINT || 'https://proxpiratebay.info';

var pirateparser = {
    search: function(query, callback) {
        var sanitized = query.replace(/[^\w\s]/gi, '');
        var formattedquery = sanitized.replace(/ /g, '+');
        var requesturl = URL + '/s/?q=' + formattedquery + '&category=0&page=0&orderby=99';
        request(requesturl, { json: true }, function(err, res, body) {
            var $ = cheerio.load(body);
            var result = $('.detLink').map(function() {
                return {
                    name: $(this).text(),
                    url: $(this).attr('href'),
                };
            }).get();
            callback(result);
        });
    },
    getmagnet: function(endurl, callback) {
        request(URL + endurl, { json: true }, function(err, res, body) {
            var $ = cheerio.load(body);
            var result = $('div.download > a').first();
            callback({
                magnet: $(result).attr('href')
            });
        });
    }
}

module.exports = pirateparser;
