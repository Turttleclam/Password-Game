// The tbody element
const data = document.getElementById('data');

const displayTable = async () => {

    try{
       const res = await fetch('http://localhost:3000/data');
       const users = await res.json(); 

       // Destructure the data from the DB
       const { username, publisher, character } = users;

       users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.publisher}</td>
        <td>${user.character}</td>
        `
        data.appendChild(row);
       }); 

    } catch (error) {
        console.error('Error displaying users', error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayTable();
});





