const libraryDiv = document.querySelector(".library");
const btnNew = document.querySelector(".header-btn");
const btnRem = document.querySelector("remBook");

const titleInp = document.querySelector("#title-form");
const authorInp = document.querySelector("#author-form");
const pagesInp = document.querySelector("#pages-form");
const checkbox = document.querySelector("#checkbox-form");
const bookarr = [];

class Book {
  constructor(title, author, pages, haveRead) {
    this.bookid = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}
// function Book(title, author, pages, haveRead) {
//   const bookid = crypto.randomUUID();
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.haveRead = haveRead;
//   return {
//     ID: bookid,
//     title: this.title,
//     author: this.author,
//     pages: this.pages,
//     haveRead: this.haveRead,
//   };
// }

function addBookToLibrary(title, author, pages, haveRead) {
  const bookObj = new Book(title, author, pages, haveRead);
  bookarr.push(bookObj);
  renderLibrary(bookarr);
}

function renderLibrary(arr) {
  libraryDiv.textContent = "";

  arr.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card-list");

    const title = document.createElement("h3");
    title.textContent = `Title: ${book.title} `;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pageNo = document.createElement("p");
    pageNo.textContent = `Number of pages: ${book.pages}`;

    const status = document.createElement("p");
    status.textContent = book.haveRead ? "Read ✅" : "Not read ❌";

    const remBook = document.createElement("button");
    remBook.textContent = "Remove Book";
    remBook.classList.add("remBook");

    const changeStatus = document.createElement("button");

    changeStatus.textContent = book.haveRead
      ? "Mark as unread"
      : "Mark as read";
    changeStatus.classList.add("toggle-status");

    card.append(title, author, pageNo, status, remBook);
    card.append(changeStatus);
    card.dataset.id = book.ID;
    libraryDiv.append(card);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, true);

btnNew.addEventListener("click", (e) => {
  e.preventDefault();

  addBookToLibrary(
    titleInp.value,
    authorInp.value,
    pagesInp.value,
    checkbox.checked,
  );
});

function removeBook(id) {
  const index = bookarr.findIndex((book) => book.ID === id);

  if (index !== -1) {
    bookarr.splice(index, 1);
    renderLibrary(bookarr);
  }
}

function toggleReadStatus(id) {
  const book = bookarr.find((book) => book.ID === id);
  if (!book) return;

  book.haveRead = !book.haveRead;
  renderLibrary(bookarr);
}

libraryDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".book-card-list");
  if (!card) return;

  const bookId = card.dataset.id;

  if (e.target.classList.contains("remBook")) {
    removeBook(bookId);
  }

  if (e.target.classList.contains("toggle-status")) {
    toggleReadStatus(bookId);
  }
});
