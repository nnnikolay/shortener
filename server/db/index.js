const MongoClient = require('mongodb').MongoClient;
const mongoHost = 'mongos1'

let db;

const database = async () => {
    if (db) {
        return db;
    }
    try {
        const client = await MongoClient.connect(
            'mongodb://' + mongoHost + ':27017/shortenerDb',
            { useUnifiedTopology: true }
        )
        console.log('Connected to the DB')
        db = client.db('shortenerDb')
    } catch (err) {
        console.error(err.message)
    }
    return db
};

module.exports = database