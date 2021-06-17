function findAuthorById(authors, id) {
  let found = authors.find((being) => being.id == id)
 return found;
}

function findBookById(books, id) {
  let found = books.find((aBook) => aBook.id == id)
 return found;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((aBook) => aBook.borrows[0].returned === false);
  const notBorrowed = books.filter((aBook) => aBook.borrows[0].returned === true); 
  const allBooks = [borrowed, notBorrowed];
  return allBooks;
}

function getBorrowersForBook(book, accounts) { 
  const borrowed = book.borrows;
  function _strCheck(a, b) {   
    return (a<b?-1:(a>b?1:0));  
  };
  const borrowers = borrowed.map(({ id, returned })=> {
    const account = accounts.find(anAccount => anAccount.id === id);    
    return {
      ...account,
      returned,
    };
  });
  let completed = borrowers.sort((beingA, beingB) => {
      const a = beingA.company;
      const b = beingB.company;
      return _strCheck(a, b);
    });
  while(completed.length > 10){
    completed.pop();
  }
  return completed;  
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
