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
router.delete('/:id', AirplaneController.destroyAirplane)

module.exports = router;