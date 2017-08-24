;(function(){

	function parseArgs() {
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


	function fillTheForm(form, values) {
		// form- DOM object
		// values -  { key: value, ... }
		for (let key in values) {
			
			form.elements[key].value = values[key];

		}

		// console.log(form.elements['size'].value = 'L');
	}


	let args = parseArgs();
	let form = document.querySelector('.query-params');

	fillTheForm(form, args);



}());