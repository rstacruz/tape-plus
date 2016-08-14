var tape = require('tape')
var describe = require('./wrap')(tape).group

describe('nesting', function (it) {
  it('1 level', function (t) {
    t.equal(1, 1)
  })

  it.describe('2 levels', function (it) {
    it('go', function (t) {
      t.equal(1, 1)
    })
  })
})

describe('promise', function (it) {
  it('resolve', function (t) {
    return Promise.resolve(true)
  })

  it('async', function (t, end) {
    t.equal(1, 1)
    end()
  })
})

describe('before and after', function (it) {
  var n = 0

  it.beforeEach(function (t) {
    n++
  })

  it('one', function (t) {
    t.equal(n, 1)
  })

  it('two', function (t) {
    t.equal(n, 2)
  })

  it.describe('nested', function (it) {
    it('three', function (t) {
      t.equal(n, 3)
    })
  })

  it('four', function (t) {
    t.equal(n, 4)
  })
})
