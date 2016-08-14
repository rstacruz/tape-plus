var addBeforeEach = require('./add_before_each')
var addAfterEach = require('./add_after_each')

/*
 * Decorates a tape-like function with grouping capabilities.
 *
 * Returns a tape-like function `test`, with the addition of a `test.group`
 * method.
 */

function group (tape, name) {
  function test (subname, fn) {
    if (name) {
      return tape('' + name + ': ' + subname, fn)
    } else {
      return tape(subname, fn)
    }
  }

  test.describe =
  test.group = function (name, fn) {
    var subtest = group(test, name)
    return fn(subtest)
  }

  test.beforeEach = function (fn) {
    tape = addBeforeEach(tape, fn)
  }

  test.afterEach = function (fn) {
    tape = addAfterEach(tape, fn)
  }

  return test
}

module.exports = group

