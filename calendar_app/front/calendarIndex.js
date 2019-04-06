import 'whatwg-fetch';

  const getEmployeeData = () => {
    fetch('http://localhost:3000/calendar').then(response => {
      console.log(response.json());
    });
  }
}
