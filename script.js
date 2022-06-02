const GameBoard = (function() {
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const clearBoard = () => {
        // TODO
    };
    const placeX = (r, c) => {
        // TODO
    };
    const placeO = (r, c) => {
        // TODO
    };
    const checkWin = () => {
        // TODO
    };
    return {
        board,
        clearBoard,
        placeX,
        placeO,
        checkWin
    };
})();

function playerFactory(name, marker) {
    return { name, marker };
};