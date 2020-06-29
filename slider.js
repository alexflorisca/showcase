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

class Showcase {
	constructor(el, options) {
		if(!el) {
			console.warn('No showcase element found');
			return;
		}
		const _this = this;
		this.el = el;
		this.container = el.querySelector('.slider');
		this.content = el.querySelector('.slider__content');
		this.slides = el.querySelectorAll('.slider__slide');
		if(!this.content || this.slides.length === 0) {
			console.warn('Invalid markup or no slides found');
			return;
		}
		this.xDown = null;
		this.yDown = null;
		this.activeSlideIndex = 0;
		this.slides[this.activeSlideIndex].classList.add('active');

		this.content.addEventListener('click', this.nextSlide.bind(_this));
		this.el.addEventListener('touchstart', throttle(this.handleTouchStart.bind(_this), 250));
		this.el.addEventListener('touchmove', throttle(this.handleTouchMove.bind(_this), 250));
		this.next = el.querySelector('.slider__next');
		this.prev = el.querySelector('.slider__prev');
		if(this.next && this.prev) {
			this.next.addEventListener('click', this.nextSlide.bind(_this));
			this.prev.addEventListener('click', this.prevSlide.bind(_this));
		}


		if(options.dots) {
			this.enableDots()
		}
	}

	enableDots() {
		const dots = this.el.querySelector('.slider__dots');
		this.dots = [];
		this.slides.forEach((slide, index) => {
			const dot = document.createElement('button');
			dot.setAttribute('data-slide-index', index)
			dot.classList.add('slider__dot');
			if(index === this.activeSlideIndex) {
				dot.classList.add('active');
			}
			dot.addEventListener('click', () => {
				this.changeActiveSlide(index);
			})
			this.dots[index] = dot;
			dots.appendChild(dot);
		})
	}

	changeActiveSlide(nextSlide) {
		this.slides[this.activeSlideIndex].classList.remove('active');
		this.slides[nextSlide].classList.add('active');
		this.dots[this.activeSlideIndex].classList.remove('active');
		this.dots[nextSlide].classList.add('active');
		this.activeSlideIndex = nextSlide;
	}

	nextSlide() {
		const nextSlide = (this.activeSlideIndex === this.slides.length-1) ? 0 : this.activeSlideIndex+1;
		console.log('next slide', nextSlide);
		this.changeActiveSlide(nextSlide);
	}

	prevSlide() {
		const nextSlide = (this.activeSlideIndex === 0) ? this.slides.length-1 : this.activeSlideIndex-1;
		console.log('next slide', nextSlide);
		this.changeActiveSlide(nextSlide);
	}

	handleTouchStart(e) {
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