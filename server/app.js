/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   22 September 2020
; Modified By: Janet Blohn
; Description: nodebucket project
; Server module for Node.js
============================================
*/
/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee'); // get Employee model

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// Database connection string to MongoDB
const MongoDB = 'mongodb+srv://nodeUser:B8ZRw1acvUFiukOt@cluster0.v4dbb.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(MongoDB, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful!`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error.'))

db.once('open', function() {
  console.log('Connection to MongoDB Atlas successful!');
})

/**
 * API(s) go here...
 */

/* Get Employees by their ID */
app.get("/api/employees/:empId", async(req, res) => {

    try {
      Employee.findOne({empId: req.params.empId}, function(err, employee) {
        if(err) {
          console.log(err);
          res.status(500).send({
            "message": "Internal server error!"
          })
        } else {
          console.log(employee);
          res.json(employee);
        }
      })

    } catch (e)  {
   console.log(e);
   res.status(500).send ({
     "message": "Internal server error!"
   })
 }
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
