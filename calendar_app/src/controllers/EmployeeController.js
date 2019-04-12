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
      console.log('retrieved employees');
    }
  });
}

const getDaysEmployees = (req, res) => {
  Employee.find({"schedule": req.params.id}, (err, employees) => {
    if (err) {
      res.send(err);
      console.log('Could not find employees for that day.')
    }else{
      res.json(employees);
      console.log(employees.firstName);
      console.log('Found employees for that day');
    }
  });
}

module.exports = {addNewEmployee, getAllEmployees, getDaysEmployees};
