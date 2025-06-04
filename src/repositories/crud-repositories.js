const { logger } = require('../config');

class CrudRepository{
  constructor(model){
    this.model =  model;
  }

  async create(data){
      // console.log(data)
      const response = await this.model.create(data);
      console.log("response",response)
      return response;
  
  }

  async destroy(data){
    
      const response = await this.model.destroy({
        where:{
          id: data
        }
      });
      return response;
   
  }


  async get(data){
    
        const response = await this.model.findByPK(data);
        return response;
  
  }

  async getAll(data){
    
      const response = await this.model.findAll(data);
      return response;
    
  }

  async update(id, data){   /* data -> {col:val , ....} */
   
      const response = await this.model.update(data,{
        where: {
          id: id
        }
      });
      return response;
   
  }
}

module.exports =  CrudRepository;

//  all query related stuff write in a respository