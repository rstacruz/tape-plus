var assign = require('object-assign')
var invokeTest = require('./invoke_test')
var Promise = require('any-promise')

/*
 * Decorates a tape-like function with Promise capabilities.
 *
 * A test will then return a promise.
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
  return new Promise (function (resolve, reject) {
    tape(name, function (t) {
      invokeTest(fn, t, function (err) {
        if (err) {
          t.end(err)
          return reject(err)
        } else {
          t.end()
          resolve()
        }
      })
    })
  })
}


module.exports = asyncable
