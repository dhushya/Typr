import { colors, backgroundColors } from "./colors.js";

var question = document.getElementById('question');
var quest = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
question.textContent = String.fromCharCode(quest);
var gameover = false;
var state = 0;
var id = 0;
var timerId = window.setTimeout(() => {
    gameOver("Time Out");
}, 2000);
var progressBar = anime({
    targets: ".progressBar",
    width: 0,
    duration: 2000,
    easing: "linear"
});
init();

function init() {
    anime({
        targets: '.main-box',
        translateX: 250,
        rotate: '1turn',
        duration: 800
    });
    window.addEventListener("keypress", function (e) {
        if (state === 0)
            onKeyPress(e.keyCode - 32);
        return;
    });

}

function onKeyPress(answer) {
    if (!gameover) {
        if (answer === quest) {
        quest = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
        question.textContent = String.fromCharCode(quest);
        anime({
            targets: '.main-box',
            translateX: setCoordinatesX(),
            translateY: setCoordinatesY(),
            // translateX: window.innerWidth - 150,
            // translateY: window.innerHeight - 150,
            backgroundColor: colors[anime.random(0, colors.length)],
            duration: Math.floor(Math.random() * (1250 - 600 + 1)) + 500
        });
        anime({
            targets: 'body',
            backgroundColor: backgroundColors[anime.random(0, backgroundColors.length)],
            duration: 1000
        });
        addScore();
        resetTimer();
        return;
        } else {
        gameOver("Wrong key!");
        }
    }
}

function setCoordinatesX() {
    var x = Math.floor((Math.random() * window.innerWidth) - 150);
    if (x < 0) {
        x = 0
    }
    return x
}

function setCoordinatesY() {
    var y = Math.floor((Math.random() * window.innerHeight) - 150);
    if (y < 0) {
        y = 0
    }
    return y
}

function addScore() {
    var scoreBox = document.getElementById("scoreCount");
    id = id + 100;
    scoreBox.innerHTML = id;
}

function resetTimer() {
    window.clearTimeout(timerId);
    progressBar.restart();
    timerId = window.setTimeout(() => {
        gameOver("Time Out");
    }, 2000);
}

function gameOver(message) {
    alert(`Game over ${message} do you want to restart?`);
    progressBar.restart();
    var scoreBox = document.getElementById("scoreCount");
    scoreBox.innerHTML = 0;
} 