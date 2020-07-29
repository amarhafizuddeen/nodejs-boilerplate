/**
|--------------------------------------------------
| Handle errors thrown by routes
|--------------------------------------------------
*/

module.exports = (error, req, res, next) => {
  if (error instanceof ControllerError) {
    return res.status(error.statusCode).send(error.message)
  }

  if (error instanceof DatabaseError) {
    console.log(error)
    const { type } = error.errors[0]
    if (type === 'unique violation') {
      return res.status(error.statusCode).send(`The ${error.errors[0].path} is not available`)
    }

    if (type === 'notNull Violation') {
      const errors = error.errors.map((e) => e.path)
      return res.status(error.statusCode).send(`Missing ${errors.join(', ')}`)
    }
  }

  console.log(error)
  if (['development', 'local'].includes(process.env.ENV)) {
    res.status(500).send(error.stack)
  } else {
    res.sendStatus(500)
  }
}
