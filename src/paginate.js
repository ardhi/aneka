import isPlainObject from 'lodash-es/isPlainObject.js'
import forOwn from 'lodash-es/forOwn.js'
import isEmpty from 'lodash-es/isEmpty.js'
import orderBy from 'lodash-es/orderBy.js'

/**
 * Paginates and optionally sorts a collection.
 *
 * @param {Array<Object>} [collection=[]] Source collection.
 * @param {Object} [options={}] Pagination options.
 * @param {number} [options.page=1] 1-based page number.
 * @param {number} [options.limit=25] Items per page.
 * @param {Object<string, number>} [options.sort] Sort descriptor where value < 0 means descending.
 * @returns {Object} Paginated result.
 * @returns {Array<Object>} return.data Sliced page data.
 * @returns {number} return.page Current page number.
 * @returns {number} return.limit Page size.
 * @returns {number} return.count Total items in source collection.
 * @returns {number} return.pages Total page count.
 */
function paginate (collection = [], options = {}) {
  const { page = 1, limit = 25, sort } = options
  const count = collection.length
  const offset = (page - 1) * limit
  const fields = []
  const dirs = []
  if (isPlainObject(sort)) {
    forOwn(sort, (v, k) => {
      fields.push(k)
      dirs.push(v < 0 ? 'desc' : 'asc')
    })
  }
  if (!isEmpty(fields)) collection = orderBy(collection, fields, dirs)
  const data = collection.slice(offset, offset + limit)

  return {
    data,
    page,
    limit,
    count,
    pages: Math.ceil(collection.length / limit)
  }
}

export default paginate
