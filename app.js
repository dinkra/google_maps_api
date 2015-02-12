//$(document).ready( function() {
var markers = [];
var map;
	
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(52.459, 4.779),
     new google.maps.LatLng(52.329, 4.899));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
	    var places = searchBox.getPlaces();
	console.log(places);

	map.setCenter(places[0].geometry.location);
  });
  
  // This event listener will call addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
      addMarker(event.latLng);
      console.log(event.latLng);
    });

    for (var i = 0; i < localStorage.length; i++) {
    	setMyPlaces(i);
    };

  //
    $('#map-canvas').on('click', '.savePlace', onSaveClick);

    $('#myPlaces').on('click', 'li', function() {
    	console.log($(this).attr('data-LatLng'));


    	var coordinateString = $(this).attr('data-LatLng'); 

        coordinateString = coordinateString.replace(/[(]/g, ""); 
        coordinateString = coordinateString.replace(/[)],/g, "&"); 
        var temp = []; 
        var temp2 = []; 

        //split marker string into individual markers 
        temp = coordinateString.split("&"); 

        //split first marker into lat and lng values 
        temp2 = temp[0].split(","); 
        console.log(temp2[0] + ' aaaaa  ' + temp2[1]);
        var lat = parseFloat(temp2[0]); 
        //alert(lat); 
        var lng = parseFloat(temp2[1]); 
        //alert(lng); 
    	addMarker(new google.maps.LatLng(lat, lng));
    });

    populateStorage();

}	
// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
  // When the user clicks the marker, an info window opens.
  var index = markers.length - 1;
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 class="savePlace" data-markerId="' + index + '">Save Place</h1>'+
      '</div>';
  

  var infowindow = new google.maps.InfoWindow({
	  	
	  	content: contentString
	});
	
  google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
  });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function onSaveClick() {
	var index = $(this).attr('data-markerId');
	var val = markers[index].getPosition().toString();
	$('#myPlaces').append('<li>' + val + '</li>');
	populateStorage(index, val);
}

function setMyPlaces(index) {
	var val = localStorage.getItem("placeName" + index);
	console.log(val);
	$('#myPlaces').append('<li data-LatLng="' + val +'">' + val + '</li>');
	
  
}

function populateStorage(index, val) {
  	var placeName = 'placeName' + index;
  	console.log(placeName);
  	localStorage.setItem(placeName, val);

	//setMyPlaces(index);
}

populateStorage();
$('#myPlaces').append('<li>' + 'asd' + '</li>');
	  
	

google.maps.event.addDomListener(window, 'load', initialize);


//});