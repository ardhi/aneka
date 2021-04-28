const upsert = require('./upsert')

module.exports = function (items, collection, key = 'id', tsCol, insert) {
  for (let i = 0; i < items.length; i++) {
    upsert(items[i], collection, key, tsCol, insert)
  }
}
