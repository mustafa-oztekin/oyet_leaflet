var map = L.map('map').setView([39.739309, 30.483702], 14);

var li_items = document.querySelectorAll(".sidebar ul li");
var hamburger = document.querySelector(".hamburger");
var wrapper = document.querySelector(".wrapper");

li_items.forEach((li_item)=>{
    li_item.addEventListener("mouseenter", ()=>{
 
     li_item.closest(".wrapper").classList.remove("hover_collapse");
 
   })
 })

 li_items.forEach((li_item)=>{
    li_item.addEventListener("mouseleave", ()=>{
 
     li_item.closest(".wrapper").classList.add("hover_collapse");
 
    })
 })

 hamburger.addEventListener("click", () => {

    hamburger.closest(".wrapper").classList.toggle("hover_collapse");
})

var googleBasemap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution:"Oyet",
    maxZoom:20,
    subdomains:['mt0', 'mt1', 'mt2', 'mt3']
});

googleBasemap.addTo(map);

// var C = [39.746909, 30.474223];
 //var B1 = [39.739309, 30.483702];
// var A1 = [39.733678, 30.481098];
// var A2 = [39.733149, 30.486781];
// var A3 = [39.736249, 30.489961];
// var A4 = [39.739566, 30.492043];


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

// var circle_c = L.circle(C, stil_c).addTo(map);
// var circle_b1 = L.circle(B1, stil_b).addTo(map);
// var circle_a1 = L.circle(A1, stil_a).addTo(map);
// var circle_a2 = L.circle(A2, stil_a).addTo(map);
// var circle_a3 = L.circle(A3, stil_a).addTo(map);
// var circle_a4 = L.circle(A4, stil_a).addTo(map);


// var a1_zoom = circle_a1.getBounds();
// var a2_zoom = circle_a2.getBounds();
// var a3_zoom = circle_a3.getBounds();
// var a4_zoom = circle_a4.getBounds();


const audioElement = document.getElementById("myAudio");



// modül ekle butonu işlev
const showbutc = document.getElementById('cmod');
showbutc.addEventListener('click', function(){
    for (let i = 0; i < moduldizi.length; i++) {
        if (moduldizi[i][1][0] === "C") {
            circles[i].circle.addTo(map);
        }
    }
});

// modül ekle butonu işlev
const remove_butc = document.getElementById('cmod');
remove_butc.addEventListener('dblclick', function(){
    for (let i = 0; i < moduldizi.length; i++) {
        if (moduldizi[i][1][0] === "C") {
            circles[i].circle.removeFrom(map);
        }
    }
});

// modül ekle butonu işlev
const showbutb = document.getElementById('bmod');
showbutb.addEventListener('click', function(){
    for (let i = 0; i < moduldizi.length; i++) {
        if (moduldizi[i][1][0] === "B") {
            circles[i].circle.addTo(map);
        }
    }
});

// modül ekle butonu işlev
const remove_butb = document.getElementById('bmod');
remove_butb.addEventListener('dblclick', function(){
    for (let i = 0; i < moduldizi.length; i++) {
        if (moduldizi[i][1][0] === "B") {
            circles[i].circle.removeFrom(map);
        }
    }
});

// modül ekle butonu işlev
const showbuta = document.getElementById('amod');
showbuta.addEventListener('click', function(){
    for (let i = 0; i < moduldizi.length; i++) {
        if (moduldizi[i][1][0] === "A") {
            circles[i].circle.addTo(map);
        }
    }
});

// modül ekle butonu işlev
const remove_buta = document.getElementById('amod');
remove_buta.addEventListener('dblclick', function(){
    for (let i = 0; i < moduldizi.length; i++) {
        if (moduldizi[i][1][0] === "A") {
            circles[i].circle.removeFrom(map);
        }
    }
});


let circles = []; // Çemberlerin bilgilerini saklayacağımız bir dizi
// modüller statik olarak olmayacak, dinamik olarak veritabanından gelecek ve haritada gösterilecek
let moduldizi = [];
let moduldizi1 = [];

fetch('http://127.0.0.1:8000/items')
.then(response => response.json())
.then(data => {
    data.forEach(item => {
      moduldizi1.push(item.id);
      moduldizi1.push(item.name);
      moduldizi1.push(item.zone);
      moduldizi1.push(item.enlem);
      moduldizi1.push(item.boylam);
      moduldizi.push(moduldizi1);
      if (item.name === "C") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_c).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      else if (item.name === "B1") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_b).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      else {
        const newCircle = L.circle([item.enlem, item.boylam], stil_a).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      moduldizi1 = [];
    });
    //console.log(circles);
})
.catch(error => console.error('Hata:', error));

document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.getElementById("addButton");
  let modal = document.getElementById("myModal");
  
  addButton.addEventListener("click", function() {
    modal.style.display = "flex"; // Modalı göster
  });

  const customCircle = L.circle([39.738678, 30.488098], stil_a);

  let isMoving = false;
  let yerlestir = false;


// Tıklamalı butonlara tıklanınca
const moduleButtons = document.querySelectorAll(".module-button");
moduleButtons.forEach(button => {
  button.addEventListener("click", function() {
    const selectedValue = button.getAttribute("data-value");
    console.log("Seçiminiz: " + selectedValue);
    if (selectedValue === 'A') {
      customCircle.addTo(map);
      yerlestir = true;
      isMoving = true;
      // click içindekilerin birazı buraya alınacak
    }
    modal.style.display = "none"; // Modalı gizle
  });
});
  
map.on('mousemove', (e) => {
    if (isMoving) {
      const { clientX, clientY } = e.originalEvent;
      const { left, top } = map.getContainer().getBoundingClientRect();
      const x = (clientX - left) - (customCircle._radius / 2);
      const y = (clientY - top) - (customCircle._radius / 2);
      customCircle.setLatLng(map.containerPointToLatLng(L.point(x, y)));
    }
});



// pencere için deneme
const pencere = document.getElementById("mypencere");
const modulekle = document.getElementById("modul-ekle");
const modulname = document.getElementById("modulname");
const modulzone = document.getElementById("modulzone");
const enlem = document.getElementById("enlem");
const boylam = document.getElementById("boylam");


// let circles = []; // Çemberlerin bilgilerini saklayacağımız bir dizi

map.on('click', (e) => {
  if (yerlestir) {
    const clickedLatLng = e.latlng;
    customCircle.removeFrom(map);
    yerlestir = false;
    // deneme yapıyorum
    pencere.style.display = "block";
    enlem.textContent = e.latlng.lat.toFixed(6);
    boylam.textContent = e.latlng.lng.toFixed(6);


    modulekle.addEventListener('click', addNewItem);

    async function addNewItem() {
      const data = {
        "id":15,
        "name": modulname.value,
        "zone": modulzone.value,
        "enlem": e.latlng.lat.toFixed(6),
        "boylam": e.latlng.lng.toFixed(6)
      };
  
      try {
        const response = await fetch('http://127.0.0.1:8000/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error('HTTP Error ' + response.status);
        }
  
        const newItem = await response.json();
        console.log('Yeni eklenen öğe:', newItem);
  
        // Yeni eklenen öğeyi tabloya eklemek için gerekli kodları burada yazabilirsiniz
        const newCircle = L.circle(clickedLatLng, stil_a).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: modulname.value }); // Yeni çemberi diziye ekle
        pencere.style.display = "none";
  
      } catch (error) {
        console.error('Hata:', error);
      }
      pencere.style.display = "none";
    }
  }

    if (modal.style.display === "flex") {
      modal.style.display = "none";
    }
    if (isMoving) {
      isMoving = false; } // Fare hareketini durdur

      // Önceki çember dinleyicilerini kaldır
    circles.forEach(circleInfo => {
        const circle = circleInfo.circle;
        circle.off('click');
    });

        circles.forEach(circleInfo => {
        const circle = circleInfo.circle;
        const circleName = circleInfo.name;
        // console.log(circleName);
        circle.on('click', () => {
            console.log("Tıklanan çemberin ismi:", circleName);
            // AJAX ile çember ismini backend'e gönder veya başka işlemler yap
            // deneme yapıyorum
                // circle_a4.bindPopup('A4 modülü <br> Sıcaklık: ' + randomNumber(), closeOnClick = true).openPopup();
                const data = {modul: "M" + circleName};
                $.ajax({
                  url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
                  type: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(data),
                  success: function(response) {
                    console.log("İstek başarılı: ", response);
                    // Cevap geldiğinde popup'ı açma işlemi
                    /*
                    if (response.success) {
                      const popupContent = 'A4 modülü <br> Sıcaklık: ' + response.data;
                      circle_a4_popup.setContent(popupContent);
                      circle_a4_popup.setLatLng(circle.getLatLng());
                      circle_a4_popup.openOn(map);
                     // response.success = false; // Popup'ın tekrar açılmaması için
                    }*/
                  },
                  error: function(xhr, status, error) {
                    console.error("İstek hatası: ", error);
                  }
                });
            //
            //
            //
            //
        });
    }); 
});

/*
  // Tıklamalı butonlara tıklanınca
  const moduleButtons = document.querySelectorAll(".module-button");
  moduleButtons.forEach(button => {
    button.addEventListener("click", function() {
      const selectedValue = button.getAttribute("data-value");
      console.log("Seçiminiz: " + selectedValue);
      if (selectedValue === 'A') {
        // customCircle = L.circle([39.738678, 30.488098], stil_a).addTo(map);
        customCircle.addTo(map);
        yerlestir = true;
        isMoving = true;

        // click içindekilerin birazı buraya alınacak

      }
      modal.style.display = "none"; // Modalı gizle
    });
  });
  */
});


/*
let circles = []; // Çemberlerin bilgilerini saklayacağımız bir dizi

// modüller statik olarak olmayacak, dinamik olarak veritabanından gelecek ve haritada gösterilecek
let moduldizi = [];
let moduldizi1 = [];
fetch('http://127.0.0.1:8000/items')
.then(response => response.json())
.then(data => {
    data.forEach(item => {
      moduldizi1.push(item.id);
      moduldizi1.push(item.name);
      moduldizi1.push(item.zone);
      moduldizi1.push(item.enlem);
      moduldizi1.push(item.boylam);
      moduldizi.push(moduldizi1);
      if (item.name === "C") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_c).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      else if (item.name === "B1") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_b).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      else {
        const newCircle = L.circle([item.enlem, item.boylam], stil_a).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      moduldizi1 = [];
    });
    //console.log(circles);
})
.catch(error => console.error('Hata:', error));
*/