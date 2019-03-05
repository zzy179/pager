"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var MiniPagination =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MiniPagination, _React$Component);

  function MiniPagination(props) {
    var _this;

    _classCallCheck(this, MiniPagination);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MiniPagination).call(this, props));
    _this.state = {
      currentPage: 0
    };
    _this.onPreBtnClick = _this.onPreBtnClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNextBtnClick = _this.onNextBtnClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(MiniPagination, [{
    key: "onPreBtnClick",
    value: function onPreBtnClick() {
      var _this2 = this;

      this.setState(function (preState) {
        _this2.props.onPageChange(preState.currentPage - 1 + 1);

        return {
          currentPage: preState.currentPage - 1
        };
      });
    }
  }, {
    key: "onNextBtnClick",
    value: function onNextBtnClick() {
      var _this3 = this;

      this.setState(function (preState) {
        _this3.props.onPageChange(preState.currentPage + 1 + 1);

        return {
          currentPage: preState.currentPage + 1
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var currentPage = this.state.currentPage;
      var _this$props = this.props,
          pageCount = _this$props.pageCount,
          preLabel = _this$props.preLabel,
          nextLabel = _this$props.nextLabel,
          clsFix = _this$props.clsFix;
      return _react.default.createElement("div", {
        className: clsFix
      }, _react.default.createElement("a", {
        href: "javascript:void(0)",
        onClick: currentPage === 0 ? null : this.onPreBtnClick,
        title: "\u4E0A\u4E00\u9875",
        className: (0, _classnames.default)({
          disable: currentPage === 0
        }),
        name: preLabel
      }, preLabel), _react.default.createElement("span", null, currentPage + 1, "/", pageCount), _react.default.createElement("a", {
        href: "javascript:void(0)",
        onClick: currentPage === pageCount - 1 ? null : this.onNextBtnClick,
        title: "\u4E0B\u4E00\u9875",
        className: (0, _classnames.default)({
          disable: currentPage === pageCount - 1
        }),
        name: nextLabel
      }, nextLabel));
    }
  }]);

  return MiniPagination;
}(_react.default.Component);

function noop() {}

MiniPagination.defaultProps = {
  onPageChange: noop,
  preLabel: "上一页",
  nextLabel: "下一页",
  clsFix: "sw-minipagination"
};
MiniPagination.propTypes = {
  onPageChange: _propTypes.default.func,
  pageCount: _propTypes.default.number.isRequired,
  preLabel: _propTypes.default.string,
  nextLabel: _propTypes.default.string,
  clsFix: _propTypes.default.string
};
var _default = MiniPagination;
exports.default = _default;