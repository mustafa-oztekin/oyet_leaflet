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



const table1 = document.getElementById('table1');
table1.style.transform = 'translate(220px, 60px)';


fetch('http://127.0.0.1:8000/items')
.then(response => response.json())
.then(data => {
    const tableBody = document.querySelector('#table1 tbody');
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

