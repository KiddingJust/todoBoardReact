"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _post = _interopRequireDefault(require("../../models/post"));

var _auth = _interopRequireDefault(require("../../middleware/auth"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router(); // api/post. res는 서버에서 브라우저 쪽으로 응답하는 것. 


router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var postFindResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _post["default"].find();

          case 2:
            postFindResult = _context.sent;
            console.log(postFindResult, "All Post Get");
            res.json(postFindResult);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/', _auth["default"], /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body, title, contents, fileUrl, creator, newPost;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(req, "req");
            _req$body = req.body, title = _req$body.title, contents = _req$body.contents, fileUrl = _req$body.fileUrl, creator = _req$body.creator; // 실제로는 req.body.title, req.body.contents 등으로 분해해 넣을 것.
            //들어온 내용으로 해당 필드들을 채워주라는 것. 

            _context2.next = 5;
            return _post["default"].create({
              title: title,
              contents: contents,
              fileUrl: fileUrl,
              creator: creator
            });

          case 5:
            newPost = _context2.sent;
            res.json(newPost);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); //router를 모듈화해서 빼주는 것. 
//default 로 빼내면, 한개만 내보낼 수 있음. -> 다른 곳에서 이름을 자유롭게  지을 수 있음.
//export const name =  ~ 으로 하면 이름이 정해짐 

var _default = router;
exports["default"] = _default;