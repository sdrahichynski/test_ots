'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {

	// класс, на случай если Input не один,
	// или придется в будущем делать с ним что-нибудь еще
	var SmartInput = function () {
		function SmartInput(el) {
			_classCallCheck(this, SmartInput);

			this.DOMElement = el;
			this.initialValue = el.value;

			this.bindEvents();
		}

		_createClass(SmartInput, [{
			key: 'checkValue',
			value: function checkValue() {
				// проверяет значения
				// сам ничего не делает, только запускает соотв. методы
				var value = this.DOMElement.value;

				if (value !== this.initialValue) {
					this.smthWrong();
				} else {
					this.allRight();
				}
			}
		}, {
			key: 'smthWrong',
			value: function smthWrong() {
				this.DOMElement.classList.add('red');
			}
		}, {
			key: 'allRight',
			value: function allRight() {
				this.DOMElement.classList.remove('red');
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {
				var _this = this;

				this.DOMElement.addEventListener('input', function () {
					_this.checkValue();
				}, 'false');
			}
		}]);

		return SmartInput;
	}();

	;

	var smartInputsDOMElements = document.querySelectorAll('.smart-input');
	var smartInputs = [];

	smartInputsDOMElements.forEach(function (el) {
		smartInputs.push(new SmartInput(el));
	});
})();;'use strict';

;(function () {

	var args = window.location.search.slice(1).split('&');
	var argsParsed = args.reduce(function (summ, current, index, array) {

		var arg = current.split('=');
		var key = decodeURIComponent(arg[0]);
		var value = decodeURIComponent(arg[1]).split(',');

		if (value.length === 1) value = value[0];
		summ[key] = value;

		return summ;
	}, {});

	console.log(argsParsed);
})();
//# sourceMappingURL=all.js.map
