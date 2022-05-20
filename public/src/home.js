function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((checkedOutCount, book) => {
    const borrowsLog = book.borrows;
    if (borrowsLog.some(log => !(log.returned))) checkedOutCount++;
    return checkedOutCount;
  }, 0)
}

//Helper array used in next two functions
const sortAndCutArrayObjects = (preSortedArray) => {
  const preSorted = preSortedArray.sort((countA, countB) => countA.count > countB.count ? -1 : 1);
  if (preSorted.length > 5) {
    const [first, second, third, fourth, fifth] = preSorted;
    return [first, second, third, fourth, fifth];
  } else return preSorted;
}

function getMostCommonGenres(books) {
  const preFormatGenres = books.reduce((genresArray, book) => {
    const currentBookGenre = book.genre;
    if (!(genresArray.some((genreObject) => genreObject.name === currentBookGenre))) {
      const addingGenreObject = {};
      addingGenreObject.name = currentBookGenre;
      addingGenreObject.count = 1;
      genresArray.push(addingGenreObject);
    } else {
      genresArray.forEach((genreObject) => {
        if (genreObject.name === currentBookGenre) genreObject.count++;
      })
    }
    return genresArray;
  }, [])

  return sortAndCutArrayObjects(preFormatGenres);
}

function getMostPopularBooks(books) {
    const preFormatBookCount = books.reduce((bookCountArray, book) => {
    const borrowsLog = book.borrows;
    borrowsLog.forEach(log => {
      const { title } = book;
      if (!(bookCountArray.some((bookCountObject) => bookCountObject.name === title))) {
        const addingBookObject = { name: title, count: 1 }
        bookCountArray.push(addingBookObject);
      } else {
        bookCountArray.forEach((bookCountObject) => {
          if (bookCountObject.name === title) bookCountObject.count++;
        })
      }
    });
    return bookCountArray;
  }, []);
  
    return sortAndCutArrayObjects(preFormatBookCount)
}

function getMostPopularAuthors(books, authors) {
  const nameAndCheckoutCounts = authors.map((author) => {
    //console.log(`Currently looking at author: ${author.name.first} ${author.name.last}... (ID: ${author.id})`)
    const writtenByBooks = books.filter(book => book.authorId === author.id); //array of books only written by this author
    //console.log(`Array of book objects written by current author: ${writtenByBooks}`);
    const authorTotalCheckouts = writtenByBooks.reduce((totalCheckouts, book) => { //total number of checkouts for this author
      //console.log(`Currently looking at book: ${book.title}...`);
      totalCheckouts += book.borrows.length
      //console.log(`Book has been checked out ${book.borrows.length} times... total is now ${totalCheckouts}`);
      return totalCheckouts;
    }, 0);
    //console.log(`Total number of checkouts for current author: ${authorTotalCheckouts}`);
    return { name: `${author.name.first} ${author.name.last}`, count: authorTotalCheckouts };
  })

  return sortAndCutArrayObjects(nameAndCheckoutCounts);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
