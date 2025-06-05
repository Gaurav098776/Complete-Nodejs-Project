const CrudRepository = require('./crud-repositories');
const { City } = require('../models/index');

class CityRepository extends CrudRepository {
  constructor(){
    super(City)  // super() calls the constructor of the parent class
  }

  
}

module.exports = CityRepository;