const client = require("./client");

module.exports = {
  client,
  ...require("./user"),
  ...require("./business"),
  ...require("./reviews"),
};
