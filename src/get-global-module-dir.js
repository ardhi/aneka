import path from 'path'
import resolvePath from './resolve-path.js'

/**
 * Get the node global module directory.
 *
 * @returns {string} Absolute path to the global module directory
 */
function getGlobalModuleDir () {
  const execDir = path.dirname(process.execPath)
  if (process.platform === 'win32') {
    const appDataPath = process.env.APPDATA
      ? path.join(process.env.APPDATA, 'npm', 'node_modules')
      : null
    return resolvePath(appDataPath || path.join(execDir, 'node_modules'))
  }
  return resolvePath(path.join(execDir, '..', 'lib', 'node_modules'))
}

export default getGlobalModuleDir
