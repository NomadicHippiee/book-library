const library = [];
const newBookBtn = document.querySelector("#new-book");
const dialog = document.querySelector("#book-form");
const closeBtn = document.querySelector("#closeBtn");
const dialogForm = document.querySelector("#dialog-form");
const libraryContainer = document.querySelector("#library-container");

function Book(title, author, category, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.category = category;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let category = document.querySelector("#category").value;
  let pages = Number(document.querySelector("#pages").value);
  let isRead = document.querySelector("#read").checked;

  const newBook = new Book(title, author, category, pages, isRead);
  library.push(newBook);
}

function renderLibrary() {
  const container = document.querySelector("#library-container");
  container.innerHTML = "";

  library.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML += `<div class="card-info"
    <p><strong>Title:</strong> ${book.title}</p>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Category:</strong> ${book.category}</p>
    <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
    </div>
    <div class="card-actions">
    <button data-id="${book.id}" class="remove-btn">Remove</button>
    <button data-id="${book.id}" class="toggle-read-btn">${
      book.isRead ? "Unread" : "Read"
    }</button>

    </div>

    
    
    
    
    `;

    container.appendChild(card);
  });
  document.querySelector("#book-count").textContent = library.length;
}

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

dialogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  renderLibrary();
  dialog.close();
  dialogForm.reset();
});

libraryContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const id = event.target.dataset.id;
    const index = library.findIndex((book) => book.id === id);
    library.splice(index, 1);
    renderLibrary();
  }
  if (event.target.classList.contains("toggle-read-btn")) {
    const id = event.target.dataset.id;
    const book = library.find((book) => book.id === id);
    book.isRead = !book.isRead;
    renderLibrary();
  }
});

// Test books

library.push(new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy", 310, false));
library.push(new Book("1984", "George Orwell", "Dystopia", 328, true));
renderLibrary();
