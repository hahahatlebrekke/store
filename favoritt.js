console.log("js ok");
var object = null;
var section1 = document.getElementById("section1");

function myFunction() {
    var btn = document.createElement("BUTTON");
    document.body.appendChild(btn);
}

// Generere liste med options
function getElements(list){
  var selector = document.getElementById("choose-playground");
  for(var i = 0; i < list.length; i++){
    var listElement = list[i];
    var optionElement = document.createElement("option");
    var optionText = document.createTextNode(listElement.navn);

    optionElement.appendChild(optionText);
    selector.appendChild(optionElement);
  }
}


function startProgram(callback, url){
  var xhr=new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange=function(){
    if(xhr.readyState=== 4 && xhr.status===200){
      console.log("type")
     xhr.getResponseHeader("Content-Type");
     callback(JSON.parse(xhr.responseText));
    }
  }
  xhr.send();
}
function noe(obj){
  object = obj["entries"];
  getElements(object);
}
window.onload = function(){
  console.log("onload")
   startProgram(noe, "https://hotell.difi.no/api/json/bergen/lekeplasser?");
}



// var x = document.getElementById("mySelect").options.namedItem("orange").text;



// Finner nærmeste
function findClosest(list, favoriteElement) {
  let target = favoriteElement;
  let closest = null;
  let closestDistance;

  list.forEach(function(element){
    var dist = getDistance({lat: favoriteElement.latitude, long: favoriteElement.longitude},{lat: element.latitude, long: element.longitude});
    if(!closestDistance || dist < closestDistance) {
      closest = element;
      closestDistance = dist;
    }
  });

  // list.reduce((closest,current))=>{
  //   if(closest.getDistance(target)>current.getDistance(target)){
  //   } else {
  //     return current;
  //   }
  // });

  return {selected: favoriteElement, element: closest, distance: closestDistance};
}

function createBox(object) {
  var container = document.getElementById("container");

  var div = document.createElement("div");
  var title = document.createElement("h2");
  var titleText = document.createTextNode(object.navn);

  title.appendChild(titleText);
  div.appendChild(title);
  container.appendChild(div);
}


// console.log(closest);

// Setter favoritt
// onchange="setFavourite(this)"
function setFavourite(){
  document.getElementById("container").innerHTML = "";
  var favoriteElement;
  var selector = document.getElementById("choose-playground");
  var selectedValue = selector.options[selector.selectedIndex].value;
  var list = object;
  for(var i = 0; i < list.length; i++){
    if(list[i].navn == selectedValue){
      console.log("Match: " + list[i].navn);
      favoriteElement = list[i];
    }
  }
  console.log("End of loop")
  console.log(favoriteElement)
  var x = findClosest(list, favoriteElement);
  createBox(x.selected);
  createBox(x.element);

}

function getDistance(position1, position2){
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
