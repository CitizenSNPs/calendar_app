$("document").ready(function() {
  console.log('script loaded');
  inputDays();
  createOptionMenu();
  daysChecked();
  tooltipShow();
});

//creating option menu
const createOptionMenu = function(){
  const select = document.getElementsByTagName('select');
  $.get('http://localhost:3000/calendar', function(data, status){
      console.log(data);
      for (index in data){
        if(data[index]["firstName"] && data[index]["lastName"] && data[index]["schedule"]){
          let opt = document.createElement('option');
          opt.value = data[index]["_id"];
          opt.innerHTML = `${data[index]["firstName"]} ${data[index]["lastName"]}`;
          select[0].appendChild(opt);

        }else{
          console.log(`Employee id: ${data[index]["_id"]} is not a valid employee`)
        }
      }
    });
}

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


//AJAX request to server; GET request to grab employee data
$("td").click(function(){
  console.log(this.className);
  var day = this.className.toString();
  $.get('http://localhost:3000/calendar', function(data, status){
    console.log(data);
    for (index in data){
      if(data[index]["schedule"]){
        if (data[index]["schedule"].replace(/\s/g,'').split(",").includes(day)){ //trim spaces and split by comma
          console.log(`${data[index]['firstName']} ${data[index]['lastName']}`);
        }
      }else{
        console.log("day not in employee's schedule");
      }
    }
  });
});

var tooltipShow = function(){
  var daysEmployees = [];
  $('td').on({
  "click": function() {
    var cellClass = $(this.className);
    console.log(cellClass.selector);
    console.log(typeof cellClass.selector);
    $.get( "http://localhost:3000/calendar")
    .done(function(data) {
      console.log($(this.className));
      for (index in data){
        if(data[index]["schedule"]){
          if (data[index]["schedule"].replace(/\s/g,'').split(",").includes(cellClass.selector)){
            daysEmployees.push(`${data[index]['firstName']} ${data[index]['lastName']}`);
          } else {
            continue;
          }
        }
      }
 });
    var daysEmployeesString = daysEmployees.toString();
    $(this).tooltip({ items: "td", content: daysEmployeesString});
    $(this).tooltip("open");
    daysEmployees = [];
  }
});
}


$("td").hover(function(){
  $(this).css("background-color", "gray");
}, function(){
  $(this).css("background-color", "white")
});


// const tooptips = function(){
//   $('td').on({
//   "click": function() {
//     $(this).tooltip({ items: "td", content: "Displaying on click"});
//     $(this).tooltip("open");
//   }
// });
// }

//AJAX request to server; POST new employees to server
$('#newEmployeeSubmit').click(function(){
  if (!($('.formText')[0].value) || !($('.formText')[1].value)){
    console.log('Could not create new employee: Please enter a valid first and last name');
  } else if (!(checked())){
    console.log('Could not create new employee: Please select a schedule.')
  } else {
    let checkList = daysChecked();
  $.post('http://localhost:3000/calendar', { firstName: $('.formText')[0].value, lastName: $('.formText')[1].value, schedule: checkList } );
  console.log('created a new employee')
  }
});

//checking to make sure a schedule is chosen
const checked = function(){
  for (var i = 0; i < $('.newEmployeeCheckbox').length; i++){
    if ($('.newEmployeeCheckbox')[i].checked){
      return true
    } else {
      continue;
    }
  }
  return false;
}

const daysChecked = function(){
  list = [];
  for (var i = 0; i < $('.newEmployeeCheckbox').length; i++){
    if ($('.newEmployeeCheckbox')[i].checked){
      list.push($('.newEmployeeCheckbox')[i].value)
    } else {
      continue;
    }
  }
  console.log(list);
  return list;
}

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
