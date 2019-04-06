var {addNewEmployee, getAllEmployees } = require('../controllers/EmployeeController.js');

const routes = (app) => {
  app.route('/calendar')
  .get(getAllEmployees)
  .post(addNewEmployee);
}

module.exports = routes;
