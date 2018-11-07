"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.WaterMarkConsumer = exports.WaterMarkProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _React$createContext = _react.default.createContext(""),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;

exports.Consumer = Consumer;

var shallowCompare = function shallowCompare(newObj, prevObj) {
  for (var key in newObj) {
    if (newObj[key] !== prevObj[key]) return true;
  }

  return false;
};

var propTypes = {
  text: _propTypes.default.string.isRequired,
  options: _propTypes.default.any
};

var WaterMarkProvider =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WaterMarkProvider, _React$PureComponent);

  function WaterMarkProvider(_props) {
    var _this;

    _classCallCheck(this, WaterMarkProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WaterMarkProvider).call(this, _props));

    _this.drawerWatermark = function (props) {
      var canvas = document.createElement("canvas");
      var defaultOptions = {
        rotate: 30,
        color: "rgba(0, 0, 0, 0.1)",
        width: 200,
        height: 120,
        fontSize: 12,
        fontAjust: 1.2,
        offsetX: 0,
        offsetY: 0
      };
      var text = props.text,
          _props$options = props.options,
          options = _props$options === void 0 ? defaultOptions : _props$options;
      var _options$rotate = options.rotate,
          rotate = _options$rotate === void 0 ? defaultOptions.rotate : _options$rotate,
          _options$color = options.color,
          color = _options$color === void 0 ? defaultOptions.color : _options$color,
          _options$width = options.width,
          width = _options$width === void 0 ? defaultOptions.width : _options$width,
          _options$height = options.height,
          height = _options$height === void 0 ? defaultOptions.height : _options$height,
          _options$fontSize = options.fontSize,
          fontSize = _options$fontSize === void 0 ? defaultOptions.fontSize : _options$fontSize,
          _options$fontAjust = options.fontAjust,
          fontAjust = _options$fontAjust === void 0 ? defaultOptions.fontAjust : _options$fontAjust,
          _options$offsetX = options.offsetX,
          offsetX = _options$offsetX === void 0 ? defaultOptions.offsetX : _options$offsetX,
          _options$offsetY = options.offsetY,
          offsetY = _options$offsetY === void 0 ? defaultOptions.offsetY : _options$offsetY;
      var ctx = canvas.getContext("2d");
      var textLength = text.length * fontSize * fontAjust;
      var rotatePI = Number(rotate) / 180 * Math.PI;
      var calcWidth = parseInt(textLength * Math.cos(rotatePI)) + offsetX;
      var calcHeight = parseInt(textLength * Math.sin(rotatePI)) + offsetY;
      var textAlign = {
        x: 0,
        y: calcHeight
      };
      canvas.width = calcWidth;
      canvas.height = calcHeight;

      if (!canvas.getContext) {
        //你的浏览器不支持canvas!
        return;
      }

      ctx.font = "".concat(fontSize, "px serif");
      ctx.rotate(-"".concat(rotate) * Math.PI / 180); // 逆时针方向

      ctx.fillStyle = color;
      ctx.fillText("".concat(text), textAlign.x, textAlign.y);
      var url = ctx.canvas.toDataURL();

      _this.setState({
        url: url
      });
    };

    _this.state = {
      url: ""
    };
    return _this;
  }

  _createClass(WaterMarkProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawerWatermark(this.props);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.text !== this.props.text || shallowCompare(nextProps.options, this.props.options)) {
        this.drawerWatermark(nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(Provider, {
        value: this.state.url
      }, this.props.children);
    }
  }]);

  return WaterMarkProvider;
}(_react.default.PureComponent);

exports.WaterMarkProvider = WaterMarkProvider;
WaterMarkProvider.propTypes = propTypes;

var WaterMarkConsumer = function WaterMarkConsumer(props) {
  return _react.default.createElement(Consumer, null, function (url) {
    return _react.default.cloneElement(props.children, _objectSpread({}, props, {
      style: Object.assign({}, props.style, {
        backgroundImage: "url(".concat(url, ")"),
        backgroundRepeat: "repeat"
      })
    }));
  });
};

exports.WaterMarkConsumer = WaterMarkConsumer;