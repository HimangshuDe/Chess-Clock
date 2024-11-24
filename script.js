"use strict";

const playPauseBtn = document.querySelector(".play-pause--btn");
const resetBtn = document.querySelector(".reset-btn");
const upperClock = document.querySelector("#clock--time-upper");
const lowerClock = document.querySelector("#clock--time-lower");
const upperClockTimer = document.querySelector("#clock-timer--upper");
const lowerClockTimer = document.querySelector("#clock-timer--lower");

// STEPS:
/* 
1. Any party will start the game
2. On click or tap event the clock of the opponent party will start running with change in background color to #588157
3. On initial stage or upon reset the clock stop and set the time to 10:00 and background color #dad7cd
4. On timer up background will change to red of the current running timer!


*/

let upperMinutes = 10;
let upperSeconds = 0;
let lowerMinutes = 10;
let lowerSeconds = 0;

let upperTimerId;
let lowerTimerId;

let isRunning = false;
let runningTimer;

const upperClockTimeRunner = function () {
  if (upperSeconds === 0) {
    upperMinutes--;
    upperSeconds = 59;
  } else {
    upperSeconds--;
  }
  upperClockTimer.textContent = `${
    (upperMinutes < 10 ? "0" : "") + upperMinutes
  } : ${(upperSeconds < 10 ? "0" : "") + upperSeconds}`;
};

const lowerClockTimeRunner = function () {
  if (lowerSeconds === 0) {
    lowerMinutes--;
    lowerSeconds = 59;
  } else {
    lowerSeconds--;
  }
  lowerClockTimer.textContent = `${
    (lowerMinutes < 10 ? "0" : "") + lowerMinutes
  } : ${(lowerSeconds < 10 ? "0" : "") + lowerSeconds}`;
};

const timer = (clockName, running = true) => {
  if (running && clockName === "upper") {
    upperClock.style.background = "#588157";
    isRunning = true;
    upperTimerId = setInterval(upperClockTimeRunner, 1000);
  } else if (running && clockName === "lower") {
    lowerClock.style.background = "#588157";
    isRunning = true;
    lowerTimerId = setInterval(lowerClockTimeRunner, 1000);
  }
};

const stopTimer = (clockName) => {
  if (clockName === "upper") {
    clearInterval(upperTimerId);
    upperClock.style.background = "#a5a5a5";
  } else if (clockName === "lower") {
    clearInterval(lowerTimerId);
    lowerClock.style.background = "#a5a5a5";
  } else {
    clearInterval(upperTimerId);
    clearInterval(lowerTimerId);
    lowerClock.style.background = "#a5a5a5";
    upperClock.style.background = "#a5a5a5";
  }
  // clearInterval(upperTimerId);
  // clearInterval(lowerTimerId);
};

playPauseBtn.addEventListener("click", function () {
  if (isRunning === false) {
    runningTimer === undefined ? (runningTimer = "lower") : runningTimer;
    playPauseBtn.src = "images/pause-button.png";
    isRunning = true;
    timer(runningTimer);
  } else {
    playPauseBtn.src = "images/play-button-arrowhead.png";
    isRunning = false;
    stopTimer();
  }
});

resetBtn.addEventListener("click", function () {
  isRunning = false;
  playPauseBtn.src = "images/play-button-arrowhead.png";
  stopTimer();
  upperMinutes = 10;
  upperSeconds = 0;
  lowerMinutes = 10;
  lowerSeconds = 0;
  upperClockTimer.textContent = `${
    upperMinutes === 0 ? "00" : upperMinutes
  } : ${upperSeconds === 0 ? "00" : upperSeconds}`;
  lowerClockTimer.textContent = `${
    lowerMinutes === 0 ? "00" : lowerMinutes
  } : ${lowerSeconds === 0 ? "00" : lowerSeconds}`;
  upperClock.style.background = "#a5a5a5";
  lowerClock.style.background = "#a5a5a5";
});

upperClock.addEventListener("click", function () {
  lowerClock.style.background = "#588157";
  upperClock.style.background = "#a5a5a5";
  playPauseBtn.src = "images/pause-button.png";
  timer("lower");
  stopTimer("upper");
  isRunning = true;
  runningTimer = "lower";
});

lowerClock.addEventListener("click", function () {
  upperClock.style.background = "#588157";
  lowerClock.style.background = "#a5a5a5";
  playPauseBtn.src = "images/pause-button.png";
  timer("upper");
  stopTimer("lower");
  isRunning = true;
  runningTimer = "upper";
});
