function openContent(id) {
  var content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  document.getElementById(id).style.display = "block";
  if(id=='bookInfo'){
    showBook();
  }
}

function showBook(){
  $("#bookInfo").empty();
  $("#bookInfo").append("<div id='borrowed'><h3>Borrowed</h3></div>");
  var user = sessionStorage.getItem("userID");
  
  $.post("php/search.php", { data: 'Select books."title",bookborrowed."bookID", bookborrowed."borrowedDate",bookborrowed."dueDate",bookborrowed."duration",bookborrowed."renewOption"from bookborrowed, books where books."bookID" = bookborrowed."bookID" And bookborrowed."userID" ='+user}, function(result){
    var data = $.parseJSON(result);
    if(data.length!=0){
      $("#borrowed").append("<table id='borrow'></table>");
      for(var index = 0; index < data.length; index++){ 
        var title,borrowedDate,dueDate,duration,renewOption;
        
        $("#borrow").append("<tr>");
        
        title = data[index].title;
        $("#borrow").append("<td>"+title+"</td>");
        
        borrowedDate = data[index].borrowedDate;
        $("#borrow").append("<td>"+borrowedDate+"</td>");
        
        dueDate = data[index].dueDate;
        $("#borrow").append("<td>"+dueDate+"</td>");
        
        duration = data[index].duration;
        $("#borrow").append("<td>"+duration+"</td>");
        
        renewOption = data[index].renewOption;
        
        var button = document.createElement('button');
        button.className="roundinput";
        if(renewOption == true){
          button.innerHTML = "Renew";
          $("#borrow").append("<td id='renew'>");
          document.getElementById('renew').appendChild(button);
          $("#borrow").append("</td>");
        }
        else{
          button.innerHTML = "Can not Renew";
          $("#borrow").append("<td id='renew'>");
          document.getElementById('renew').appendChild(button);
          $("#borrow").append("</td>");
        }
        
        $("#borrow").append("</tr>");
      }
    }
    else{
       $("#borrowed").append("<h5>No books borrowed</h5>");
    }
  });
  
  $("#bookInfo").append("<div id='bookhold'><h3>Books on Hold</h3></div>");
  
  $.post("php/search.php", { data: 'Select books."title", bookhold."holdDate" from bookhold, books where books."bookID" = bookhold."bookID" And bookhold."userID" ='+user}, function(result){
    var data = $.parseJSON(result);
    
    if(data.length!=0){
      $("#bookhold").append("<table id='hold'></table>");
      for(var index = 0; index < data.length; index++){ 
        var title,holdDate;
        
        $("#hold").append("<tr>");
        
        title = data[index].title;
        $("#hold").append("<td>"+title+"</td>");
        
        holdDate = data[index].holdDate;
        $("#hold").append("<td>"+holdDate+"</td>");
        
        var button = document.createElement('button');
        button.className="roundinput";
        
        button.innerHTML = "Cancel";
        $("#hold").append("<td id='cancel'>");
        document.getElementById('cancel').appendChild(button);
        $("#hold").append("</td>");
        
        $("#borrow").append("</tr>");
      }
    }
    else{
       $("#bookhold").append("<h5>No books hold</h5>");
    }
  });
  
  
}

function showPersonalInformation(){
  var user = sessionStorage.getItem("userID");
  $.post("php/search.php", { data: 'Select * From users where "userID" ='+user}, function(result){
      var dataTwo = $.parseJSON(result);
      sessionStorage.setItem("name",dataTwo[0].name);
      sessionStorage.setItem("gender",dataTwo[0].gender);
      sessionStorage.setItem("age",dataTwo[0].age);
      sessionStorage.setItem("address",dataTwo[0].address);
      sessionStorage.setItem("email",dataTwo[0].email);
      
      var name = sessionStorage.getItem("name");
      var gender = sessionStorage.getItem("gender");
      var age = sessionStorage.getItem("age");
      var address = sessionStorage.getItem("address");
      var email = sessionStorage.getItem("email");
      
      $("#welcome").html("Hello <br/>"+name+"<br/>"+user);
      var username = name.split(" ");
      var fname = username[0];
      var lname = username[1];
      $("#fname").val(fname);
      $("#lname").val(lname);
      $("#age").val(age);
      $("#address").val(address);
      $("#email").val(email);
      
      if(gender == 'M'){
        $("#male").prop("checked",true);
      }
      if(gender == 'F'){
        $("#female").prop("checked",true);
      }
      if(gender == 'X'){
        $("#other").prop("checked",true);
      }
  });
}

function save(){
  if($("#fname").val() == ""){
      alert("First Name Required");
  }
  if($("#lname").val() == ""){
      alert("Last Name Required");
  }
  if($("#age").val() == ""){
      alert("Age Required");
  }
  if($("#address").val() == ""){
      alert("Address Required");
  }
  if($("#email").val() == ""){
      alert("Email Required");
  }
  
  var name =  "'" + $("#fname").val() + " " + $("#lname").val() + "'";
  var age = $("#age").val();
  var gender = '';
  
  if($("#male").prop("checked")){
      gender = "'M'";
  }
  else if($("#female").prop("checked")){
      gender = "'F'";
  }
  else if($("#other").prop("checked")){
      gender = "'X'";
  }
  var address = "'" +  $("#address").val() + "'";
  var email = "'" +  $("#email").val() + "'";

  var sql = 'update "users" set name='+name+',age = '+age+',gender = '+gender+',address = '+address+',email = '+email+' where "userID" ='+id+';';
  
  $.post("php/updateUserInformation.php", { data: sql}, function(result){
    console.log(result);
    showPersonalInformation();
  });
}