const Influx = require('influxdb-nodejs');
const influxClient = new Influx(process.env.INFLUXDB_HOST + 'destiny');

module.exports.getClanmemberPresence = function () {
    let query = influxClient
        .query('clanmemberstatus')
        .addFunction('last', 'isOnline')
        .addGroup('displayName');
    query.start = '-30m';
    query.end = 'now()';
    return query.then((result) => {
        const memberSeries = result.results[0].series;
        console.log(memberSeries);
        if (!memberSeries) return [];
        const presence = memberSeries.map((member) => {
            return {
                name: member.tags.displayName,
                timestamp: member.values[0][0],
                isOnline: member.values[0][1],
            };
        });
        return presence;
    });
};
