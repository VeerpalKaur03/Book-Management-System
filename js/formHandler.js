let editIndex = null;

// event listner 
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();
  const price = parseFloat(form.price.value.trim());
 
  // input validations
  if (!title || !author || !isbn || !pubDate || !genre || isNaN(price)) {
    alert('All fields are required and must be valid.');
    return;
  }

  const type = form.bookType.value;
  let book;
  if (type === 'EBook') {
    const format = form.format.value.trim();
    book = new EBook(title, author, isbn, pubDate, genre, format);
    book.price = price;
  } else {
    const dimensions = form.dimensions.value.trim();
    book = new PrintedBook(title, author, isbn, pubDate, genre, dimensions);
    book.price = price;
  }

  if (editIndex !== null) {
    books[editIndex] = book;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
  } else {
    books.push(book);
  }

  saveBooks();
  renderBooks();
  form.reset();
}

// function to delete a book
function deleteBook(index) {
  if (confirm('Are you sure you want to delete?')) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
  }
}

// to edit a book
function editBook(index) {
  const form = document.getElementById('bookForm');
  const book = books[index];

  form.title.value = book.title;
  form.author.value = book.author;
  form.isbn.value = book.isbn;
  form.pubDate.value = book.pubDate;
  form.genre.value = book.genre;
  form.price.value = book.price;

  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = 'Update Book';
}
