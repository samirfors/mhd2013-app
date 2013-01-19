
window.Render = {};
window.Render.eventsList = function(events)
{
     $('#fb-login').hide();

     for(var i=0; i < events.length; i++)
     {
        console.log(events[i].id)
         $('.events-list ul').append('<li>' + events[i].id  +  '</li>')  
     }
}