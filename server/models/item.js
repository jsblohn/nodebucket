/*
=============================================================
 Title:  item.js
 Author: Professor Krasso
 Date:   28 September 2020
 Modified By: Janet Blohn
 Description: nodebucket project
 JavaScript file for the item data model
=============================================================
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Item Schema
let itemSchema = new Schema({
  text: {type: String}
});

module.exports = itemSchema;
