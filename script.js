import { FormValidation } from './validation.js';

class Book {
  constructor(author, title, pages, read, comments) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.comments = comments;
    this.index;
  }

  changeReadStatus() {
    this.read === 'Yes' ? (this.read = 'No') : (this.read = 'Yes');
  }
}

let myLibrary = [
  new Book(
    'George R.R. Martin',
    'A Game of Thrones',
    1088,
    'Yes',
    'Great book, would highly recommend!'
  ),
  new Book('Adam Savage', "Every Tool's a Hammer", 320, 'No', ''),
  new Book(
    'Tom Doak',
    'Anatomy of a Golf Course',
    288,
    'Yes',
    'Excellent look at how a golf course is made.'
  ),
];

const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const tableBody = document.querySelector('tbody');
const addBtn = document.querySelector('#add');
const closeBtn = document.querySelector('#close');
const submitBtn = document.querySelector('#submit');
const validation = FormValidation(form);

let formAuthor = document.querySelector('#author');
let formTitle = document.querySelector('#title');
let formPages = document.querySelector('#pages');
let formComments = document.querySelector('textarea');

addBtn.addEventListener('click', () => {
  dialog.showModal();
});

dialog.addEventListener('close', (e) => {
  formAuthor.value = '';
  formTitle.value = '';
  formPages.value = '';
  formComments.value = '';
  validation.clearAllErrors();
});

closeBtn.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (event) => {
  if (validation.isValid()) {
    const formRead = document.querySelector('input[name="read"]:checked');
    const newBook = new Book(
      formAuthor.value,
      formTitle.value,
      formPages.value,
      formRead.value,
      formComments.value
    );

    myLibrary.push(newBook);
    getIndexes();
    removeAllBooks();
    displayBooks();

    dialog.close();
  }
});

function displayBooks() {
  for (const book of myLibrary) {
    // Create elements and add text content
    const row = document.createElement('tr');

    const author = document.createElement('td');
    author.textContent = book.author;

    const title = document.createElement('td');
    title.textContent = book.title;

    const pages = document.createElement('td');
    pages.textContent = book.pages;

    const read = document.createElement('td');
    read.textContent = book.read;

    const comments = document.createElement('td');
    comments.textContent = book.comments;

    // Add buttons and event listeners
    const options = document.createElement('td');

    const readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    readBtn.addEventListener('click', () => {
      book.changeReadStatus();
      read.textContent = book.read;
    });

    const favBtn = document.createElement('button');
    favBtn.classList.add('fav-btn');
    favBtn.addEventListener('click', () => {
      if (row.classList.contains('highlight')) {
        row.classList.remove('highlight');
      } else {
        row.classList.add('highlight');
      }
    });

    const delBtn = document.createElement('button');
    delBtn.classList.add('del-btn');
    delBtn.addEventListener('click', () => {
      myLibrary.splice(book.index, 1);
      removeAllBooks();
      displayBooks();
      getIndexes();
    });

    // Add buttons to table element
    options.append(readBtn);
    options.appendChild(favBtn);
    options.appendChild(delBtn);

    // Add elements to row
    row.appendChild(author);
    row.appendChild(title);
    row.appendChild(pages);
    row.appendChild(read);
    row.appendChild(comments);
    row.appendChild(options);

    // Add row to table
    tableBody.appendChild(row);
  }
}

function removeAllBooks() {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
}

function getIndexes() {
  for (const book of myLibrary) {
    book.index = myLibrary.indexOf(book);
  }
}

displayBooks();
getIndexes();
