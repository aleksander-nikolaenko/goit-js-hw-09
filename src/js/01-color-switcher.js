
import '../sass/main.scss';

const startBtnRef = document.querySelector("[data-start]");
const stopBtnRef = document.querySelector("[data-stop]");
const SWITCHER_DELAY = 1000;
let switcherIntervalId = null;

stopBtnRef.setAttribute('disabled', true);
startBtnRef.addEventListener('click', startBtnHandler);
stopBtnRef.addEventListener('click', stopBtnHandler);



function stopBtnHandler() {
  clearInterval(switcherIntervalId);
  stopBtnRef.setAttribute('disabled', true);
  startBtnRef.removeAttribute('disabled');
}

function startBtnHandler() {
  switcherIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, SWITCHER_DELAY);

  startBtnRef.setAttribute('disabled', true);
  stopBtnRef.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
