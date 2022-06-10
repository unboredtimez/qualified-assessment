function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = []
  const available = []
  for (let i = 0; i < books.length; i++) {
    const [returnStatus] = books[i].borrows
    returnStatus.returned ? checkedOut.push(books[i]) : available.push(books[i])
  }
  const result = []
  result.push(available, checkedOut)
  return result 
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map(borrow => {
    let result = accounts.find(account => account.id === borrow.id)
    return { ...borrow, ...result}
  }).slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
