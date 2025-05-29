class Book {
  constructor(title, author, isbn, pubDate, genre) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
  }

  getAge() {
    const pubYear = new Date(this.pubDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - pubYear;
  }
}

let books = [];


async function loadBooks() {
    books = await getBooksFromStorage();
    renderBooks();
}

//fetch data from loxalStorage 
function getBooksFromStorage() {
  return new Promise((resolve) => {
    const data = localStorage.getItem('books');
    resolve(data ? JSON.parse(data) : []);
  });
}

// to add
function saveBooksToStorage() {
  return new Promise((resolve, reject) => {
      localStorage.setItem('books', JSON.stringify(books));
      resolve();
    
  });
}

// sort books by pubdate
function sortBooks(){
   books.sort((a,b)=>
      new Date(a.pubDate) -new Date(b.pubDate)
   );
   renderBooks();
}

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
let editIndex = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
try{
  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();

  //input validation
  if (!title || !author || !isbn || !pubDate || !genre) {
    alert('All fields are required.');
    return;
  }

  if (isNaN(isbn)) {
    alert('ISBN must be a number.');
    return;
  }

  const book = new Book(title, author, isbn, pubDate, genre);

 // this editIndex wont be null when user click edit button
  if (editIndex !== null) {
    books[editIndex] = book;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
  } else {
    // add to books array
    books.push(book);
  }

    // save to local storage
    await saveBooksToStorage();
    //display on ui
    renderBooks();
    form.reset();
  } catch (err) {
    alert('Failed to save book.');
    console.error(err);
  }
});

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
    highlightLatest(book, row)
    bookList.appendChild(row);
  });
}

// give some extra info as alert
function view(index){
  const book=books[index];
  const data=new Book(book.title, book.author, book.isbn, book.pubDate, book.genre);
  alert(`This ${book.title} is written by ${book.author} is ${data.getAge()} years`)
}

function highlightLatest(book, row){
  const data=new Book(book.title, book.author, book.isbn, book.pubDate, book.genre);
  const latest=data.getAge()<0.5;
  if(latest){
     row.classList.add("bg-yellow-200")
  }
}

async function deleteBook(index) {
  books.splice(index, 1);
  await saveBooksToStorage();
  renderBooks();
}

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
