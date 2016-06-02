// Distance calculation time variables.
var blockedRegions = Array(105).fill(false);
var lastDrawn = "Rivendell";

function findRegion(regionName) {
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

  if(regionNumber == -1) {
    throw "Region Number not found";
  }
  return regionNumber;
}

function distances(regionName) {
  var distances = [];
  var usedRegions = Array(105).fill(false);
  var regionNumber = findRegion(regionName);

  if(blockedRegions[regionNumber]) {
    throw "Blocked Region";
  }

  usedRegions[regionNumber] = true;
  distances.push([adjacencyList[regionNumber][0]]);

  var noNewRegions = false;
  while(usedRegions.indexOf(false) > -1 && !noNewRegions) {

    var distanceComponent = [];
    var usedThisRound = [];

    for(j = 0; j < adjacencyList.length; j++) {
      if(usedRegions[j]) {
        for(i = 1; i < adjacencyList[j].length; i++) {
          if(!usedRegions[adjacencyList[j][i]] && !blockedRegions[adjacencyList[j][i]]) {
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

    if(distanceComponent.length == 0) {
      noNewRegions = true;
    }

    distances.push(distanceComponent);
  }

  var unreachableRegions = [];
  for(j = 0; j < adjacencyList.length; j++) {
    if(!usedRegions[j] && !blockedRegions[j]) {
      unreachableRegions.push(adjacencyList[j][0]);
    }
  }

  distances.push(unreachableRegions);

  return distances;
}

function toggleBlock(regionName) {
  var regionNumber = findRegion(regionName);

  if(adjacencyList[regionNumber][0] == lastDrawn) {
    throw "Blocking Current Region";
  }
  
  blockedRegions[regionNumber] = !blockedRegions[regionNumber];
  var data = $("area[title='" + adjacencyList[regionNumber][0] + "']").data('maphilight') || {};
  data.stroke = false;
  data.fillColor = "000000";
  data.fillOpacity = 0.9;
  $("area[title='" + adjacencyList[regionNumber][0] + "']").data('maphilight', data);
  drawDistances(distances(lastDrawn));
}

function drawDistances(distances) {
  lastDrawn = distances[0][0];
  $("area").trigger("custommouseout");
  var color = "";
  for(i = 0; i < distances.length; i++) {
    if(i == 0) {
      color = "ffffff";
    } else if(i == distances.length-1) {
      color = "000000";
    } else {
      if(i%5 == 0) {
        color = "00ff00";
      } else if(i%5 == 1) {
        color = "ffff00";
      } else if(i%5 == 2) {
        color = "0000ff";
      } else if(i%5 == 3) {
        color = "00ffff";
      } else {
        color = "ff0000";
      }
    }

    for(j = 0; j < distances[i].length; j++) {
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
