class RegistrationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "RegistrationError";
  }
}

module.exports = RegistrationError;