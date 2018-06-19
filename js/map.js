/* Starts and adds the map when the website is loaded */

initMap = () => {
    // Variable for the Route
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
  
    let laboratoriaGdl = {
      lat: 20.656932100000002,
      lng: -103.39735449999999
    };
  
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: laboratoriaGdl
    });
  
    let marker = new google.maps.Marker({
      position: laboratoriaGdl,
      map: map,
      icon: 'assets/images/car.png'
    });
  
    /* When the website loads is going to ask the users to know their location*/
    var infoWindow = new google.maps.InfoWindow({map: map});
  
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
    /* When you click on the find me button is going to ask for authorization to know the user's geographic location*/
    let latitud, longitud;
    let functionSuccess = (position) => {
      latitud = position.coords.latitude;
      longitud = position.coords.longitude;
      map.setZoom(18);
      map.setCenter({
        lat: latitud,
        lng: longitud
      });
      let myLocation = new google.maps.Marker({
        position: {
          lat: latitud,
          lng: longitud,
        },
        icon: 'assets/images/car.png',
        map: map
      });
    };
  
    let functionError = (error) =>{
      alert('We have an error locating your location');
    };
    
    let search = () => {
      event.preventDefault(event);
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
      }
    };
    
    document.getElementById('find-me').addEventListener('click', search);
  
    /* DRAW ROUTE */
    directionsDisplay.setMap(map);
    // Autocomplete
    let startAutoComp = (document.getElementById('imp1'));
    let autocompliteStart = new google.maps.places.Autocomplete(startAutoComp);
    autocompliteStart.bindTo('bounds', map);
    let EndAutoComp = (document.getElementById('imp2'));
    let autocompliteEnd = new google.maps.places.Autocomplete(EndAutoComp);
    autocompliteEnd.bindTo('bounds', map);
  
    /* Button Event - Draw Route */
    document.getElementById('ruta').addEventListener('click', () => { 
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  };
  
  /* Estimate the Route */
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('imp1').value,
      destination: document.getElementById('imp2').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  
  /* This function is going to show an error in case the geo-location failed*/
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }