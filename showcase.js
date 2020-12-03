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
		this.content = el.querySelector('.showcase__content');
		this.slides = el.querySelectorAll('.showcase__slide');
		if(!this.content || this.slides.length === 0) {
			console.warn('Invalid markup or no slides found');
			return;
		}
		this.breakpoints = options.breakpoints || [600, 1200];
		this.screenWidth = window.innerWidth;
		this.thumbsEl = null;
		this.thumbs = [];
		this.xDown = null;
		this.yDown = null;
		this.activeSlideIndex = 0;
		this.slides[this.activeSlideIndex].classList.add('active');

		this.content.addEventListener('keydown', e => {
			if(e.keyCode === 37) {
				this.prevSlide();
			}
			if(e.keyCode === 39) {
				this.nextSlide();
			}
		})
		this.content.addEventListener('click', this.nextSlide.bind(_this));
		this.content.addEventListener('touchstart', throttle(this.handleTouchStart.bind(_this), 250));
		this.content.addEventListener('touchmove', throttle(this.handleTouchMove.bind(_this), 250));
		this.next = el.querySelector('.showcase__next');
		this.prev = el.querySelector('.showcase__prev');
		if(this.next && this.prev) {
			this.next.addEventListener('click', this.nextSlide.bind(_this));
			this.prev.addEventListener('click', this.prevSlide.bind(_this));
		}
		
		window.addEventListener('resize', throttle(this.onScreenResize.bind(_this), 100));
		this.addThumbs();
	}

	onScreenResize() {
		this.screenWidth = window.innerWidth;
		console.log(this.thumbsEl, this.innerWidth, this.breakpoints)
		this.updateThumbStyles();
	}

	updateThumbStyles() {
		if(this.screenWidth < this.breakpoints[0]) {
			this.el.classList.remove('showcase--grid');
			this.thumbsEl.classList.remove('showcase__thumbs--img');
			this.thumbsEl.classList.add('showcase__thumbs--dot');
		} else if(this.screenWidth > this.breakpoints[0] && this.screenWidth < this.breakpoints[1]) {
			this.el.classList.remove('showcase--grid');
			this.thumbsEl.classList.remove('showcase__thumbs--dot');
			this.thumbsEl.classList.add('showcase__thumbs--img');
		} else {
			this.el.classList.add('showcase--grid');
			this.thumbsEl.classList.remove('showcase__thumbs--dot');
			this.thumbsEl.classList.remove('showcase__thumbs--img');
		}
	}

	addThumbs() {
		this.thumbsEl = document.createElement('div');
		this.thumbsEl.setAttribute('role', 'tablist');
		this.thumbsEl.classList.add('showcase__thumbs');
		this.el.appendChild(this.thumbsEl);
		this.updateThumbStyles();

		this.slides.forEach((slide, index) => {
			const b = document.createElement('button')
			b.setAttribute('data-slide-index', index)
			b.setAttribute('aria-label', `Image ${index+1}`)
			b.innerHTML = `<img src="${slide.firstChild.getAttribute('src')}">`;

			if(index === this.activeSlideIndex) {
				b.classList.add('active');
			}
			b.addEventListener('click', () => {
				this.changeActiveSlide(index);
			})
			this.thumbs[index] = b;
			this.thumbsEl.appendChild(b);
		})
	}

	changeActiveSlide(nextSlide) {
		this.slides[this.activeSlideIndex].classList.remove('active');
		this.slides[nextSlide].classList.add('active');
		if(this.thumbs.length > 0) {
			this.thumbs[this.activeSlideIndex].classList.remove('active');
			this.thumbs[nextSlide].classList.add('active');
		}
		this.activeSlideIndex = nextSlide;
		this.slides[this.activeSlideIndex].focus();
	}

	nextSlide() {
		const nextSlide = (this.activeSlideIndex === this.slides.length-1) ? 0 : this.activeSlideIndex+1;
		this.changeActiveSlide(nextSlide);
	}

	prevSlide() {
		const nextSlide = (this.activeSlideIndex === 0) ? this.slides.length-1 : this.activeSlideIndex-1;
		this.changeActiveSlide(nextSlide);
	}

	handleTouchStart(e) {
		this.xDown = e.touches[0].clientX;
		this.yDown = e.touches[0].clientY;
	}

	handleTouchMove(e) {
		if(!this.xDown || !this.yDown) return;
		
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
window.Showcase = Showcase;