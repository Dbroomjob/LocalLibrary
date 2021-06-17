function getTotalBooksCount(books) {
return books.length;
}

function getTotalAccountsCount(accounts) {
return accounts.length;  
}

function getBooksBorrowedCount(books) {
  let num = 0;
  books.forEach((aBook) => !aBook.borrows[0].returned ? num++ : -1)
  return num;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((aBook) => aBook.genre);
  const commonGenres = [];
  
  bookGenres.map((aGenre) => {
    const genreSpot = commonGenres.findIndex((comp) => comp.name === aGenre);
    (genreSpot >= 0) 
    ? commonGenres[genreSpot].count = commonGenres[genreSpot].count + 1 
    : commonGenres.push({ name: aGenre, count: 1 });  
  });
  commonGenres.sort((a, b) => b.count - a.count);
  if (commonGenres.length > 5) {
    while (commonGenres.length > 5) {
      commonGenres.pop()
    }
    return commonGenres;
  }
  return commonGenres;
  }

function getMostPopularBooks(books) {
  function createBook(title ,num){
    return { name: title, count: num  }
  }
  function deleteBook(books, num){
    while (books.length > num){
      books.pop()
    }
    return books
  } 
  const popBooks = [];
  books.forEach((aBook) => { 
    popBooks.push(createBook(aBook.title, aBook.borrows.length))
  });
  popBooks.sort((a,b) => (a.count > b.count ? -1 : 1))
  deleteBook(popBooks, 5);
  return popBooks;
}

function getMostPopularAuthors(books, authors) {
 
  function createBeing(being ,num){
    return { name: being, count: num  }
  }
  function deleteBeing(being, num){
    while (being.length > num){
      being.pop()
    }
    return being
  } 
  const popAuthors = [];
  books.forEach((aBook) => {
    let authorName = findBeingWithId(authors, aBook.authorId).name;
    const num = aBook.borrows.length;
    let spot = false;
    popAuthors.forEach((being) => {
      if(being.name === authorName) {
        being.count += num;
        spot = true;
        return;
      }
    });

    if(!spot) {
      popAuthors.push(
        createBeing(authorName.first + " " + authorName.last, num));
    }
  });
  popAuthors.sort((authorA, authorB) => 
  (authorA.count > authorB.count ? -1 : 1));
deleteBeing(popAuthors, 5);

return popAuthors;
}

//Helper Function 
function findBeingWithId(authors, id) {
  let found = authors.find((being) => being.id == id)
 return found;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
