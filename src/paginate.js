import isPlainObject from 'lodash-es/isPlainObject.js'
import forOwn from 'lodash-es/forOwn.js'
import isEmpty from 'lodash-es/isEmpty.js'
import orderBy from 'lodash-es/orderBy.js'

function paginate (collection = [], { page = 1, limit = 25, sort } = {}) {
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
