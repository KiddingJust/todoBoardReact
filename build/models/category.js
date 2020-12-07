"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Schema
var CategorySchema = new _mongoose["default"].Schema({
  categoryName: {
    type: String,
    "default": "미분류"
  },
  posts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "post"
  }]
});

var Category = _mongoose["default"].model("category", CategorySchema); // 위에 작성한 걸 user라 정의함


var _default = Category; //Post 모델을 모듈화하여 내보내는 것. 

exports["default"] = _default;