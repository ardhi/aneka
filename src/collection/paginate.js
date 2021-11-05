module.exports = function (coll, page = 1, rowsPerPage = 25) {
  const total = coll.length
  const offset = (page - 1) * rowsPerPage
  const rows = coll.slice(offset, offset + rowsPerPage)

  return {
    rows,
    page,
    rowsPerPage,
    total,
    totalPages: Math.ceil(coll.length / rowsPerPage)
  }
}
