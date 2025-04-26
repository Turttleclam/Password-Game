// The tbody element
const data = document.getElementById('data');

const displayTable = async () => {

    try{
       const res = await fetch('http://localhost:3000/data');
       const users = await res.json(); 
        
       users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.username}</td>`
        data.appendChild(row);
       }); 

    } catch (error) {
        console.error('Error displaying users', error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayTable();
});





