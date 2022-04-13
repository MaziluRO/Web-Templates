//***************Classes*********** */
//superhero entry class
class SuperheroEntry {
	constructor(superheroName, superheroUniverse, superheroPower) {
		this.superheroName = superheroName;
		this.superheroUniverse = superheroUniverse;
		this.superheroPower = superheroPower;
	}
}

//superhero list class
class SuperheroList {
	//adds a hero
	addSuperHero(hero) {
		const listData = document.querySelector('.superhero-list-data');
		const listContainer = document.createElement('ul');
		listContainer.setAttribute('class', 'list');
		listContainer.innerHTML += `
    <li>${hero.superheroName}</li>
    <li>${hero.superheroUniverse}</li>
    <li>${hero.superheroPower}</li>
    <i class="fas fa-trash"></i>
    `;

		listData.appendChild(listContainer);
	}

	//clears hero inputs
	clearHeroInputs() {
		[
			document.querySelector('#name').value,
			document.querySelector('#universe').value,
			document.querySelector('#power').value,
		] = ['', '', ''];
	}

	//validation error
	validationError() {
		document.querySelector('.validate-error').classList.add('show-validation');
		setTimeout(() => {
			document
				.querySelector('.validate-error')
				.classList.remove('show-validation');
		}, 2500);
	}

	//validation success
	validationSuccess() {
		document
			.querySelector('.validate-success')
			.classList.add('show-validation');
		setTimeout(() => {
			document
				.querySelector('.validate-success')
				.classList.remove('show-validation');
		}, 1500);
	}
}

//store hero class
class StoreHero {
	//get superhero from LS
	static getSuperhero() {
		let superheros;
		if (localStorage.getItem('superheros') === null) {
			superheros = [];
		} else {
			superheros = JSON.parse(localStorage.getItem('superheros'));
		}

		return superheros;
	}

	//add superhero from LS
	static addSuperhero(entry) {
		const superherosList = StoreHero.getSuperhero();
		superherosList.push(entry);
		localStorage.setItem('superheros', JSON.stringify(superherosList));
	}

	//display superhero from LS
	static displaySuperhero() {
		const superheroList = StoreHero.getSuperhero();

		superheroList.forEach((hero) => {
			//instantiate the superhero list
			const list = new SuperheroList();
			list.addSuperHero(hero);
		});
	}

	//remove hero from LS
	static removeSuperhero(hero) {
		const superherosList = StoreHero.getSuperhero();
		superherosList.forEach((superhero, index) => {
			if (superhero.superheroName === hero) {
				superherosList.splice(index, 1);
			}
		});
		localStorage.setItem('superheros', JSON.stringify(superherosList));
	}
}

//****************events*******************
//when page loads
document.addEventListener('DOMContentLoaded', StoreHero.displaySuperhero);

const form = document.querySelector('.superhero-form');
form.addEventListener('submit', function (e) {
	e.preventDefault();

	/*
	let [superheroName, superheroUniverse, superheroPower] = [
		document.querySelector('#name').value,
		document.querySelector('#universe').value,
		document.querySelector('#power').value,
	];*/

	const superheroName = document.querySelector('#name').value;
	const superheroUniverse = document.querySelector('#universe').value;
	const superheroPower = document.querySelector('#power').value;

	//instantiate superhero list
	const list = new SuperheroList();

	//validate the form
	if (
		superheroName === '' ||
		superheroUniverse === '' ||
		superheroPower === ''
	) {
		list.validationError();
	} else {
		//instantiate the superhero class
		const heroEntry = new SuperheroEntry(
			superheroName,
			superheroUniverse,
			superheroPower
		);

		//begin inserting heroes in list
		list.addSuperHero(heroEntry);
		list.clearHeroInputs();
		//list.validationSuccess();

		//adding superhero to local storage
		StoreHero.addSuperhero(heroEntry);
	}
});

//deleting a superhero
const listData = document.querySelector('.superhero-list-data');
listData.addEventListener('click', function (e) {
	if (e.target.className === 'fas fa-trash') {
		const trash = e.target.parentNode;

		console.log(e);
		const clickedHero =
			e.target.previousElementSibling.previousElementSibling
				.previousElementSibling.textContent;

		StoreHero.removeSuperhero(clickedHero);

		trash.remove();
	}
});
