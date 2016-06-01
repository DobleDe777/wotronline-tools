$(function() {
  $(".map").maphilight();
  $("area").click(function(event) {
    if(event.ctrlKey) {
      toggleBlock($(this).attr("title"));
    } else {
      try {
        drawDistances(distances($(this).attr("title")));
      }
      catch(e) {
        if(e == "Blocked Region") {
          alert("This region is blocked. Ctrl+click to unblock it.")
        }
      }
    }
  });
});
