

// DOM objects
const grid = document.querySelector('.grid');
const clearBtn = document.getElementById('clear-btn');
const resizeBtn = document.getElementById('resize-btn');
const randomBtn = document.getElementById('random-btn');

let boxArr = [];

function createGrid(dimension = 16) {
    grid.setAttribute('style',`grid-template-columns: repeat(${dimension}, 1fr); grid-template-rows: repeat(${dimension}, 1fr)`);

    for (let i = 0; i < (dimension * dimension); i++) {
        const box = document.createElement('div');
        box.setAttribute('id',`box${i}`);
        box.classList.add('default-color');
        boxArr.push(box);
        grid.appendChild(box);
    }

    boxArr.forEach(cur => cur.addEventListener('mouseover', changeColor));
}

function changeColor(event) {
    const id = event.target.id;
    const divBox = document.getElementById(`${id}`);
    divBox.style.backgroundColor = '#2d2d2d';
}

function changeRandomColor(event) {
    const id = event.target.id;
    const divBox = document.getElementById(`${id}`);
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    divBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function createRandomGrid() {
    boxArr.forEach(cur => cur.addEventListener('mouseover', changeRandomColor));
}

function clearGrid() {
    boxArr.forEach(cur => cur.style.backgroundColor = 'whitesmoke');
    boxArr.forEach(cur => cur.removeEventListener('mouseover', changeRandomColor));
    boxArr.forEach(cur => cur.addEventListener('mouseover', changeColor));
}

function changeDimensions() {
    const input = parseInt(prompt('How many squares per side do you want?'), 10);
    if (input && typeof input === 'number') {
        dimension = input;

        grid.innerHTML = '';
        boxArr = [];
        createGrid(dimension);
    } else {
        alert('Please enter a valid number');
        changeDimensions();
    }
}

window.addEventListener('load', createGrid());
clearBtn.addEventListener('click', clearGrid);
resizeBtn.addEventListener('click', changeDimensions);
randomBtn.addEventListener('click', createRandomGrid);