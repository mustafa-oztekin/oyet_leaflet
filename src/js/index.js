var map = L.map('map').setView([39.739309, 30.483702], 14);

//map.on('click', function(e){
    //debugger;
 //   $.ajax({
  //      url: "http://127.0.0.1:8000/tcp",
   //     method: "GET",
   //     success: function(response) {
  //        console.log(response);
  //      },
  //      error: function(error) {
  //        console.log(error);
  //      }
  //    });
//});

var googleBasemap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution:"Oyet",
    maxZoom:20,
    subdomains:['mt0', 'mt1', 'mt2', 'mt3']
});

googleBasemap.addTo(map);

var C = [39.746909, 30.474223];
var B1 = [39.739309, 30.483702];
var A1 = [39.733678, 30.481098];
var A2 = [39.733149, 30.486781];
var A3 = [39.736249, 30.489961];
var A4 = [39.739566, 30.492043];

// var nokta_ank = L.marker(ank).addTo(map);
// var nokta_esk = L.marker(esk).addTo(map);
// var nokta_bur = L.marker(bur).addTo(map);

//    .bindPopup('Buradasınız.<br> Mustafa')
//    .openPopup();

var stil_a = {
    color:"#c0392b",
    fill:true,
    fillColor:"#f1c40f",
    fillOpacity:0.5
};
stil_a.radius = 300;

var stil_b = {
  color:"#c0392b",
  fill:true,
  fillColor:"#13FF00",
  fillOpacity:0.5
};
stil_b.radius = 500;

var stil_c = {
  color:"#c0392b",
  fill:true,
  fillColor:"#19FFE7",
  fillOpacity:0.5
};
stil_c.radius = 1000;

var stil2 = {
    color:"#c0392b",
    fill:true,
    fillColor:"#DB2F1D",
    fillOpacity:0.9
};
stil2.radius = 300;

var circle_c = L.circle(C, stil_c).addTo(map);
var circle_b1 = L.circle(B1, stil_b).addTo(map);
var circle_a1 = L.circle(A1, stil_a).addTo(map);
var circle_a2 = L.circle(A2, stil_a).addTo(map);
var circle_a3 = L.circle(A3, stil_a).addTo(map);
var circle_a4 = L.circle(A4, stil_a).addTo(map);

var c_zoom = circle_c.getBounds();
var b1_zoom = circle_b1.getBounds();
var a1_zoom = circle_a1.getBounds();
var a2_zoom = circle_a2.getBounds();
var a3_zoom = circle_a3.getBounds();
var a4_zoom = circle_a4.getBounds();

// 6-7 Haziran





function randomNumber() {
  var num = (Math.random()*(10) + 20).toFixed(1);
  return num;
};

circle_c.on('click', function(){
  circle_c.bindPopup('C modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
  //var sonuc = (ank[0] + esk[0]) / 2;
});

circle_b1.on('click', function(){
  circle_b1.bindPopup('B1 modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
});

circle_a1.on('click', function(){
  // circle_a1.bindPopup('A1 modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
  const data_a1 = {modul: "A1"};
  $.ajax({
    url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data_a1),
    success: function(response) {
      console.log("İstek başarılı: ", response);
    },
    error: function(xhr, status, error) {
      console.error("İstek hatası: ", error);
    }
  });
});

circle_a2.on('click', function(){
  // circle_a2.bindPopup('A2 modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
  const data_a2 = {modul: "A2"};
  $.ajax({
    url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data_a2),
    success: function(response) {
      console.log("İstek başarılı: ", response);
    },
    error: function(xhr, status, error) {
      console.error("İstek hatası: ", error);
    }
  });
});

circle_a3.on('click', function(){
  // circle_a3.bindPopup('A3 modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
  const data_a3 = {modul: "A3"};
  $.ajax({
    url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data_a3),
    success: function(response) {
      console.log("İstek başarılı: ", response);
    },
    error: function(xhr, status, error) {
      console.error("İstek hatası: ", error);
    }
  });
});

circle_a4.on('click', function(){
  // circle_a4.bindPopup('A4 modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
  const data_a4 = {modul: "A4"};
  $.ajax({
    url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data_a4),
    success: function(response) {
      console.log("İstek başarılı: ", response);
    },
    error: function(xhr, status, error) {
      console.error("İstek hatası: ", error);
    }
  });
});

const eventSource = new EventSource("http://127.0.0.1:8000/sse");//FastAPI SSE endpointinizin URL'si

eventSource.onmessage = function(event) {
  console.log("Gelen veri:", event.data);
  if (event.data === 'C') {
    map.fitBounds(c_zoom);
    circle_c.setStyle(stil2);
    setTimeout(() => {circle_c.setStyle(stil);}, 250);
  }
  else if (event.data === 'B1') {
    map.fitBounds(b1_zoom);
    circle_b1.setStyle(stil2);
    setTimeout(() => {circle_b1.setStyle(stil);}, 250);
  }
  else {
    map.fitBounds(a1_zoom);
    circle_a1.setStyle(stil2);
    setTimeout(() => {circle_a1.setStyle(stil);}, 250);
  }
  // console.log(typeof event.data);
};