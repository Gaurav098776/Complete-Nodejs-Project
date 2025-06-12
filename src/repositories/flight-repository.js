const CrudRepository = require('./crud-repositories');
const { Flight } = require('../models/index');

class FlightRepository extends CrudRepository {
  constructor(){
    super(Flight)  // super() calls the constructor of the parent class
  }
  
  async getAllFlights(filter, sort){
     const response = await Flight.findAll({
      where: filter,
      order : sort
     });
      return response;
  }
  
}

module.exports = FlightRepository;