class AlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = "AlreadyExists";
    this.id = 1;
  }
}

module.exports = AlreadyExists;
