function startGame() {
    document.getElementById("start").addEventListener('click', function () {
        document.getElementById("rows").disabled = true;
        document.getElementById("columns").disabled = true;
        document.getElementById("level").disabled = true;
        document.getElementById("message").innerHTML = "PLAYING...";
        document.getElementById("crono").innerHTML += "0";
        document.getElementById("score").innerHTML += "0";
        const width = document.getElementById("columns").value;
        const height = document.getElementById("rows").value;

        drawField(width, height);
        let cells = document.getElementsByName("cell");
        enableEventsField(cells);
        playGame(width, height);
    });
}

function drawField(width, height) {
    let colorRed = 255;
    let colorBlue = 25;
    let colorGreen = 10;
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            let field = document.getElementById("field");
            let newCell = document.createElement("input");
            field.appendChild(newCell);
            newCell.id = i + "_" + j;
            newCell.classList = "cell";
            newCell.type = "button";
            newCell.name = "cell";
            let colorValue = "rgb(" + colorRed + ", " + colorGreen + ", " + colorBlue + ")";
            newCell.style.backgroundColor = colorValue;
            colorGreen += 10;
            colorRed -= 10;
        }
        colorBlue += 55;
        console.log(colorBlue);
        let breakLine = document.createElement("br");
        console.log(i);
        console.log(j);
        console.log(i + "_" + j);
        console.log(document.getElementById(i + "_" + j));
        let lastElement = document.getElementById(i + "_" + j);
        lastElement.insertAdjacentElement('afterend', breakLine);
    }
}

function playGame(cells) {
    disableEventsField(cells);
}

function enableEventsField(cells) {
    for (i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousedown', check);
    }
}

function check(event) {
    let coords = event.target.id.split('_');
    let x = coords[0];
    let y = coords[1];
    document.getElementById("message").innerHTML = 
            "The button (" + x + "," + y + ") has been clicked.";
}

function disableEventsField(cells){
    for (i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('mousedown', check);
    }
}

document.addEventListener('DOMContentLoaded', startGame);


