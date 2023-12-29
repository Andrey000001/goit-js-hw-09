import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onClickForm);

function onClickForm(e) {
  e.preventDefault();
  let mainDelay = e.currentTarget.delay.valueAsNumber;
  const mainStep = e.currentTarget.step.valueAsNumber;
  const mainAmount = e.currentTarget.amount.valueAsNumber;

  for (let i = 1; i <= mainAmount; i++) {
    createPromise(i, mainDelay);
    mainDelay += mainStep;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolv, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolv({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
