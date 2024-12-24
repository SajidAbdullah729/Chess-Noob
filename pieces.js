const pieces = {
    white: {
        pawn: '♙', knight: '♘', bishop: '♗', rook: '♖', queen: '♕', king: '♔'
    },
    black: {
        pawn: '♟', knight: '♞', bishop: '♝', rook: '♜', queen: '♛', king: '♚'
    }
};

const initialBoard = [
    ['black_rook', 'black_knight', 'black_bishop', 'black_queen', 'black_king', 'black_bishop', 'black_knight', 'black_rook'],
    ['black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn'],
    ['white_rook', 'white_knight', 'white_bishop', 'white_queen', 'white_king', 'white_bishop', 'white_knight', 'white_rook']
];


const getAlgebraicNotation = (row, col, piece) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const pieceName = piece.split('_')[1];
    let notation = '';

    if (pieceName === 'pawn') {
        notation = files[col] + ranks[7 - row]; 
    } else {
        notation = pieceName.charAt(0).toUpperCase() + files[col] + ranks[7 - row];
    }

    return notation;
};

document.addEventListener('DOMContentLoaded', () => {
    const chessBoard = document.getElementById('chess-board');
    const flipButton = document.getElementById('flip-button');
    let isFlipped = false;

    
    const createChessBoard = () => {
        chessBoard.innerHTML = ''; 
        const squares = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                const isWhite = (row + col) % 2 === 0;
                square.classList.add(isWhite ? 'white' : 'black');

                const piece = initialBoard[row][col];
                if (piece) {
                    const pieceColor = piece.startsWith('white') ? 'white' : 'black';
                    const pieceType = piece.split('_')[1];
                    square.innerHTML = pieces[pieceColor][pieceType];

                    
                    if (isFlipped) {
                        square.classList.add('flipped');
                    }
                }

                square.dataset.index = `${row}-${col}`;
                square.addEventListener('click', () => {
                    const piece = initialBoard[row][col];
                    if (piece) {
                        const notation = getAlgebraicNotation(row, col, piece);
                        alert(`Piece: ${notation}`);
                    }
                });

                squares.push(square);
            }
        }

        squares.forEach(square => chessBoard.appendChild(square));
    };

    const flipBoard = () => {
        isFlipped = !isFlipped;

        const flippedBoard = [];

        for (let row = 0; row < 8; row++) {
            flippedBoard[row] = [];
            for (let col = 0; col < 8; col++) {

                const piece = initialBoard[7 - row][7 - col];
                flippedBoard[row][col] = piece;
                if (piece) {
                    const pieceColor = piece.split('_')[0];
                    if (pieceColor === 'white') {
                        flippedBoard[row][col] = flippedBoard[row][col].replace('white', 'black');
                    } else {
                        flippedBoard[row][col] = flippedBoard[row][col].replace('black', 'white');
                    }
                }
            }
        }

        // Update the initial board with the flipped board configuration
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                initialBoard[row][col] = flippedBoard[row][col];
            }
        }
        createChessBoard();
    };
    flipButton.addEventListener('click', flipBoard);
    createChessBoard();
});
