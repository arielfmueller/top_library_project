const myLibrary = [];

// Coding the constructor
function Book(title, author, pages, status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Function to add the book to the array
function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

// Setting up the DOM
const body = document.querySelector("body");
const main = document.querySelector("main");
const divLibrary = document.createElement("div");
divLibrary.setAttribute("id", "book-container");
main.appendChild(divLibrary);

// Function to display the books registered by the user
async function displayBooks(library) {
  divLibrary.innerHTML = "";

  for (const book of library) {
    const card = document.createElement("div");
    card.setAttribute("class", "book-card");
    card.setAttribute("id", book.id);

    //Creating empty img element
    const img = document.createElement("img");
    img.alt = `Cover of ${book.title}`;

    //Creating text elements
    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author(s): ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement("p");
    status.setAttribute("class", "card-status");
    status.textContent = `Status: ${book.status}`;

    // Fetch and set image source
    const coverUrl = await fetchCoverImage(book.title);
    if (coverUrl) {
      img.src = coverUrl;
    } else {
      img.alt = "Cover not found";
    }

    // Creating both divs in the book-card
    const cardImg = document.createElement("div");
    const cardText = document.createElement("div");

    // Creating the remove book button
    const removeBtn = document.createElement("i");
    removeBtn.setAttribute("class", "remove material-icons");
    removeBtn.textContent = "delete_forever";

    //Creating the read button
    const statusButton = document.createElement("i");
    statusButton.setAttribute("class", "status-button material-icons");
    statusButton.textContent = "autorenew";

    // Append everything to the card
    card.appendChild(cardImg);
    card.appendChild(cardText);

    cardImg.appendChild(img);
    cardText.appendChild(title);
    cardText.appendChild(author);
    cardText.appendChild(pages);
    cardText.appendChild(status);
    cardText.appendChild(removeBtn);
    cardText.appendChild(statusButton);

    divLibrary.appendChild(card);
  }
}

// Getting the input info
const button = document.querySelector("button");
const form = document.querySelector("form");
button.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  if (!title || !author || !pages || !status) {
    alert("Please insert the books info!");
  }
  {
    const isDuplicate = myLibrary.some(
      (book) =>
        book.title.toLowerCase() === title.toLowerCase().trim() &&
        book.author.toLowerCase() === author.toLowerCase().trim()
    );

    if (isDuplicate) {
      alert("This book is already in your library!");
    }
  }
  {
    addBookToLibrary(title, author, pages, status);
    displayBooks(myLibrary);
    form.reset();
  }
});

// Fetch the cover of the book
async function fetchCoverImage(title) {
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
  );
  const data = await response.json();

  if (data.docs.length > 0 && data.docs[0].cover_i) {
    const coverId = data.docs[0].cover_i;
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

  return null; // If no cover was found
}

// Function for obtaining the next status for the book-card
function getNextStatus(current) {
  const statusOptions = ["read", "reading", "want to read", "abandoned"];
  const index = statusOptions.indexOf(current);
  return statusOptions[(index + 1) % statusOptions.length];
}

// Change status button
divLibrary.addEventListener("click", (e) => {
  if (e.target.classList.contains("status-button")) {
    const card = e.target.closest(".book-card");
    const statusText = card.querySelector(".card-status");

    statusCurrent = statusText.textContent.slice(8);

    statusNew = getNextStatus(statusCurrent);

    statusText.textContent = `Status: ${statusNew}`;
  }
});

// Remove book button
divLibrary.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const card = e.target.closest(".book-card");
    const bookId = card.getAttribute("id");
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks(myLibrary);
    }
  }
});
