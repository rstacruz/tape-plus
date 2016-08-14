var assign = require('object-assign')
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
    return tape(join(name, subname), fn)
  }

  // Inherit from tape
  assign(test, tape)

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

  test.only = function (subname, fn) {
    return tape.only(join(name, subname), fn)
  }

  test.skip = function (subname, fn) {
    return tape.skip(join(name, subname), fn)
  }

  return test
}

function join (parent, child) {
  if (parent) return '' + parent + ': ' + child
  return child
}

module.exports = group

