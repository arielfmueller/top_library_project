const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
} 

const book1 = new Book(
  "The Courage To Be Disliked",
  "Ichiro Kishimi and Fumitake Koga",
  288,
  "read"
);

console.log(book1)

function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead)
    myLibrary.push(newBook)
}

addBookToLibrary("The Courage To Be Disliked",
  "Ichiro Kishimi and Fumitake Koga",
  288,
  "read");

console.log(myLibrary)

addBookToLibrary("The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness","Morgan Housel", 256, "read")

console.log(myLibrary)

// Setting up the DOM
const body = document.querySelector("body")
const divLibrary = document.createElement("div")
divLibrary.setAttribute("id", "book-container")
body.appendChild(divLibrary)

// 
function displayBooks(array) {
    divLibrary.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const book = array[i]
        const divBook = document.createElement("div")
        divLibrary.appendChild(divBook)
        divBook.setAttribute("id", "book-card")

        divBook.innerHTML = `<h3></h3>`
    }
}