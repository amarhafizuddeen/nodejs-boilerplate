/**
|--------------------------------------------------
| Handle errors thrown by routes
|--------------------------------------------------
*/

module.exports = (error, req, res, next) => {
  if (error instanceof ControllerError) {
    return res.status(error.statusCode).send(error.message)
  }

  console.log(error)
  if (['development', 'local'].includes(process.env.ENV)) {
    res.status(500).send(error.stack)
  } else {
    res.sendStatus(500)
  }
}
