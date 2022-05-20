function findAccountById(accounts, id) {
  return accounts.find((account) => account.id == id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastNameA, lastNameB) => {
    const lastA = lastNameA.name.last.toLowerCase();
    const lastB = lastNameB.name.last.toLowerCase();
    return lastA < lastB ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  //.reduce to use an accumulator variable to count up number of TRUE in borrow log that matches account id
  //console.log(`Current account id: ${account.id}`);
  return books.reduce((numberOfTimesBorrowed, book) => {
    //console.log(`Accumulator currently: ${numberOfTimesBorrowed}`);
    const borrowedLog = book.borrows;
    //console.log(`Current book's borrowed log: ${borrowedLog}`);
    borrowedLog.forEach((log) => {
      //console.log(`Current log id: ${log.id}, accumulator is ${numberOfTimesBorrowed}`);
      if (log.id === account.id) {
        numberOfTimesBorrowed++;
        //console.log(`Accumulator increased to ${numberOfTimesBorrowed}`);
      } //else {console.log(`No match, accumulator is ${numberOfTimesBorrowed}`)};
    })
    return numberOfTimesBorrowed;
  }, 0) 
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((checkedOutBooks, book) => {
    //console.log(`Accumulator array currently = ${checkedOutBooks}`);
    const borrowedLog = book.borrows;
    //console.log(`Current book's borrowedLog = ${borrowedLog}`);
    borrowedLog.forEach(log => {
      if (log.id === account.id && log.returned === false) {
        //console.log("Matching account ID found in current book's borrowed log");
        const bookAndAuthor = book;
        //console.log("...now checking authors array for matching authorId");
        authors.forEach((author) => {
          if (bookAndAuthor.authorId === author.id) {
            bookAndAuthor.author = author;
            //console.log(`Matching authorId found, bookAndAuthor now: ${bookAndAuthor}`);
          }
        })
        checkedOutBooks.push(bookAndAuthor);
      }
    });
    
    //console.log(`Done checking current book, accumulator before next book: ${checkedOutBooks}`);
    return checkedOutBooks;
  }, [])

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
