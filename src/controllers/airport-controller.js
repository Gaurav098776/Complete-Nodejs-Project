const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");



/**
 * POST : /airports
 * req.body {name: 'IGI' , cityId: 1 ,  code: DEl, address: 'Delhi Airport' }
 * 
 */
async function createAirport(req, res) {
  console.log('city id', req.body.cityId);
  
  try {
    // console.log("inside controller routes",req.body);
    const airport = await AirportService.createAirport({
     name: req.body.name,
     code: req.body.code,
     address: req.body.address,
     cityId: req.body.cityId,
    });
    
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * POST : /airports
 * req.body {}
 * 
 */

//get api = controoller
async function getAirports(req, res){
  try{
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

///  airplane/:id

async function getAirport(req, res){
  try{
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}


async function destroyAirport(req, res){
  try{
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res){
  try{
    const airport =  await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
