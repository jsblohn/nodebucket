/*
=============================================================
 Title:  employee.js
 Author: Professor Krasso
 Date:   22 September 2020
 Modified By: Janet Blohn
 Description: nodebucket project
 JavaScript file for the data models
=============================================================
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

// Employee Schema
let employeeSchema = new Schema({
    empId: {type: Number, unique: true, dropDups: true},
    firstName: {type: String},
    lastName: {type: String},
    toDos: [Item],
    done: [Item]
  }, {collection: 'employees'});

module.exports = mongoose.model('Employee', employeeSchema);
