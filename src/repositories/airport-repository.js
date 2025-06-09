const CrudRepository = require('./crud-repositories');
const { Airport } = require('../models/index');

class AirportRepository extends CrudRepository {
  constructor(){
    super(Airport)  // super() calls the constructor of the parent class
  }

  
}

module.exports = AirportRepository;