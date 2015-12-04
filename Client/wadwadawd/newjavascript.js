
var ToDos = [];//array containing all todo object
  
  //change status from "In Process" to "Finished"
 function Mark(object) {
   var ClickedToDoID = object.getAttribute("id");
   console.log(ToDos[0].TodoID +"----"+ ClickedToDoID);
     for(var i = 0; i < ToDos.length; i++) 
   {
       if(ToDos[i].TodoID.toString() === ClickedToDoID)
       {
           ToDos[i].Status = "Finished";
       } 
     }
    Print(ToDos);
}


//change remove clicked object
    function Delete(object) {
   var ClickedToDoID = object.getAttribute("id");
   console.log(ToDos[0].TodoID +"----"+ ClickedToDoID);
     for(var i = 0; i < ToDos.length; i++) 
   {
       if(ToDos[i].TodoID.toString() === ClickedToDoID)
       {
           ToDos.splice(i,1);
       }
    }
 Print(ToDos);     
}
  
  
var main = function ()
{
    "use strict";

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
         else if (document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "PF")
        {
            soortPF();
        }
         else if (document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "FP")
        {
            soortFP();
        }
       
        $("#Sortby").val('None');
        
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
                "Status": "In process"};
                ToDos.push(new_object);
 
 
                $("#outputbox").prepend("\n\
        <table border=\"0\" id=\"some id\">\n\
        <td width=\"20px\" bgcolor=\"#FF8000\" class=\"priority\"><center>" + new_object.Priority + "</center></td>\n\
        <td width=\"300px\" bgcolor=\"#FF8000\" class=\"description\">"+ new_object.Task + " </td> \n\
        <td width=\"90px\" bgcolor=\"#FF8000\" class=\"deadline\">"+ new_object.Deadline +" </td>\n\
	<td width=\"80px\" bgcolor=\"#FF8000\" class=\"status\">"+ new_object.Status + " </td>\n\
        <td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" style=\"cursor: pointer;\" onclick=\"Mark(this)\" id="+ new_object.TodoID + ">&#10004;</td>\n\
	<td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" style=\"cursor: pointer;\" onclick=\"Delete(this)\" id="+ new_object.TodoID + "><a style=\"font-family:'Segoe UI Symbol';color:black;font-size:17px;\">&#xe107;</a></td>\n\
        </table>");
  
                    
        $('#inputrange1').val("1");
        document.getElementById("rangeText").innerHTML = rangeValues[$('#inputrange1').val()];
        $('#inputbox2').val("");
        
        var JsonToDo = JSON.stringify(ToDos);
        console.log(JsonToDo);
    }
};



//function to sort by priority
var soortToDobyPriority = function ()
{
    var Priority1 = [];
    for (var i = 1; i <= 4; i++)
    {
        for (var j = 0; j < ToDos.length; j++)
        {
            if (ToDos[j].Priority === i.toString())
            {
                Priority1.push(ToDos[j]);
            }
        }
    }
    //todo = copy of priority 1
    ToDos = Priority1.splice(0);
    Print(ToDos);
};
   
   //function to sort by deadline
var soortToDobyDeadline = function ()
{
    var Deadline = ToDos;
    Deadline.sort(function(a, b) 
    {
     return parseFloat(a.Deadline.replace(/-|\//g, "")) - parseFloat(b.Deadline.replace(/-|\//g, ""));
    });
   Deadline.reverse();
   ToDos =  Deadline.splice(0);
   Print(ToDos);
};


//function to sort by progress PF (In Process - Finished)
var soortPF = function ()
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
        
   var sorted = Finished.concat(inProgress);
   ToDos =  sorted.splice(0);
   Print(ToDos);
};

//function to sort by progress FP ( Finished - In Process )
var soortFP = function ()
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
   ToDos =  sorted.splice(0);
   Print(ToDos);
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
//function to print an array. called in each sorting method.
var Print = function (A)
{
    $("#outputbox").html("");
    for (var i = 0; i < A.length; i++)
    {
        $("#outputbox").prepend("\n\
        <table border=\"0\" id=\"some id\">\n\
        <td width=\"20px\" bgcolor=\"#FF8000\" class=\"priority\"><center>" + A[i].Priority + "</center></td>\n\
        <td width=\"300px\" bgcolor=\"#FF8000\" class=\"description\">"+ A[i].Task + " </td> \n\
        <td width=\"90px\" bgcolor=\"#FF8000\" class=\"deadline\">"+ A[i].Deadline +" </td>\n\
	<td width=\"80px\" bgcolor=\"#FF8000\" class=\"status\">"+ A[i].Status + " </td>\n\
        <td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" style=\"cursor: pointer;\" onclick=\"Mark(this)\" id="+ A[i].TodoID + ">&#10004;</td>\n\
	<td width=\"28px\" bgcolor=\"#FF8000\" align=\"center\" style=\"cursor: pointer;\" onclick=\"Delete(this)\" id="+ A[i].TodoID + "><a style=\"font-family:'Segoe UI Symbol';color:black;font-size:17px;\">&#xe107;</a></td>\n\
        </table>");
    }
    var JsonToDo = JSON.stringify(ToDos);
        console.log(JsonToDo);
};