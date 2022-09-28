const ClientError = require('./client-error');
const UsernameError = require('./username-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else if (err instanceof UsernameError) {
    res.status(err.status).json({
      error: err.message
    });
    console.error(err);
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
}
module.exports = errorMiddleware;
