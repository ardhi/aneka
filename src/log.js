import { sprintf } from 'sprintf-js'

function format (fn, ...items) {
  const date = (new Date()).toISOString()
  const label = typeof items[0] === 'string' ? items[0] : undefined
  if (label) {
    items.shift()
    return fn(sprintf(`[${date}] ${label}`, ...items))
  }
  return fn(...items)
}

export function log (...items) {
  return format(console.log, ...items)
}

export function logError (...items) {
  return format(console.error, ...items)
}
