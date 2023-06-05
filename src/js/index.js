var map = L.map('map').setView([(39.9286946+39.746789+40.223023)/3,
                                (32.81890+30.474305+28.850525)/3], 9);

map.on('click', function(e){
    //debugger;

    $.ajax({
        url: "http://127.0.0.1:8000/events/",
        method: "GET",
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
});

var googleBasemap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution:"Oyet",
    maxZoom:20,
    subdomains:['mt0', 'mt1', 'mt2', 'mt3']
});

googleBasemap.addTo(map);

var ank = [39.9286946, 32.81890];
var esk = [39.746789, 30.474305];
var bur = [40.223023, 28.850525];

var nokta_ank = L.marker(ank).addTo(map);
var nokta_esk = L.marker(esk).addTo(map);
var nokta_bur = L.marker(bur).addTo(map);

//    .bindPopup('Buradasınız.<br> Mustafa')
//    .openPopup();

var stil = {
    color:"#c0392b",
    fill:true,
    fillColor:"#f1c40f",
    fillOpacity:0.5
};
stil.radius = 20000;

var stil2 = {
    color:"#c0392b",
    fill:true,
    fillColor:"#2ecc71",
    fillOpacity:0.6
};
stil2.radius = 20000;

var circle_ank = L.circle(ank, stil).addTo(map);
var circle_esk = L.circle(esk, stil).addTo(map);
var circle_bur = L.circle(bur, stil).addTo(map);

var ank_zoom = circle_ank.getBounds();
var esk_zoom = circle_esk.getBounds();
var bur_zoom = circle_bur.getBounds();


circle_ank.on('mouseover', function(e){
    e.target.setStyle(stil2);
    nokta_ank.bindPopup('Buradasınız.<br> Ankara').openPopup();
});

circle_esk.on('mouseover', function(e){
    e.target.setStyle(stil2);
    nokta_esk.bindPopup('Buradasınız.<br> Eskişehir').openPopup();
});

circle_bur.on('mouseover', function(e){
    e.target.setStyle(stil2);
    nokta_bur.bindPopup('Buradasınız.<br> Bursa').openPopup();
});

circle_ank.on('mouseout', function(e){
    e.target.setStyle(stil);
    nokta_ank.closePopup();
});

circle_esk.on('mouseout', function(e){
    e.target.setStyle(stil);
    nokta_esk.closePopup();
});

circle_bur.on('mouseout', function(e){
    e.target.setStyle(stil);
    nokta_bur.closePopup();
});

const eventSource = new EventSource("http://127.0.0.1:8000/sse");//FastAPI SSE endpointinizin URL'si

eventSource.onmessage = function(event) {
  console.log("Gelen veri:", event.data);
  if (event.data === 'A1') {
    map.fitBounds(ank_zoom);
    circle_ank.setStyle(stil2);
    setTimeout(() => {circle_ank.setStyle(stil);}, 250);
  }
  else if (event.data === 'A2') {
    map.fitBounds(esk_zoom);
    circle_esk.setStyle(stil2);
    setTimeout(() => {circle_esk.setStyle(stil);}, 250);
  }
  else {
    map.fitBounds(bur_zoom);
    circle_bur.setStyle(stil2);
    setTimeout(() => {circle_bur.setStyle(stil);}, 250);
  }
  // console.log(typeof event.data);
  // setTimeout(() => { map.fitBounds(ank_zoom); }, 2000);
};