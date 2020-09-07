let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.87, lng: -111.76 },
    zoom: 8,
    disableDefaultUI: true,
    scaleControl: true,
    zoomControl: true,
    fullscreenControl: true
  });

  let marker = new google.maps.Marker({
    position: { lat: 34.87, lng: -111.76 },
    map: map,
    icon: "../img/icon-map-marker.svg"
  });

  let infowindow = new google.maps.InfoWindow({
    content: "Седона - Рай для туристов!"
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
