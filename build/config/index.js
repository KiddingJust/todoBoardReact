"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var _default = {
  MONGO_URI: "mongodb+srv://gaiga:ahffkd18!!@cluster0.fpras.mongodb.net/todoboard?retryWrites=true&w=majority",
  JWT_SECRET: "gaiga",
  PORT: "7000"
};
exports["default"] = _default;