"use strict";

var _app = _interopRequireDefault(require("./app"));

var _index = _interopRequireDefault(require("./config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = _index["default"].PORT;

_app["default"].listen(PORT, function () {
  //7000번으로 들어오면
  console.log("Server started on Port ".concat(PORT)); //₩₩을 통해 텍스트와 변수 섞어서 문자 만듦.
});