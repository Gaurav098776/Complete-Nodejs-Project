const express =  require('express')

const {FlightController} =  require('../../controllers');
const {FlightMiddlewares } = require('../../middlewares');

const router =  express.Router();



// /api/v1/flight  post
router.post('/',FlightMiddlewares.validateCreateRequest,FlightController.createFlight)
// /api/v1/flights?trips=MUM-DEL get     http://localhost:3000/api/v1/flights?trips=DEL-MUM
router.get('/',FlightController.getAllFlights)


module.exports = router;