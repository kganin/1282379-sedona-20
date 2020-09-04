// function init() {
//   var myMap = new ymaps.Map("map", {
//     center: [34.869497, -111.760186],
//     zoom: 8,
//     controls: ["zoomControl"]
//   });
//   myPlacemark = new ymaps.Placemark([34.8544438,-111.8301579], {
//     hintContent: "Седона - Рай для туристов!",
//     }, {
//     iconLayout: "default#image",
//     iconImageHref: "../img/icon-map-marker.svg",
//     iconImageSize: [27, 27],
//     iconImageOffset: [0, -15]
//   }), myMap.behaviors.disable("scrollZoom"), myMap.geoObjects.add(myPlacemark)
// }
// ymaps.ready(init);



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
