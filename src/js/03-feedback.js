import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const FEEDBACK_FORM_KEY = 'feedback-form-state';
const formData = {};
const textInStorage = localStorage.getItem(FEEDBACK_FORM_KEY);

emailEl.addEventListener('input', throttle(onTextInput, 500));
messageEl.addEventListener('input', throttle(onTextInput, 500));
formEl.addEventListener('submit', onFormSubmit);

if (textInStorage) {
  savedText();
}

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}

function savedText() {
  const textObject = JSON.parse(textInStorage);

  if (Object.keys(textObject).includes('email')) {
    emailEl.value = textObject.email;
  }
  if (Object.keys(textObject).includes('message')) {
    messageEl.value = textObject.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  const informOfForm = {
    email: emailEl.value,
    message: messageEl.value,
  };
  if (emailEl.value === '' || messageEl.value === '') {
    alert('Please fill in all the fields!');
  } else {
    console.log(informOfForm);
    localStorage.removeItem(FEEDBACK_FORM_KEY);
    event.currentTarget.reset();
  }
}
