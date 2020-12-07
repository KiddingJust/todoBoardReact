"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Schema
var PostSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    index: true // 제목 검색 가능하도록

  },
  contents: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    "default": -2 //처음 작성 당시에도 조회수 기록되기 때문

  },
  fileUrl: {
    type: String,
    "default": "https://source.unsplash.com/random/301x201" //빈 화면 막으려고...

  },
  category: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "category" //1개의 post는 1개의 카테고리 갖도록 하여 배열이 아님 

  },
  date: {
    type: String,
    ref: (0, _moment["default"])().format("YYYY-MM-DD hh:mm:ss") //Date.now,  //mongo db는 utc 기준이므로 한국은 9시가 빠르게 됨

  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "comment"
  }],
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "user" //앞의 user.js를 참조하는 것. 

  }
});

var Post = _mongoose["default"].model("post", PostSchema); // 위에 작성한 걸 user라 정의함


var _default = Post; //Post 모델을 모듈화하여 내보내는 것. 

exports["default"] = _default;