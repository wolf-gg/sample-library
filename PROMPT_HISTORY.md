# AI Prompt History

## 1. Feature: Develop the book lending page
* **Prompt Template:**
> Create a new section where users can click a button to borrow a book.
>
> Make the style the same as in BookManagement section where we show a grid. Make BookCard a little bit taller and show additional details such as the book's status and the check out date.

## 2. Feature: Add overdue state for books
* **Prompt Template:**
> Add a new state for books called "Overdue" when the books is checked out for more than 1 week.
>
> In the card, add the number of days the book is overdue.

## 3. Feature: Add login page
* **Prompt Template:**
> Add a 'Login' module and expose it in the /login page.
>
> Use the same form implementation used in AddBookDialog. Add validations that the input fields must not be empty.

## 4. Feature: Add registration page
* **Prompt Template:**
> Create a module inside RegisterForm so that we can use it in the /register page.
>
> The module should allow new users to sign up by providing a username, first name, last name.
>
> Create a new controller inside register.controller.ts that creates a user in the database.

## 5. Feature: Add borrow dialog
* **Prompt Template:**
> Add a dialog in this button that shows a warning for the user that they can only borrow a book for 7 days or else they will have to pay.

## 6. Design: Borrow dialog text for unsigned users
* **Prompt Template:**
> Improve the title and description in 'LoginDialog' to show that only signed in users can borrow books

## 7. Feature: Add return dialog
* **Prompt Template:**
> Create a dialog that warns the user that other users can check out the book once they returned the book.

## 8. Feature: Add update book button in the manage page
* **Prompt Template:**
> Create a dialog that allows a user to update the title and author of a book.
>
> Try to match the design pattern used in 'AddBookDialog'.