var assign = require('object-assign')
var invokeTest = require('./invoke_test')

/*
 * Decorates a tape-like function with Promise capabilities.
 */

function asyncable (tape) {
  function test (name, fn) {
    return invoke(tape, name, fn)
  }

  assign(test, tape)

  test.only = function (name, fn) {
    return invoke(tape.only, name, fn)
  }

  test.skip = function (name, fn) {
    return invoke(tape.skip, name, fn)
  }

  return test
}

function invoke (tape, name, fn) {
  tape(name, function (t) {
    invokeTest(fn, t, function (err) {
      t.end(err)
    })
  })
}


module.exports = asyncable
