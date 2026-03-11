const newBookBtn = document.querySelector("#new-book");
const dialog = document.querySelector("#book-form");
const closeBtn = document.querySelector("#closeBtn");
const dialogForm = document.querySelector("#dialog-form");
const libraryContainer = document.querySelector("#library-container");

//Form validation elements
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const categoryInput = document.querySelector("#category");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

class Book {
  constructor(title, author, category, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, category, pages, isRead = false) {
    const newBook = new Book(title, author, category, pages, isRead);
    this.books.push(newBook);
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  toggleReadStatus(id) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.isRead = !book.isRead;
    }
  }

  render() {
    const container = document.querySelector("#library-container");
    container.innerHTML = "";

    this.books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        <div class="card-info">
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

    document.querySelector("#book-count").textContent = this.books.length;
  }
}

const library = new Library();

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

dialogForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Clear all custom validity messages for next submission
  titleInput.setCustomValidity("");
  authorInput.setCustomValidity("");
  categoryInput.setCustomValidity("");
  pagesInput.setCustomValidity("");

  //Form Validation

  if (titleInput.value.trim() === "") {
    titleInput.setCustomValidity("The title must be filled!");
  } else {
    titleInput.setCustomValidity("");
  }

  if (authorInput.value.trim() === "") {
    authorInput.setCustomValidity("The author name must be filled!");
  } else {
    authorInput.setCustomValidity("");
  }

  if (categoryInput.value.trim() === "") {
    categoryInput.setCustomValidity("The book category must be filled!");
  } else {
    categoryInput.setCustomValidity("");
  }

  if (pagesInput.value.trim() === "") {
    pagesInput.setCustomValidity("The total pages must be filled!");
  } else {
    pagesInput.setCustomValidity("");
  }

  if (!dialogForm.reportValidity()) {
    return;
  }

  const title = titleInput.value;
  const author = authorInput.value;
  const category = categoryInput.value;
  const pages = pagesInput.value;
  const isRead = readInput.checked;

  library.addBook(title, author, category, pages, isRead);
  library.render();

  dialog.close();
  dialogForm.reset();
});

libraryContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const id = event.target.dataset.id;

    library.removeBook(id);
    library.render();
  }
  if (event.target.classList.contains("toggle-read-btn")) {
    const id = event.target.dataset.id;

    library.toggleReadStatus(id);
    library.render();
  }
});

// Test books
library.addBook("The Hobbit", "J.R.R. Tolkien", "Fantasy", 310, false);
library.addBook("1984", "George Orwell", "Dystopia", 328, true);
library.render();
