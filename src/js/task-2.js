;(function(){

	// берет window.location.search и отдает объект с переданными параметрами
	function parseSearchString() {
		let args = window.location.search.slice(1).split('&');
		let argsParsed = args.reduce( (summ, current, index, array) => {

			let arg   = current.split('=');
			let key   = decodeURIComponent(arg[0]);
			let value = decodeURIComponent(arg[1]).split(',');

			if (value.length === 1) value = value[0];
			summ[key] = value;

			return summ;
		}, {});

		return argsParsed;
	}


	// 
	function formToSearchString(form, filter) {
		let resArray = []; // response Array

		if (!form || form.nodeName !== 'FORM') return;

		for (let i = 0, l = form.elements.length; i < l; i++) {
			let name = form.elements[i].name;
			let type;

			if (name === '' || filter.indexOf(name) !== -1) continue;

				type = form.querySelector(`[name="${name}"]`).type;
				filter.push(name);

				switch (type) {

					case 'radio':
					case 'checkbox':
					case 'select-multiple': {
						let selector;
						let checkedPropName;
						let inputGroup;
						let values = [];

						if (type === 'select-multiple') {
							selector = `[name="${name}"] option`;
							checkedPropName = 'selected';
						} else {
							selector = `[name="${name}"]`;
							checkedPropName = 'checked';
						}

						inputGroup = form.querySelectorAll(selector);

						for (let i = 0, l = inputGroup.length; i < l; i++) {
							let currentElement = inputGroup[i];

							if (currentElement[checkedPropName]) {
								values.push(currentElement.value);
							}
						}

						name = encodeURIComponent(name);
						values = values.map(encodeURIComponent);

						resArray.push(`${name}=${values.join(',')}`);

						break;
					}

					default: {
						resArray.push(`${name}=${form.elements[i].value}`);
					}
				}
		}

		return resArray.join('&');

	}

	// заполняет форму полями объекта 'values'
	function fillTheForm(form, values) {
		// form - form DOM element
		// values -  { key: value, ... }

		for (let key in values) {
			setValue(form, key, values[key])
		}

	}


	// заполняет поле 'key' формы значением 'value'
	function setValue(form, key, value){
		let type = form.querySelector(`[name="${key}"]`).type;

		switch (type) {

			// checkbox and multiple select
			case 'checkbox':
			case 'select-multiple': {
				let selector;
				let checkedPropName;
				let inputGroup;

				if (type === 'checkbox') {
					selector = `[name="${key}"]`;
					checkedPropName = 'checked';
				} else {
					selector = `[name="${key}"] option`;
					checkedPropName = 'selected';
				}

				inputGroup = form.querySelectorAll(selector);

				if (Object.prototype.toString.call(value) === '[object String]') {
					value = [value];
					// сейчас value - всегда массив
				}

				for (let i = 0, l = inputGroup.length; i < l; i++) {
					let currentElement = inputGroup[i];
					let currentElementValue = currentElement.value;
					let checked = value.indexOf(currentElementValue) !== -1;

					currentElement[checkedPropName] = checked;
				}

				break;
			}

			// text, password, email, textarea, radio
			default:
				form.elements[key].value = value;
		}
	}




	let args = parseSearchString();
	let form = document.querySelector('.query-params');

	fillTheForm(form, args);



	form.addEventListener('change', function() {
		console.log(`${window.location.href.split('?')[0]}?${formToSearchString(this, ['on-sale'])}`);
	}, false);

	form.querySelector('[name="on-sale"]').addEventListener('change', function(e) {
			e.stopPropagation();
			return false;
	}, false);

}());