const upsert = require('./upsert')

module.exports = function (recs, source, key = 'id', tsCol, insert) {
  for (let i = 0; i < recs.length; i++) {
    source = upsert(recs[i], source, key, tsCol, insert)
  }
  return source
}
