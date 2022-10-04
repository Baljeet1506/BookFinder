function signup(){
    if($("#firstName").val() == ""){
        alert("First Name Required");
    }
    if($("#lastName").val() == ""){
        alert("Last Name Required");
    }
    if($("#streetNumber").val() == ""){
        alert("Street Number Required");
    }
    if($("#city").val() == ""){
        alert("City Required");
    }
    if($("#age").val() == ""){
        alert("Age Required");
    }
    if($("#email").val() == ""){
        alert("Email Required");
    }
    if($("#passwordOne").val() == ""){
        alert("Password Required");
    }
    if($("#passwordTwo").val() == ""){
        alert("Please Confirm Your Password");
    }
    
    var name =  "'" + $("#firstName").val() + " " + $("#lastName").val() + "'";
    var address = "'" +  $("#streetNumber").val() + " " + $("#city").val() + "'";
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
    
    var email = "'" +  $("#email").val() + "'";
    
    var passwordOne = "'" + $("#passwordOne").val() + "'";
    var passwordTwo = "'" + $("#passwordTwo").val() + "'";
    
    if(passwordOne!=passwordTwo){
        alert("Wrong Password");
    }
    
    $.post("php/insertUser.php", { data: 'Insert Into users("userID","name","gender","age","address","email") Values (default,'+name+','+gender+','+age+','+address+','+email+') Returning "userID";'}, function(result){
        var success = $.parseJSON(result);
        console.log(success[0].userID);
        var id = success[0].userID;
        var role = "'user'";
        var emailAlert = false;
        var balance = 0.00;
        
        $.post("php/insertUserAccount.php", { data: 'Insert into useraccounts("userID","password","role","emailAlert","balance")  Values ('+id+','+passwordOne+','+role+','+emailAlert+','+balance+')'}, function(result){
            alert(result+" "+"Your id is :"+" "+id);
            location.replace("http://bookfinderproject.com/logIn.htm");
        });
    });
}

function reset(){
    $("#firstName").val('');
    $("#lastName").val('');
    $("#streetNumber").val('');
    $("#city").val('');
    $("#age").val('');
    
    $("#male").prop("checked", false);
    $("#female").prop("checked", false);
    $("#other").prop("checked", false);
      
    $("#email").val('');
    $("#passwordOne").val('');
    $("#passwordTwo").val('');
}