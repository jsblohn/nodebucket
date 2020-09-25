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

// Employee Schema, Sprint 1
let employeeSchema = new Schema({
    empId: {type: Number, required: true, unique: true, dropDups: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  }, {collection: 'employees'});

module.exports = mongoose.model('Employee', employeeSchema);
