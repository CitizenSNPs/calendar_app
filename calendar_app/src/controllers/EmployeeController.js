var mongoose = require('mongoose');
var EmployeeSchema = require('../models/employeeModel');

const Employee = mongoose.model('Employee', EmployeeSchema);

const addNewEmployee = (req, res) => {
  let employee = new Employee(req.body);
  employee.save((err, employee) => {
    if (err) {
      res.send(err);
      console.log('Error creating new employee.')
    }else{
      res.json(employee);
    }
  });
}

const getAllEmployees = (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      res.send(err);
      console.log('Could not retrieve employees.')
    }else{
      res.json(employees);
    }
  });
}

module.exports = {addNewEmployee, getAllEmployees}
