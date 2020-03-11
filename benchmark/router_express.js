import express from 'express'
import * as consts from './const.js'

const router1 = new express.Router()
const router2 = new express.Router()

for (let key in consts.allRoutes) {
  router1.get(consts.allRoutes[key], consts.dummy)
}

for (let key in consts.allManyRoutes) {
  router2.get(consts.allManyRoutes[key], consts.dummy)
}

export {
  router1 as expressRouter1,
  router2 as expressRouter2,
}
