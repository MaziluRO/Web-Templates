/*
Public API Repo
https://github.com/public-apis/public-apis
*/

let dog = document.querySelector('.dog');
let duck = document.querySelector('.duck');
let fox = document.querySelector('.fox');

const dogBtn = document.querySelector('.get-dog');
const duckBtn = document.querySelector('.get-duck');
const foxBtn = document.querySelector('.get-fox');

dogBtn.addEventListener('click', randomDog);
duckBtn.addEventListener('click', randomDuck);
foxBtn.addEventListener('click', randomFox);

function randomDog() {
	fetch('https://random.dog/woof.json')
		.then((response) => response.json())
		.then(
			(data) => (dog.innerHTML = `<img src="${data.url}" alt="random dog"/>`)
		);
}

function randomDuck() {
	fetch('https://random-d.uk/api/v1')
		.then((response) => response.json())
		.then((data) => console.log(data));
}

function randomFox() {
	fetch('https://randomfox.ca/floof/')
		.then((response) => response.json())
		.then(
			(data) => (fox.innerHTML = `<img src="${data.image}" alt="random fox"/>`)
		);
}
