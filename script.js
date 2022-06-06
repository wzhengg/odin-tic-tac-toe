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

    const getP1 = () => {
        return _p1;
    };

    const getP2 = () => {
        return _p2;
    };

    const setP1Name = (newName) => {
        _p1.name = newName;
    };

    const setP2Name = (newName) => {
        _p2.name = newName;
    };

    const startGame = () => {
        gameBoard.clearBoard();
        _turn = _p1;
        displayController.renderBoard();
        displayController.bindSpots();
        displayController.displayTurn();
        displayController.highlightTurn(_turn);
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

        const status = gameBoard.checkStatus(_p1, _p2);
        if (status !== null) {
            displayController.unBindSpots();
            displayController.displayStatus(status);
            displayController.removeTurnHighlight();
            return;
        }

        displayController.displayTurn();
        displayController.highlightTurn(_turn);
    };

    const getTurn = () => {
        return _turn;
    };
    
    return {
        getP1,
        getP2,
        setP1Name,
        setP2Name,
        startGame,
        playTurn,
        getTurn
    }
})();

const displayController = (function() {
    const _status = document.querySelector('.middle-container > .status');
    const _boardElement = document.querySelector('#game-board');
    const _spots = _boardElement.querySelectorAll('div');
    const _leftImg = document.querySelector('.left-container > img');
    const _rightImg = document.querySelector('.right-container > img');

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

        if (board[r][c] === null) {
            spot.textContent = '';
        } else if (board[r][c] === 'X') {
            const marker = document.createElement('img');
            marker.setAttribute('src', './img/alpha-x.svg');
            spot.appendChild(marker);
        } else {
            const marker = document.createElement('img');
            marker.setAttribute('src', './img/alpha-o.svg');
            spot.appendChild(marker);
        }
    };

    const displayTurn = () => {
        const turn = gameController.getTurn();
        _status.textContent = `${turn.name}'s turn`;
    };

    const highlightTurn = (turn) => {
        if (turn === gameController.getP1()) {
            _rightImg.classList.remove('turn');
            _leftImg.classList.add('turn');
        } else {
            _leftImg.classList.remove('turn');
            _rightImg.classList.add('turn');
        }
    };

    const removeTurnHighlight = () => {
        _leftImg.classList.remove('turn');
        _rightImg.classList.remove('turn');
    };

    const displayStatus = (status) => {
        if (status === 'Tie') {
            _status.textContent = 'Tie';
        } else {
            _status.textContent = `${status.name} wins!`;
        }
    };

    const bindRestartButton = () => {
        const restartButton = document.querySelector('.middle-container > div:last-child > button');
        restartButton.addEventListener('click', gameController.startGame);
    };

    const bindP1SetButton = () => {
        const p1SetButton = document.querySelector('.left-container button');
        const p1Input = document.querySelector('.left-container input');

        p1SetButton.addEventListener('click', () => {
            gameController.setP1Name(p1Input.value);

            const status = gameBoard.checkStatus(gameController.getP1(), gameController.getP2());
            if (status === null) {
                displayTurn();
            } else {
                displayStatus(status);
            }
        });
    };

    const bindP2SetButton = () => {
        const p2SetButton = document.querySelector('.right-container button');
        const p2Input = document.querySelector('.right-container input');

        p2SetButton.addEventListener('click', () => {
            gameController.setP2Name(p2Input.value);
            
            const status = gameBoard.checkStatus(gameController.getP1(), gameController.getP2());
            if (status === null) {
                displayTurn();
            } else {
                displayStatus(status);
            }
        });
    };

    return {
        bindSpots,
        unBindSpots,
        renderBoard,
        renderMarker,
        displayTurn,
        highlightTurn,
        removeTurnHighlight,
        displayStatus,
        bindRestartButton,
        bindP1SetButton,
        bindP2SetButton
    };
})();

(function() {
    gameController.startGame();
    displayController.bindRestartButton();
    displayController.bindP1SetButton();
    displayController.bindP2SetButton();
})();