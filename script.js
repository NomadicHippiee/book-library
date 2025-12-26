const library = [];

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

    card.innerHTML += `<p><strong>Title:</strong> ${book.title}</p>`;
    card.innerHTML += `<p><strong>Author:</strong> ${book.author}</p>`;
    card.innerHTML += `<p><strong>Pages:</strong> ${book.pages}</p>`;
    card.innerHTML += `<p><strong>Category:</strong> ${book.category}</p>`;
    card.innerHTML += `<p><strong>Read:</strong> ${
      book.isRead ? "Yes" : "No"
    }</p>`;

    container.appendChild(card);
  });
}

// Test books
library.push(new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy", 310, false));
library.push(new Book("1984", "George Orwell", "Dystopia", 328, true));

renderLibrary();
