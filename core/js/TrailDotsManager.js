class TrailDotsManager {
	constructor() {
		this.dots = Object
	}
	dotManager() {
		this.dots.adddots = () => {
			let div = document.createElement('div')
			div.className = "dot"
			div.style.left = (this.dots.datas.left - 2.5) + 'px'
			div.style.top = (this.dots.datas.top - 2.5) + 'px'
			if (this.dots.allDots.length > 0) {
				this.dots.allDots.splice(0, 1)
			}
			this.dots.allDots.push(div);
			this.dots.addTrailDotToMap(div);
		};
		this.dots.addTrailDotToMap = (div) => {
			Maps.addToMap(div)
			setTimeout(function () {
				div.classList.add('out');
				// console.log('ok');
				setTimeout(function () {
					div.classList.remove('out');
					div.classList.add('clear');
					// console.log('removing');
					setTimeout(function () {
						div.classList.remove('clear');
						div.remove()
					}, 500);
				}, 5000);
			}, 500);
		};
		this.dots.addTrailDot = () => {
			if (this.dots.dotDist > this.dots.maxDotsDist) {
				this.dots.adddots()
				this.dots.dotDist = 0
			}
			else { this.dots.dotDist++ }
		};
		this.dots.dotDist = 0;
		this.dots.allDots = [];

	}
}
