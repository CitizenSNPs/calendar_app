var {addNewEmployee, getAllEmployees, getDaysEmployees } = require('../controllers/EmployeeController.js');

const routes = (app) => {
  app.route('/calendar')
  .get(getAllEmployees)
  .post(addNewEmployee);

  app.route('/calendar/:id')
  .get(getDaysEmployees);
}

module.exports = routes;
