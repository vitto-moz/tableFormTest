var express = require('express');
var app = express();
var cors = require('cors');

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors()); //fix policy issue - request to external server

app.use(express.static('./'));
app.get(' ', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/addEmployee', function(req, res) {
    console.info("req.body ", req.body);
    console.info("tableData before", tableData);
    if (req.body.firstName !== "") {
      tableData.push(req.body);
      console.info("tableData after", tableData);
      res.end('It worked!');
    }
    // res.end(JSON.stringify(response));

});

app.post('/deleteChecked', function(req, res) {
    console.info("req.body deleteChecked", req.body);
    for (var i = req.body.length - 1; i >= 0; i--) {
          tableData.splice(req.body[i], 1, "");
    }

    for (var n = tableData.length - 1; n >= 0; n--) {
          if (tableData[n] === "") {
           tableData.splice(n, 1);
          }
    }

    res.end('It worked!');
    // res.end(JSON.stringify(response));

});

app.post('/clearTable', function(req, res) {
    tableData = [];
    res.end('It worked!');
});

app.get('/table', function (req, res) {
   // Prepare output in JSON format
   response = tableData;
   res.end(JSON.stringify(response));
})

app.get('/get3', function (req, res) {
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

/*app.get('/get3', function (req, res) {
   // Prepare output in JSON format
   res.set('Content-Type', 'text/plain');
   response = "some text 3";
   res.end(JSON.stringify(response));
})
*/
var server = app.listen(3001, 'localhost', function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("http://localhost:3001");

})