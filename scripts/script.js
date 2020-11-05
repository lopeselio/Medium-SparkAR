const Animation = require('Animation')
const Scene = require('Scene')
// const TouchGestures = require('TouchGestures')

const sceneRoot = Scene.root

Promise.all([
  sceneRoot.findFirst('out'),
  sceneRoot.findFirst('helice_2'),
  sceneRoot.findFirst('planeTracker0')
])
  .then(function (objects) {
    const base = objects[0]
    const rotor = objects[1]
    // const planeTracker = objects[2]

    const baseDriverParameters = {
      durationMilliseconds: 100,
      loopCount: Infinity,
      mirror: false
    }
    const bodyDriverParameters = {
      durationMilliseconds: 4000,
      loopCount: Infinity,
      mirror: true
    }

    const baseDriver = Animation.timeDriver(baseDriverParameters)
    const bodyDriver = Animation.timeDriver(bodyDriverParameters)

    var pi = Math.PI
    const baseSampler = Animation.samplers.linear(0, 2 * pi)
    const bodySampler = Animation.samplers.linear(-pi / 6, pi / 6)
    // const sampler = Animation.samplers.linear(-50, 50)
    // base.hidden = true
    base.transform.rotationZ = Animation.animate(bodyDriver, bodySampler)
    rotor.transform.rotationZ = Animation.animate(baseDriver, baseSampler)
    // base.transform.transitionX = Animation.animate(bodyDriver, sampler)
    baseDriver.start()
    bodyDriver.start()
  })
