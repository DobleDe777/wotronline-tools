$(function() {
  $(".map").maphilight();
  $("area").on('click', function(event) {
    if(event.ctrlKey) {
      try {
        toggleBlock($(this).attr("title"));
      }
      catch(e) {
        if(e == "Blocking Current Region") {
          alert("You cannot block the currently calculated region.");
        }
      }
    } else {
      try {
        drawDistances(distances($(this).attr("title")));
      }
      catch(e) {
        if(e == "Blocked Region") {
          alert("This region is blocked. Ctrl+click to unblock it.");
        }
      }
    }
  });

  $("#startingArea").trigger('click');

});
