var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  schedule:{
    type: String
  }
});

module.exports = EmployeeSchema;
