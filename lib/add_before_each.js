var assign = require('object-assign')

/*
 * Decorates a tape-like function with a beforeEach hook.
 */

function addBeforeEach (tape, beforeFn) {
  function test (subname, fn) {
    tape(subname, function (t) {
      function newEnd (err) {
        if (!err) {
          return fn(t)
        } else {
          t.end(err)
        }
      }

      var beforeT = assign({}, t, { end: newEnd })
      try {
        beforeFn(beforeT)
      } catch (err) {
        t.end(err)
      }
    })
  }

  assign(test, tape)
  return test
}

module.exports = addBeforeEach
