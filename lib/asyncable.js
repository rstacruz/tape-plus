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

  return assign(test, tape)
}

module.exports = asyncable
