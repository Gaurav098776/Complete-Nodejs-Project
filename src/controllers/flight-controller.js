const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");



/**
 * POST : /flights
 * req.body {flightNumber:'UK',airplaneId:'a380',departureAirportId:'DEL',arrivalAirportId:'MUM',arrivalTime:11:10:0,departureTime:'9:10:0',price:2000,boardingGate:12a,totalSeats:120}
 * 
 */
async function createFlight(req, res) { 
  try {
    // console.log("inside controller routes",req.body);
    const flight = await FlightService.createFlight({
          flightNumber: req.body.flightNumber,
          airplaneId: req.body.airplaneId,
          departureAirportId: req.body.departureAirportId,
          arrivalAirportId: req.body.arrivalAirportId,
          arrivalTime: req.body.arrivalTime,
          departureTime: req.body.departureTime,
          price: req.body.price,
          boardingGate: req.body.boardingGate,
          totalSeats: req.body.totalSeats,
    });
    
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}


async function getAllFlights(req, res) {
  console.log('req.query',req.query);
  try{
    const flights =  await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  }catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * POST : /flight/:id
 * req.body {}
 * 
 */

async function getFlight(req, res){
  try{
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}







module.exports = {
  createFlight,
  getAllFlights,
  getFlight
  
};
