
var main = function ()
{
    "use strict";
    
    var ToDos = [];//array containing all todo object
    
//when the "Add ToDo Button"is clicked
    $('#button1').click(function (event)
    {
        addTodoFromInputBox();
    });
    
//when the Enter is pushed
     $("#inputbox2").on("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
         addTodoFromInputBox();
        }
    });
    
//when the "Sort by..."is changed 
    $("#Sortby").change(function (event)
    {
        if (document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "Priority")
        {
            soortToDobyPriority();
        } 
        else if (document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "Date")
        {
            soortToDobyDeadline();
        }
         else if (document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "Progress")
        {
            soortToDobyProgress();
        }
         else if (document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "Sort")
        {
            alert("Sort by??");
        }
        else 
        {
            alert("not available yet");
        }
    });




//function to make a Todo and add it.

  var addTodoFromInputBox = function ()
    {
        if (($('#inputrange1').val() !== "")
                && ($('#inputbox2').val() !== "")
                && ($('#inputbox3').val() !== ""))
        {
            
        var new_object = {"TodoID": Math.floor((Math.random() * 100) + 1),
            //random ID for association
                "Priority": $('#inputrange1').val(),
                "Task": $('#inputbox2').val(),
                "Deadline": $('#inputbox3').val(),
                "Status": "In process "};
                ToDos.push(new_object);
                
                
 
                $("#outputbox").prepend("\n\
        <table border=\"0\" id=\"some id\">\n\
        <td width=\"20px\" bgcolor=\"#FF8000\" class=\"priority\"><center>" + new_object.Priority + "</center></td>\n\
        <td width=\"300px\" bgcolor=\"#FF8000\" class=\"description\">"+ new_object.Task + " </td> \n\
        <td width=\"90px\" bgcolor=\"#FF8000\" class=\"deadline\">"+ new_object.Deadline +" </td>\n\
	<td width=\"80px\" bgcolor=\"#FF8000\" class=\"status\">"+ new_object.Status + " </td>\n\
        <td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" class=\"change-status-button\"><b>&#x21ba;</b></td>\n\
	<td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" class=\"delete-button\"><a style=\"font-family:'Segoe UI Symbol';color:black;font-size:17px;\">&#xe107;</a></td>\n\
        </table>");
  
                
                                
                $('#inputrange1').val("1");
        document.getElementById("rangeText").innerHTML = rangeValues[$('#inputrange1').val()];
        $('#inputbox2').val("");
    }
};


  




//function to sort by priority
var soortToDobyPriority = function ()
{
    var Priority1 = [];
    for (var i = 4; i >= 1; i--)
    {
        for (var j = 0; j < ToDos.length; j++)
        {
            if (ToDos[j].Priority === i.toString())
            {
                Priority1.push(ToDos[j]);
            }
        }
    }
    Print(Priority1);
};
   
   //function to sort by deadline
var soortToDobyDeadline = function ()
{
    var Deadline = ToDos;
    Deadline.sort(function(a, b) 
    {
     return parseFloat(a.Deadline.replace(/-|\//g, "")) - parseFloat(b.Deadline.replace(/-|\//g, ""));
    });
   Print(Deadline);
};


//function to sort by progress. Wont work now
var soortToDobyProgress = function ()
{
    var inProgress =[];
    var Finished =[];
     for (var i = 0; i < ToDos.length; i++)
        {
            if(ToDos[i].Status === "In process")
            {inProgress.push(ToDos[i]);}

        }
     for (var i = 0; i < ToDos.length; i++)
        {
            if(ToDos[i].Status === "Finished")
            {Finished.push(ToDos[i]);}
        }
        
   var sorted = inProgress.concat(Finished);
   Print(sorted);
};

//function to print an array. called in each sorting method.
var Print = function (A)
{
    $("#outputbox").html("");
    for (var i = 0; i < A.length; i++)
    {
        $("#outputbox").append("\n\
        <table border=\"0\" id=\"some id\">\n\
        <td width=\"20px\" bgcolor=\"#FF8000\" class=\"priority\"><center>" + A[i].Priority + "</center></td>\n\
        <td width=\"300px\" bgcolor=\"#FF8000\" class=\"description\">"+ A[i].Task + " </td> \n\
        <td width=\"90px\" bgcolor=\"#FF8000\" class=\"deadline\">"+ A[i].Deadline +" </td>\n\
	<td width=\"80px\" bgcolor=\"#FF8000\" class=\"status\">"+ A[i].Status + " </td>\n\
        <td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" class=\"change-status-button\"><b>&#x21ba;</b></td>\n\
	<td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" class=\"delete-button\"><a style=\"font-family:'Segoe UI Symbol';color:black;font-size:17px;\">&#xe107;</a></td>\n\
        </table>");
    }
};

// for the priority choosing range.
// define a lookup for what text should be displayed for each value in your range
var rangeValues =
        {
            "1": "&#127775;&nbsp&nbsp&#9734;&nbsp&nbsp&#9734;&nbsp&nbsp&#9734; <br> <a>Not Important</a>",
            "2": "&#127775;&nbsp&nbsp&#127775;&nbsp&nbsp&#9734;&nbsp&nbsp&#9734; <br> <a>Important</a>",
            "3": "&#127775;&nbsp&nbsp&#127775;&nbsp&nbsp&#127775;&nbsp&nbsp&#9734; <br> <a>Very Important</a>",
            "4": "&#127775;&nbsp&nbsp&#127775;&nbsp&nbsp&#127775;&nbsp&nbsp&#127775; <br> <a>Highly Important</a>"
        };
$(function () {
    // on page load, set the text of the label based the value of the range
    document.getElementById("rangeText").innerHTML = rangeValues[$('#inputrange1').val()];
    // setup an event handler to set the text when the range value is dragged (see event for input) or changed (see event for change)
    $('#inputrange1').on('input change', function () {
        document.getElementById("rangeText").innerHTML = rangeValues[$(this).val()];
    });
    });
};
        $(document).ready(main);
