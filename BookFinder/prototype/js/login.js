function login(){
    if($("#login").val()==''){
        alert("Please Enter Your ID");
    }
    if($("#password").val()==''){
        alert("Please Enter Your Password");
    }
    
    if($("#login").val()!='' && $("#password").val()!=''){
        var userID = $("#login").val();
        var password = "'" + $("#password").val() + "'";
    
        $.post("php/search.php", { data: 'Select "userID", role From useraccounts where "userID" ='+userID+'And password='+password}, function(result){
            var dataOne = $.parseJSON(result);
            if(dataOne.length!=0){
                console.log(dataOne[0].userID);
                console.log(dataOne[0].role);
                
                $.post("php/search.php", { data: 'Select * From users where "userID" ='+userID}, function(result){
                    var dataTwo = $.parseJSON(result);
                    console.log(dataTwo[0]);
                    sessionStorage.setItem("userID",dataTwo[0].userID);
                    
                    if(dataOne[0].role == "user"){
                        location.replace("http://bookfinderproject.com/userPage.htm");
                    }
                    else if(dataOne[0].role == "admin"){
                        location.replace("http://bookfinderproject.com/userPage.htm");
                    }
                });
            }
            else{
                alert("Wrong Password or ID");
            }
        });  
    }
}