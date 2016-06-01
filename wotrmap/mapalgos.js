function distances(regionName) {
  var distances = [];
  var usedRegions = Array(105).fill(false);
  var regionNumber = -1;

  var notFound = true;
  var notFoundIndex = 0;
  while(notFound && notFoundIndex < 300) {
    if (notFoundIndex >= 105) {
      console.log('notFoundIndex over bounds on ' + regionName);
    }

    if (regionName == adjacencyList[notFoundIndex][0]) {
      notFound = false;
      regionNumber = notFoundIndex;
    }

    notFoundIndex++;
  }


  usedRegions[regionNumber] = true;
  distances.push([adjacencyList[regionNumber][0]]);

  while(usedRegions.indexOf(false) > -1) {

    var distanceComponent = [];
    var usedThisRound = [];

    for(j = 0; j < adjacencyList.length; j++) {
      if(usedRegions[j] === true) {

        for(i = 1; i < adjacencyList[j].length; i++) {
          if(usedRegions[adjacencyList[j][i]] === false) {
            usedThisRound.push([adjacencyList[j][i]]);
            distanceComponent.push(adjacencyList[adjacencyList[j][i]][0]);
          }
        }

      }
    }

    for(i = 0; i < usedThisRound.length; i++) {
      usedRegions[usedThisRound[i]] = true;
    }

    distanceComponent = distanceComponent.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });

    distances.push(distanceComponent);
  }
  return distances;
}

function drawDistances(distances) {
console.log(distances);

  $("area").trigger("custommouseout");
  for(i = 0; i < distances.length; i++) {
    for(j = 0; j < distances[i].length; j++) {
      var color = "ff0000";
      if(i%5 == 0) {
        color = "00ff00";
      } else if(i%5 == 1) {
        color = "ffff00";
      } else if(i%5 == 2) {
        color = "0000ff";
      } else if(i%5 == 3) {
        color = "00ffff";
      }

      var data = $("area[title='" + distances[i][j] + "']").data('maphilight') || {};
      data.stroke = false;
      data.fillColor = color;
      data.fillOpacity = 0.3;
      $("area[title='" + distances[i][j] + "']").data('maphilight', data);
    }
  }

  $("area").trigger("custommouseover");
  // change metadata based on distances
  // highlight them all: fire custom on data-maphilight='{"stroke":false,"fillColor":"ff0000","fillOpacity":0.6}'
}
