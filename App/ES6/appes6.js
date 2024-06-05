class Book{

   constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

class UI{

   addBookToListFunction(bookObject){

      const list = document.querySelector( '#book-list' );

      //create a tr element (row element)
      const row = document.createElement( 'tr' );
   
      //create coloums in the row
      row.innerHTML = `
         <td>${bookObject.title}</td>
         <td>${bookObject.author}</td>
         <td>${bookObject.isbn}</td>
         <td><a href="#" class="delete" >X<a></td>
   
      `;
   
      //append to the list
      list.appendChild(row);
   }

   showAlert(message, className){

       //create a div
      const div = document.createElement( 'div' );

      //add class name
      div.className = `alert ${className}`;

      //add text
      const text = document.createTextNode(message);

      //add message alert div
      div.appendChild(text);

      //insert error. This is the partent. the child is the form
      const container = document.querySelector('.container');

      //get the form
      const form = document.querySelector('#book-form');

      //insert the div before the form
      container.insertBefore(div, form);

      //make it disappear after 3 seconds

      setTimeout(function(){

         document.querySelector('.alert').remove();
      }, 3000);

   }

   removeBook(target){

      if( target.className === 'delete' )
      {
         //go all the way up. it goes tr, then td, then anchortag. Have to go all the way to tr to delete it.
         target.parentElement.parentElement.remove();

         //if deleted successfully, return 1
         return 1;
      }
   }

   clearField(){

      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
   }
}

class Store{

   static getBooks(){

      let books;

      if( localStorage.getItem( 'books' ) === null )
         books = [];

      else
         books = JSON.parse(localStorage.getItem( 'books' ));

      return books;
   }

   static displayBooks(){

      const books = Store.getBooks();

      books.forEach(b => {
         
         const ui = new UI;

         //add book
         ui.addBookToListFunction(b);
      });
   }

   static addBooks(book){

      const books = Store.getBooks();

      books.push(book);

      localStorage.setItem( 'books', JSON.stringify( books ) );

   }

   static removeBooks(isbn){

      const books = Store.getBooks();

      books.forEach(function(b, index) {
         
         if(b.isbn === isbn)
            books.splice(index, 1);
      });

      localStorage.setItem( 'books', JSON.stringify( books ) );

      
   }

}

//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//event listner for adding a book
document.querySelector( '#book-form' ).addEventListener( 'submit', function(e){

   const UItitle = document.querySelector('#title').value;
   const UIauthor = document.querySelector('#author').value;
   const UIisbn = document.querySelector('#isbn').value;

   const book = new Book( UItitle, UIauthor, UIisbn );

   const uiObject = new UI();

   if( UItitle ==='' || UIauthor === '' || UIisbn === '' )
      uiObject.showAlert('Please fill in all fields', 'error');

   else
   {
      //add the book to the list
      uiObject.addBookToListFunction( book );

      //add to local storage
      Store.addBooks(book);

      //show alert
      uiObject.showAlert('The book has been added successfully', 'success')

      //clear the field
      uiObject.clearField();
   }

   e.preventDefault();
   
});


//event listner for removing a book from the list
document.querySelector('#book-list').addEventListener('click', function(e){

   const uiObject = new UI();

   //return 1 if was deleted
   let flag = uiObject.removeBook(e.target);

   if (flag ===1 )
   {
         //remove from local storage
         Store.removeBooks( e.target.parentElement.previousElementSibling.textContent );

         //show an alert after deleting
         uiObject.showAlert('The book was removed successfully', 'success');
   }

   e.preventDefault();

});




