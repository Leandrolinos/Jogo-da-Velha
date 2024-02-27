const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawsElement = document.getElementById('scoreDraws');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;
let scoreDraws = 0;

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    return cell;
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = createCell(index);
        cell.textContent = value;
        board.appendChild(cell);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            updateScore();
            alert(`Player ${currentPlayer} venceu!`);
            resetGame();
        } else if (!gameBoard.includes('')) {
            scoreDraws++;
            updateScore();
            alert('Empate!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        gameBoard[pattern[0]] !== '' &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    );
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
}

function updateScore() {
    if (checkWinner()) {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    } else if (!gameBoard.includes('')) {
        scoreDraws++;
        scoreDrawsElement.textContent = scoreDraws;
    }
}


resetButton.addEventListener('click', resetGame);


renderBoard();
