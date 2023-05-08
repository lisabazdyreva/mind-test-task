class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message, additionalText = "") {
    if (additionalText.length) {
      return new ApiError(
        404,
        `Already have a ${additionalText} in products. Create unique name.`
      );
    }
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
