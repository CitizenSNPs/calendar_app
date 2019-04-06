import 'whatwg-fetch';

class HttpService {
  getEmployeeData = () => {
    fetch('http://localhost:3000/calendar').then(response => {
      console.log(response.json());
    });
  }
}

export default HttpService;
