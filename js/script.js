let grid = document.getElementById('grid');
let items = document.querySelectorAll('.grid-item');
let stroke = document.querySelector('.stroke');
let xIcon = document.getElementById('x-icon');
let oIcon = document.getElementById('o-icon');
let xTurn = true;
let finished = false;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

if (!grid.contains(stroke)) {
    grid.appendChild(stroke);
}

items.forEach(item => {
    item.innerHTML = '';
    item.addEventListener('click', () => {
        if (item.classList.contains('clicked')) return;
        if (finished) return;

        item.classList.add(`clicked-${xTurn ? 'x' : 'o'}`, "clicked");
        item.innerHTML = xTurn ? xIcon.innerHTML : oIcon.innerHTML;

        wins.forEach((win, index) => {
            if (win.every(i => items[i].classList.contains(`clicked-${xTurn ? 'x' : 'o'}`))) {
                const firstCell = items[win[1]];
                const firstRect = firstCell.getBoundingClientRect();
                const gridRect = grid.getBoundingClientRect();

                const top = firstRect.top - gridRect.top + firstRect.height / 2;
                const left = firstRect.left - gridRect.left + firstRect.width / 2;

                stroke.style.top = `${top}px`;
                stroke.style.left = `${left}px`;
                stroke.style.transformOrigin = 'center';

                const cellSize = firstRect.width;
                const gap = parseFloat(getComputedStyle(grid).gap);
                const lineLength = cellSize * 3;

                if (index < 3) {
                    stroke.style.width = `${lineLength}px`;
                    stroke.style.setProperty('--stroke-transform', 'translate(-50%, -50%)');
                    stroke.style.transform = 'translate(-50%, -50%)';
                } else if (index < 6) {
                    stroke.style.width = `${lineLength}px`;
                    stroke.style.setProperty('--stroke-transform', 'translate(-50%, -50%) rotate(90deg)');
                    stroke.style.transform = 'translate(-50%, -50%) rotate(90deg)';
                } else if (index === 6) {
                    stroke.style.width = `${lineLength * Math.sqrt(2)}px`;
                    stroke.style.setProperty('--stroke-transform', 'translate(-50%, -50%) rotate(45deg)');
                    stroke.style.transform = 'translate(-50%, -50%) rotate(45deg)';
                } else {
                    stroke.style.width = `${lineLength * Math.sqrt(2)}px`;
                    stroke.style.setProperty('--stroke-transform', 'translate(-50%, -50%) rotate(-45deg)');
                    stroke.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
                }

                stroke.classList.add('show');
                finished = true;
            }
        });
        xTurn = !xTurn;
    });
});

function init() {
    finished = false;
    xTurn = true;
    items.forEach(item => item.innerHTML = '');
    items.forEach(item => item.classList.remove('clicked-x', 'clicked-o', 'clicked', 'winner-center'));
    stroke.classList.remove('show');
}

init();