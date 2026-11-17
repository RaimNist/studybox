'use strict';

const form = document.getElementById('registration');
const result = document.getElementById('result');
const fieldNames = ['login', 'age', 'email', 'password', 'agreement'];

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = {};
  for (const name of fieldNames) {
    const input = form.elements.namedItem(name);
    data[name] = name === 'agreement' ? input.checked : input.value;
  }
  const validation = StudyBox.validateForm(data);
  for (const name of fieldNames) {
    document.getElementById(`${name}-error`).textContent = validation.errors[name];
    form.elements.namedItem(name).setAttribute('aria-invalid', String(Boolean(validation.errors[name])));
  }
  result.textContent = validation.valid ? 'Registration completed' : '';
});
