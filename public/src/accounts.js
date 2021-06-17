function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id == id)
 return found;
}

function sortAccountsByLastName(accounts) {
 let sorted = accounts.sort((a,b) => a.name.last > b.name.last ? 1 : -1)
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  let accumulator = 0;
  return books.reduce((acc, aBook) => {
    let borrowed = 0;
    acc += aBook.borrows.reduce((borrowed, borrowing) => 
    borrowed += borrowing.id === account.id ? 1 : 0, borrowed);
    return acc;
  }, accumulator);
}

 function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = []; 
  books.forEach(aBook=>aBook.borrows.find(unit=> (unit.id === account.id && !unit.returned) ? checkedOut.push(aBook) : -1 ))
  checkedOut.forEach(bBook=>{
    let anAuthor = authors.find(being => being.id === bBook.authorId);
    bBook.author = anAuthor;
  })
  
  return checkedOut;
 }
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
