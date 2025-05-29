class Book {
  constructor(title, author, isbn, pubDate, genre) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
  }
// calculate how old book is
  calculateAge() {
    return new Date().getFullYear() - new Date(this.pubDate).getFullYear();
  }

  // categorize accoridng to genre
  categorize() {
    const g = this.genre.toLowerCase();
    if (['sci-fi', 'fantasy', 'horror'].includes(g)) return 'Fiction';
    if (['biography', 'history', 'self-help'].includes(g)) return 'Non-Fiction';
    if (['romance', 'drama'].includes(g)) return 'Literature';
    if (['thriller', 'mystery'].includes(g)) return 'Mystery';
    return 'Other';
  }
}

let books = [];

// fetch 
async function loadBooks() {
  try {
    // fetch from json
    const response = await fetch('db.json');
    if (!response.ok) throw new Error('Failed to fetch books');
    const data = await response.json();

   // fetch from local storage
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      //parse to json object
      books = JSON.parse(storedBooks);
    } else {
      books = data;
      //store to storage
      localStorage.setItem('books', JSON.stringify(books));
    }

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
let editIndex = null;

// event listner
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();

  // validations
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

function renderBooks() {
  bookList.innerHTML = '';

  books.forEach((bookData, index) => {
    // Create Book instance to use its methods
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.pubDate,
      bookData.genre
    );

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.pubDate}</td>
      <td>${book.genre}</td>
      <td>${book.calculateAge()} years</td>
      <td>${book.categorize()}</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}
//delete
async function deleteBook(index) {
  books.splice(index, 1);
  await saveBooksToStorage();
  renderBooks();
}


//edit
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

loadBooks();
