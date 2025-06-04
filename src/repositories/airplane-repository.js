const CrudRepository = require('./crud-repositories');
const { Airplane } = require('../models/index');

class AirplaneRepository extends CrudRepository {
  constructor(){
    super(Airplane)  // super() calls the constructor of the parent class
  }

  
}

module.exports = AirplaneRepository;