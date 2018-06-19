/* Inicializa y agrega el mapa cuando se carga la página web */
initMap = () => {
    // variable para la ruta
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
  
    let laboratoriaLima = {
      lat: -12.1260837,
      lng: -77.0228761
    };
  
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: laboratoriaLima
    });
  
    let marker = new google.maps.Marker({
      position: laboratoriaLima,
      map: map,
      icon: 'assets/images/car.png'
    });
  
    /* Al cargar la pagina se pedirá permiso para saber la ubicación geografica del user */
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
  
    /* Al hacer click en el boton encuentrame se pedirá permiso para saber la ubicación geografica del user */
    let latitud, longitud;
    let functionSuccess = (position) => {
      latitud = position.coords.latitude;
      longitud = position.coords.longitude;
      map.setZoom(18);
      map.setCenter({
        lat: latitud,
        lng: longitud
      });
      let myUbication = new google.maps.Marker({
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
  
    /* Se dibujará la ruta */
    directionsDisplay.setMap(map);
    // Autocompletar
    let startAutoComp = (document.getElementById('imp1'));
    let autocompliteStart = new google.maps.places.Autocomplete(startAutoComp);
    autocompliteStart.bindTo('bounds', map);
    let EndAutoComp = (document.getElementById('imp2'));
    let autocompliteEnd = new google.maps.places.Autocomplete(EndAutoComp);
    autocompliteEnd.bindTo('bounds', map);
  
    /* Evento boton trazar ruta */
    document.getElementById('ruta').addEventListener('click', () => { 
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  };
  
  /* Calcular la ruta */
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
  
  /* Esta función mostrará un error si la geolocalización falló*/
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }