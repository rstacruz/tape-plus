var tape = require('tape')
var test = require('../wrap')(tape)
var describe = test.describe

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

describe('beforeEach', function (it) {
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

describe('beforeEach async', function (it) {
  var n = 0

  it.beforeEach(function (t, next) {
    setTimeout(function () {
      n++
      next()
    })
  })

  it('one', function (t) {
    t.equal(n, 1)
  })

  it('two', function (t) {
    t.equal(n, 2)
  })
})

describe('beforeEach promise', function (it) {
  var n = 0

  it.beforeEach(function (t) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        n++
        resolve()
      })
    })
  })

  it('one', function (t) {
    t.equal(n, 1)
  })

  it('two', function (t) {
    t.equal(n, 2)
  })
})

describe('beforeEach async', function (it) {
  var n = 0

  it.beforeEach(function (t) {
    n++
  })

  it('one', function (t, end) {
    t.equal(n, 1)
    end()
  })
})

describe('afterEach', function (it) {
  var n = 0

  it.afterEach(function (t) {
    n++
  })

  it('zero', function (t) {
    t.equal(n, 0)
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

describe('beforeEach and afterEach', function (it) {
  var n = 0

  it.beforeEach(function (t) {
    n++
  })

  it.afterEach(function (t) {
    n--
  })

  it('one', function (t) {
    t.equal(n, 1)
  })

  it('also one', function (t) {
    t.equal(n, 1)
  })

  it('now two', function (t) {
    n++
    t.equal(n, 2)
  })

  it('still two', function (t) {
    t.equal(n, 2)
  })
})

describe('skip', function (it) {
  it.skip('sup', function (t) {
    t.equal(1, 2)
  })
})
