"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Schema
var CommentSchema = new _mongoose["default"].Schema({
  contents: {
    type: String,
    required: true
  },
  date: {
    type: String,
    "default": (0, _moment["default"])().format("YYYY-MM-DD hh:mm:ss") //Date.now,  //mongo db는 utc 기준이므로 한국은 9시가 빠르게 됨

  },
  posts: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "post"
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "user"
  }
});

var Comment = _mongoose["default"].model("omment", CommentSchema); // 위에 작성한 걸 user라 정의함


var _default = Comment; //Post 모델을 모듈화하여 내보내는 것. 

exports["default"] = _default;