

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

// event listners
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
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
   
    // object is created
    const book = new Book(title, author, isbn, pubDate, genre);

    await handleBookSubmit(book);

    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
  } catch (err) {
    alert('Failed to save book.');
    console.error(err);
  }
});

// render to ui
function renderBooks() {
  bookList.innerHTML = '';
  books.forEach((bookData, index) => {
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
      <td>${book.getAge()} years</td>
      <td>
        <button onclick="view(${index})" class="text-blue-500">View</button>
        <button onclick="editBook(${index})" class="text-green-500">Edit</button>
        <button onclick="deleteBook(${index})" class="text-red-500">Delete</button>
      </td>
    `;
    highlightLatest(book, row);
    bookList.appendChild(row);
  });
}

// view extra info
function view(index) {
  const book = books[index];
  const data = new Book(book.title, book.author, book.isbn, book.pubDate, book.genre);
  alert(`The book "${book.title}" by ${book.author} is ${data.getAge()} years old.`);
}

// highlight latest book
function highlightLatest(book, row) {
  const data = new Book(book.title, book.author, book.isbn, book.pubDate, book.genre);
  const latest = data.getAge() < 0.5;
  if (latest) {
    row.classList.add("bg-yellow-200");
  }
}

// Load on page
loadBooks();
