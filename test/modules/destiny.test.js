const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

process.env.INFLUXDB_HOST = 'http://localhost:11111/';
const destiny = require('../../modules/destiny');
const influx_data = JSON.parse(
    fs.readFileSync('test/modules/destiny.influxresponse.json', 'utf-8')
);

describe('destiny module tests', () => {
    it('Should return all clan members', () => {
        nock('http://localhost:11111')
            .get('/query')
            .query(true)
            .reply(200, influx_data);

        return destiny
            .getClanmemberPresence()
            .then((response) => {
                expect(response.length).to.equal(2);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('Should return specific clanmember status', () => {
        nock('http://localhost:11111')
            .get('/query')
            .query(true)
            .reply(200, influx_data);

        return destiny
            .getClanmemberPresence()
            .then((response) => {
                expect(response[0].name).to.equal('Player 1');
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
