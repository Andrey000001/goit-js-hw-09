import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const btnStr = document.querySelector('button[data-start]');

const dataDay = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let currentDate = null;
let timerId = null;

btnStr.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      Report.success('Super!', 'Please, click on button start.', 'Okay');
      btnStr.disabled = false;
    } else {
      Report.failure('Please choose a date in the future');
      btnStr.disabled = true;
    }
    selectedDate = selectedDates[0].getTime();
  },
};

const counter = {
  start() {
    timerId = setInterval(() => {
      btnStr.disabled = true;
      datetimePicker.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;
      updateNames(convertMs(delta));
      if (delta <= 1000) {
        this.stop();
        Report.info('Time end');
      }
    }, 1000);
  },
  stop() {
    clearInterval(timerId);
    btnStr.disabled = true;
    datetimePicker.disabled = false;
  },
};

function updateNames({ days, hours, minutes, seconds }) {
  dataDay.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

btnStr.addEventListener('click', function () {
  counter.start();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(datetimePicker, options);
