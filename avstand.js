//Calculating distance between two points using pythagorean theorem
// Oppgave 7

  function findDistance(position1, position2){
    var earthRadius = 6371.009;
    var radianLatitude1 = Math.PI * (position1.lat/180);
    var radianLatitude2 = Math.PI * (position2.lat/180);
    var deltaPhi = radianLatitude2 - radianLatitude1;
    var radianLongitude1 = Math.PI * (position1.long/180);
    var radianLongitude2 = Math.PI * (position2.long/180);
    var deltaLamb = radianLongitude2 - radianLongitude1;
    var meanLatitude = (radianLatitude2 + radianLatitude1)/2;
    var insideSqtr = Math.pow(deltaPhi,2) + Math.pow((Math.cos(meanLatitude) * deltaLamb),2);
    var distance = earthRadius * Math.sqrt(insideSqtr);
    return distance;
  }

  location1 = {
    lat: 60.388076,
    long: 5.334937
  }

  location2 = {
    lat: 60.388871,
    long: 5.334079
  }

  var avstand = findDistance(location1, location2);
  console.log(avstand);
