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

const setBlackOrWhiteColor = (ite1, ite2, cell) => {
    if ((ite1 + ite2) % 2) {
        cell.style.background = "white";
        cell.style.color = "black";
    }
    else {
        cell.style.background = "black";
        cell.style.color = "white";
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
            cell.innerHTML = `${LETTERS.letters[i]}` + `${NUMBERS.num[j]}`;
            setBlackOrWhiteColor(i, j, cell);
            cell.style.height = "50px";
            cell.style.width = "50px";
        }
    }
}

