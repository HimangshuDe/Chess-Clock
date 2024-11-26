"use strict";

const playPauseBtn = document.querySelector("#play-pause--btn");
const resetBtn = document.querySelector("#reset-btn");
const editBtn = document.querySelector("#edit-btn");
const upperClock = document.querySelector("#clock--time-upper");
const lowerClock = document.querySelector("#clock--time-lower");
const upperMoves = document.querySelector("#moves--upper");
const lowerMoves = document.querySelector("#moves--lower");
const upperClockTimer = document.querySelector("#clock-timer--upper");
const lowerClockTimer = document.querySelector("#clock-timer--lower");

// STEPS:
/* 
1. Any party will start the game
2. On click or tap event the clock of the opponent party will start running with change in background color to #588157
3. On initial stage or upon reset the clock stop and set the time to 10:00 and background color #dad7cd
4. On timer up background will change to red of the current running timer!
5. Use a flag so that only one clock can run at a time and should not speed up the clock on multiple time clicks
6. On clicking the clock will switch
7. Pause and resume functionality
8. Reset Functionality
9. Edit time functionality
10. Add the number of moves played for both the party, start with -1
11. Add the sound alert system on time up
12. Need to add the hour minutes seconds functionality!
13. Add the time increment functionality
*/

let upperMinutes;
let upperSeconds;
let lowerMinutes;
let lowerSeconds;
let rootTimer = new Array(4);
let checkerFlag;
let totalUpperMoves = -1;
let totalLowerMoves = -1;

let upperTimerId;
let lowerTimerId;

let isRunning = false;
let runningTimer = "upper";

const upperClockTimeRunner = function () {
  if (upperSeconds === 0 && upperMinutes !== 0) {
    upperMinutes--;
    upperSeconds = 59;
  } else if (upperMinutes === 0 && upperSeconds === 0) {
    stopTimer("upper");
    upperClock.style.background = "#ff0000";
  } else {
    upperSeconds--;
  }
  upperClockTimer.textContent = `${
    (upperMinutes < 10 ? "0" : "") + upperMinutes
  } : ${(upperSeconds < 10 ? "0" : "") + upperSeconds}`;
};

const lowerClockTimeRunner = function () {
  if (lowerSeconds === 0 && lowerMinutes !== 0) {
    lowerMinutes--;
    lowerSeconds = 59;
  } else if (lowerMinutes === 0 && lowerSeconds === 0) {
    stopTimer("lower");
    lowerClock.style.background = "#ff0000";
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

// Play Pause Event Listener
playPauseBtn.addEventListener("click", function () {
  if (isRunning === false) {
    // runningTimer === undefined ? (runningTimer = "upper") : runningTimer;
    totalUpperMoves = 0;
    totalLowerMoves = 0;
    playPauseBtn.src = "images/pause-button.png";
    isRunning = true;
    timer(runningTimer);
  } else {
    playPauseBtn.src = "images/play-button-arrowhead.png";
    isRunning = false;
    stopTimer();
  }
});

// Reset Btn Event Listener
resetBtn.addEventListener("click", function () {
  isRunning = false;
  checkerFlag = undefined;
  totalUpperMoves = totalLowerMoves = -1;
  upperMoves.textContent = `Moves: 0`;
  lowerMoves.textContent = `Moves: 0`;
  playPauseBtn.src = "images/play-button-arrowhead.png";
  stopTimer();
  runningTimer = "upper";
  upperMinutes = rootTimer[0];
  upperSeconds = rootTimer[1];
  lowerMinutes = rootTimer[2];
  lowerSeconds = rootTimer[3];
  upperClockTimer.textContent = `${
    (upperMinutes < 10 ? "0" : "") + upperMinutes
  } : ${(upperSeconds < 10 ? "0" : "") + upperSeconds}`;
  lowerClockTimer.textContent = `${
    (lowerMinutes < 10 ? "0" : "") + lowerMinutes
  } : ${(lowerSeconds < 10 ? "0" : "") + lowerSeconds}`;
  upperClock.style.background = "#a5a5a5";
  lowerClock.style.background = "#a5a5a5";
});

editBtn.addEventListener("click", function () {
  isRunning = false;
  checkerFlag = undefined;
  playPauseBtn.src = "images/play-button-arrowhead.png";
  stopTimer();
  upperMinutes = Number(prompt("Enter Minutes for Upper Clock")) || 0;
  upperSeconds = Number(prompt("Enter Seconds for Upper Clock")) || 0;
  lowerMinutes = Number(prompt("Enter Minutes for Lower Clock")) || 0;
  lowerSeconds = Number(prompt("Enter Seconds for Lower Clock")) || 0;
  rootTimer = [upperMinutes, upperSeconds, lowerMinutes, lowerSeconds];
  upperClock.style.background = "#a5a5a5";
  lowerClock.style.background = "#a5a5a5";

  upperClockTimer.textContent = `${
    (upperMinutes < 10 ? "0" : "") + upperMinutes
  } : ${(upperSeconds < 10 ? "0" : "") + upperSeconds}`;
  lowerClockTimer.textContent = `${
    (lowerMinutes < 10 ? "0" : "") + lowerMinutes
  } : ${(lowerSeconds < 10 ? "0" : "") + lowerSeconds}`;
});

upperClock.addEventListener("click", function () {
  if (checkerFlag === true || checkerFlag === undefined) {
    totalUpperMoves++;
    totalLowerMoves === -1 ? (totalLowerMoves = 0) : totalLowerMoves;
    // if (totalLowerMoves === 0) {
    //   totalUpperMoves += 2;
    // } else {
    //   totalUpperMoves++;
    // }
    upperMoves.textContent = `Moves: ${totalUpperMoves}`;
    lowerClock.style.background = "#588157";
    upperClock.style.background = "#a5a5a5";
    playPauseBtn.src = "images/pause-button.png";
    timer("lower");
    stopTimer("upper");
    isRunning = true;
    runningTimer = "lower";
    checkerFlag = false;
  }
});

lowerClock.addEventListener("click", function () {
  if (checkerFlag === false || checkerFlag === undefined) {
    totalLowerMoves++;
    totalUpperMoves === -1 ? (totalUpperMoves = 0) : totalUpperMoves;
    // if (totalUpperMoves === 0) {
    //   totalLowerMoves += 2;
    // } else {
    //   totalLowerMoves++;
    // }
    lowerMoves.textContent = `Moves: ${totalLowerMoves}`;
    upperClock.style.background = "#588157";
    lowerClock.style.background = "#a5a5a5";
    playPauseBtn.src = "images/pause-button.png";
    timer("upper");
    stopTimer("lower");
    isRunning = true;
    runningTimer = "upper";
    checkerFlag = true;
  }
});

window.onload = async function () {
  const wakeLock = await navigator.wakeLock.request("screen");
  isRunning = false;
  rootTimer = [10, 0, 10, 0];
  upperMinutes = rootTimer[0];
  upperSeconds = rootTimer[1];
  lowerMinutes = rootTimer[2];
  lowerSeconds = rootTimer[3];
  upperClockTimer.textContent = `${
    (upperMinutes < 10 ? "0" : "") + upperMinutes
  } : ${(upperSeconds < 10 ? "0" : "") + upperSeconds}`;
  lowerClockTimer.textContent = `${
    (lowerMinutes < 10 ? "0" : "") + lowerMinutes
  } : ${(lowerSeconds < 10 ? "0" : "") + lowerSeconds}`;
};
