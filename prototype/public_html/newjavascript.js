var main = function ()
{
    "use strict";
   
    var ToDos = [];
    
         
    //here comes what happens when button 1 is click

       $('#button1').click(function (event)
    {
        addTodoFromInputBox();
       
    });
   
    //define the fuction addTodoFromInputBox
    var addTodoFromInputBox = function ()
    {
        if (($('#inputrange1').val() !== "")
                && ($('#inputbox2').val() !== "")
                && ($('#inputbox3').val() !== ""))
        {
            var new_object = {"Priority": $('#inputrange1').val(),
                "Task": $('#inputbox2').val(),
                "Deadline": $('#inputbox3').val(),
                "Status": "In process "};
           
            ToDos.push(new_object);
            
            
            $(".outputbox").prepend( "<a>"+ new_object.Priority +"</a>&nbsp&nbsp<a>"
                    + new_object.Task +"</a>&nbsp&nbsp<a>"
                    + new_object.Deadline +"</a>&nbsp&nbsp<a>"
                    + new_object.Status +"</a>&nbsp&nbsp<input type=\"checkbox\"><br>");
     
         
            $('#inputrange1').val("1");
            document.getElementById("rangeText").innerHTML = rangeValues[$('#inputrange1').val()];
            $('#inputbox2').val("");
            //$('#inputbox3').val("2015-01-01");
           
            //ToDos[ToDos.length]= new_object;
           
            
           
          
       
        }
    };
 
   
  
       $('#Sortby').change(function (event)
    {
        if(document.getElementById("Sortby").options[document.getElementById("Sortby").selectedIndex].id === "Priority")
        {soortToDobyPriority();}
        else
        {
            alert("not available yet");
        }
    });
   
    var soortToDobyPriority = function()
    {
       
        var Priority1 = [];
       for (var i=4; i>=1; i--)
       {
        for (var j=0; j<ToDos.length; j++)
        {
            if (ToDos[j].Priority === i.toString() )
            {  
             
                Priority1.push(ToDos[j]);
            }
        }
    }
    
       
        //print out in order from high to low priority
        $('.outputbox').html("");
        for (var i=0; i<Priority1.length; i++)
        {
         $(".outputbox").append( "<a>"+ Priority1[i].Priority +"</a>&nbsp&nbsp<a>"
                    + Priority1[i].Task +"</a>&nbsp&nbsp<a>"
                    + Priority1[i].Deadline +"</a>&nbsp&nbsp<a>"
                    + Priority1[i].Status +"</a>&nbsp&nbsp<input type=\"checkbox\"><br>");
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
 
 
 
/* new_object[0] = $("<p>").text($('#inputbox1').val());
            new_object[1]= $("<p>").text($('#inputbox2').val());
            new_object[2]= $("<p>").text($('#inputbox3').val());
            new_object[3]= "In process";
            */
           
                 /*
            $("#Priority").append(new_object[0]);
            $("#Itemname").append(new_object[1]);
            $("#Dealine").append(new_object[2]);
            $("#Status").append(new_object[3]);

                 "1": "&#127775; <br> <a>Not Important</a>",
                 "2": "&#127775;&nbsp&nbsp &#127775; <br> <a>Important</a>",
                 "3": "&#127775;&nbsp&nbsp &#127775;&nbsp&nbsp &#127775; <br> <a>Very Important</a>",
                 "4": "&#127775;&nbsp&nbsp &#127775;&nbsp&nbsp &#127775;&nbsp&nbsp &#127775; <br> <a>Highly Important</a>"
            */