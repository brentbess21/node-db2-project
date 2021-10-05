const Car = require('./cars-model');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const possibleCar = await Car.getById(req.params.id)
    if(!possibleCar) {
      next({status: 404, message: `car with id ${req.params.id} is not found`})
    } else {
      req.car = possibleCar
      next()
    }

  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}