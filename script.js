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
        const rowStatus = _checkRows(p1, p2);
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

const gameController = (function() {
    let _p1 = playerFactory('Player 1', 'X');
    let _p2 = playerFactory('Player 2', 'O');

    let _turn = _p1;

    const startGame = () => {
        gameBoard.clearBoard();
        _turn = _p1;
        displayController.renderBoard();
        displayController.bindSpots();
    };

    const _changeTurn = () => {
        if (_turn === _p1) _turn = _p2;
        else _turn = _p1;
    };
    
    const playTurn = (e) => {
        const r = e.target.getAttribute('data-row');
        const c = e.target.getAttribute('data-col');

        if (!gameBoard.isEmptySpot(r, c)) return;

        gameBoard.placeMarker(r, c, _turn.marker);
        displayController.renderMarker(r, c);

        _changeTurn();

        const status = gameBoard.checkStatus(_p1, _p2); // remove later
        if (gameBoard.checkStatus(_p1, _p2) !== null) {
            displayController.unBindSpots();
            console.log(status); // remove later
        }
    };
    
    return {
        startGame,
        playTurn
    }
})();

const displayController = (function() {
    const _boardElement = document.querySelector('#game-board');
    const _spots = _boardElement.querySelectorAll('div');

    const bindSpots = () => {
        _spots.forEach(spot => {
            spot.addEventListener('click', gameController.playTurn);
        });
    };

    const unBindSpots = () => {
        _spots.forEach(spot => {
            spot.removeEventListener('click', gameController.playTurn);
        });
    };

    const renderBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                renderMarker(r, c);
            }
        }
    };

    const renderMarker = (r, c) => {
        const board = gameBoard.getBoard();
        const spot = _boardElement.querySelector(`[data-row="${r}"][data-col="${c}"]`);

        if (board[r][c] === null) spot.textContent = '';
        else spot.textContent = board[r][c];
    };

    const bindRestartButton = () => {
        const restartButton = document.querySelector('.middle-container > div:last-child > button');
        restartButton.addEventListener('click', gameController.startGame);
    };

    return {
        bindSpots,
        unBindSpots,
        renderBoard,
        renderMarker,
        bindRestartButton
    };
})();

(function() {
    gameController.startGame();
    displayController.bindRestartButton();
})();