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

    const isEmptySpot = (r, c) => {
        return board[r][c] === null;
    };

    const placeMarker = (r, c, marker) => {
        board[r][c] = marker;
    };

    const checkStatus = (p1, p2) => {
        const rowStatus = checkRows(p1, p1);
        const colStatus = checkColumns(p1, p2);
        const diagonalStatus = checkDiagonals(p1, p2);

        if (rowStatus !== null) return rowStatus;
        else if (colStatus !== null) return colStatus;
        else if (diagonalStatus !== null) return diagonalStatus;
        else if (!emptySpots()) return 'Tie';
        else return null;
    };

    const checkRows = (p1, p2) => {
        for (let r = 0; r < 3; r++) {
            if (board[r][0] !== null && board[r][0] === board[r][1] && board[r][1] === board[r][2]) {
                if (board[r][0] === p1.marker) return p1;
                else return p2;
            }
        }

        return null;
    };

    const checkColumns = (p1, p2) => {
        for (let c = 0; c < 3; c++) {
            if (board[0][c] !== null && board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
                if (board[0][c] === p1.marker) return p1;
                else return p2;
            }
        }

        return null;
    };

    const checkDiagonals = (p1, p2) => {
        if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if (board[0][0] === p1.marker) return p1;
            else return p2;
        }

        if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if (board[0][2] === p1.marker) return p1;
            else return p2;
        }

        return null;
    };

    const emptySpots = () => {
        let count = 0;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === null) count++;
            }
        }

        return count;
    };

    return {
        getBoard,
        clearBoard,
        isEmptySpot,
        placeMarker,
        checkStatus
    };
})();

function playerFactory(name, marker) {
    return { name, marker };
};