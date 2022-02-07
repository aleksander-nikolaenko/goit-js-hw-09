import '../sass/main.scss';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// require("flatpickr/dist/themes/dark.css");
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('[data-start]');
const spanDaysRef = document.querySelector('[data-days]');
const spanHoursRef = document.querySelector('[data-hours]');
const spanMinutesRef = document.querySelector('[data-minutes]');
const spanSecondsRef = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      startBtnRef.setAttribute('disabled', true);
      Notify.failure("Please choose a date in the future");
    }
    else {
      startBtnRef.removeAttribute('disabled');
      Notify.success("Date is selected press start for countdown");
    }
  },
};
const calendar = flatpickr('#datetime-picker', options);
let timerIntervalId = null;
let selectedTime = 0;

Notify.init({
  width: '320px',
  fontSize: '16px',
  position: 'right-top',
});

startBtnRef.setAttribute('disabled', true);
startBtnRef.addEventListener('click', startBtnHandler);


function startBtnHandler() {
  selectedTime = calendar.selectedDates[0].getTime();
  let remainTime = selectedTime - Date.now();
  startBtnRef.setAttribute('disabled', true);
  timerIntervalId = setInterval(() => {
    remainTime = selectedTime - Date.now();
    if (remainTime > 0) {
      updateTimer(convertMs(remainTime));
    }
    else {
      clearInterval(timerIntervalId);
      Notify.success("Timer is finish");
    }
  }, 1000);
    
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  const remainDays = addLeadingZero(days);
  const remainHours = addLeadingZero(hours);
  const remainMinutes = addLeadingZero(minutes);
  const remainSeconds = addLeadingZero(seconds);
  spanDaysRef.textContent = `${remainDays}`;
  spanHoursRef.textContent = `${remainHours}`;
  spanMinutesRef.textContent = `${remainMinutes}`;
  spanSecondsRef.textContent = `${remainSeconds}`;
}