// The tbody element
const info = document.getElementById('data');
let start_index = 0;
let end_index = 9;
let array = [];

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

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/data')
.then((res) => res.json())
.then((data) => {
    array = data;
    displayData(array.slice(start_index, end_index));
})
.catch((err) => {
    info.innerHTML = `<p>Error loading table.</p>`;
});

});





