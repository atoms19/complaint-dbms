const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

async function getDbConnection() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: path.join(__dirname, 'complaints.db'),
      driver: sqlite3.Database
    });
  }
  return dbInstance;
}

module.exports = { getDbConnection };
