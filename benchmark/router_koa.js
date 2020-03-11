import koaRouter from 'koa-router'
import * as consts from './const.js'

const router1 = new koaRouter()
const router2 = new koaRouter()

for (let key in consts.allRoutes) {
  router1.get(consts.allRoutes[key], consts.dummy)
}

for (let key in consts.allManyRoutes) {
  router2.get(consts.allManyRoutes[key], consts.dummy)
}

export {
  router1 as koaRouter1,
  router2 as koaRouter2,
}
