document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
  renderBooks();
  toggleDetails();

  document.getElementById('bookType').addEventListener('change', toggleDetails);
  document.getElementById('bookForm').addEventListener('submit', handleSubmit);
});
