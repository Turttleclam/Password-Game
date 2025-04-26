// The tbody element
const info = document.getElementById('data');
let start_index = 0;
let end_index = 9;
let array = [];

fetch('http://localhost:3000/data')
.then((res) => res.json())
.then((data) => {
    array = data;
    displayData(array.slice(start_index, end_index));
})
.catch((err) => {
    info.innerHTML = `<p class="class">Error loadig table.</p>`;
});

const displayData = (data) => {
    data.forEach(({ username, publisher, character }, index) => {
        const row = document.createElement('tr');
        row.innerHTML += `
            <td class="${index}">${username}</td>
            <td>${publisher}</td>
            <td>${character}</td>
        `;
        info.appendChild(row);
    });
};

// const displayTable = async () => {

//     try{
//        const res = await fetch('http://localhost:3000/data');
//        const users = await res.json(); 

//        users.forEach(user => {
//         const row = document.createElement('tr');
//         row.innerHTML += `
//         <td>${user.username}</td>
//         <td>${user.publisher}</td>
//         <td>${user.character}</td>
//         `;
//         data.appendChild(row);
//        }); 

//     } catch (error) {
//         console.error('Error displaying users', error);
//     }
// };


document.addEventListener("DOMContentLoaded", () => {
    displayTable();
});





