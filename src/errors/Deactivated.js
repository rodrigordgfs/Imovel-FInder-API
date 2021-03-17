"use strict";

class Deactivated extends Error {
  constructor(data) {
    super(`${data} desativado(a).`);
    this.name = "Deactivated";
    this.id = 2;
  }
}

module.exports = Deactivated;
