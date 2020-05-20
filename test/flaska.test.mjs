import { Eltro as t, assert } from 'eltro'
import { FlaskaRouter } from '../flaska.mjs'

t.describe('FlaskaRouter', function() {
  t.describe('#match()', function() {
    t.test('should match basic paths', function() {
      let assertMatched = false
      let router = new FlaskaRouter()
      router.addRoute('/test', function() { assertMatched = true })
      let result = router.match('/test')
      assert.ok(result.handler)
      result.handler()
      assert.strictEqual(assertMatched, true)
    })
    
    t.test('should match variable paths', function() {
      const assertParameter = 'bla'
      let assertMatched = false
      let router = new FlaskaRouter()
      router.addRoute('/test/:id', function() { assertMatched = true })
      let result = router.match('/test/' + assertParameter)
      assert.ok(result.handler)
      result.handler()
      assert.strictEqual(assertMatched, true)
      assert.strictEqual(result.params.get('id'), assertParameter)
    })

    t.test('should match paths properly', function() {
      let assertMatched = true
      let router = new FlaskaRouter()
      router.addRoute('/test/:id', function() { assertMatched = false })
      router.addRoute('/test/:id/test1', function() { })
      let result = router.match('/test/asdf/test1')
      assert.ok(result.handler)
      result.handler()
      assert.strictEqual(assertMatched, true)
      assert.strictEqual(result.params.get('id'), 'asdf')
    })

    t.test('should return null when no match is found', function() {
      let router = new FlaskaRouter()
      router.addRoute('/test/:id', function() { })
      router.addRoute('/test/:id/test1', function() { })
      let result = router.match('/test/asdf/test2')
      assert.notOk(result)
    })
  })
})
