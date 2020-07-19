const cheerio = require('cheerio');
const axios = require('axios');

var URL = process.env.KAT_DEFAULT_ENDPOINT || 'https://katcr.to';

var kat = {
    search: function(query) {
        const sanitized = query.replace(/[^\w\s]/gi, '');
        const formattedquery = sanitized.replace(/ /g, '/');
        const requesturl = `${URL}/usearch/${formattedquery}`;
        return axios({
            url: requesturl
        }).then(function(response) {
            const $ = cheerio.load(response.data);
            var result = $('.torrentname').map(function() {
                const anchor = $(this).find('.cellMainLink');
                return {
                    name: anchor.text().trim(),
                    url: anchor.attr('href'),
                };
            }).get();
            return result;
        });
    },
    getmagnet: function(endurl) {
        const requesturl = `${URL}/${endurl}`;
        return axios({
            url: requesturl
        }).then(function(response) {
            const $ = cheerio.load(response.data);
            const result = $('.downloadButtonGroup .kaGiantButton').first();
            return {
                magnet: $(result).attr('href')
            };
        });
    }
};

module.exports = kat;
