import { FlaskaRouter } from '../flaska.mjs'
import * as consts from './const.js'

const router1 = new FlaskaRouter()
const router2 = new FlaskaRouter()

for (let key in consts.allRoutes) {
  router1.addRoute(consts.allRoutes[key], consts.dummy)
}

for (let key in consts.allManyRoutes) {
  router2.addRoute(consts.allManyRoutes[key], consts.dummy)
}

export {
  router1 as flaskaRouter1,
  router2 as flaskaRouter2,
}
