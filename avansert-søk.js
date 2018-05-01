function myFunction() {
  var x = document.getElementById("advanced_search");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function avansert_sok() {
  var searchObject = {};

  if (document.getElementById("rullestolTilgang").checked) {
    searchObject.rullestol = "1";
  }

  if (document.getElementById("stelleromTilgang").checked) {
    searchObject.stellerom = "1";
  }

  if (document.getElementById("free").checked) {
    searchObject.pris = "0";
  }

  if (document.getElementById("gender").value) {
    searchObject.gender = dame;
    searchObject.gender = mann;
    console.log(value)
    getGenderValue();
  }

  if (document.getElementById("maksPris").value) {
    var maksPris = [];
  }

  if (document.getElementById("open_now").checked) {
    console.log(searchObject);
    var today = new Date();
    var Klokkeslett = today.getHours() + "." + today.getMinutes();
    var today = today.getDay()

    if (today == 6) {
      searchObject.open_now = Klokkeslett;
      searchObject.day = "tid_lordag";
    } else if (today == 0) {
      searchObject.open_now = Klokkeslett;
      searchObject.day = "tid_sondag";
    } else if (today > 0 && today < 6) {
      searchObject.open_now = Klokkeslett;
      searchObject.day = "tid_hverdag";
    }
  }
  let results = search(searchObject);
  createList(results);
}

if (document.getElementById("Klokkeslett")) {
  var Klokkeslett = today.getHours() + "." + today.getMinutes();
  date.getHours();
  date.getMinutes();
  var results = search(searchObject);
  console.log("RESULTATER:" + results.length)

  searchObject.klokkeslett = "0";
}
