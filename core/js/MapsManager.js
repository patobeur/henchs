class MapsManager {
	constructor() {
		this.ghostNum = new Number(0)
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
		//
	}
	start() {
		this.setMapDivSize()
		this.setMapSpawnZones()
		this.setMapParts()
		this.setMapWalls()
		this.setMapStyle()
		this.setAndDisplayGhost()
		document.body.appendChild(this.map)
		this.refreshMapPos()
		this.setOnresize()
	}
	setOnresize() {
		onresize = (event) => {
			this.refreshMapPos()
		};
	}
	update() {
		if (Keyboard.isUsingMove()) {
			this.checkMoveRules()
			// console.log('isCollidingWithWalls:', this.isCollidingWithWalls(this.ghostDatas[this.ghostNum].div))
			this.refreshDots()
			this.refreshMapPos()
		}
	}
	refreshDots() {
	}
	checkMoveRules() {

		let way = Keyboard.way;
		let speed = this.ghostDatas[this.ghostNum].speed;

		//get current grid 
		this.ghostDatas[this.ghostNum].grid = this.getCurrentGridPos(this.ghostDatas[this.ghostNum].datas);

		// 	adjust speed while diagonal move
		if ((way[0] || way[2]) && (way[1] || way[3])) { speed = Math.floor(speed / this.diagonalspeedratio); }

		// update theta direction (rotation)
		this.ghostDatas[this.ghostNum].theta = way[0] ? 0 : way[1] ? 90 : way[2] ? 180 : 270;

		// store old position
		let oldTop = Number(this.ghostDatas[this.ghostNum].datas.top) + 0;
		let oldLeft = Number(this.ghostDatas[this.ghostNum].datas.left) + 0;

		// adjust speed if diagonal moove
		if (way[0] && !way[2]) { this.ghostDatas[this.ghostNum].datas.top -= speed; }
		if (way[2] && !way[0]) { this.ghostDatas[this.ghostNum].datas.top += speed; }
		if (way[1] && !way[3]) { this.ghostDatas[this.ghostNum].datas.left += speed; }
		if (way[3] && !way[1]) { this.ghostDatas[this.ghostNum].datas.left -= speed; }


		// update ghost div position to get bouncing box
		this.ghostDatas[this.ghostNum].div.style.top = (this.ghostDatas[this.ghostNum].datas.top - (this.ghostDatas[this.ghostNum].datas.height / 2)) + 'px'
		this.ghostDatas[this.ghostNum].div.style.left = (this.ghostDatas[this.ghostNum].datas.left - (this.ghostDatas[this.ghostNum].datas.width / 2)) + 'px'


		let elem = this.ghostDatas[0].div
		let list = this.walls

		if (Collisions.isCollidingWithWalls(elem, list)) {

			// restore old position back if colliding
			this.ghostDatas[this.ghostNum].datas.top = oldTop
			this.ghostDatas[this.ghostNum].datas.left = oldLeft

			// update ghost div position to get bouncing box
			// this.ghostDatas[this.ghostNum].div.style.top = (this.ghostDatas[this.ghostNum].datas.top - (this.ghostDatas[this.ghostNum].datas.height / 2)) + 'px'
			// this.ghostDatas[this.ghostNum].div.style.left = (this.ghostDatas[this.ghostNum].datas.left - (this.ghostDatas[this.ghostNum].datas.width / 2)) + 'px'
		}
		else {
			// DotTrailer
			//DotsTrailer.dotManager(this.ghostDatas[0].div)

			// update player pos
		}


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
			this.map.style.top = (Math.floor(window.innerHeight / 2) + this.mapsdatas.datas.top - this.ghostDatas[this.ghostNum].datas.top) + 'px'
			this.map.style.left = (Math.floor(window.innerWidth / 2) + this.mapsdatas.datas.left - this.ghostDatas[this.ghostNum].datas.left) + 'px'
		}
	}
	setAndDisplayGhost() {
		// player ghost
		if (typeof this.ghostDatas[this.ghostNum] === 'object') {

			if (typeof this.mapsdatas.spawns[0] === 'object') {
				this.ghostDatas[this.ghostNum].datas.left = this.mapsdatas.spawns[0].datas.left
				this.ghostDatas[this.ghostNum].datas.top = this.mapsdatas.spawns[0].datas.top
			}
			this.ghostDatas[this.ghostNum].div = document.createElement('div');
			// apply properties
			this.appliqueCaA(this.ghostDatas[this.ghostNum], this.ghostDatas[this.ghostNum].div, true)
			this.addToMap(this.ghostDatas[this.ghostNum].div)

			// update player pos
			this.player.datas.top = this.ghostDatas[this.ghostNum].datas.top
			this.player.datas.left = this.ghostDatas[this.ghostNum].datas.left

		}

	}
	setMapDivSize() {
		if (typeof this.mapsdatas.datas === 'object') {
			this.map.style.width = this.mapsdatas.datas.width + 'px'
			this.map.style.height = this.mapsdatas.datas.height + 'px'
		}
	}
	setMapParts() {
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
	}
	setMapWalls() {
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
		console.log('f', this.mapsdatas.datas)
		let d = this.mapsdatas.datas
		let thin = this.mapsdatas.wallThin
		let elements = [
			{ datas: { className: 'wall top', width: d.width, height: thin, top: 0, left: Math.floor(d.width / 2), zIndex: 0 } },
			{ datas: { className: 'wall bottom', width: d.width, height: thin, top: d.height - 2, left: Math.floor(d.width / 2), zIndex: 0 } },
			{ datas: { className: 'wall left', width: thin, height: d.height, top: Math.floor(d.height / 2), left: 0, zIndex: 0 } },
			{ datas: { className: 'wall right', width: thin, height: d.height, top: Math.floor(d.height / 2), left: 0, zIndex: 0 } }
		]
		for (let index = 0; index < 4; index++) {
			let wall = document.createElement('div')
			this.appliqueCaA(elements[index], wall)
			this.walls.push(wall)
			this.addToMap(wall)

		}






	}
	setMapSpawnZones() {
		// player spawns
		// if (typeof this.mapsdatas.spawns[0] === 'object') {

		// 	let spawn = document.createElement('div');
		// 	this.appliqueCaA(this.mapsdatas.spawns[0], spawn, true)
		// 	this.spawns.push(spawn)
		// 	this.map.prepend(spawn)
		// 	this.addToMap(spawn)


		// }
		for (let index = 0; index < this.mapsdatas.spawns.length; index++) {

			let spawn = document.createElement('div');
			this.appliqueCaA(this.mapsdatas.spawns[index], spawn, true)
			this.spawns.push(spawn)
			this.map.prepend(spawn)
			this.addToMap(spawn)


		}
	}
	setMapStyle() {
		// first spawn recentered on center of screen
		let mapCurrentPosTop = (Math.floor(window.innerHeight / 2) + this.mapsdatas.datas.top - this.mapsdatas.spawns[0].datas.top - (this.mapsdatas.spawns[0].datas.height / 2))
		let mapCurrentPosLeft = (Math.floor(window.innerWidth / 2) + this.mapsdatas.datas.left - this.mapsdatas.spawns[0].datas.left - (this.mapsdatas.spawns[0].datas.width / 2))
		this.map.style.top = mapCurrentPosTop + 'px'
		this.map.style.left = mapCurrentPosLeft + 'px'
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
			if (typeof element.datas.title != 'undefined') target.title = element.datas.title;

			if (typeof element.datas.className != 'undefined') target.className = element.datas.className;
			if (typeof element.datas.src != 'undefined' && element.tag === 'img') target.src = element.datas.src;

			if (typeof element.datas.backgroundColor != 'undefined') target.style.backgroundColor = element.datas.backgroundColor;



			// need secur
			if (typeof element.datas.textContent != 'undefined') target.textContent = element.datas.textContent;


		}
		else {
			console.log(element, target)
		}
	}
	addToMap(obj, append = false) {
		append === false ? this.map.appendChild(obj) : this.map.prepend(obj);
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
