import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const formData = {};
const FEEDBACK_FORM_KEY = 'feedback-form-state';

emailEl.addEventListener('input', throttle(onTextInput, 500));
messageEl.addEventListener('input', throttle(onTextInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}

savedText();

function savedText() {
  const textInStorage = localStorage.getItem(FEEDBACK_FORM_KEY);
  const textObject = JSON.parse(textInStorage);

  if (textInStorage) {
    emailEl.value = textObject.email;
    messageEl.value = textObject.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  const informOfForm = {
    email: emailEl.value,
    message: messageEl.value,
  };
  console.log(informOfForm);
  localStorage.removeItem(FEEDBACK_FORM_KEY);
  event.currentTarget.reset();
}
