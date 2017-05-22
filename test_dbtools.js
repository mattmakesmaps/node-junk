var DBTools = require('./db_tools.js')
var url = 'mongodb://localhost:27017/test';

var testDB = new DBTools(url);
var docs = [{a : 1}, {a : 2}, {a : 3}]
testDB.insert_data(docs, function(result) {console.log(result)});