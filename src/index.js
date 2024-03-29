module.exports = {
  // collection
  arrange: require('./collection/arrange'),
  breakArray: require('./collection/break'),
  bulkRemove: require('./collection/bulk-remove'),
  bulkUpsert: require('./collection/bulk-upsert'),
  divideArray: require('./collection/divide'),
  findDuplicate: require('./collection/find-duplicate'),
  paginate: require('./collection/paginate'),
  removeFromArray: require('./collection/remove'),
  uniqByProp: require('./collection/uniq-by-prop'),
  upsert: require('./collection/upsert'),
  // format
  pascalCase: require('./format/pascal-case'),
  humanJoin: require('./format/human-join'),
  // fs
  pathResolve: require('./fs/path-resolve'),
  // loader
  getGlobalModuleDir: require('./loader/get-global-module-dir'),
  getModuleDir: require('./loader/get-module-dir'),
  getModuleDirDeep: require('./loader/get-module-dir-deep'),
  requireDeep: require('./loader/require-deep'),
  requireBase: require('./loader/require-base'),
  requireBaseDeep: require('./loader/require-base-deep'),
  requireGlobal: require('./loader/require-global'),
  // misc
  delay: require('./misc/delay'),
  fatal: require('./misc/fatal'),
  fetchUrl: require('./misc/fetch-url'),
  isSet: require('./misc/is-set'),
  print: require('./misc/print'),
  parseBool: require('./misc/parse-bool'),
  dump: require('./misc/dump'),
  setImmediatePromise: require('./misc/set-immediate-promise'),
  // object
  sanitizeObject: require('./object/sanitize')
}