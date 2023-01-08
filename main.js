const stepElems = document.querySelectorAll('.step');
const graphicElems = document.querySelectorAll('.graphic-item');

const actions ={
	birdFlies(key){
		key ? 
			document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)` : 
			document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
	},

	birdFlies2(key){
		key ? 
			document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, -${innerHeight * 0.7}px)` : 
			document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
	},
}

let currentItem = graphicElems[0]; // 현재 활성화된 visible Item
let ioIndex = 0; 

const io = new IntersectionObserver((entries, observer) => {
	ioIndex = +entries[0].target.dataset.index;
	// console.log(ioIndex);
})

graphicElems.forEach((graphic, index) => {
	graphic.dataset.index = index;
	stepElems[index].dataset.index = index;
})

function activate(action){
	currentItem.classList.add('visible');

	action && actions[action](true);
}

function inactivate(action){
	currentItem.classList.remove('visible');

	action && actions[action](false);
}


window.addEventListener('scroll', () => {
	let boundingRect;
	let step;

	/**
	 * i = 0 => -1, 1
	 * i = 1 => 0, 2
	 * i = 2 => 1, 3
	 */

	for(let i = ioIndex - 1; i < ioIndex + 2; i++){
		step = stepElems[i];

		// console.log(ioIndex, i);
		if(!step) continue;

		io.observe(step);
		boundingRect = step.getBoundingClientRect();

		if(boundingRect.top > window.innerHeight * 0.1 && 
				boundingRect.top < window.innerHeight * 0.8
			) {

				inactivate(currentItem.dataset.action);

				currentItem = graphicElems[step.dataset.index]
				activate(currentItem.dataset.action);
			}
	}
})

window.addEventListener('load', () => {
	setTimeout(() => {
		scrollTo(0, 0);
	}, 100)
})

activate();