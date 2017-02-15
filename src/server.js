var express = require('express');
var app = express();
var cors = require('cors');

var bodyParser = require('body-parser'); // parse urlencoded request bodies into req.body
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors()); //fix policy issue - request to external server

app.use(express.static('./'));
app.get(' ', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

// method for adding employee
app.post('/addEmployee', function(req, res) {
    if (req.body.firstName !== "") {
      tableData.push(req.body);
      res.end('It worked!');
    }

});

// method for deleting checked employees
app.post('/deleteChecked', function(req, res) {
    for (var i = req.body.length - 1; i >= 0; i--) {
          tableData.splice(req.body[i], 1, "");
    }

    for (var n = tableData.length - 1; n >= 0; n--) {
          if (tableData[n] === "") {
           tableData.splice(n, 1);
          }
    }

    res.end('Checked employees deleted!');
});

// method for deleting all employees
app.post('/clearTable', function(req, res) {
    tableData = [];
    res.end('It worked!');
});

// fill table with emolyee - current state
app.get('/table', function (req, res) {
   // Prepare output in JSON format
   response = tableData;
   res.end(JSON.stringify(response));
})

// method - response users info object 
app.get('/getUsers', function (req, res) {
   // Prepare output in JSON format
   response = {users: [
         {
            "name": "user1",
            "password": '1'
         },
         {
            "name": "user2",
            "password": '2' 
         },
      ]           
   };

   res.end(JSON.stringify(response));
})


// initial table state (employees)
var tableData = [
         {
            "firstName": "John",
            "secondName": "Dayle",
            "position": "Investor Functionality Coordinator"
         },
         {
            "firstName": "Liana",
            "secondName": "Crooks",
            "position": "International Applications Consultant" 
         },
         {
            "firstName": "Cortez",
            "secondName": "Pacocha",
            "position": "Forward Branding Developer" 
         },
      ] 

// server config
var server = app.listen(3001, 'localhost', function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("http://localhost:3001");

})