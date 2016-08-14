# tape-sane

> Nested tape tests with before/after, async, and promise support

tape-sane is a wrapper for [tape][] for a batteries-included experience for writing elegant tape tests. It supports:

[tape]: https://npmjs.com/package/tape

## Nested tests

Use `test.group` to define test groups.

```js
var group = require('tape-sane').group

group('add()', test => {
  test('adding', t => {
    t.equal(add(1, 1), 2)
  })

  test('subtracting', t => {
    t.equal(add(10, -1), 9)
  })
})
```

## Before/after hooks

Use `test.beforeEach` and `test.afterEach` to add hooks.

```js
group('add()', test => {
  var base

  test.beforeEach(t => {
    base = 10
  })

  test.afterEach(t => {
  })

  test('adds numbers', t => {
    t.equal(add(base, 1), 11)
  })

  test('subtracts numbers', t => {
    t.equal(add(base, -1), 9)
  })
})
```

## Asynchronous tests

Pass a second parameter to `test()` and it'll be a callback, Mocha-style.

```js
group('add()', test => {
  var base

  test('async callback', (t, next) => {
    setTimeout(() => {
      t.equal(1, 1)
      next()
    })
  })
})
```

## Promises

Return a promise from inside a `test()` block. Rejected promises will be an error.

```js
test('async callback', t => {
  return fetch('http://site.com')
  .then(data => {
    t.equal(data, '<html></html>')
  })
})
```


## BDD interface

`test.describe` is an alias for `test.group`.

<details>
<summary>Example</summary>


```js
var describe = require('tape-sane').describe

describe('add()', it => {
  it('adds numbers', t => {
    t.equal(add(1, 1), 2)
  })

  it('subtracts numbers', t => {
    t.equal(add(10, -1), 9)
  })
})
```
</details>

