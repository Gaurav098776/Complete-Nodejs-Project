const express =  require('express')

const {AirplaneController} =  require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router =  express.Router();



// /api/v1/airplanes  post
router.post('/',AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane)

// /api/v1/airplanes  get
router.get('/', AirplaneController.getAirplanes)
// /api/v1/airplanes/:id  get

router.get('/:id', AirplaneController.getAirplane)

// /api/v1/airplanes/:id  delete
router.delete('/:id', AirplaneController.destroyAirplane)

// /api/v1/airplanes/:id  patch
router.patch('/:id',  AirplaneController.updateAirplane)

module.exports = router;