class Book {
  constructor(title, author, isbn, pubDate, genre) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
  }
}

let books = [];
//fetch data
async function loadBooks() {
  try {
    //from json
    const response = await fetch('db.json');
    if (!response.ok) throw new Error('Failed to fetch books');
    const data = await response.json();
    // get from storage
    const storedBooks = localStorage.getItem('books');

    // if there fetch
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    } else {
      books = data;
      // if not then put into local storage the data fetched from json
      localStorage.setItem('books', JSON.stringify(books));
    }

    // print on ui
    renderBooks();
  } catch (error) {
    alert(error.message);
  }
}

// add
function saveBooksToStorage() {
  return new Promise((resolve) => {
    localStorage.setItem('books', JSON.stringify(books));
    resolve();
  });
}

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
//get from html
const searchInp = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');
let editIndex = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();

  if (!title || !author || !isbn || !pubDate || !genre) {
    alert('All fields are required.');
    return;
  }

  if (isNaN(isbn)) {
    alert('ISBN must be a number.');
    return;
  }

  const book = new Book(title, author, isbn, pubDate, genre);

  if (editIndex !== null) {
    books[editIndex] = book;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
  } else {
    books.push(book);
  }

  await saveBooksToStorage();
  renderBooks();
  form.reset();
});

// render books
function renderBooks() {
  bookList.innerHTML = '';

  books.forEach((bookData, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bookData.title}</td>
      <td>${bookData.author}</td>
      <td>${bookData.isbn}</td>
      <td>${bookData.pubDate}</td>
      <td>${bookData.genre}</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}

// render only filtered books
function renderFilterBooks(filterBooks) {
  bookList.innerHTML = '';

  filterBooks.forEach((bookData, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bookData.title}</td>
      <td>${bookData.author}</td>
      <td>${bookData.isbn}</td>
      <td>${bookData.pubDate}</td>
      <td>${bookData.genre}</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}

//search functionality
function search() {
  const query = searchInp.value.trim().toLowerCase();

  if (!query) {
    renderBooks();
    return;
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  renderFilterBooks(filteredBooks);
}

//to delete
async function deleteBook(index) {
  books.splice(index, 1);
  await saveBooksToStorage();
  renderBooks();
}

// to edit
function editBook(index) {
  const book = books[index];

  form.title.value = book.title;
  form.author.value = book.author;
  form.isbn.value = book.isbn;
  form.pubDate.value = book.pubDate;
  form.genre.value = book.genre;

  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = 'Update Book';
}

searchBtn.addEventListener('click', search);

loadBooks();
