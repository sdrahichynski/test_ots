;(function(){

	let args = window.location.search.slice(1).split('&');
	let argsParsed = args.reduce( (summ, current, index, array) => {

		let arg   = current.split('=');
		let key   = decodeURIComponent(arg[0]);
		let value = decodeURIComponent(arg[1]).split(',');

		if (value.length === 1) value = value[0];
		summ[key] = value;

		return summ;
	}, {});


	console.log(argsParsed);



}());