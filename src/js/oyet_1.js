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

var C_merkez = [39.746909, 30.474223];
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
  fill:false,
  fillColor:"#19FFE7",
  fillOpacity:0.5
};
stil_c.radius = 1500;

var stil_c_merkez = {
    color:"#c0392b",
    fill:true,
    fillColor:"#19FFE7",
    fillOpacity:0.5
  };
  stil_c_merkez.radius = 200;

var stil2 = {
    color:"#c0392b",
    fill:true,
    fillColor:"#DB2F1D",
    fillOpacity:0.9
};
stil2.radius = 300;

var circle_c_merkez = L.circle(C_merkez, stil_c_merkez).addTo(map);
// var circle_b1 = L.circle(B1, stil_b).addTo(map);
// var circle_a1 = L.circle(A1, stil_a).addTo(map);
// var circle_a2 = L.circle(A2, stil_a).addTo(map);
// var circle_a3 = L.circle(A3, stil_a).addTo(map);
// var circle_a4 = L.circle(A4, stil_a).addTo(map);


// var a1_zoom = circle_a1.getBounds();
// var a2_zoom = circle_a2.getBounds();
// var a3_zoom = circle_a3.getBounds();
// var a4_zoom = circle_a4.getBounds();

const circle_popup = L.popup();


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
      if (item.name[0] === "C") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_c).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      else if (item.name[0] === "B") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_b).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      else if (item.name[0] === "A") {
        const newCircle = L.circle([item.enlem, item.boylam], stil_a).addTo(map);
        circles.push({ circle: newCircle, isMoving: true, name: item.name });
      }
      moduldizi1 = [];
    });
})
.catch(error => console.error('Hata:', error));


/* sse endpointi ekleme denemesi yapıyorum 14 eylül perşembe evde */

const eventSource = new EventSource("http://127.0.0.1:8000/sse");//FastAPI SSE endpointinizin URL'si
// burayı etkinleştirr**********************
eventSource.onmessage = function(event) {
  console.log("Gelen veri:", event.data);
  circles.forEach(circleInfo => {
        const circle = circleInfo.circle;
        const circleName = circleInfo.name;
    if (event.data === circleName) {
        //console.log(circleName, circle);
        audioElement.play();
        map.fitBounds(circle.getBounds());
        circle.setStyle(stil2);
        setTimeout(() => {circle.setStyle(stil_a);}, 500);
    }
    //console.log(circleInfo.name);
}); /*
  if (event.data === 'A1') {
    audioElement.play();
    map.fitBounds(a1_zoom);
    circle_a1.setStyle(stil2);
    setTimeout(() => {circle_a1.setStyle(stil_a);}, 500);
  } */
};




// 100 defa test
let sayac = 0;
let sayac1 = 0;
let maxIslemSayisi = 100;
let interval;

function sendRequest() {
  if (sayac < maxIslemSayisi) {
    $.ajax({
      url: "http://127.0.0.1:8000/tcp",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({durum: "Sorgu", id: "X", type: "X", len: "X", data: "X", say: "0"}),
      success: function(response) {
        sayac1++;
        console.log("İstek başarılı: ", response);
        if (response.success) {
          sayac++;
        }
        if (sayac1 === maxIslemSayisi) {
          console.log("Toplam başarılı işlem sayısı: ", sayac);
          clearInterval(interval); // İşlem tamamlandığında interval'i durdur
        }
      },
      error: function(xhr, status, error) {
        console.error("İstek hatası: ", error);
        sayac++;
      }
    });
  }
}

//interval = setInterval(function() {
//  sendRequest();
//}, 10000);

// İşlemi başlat
//setTimeout(function() {
//  sendRequest();
//}, 0); // Başlangıçta 0 saniyelik bekleme



let modal;
let degismodal;

document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    const degisbutton = document.getElementById('change');
    const degistirbutton = document.getElementById('degistir-button');
    modal = document.getElementById("myModal");
    degismodal = document.getElementById("mydegisim");
    const deger = document.getElementById("deger");
  
  addButton.addEventListener("click", function() {
    modal.style.display = "flex"; // Modalı göster
  });

  degisbutton.addEventListener('click', function() {
    degismodal.style.display = "flex"; // Modalı göster
  });

  degistirbutton.addEventListener('click', updateNewEdge);

  async function updateNewEdge() {
    if (Boolean(deger.value)) {
      console.log('Yeni sınır değer:', deger.value);

      const data_degis = {durum: "Limit", id: "B1", type: "X", len: deger.value.length, data: deger.value, say: "X"};
  $.ajax({
    url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data_degis),
    success: function(response) {
      console.log("İstek başarılı: ", response);
    },
    error: function(xhr, status, error) {
      console.error("İstek hatası: ", error);
    }
  });
      degismodal.style.display = "none";
      deger.value = '';
    }
    degismodal.style.display = "none";
  }

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

/* veritabanına yeni bir modül kaydediyorum */
modulekle.addEventListener('click', addNewItem);

    async function addNewItem() {
      const data = {
        "id":15,
        "name": modulname.value,
        "zone": modulzone.value,
        "enlem": clickedLatLng.lat.toFixed(6),
        "boylam": clickedLatLng.lng.toFixed(6)
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

let clickedLatLng; 
map.on('click', (e) => {
  if (yerlestir) {
    clickedLatLng = e.latlng;
    customCircle.removeFrom(map);
    yerlestir = false;
    // deneme yapıyorum
    pencere.style.display = "block";
    enlem.textContent = clickedLatLng.lat.toFixed(6);
    boylam.textContent = clickedLatLng.lng.toFixed(6);
  }

    if (modal.style.display === "flex") {
      modal.style.display = "none";
    }
    if (degismodal.style.display === "flex") {
        degismodal.style.display = "none";
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
        circle.on('click', () => {
            console.log("Circle Name:", circleName);
            if(circleName[0] === "A") {
              var data = {durum: "Sorgu", idA: circleName, idB: "X", type: "X", len: "X", data: "X", say: "1"};
            }
            else if(circleName[0] === "B") {
              var data = {durum: "Toplu", idA: "X", idB: circleName, type: "X", len: "X", data: "X", say: "1"};
            }
            // AJAX ile çember ismini backend'e gönder veya başka işlemler yap
            // deneme yapıyorum
                $.ajax({
                  url: "http://127.0.0.1:8000/tcp", // Endpoint URL'sini buraya ekleyin
                  type: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(data),
                  
                  success: function(response) {
                    console.log("İstek başarılı: ", response);
                    // Cevap geldiğinde popup'ı açma işlemi
                    let array = response.data.split("|");
                    if (response.success) {
                      const popupContent = circleName.fontsize(4) + '<br>Ara İst.: ' + array[2].fontsize(4) + '<br>Nem: ' + array[5].fontsize(4);
                      circle_popup.setContent(popupContent);
                      circle_popup.setLatLng(circle.getLatLng());
                      circle_popup.openOn(map);
                     // response.success = false; // Popup'ın tekrar açılmaması için
                    } 
                  },
                  
                  error: function(xhr, status, error) {
                    console.error("İstek hatası: ", error);
                  }
                  
            });
        });
    });
});
});
