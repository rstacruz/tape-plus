var assign = require('object-assign')
var invokeTest = require('./invoke_test')

/*
 * Decorates a tape-like function with a beforeEach hook.
 */

function addBeforeEach (tape, beforeFn) {
  function test (subname, fn) {
    tape(subname, function (t, next) {
      invokeTest(beforeFn, t, function (err) {
        if (err) return next(err)
        invokeTest(fn, t, next)
      })
    })
  }

  assign(test, tape)
  return test
}

module.exports = addBeforeEach
