// The tbody element
const info = document.getElementById('data');
const userSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
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

searchBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/search/${userSearch.value}`)
    .then((res) => res.json())
    .then((data) => {
        array = data;
        displayData(array);
    })
    .catch((err) => {
        info.innerHTML = `<p>Error returning search results</p>`;
    });
});

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

