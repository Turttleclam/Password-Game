// The tbody element
const info = document.getElementById('data');
const userSearch = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const searchDisplay = document.getElementById('searchDisplay');
const submitBtn = document.getElementById('submit');
const username = document.getElementById('username');
const createBtn = document.getElementById('create');
const addNewUser = document.getElementById('addNewUser');
const pwd = document.getElementById('pwd');
const updateMsg = document.getElementById('updateMsg');
const fav_com = document.getElementById('fav_comic');
const char = document.getElementById('char');
const reset = document.getElementById('reset');
let start_index = 0;
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

const searchFetch = () => {fetch(`http://localhost:3000/search/${userSearch.value}`)
    .then((res) => res.json())
    .then((data) => {
        array = data;
        displaySearch(array);
    })
    .catch((err) => {
        console.log(err);
        searchDisplay.innerHTML = `
        <tr>
        <td>Waiting for search results</td>
        </tr>
        `;
})};


const displaySearch = (data) => {
    data.forEach(({ username, publisher, character }) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${username}</td>
            <td>${publisher}</td>
            <td>${character}</td>
        `;
        searchDisplay.appendChild(row);
    });
};

searchBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/search/${userSearch.value}`)
    .then((res) => res.json())
    .then((data) => {
        array = data;
        displaySearch(array);
    })
    .catch((err) => {
        searchDisplay.innerHTML = `
        <tr>
        <td>Error returning search results</td>
        </tr>
        `;
    });
});
userSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchFetch();
    }
});

submitBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            pwd: pwd.value
        })
    })
    .then((res) => res.json())
    .then(() => {
        updateMsg.innerHTML += `
            <p>
            ${username.value}'s account has been updated!
            </p>
            `
    })
    .catch((err) => {
        updateMsg.innerHTML = `
        <p>
        ${username} account could not be updated. Check server.
        </p>`;
    });

});

createBtn.addEventListener("click", () => {
    // Hide create button and show input elememnts
    createBtn.style.display = "none";
    addNewUser.style.display = "initial";
    fav_com.style.display = "initial";
    char.style.display = "initial";
});

addNewUser.addEventListener("click", () => {

    fetch('http://localhost:3000/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            pwd: pwd.value,
            fav_comic: fav_com.value,
            char: char.value
        })
    })
    .then((res) => res.json())
    .then(() => {
        updateMsg.innerHTML = `
        <p>
        ${username.value}'s account has been added!
        </p>
        `
    })
    .catch((err) => {
        updateMsg.innerHTML = `
        <p>
        The accound for ${username.value} could not be added:(
        </p>
        `
    }) 
});

reset.addEventListener("click", () => {
    updateMsg.innerHTML = ""; // Clear the updateMsg field
    searchDisplay.innerHTML = ""; // Clears search Display
    userSearch.value = "";
    fav_com.value = "";
    username.value = "";
    pwd.value = "";
    createBtn.style.display = "initial"; 
    addNewUser.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/data')
    .then((res) => res.json())
    .then((data) => {
        array = data;
        displayData(array.slice(start_index, array.length));
    })
    .catch((err) => {
        info.innerHTML = `
        <tr>
        <td>Error loading table.</td>
        </tr>
        `;
    });
});

