var currentCoords; // Variable, that holds the current coordinates the user has navigated to
var coords = {
  // Object containing all the place-objects
  // You can easily add places manually 
  'tamk': {'x':61.503835, 'y':23.808869, 'a':"Tampereen ammattikorkeakoulu", 'i': "Paikka, jossa opiskella jotta ei ole tyhmyri kuten minä."},
  'koskik': {'x':61.495518, 'y':23.767635, 'a': "Kauppakeskus Koskikeskus", 'i': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus dui sit amet est faucibus sollicitudin. Nam mollis consectetur nibh pulvinar feugiat. Donec enim tortor, sodales eget erat sed, porttitor vehicula libero."},
  'verkkis': {'x':61.467167, 'y':23.7197424, 'a': "Verkkokauppa.com", 'i': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus dui sit amet est faucibus sollicitudin. Nam mollis consectetur nibh pulvinar feugiat. Donec enim tortor, sodales eget erat sed, porttitor vehicula libero."},
  'juna': {'x':61.4983374, 'y':23.7728224, 'a': "Tampereen rautatieasema", 'i': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus dui sit amet est faucibus sollicitudin. Nam mollis consectetur nibh pulvinar feugiat. Donec enim tortor, sodales eget erat sed, porttitor vehicula libero."},
  'bussi': {'x':61.4934552, 'y':23.7701949, 'a': "Tampereen linja-autoasema", 'i': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus dui sit amet est faucibus sollicitudin. Nam mollis consectetur nibh pulvinar feugiat. Donec enim tortor, sodales eget erat sed, porttitor vehicula libero."},
  'sarkka': {'x':61.5049611, 'y':23.7430924, 'a': "Huvipuisto Särkänniemi", 'i': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus dui sit amet est faucibus sollicitudin. Nam mollis consectetur nibh pulvinar feugiat. Donec enim tortor, sodales eget erat sed, porttitor vehicula libero."}
}

function initMap() {
  // The main function, that is called when the page loads 
  drawMainMap(13); // Initialize the main map, top of the page
  drawBigMap(09); // Initialize the background map, bottom of the page
  dropTheMarkers(); // Drop all the markers on the map for places in the object coords
  writeTheUrls();
  // Listeners
  google.maps.event.addDomListener(window, "resize", function() { centerOnResize(); }); // Keep both maps centered when the window is resized 
  map.addListener('bounds_changed', function() { printCoordinates(); }); // Pass the coordinates to currentCoords-variable and print the coordinates on screen to element called "coordinates"
} // End of initMap

function drawMainMap(zoomLvl) {
  // Initialize the main map, top of the page
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoomLvl,
    center: new google.maps.LatLng(61.492164, 23.771061),
    disableDefaultUI: true
  });
}

function drawBigMap(zoomLvl) {
  // Initialize the background map, bottom of the page
  bigmap = new google.maps.Map(document.getElementById('bigmap'), {
    zoom: zoomLvl,
    center: new google.maps.LatLng(61.492164, 23.771061),
    disableDefaultUI: true, 
    styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [{visibility: "off"}]
          }
        ]
  });
}

function dropTheMarkers() {
  // Drop all the markers on the map for places in the object coords
  for (var key in coords) {
    var coord = coords[key];
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(coord.x, coord.y),
      map: map,
      animation: google.maps.Animation.DROP,
      title: coord.a
    });
  }

  /* Infowindow
  // https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple-max
  var contentString = '<div>'+
    '<h3>'+coord.a+'</h3>'+
    '<p class="infoBoxP">'+coord.i+'</p>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });*/
}

function writeTheUrls() { 
  for (var key in coords) {
    $('#navmenu').append("<li> <a href=\'#\' onclick=\'changeCenter(\"" +key+ "\")\'>" +coords[key].a+ "</a> </li>");
  }
}

function printCoordinates() {
  // Pass the coordinates to currentCoords-variable and print the coordinates on screen to element called "coordinates"
  currentCoords = map.getCenter(),
  document.getElementById("coordinates").innerHTML = currentCoords,
  bigmap.panTo(currentCoords);
}

function centerOnResize() {
  // Keep both maps centered when the window is resized
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  google.maps.event.trigger(bigmap, "resize");
  map.panTo(center); 
  bigmap.panTo(center);
}

function changeCenter(ele) {
  // changeCenter is called when clicking on an URL on the site
  // It changes the center of the map to specific coordinates
  //var myLatLng = new google.maps.LatLng(coords[ele].x, coords[ele].y);
  map.panTo(new google.maps.LatLng(coords[ele].x, coords[ele].y)),
  map.setZoom(15);
}

