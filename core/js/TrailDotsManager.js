class TrailDotsManager {
	constructor() {
		this.allDots = []
		this.ghost = Object
	}
	dotManager(ghostDatas) {
		this.ghost = ghostDatas[0]
		
		this.ghost.dotDist = 0;
		this.ghost.allDots = [];
		this.ghost.maxDotsDist = 20;
		this.ghost.trail = () => {
			let bob = 0;
			adddots = () => {
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
			addTrailDotToMap = (div) => {
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
			addTrailDot = () => {
				if (this.ghost.dotDist > this.ghost.maxDotsDist) {
					this.ghost.trail.adddots()
					this.ghost.dotDist = 0
				}
				else { this.ghost.dotDist++ }
			};	
		}
		// this.ghost.adddots = () => {
		// 	let div = document.createElement('div')
		// 	div.className = "dot"
		// 	div.style.left = (this.ghost.datas.left - 2.5) + 'px'
		// 	div.style.top = (this.ghost.datas.top - 2.5) + 'px'
		// 	if (this.ghost.allDots.length > 0) {
		// 		this.ghost.allDots.splice(0, 1)
		// 	}
		// 	this.ghost.allDots.push(div);
		// 	this.ghost.addTrailDotToMap(div);
		// };
		// this.ghost.addTrailDotToMap = (div) => {
		// 	Maps.addToMap(div)
		// 	setTimeout(function () {
		// 		div.classList.add('out');
		// 		// console.log('ok');
		// 		setTimeout(function () {
		// 			div.classList.remove('out');
		// 			div.classList.add('clear');
		// 			// console.log('removing');
		// 			setTimeout(function () {
		// 				div.classList.remove('clear');
		// 				div.remove()
		// 			}, 500);
		// 		}, 5000);
		// 	}, 500);
		// };
		// this.ghost.addTrailDot = () => {
		// 	if (this.dots.dotDist > this.dots.maxDotsDist) {
		// 		this.ghost.adddots()
		// 		this.ghost.dotDist = 0
		// 	}
		// 	else { this.ghost.dotDist++ }
		// };
		// this.ghost.dotDist = 0;
		// this.ghost.allDots = [];
	}
}
