"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT_SECRET = _index["default"].JWT_SECRET;

var auth = function auth(req, res, next) {
  //토큰 값은 헤더에 저장되어 있음
  var token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      mst: "토큰 없음. 인증 거부!"
    });
  }

  try {
    //토큰 해석
    var decoded = _jsonwebtoken["default"].verify(token, JWT_SECRET);

    req.user = decoded; //req.user와 같으면 다음으로 넘어감

    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg: "토큰이 유효하지 않습니다."
    });
  }
};

var _default = auth;
exports["default"] = _default;