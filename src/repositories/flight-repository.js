const CrudRepository = require('./crud-repositories');
const { Flight ,Airplane,Airport} = require('../models/index');
const { Sequelize } = require('sequelize');

class FlightRepository extends CrudRepository {
  constructor(){
    super(Flight)  // super() calls the constructor of the parent class
  }
  
  async getAllFlights(filter, sort){
     const response = await Flight.findAll({
      where: filter,
      order : sort,
      include :[
     {
        model : Airplane,
        as: 'airplaneDetail',
        required : true
      },
      {
        model : Airport,
        required : true,
        as: 'departureAirport',
        on : {
          col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'),"=",Sequelize.col('departureAirport.code'))
        }
      },
      {
        model : Airport,
        required : true,
        as: 'arrivalAirport',
        on : {
          col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),"=",Sequelize.col('arrivalAirport.code'))
        }
      }

    ]
     });
      return response;
  }
  
}

module.exports = FlightRepository;