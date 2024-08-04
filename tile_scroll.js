/*
    This file creates the tiles for tile_scroll.html
    You can change the grid size by adjusting the row and col count.
    Each tile has a random color.

    When a tile is clicked, it becomes "focused" and expands, filling up the grid viewing area.
    When the mouse leaves the grid view area, it shrinks down to normal size.
*/


const n = 30; // Set the # of rows
const m = 30; // Set the # of columns

const gridContainer = document.querySelector('.grid-container');

function getRandomColor() {
const letters = '0123456789ABCDEF';
let color = '#';
for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

function createGrid(n, m) {
gridContainer.style.gridTemplateRows = `repeat(${n}, 1fr)`;
gridContainer.style.gridTemplateColumns = `repeat(${m}, 1fr)`;

for (let i = 0; i < n * m; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.classList.add('btn');
    tile.style.backgroundColor = getRandomColor(); // Set random color

    tile.addEventListener('click', (event) => {
        console.log('a tile was clicked');  // Useful for debugging
        tile.classList.add('focused-tile');
        tile.scrollIntoView({block: "start", inline: "start", behavior: "smooth"});
    });


    gridContainer.appendChild(tile);

    // Add event listener to each tile to check mouse position and scroll into view on mouse enter
    tile.addEventListener('mouseenter', (event) => {
        // To make this less chaotic, the scroll only works when the mouse is close to the border zone
        // border zone = "stickyBorder"
        const borderRect = stickyBorder.getBoundingClientRect();
        const inset = 60; // Add an inset to the border area
        const isInBorderArea =
            event.clientX < borderRect.left + 50 + inset ||
            event.clientX > borderRect.right - 50 - inset ||
            event.clientY < borderRect.top + 50 + inset ||
            event.clientY > borderRect.bottom - 50 - inset;

        if (isInBorderArea) {
            tile.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    });

    tile.addEventListener('mouseleave', (event) => {
        tile.classList.remove('focused-tile');
    });
}
}

createGrid(n, m);

// Center the view initially
window.addEventListener('load', () => {
    const centerX = (gridContainer.clientWidth - window.innerWidth) / 2;
    const centerY = (gridContainer.clientHeight - window.innerHeight) / 2;
    window.scrollTo(centerX, centerY);
});

const stickyBorder = document.querySelector('.sticky-border');

document.addEventListener('mousemove', (event) => {
    const borderRect = stickyBorder.getBoundingClientRect();
    const inset = 120; // Add a 10px inset to the border area
    const isInBorderArea =
        event.clientX < borderRect.left + 50 + inset ||
        event.clientX > borderRect.right - 50 - inset ||
        event.clientY < borderRect.top + 50 + inset ||
        event.clientY > borderRect.bottom - 50 - inset;

    if (isInBorderArea) {
        stickyBorder.classList.add('hovered');
        // console.log(`Mouse entered at coordinates: (${event.clientX}, ${event.clientY})`);  // <-- uncomment for debugging
    } else {
        stickyBorder.classList.remove('hovered');
    }
});
