let mongoose = require('mongoose');
const key = require('./key');
class Database {
    constructor() {
    }
    /**
     * @returns {Database}
     */
    static get instance() {
        if (this._cache == null) {
            this._cache = new Database();
        }
        return this._cache;
    }
    async connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect(key.CONNECTIONSTRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const connection = mongoose.connection;
            connection.on("error", (err) => {
                reject(err);
            });
            connection.once("open", () => {
                console.log(`Connection to database!`)
                resolve(connection);
            });
        });
    }
}

module.exports = Database
