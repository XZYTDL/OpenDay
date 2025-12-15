let grid = document.getElementById('grid');
let items = document.querySelectorAll('.grid-item');
let stroke = document.querySelector('.stroke');
let restart = document.getElementById('restart');
let xIcon = document.getElementById('x-icon');
let oIcon = document.getElementById('o-icon');
let xScoreEl = document.getElementById('x-score');
let oScoreEl = document.getElementById('o-score');
let xTurn = true;
let finished = false;
let moveCount = 0;
let xScore = 0;
let oScore = 0;

const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // righe
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonne
    [0, 4, 8], [2, 4, 6]              // diagonali
];

if (!grid.contains(stroke)) {
    grid.appendChild(stroke);
}

function checkWinner(player) {
    return wins.findIndex(win => 
        win.every(i => items[i].classList.contains(`clicked-${player}`))
    );
}

function drawStroke(winIndex) {
    const centerCell = items[wins[winIndex][1]];
    const centerRect = centerCell.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    
    const top = centerRect.top - gridRect.top + centerRect.height / 2;
    const left = centerRect.left - gridRect.left + centerRect.width / 2;
    const cellSize = centerRect.width;
    const lineLength = cellSize * 3;
    
    stroke.style.top = `${top}px`;
    stroke.style.left = `${left}px`;
    
    let transform, width;
    
    if (winIndex < 3) {
        // righe
        width = lineLength;
        transform = 'translate(-50%, -50%)';
    } else if (winIndex < 6) {
        // colonne
        width = lineLength;
        transform = 'translate(-50%, -50%) rotate(90deg)';
    } else {
        // diagonali
        width = lineLength * Math.sqrt(2);
        transform = `translate(-50%, -50%) rotate(${winIndex === 6 ? 45 : -45}deg)`;
    }
    
    stroke.style.width = `${width}px`;
    stroke.style.setProperty('--stroke-transform', transform);
    stroke.style.transform = transform;
    stroke.classList.add('show');
}

items.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('clicked') || finished) return;
        
        const player = xTurn ? 'x' : 'o';
        item.classList.add(`clicked-${player}`, 'clicked');
        item.innerHTML = xTurn ? xIcon.innerHTML : oIcon.innerHTML;
        moveCount++;
        
        const winIndex = checkWinner(player);
        
        if (winIndex !== -1) {
            drawStroke(winIndex);
            finished = true;
            restart.classList.remove('hidden');
            
            // Aggiorna il punteggio
            if (player === 'x') {
                xScore++;
                xScoreEl.textContent = xScore;
            } else {
                oScore++;
                oScoreEl.textContent = oScore;
            }
        } else if (moveCount === 9) {
            // pareggio
            finished = true;
            restart.classList.remove('hidden');
        }
        
        xTurn = !xTurn;
    });
});

function init() {
    finished = false;
    xTurn = true;
    moveCount = 0;
    items.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('clicked-x', 'clicked-o', 'clicked');
    });
    stroke.classList.remove('show');
    restart.classList.add('hidden');
}

restart.addEventListener('click', init);
init();