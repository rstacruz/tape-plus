var assign = require('object-assign')
var invokeTest = require('./invoke_test')

/*
 * Decorates a tape-like function with a afterEach hook.
 *
 * At this point, `tape` is assumed to have been `asyncable()`'d.
 */

function addAfterEach (tape, afterFn) {
  function test (subname, fn) {
    tape(subname, function (t, next) {
      invokeTest(fn, t, function (err) {
        if (err) return next(err)
        invokeTest(afterFn, t, next)
      })
    })
  }

  return assign(test, tape)
}

module.exports = addAfterEach
