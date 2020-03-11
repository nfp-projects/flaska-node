import assert from 'assert'
import Benchmark from 'benchmarkjs-pretty'
import { koaRouter1, koaRouter2 } from './router_koa.js'
import { bottleRouter1, bottleRouter2 } from './router_bottle.js'
import { expressRouter1, expressRouter2 } from './router_express.js'
import * as consts from './const.js'

let assertOk = true
let testData = null

consts.overrideDummy(function() { testData = assertOk })

function TestSmallStaticRoute() {
  return new Benchmark.default('Small router static route benchmark: /api/staff (16 routes registered)')
    .add('expressjs', function() {
      testData = null
      expressRouter1.handle({
        url: '/api/staff',
        method: 'GET',
      }, {}, function() { })
      assert.ok(testData)
    })
    .add('koa-router', function() {
      testData = koaRouter1.match('/api/staff', 'GET')
      assert.ok(testData.route)
    })
    .add('bottle-router', function() {
      testData = bottleRouter1.match('/api/staff')
      assert.ok(testData.handler)
    })
    .run()
    .then(function() {}, function(e) {
      console.error('error:', e)
      process.exit(1)
    })
}

function TestSmallParamRoute() {
  return new Benchmark.default('Small router param route benchmark: /api/staff/:id (16 routes registered)')
    .add('expressjs', function() {
      testData = null
      expressRouter1.handle({
        url: '/api/staff/justatest',
        method: 'GET',
      }, {}, function() { })
      assert.ok(testData)
    })
    .add('koa-router', function() {
      testData = koaRouter1.match('/api/staff/justatest', 'GET')
      assert.ok(testData.route)
    })
    .add('bottle-router', function() {
      testData = bottleRouter1.match('/api/staff/justatest')
      assert.ok(testData.handler)
    })
    .run()
    .then(function() {}, function(e) {
      console.error('error:', e)
      process.exit(1)
    })
}

function TestLargeStaticRoute() {
  return new Benchmark.default('Large router static route benchmark: /api/staff (58 routes registered)')
    .add('expressjs', function() {
      testData = null
      expressRouter2.handle({
        url: '/api/staff',
        method: 'GET',
      }, {}, function() { })
      assert.ok(testData)
    })
    .add('koa-router', function() {
      testData = koaRouter2.match('/api/staff', 'GET')
      assert.ok(testData.route)
    })
    .add('bottle-router', function() {
      testData = bottleRouter2.match('/api/staff')
      assert.ok(testData.handler)
    })
    .run()
    .then(function() {}, function(e) {
      console.error('error:', e)
      process.exit(1)
    })
}

function TestLargeParamRoute() {
  return new Benchmark.default('Large router param route benchmark: /api/staff/:id (58 routes registered)')
    .add('expressjs', function() {
      testData = null
      expressRouter2.handle({
        url: '/api/staff/justatest',
        method: 'GET',
      }, {}, function() { })
      assert.ok(testData)
    })
    .add('koa-router', function() {
      testData = koaRouter2.match('/api/staff/justatest', 'GET')
      assert.ok(testData.route)
    })
    .add('bottle-router', function() {
      testData = bottleRouter2.match('/api/staff/justatest')
      assert.ok(testData.handler)
    })
    .run()
    .then(function() {}, function(e) {
      console.error('error:', e)
      process.exit(1)
    })
}

TestSmallStaticRoute()
  .then(function() {
    return TestSmallParamRoute()
  })
  .then(function() {
    return TestLargeStaticRoute()
  })
  .then(function() {
    return TestLargeParamRoute()
  })
  .then(function() {
    process.exit(0)
  })
