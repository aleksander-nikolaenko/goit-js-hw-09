import '../sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

Notify.init({
  width: '320px',
  fontSize: '16px',
  position: 'right-top',
});

formRef.addEventListener('submit', promiseSubmitHandler);


function promiseSubmitHandler(event) {
  event.preventDefault();
  const { elements } = event.currentTarget;
  const { delay, step, amount } = elements;
  const amountValue = Number(amount.value);
  const stepDelayValue = Number(step.value);
  const firstDelayValue = Number(delay.value);
  let delayPromise = firstDelayValue;
  
  for (let positionPromise = 1; positionPromise <= amountValue; positionPromise += 1){
    
    if (positionPromise > 1) {
      delayPromise += stepDelayValue;     
    }

      createPromise(positionPromise, delayPromise)
    .then(item => Notify.success(`✅ Fulfilled promise ${item.position} in ${item.delay}ms`))
    .catch(item => Notify.failure(`❌ Rejected promise ${item.position} in ${item.delay}ms`));
  }

}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {

    setTimeout(() => {

        if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
        } else {
        // Reject
        reject({position, delay});
        }
    }, delay);

  });
}


