# tape-sane

> Nested API for tape

tape-sane is a wrapper for [tape][] for a batteries-included experience for writing elegant tape tests. It supports:

- Nested tests
- Promise tests
- Before/after hooks
- Improved async API

[tape]: https://npmjs.com/package/tape

## Nesting

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

## BDD interface

`test.describe` is an alias for `test.group`.

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

## Before/after hooks

```js
var group = require('tape-sane').group

group('add()', test => {
  test.beforeEach(t => {
  })

  test.afterEach(t => {
  })

  test('adds numbers', t => {
    t.equal(add(1, 1), 2)
  })

  test('subtracts numbers', t => {
    t.equal(add(10, -1), 9)
  })
})
```
