"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LoginHandler;

var _loginModel = _interopRequireDefault(require("../../../models/loginModel"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookie = require("cookie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LoginHandler(req, res) {
  var _req$body, user, password, isSession, model, isUserValid, NODE_ENV, token, serialized;

  return regeneratorRuntime.async(function LoginHandler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.method === "POST")) {
            _context.next = 16;
            break;
          }

          _req$body = req.body, user = _req$body.user, password = _req$body.password, isSession = _req$body.isSession;
          model = new _loginModel["default"]();
          _context.next = 5;
          return regeneratorRuntime.awrap(model.validateUser(user, password));

        case 5:
          isUserValid = _context.sent;

          if (isUserValid) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(401).json("El usuario o la contraseña son incorrectos"));

        case 8:
          NODE_ENV = process.env.NODE_ENV | "development";

          _dotenv["default"].config({
            path: ".env.".concat(NODE_ENV)
          });

          token = _jsonwebtoken["default"].sign({
            exp: isSession ? Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 : Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
            user: user,
            password: password
          }, process.env.JWT_SECRET);
          serialized = (0, _cookie.serialize)("tokenAuthSesion", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: isSession ? 1000 * 60 * 60 * 24 * 30 : 0,
            path: "/"
          });
          res.setHeader("Set-Cookie", serialized);
          res.status(200).json("Acceso con éxito");
          _context.next = 17;
          break;

        case 16:
          res.status(403);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}