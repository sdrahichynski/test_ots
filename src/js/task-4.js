;(function(){

	let formMessage = document.querySelectorAll('.send-message');
	let receiver = document.querySelector('.domain-two').contentWindow;
	let iframeCallback = function() {
		return function(url) {

			let req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = function(){
				if (req.status === 200){
					console.log(234)
					console.log(JSON.parse(req.response));
				} else {
					console.log(Error(req.statusText));
				}
			};

			req.onerror = function() {
				console.log(Error('Network Error'));
			};

			req.send();
		}
	}


	formMessage.forEach((form) => {

		form.addEventListener('submit', function(e){
			e.preventDefault();
			// let msg = `${this.elements['name'].value} : ${this.elements['value'].value}`;
			let name = this.elements['name'] ? this.elements['name'].value : null;
			let value = this.elements['value'] ? this.elements['value'].value : null;

			let msg = {
				name : name,
				value : value,
				action : this.getAttribute('data-action'),
				callback: encodeURI(iframeCallback.toString())
			};

			receiver.postMessage(JSON.stringify(msg), 'http://localhost:8000');

			this.reset();

		}, false);
	});

	function receiveMessage(e){
		console.log(e.data || 'Нет такой записи!');
	}


	window.addEventListener('message', receiveMessage);


}());