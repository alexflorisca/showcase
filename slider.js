// TODO: If no buttons set, still add next event listener
// TODO: Fix throttle func to work without this
function throttle(f, t) {
	let lastCall;
	return function(args) {
		let previousCall = lastCall;
		lastCall = Date.now();
		if(previousCall === undefined || previousCall - lastCall >= t) {
			f(args);
		}
	}
}

class Slider {
	constructor() {
		const slider = this;
		this.container = document.querySelector('.slider');
		this.slides = document.querySelectorAll('.slider__slide');
		if(this.slides.length === 0) {
			console.warn('No slides found in slider')
			return;
		}
		this.next = document.querySelector('.slider__next');
		this.prev = document.querySelector('.slider__prev');

		this.xDown = null;
		this.yDown = null;

		this.activeSlideIndex = 0;

		this.slides[this.activeSlideIndex].classList.add('active');

		this.container.addEventListener('touchstart', this.handleTouchStart.bind(slider))
		this.container.addEventListener('touchmove', this.handleTouchMove.bind(slider))

		this.next.addEventListener('click', this.handleNextSlide.bind(slider));
		this.prev.addEventListener('click', this.handlePrevSlide.bind(slider));
	}

	handleNextSlide() {
		console.log('clicking next');
		const nextSlide = (this.activeSlideIndex === this.slides.length-1) ? 0 : this.activeSlideIndex+1;
		console.log('next slide', nextSlide);
		this.slides[nextSlide].classList.add('active');
		this.slides[this.activeSlideIndex].classList.remove('active');
		this.activeSlideIndex = nextSlide;
	}

	handlePrevSlide() {
		console.log('clicking prev');
		const nextSlide = (this.activeSlideIndex === 0) ? this.slides.length-1 : this.activeSlideIndex-1;
		console.log('next slide', nextSlide);
		this.slides[nextSlide].classList.add('active');
		this.slides[this.activeSlideIndex].classList.remove('active');
		this.activeSlideIndex = nextSlide;
	}

	handleTouchStart(e) {
		console.log(e);
		this.xDown = e.touches[0].clientX;
		this.yDown = e.touches[0].clientY;
	}

	handleTouchMove(e) {
		console.log('move executing');
		if(!this.xDown || !this.yDown) {
			return
		}
		const xUp = e.touches[0].clientX;
		const yUp = e.touches[0].clientY;

		const xDiff = this.xDown - xUp;
		const yDiff = this.yDown - yUp;
		if( Math.abs(xDiff) > Math.abs(yDiff) ) {
			if(xDiff > 0) {
				// Left swipe
				this.handleNextSlide();
			}
			else {
				// Right swipe
				this.handlePrevSlide()
			}
		}

		this.xDown = null;
		this.yDown = null;
	}
}

const slider = new Slider();