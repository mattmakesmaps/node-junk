var DBTools = require('./db_tools.js')
var url = 'mongodb://localhost:27017/test';

var testDB = new DBTools(url);

testDB.connect(null, function() {
    console.log('success!');
});