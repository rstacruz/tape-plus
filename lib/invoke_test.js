var assign = require('object-assign')

/*
 * Invokes a test (like `fn(t)`), but handles some magic:
 *
 * - Promise return values
 * - `function (t, end)` syntax (async tests)
 * - Suppress `t.end()`
 *
 * Invokes the callback `next` when it's done. It assumes that `fn` never uses
 * `t.end()`.
 */

function invokeTest (fn, t, next) {
  var result
  var ended

  // No need for t.end! Let's replace it.
  t = assign({}, t, { end: function () {
    throw new Error('t.end() called; tape-plus does not support t.end()')
  } })

  // Abstract the `t.end()` call so that it can't be called twice.
  function callEnd (err) {
    if (!ended) {
      ended = true
      next(err)
    } else if (err) {
      // Unhandled error after an error
      throw err
    }
  }

  // Invoke the test and save the result.
  // If it fails, terminate prematurely.
  try {
    if (fn.length > 1) {
      fn(t, function end (err) { callEnd(err) })
      return
    } else {
      result = fn(t)
    }
  } catch (err) {
    callEnd(err)
    return
  }

  if (result && typeof result.then === 'function') {
    // If promise
    result
      .then(function () { callEnd() })
      .catch(function (err) { callEnd(err) })
  } else {
    // If sync
    callEnd()
    return
  }
}

module.exports = invokeTest
