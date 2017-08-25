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

	// берет window.location.search и отдает объект с переданными параметрами
	function parseSearchString() {
		var args = window.location.search.slice(1).split('&');
		var argsParsed = args.reduce(function (summ, current, index, array) {

			var arg = current.split('=');
			var key = decodeURIComponent(arg[0]);
			var value = decodeURIComponent(arg[1]).split(',');

			if (value.length === 1) value = value[0];
			summ[key] = value;

			return summ;
		}, {});

		return argsParsed;
	}

	// 
	function formToSearchString(form, filter) {
		var resArray = []; // response Array

		if (!form || form.nodeName !== 'FORM') return;

		for (var i = 0, l = form.elements.length; i < l; i++) {
			var name = form.elements[i].name;
			var type = void 0;

			if (name === '' || filter.indexOf(name) !== -1) continue;

			type = form.querySelector('[name="' + name + '"]').type;
			filter.push(name);

			switch (type) {

				case 'radio':
				case 'checkbox':
				case 'select-multiple':
					{
						var selector = void 0;
						var checkedPropName = void 0;
						var inputGroup = void 0;
						var values = [];

						if (type === 'select-multiple') {
							selector = '[name="' + name + '"] option';
							checkedPropName = 'selected';
						} else {
							selector = '[name="' + name + '"]';
							checkedPropName = 'checked';
						}

						inputGroup = form.querySelectorAll(selector);

						for (var _i = 0, _l = inputGroup.length; _i < _l; _i++) {
							var currentElement = inputGroup[_i];

							if (currentElement[checkedPropName]) {
								values.push(currentElement.value);
							}
						}

						name = encodeURIComponent(name);
						values = values.map(encodeURIComponent);

						resArray.push(name + '=' + values.join(','));

						break;
					}

				default:
					{
						resArray.push(name + '=' + form.elements[i].value);
					}
			}
		}

		return resArray.join('&');
	}

	// заполняет форму полями объекта 'values'
	function fillTheForm(form, values) {
		// form - form DOM element
		// values -  { key: value, ... }

		for (var key in values) {
			setValue(form, key, values[key]);
		}
	}

	// заполняет поле 'key' формы значением 'value'
	function setValue(form, key, value) {
		var type = form.querySelector('[name="' + key + '"]').type;

		switch (type) {

			// checkbox and multiple select
			case 'checkbox':
			case 'select-multiple':
				{
					var selector = void 0;
					var checkedPropName = void 0;
					var inputGroup = void 0;

					if (type === 'checkbox') {
						selector = '[name="' + key + '"]';
						checkedPropName = 'checked';
					} else {
						selector = '[name="' + key + '"] option';
						checkedPropName = 'selected';
					}

					inputGroup = form.querySelectorAll(selector);

					if (Object.prototype.toString.call(value) === '[object String]') {
						value = [value];
						// сейчас value - всегда массив
					}

					for (var i = 0, l = inputGroup.length; i < l; i++) {
						var currentElement = inputGroup[i];
						var currentElementValue = currentElement.value;
						var checked = value.indexOf(currentElementValue) !== -1;

						currentElement[checkedPropName] = checked;
					}

					break;
				}

			// text, password, email, textarea, radio
			default:
				form.elements[key].value = value;
		}
	}

	var args = parseSearchString();
	var form = document.querySelector('.query-params');

	fillTheForm(form, args);

	form.addEventListener('change', function () {
		console.log(window.location.href.split('?')[0] + '?' + formToSearchString(this, ['on-sale']));
	}, false);

	form.querySelector('[name="on-sale"]').addEventListener('change', function (e) {
		e.stopPropagation();
		return false;
	}, false);
})();;"use strict";
//# sourceMappingURL=all.js.map
