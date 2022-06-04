const gameBoard = (function() {
    let _board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const getBoard = () => {
        return _board;
    }

    const clearBoard = () => {
        _board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    };

    const isEmptySpot = (r, c) => {
        return _board[r][c] === null;
    };

    const placeMarker = (r, c, marker) => {
        _board[r][c] = marker;
    };

    const checkStatus = (p1, p2) => {
        const rowStatus = _checkRows(p1, p1);
        const colStatus = _checkColumns(p1, p2);
        const diagonalStatus = _checkDiagonals(p1, p2);

        if (rowStatus !== null) return rowStatus;
        else if (colStatus !== null) return colStatus;
        else if (diagonalStatus !== null) return diagonalStatus;
        else if (!_emptySpots()) return 'Tie';
        else return null;
    };

    const _checkRows = (p1, p2) => {
        for (let r = 0; r < 3; r++) {
            if (_board[r][0] !== null && _board[r][0] === _board[r][1] && _board[r][1] === _board[r][2]) {
                if (_board[r][0] === p1.marker) return p1;
                else return p2;
            }
        }

        return null;
    };

    const _checkColumns = (p1, p2) => {
        for (let c = 0; c < 3; c++) {
            if (_board[0][c] !== null && _board[0][c] === _board[1][c] && _board[1][c] === _board[2][c]) {
                if (_board[0][c] === p1.marker) return p1;
                else return p2;
            }
        }

        return null;
    };

    const _checkDiagonals = (p1, p2) => {
        if (_board[0][0] !== null && _board[0][0] === _board[1][1] && _board[1][1] === _board[2][2]) {
            if (_board[0][0] === p1.marker) return p1;
            else return p2;
        }

        if (_board[0][2] !== null && _board[0][2] === _board[1][1] && _board[1][1] === _board[2][0]) {
            if (_board[0][2] === p1.marker) return p1;
            else return p2;
        }

        return null;
    };

    const _emptySpots = () => {
        let count = 0;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (_board[r][c] === null) count++;
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