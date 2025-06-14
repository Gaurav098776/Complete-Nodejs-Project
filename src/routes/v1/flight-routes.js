const express =  require('express')

const {FlightController} =  require('../../controllers');
const {FlightMiddlewares } = require('../../middlewares');

const router =  express.Router();



// /api/v1/flight  post
router.post('/',FlightMiddlewares.validateCreateRequest,FlightController.createFlight)
// /api/v1/flights?trips=MUM-DEL get     http://localhost:3000/api/v1/flights?trips=DEL-MUM
router.get('/',FlightController.getAllFlights)

//api/v1/flights/:id  GET
router.get('/:id',FlightController.getFlight)

//api/v1/flights/:id/seats  PATCH
router.patch('/:id/seats',FlightMiddlewares.validateUpdateSeatsRequest,FlightController.updateSeats)

module.exports = router;