// source: https://flaviocopes.com/how-to-divide-collay-js/

module.exports = function (coll, itemCount) {
  return new Array(Math.ceil(coll.length / itemCount))
    .fill()
    .map(_ => coll.splice(0, itemCount))
}
