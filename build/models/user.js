"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Schema
var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true //email을 통해 이전 가입자인지 체크 

  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "enum": ["MainJuin", "SubJuin", "User"],
    "default": "User"
  },
  register_date: {
    type: String,
    "default": (0, _moment["default"])().format("YYYY-MM-DD hh:mm:ss") //Date.now,  //mongo db는 utc 기준이므로 한국은 9시가 빠르게 됨

  },
  comments: [//한 사람이 여러개의 post와 comment를 할 수 있음. 1:N 관계
  {
    post_id: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "post"
    },
    comment_id: {
      //post 하나를 지울 떄 관련된 comments도 지우는 것. 이건 잘 이해 안됨. 
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "comments"
    }
  }],
  posts: [// 1:N 구조. 
  {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "posts"
  }]
});

var User = _mongoose["default"].model("user", UserSchema); // 위에 작성한 걸 user라 정의함


var _default = User; //User 모델을 모듈화하여 내보내는 것. 

exports["default"] = _default;