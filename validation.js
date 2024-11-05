export function FormValidation(form) {
  let valid = false;

  // Needs to be changed based on input IDs
  const author = form.querySelector('#author');
  const title = form.querySelector('#title');
  const pages = form.querySelector('#pages');
  const inputs = [author, title, pages];

  // Needs to be changed based on input IDs
  const errorMsg = {
    author: {
      empty: 'You need to provide an author.',
      tooLong: `Author should be less than ${author.maxLength} characters.`,
    },
    title: {
      empty: 'You need to provide a title.',
      tooLong: `Title should be less than ${title.maxLength} characters.`,
    },
    pages: {
      empty: 'You need to provide the number of pages.',
      rangeUnderflow: `There should be more than ${pages.min} pages.`,
      rangeOverflow: `There should be less than ${pages.max} pages.`,
    },
  };

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) {
        input.parentNode
          .querySelector('.error-container')
          .classList.add('hidden');
      } else {
        showError(input);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    valid = true;
    inputs.forEach((input) => {
      if (!input.validity.valid) {
        showError(input);
        event.preventDefault();
        valid = false;
      }
    });
  });

  const isValid = () => valid;

  const showError = (input) => {
    const errorContainer = input.parentNode.querySelector('.error-container');
    const msgDiv = errorContainer.querySelector('.msg');

    if (input.validity.valueMissing) {
      msgDiv.textContent = errorMsg[input.id].empty;
    } else if (input.validity.tooShort) {
      msgDiv.textContent = errorMsg[input.id].tooShort;
    } else if (input.validity.tooLong) {
      msgDiv.textContent = errorMsg[input.id].tooLong;
    } else if (input.validity.rangeUnderflow) {
      msgDiv.textContent = errorMsg[input.id].rangeUnderflow;
    } else if (input.validity.rangeOverflow) {
      msgDiv.textContent = errorMsg[input.id].rangeOverflow;
    }

    errorContainer.classList.remove('hidden');
  };

  const clearAllErrors = () => {
    inputs.forEach((input) => {
      const errorContainer = input.parentNode.querySelector('.error-container');
      const msgDiv = errorContainer.querySelector('.msg');

      msgDiv.textContent = '';
      errorContainer.classList.add('hidden');
    });
  };

  return {
    isValid,
    clearAllErrors,
  };
}
