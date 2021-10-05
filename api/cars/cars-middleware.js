const Car = require('./cars-model');
const yup = require('yup');
const vinVaidator = require('vin-validator');


const carSchema = yup.object().shape({
  vin: yup.string()
        .required('vin is missing'),
  make: yup.string()
        .required('make is missing'),
  model: yup.string()
          .required('model is missing'),
  mileage: yup.number()
          .required('mileage is missing')
})

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

const checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const validated = await carSchema.validate(
        req.body, { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    next({status: 400, message: err.message })
  }

}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if(vinVaidator.validate(req.body.vin)){
    next()
  } else {
    next({status: 400, message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await Car.getByVin(req.body.vin)
    if(!existing) {
      next()
    } else {
      next({status: 400, message: `vin ${req.body.vin} already exists`})
    }

  } catch (err) {
    next(err)
  }
}


const errorHandling = (err, req, res, next) => {
  res.status( err.status || 500).json({
    message: err.message
  })
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  errorHandling
}