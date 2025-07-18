const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helpers");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if (compareTime(data.departureTime, data.arrivalTime)) {
      throw new AppError(
        "Departure time must be earlier than arrival time",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log(error);

    throw new AppError(
      "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFliter = []
  //trips MUM - DEL
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    //Todo: add a check that they are not same
  }

  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(query.tripDate);

    if (!isValidDate) {
      throw new AppError(
        "Invalid tripDate format. Use YYYY-MM-DD",
        StatusCodes.BAD_REQUEST
      );
    }

    // Use JavaScript Date objects for correct comparison
    const startDate = new Date(`${query.tripDate}T00:00:00.000Z`);
    const endDate = new Date(`${query.tripDate}T23:59:59.999Z`);

    customFilter.departureTime = {
      [Op.between]: [startDate, endDate],
    };
  }

  if(query.sort) {
    const params =  query.sort.split(",")
    const sortFilters = params.map((param)=>param.split('_'))
    sortFliter  = sortFilters
  }

  console.log(customFilter);
  console.log(sortFliter);
  try {
    const flights = await flightRepository.getAllFlights(customFilter,sortFliter);
    return flights;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    
  }
}


async function getFlight (id) {
   try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
  try{
    const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats,data.dec);
    return response
  } catch(error){
    console.log(error)
      throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
