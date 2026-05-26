# Exercise
A short exercise that allows developers to initialize the app and walk through the features.

## 1. Preparation
**Note:** Make sure that your `.env` files are configured before starting.

This step will re-initialize all the data, deleting previous records, and creating the `admin` user.

**Run:** 
```bash
npm run init
npm run dev
```

Access the app through [localhost:3000](http://localhost:3000)

## 2. Login as `admin`
On the top-right of the app, click "Login" and sign in on the app as an administrator.

## 3. Add books
Ideally, we would like to add 3 or more books so that we can see the borrow and return mechanics.

## 4. Registration
Logout as `admin` and click "Register". Login afterwards as the newly created user.

## 5. Borrow
Borrow 2 books. Return 1 book after borrowing. The library should only have 1 book checkout out after this step.

## 6. Go to "Checkout History"
2 entries should be seen. One for the returned book, and one for the currently checked out book.

## 7. Logout and register as another user
We will borrow 1 book as another user. By the end of this step, the library should have 2 checked out books, one for 1st user, and another for the 2nd user.

## 8. Go to "Checkout History"
1 entry should be seen, which is the book that was checked out by the 2nd user. The other user's records should not be seen here.

## 9. Login as `admin` again
Go to "Manage Checkouts". Edit one of the checkouts and change the checkout date to somewhere that is more than 7 days ago.

## 10. Login as the user with the overdue book
You should see 1 book that has its status been changed to "Overdue". Return the book and pay the overdue fee.

## 11. Go to "Overdue Payments"
There should be 1 record that shows the amount paid due to an overdue book.