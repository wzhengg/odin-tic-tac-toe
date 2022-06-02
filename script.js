const GameBoard = (function() {
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const getBoard = () => {
        return board;
    }
    const clearBoard = () => {
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    };
    const placeX = (r, c) => {
        board[r][c] = 'X';
    };
    const placeO = (r, c) => {
        board[r][c] = 'O';
    };
    const checkStatus = (player1, player2) => {
        // Check rows and columns

        for (let r = 0; r < 3; r++) {
            if (board[r][0] !== null && board[r][0] === board[r][1] && board[r][1] === board[r][2]) {
                if (board[r][0] === player1.marker) return player1.marker;
                else return player2.marker;
            }
        }

        for (let c = 0; c < 3; c++) {
            if (board[0][c] !== null && board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
                if (board[0][c] === player1.marker) return player1.marker;
                else return player2.marker;
            }
        }

        // Check diagonals

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if (board[0][0] === player1.marker) return player1.marker;
            else return player2.marker;
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if (board[0][2] === player1.marker) return player1.marker;
            else return player2.marker;
        }

        // Check for tie

        let emptySpots = 0;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === null) emptySpots++;
            }
        }
        if (emptySpots === 0) return 'Tie';
        
        return null; // Game in progress
    };
    return {
        getBoard,
        clearBoard,
        placeX,
        placeO,
        checkStatus
    };
})();

function playerFactory(name, marker) {
    return { name, marker };
};