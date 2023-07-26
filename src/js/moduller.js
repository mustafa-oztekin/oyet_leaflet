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





fetch('http://127.0.0.1:8000/items')
.then(response => response.json())
.then(data => {
    const tableBody = document.querySelector('#moduller-table tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.zone}</td>
            <td>${item.enlem}</td>
            <td>${item.boylam}</td>
        `;
        tableBody.appendChild(row);
    });
})
.catch(error => console.error('Hata:', error));



// modül ekle butonu işlev
const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addNewItem);

  async function addNewItem() {
    const data = {
      "id":11,
      "name": "rün",
      "zone": "A",
      "enlem": 20.123,
      "boylam": 20.987
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

    } catch (error) {
      console.error('Hata:', error);
    }
  }