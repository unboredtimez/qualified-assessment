function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  //Refactored code to avoid using FOR Loop
  let result = books.reduce((total, book) => {
  const {borrows} = book
  if (borrows[0].returned === false) {total++} 
  return total
  }, 0)
  return result
  
  //Below is previous code using FOR Loop
  /*
  const checkedOut = []
  for (let i = 0; i < books.length; i++) {
    const [returnStatus] = books[i].borrows
    if (returnStatus.returned === false) {
      checkedOut.push(books[i])
    } 
  }
  return checkedOut.length
  */
}


function getMostCommonGenres(books) {
  const result = books.reduce((total, book) => {
    const {genre} = book
    if (!total[genre]) total[genre] = {name: genre, count: 1}
    else total[genre].count++
    return total
  }, {})
  return Object.values(result).sort(sortByPopularity).slice(0,5)
}



function getMostPopularBooks(books) {
  const result = books.reduce((total, book) => {
    const {borrows} = book
    if (!total[borrows]) total[borrows] = {name: book.title, count: borrows.length}
    return total
  }, {})
  return Object.values(result).sort(sortByPopularity).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  const result = books.reduce((total, book) => {
    const {borrows} = book
    const {
      name: {first, last}
    } = authors.find((name) => book.authorId === name.id)

    if (!total[borrows]) total[borrows] = {name: `${first} ${last}`, count: borrows.length}
    return total
  }, {})
  return Object.values(result).sort(sortByPopularity).slice(0,5)
}

//Helper Function to help sort
function sortByPopularity(firstItem, secondItem) {
  return secondItem.count - firstItem.count
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
