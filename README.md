# sample-library
A simple application that simulates some of the features of a library.

The application is made in a monorepo pattern that is managed by `turborepo`. The client is made in `Next.js`, while the server is made in `NestJS`. Both are written in `Typescript`.

## Features

### Borrowing books
![](/assets/readme_screenshots/borrow_page.png?raw=true)

A page where members of the library can access and borrow the books that are available. This page is accessible via the "Borrow Books" link.

A book available in a library will be shown in the grid. If there are multiple copies of a book, then they will be represented as separate cards.

#### Unsigned users

Take note that unsigned users can still access the page but a pop-up will show that will redirect unsigned users to login.

![](/assets/readme_screenshots/login_prompt.png?raw=true)

#### Borrowing checked-out books

Users cannot borrow books that are currently checked-out by others. If another member of the library logs in while a book is currently checked out, the "Borrow" button will not be available.

![](/assets/readme_screenshots/missing_borrow_button.png?raw=true)

### Returning books

![](/assets/readme_screenshots/returning_books.png?raw=true)

A user can return a book anytime by clicking the "Return" button. A confirm dialog with a warning message will pop-up once this is clicked, before executing the actual return.

Related to the comment mentioned earlier, users cannot return a book that is checked-out by another user. Therefore, the "Return" button will not be available if a user views a book card that is currently checked-out by another user.

### Checkout history

![](/assets/readme_screenshots/checkout_history.png?raw=true)

This page is to show the all of the checkout records made by the user in the library. It shows all books that were borrowed, and the dates they are both borrowed and returned. This page is accessible via the "Checkout History" link.

If a book is not returned, the return date will show up as blank.

At the end there as a quick indicator to see if a book is already returned or not.

### Overdue payments

A book can only be borrowed for 7 days, after which, users will be charged a **$0.50** fee per day the book is not returned. Overdue books can easily be seen by everyone in the book grid.

![](/assets/readme_screenshots/overdue_book_sample.png?raw=true)

If a user tries to return an overdue book, a dialog will pop-up that shows how much the user needs to pay before returning the book.

![](/assets/readme_screenshots/overdue_warning.png?raw=true)

#### Payments history

To easily keep track how much a user has paid for overdue books, there is a page accessed via the "Overdue Payments" link.

The table in the page will show the amount a user has paid on returning overdue books.

![](/assets/readme_screenshots/overdue_payments_history.png?raw=true)

### Login and registration

On the top-right of the application, there will be buttons that will allow the user to register for the library, and to also login.

We only managed to implement a password-less system where the user only needs to provide a username to login, as there is no authentication and authorization system in the app.

![](assets/readme_screenshots/registration_page.png?raw=true)

![](assets/readme_screenshots/login_page.png?raw=true)

### Admin

The `admin` username is a reserved username that allows users to manage the content of the library

#### Managing books

Accessible via the "Manage Books" link, an admin can add, edit, and remove books in the library.

Metadata that are available for editing books are `title` and `author`.

![](assets/readme_screenshots/manage_books.png?raw=true)

#### Managing checkouts

Additionally an admin can also manage the checkout records made by users. This will be helpful for correcting any mistakes made by the system when borrowing books.

![](assets/readme_screenshots/manage_checkouts.png?raw=true)

Take note that the edit button will only be available for non-returned books. This functionality will be primarily used to simulate overdue payments by moving the checkout date of the record.

## Installation

### Prerequisites

`node` >= v26.1.0

### Preparing the database

The application needs a `MongoDB` instance running in order to run.

#### Install via `podman`

While you can choose any way to install your database server, I recommend using `podman` and running this command:

```bash
podman run --name <CONTAINER_NAME> -p 27017:27107 -d mongo:latest
```

#### Connection to the server

Once the database server is installed, provide the `DATABASE_URL` inside `apps/server/.env`. You can take a look inside `apps/server/sample.env` for a sample configuration.

### Preparing the application

Turborepo will handle installing the modules needed for both the server and the client

```bash
npm install
```

### Running the application

Turborepo will handle running both the server and client inside one terminal

```bash
npm run build
npm start
```

The application will be accessible via `localhost:3000`

## Future features

### Reservation system

Currently, there is no way to get a book that is checked-out. One pain point is users will need to wait and check the app multiple times if they want to borrow a specific book that is checked out. A "Reserve" button that automatically changes the book status to "On-hold" to reserve a book to a specific user would help ease that pain point.

### Authorization and authentication

Since we exposed a role-based access control via the admin pages, it would be better if there is a way to block a random user from logging in as an admin.

### Restrict page access

Related to the security issue mentioned above, it would also be ideal if we restrict admin page access to non-admins.

Currently we block the menu links for restricted pages, based on which user is logged in. But if a user know the routes to those pages, they will still be accessible.