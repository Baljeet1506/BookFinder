function showBookFunction(title,isbn,author,publicationDate,condition){
	$("#bookList").empty();
	$("#bookFunction").css("display","table");
	$("#title").text("Book Title:"+title);
	$("#isbn").text("ISBN:"+isbn);
	$("#author").text("Author:"+author);
	$("#publicationDate").text("Publication Date:"+publicationDate);
	$("#condition").text("Book Condition:"+condition);
}

function searchBook(){
    var book = $("#book").val();
    $.post("php/search.php", { data: "Select * From books where title='"+book+"' OR isbn='"+book+"' OR author='"+book+"';"}, function(result){
        var data = $.parseJSON(result);
		sessionStorage.setItem("bookID",data[0].bookID);
		console.log(sessionStorage.getItem("bookID"));
		$("#bookFunction").css("display","none");
        $("#bookList").empty();
        if(data.length!=0){
            $("#bookList").append("<table id='books'>");
            for(var index = 0; index < data.length; index++){
                var title,isbn,author,publicationDate,condition,status;

                $("#books").append("<tr>");
                
                var img = "<img src='../image/topPic1.jpg' width=50px height=50px>";
                $("#books").append("<td>"+img+"</td>");
                
                title = data[index].title;
                $("#books").append("<td>"+title+"</td>");
                
                isbn = data[index].isbn;
                $("#books").append("<td>"+isbn+"</td>");
                
                author = data[index].author;
                $("#books").append("<td>"+author+"</td>");
                
                publicationDate = data[index].publicationDate;
                $("#books").append("<td>"+publicationDate+"</td>");
                
                condition = data[index].condition;
                $("#books").append("<td>"+condition+"</td>");
                
                status = data[index].status;
				
				var icon = document.createElement('img');
				icon.setAttribute("width", "50px");
  				icon.setAttribute("height", "50px");
				
                if(status == "available"){
					icon.setAttribute("src", "../image/green.png");
					icon.onclick = function(){
						showBookFunction(title,isbn,author,publicationDate,condition);
					};
                }
                else{
					icon.setAttribute("src", "../image/red.png");
                }
				
				$("#books").append("<td id='bookImage'>");
				document.getElementById('bookImage').appendChild(icon);
				$("#books").append("</td>");
                
                $("#books").append("</tr>");
            }
            $("#bookList").append("</table>");
        }
        else{
            alert("No book found");
        }
    });
}