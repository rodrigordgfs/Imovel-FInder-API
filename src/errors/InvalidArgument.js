"use strict";

class InvalidArgument extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgument";
    this.id = 3;
  }
}

module.exports = InvalidArgument;
