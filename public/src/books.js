function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let masterArray = [];
  let checkedOutBooks = [];
  let availableBooks = [];
  books.forEach((book) => {
    const borrowsLog = book.borrows;
    if (borrowsLog.every((log) => log.returned)) {
      availableBooks.push(book);
    } else { checkedOutBooks.push(book); };
  })
  masterArray.push(checkedOutBooks);
  masterArray.push(availableBooks);
  return masterArray;
}

function getBorrowersForBook(book, accounts) {
  let accountsThatBorrowedBook = [];
  const borrowsLog = book.borrows;
  borrowsLog.forEach(log => {
    accounts.forEach(account => {
      if (account.id === log.id && accountsThatBorrowedBook.length < 10) {
        const accountAndReturnedStatus = account;
        accountAndReturnedStatus.returned = log.returned;
        accountsThatBorrowedBook.push(accountAndReturnedStatus);
      }
    })
  });
  return accountsThatBorrowedBook;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
