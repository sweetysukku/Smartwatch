let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(updateTimer, 10);
  }
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  addLap();
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function updateTimer() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  updateDisplay();
}

function updateDisplay() {
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
  millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

function formatMilliseconds(time) {
  return time < 100 ? '0' + Math.floor(time / 10) : Math.floor(time / 10);
}

function addLap() {
  const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap: ${lapTime}`;
  lapsList.appendChild(lapItem);
}
