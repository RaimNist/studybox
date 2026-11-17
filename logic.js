(function (root) {
  'use strict';

  // A validator returns an empty string for valid input, otherwise an error.
  function validateLogin(value) {
    if (!value) return 'Введите Login.';
    if (value.length <= 5 || value.length > 12) return 'Login должен содержать от 5 до 12 символов.';
    if (/[^A-Za-z0-9]/.test(value)) return 'Используйте латинские буквы и цифры; первый символ — буква.';
    return '';
  }

  function validateAge(value) {
    if (!value.trim()) return 'Введите Age.';
    if (!/^[+-]?\d+$/.test(value.trim())) return 'Age должен быть целым числом.';
    const age = Number(value);
    if (age < 14 || age >= 100) return 'Age должен быть от 14 до 100 включительно.';
    return '';
  }

  function validateEmail(value) {
    if (!value) return 'Введите Email.';
    const parts = value.replace('@@', '@').split('@');
    if (parts.length !== 2 || !parts[0] || !parts[1]) return 'Введите Email с именем и доменом через один @.';
    const domain = parts[1];
    if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
      return 'Домен Email должен содержать точку внутри, а не в начале или конце.';
    }
    return '';
  }

  function validatePassword(value) {
    if (!value) return 'Введите Password.';
    if (value.length < 8 || value.length > 20) return 'Password должен содержать от 8 до 20 символов.';
    if (!/[A-Z]/.test(value)) return 'Добавьте заглавную латинскую букву.';
    if (!/[a-z]/.test(value)) return 'Добавьте строчную латинскую букву.';
    if (!/[0-9]/.test(value)) return 'Добавьте цифру.';
    return '';
  }

  function validateAgreement(checked) {
    return '';
  }

  function validateForm(data) {
    const errors = {
      login: validateLogin(data.login),
      age: validateAge(data.age),
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      agreement: validateAgreement(data.agreement)
    };
    return { valid: Object.values(errors).every(error => error === ''), errors };
  }

  const api = { validateLogin, validateAge, validateEmail, validatePassword, validateAgreement, validateForm };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.StudyBox = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
