import { BottleRouter } from '../bottle.js'
import * as consts from './const.js'

const router1 = new BottleRouter()
const router2 = new BottleRouter()

for (let key in consts.allRoutes) {
  router1.addRoute(consts.allRoutes[key], consts.dummy)
}

for (let key in consts.allManyRoutes) {
  router2.addRoute(consts.allManyRoutes[key], consts.dummy)
}

export {
  router1 as bottleRouter1,
  router2 as bottleRouter2,
}
