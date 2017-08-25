;(function(){



	let result1, result2;
	let requestButtons = document.querySelectorAll('.request');
	let responseField = document.querySelector('.response');


	if (!requestButtons) return;

	window.addEventListener('click', (e) => {
		let target = e.target;

		if (target.classList.contains('request')) {
			let url = target.getAttribute('data-url');

		}
	});


}())