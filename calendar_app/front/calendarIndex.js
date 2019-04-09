$("document").ready(function() {
  console.log('script loaded');
  inputDays();
});

// // let firstDay = (new Date(2019,  )).getDay();
// console.log(firstDay);
const months = ["January", "February","March","April","May","June","July","August",
"September", "October", "November", "December"];
const table = document.getElementById('calendar');

const daysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
}


const inputDays = function(){
  $('td').html("");
  let index = months.indexOf($("p").html()); //index of month in months array
  let firstDay = new Date(2019, index).getDay(); //first day of the month

  let test = daysInMonth(index+1,2019);
  for (var i = firstDay, j=0; j<test ; i++, j++){
  $('td').eq(i).html(j+1) //adding days starting at first day of month
}
}
//AJAX request to server; get request to grab employee data
$("td").click(function(){
  console.log(this.className);
  var day = this.className.toString();
  $.get('http://localhost:3000/calendar', function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
    console.log(data);
    for (index in data){
      if(data[index]["schedule"]){
        if (data[index]["schedule"].replace(/\s/g,'').split(",").includes(day)){ //trim spaces and split by comma
          console.log('success');
        }
      }else{
        console.log('failure');
      }
    }
  });
});
//next button
$('#Next').click(function(){
  if ($("p").html()=="December"){
    console.log("Month is december");
    return true;
  }
  const months = ["January", "February","March","April","May","June","July","August",
  "September", "October", "November", "December"];
  var index = months.indexOf($("p").html());
  $("p").html(months[index+1]);
  inputDays();
});
//prev button
$('#Prev').click(function(){
  if ($("p").html()=="January"){
    console.log("Month is january");
    return true;
  }
  const months = ["January", "February","March","April","May","June","July","August",
  "September", "October", "November", "December"];
  var index = months.indexOf($("p").html());
  $("p").html(months[index-1]);
  inputDays();
});
