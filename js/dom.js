// used to display books on ui
function renderBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((bookData, index) => {
    const book = new Book(bookData.title, bookData.author, bookData.isbn, bookData.pubDate, bookData.genre, bookData.price);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.pubDate}</td>
      <td>${book.genre}</td>
      <td>${book.price}</td>
      <td>${book.getDiscount(20)}</td>
      <td>${book.getAge()}</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}

// toggle on ui
function toggleDetails() {
  const bookType = document.getElementById('bookType');
  const formatInput = document.getElementById('format');
  const dimensionsInput = document.getElementById('dimensions');

  const type = bookType.value;
  formatInput.style.display = type === 'EBook' ? 'inline-block' : 'none';
  dimensionsInput.style.display = type === 'PrintedBook' ? 'inline-block' : 'none';
}
