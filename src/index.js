const express =  require('express')

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes')

const app =  express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT,async ()=> {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  // bad code alert
  const  {City,Airport} =  require('./models')
  // const city  = await City.findByPk(1)
  // console.log(city)
  // const city =  await City.findByPk(4)
  // await city.createAirport({name:'Indore airport',code:'IND'})
  await City.destroy({where:{id:4}})
})
