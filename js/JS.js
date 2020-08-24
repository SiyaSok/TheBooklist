// Book class :Represnts a book 
class Book 
{
    constructor(title,author ,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class : Handle UI Task 
class UI{
    static displaybook()
    {
     const StoreBook = Store.getBooks();

    const books = StoreBook;

    books.forEach((book) => UI.addBookToList(book));


    } 

static addBookToList(book)
{
    const list = 
    document.querySelector('#book-list');

    const row =
     document.createElement('tr');

     row.innerHTML =`
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td>
     <a href="#" class="btn btn-danger btn-btn-sm- delete">
     X</a>
     </td>
     `
list.appendChild(row);
}

static deleteBook(el)
{
    if(el.classList.contains('delete'))
    {
        el.parentElement.parentElement.remove();

    }
    
}

static showAlert(message, className)
{
const div = document.createElement('div');
div.className = `alert alert-${className}`;
div.appendChild(document.createTextNode(message));
const contaner = document.querySelector('.container');
const mainForm = document.querySelector('#book-form');
contaner.insertBefore(div,mainForm);
// Vanish in 3 seconds
setTimeout(() => document.querySelector('.alert').remove(),
3000);
} 
static clearfields()
{
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
      
}




}

//Store class : Handles Storage 
class Store 
{

    static getBooks()
    {
        let books;
        if(localStorage.getItem('books') === null)
        {
            books = [ ];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }

    static addBook(book)
    {

        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn)
    {
        const books = Store.getBooks();

    books.forEach((book, index) => {
    if(book.isbn === isbn)
    {
        books.splice(index, 1);
    }
});
localStorage.setItem('books', JSON.stringify(books));
    }


}









//Events: Display Books 
document.addEventListener('DOMContentLoaded' ,UI.displaybook);
//Event :add a book
let BookForm = document.querySelector('#book-form');
BookForm.addEventListener('submit',(e) => {
//Prevent actual sumbit

e.preventDefault();
//get form values

const title =document.querySelector('#title').value;
const author =document.querySelector('#author').value;
const isbn =document.querySelector('#isbn').value;

if(title === '' || author === '' || isbn === '' )
{
    UI.showAlert('Please fill in all the fields', 'danger');
}
else
{
// instatate book 
const book = new Book(title,author,isbn);

// add book to UI
UI.addBookToList(book);

// add book to store
Store.addBook(book);

UI.showAlert('Book has been uploaded ', 'success');

//clear fields
UI.clearfields();
}

});


// Event : Romove a book 
document.querySelector('#book-list').addEventListener('click',(e) => {

    UI.deleteBook(e.target);
 
// Romove a book from store

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    console.log(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book has been removed ', 'primary');


});
