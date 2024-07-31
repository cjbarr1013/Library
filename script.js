let myLibrary = [
  new Book("George R.R. Martin", "A Game of Thrones", 1088, "Yes", "Great book, would highly recommend!"),
  new Book("Adam Savage", "Every Tool's a Hammer", 320, "No", ""),
  new Book("Tom Doak", "Anatomy of a Golf Course", 288, "Yes", "Excellent look at how a golf course is made.")
];

const myButton = document.querySelector("#add");
myButton.addEventListener("click", () => {
  const newBook = addBookToLibrary();
  displayBook(newBook);
});

const tableBody = document.querySelector("tbody");

function Book(author, title, pages, read, comments) {
  this.author = author,
  this.title = title,
  this.pages = pages,
  this.read = read
  this.comments = comments;
};

function addBookToLibrary() {
  const author = prompt("Author?");
  const title = prompt("Title?");
  const pages = prompt("Pages? (must be a positive integer)");
  const read = prompt("Have you read it? (y/n)");
  const comments = prompt("Any comments?");

  const newBook = new Book(author, title, pages, read, comments)
  myLibrary.push(newBook);
  return newBook;
};

function displayBook(book) {
  // Create elements and add text content
  const row = document.createElement("tr");

  const author = document.createElement("td");
  author.textContent = book.author;

  const title = document.createElement("td");
  title.textContent = book.title;

  const pages = document.createElement("td");
  pages.textContent = book.pages;

  const read = document.createElement("td");
  read.textContent = book.read;

  const comments = document.createElement("td");
  comments.textContent = book.comments;

  // Add buttons and event listeners
  const options = document.createElement("td");

  const favBtn = document.createElement("button");
  favBtn.classList.add("fav-btn");
  favBtn.addEventListener("click", () => {
    if (row.classList.contains("highlight")) {
      row.classList.remove("highlight")
    } else {
      row.classList.add("highlight")
    }
  });

  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.addEventListener("click", () => {
    row.remove();
  });

  // Add buttons to table element
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
};

for (const book of myLibrary) {
  displayBook(book);
}