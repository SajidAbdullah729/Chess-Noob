document.addEventListener('DOMContentLoaded', () => {
    const chessBoard = document.getElementById('chess-board');
    const flipButton = document.getElementById('flip-button');
    let isFlipped = false;
    const createChessBoard = () => {
        chessBoard.innerHTML = ''; 
        const squares = [];

        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            const isWhite = Math.floor(i / 8) % 2 === 0 ? i % 2 === 0 : i % 2 !== 0;
            square.classList.add(isWhite ? 'white' : 'black');
            square.dataset.index = i;
            square.addEventListener('click', () => {
                alert(`Square clicked: ${i}`);
            });

            squares.push(square);
        }
        squares.forEach(square => chessBoard.appendChild(square));
    };
    const flipBoard = () => {
        isFlipped = !isFlipped;
        chessBoard.style.transform = isFlipped ? 'rotate(180deg)' : 'rotate(0deg)';
    };
    flipButton.addEventListener('click', flipBoard);
    createChessBoard();
});
