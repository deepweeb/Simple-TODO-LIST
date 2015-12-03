var main = function ()
{
    "use strict";
    
    var int = -1;
    var ToDos = [];
    //here comes what happens when button 1 is click
    $('#button1').click(function (event)
    {
        int++;
        addTodoFromInputBox();
        
    });
    
     $("#inputbox2").on("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addTodoFromInputBox();
        }
    });

    //define the fuction addTodoFromInputBox
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
                
                
 
                $(".outputbox").prepend("<tr height=\"20px\">\n\
                                        <td width=\"25px\" bgcolor=\"#FF8000\"><center>" + new_object.Priority + " </center></td>\n\
                                        <td width=\"300px\" bgcolor=\"#FF8000\">"+ new_object.Task + "</td> \n\
                                       <td width=\"90px\" bgcolor=\"#FF8000\">"+ new_object.Deadline +"</td>\n\
					<td width=\"80px\" bgcolor=\"#FF8000\">"+ new_object.Status + "</td>\n\
                                      <td  bgcolor=\"#FF8000\"><input id="+ int +"  type=\"button\" value=\"&#x21ba;\" /></td>\n\
                                       <td  bgcolor=\"#FF8000\"><input id="+ int+1 +" type=\"button\" value=\"&#10008\" /></td></tr>");
                                
                $('#inputrange1').val("1");
        document.getElementById("rangeText").innerHTML = rangeValues[$('#inputrange1').val()];
        $('#inputbox2').val("");
    }
};

  
        

      
    
 ///////////////////////////////  /////////////////// 
var ChangeStatus = function ()
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


    //print out in order from high to low priority
    $('.outputbox').html("");
    for (var i = 0; i < ToDos.length; i++)
    {
        $(".outputbox").append("<a>" + Priority1[i].Priority + "</a>&nbsp&nbsp<a>"
                + ToDos[i].Task + "</a>&nbsp&nbsp<a>"
                + ToDos[i].Deadline + "</a>&nbsp&nbsp<a>"
                + ToDos[i].Status + "</a>&nbsp&nbsp <input id="+ ToDos[i].TodoID +" type=\"button\" value=\"Change Status\" />&nbsp&nbsp <input id="+ToDos[i].TodoID+1+" type=\"button\" value=\"Delete\" /><br>");
    }

};
    
 ///////////////////////////////////   
    
    
    
    
    
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
    
var soortToDobyDeadline = function ()
{
    var Deadline = ToDos;
    Deadline.sort(function(a, b) 
    {
     return parseFloat(a.Deadline.replace(/-|\//g, "")) - parseFloat(b.Deadline.replace(/-|\//g, ""));
    });
   Print(Deadline);
};

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


var Print = function (A)
{
    $('.outputbox').html("");
    for (var i = 0; i < A.length; i++)
    {
        $(".outputbox").append("<tr height=\"20px\">\n\
                                        <td width=\"25px\" bgcolor=\"#FF8000\"><center>" + A[i].Priority + " </center></td>\n\
                                        <td width=\"300px\" bgcolor=\"#FF8000\">"+ A[i].Task + "</td> \n\
                                       <td width=\"90px\" bgcolor=\"#FF8000\">"+ A[i].Deadline +"</td>\n\
					<td width=\"80px\" bgcolor=\"#FF8000\">"+ A[i].Status + "</td>\n\
                                      <td  bgcolor=\"#FF8000\"><input id="+ A[i].TodoID +"  type=\"button\" value=\"&#x21ba;\" /></td>\n\
                                       <td  bgcolor=\"#FF8000\"><input id="+ A[i].TodoID +" type=\"button\" value=\"&#10008\" /></td></tr>");
    }
};


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
