class MapsManager {
	constructor() {
		this.diagonalspeedratio = 1.5;
		this.grid = { x: 100, y: 100, z: 100 }

		this.map = document.createElement('div')
		this.map.className = 'map'
		this.map.style.position = 'absolute'

		this.mapsdatas = this.getMapDatas(0)
		this.ghostDatas = DATAZ.ghostdatas
		this.parts = []
		this.walls = []
		this.spawns = []
		this.player = { datas: { top: 0, left: 0 } }
	}
	start() {
		this.displayMapOnce()
		this.displayGhostOnce()
	}
	update() {
		// check colliding 

		if (Keyboard.isUsingMove()) {
			// console.log('mooving')

			// console.log(this.ghostDatas[0].div)
			// console.log('way:', Keyboard.way)
			// console.log('skills:', Keyboard.skills)
			this.checkMoveRules()

			// console.log('isCollidingWithWalls:', this.isCollidingWithWalls(this.ghostDatas[0].div))
		}
		this.refreshMapPos()
		// if no collide move map
	}
	checkMoveRules() {

		let way = Keyboard.way;
		let speed = this.ghostDatas[0].speed;

		//get current grid 
		this.ghostDatas[0].grid = this.getCurrentGridPos(this.ghostDatas[0].datas);

		// 	adjust speed while diagonal move
		if ((way[0] || way[2]) && (way[1] || way[3])) { speed = Math.floor(speed / this.diagonalspeedratio); }

		let oldTop = Number(this.ghostDatas[0].datas.top) + 0;
		let oldLeft = Number(this.ghostDatas[0].datas.left) + 0;

		if (way[0] && !way[2]) { this.ghostDatas[0].datas.top -= speed; }
		if (way[2] && !way[0]) { this.ghostDatas[0].datas.top += speed; }
		if (way[1] && !way[3]) { this.ghostDatas[0].datas.left += speed; }
		if (way[3] && !way[1]) { this.ghostDatas[0].datas.left -= speed; }

		// update ghost div to get bouncing box
		this.ghostDatas[0].div.style.top = (this.ghostDatas[0].datas.top - (this.ghostDatas[0].datas.height / 2)) + 'px'
		this.ghostDatas[0].div.style.left = (this.ghostDatas[0].datas.left - (this.ghostDatas[0].datas.width / 2)) + 'px'


		if (this.isCollidingWithWalls(this.ghostDatas[0].div)) {
			// put old data back if colliding
			this.ghostDatas[0].datas.top = oldTop
			this.ghostDatas[0].datas.left = oldLeft

		}
		else {
			// update theta (rotation)
			this.ghostDatas[0].theta = way[0] ? 0 : way[1] ? 90 : way[2] ? 180 : 270;

			// move the map 
			let left = Math.floor(window.innerWidth / 2)
			let top = Math.floor(window.innerHeight / 2)

			// update player pos

		}






		// 	// update move datas


		// 	// if (P.collide === false) {
		// 	if (way[0] && !way[2]) { this.ghostDatas.datas.topB -= speed; }
		// 	if (way[2] && !way[0]) { this.ghostDatas.datas.topB += speed; }
		// 	if (way[1] && !way[3]) { this.ghostDatas.datas.leftB += speed; }
		// 	if (way[3] && !way[1]) { this.ghostDatas.datas.leftB -= speed; }

		// 	if (way[0] && !way[2]) { this.ghostDatas.datas.top -= speed; }
		// 	if (way[2] && !way[0]) { this.ghostDatas.datas.top += speed; }
		// 	if (way[1] && !way[3]) { this.ghostDatas.datas.left += speed; }
		// 	if (way[3] && !way[1]) { this.ghostDatas.datas.left -= speed; }
		// 	// }
	}
	changeToMap(num) {
		this.mapsdatas = this.getMapDatas(num)
	}
	getMapDatas(num) {
		if (!typeof num === 'number' || num < 0 || num >= DATAZ.maps.length) num = 0;
		return DATAZ.maps[num]
	}
	getCurrentGridPos(datas) {
		let x = datas.left > 0 ? Math.floor(datas.left / this.grid.x) + 1 : 1;
		let y = datas.top > 0 ? Math.floor(datas.top / this.grid.y) + 1 : 1;
		let z = datas.zIndex > 0 ? Math.floor(datas.zIndex / this.grid.z) + 1 : 1;
		return { x: x, y: y, z: z }
	}
	refreshMapPos() {
		if (typeof this.map != 'undefined') {

			let left = Math.floor(window.innerWidth / 2)
			let top = Math.floor(window.innerHeight / 2)


			this.map.style.top = (top + this.mapsdatas.datas.top - this.ghostDatas[0].datas.top) + 'px'
			this.map.style.left = (left + this.mapsdatas.datas.left - this.ghostDatas[0].datas.left) + 'px'

		}
	}
	displayGhostOnce() {

		// player ghost
		if (typeof this.ghostDatas[0] === 'object') {

			if (typeof this.mapsdatas.spawns[0] === 'object') {
				this.ghostDatas[0].datas.left = this.mapsdatas.spawns[0].datas.left
				this.ghostDatas[0].datas.top = this.mapsdatas.spawns[0].datas.top
			}
			this.ghostDatas[0].div = document.createElement('div');
			// apply proprieties
			this.appliqueCaA(this.ghostDatas[0], this.ghostDatas[0].div, true)
			this.map.prepend(this.ghostDatas[0].div)

			// update player pos
			this.player.datas.top = this.ghostDatas[0].datas.top
			this.player.datas.left = this.ghostDatas[0].datas.left

		}

	}
	displayMapOnce() {
		this.map.style.width = this.mapsdatas.datas.width + 'px'
		this.map.style.height = this.mapsdatas.datas.height + 'px'

		// player spawns
		if (typeof this.mapsdatas.spawns[0] === 'object') {
			let spawn = document.createElement('div');
			this.appliqueCaA(this.mapsdatas.spawns[0], spawn, true)
			this.spawns.push(spawn)
			this.map.prepend(spawn)

		}






		// contents parts
		if (typeof this.mapsdatas.parts === 'object' && this.mapsdatas.parts.length > 0) {
			let job = this.mapsdatas.parts
			job.forEach(element => {
				if (typeof element.datas != 'undefined') {
					let part = document.createElement(element.tag)
					this.appliqueCaA(element, part)
					this.parts.push(part)
					this.map.prepend(part)
				}
			});
		}
		// envirronement walls
		if (typeof this.mapsdatas.walls === 'object' && this.mapsdatas.walls.length > 0) {
			this.mapsdatas.walls.forEach(element => {
				if (typeof element.datas != 'undefined') {
					let wall = document.createElement('div')
					this.appliqueCaA(element, wall)
					this.walls.push(wall)
					this.addToMap(wall)
				}
			});
		}


		// first spawn recentered on center of screen
		let top = Math.floor(window.innerHeight / 2)
		let left = Math.floor(window.innerWidth / 2)
		let reCenteredTop = -(this.mapsdatas.spawns[0].datas.height / 2)
		let reCenteredLeft = -(this.mapsdatas.spawns[0].datas.width / 2)
		// console.log(this.mapsdatas.spawns[0].top)
		// console.log(this.mapsdatas.spawns[0].left)

		// first spawn recenred on center of screen
		let mapCurrentPosTop = (top + this.mapsdatas.datas.top - this.mapsdatas.spawns[0].datas.top + reCenteredTop)
		let mapCurrentPosLeft = (left + this.mapsdatas.datas.left - this.mapsdatas.spawns[0].datas.left + reCenteredLeft)



		this.map.style.top = mapCurrentPosTop + 'px'
		this.map.style.left = mapCurrentPosLeft + 'px'

		console.log("map", this.map.style.left, this.map.style.top)
		console.log("spawn", this.mapsdatas.spawns[0].datas.left, this.mapsdatas.spawns[0].datas.top)

		document.body.appendChild(this.map)
	}
	appliqueCaA(element, target, centered = true) {
		if (typeof element.datas != 'undefined' && typeof target === 'object') {
			let centerTop = 0
			let centerLeft = 0
			if (centered === true) {
				if (typeof element.datas.height != 'undefined') centerTop = element.datas.height / 2;
				if (typeof element.datas.width != 'undefined') centerLeft = element.datas.width / 2;
			}
			target.style.position = 'absolute'
			if (typeof element.datas.left != 'undefined') target.style.left = (element.datas.left - centerLeft) + 'px';
			if (typeof element.datas.top != 'undefined') target.style.top = (element.datas.top - centerTop) + 'px';


			if (typeof element.datas.width != 'undefined') target.style.width = element.datas.width + 'px';
			if (typeof element.datas.height != 'undefined') target.style.height = element.datas.height + 'px';
			if (typeof element.datas.transform != 'undefined') target.style.transform = 'rotate(' + element.datas.transform + 'deg)';

			if (typeof element.datas.className != 'undefined') target.className = element.datas.className;
			if (typeof element.datas.src != 'undefined') target.src = element.datas.src;
		}
		else {

			console.log(element[0], target)
		}
	}
	addToMap(obj) {
		this.map.appendChild(obj)
	}
	addHenchsToMap() {
		Henchs.henchs.forEach(peon => {
			this.map.appendChild(peon.div)
		});
	}

	isCollidingWithWalls(elem) {

		let collide = false;
		this.walls.forEach(item => {
			let colliding = Algebra.isOverlappingWalls(elem, item)
			if (collide === false && colliding === true) {
				collide = true
			}
		});
		// console.log('collide:' + collide)
		return collide;
	}

	isOverlappingParts() {

		this.parts.forEach(part => {
			let isoverlapping = Algebras.overlapping(Players.OyaDivs.playerVisual, part)
			if (
				isoverlapping === true &&
				(part.ovelap === false || typeof part.ovelap === 'undefined')
			) {
				// console.log(part)
				part.ovelap = true
				part.border = ("1px solid black;")
			}
			else if (
				isoverlapping === false &&
				typeof part.ovelap != 'undefined' &&
				part.ovelap === true
			) {
				console.log('part')
				part.ovelap = false
				part.border = ("0px;")
			}
		});
	}

}
