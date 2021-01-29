
//book constructor
function Book( title, author, isbn ){

   this.title = title;
   this.author = author;
   this.isbn = isbn;
}

function UI(){}

UI.prototype.addBookToListFunction = function( bookObject ){ 

   const list = document.querySelector( '#book-list' );

   //create a tr element (row element)
   const row = document.createElement( 'tr' );

   //create coloums in the row
   row.innerHTML = `
      <td>${bookObject.title}</td>
      <td>${bookObject.author}</td>
      <td>${bookObject.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
   `;

   //append to the list
   list.appendChild(row);

}

UI.prototype.showAlert = function(message, className){

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

//delete a book from the list
UI.prototype.removeBook = function(target){

   if( target.className === 'delete' )
   {
      //go all the way up. it goes tr, then td, then anchortag. Have to go all the way to tr to delete it.
      target.parentElement.parentElement.remove();

       //if deleted successfully, return 1
       return 1;
   }
}

//clear the field function
UI.prototype.clearField = function(){

  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';

}


//event listner for adding a book
document.querySelector( '#book-form' ).addEventListener( 'submit', function(e){

   const UItitle = document.querySelector('#title').value;
   const UIauthor = document.querySelector('#author').value;
   const UIisbn = document.querySelector('#isbn').value;

   const book = new Book( UItitle, UIauthor, UIisbn );

   const uiObject = new UI();

   if( UItitle ==='' || UIauthor === '' || UIisbn === '' )
      uiObject.showAlert('Fill in all fields', 'error');

   else
   {
      //add the book to the list
      uiObject.addBookToListFunction( book );

      //show alert
      uiObject.showAlert('Book added successfully', 'success')

      //clear the field
      uiObject.clearField();
   }

   e.preventDefault();

});


//event listner for removing a book forem the list

document.querySelector('#book-list').addEventListener('click', function(e){

   const uiObject = new UI();

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




