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

    const range = document.getElementById("level").value;
    const level = range * 5;
    const sequence = generateSequence(width, height, level);
    sequence.forEach(element => console.log(element));
    let cells = document.getElementsByName("cell");
    enableEventsField(cells, level, sequence);

    playGame(cells, width, height, sequence);
}

function disableElements() {
    document.getElementById("rows").disabled = true;
    document.getElementById("columns").disabled = true;
    document.getElementById("level").disabled = true;
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

function enableEventsField(cells, level, sequence) {
    for (i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousedown', check);
    }
}

function check(event, level, sequence) {
    let coords = event.target.id.split('_');
    let x = coords[0];
    let y = coords[1];
    let guessedCells = 0;
    document.getElementById("score").innerHTML = "Score: " + guessedCells;
}

function getWinner(guessedCells, sequence) {
    if (guessedCells === sequence.length) {
        document.getElementById("message").innerHTML = "Winner!";
    }
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
    let seconds = 0;
    let minute = 0;
    //setInterval(countUpTimer, 1000, seconds, minute);

    let correct = true;

    let roundNr = 0;
    let i = setInterval(function () {
        let x = sequence[roundNr][0];
        let y = sequence[roundNr][1];
        let elementId = x + "_" + y;
        const previousColor = document.getElementById(elementId).style.backgroundColor;
        document.getElementById(elementId).style.backgroundColor = "red";
        
        setTimeout(getOriginalColor, 1000, elementId, previousColor);
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

function getOriginalColor(elementId, previousColor){
    document.getElementById(elementId).style.backgroundColor = previousColor;
}

function countUpTimer(seconds, minute) {
    seconds += 1;
    if (seconds === 60) {
        seconds = 0;
        minute += 1;
    }
    document.getElementById("crono").innerHTML = "Seconds: " + minute + ":" + seconds;
}

function disableEventsField(cells) {
    for (i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('mousedown', check);
    }
}






