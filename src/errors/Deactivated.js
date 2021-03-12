"use strict";

class Deactivated extends Error {
  constructor(data) {
    super(`${data} desativado(a).`);
    this.name = "Deactivated";
    this.id = 3;
  }
}

module.exports = Deactivated;
