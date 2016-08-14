var assign = require('object-assign')

/*
 * Decorates a tape-like function with an afterEach hook.
 */

function addAfterEach (tape, afterFn) {
  function test (subname, fn) {
    tape(subname, function (t) {
      function newEnd (err) {
        if (!err) {
          return afterFn(t)
        } else {
          t.end(err)
        }
      }

      var testT = assign({}, t, { end: newEnd })
      try {
        fn(testT)
      } catch (err) {
        t.end(err)
      }
    })
  }

  assign(test, tape)
  return test
}

module.exports = addAfterEach
