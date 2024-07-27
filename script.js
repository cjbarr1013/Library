const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author,
  this.title = title,
  this.pages = pages,
  this.read = read
};

function addBookToLibrary() {
  let author = prompt("Author?");
  let title = prompt("Title?");
  let pages = prompt("Pages? (must be a positive integer)");
  let read = prompt("Have you read it? (y/n)");
  myLibrary.push(new Book(author, title, pages, read));
};

const myButton = document.querySelector("#add");
myButton.addEventListener("click", addBookToLibrary);