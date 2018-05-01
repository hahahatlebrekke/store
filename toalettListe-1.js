var object = null;

function startProgram(callback, url) {
  var obj = null;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("type",
        xhr.getResponseHeader("Content-Type"));
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}

function noe(obj) {
  object = obj["entries"];
  createList(obj);

}
window.onload = function() {
  startProgram(noe, "https://hotell.difi.no/api/json/bergen/dokart?");

  initMap();
}

var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('Map'), {
    zoom: 13,
    center: new google.maps.LatLng(60.388076, 5.334937)
  });

  function addMarker(coords, map) {}
}

function hurtigSok() {
  text = document.getElementById("myInput").value

  kjønn = /kjønn:([a-zA-ZæøåÆØÅ]+)/g
  pris = /pris:(\d+)/g
  plass = /plass:([\w\sæøåÆØÅ]+)/g
  place = /place:([a-zA-Z]+)/g
  tid_sondag = /tid_sondag:(\d+)/g
  tid_hverdag = /tid_hverdag:(\d+)/g
  tid_lordag = /tid_lordag:(\d+)/g
  pissoir_only = /pissoir_only:([a-zA-Z]+)/g
  stellerom = /stellerom:([a-zA-Z\d]+)/g
  rullestol = /rullestol:([a-zA-Z\d]+)/g
  adresse = /adresse:([a-zA-Z\d]+)/g


  var searchObject = {};
  var all_tests = [kjønn, pris, plass, place, tid_sondag, tid_hverdag, tid_lordag, pissoir_only, stellerom, rullestol, adresse];
  for (let i = 0; i < all_tests.length; i++) {
    if (text.match(kjønn)) {
      gender = text.match(kjønn)[0].split(":")[1];

      if (gender == "dame")
        searchObject[gender] = "1";

      if (gender == "herre")
        searchObject[gender] = "1";
    }
    if (text.match(pris)) {
      searchObject["pris"] = text.match(pris)[0].split(":")[1];
    }
    if (text.match(adresse)) {
      searchObject["adresse"] = text.match(adresse)[0].split(":")[1];
    }
    if (text.match(plass)) {
      console.log(text.match(plass))
      searchObject["plassering"] = text.match(plass)[0].split(":")[1];
    }
    if (text.match(place)) {
      searchObject["place"] = text.match(place)[0].split(":")[1];
    }
    if (text.match(tid_sondag)) {
      searchObject["tid_sondag"] = text.match(tid_sondag)[0].split(":")[1];
    }
    if (text.match(tid_hverdag)) {
      searchObject["tid_hverdag"] = text.match(tid_hverdag)[0].split(":")[1];
    }
    if (text.match(tid_lordag)) {
      searchObject["tid_lordag"] = text.match(tid_lordag)[0].split(":")[1];
    }
    if (text.match(pissoir_only)) {
      searchObject["pissoir_only"] = text.match(pissoir_only)[0].split(":")[1];
    }
    if (text.match(stellerom)) {
      searchObject["stellerom"] = text.match(stellerom)[0].split(":")[1];
    }
    if (text.match(rullestol)) {
      searchObject["rullestol"] = text.match(rullestol)[0].split(":")[1];
    }

  }
  if (document.getElementById("maksPris").value > 0) {
    searchObject["maksPris"] = document.getElementById("maksPris").value;
  }
  if (document.getElementById("gender").value=="herre") {
    searchObject["herre"] = "1";
  }else{
    searchObject["dame"] = "1";
  }
  if (document.getElementById("Klokkeslett").value) {
    searchObject["klokkeslett"] = document.getElementById("Klokkeslett").value;
  }
  if (document.getElementById("Dag").value) {
    searchObject["Dag"] = document.getElementById("Dag").value;
  }

  var results = search(searchObject);

  createList(results);
}



function search(searchObject) {
  var all_tests = [];
  console.log(searchObject);
  console.log(Object.keys(searchObject));
  var searchParams = Object.keys(searchObject);
  for (i = 0; i < object.length; i++) {
    var truthChecker = [] // will contain boolean values "true" for each param checked.
    for (y = 0; y < searchParams.length; y++) {
      if (searchParams[y] == "pris") {
        if (searchObject[searchParams[y]] == "0" && object[i][searchParams[y]] == "NULL") {
          truthChecker.push(true);
        }
      }
      if (searchParams[y] === 'rullestol') {
        truthChecker.push(searchObject.rullestol === object[i].rullestol);
      }
      if (searchParams[y] === 'stellerom') {
        truthChecker.push(searchObject.stellerom === object[i].stellerom);
      }
      if (searchParams[y] === 'pris') {
        truthChecker.push(searchObject.pris === object[i].pris);
      }
      if (searchParams[y].includes("open_now")) {
        var currentTime = searchObject[searchParams[y]]
        //  console.log(searchObject.day);
        //  console.log(object[i][searchObject.day]);

        var currentHour = parseInt(currentTime.split(".")[0])
        var currentMin = parseInt(currentTime.split(".")[1])
        var totalMin = currentHour * 60 + currentMin;


        var objectTime = object[i][searchObject.day];
        if (objectTime == "ALL") {
          var open = true;
        } else if (objectTime == "NULL") {
          var open = false;
        } else {
          var open = objectTime.split(" - ")[0]
          var close = objectTime.split(" - ")[1]

          var openHour = parseInt(open.split(".")[0])
          var openMin = (parseInt(open.split(".")[1])) + (closeHour * 60);
          var closeHour = parseInt(close.split(".")[0])
          var closeMin = (parseInt(close.split(".")[1])) + (closeHour * 60);
        }
        if (totalMin >= openMin && totalMin <= closeMin) {
          console.log("ÅPENT");
          truthChecker.push(true);
        } else if (open) {
          truthChecker.push(true);
        } else if (!open) {
          truthChecker.push(false);
        } else {
          truthChecker.push(false);
        }
        console.log(openHour + ":" + openMin + "  ––––  " + closeHour + ":" + closeMin)
      }
      if (searchParams[y] === 'dame') {
        truthChecker.push(searchObject.dame === object[i].dame);
      }
      if (searchParams[y] === 'herre') {
        truthChecker.push(searchObject.herre === object[i].herre);
      }
      if (searchParams[y] === 'plassering') {
        truthChecker.push(searchObject.plassering.toLowerCase() === object[i].plassering.toLowerCase());
      }
      if (searchParams[y] === 'klokkeslett') {
        var searchObjectKlokke = klokke1(searchObject.klokkeslett);
        var objectOpen = klokke1();
        var objectClose = klokke1();
        var today = new Date();
        var today = today.getDay()

        if (today == 6) {
          searchObject.open_now = Klokkeslett;
          var objectOpen = klokke1(object[i]["tid_lordag"]);
        } else if (today == 0) {
          searchObject.open_now = Klokkeslett;
          searchObject.day = "tid_sondag";
        } else if (today > 0 && today < 6) {
          searchObject.open_now = Klokkeslett;
          searchObject.day = "tid_hverdag";
        }
      }
        truthChecker.push(searchObjectKlokke > objectOpen && searchObjectKlokke > objectClose);
      }
      if (searchParams[y] === 'maksPris') {
        truthChecker.push(searchObject.maksPris=== object[i].pris);
      }
    }
    if (truthChecker.length > 0) {
      var match = truthChecker.reduce(function(boolean, b) {
        return boolean && b;
      });
    }

    if (match) {
      all_tests.push(object[i]);
    }
    //if(myInput==value{
    // (object[i][searchParams[y]].toLowerCase() == searchObject[searchParams[y]].toLowerCase())
    // }
  }
  console.log("Results: ");
  return all_tests;
}

function klokke1(klokke) {
  if (klokke.includes(":")) {
    var openHour = parseInt(klokke.split(":")[0])
    var openMin = (parseInt(klokke.split(":")[1])) + (closeHour * 60);
  } else {
    var openHour = parseInt(klokke.split(".")[0])
    var openMin = (parseInt(klokke.split(".")[1])) + (closeHour * 60);
  }
  return openMin;
}

function createList(list) {
  document.getElementById("toalettene").innerHTML = "";
  for (let i = 0; i < markers.length; i++)
    markers[i].setMap(null);

  for (let i = 0; i < list.length; i++) { //for-løkke som har variablen i som har verien 0.
    //Om i er mindre enn object sin lengde så skal i øke med 1.

    console.log(list[i].plassering); //skriver ut til consolen

    var node = document.createElement("LI"); //lager en node som en liste
    var textnode = document.createTextNode(list[i].plassering); //lage en textnode der object befinner seg i.
    node.appendChild(textnode); //går inn i textnoden.
    document.getElementById("toalettene").appendChild(node); //finner id-til object og skriver ut nodene til appendChild.

    lati = parseFloat(list[i].latitude);
    longi = parseFloat(list[i].longitude);

    markerLabel = object.id;
    latlng = new google.maps.LatLng({
      lat: lati,
      lng: longi
    });
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: latlng,
      label: (i + 1).toString(),
      map: map,
    });
    markers.push(marker);
  }
}
