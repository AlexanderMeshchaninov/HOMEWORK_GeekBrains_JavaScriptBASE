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
    table.border = "1";

    for(let i = 0; i < 8; i++) {
        let row = table.insertRow(i);

        for(let j = 0; j < 8; j++) {
            let cell = row.insertCell(j);
            setBlackOrWhiteColor(i, j, cell);
            cell.style.height = "60px";
            cell.style.width = "60px";
            cell.style.fontSize = "40px";
        }
    }
}
window.onload = createChessBoard;
