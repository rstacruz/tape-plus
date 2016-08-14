/*
 * Decorates a tape-like function with Promise capabilities.
 */

function asyncable (tape) {
  function test (name, fn) {
    return tape(name, function (t) {
      invokeTest(fn, t, function () { /* after... */ })
    })
  }

  return test
}

/*
 * Invokes a test (like `fn(t)`), but handles some magic:
 *
 * - Promise return values
 * - `function (t, end)` syntax (async tests)
 * - Automatic invocation of `t.end()`
 *
 * Invokes the callback `next` when it's done.
 */

function invokeTest (fn, t, next) {
  var result

  // Invoke the test
  try {
    if (fn.length > 1) {
      result = fn(t, t.end)
    } else {
      result = fn(t)
    }
  } catch (err) {
    t.end(err)
    return next()
  }

  if (result && typeof result.then === 'function') {
    // If promise
    result
      .then(function () { t.end() })
      .catch(function (err) { t.end(err) })
      .then(function () { next() })
  } else if (fn.length > 1) {
    // If async
    return next()
  } else {
    // If sync
    t.end()
    return next()
  }
}

module.exports = asyncable
