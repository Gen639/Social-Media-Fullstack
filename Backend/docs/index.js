const components = require("./components");
const basicInfo = require("./basicInfo");
const users = require("./users");
module.exports = {
  ...basicInfo,
  ...components,
  ...users,
};
