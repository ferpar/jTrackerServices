const fs = require("fs");

function readDb(dbName = 'db.json') {
    const data = fs.readFileSync(dbName, 'utf8');
    return JSON.parse(data);
}

function writeDb(data, dbName = 'db.json') {
    if (!data) return console.log('No object to write to db');
    try {
        fs.writeFileSync(dbName, JSON.stringify(data))
        return console.log('save success')
    
    } catch (err) {
        return console.log('save failed', err)
    }
}

class jsonDb {
    constructor(dbName = 'db.json') {
        this.dbName = dbName;
    }

    readDb() {
        const data = fs.readFileSync(this.dbName, 'utf8');
        return JSON.parse(data);
    }

    writeDb(data) {
        if (!data) return console.log('No object to write to db');
        try {
            fs.writeFileSync(this.dbName, JSON.stringify(data))
            return console.log('save success')
        
        } catch (err) {
            return console.log('save failed', err)
        }
    }
}

module.exports = { readDb, writeDb, jsonDb }