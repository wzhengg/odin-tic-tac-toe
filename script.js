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