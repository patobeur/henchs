class TrailDotsManager {
	constructor() {
	}
	addTrail=(ghostDatas)=>{
		this.ghostDatas = ghostDatas[0]
		this.ghostDatas.trail={
			allDots: [],
			dotDist: 0,
			maxDotsDist:20,
			adddots: () => {
				let div = document.createElement('div')
				div.className = "dot"
				div.style.left = (this.ghostDatas.datas.left - 2.5) + 'px'
				div.style.top = (this.ghostDatas.datas.top - 2.5) + 'px'
				if (this.ghostDatas.trail.allDots.length > 0) {
					this.ghostDatas.trail.allDots.splice(0, 1)
				}
				this.ghostDatas.trail.allDots.push(div);
				this.ghostDatas.trail.addTrailDotToMap(div);
			},
			addTrailDotToMap: (div) => {
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
			},
			addTrailDot:() => {
				if (this.ghostDatas.trail.dotDist > this.ghostDatas.trail.maxDotsDist) {
					this.ghostDatas.trail.adddots()
					this.ghostDatas.trail.dotDist = 0
				}
				else { this.ghostDatas.trail.dotDist++ }
			}

		};
	}
}
