;(function(){

	// класс, на случай если Input не один,
	// или придется в будущем делать с ним что-нибудь еще
	class SmartInput {

		constructor(el) {
			this.DOMElement   = el;
			this.initialValue = el.value;

			this.bindEvents();
		}


		checkValue() {
			// проверяет значения
			// сам ничего не делает, только запускает соотв. методы
			let value = this.DOMElement.value;

			if (value !== this.initialValue) {
				this.smthWrong();
			} else {
				this.allRight();
			}
		}


		smthWrong() {
			this.DOMElement.classList.add('red');
		}


		allRight() {
			this.DOMElement.classList.remove('red');
		}


		bindEvents() {
			this.DOMElement.addEventListener('input', () => {this.checkValue()}, 'false');
		}

	};




	let smartInputsDOMElements = document.querySelectorAll('.smart-input');
	let smartInputs = [];

	smartInputsDOMElements.forEach((el) => {
		smartInputs.push( new SmartInput(el) );
	});


}());