$("document").ready(function() {
  console.log('script loaded');
})

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

$('#Next').click(function(){
  if ($("p").html()=="December"){
    console.log("Month is december");
    return true;
  }
  const months = ["January", "February","March","April","May","June","July","August",
  "September", "October", "November", "December"];
  var index = months.indexOf($("p").html());
  $("p").html(months[index+1]);
});

$('#Prev').click(function(){
  if ($("p").html()=="January"){
    console.log("Month is january");
    return true;
  }
  const months = ["January", "February","March","April","May","June","July","August",
  "September", "October", "November", "December"];
  var index = months.indexOf($("p").html());
  $("p").html(months[index-1]);
});
