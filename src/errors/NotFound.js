class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.id = 0;
  }
}

module.exports = NotFound;
