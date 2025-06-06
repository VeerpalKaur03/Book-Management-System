let books = [];

// load from local storage
function loadBooks() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
  return books;
}

// save to local storage
function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}
