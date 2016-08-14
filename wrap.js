var group = require('./lib/group')
var asyncable = require('./lib/asyncable')

/*
 * Wraps a tape function.
 */

function wrap (tape) {
  return group(asyncable(tape))
}

module.exports = wrap
