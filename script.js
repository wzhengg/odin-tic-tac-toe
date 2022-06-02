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
    const checkWin = () => {
        // TODO
    };
    return {
        getBoard,
        clearBoard,
        placeX,
        placeO,
        checkWin
    };
})();

function playerFactory(name, marker) {
    return { name, marker };
};