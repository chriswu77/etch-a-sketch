// DOM objects
const grid = document.querySelector('.grid');
const clearBtn = document.getElementById('clear-btn');
const resizeBtn = document.getElementById('resize-btn');
const randomBtn = document.getElementById('random-btn');
const shadedBtn = document.getElementById('shaded-btn');

let boxArr = [];
let shadedFlag = true;
let randomFlag = true;

function createGrid(dimension = 16) {
    grid.setAttribute('style',`grid-template-columns: repeat(${dimension}, 1fr); grid-template-rows: repeat(${dimension}, 1fr)`);

    for (let i = 0; i < (dimension * dimension); i++) {
        const box = document.createElement('div');
        box.setAttribute('id',`box${i}`);
        box.setAttribute('data-count', '0');
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

function changeShadedColor(event) {
    const id = event.target.id;
    const divBox = document.getElementById(`${id}`);

    let count = parseFloat(divBox.dataset.count);
    if (count <= 0.9) {
        count += 0.1;
        divBox.style.backgroundColor = `rgba(45, 45, 45, ${count})`;
        divBox.setAttribute('data-count', `${count}`);
    }
}

function createShadedGrid(flag) {
    boxArr.forEach(cur => cur.removeEventListener('mouseover', changeRandomColor));
    randomBtn.classList.remove('rainbow-text');

    flag = shadedFlag;
    if (flag) {
        boxArr.forEach(cur => cur.addEventListener('mouseover', changeShadedColor));
        shadedBtn.classList.add('shaded-btn-focus');
        shadedFlag = false;
    } else {
        boxArr.forEach(cur => cur.removeEventListener('mouseover', changeShadedColor));
        boxArr.forEach(cur => cur.addEventListener('mouseover', changeColor));
        shadedBtn.classList.remove('shaded-btn-focus');
        shadedFlag = true;
    }
}

function createRandomGrid(flag) {
    boxArr.forEach(cur => cur.removeEventListener('mouseover', changeShadedColor));
    shadedBtn.classList.remove('shaded-btn-focus');
    
    flag = randomFlag;
    if (flag) {
        boxArr.forEach(cur => cur.addEventListener('mouseover', changeRandomColor));
        randomBtn.classList.add('rainbow-text');
        randomFlag = false;
    } else {
        boxArr.forEach(cur => cur.removeEventListener('mouseover', changeRandomColor));
        boxArr.forEach(cur => cur.addEventListener('mouseover', changeColor));
        randomBtn.classList.remove('rainbow-text');
        randomFlag = true;
    }
}

function clearGrid() {
    randomBtn.classList.remove('rainbow-text');
    shadedBtn.classList.remove('shaded-btn-focus');
    boxArr.forEach(cur => cur.removeEventListener('mouseover', changeRandomColor));
    boxArr.forEach(cur => cur.removeEventListener('mouseover', changeShadedColor));
    boxArr.forEach(cur => cur.addEventListener('mouseover', changeColor));
    boxArr.forEach(cur => cur.setAttribute('data-count', '0'));
    boxArr.forEach(cur => cur.style.backgroundColor = 'whitesmoke'); 
}

function changeDimensions() {
    const input = parseInt(prompt('How many squares per side do you want?'), 10);
    if (input && typeof input === 'number') {
        randomBtn.classList.remove('rainbow-text');
        shadedBtn.classList.remove('shaded-btn-focus');
        grid.innerHTML = '';
        boxArr = [];

        dimension = input;
        createGrid(dimension);
    } else {
        alert('Please enter a valid number');
        changeDimensions();
    }
}

window.addEventListener('load', createGrid());
clearBtn.addEventListener('click', clearGrid);
resizeBtn.addEventListener('click', changeDimensions);
shadedBtn.addEventListener('click', createShadedGrid);
randomBtn.addEventListener('click', createRandomGrid);