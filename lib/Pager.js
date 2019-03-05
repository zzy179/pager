"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

require("./style/index.scss");

var Pager =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Pager, _React$Component);

  function Pager(props) {
    var _this;

    _classCallCheck(this, Pager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pager).call(this, props));
    _this.state = {
      currentPage: _this.props.initialPage - 1,
      jumpPage: "",
      scrollTop: 0
    };
    _this.onNextBtnClick = _this.onNextBtnClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPreBtnClick = _this.onPreBtnClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onJumpClick = _this.onJumpClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onJumpInputChange = _this.onJumpInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._onPageChange = _this._onPageChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Pager, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps) {
      if (this.props.anchor !== preProps.anchor) {
        this.setScrollTop();
      }
    }
  }, {
    key: "setScrollTop",
    value: function setScrollTop() {
      var anchorDom = null;
      var top = 0;
      var anchor = this.props.anchor;

      var anchorType = _typeof(anchor);

      if (anchorType === "object") {
        anchorDom = anchor;
      } else if (anchorType === "string") {
        anchorDom = document.querySelector(anchor);
      } else if (anchorType === "number") {
        top = anchor;
      }

      if (anchorDom !== null) {
        top = anchorDom.getBoundingClientRect().top + window.scrollY;
      }

      this.setState({
        scrollTop: top
      });
    }
  }, {
    key: "_onPageChange",
    value: function _onPageChange(page) {
      var onPageChange = this.props.onPageChange;
      onPageChange(page);
      window.scrollTo(0, this.state.scrollTop);
    }
  }, {
    key: "_renderPagers",
    value: function _renderPagers() {
      var _this2 = this;

      var _this$props = this.props,
          pageCount = _this$props.pageCount,
          pageRange = _this$props.pageRange;
      var currentPage = this.state.currentPage;
      var pages = []; //如果显示的页数大于总页数，则显示全部页码，无需显示...

      if (pageRange >= pageCount) {
        var _loop = function _loop(i) {
          pages.push(_react.default.createElement("li", {
            key: i,
            className: (0, _classnames.default)({
              active: _this2.state.currentPage === i
            }),
            title: "\u7B2C".concat(i + 1, "\u9875"),
            onClick: function onClick() {
              return _this2.onPageBtnClick(i);
            }
          }, _react.default.createElement("a", null, i + 1)));
        };

        for (var i = 0; i < pageCount; i++) {
          _loop(i);
        }
      } else {
        var _start = 0;
        var _end = pageRange;
        var page; //超过一个range  后 左侧显示...

        if (currentPage + 1 >= pageRange) {
          pages.unshift(_react.default.createElement("li", {
            onClick: function onClick() {
              return _this2.onPageBtnClick(0);
            },
            key: "\u7B2C\u4E00\u9875"
          }, "1"), _react.default.createElement("li", {
            className: "deactive",
            key: "\u5411\u524D\u66F4\u591A"
          }, "..."));
          var isLast = currentPage + 3 > pageCount;
          _start = isLast ? pageCount - 5 : currentPage - 2;
          _end = isLast ? pageCount : currentPage + 3;
        }

        var _loop2 = function _loop2(i) {
          page = i + 1;
          pages.push(_react.default.createElement("li", {
            key: page,
            className: (0, _classnames.default)({
              active: _this2.state.currentPage === i
            }),
            title: "\u7B2C".concat(page, "\u9875"),
            onClick: function onClick() {
              return _this2.onPageBtnClick(i);
            }
          }, _react.default.createElement("a", null, i + 1)));
        };

        for (var i = _start; i < _end; i++) {
          _loop2(i);
        }

        if (currentPage + 2 < pageCount) {
          pages.push(_react.default.createElement("li", {
            className: "deactive",
            key: "\u5411\u540E\u66F4\u591A"
          }, "..."), _react.default.createElement("li", {
            onClick: function onClick() {
              return _this2.onPageBtnClick(pageCount - 1);
            },
            key: "\u6700\u540E\u4E00\u9875"
          }, pageCount));
        }
      }

      return pages;
    }
  }, {
    key: "onPageBtnClick",
    value: function onPageBtnClick(page) {
      this.setState({
        currentPage: page
      });

      this._onPageChange(page + 1);
    }
  }, {
    key: "onPreBtnClick",
    value: function onPreBtnClick() {
      var _this3 = this;

      this.setState(function (preState) {
        _this3._onPageChange(preState.currentPage - 1 + 1);

        return {
          currentPage: preState.currentPage - 1
        };
      });
    }
  }, {
    key: "onNextBtnClick",
    value: function onNextBtnClick() {
      var _this4 = this;

      this.setState(function (preState) {
        _this4._onPageChange(preState.currentPage + 1 + 1);

        return {
          currentPage: preState.currentPage + 1
        };
      });
    }
  }, {
    key: "onJumpClick",
    value: function onJumpClick() {
      this.setState({
        currentPage: this.state.jumpPage - 1
      });

      this._onPageChange(this.state.jumpPage);
    }
  }, {
    key: "onJumpInputChange",
    value: function onJumpInputChange(e) {
      var pageCount = this.props.pageCount;
      var value = +e.target.value;
      if (isNaN(Number(value))) return;

      if (value <= 0) {
        value = 1;
      }

      if (value > pageCount) {
        value = pageCount;
      }

      this.setState({
        jumpPage: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var currentPage = this.state.currentPage;
      var _this$props2 = this.props,
          pageCount = _this$props2.pageCount,
          preLabel = _this$props2.preLabel,
          nextLabel = _this$props2.nextLabel,
          clsFix = _this$props2.clsFix,
          showJump = _this$props2.showJump,
          autoHide = _this$props2.autoHide;

      if (pageCount <= 1 && autoHide) {
        return null;
      }

      return _react.default.createElement("div", {
        className: clsFix
      }, _react.default.createElement("ul", null, _react.default.createElement("li", {
        onClick: currentPage === 0 ? null : this.onPreBtnClick,
        className: (0, _classnames.default)({
          disable: currentPage === 0
        })
      }, _react.default.createElement("a", {
        title: "\u4E0A\u4E00\u9875"
      }, preLabel)), this._renderPagers(), _react.default.createElement("li", {
        onClick: currentPage === pageCount - 1 ? null : this.onNextBtnClick,
        className: (0, _classnames.default)({
          disable: currentPage === pageCount - 1
        })
      }, _react.default.createElement("a", {
        title: "\u4E0B\u4E00\u9875"
      }, nextLabel))), showJump ? _react.default.createElement("div", {
        className: "inputbox"
      }, "\u5230\u7B2C", _react.default.createElement("input", {
        type: "text",
        value: this.state.jumpPage,
        onChange: this.onJumpInputChange
      }), "\u9875", _react.default.createElement("button", {
        className: "goto",
        onClick: this.onJumpClick
      }, "\u786E\u5B9A")) : null);
    }
  }]);

  return Pager;
}(_react.default.Component);

var _default = Pager;
exports.default = _default;

function noop() {}

Pager.defaultProps = {
  initialPage: 1,
  onPageChange: noop,
  preLabel: "上一页",
  nextLabel: "下一页",
  clsFix: "sw-Pager",
  showJump: true,
  pageRange: 5,
  autoHide: false
};
Pager.propTypes = {
  onPageChange: _propTypes.default.func,
  pageCount: _propTypes.default.number.isRequired,
  pageRange: _propTypes.default.number,
  preLabel: _propTypes.default.string,
  nextLabel: _propTypes.default.string,
  clsFix: _propTypes.default.string,
  showJump: _propTypes.default.bool,
  autoHide: _propTypes.default.bool,
  anchor: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.instanceOf(Element)])
};