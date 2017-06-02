'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/overkazaf/Desktop/codes/git/playGround/IntelliParser/src/javascript/components/IFComponents/IFComponentBase/index.js';


var is = _immutable2.default.is;

var IFComponentBase = function (_Component) {
	(0, _inherits3.default)(IFComponentBase, _Component);

	function IFComponentBase(props) {
		(0, _classCallCheck3.default)(this, IFComponentBase);

		var _this = (0, _possibleConstructorReturn3.default)(this, (IFComponentBase.__proto__ || (0, _getPrototypeOf2.default)(IFComponentBase)).call(this, props));

		_this.state = {
			option: props.option,
			eventMap: {}
		};
		return _this;
	}

	(0, _createClass3.default)(IFComponentBase, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._buildEventMap();
		}
	}, {
		key: '_buildEventMap',
		value: function _buildEventMap() {
			var eventList = this.props.option.eventList;

			var eventMap = {};
			eventList.map(function (evtObj) {
				var eventType = evtObj.eventType,
				    actionList = evtObj.actionList;

				eventMap[eventType] = actionList;
			});

			this.setState({
				eventMap: eventMap
			});
		}
	}, {
		key: 'getFieldValue',
		value: function getFieldValue(keyPath) {
			var basicProps = this.state.option.basicProps;

			var target = void 0;
			var pre = basicProps;
			keyPath.map(function (key) {
				target = pre[key];
				pre = target;
			});

			return target;
		}
	}, {
		key: 'setFieldValue',
		value: function setFieldValue(fields) {
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
			var option = this.state.option;

			var newOption = _.merge(option, {
				basicProps: (0, _extends3.default)({}, fields)
			});

			this.setState({
				option: newOption
			}, function () {
				callback();
			});
		}
	}, {
		key: 'getFieldsValue',
		value: function getFieldsValue(keyPathMap) {
			var _this2 = this;

			var valueObj = {};

			(0, _keys2.default)(keyPathMap).map(function (keyName) {
				var keyPath = keyPathMap[keyName];
				valueObj[keyName] = _this2.getFieldValue(keyPath);
			});

			return valueObj;
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			return this.getFieldValue(['inputValue', 'value', 'value']);
		}
	}, {
		key: 'setValue',
		value: function setValue(value, callback) {
			this.setFieldValue({
				inputValue: {
					value: {
						value: value
					}
				}
			}, callback);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			console.log('IFComponentBase received', nextProps);
			var newState = (0, _assign2.default)(this.state.option, nextProps.option);

			this.setState({
				option: newState
			}, console.log(this.state.option));
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return true;

			return !(this.props === nextProps || is(this.props, nextProps)) || !(this.state === nextState || is(this.state, nextState));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 122
				}
			}, _react2.default.createElement('h1', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 123
				}
			}, 'Warning'), _react2.default.createElement('p', { style: { color: 'red' }, __source: {
					fileName: _jsxFileName,
					lineNumber: 124
				}
			}, 'You need to override the IFComponentBase Class in your SubClass'));
		}
	}]);

	return IFComponentBase;
}(_react.Component);

exports.default = IFComponentBase;