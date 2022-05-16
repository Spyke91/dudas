document.addEventListener('DOMContentLoaded', assignEvents);

function assignEvents() {
    document.getElementById("start").addEventListener('click', startGame);
}

function startGame() {
    disableElements();
    setInnerHTML();

    const width = document.getElementById("columns").value;
    const height = document.getElementById("rows").value;
    drawField(width, height);

    let cells = document.getElementsByName("cell");
    enableEventsField(cells);

    const range = document.getElementById("level").value;
    const level = range * 5;

    const gameSequence = generateSequence(width, height, level);
    gameSequence.forEach(element => console.log(element));
    playGame(cells, width, height, gameSequence);
}

function disableElements() {
    document.getElementById("rows").disabled = true;
    document.getElementById("columns").disabled = true;
    document.getElementById("level").disabled = true;
	document.getElementById("start").disabled = true;
}

function setInnerHTML() {
    document.getElementById("message").innerHTML = "PLAYING...";
    document.getElementById("crono").innerHTML += "0";
    document.getElementById("score").innerHTML += "0";
}

function drawField(width, height) {
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            addCell(i, j);
        }
        addLineBreak();
    }
}

function addCell(i, j) {
    const colorRed = randomIntFromInterval(0, 255);
    const colorBlue = randomIntFromInterval(0, 255);
    const colorGreen = randomIntFromInterval(0, 255);
    let field = document.getElementById("field");
    let newCell = document.createElement("input");
    field.appendChild(newCell);
    newCell.id = i + "_" + j;
    newCell.classList = "cellClass";
    newCell.type = "button";
    newCell.name = "cellName";
    let colorValue = "rgb(" + colorRed + ", " + colorGreen + ", " + colorBlue + ")";
    newCell.style.backgroundColor = colorValue;
}

function addLineBreak() {
    let breakLine = document.createElement("br");
    let length = document.getElementsByName("cellName").length;
    let lastElement = document.getElementsByName("cellName")[length - 1];
    lastElement.insertAdjacentElement('afterend', breakLine);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

function generateSequence(width, height, level) {
    let sequence = [];
    for (i = 0; i < level; i++) {
        let min = 0;
        sequence.push([randomIntFromInterval(min, width - 1)
                    , randomIntFromInterval(min, height - 1)]);
    }

    return sequence;
}

function playGame(cells, width, height, sequence) {
    let correct = true;

    var roundNr = 0;
    var i = setInterval(function () {
        let x = sequence[roundNr][0];
        let y = sequence[roundNr][1];
        let elementId = x + "_" + y;
        const previousColor = document.getElementById(elementId).style.backgroundColor;
        document.getElementById(elementId).style.backgroundColor = "red";

        document.getElementById(elementId).style.backgroundColor = previousColor;
        roundNr++;

    }, 1000);

    if (roundNr === sequence.length) {
        clearInterval(i);
    }

    //disableEventsField(cells);
}

function showElement(elementId) {
    document.getElementById(elementId).style.backgroundColor = "red";
}

function disableEventsField(cells) {
    for (i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('mousedown', check);
    }
}






