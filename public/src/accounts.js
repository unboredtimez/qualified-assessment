function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lowerCaseA = accountA.name.last.toLowerCase()
    const lowerCaseB = accountB.name.last.toLowerCase()
    return lowerCaseA > lowerCaseB ? 1 : -1
  })
}

function getTotalNumberOfBorrows(account, books) {
  //Refactored code, previously I was using FOR Loops to accomplish the same
  const result = books.reduce((total, book) => {
    const {borrows} = book
    const borrowed = borrows.filter((borrow) => account.id === borrow.id).length
    return total + borrowed
  }, 0)
  return result
  
  //Below is my previous FOR loop code with same results

  /*
  const allIds = []
  for (let i = 0; i < books.length; i++) {
    for (let x = 0; x < books[i].borrows.length; x++) {
      allIds.push(books[i].borrows[x].id)
    }
  }

  return allIds.filter((collectedIds) => collectedIds === account.id).length
  */
}

function getBooksPossessedByAccount(account, books, authors) { 
  const result = books.reduce((total, book) => {
    const {borrows} = book
    const checkedOut = borrows.filter((borrow) => account.id === borrow.id && !borrow.returned)
    if (checkedOut.length > 0) {
      const author = authors.find((author) => book.authorId === author.id)
      total.push({...book, author, borrows: checkedOut})
    }
    return total
  }, [])
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
