const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        hello: String
        destiny: Destiny
        car: Car
        cluster: Cluster
        music: Music
    }

    type Destiny {
        clanmemberPresence: [DestinyPresence]
    }

    type DestinyPresence {
        name: String
        isOnline: Boolean
        timestamp: String
    }

    type Car {
        charge: CarCharge
    }

    type CarCharge {
        batteryLevel: Int
        timestamp: String
    }

    type Cluster {
        portTable: [ClusterPort]
    }

    type ClusterPort {
        name: String
        up: Boolean
        port_poe: Boolean
        port_idx: Int
        poe_enable: Boolean
        poe_power: String
        poe_current: String
        poe_voltage: String
        portconf_id: String
    }

    type Music {
        currentSong: CurrentSong
    }
    type CurrentSong {
        name: String
        file: String
        last_modified: String
        artist: String
        albumartist: String
        title: String
        album: String
        track: Int
        date: String
        genre: String
        time: Int
        duration: Float
        pos: Int
        id: Int
    }
    enum MusicCommand {
        PLAY
        PAUSE
        NEXT
        PREVIOUS
        STOP
    }

    type Mutation {
        cluster_scale(instances: Int!): [ClusterPort]
        music_control(command: MusicCommand!): Boolean
    }
`;
