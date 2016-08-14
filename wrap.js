/*
 * Wraps a tape function.
 */

function wrap (tape) {
  return group(promiseish(tape))
}

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

  return test
}

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

      var beforeT = Object.assign({}, t, { end: newEnd })
      try {
        beforeFn(beforeT)
      } catch (err) {
        t.end(err)
      }
    })
  }

  Object.assign(test, tape)
  return test
}

/*
 * Decorates a tape-like function with Promise capabilities.
 */

function promiseish (tape) {
  function test (name, fn) {
    return tape(name, function (t) {
      invokeTest(fn, t, function () {
        // after...
      })
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

module.exports = wrap
