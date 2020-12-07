"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _hpp = _interopRequireDefault(require("hpp"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _post = _interopRequireDefault(require("./routes/api/post"));

var _user = _interopRequireDefault(require("./routes/api/user"));

var _auth = _interopRequireDefault(require("./routes/api/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Routes
var app = (0, _express["default"])();
var MONGO_URI = _config["default"].MONGO_URI;
var prod = process.env.NODE_ENV === "production"; //서버의 보안 부분을 보완해주는 라이브러리

app.use((0, _hpp["default"])());
app.use((0, _helmet["default"])()); //cors 모두 허용

app.use((0, _cors["default"])({
  origin: true,
  credentials: true
})); //개발 시 로그 보는 것. 

app.use((0, _morgan["default"])("dev"));
/*
http 메서드에는 get, post 등이 있는데, 서버에서 requestBody에 내용 담겨서 오는데
이 body에 있는 걸 서버에서 해석하기 위해서는 미들웨어 필요
이전에는 body parser 추가로 설치했는데, 지금은 express에 내장되어있음. 
*/

app.use(_express["default"].json());

_mongoose["default"].connect(MONGO_URI, {
  useNewUrlParse: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  return console.log("MongoDB connecting success!");
})["catch"](function (e) {
  return console.log(e);
}); // Use routers


app.get("/"); //신호 들어온 걸 모두 받아들이게

app.use('/api/post', _post["default"]);
app.use('/api/user', _user["default"]);
app.use('/api/auth', _auth["default"]);

if (prod) {
  app.use(_express["default"]["static"](_path["default"].join(__dirname, "../client/build")));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, "../client/build", "index.html"));
  });
}

var _default = app; //모듈화 시켜서 다른 곳에서 파일 불러올 수 있게끔 하는 부분

exports["default"] = _default;