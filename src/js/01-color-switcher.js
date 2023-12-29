const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let timerId = null;
buttonStop.disabled = true;


buttonStart.addEventListener('click', evt => {
  evt.target.disabled = true;
  buttonStop.disabled = false;
//   if (timerId) {
//     return;
//   }
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', evt => {
  evt.target.disabled = true;
  buttonStart.disabled = false;

  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
