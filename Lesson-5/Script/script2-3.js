const NUMBERS = {
    num: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
    ],
};

const LETTERS = {
    letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
    ],
};

const CHESS_FIGURES = [
    ["&#9814", "&#9816", "&#9815", "&#9813", "&#9812", "&#9815", "&#9816", "&#9814"],
    ["&#9817", "&#9817", "&#9817", "&#9817", "&#9817", "&#9817", "&#9817", "&#9817"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["&#9823", "&#9823", "&#9823", "&#9823", "&#9823", "&#9823", "&#9823", "&#9823"],
    ["&#9820", "&#9822", "&#9821", "&#9819", "&#9818", "&#9821", "&#9822", "&#9820"]
];

const setBlackOrWhiteColor = (ite1, ite2, cell) => {
    if ((ite1 + ite2) % 2) {
        cell.style.background = "green";
        cell.style.color = "black";
    }
    else {
        cell.style.background = "white";
        cell.style.color = "black";
    }
};

function createChessBoard() {
    const element = document.querySelector(".chess_board");
    table = document.createElement("table");

    element.appendChild(table);
    table.border = "2";

    for(let i = 0; i < 8; i++) {
        let row = table.insertRow(i);

        for(let j = 0; j < 8; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = CHESS_FIGURES[i][j];
            setBlackOrWhiteColor(i, j, cell);
            cell.style.height = "50px";
            cell.style.width = "50px";
            cell.style.fontSize = "40px";
        }
    }
}