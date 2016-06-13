app.directive('googleMap', function() {
  return {
    restrict: 'E',
    link: function (scope,element,attrs) {
      var mapDiv = document.createElement("div");
      mapDiv.style.width = "100%";
      mapDiv.style.height = "200px";
      element.prepend(mapDiv);

      var latitude = 37.46846;
      var longitude = 127.04003;
      var zoom = 15;

      if(attrs.location){
        latitude = attrs.location.split(',')[0];
        longitude = attrs.location.split(',')[1]
      }
      if(attrs.zoom){
        zoom = attrs.zoom;
      }
      new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }
  }
});
