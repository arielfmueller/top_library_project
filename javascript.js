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

addBookToLibrary(
  "The Courage To Be Disliked",
  "Ichiro Kishimi and Fumitake Koga",
  288,
  "read"
);

// Setting up the DOM
const body = document.querySelector("body");
const main = document.querySelector("main");
const divLibrary = document.createElement("div");
divLibrary.setAttribute("id", "book-container");
main.appendChild(divLibrary);

// Function to display the books registered by the user
async function displayBooks(library) {
  //   divLibrary.innerHTML = "";

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

    // Creating the delete book button
    const removeBtn = document.createElement("i");
    removeBtn.setAttribute("class", "remove material-icons");
    removeBtn.textContent = "delete_forever";

    //Creating the read button
    const readButton = document.createElement("i");
    readButton.setAttribute("class", "check material-icons");
    readButton.textContent = "check";

    // Append everything to the card
    card.appendChild(cardImg);
    card.appendChild(cardText);

    cardImg.appendChild(img);
    cardText.appendChild(title);
    cardText.appendChild(author);
    cardText.appendChild(pages);
    cardText.appendChild(status);
    cardText.appendChild(removeBtn);
    cardText.appendChild(readButton);

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
  console.log(title, author, pages, status);

  addBookToLibrary(title, author, pages, status);

  displayBooks(myLibrary);
  form.reset();
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
