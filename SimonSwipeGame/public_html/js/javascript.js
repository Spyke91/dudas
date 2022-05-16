document.addEventListener('DOMContentLoaded', assignEvents);

function assignEvents() {
    document.getElementById("start").addEventListener('click', startGame);
}

let sequence;
let round = 1;
let sequenceNr = 0;
let clickedNr = 0
let elementId;
let previousColor;
let interval;
let interTime;
let score = 0;
let seconds = 0;
let minute = 0;
let level;

function startGame() {
    disableElements();
    setInnerHTML();

    const width = document.getElementById("columns").value;
    const height = document.getElementById("rows").value;
    drawField(width, height);

    const range = document.getElementById("level").value;
    level = range * 5;
    sequence = generateSequence(width, height, level);
    
    let cells = document.getElementsByName("cellName");
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

function enableEventsField(cells) {
    for (i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousedown', check);
    }
}

function check(event) {
    let coords = event.target.id.split('_');
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);
    let success = sequence[clickedNr][0] === x && sequence[clickedNr][1] === y;

    console.log(success)
    if(success){
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
        if(clickedNr+1 === round){
            round++;
            if(round <= level){
                sequenceNr = 0;
                clickedNr = 0;
                newRound();
            }else{
                console.log('se acabó el juego');
                clearInterval(interTime);
            }
        }else{
            clickedNr++;
        }
    }else{
        clearInterval(interTime);
        console.log('CAGASTE');
    }

    // document.getElementById("score").innerHTML = "Score: " + guessedCells;
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

function playGame(cells, width, height) {
    let correct = true;
    
    interTime = setInterval(countUpTimer, 1000);

    newRound();
}

function newRound(){
    //disableEventsField(cells);
    interval = setInterval(showElement, 1000);
}

function showElement () {
    if(sequenceNr>0){
        setOriginalColor(elementId, previousColor);
    }

    if(sequenceNr < round){
        let x = sequence[sequenceNr][0];
        let y = sequence[sequenceNr][1];
        elementId = x + "_" + y;

        previousColor = document.getElementById(elementId).style.backgroundColor;
        document.getElementById(elementId).style.backgroundColor = "red";
        sequenceNr++;
    }else{
        setOriginalColor(elementId, previousColor);
        clearInterval(interval);
    }
}

function setOriginalColor(elementId, previousColor){
    document.getElementById(elementId).style.backgroundColor = previousColor;
}

function countUpTimer() {
    if (seconds === 60) {
        seconds = 0;
        minute += 1;
    }
    document.getElementById("crono").innerHTML = "Seconds: " + minute + ":" + seconds;
    seconds++;
}

function disableEventsField(cells) {
    for (i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('mousedown', check);
    }
}
