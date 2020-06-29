function throttle(f, t) {
	let inThrottle;
	return function(args) {
		if(!inThrottle) {
			f(args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, t)
		}
	}
}

class Slider {
	constructor() {
		const slider = this;
		this.container = document.querySelector('.slider');
		this.slides = document.querySelectorAll('.slider__slide');
		if(!this.container || this.slides.length === 0) {
			console.warn('No slides found in slider')
			return;
		}

		this.container.addEventListener('click', this.nextSlide.bind(slider));

		// Prev and Next buttons
		this.next = document.querySelector('.slider__next');
		this.prev = document.querySelector('.slider__prev');

		if(this.next && this.prev) {
			this.next.addEventListener('click', this.nextSlide.bind(slider));
			this.prev.addEventListener('click', this.prevSlide.bind(slider));
		}

		this.xDown = null;
		this.yDown = null;

		this.activeSlideIndex = 0;

		this.slides[this.activeSlideIndex].classList.add('active');

		this.container.addEventListener('touchstart', throttle(this.handleTouchStart.bind(slider), 500));
		this.container.addEventListener('touchmove', throttle(this.handleTouchMove.bind(slider), 500));

	}

	nextSlide() {
		const nextSlide = (this.activeSlideIndex === this.slides.length-1) ? 0 : this.activeSlideIndex+1;
		console.log('next slide', nextSlide);
		this.slides[nextSlide].classList.add('active');
		this.slides[this.activeSlideIndex].classList.remove('active');
		this.activeSlideIndex = nextSlide;
	}

	prevSlide() {
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
		console.log(this, this.xDown, this.yDown)
		if(!this.xDown || !this.yDown) {
			return
		}
		const xUp = e.touches[0].clientX;
		const yUp = e.touches[0].clientY;

		const xDiff = this.xDown - xUp;
		const yDiff = this.yDown - yUp;
		if( Math.abs(xDiff) > Math.abs(yDiff) ) {
			// Left swipe
			if(xDiff > 0) {
				this.nextSlide();
			}
			// Right swipe
			else {
				this.prevSlide()
			}
		}

		this.xDown = null;
		this.yDown = null;
	}
}

const slider = new Slider();