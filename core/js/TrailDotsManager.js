class TrailDotsManager {
	constructor() {
<<<<<<< HEAD
		this.allDots = []
=======
		this.ghost = Object
>>>>>>> main
	}
	dotManager(ghost) {
		console.log('fffffffffff')
		this.ghost = ghost
		this.ghost.adddots = () => {
			let div = document.createElement('div')
			div.className = "dot"
			div.style.left = (this.ghost.datas.left - 2.5) + 'px'
			div.style.top = (this.ghost.datas.top - 2.5) + 'px'
			if (this.ghost.allDots.length > 0) {
				this.ghost.allDots.splice(0, 1)
			}
			this.ghost.allDots.push(div);
			this.ghost.addTrailDotToMap(div);
		};
		this.ghost.addTrailDotToMap = (div) => {
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
		this.ghost.addTrailDot = () => {
			if (this.dots.dotDist > this.dots.maxDotsDist) {
				this.dots.adddots()
				this.dots.dotDist = 0
			}
			else { this.dots.dotDist++ }
		};
		this.ghost.dotDist = 0;
		this.ghost.allDots = [];
	}
}
