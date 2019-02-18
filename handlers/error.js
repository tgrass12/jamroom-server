function errorHandler(error, request, response, next) {
  console.log('in err handler');
  console.log(error)
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Something went wrong."
    }
  });
}

module.exports = errorHandler;