$(document).ready(function(){
  
  function initMap() {
    var latlng = new google.maps.LatLng(151.5, 0);
    var mapOptions = {
      center: latlng,
      zoom: 1,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [{"featureType":"water","stylers":[{"saturation":3},{"lightness":11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":100},{"lightness":9}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#808080"},{"lightness":4}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"road","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
        };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function drivingRoute(from, to) {
    var request = {
      origin: from,
      destination: to,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    };
    $('#controls p').removeClass('error');
    $('#controls p').text('loading');
    if(typeof(drivingLine) !== 'undefined') drivingLine.setMap(null);
    directionsService.route(request, function(response, status){
      if(status == google.maps.DirectionsStatus.OK){

        var totalKM = (response.routes[0].legs[0].distance.value / 1000);
        var miles = Math.round(totalKM * 0.621371192 * 10) / 10 * 1.7;
        var distanceText = miles+' KM';
        $('#controls p').text(distanceText);

        drivingLine = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          strokeColor: "#b00",
          strokeOpacity: .75,
          strokeWeight: 5
        });
        drivingLine.setMap(map);
        map.fitBounds(response.routes[0].bounds);
        
      }
      
      else {
        $('#controls p').addClass('error');
        $('#controls p').text('cannot load route');
      }
 
    });

  }

  $('input').blur(function(){
    drivingRoute(
      $('input[name=from]').val(),
      $('input[name=to]').val()
    );
  });
  
  var map;
  var drivingLine;
  var directionsService = new google.maps.DirectionsService();
  initMap();
  $('input[name=from]').val('47.681492, 8.618680');
  $('input[name=to]').val('Stuttgart');
  $('input[name=from]').trigger('blur');
});