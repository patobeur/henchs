class MapsManager {
	constructor() {
		this.grid = { x: 100, y: 100, z: 100 }

		this.map = document.createElement('div')
		this.map.className = 'map'
		this.map.style.position = 'absolute'

		this.mapsdatas = this.getMapDatas(0)
		this.parts = []
		this.walls = []
		this.spawns = []
	}
	update() {
		// check colliding 

		if (Keyboard.isUsingMove()) {
			console.log('mooving')
			this.refreshMapPos()
		}
		// if no collide move map
	}
	changeToMap(num) {
		this.mapsdatas = this.getMapDatas(num)
	}
	getMapDatas(num) {
		if (!typeof num === 'number' || num < 0 || num >= MAPS.length) num = 0;
		return MAPS[num]
	}
	getCurrentGridPos(datas) {
		let x = datas.left > 0 ? Math.floor(datas.left / this.grid.x) + 1 : 1;
		let y = datas.top > 0 ? Math.floor(datas.top / this.grid.y) + 1 : 1;
		let z = datas.zIndex > 0 ? Math.floor(datas.zIndex / this.grid.z) + 1 : 1;
		return { x: x, y: y, z: z }
	}
	refreshMapPos() {
		// 	Players.players[Players.currentNumPlayer].datas.topB = Players.players[Players.currentNumPlayer].datas.top
		// 	Players.players[Players.currentNumPlayer].datas.leftB = Players.players[Players.currentNumPlayer].datas.left

		if (typeof this.map != 'undefined') {

			let left = Math.floor(window.innerWidth / 2)
			let top = Math.floor(window.innerHeight / 2)

			if (typeof Players != 'undefined') {
				if (Players.players[Players.currentNumPlayer].datas) {
					// this.map.style.left = (left + this.mapsdatas.datas.left) + 'px'
					// this.map.style.top = (top + this.mapsdatas.datas.top) + 'px'
					this.map.style.left = (left + this.mapsdatas.datas.left - Players.players[Players.currentNumPlayer].datas.left) + 'px'
					this.map.style.top = (top + this.mapsdatas.datas.top - Players.players[Players.currentNumPlayer].datas.top) + 'px'
				}
			}



			// let divClone = this.map.cloneNode(true)
			// divClone.style.left = (left + this.mapsdatas.datas.left - Players.players[Players.currentNumPlayer].datas.leftB) + 'px'
			// divClone.style.top = (top + this.mapsdatas.datas.top - Players.players[Players.currentNumPlayer].datas.topB) + 'px'

			// if (Players.isUsingMove()) {
			// 	let collide = this.isCollidingWithWalls(divClone)

			// }

			// console.log(Players.players[Players.currentNumPlayer].datas.leftB)
			// if (Players.players[Players.currentNumPlayer].collide === true) {
			// 	Players.players[Players.currentNumPlayer].datas.topB = Players.players[Players.currentNumPlayer].datas.top
			// 	Players.players[Players.currentNumPlayer].datas.leftB = Players.players[Players.currentNumPlayer].datas.left
			// }
			// else {
			// Players.players[Players.currentNumPlayer].datas.top = Players.players[Players.currentNumPlayer].datas.topB
			// Players.players[Players.currentNumPlayer].datas.left = Players.players[Players.currentNumPlayer].datas.leftB
			// }



			// PLAYER DATAS UPDATE REPUT
			// this.map.style.left = (left + this.mapsdatas.datas.left - Players.players[Players.currentNumPlayer].datas.left) + 'px'
			// this.map.style.top = (top + this.mapsdatas.datas.top - Players.players[Players.currentNumPlayer].datas.top) + 'px'
		}
	}
	displayMap() {
		this.map.style.width = this.mapsdatas.datas.width + 'px'
		this.map.style.height = this.mapsdatas.datas.height + 'px'

		// player spawns
		if (typeof this.mapsdatas.spawns === 'object' && this.mapsdatas.spawns.length > 0) {
			let start = 0;

			let spawn = document.createElement('div');
			this.appliqueCaA(this.mapsdatas.spawns[0], spawn)
			this.spawns.push(spawn)
			this.map.prepend(spawn)

			// this.mapsdatas.spawns.forEach(element => {
			// 	let start = 0;
			// 	console.log("element------------------------", element)
			// 	let spawn = document.createElement('div');
			// 	this.appliqueCaA(element, spawn)
			// 	this.spawns.push(spawn)
			// 	this.map.prepend(spawn)
			// });
		}
		// contents parts
		if (typeof this.mapsdatas.parts === 'object' && this.mapsdatas.parts.length > 0) {
			let job = this.mapsdatas.parts
			job.forEach(element => {
				if (typeof element.datas != 'undefined') {
					let part = document.createElement(element.tag)
					part.style.position = 'absolute'
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
					wall.style.position = 'absolute'
					this.appliqueCaA(element, wall)
					this.walls.push(wall)
					this.map.prepend(wall)
				}
			});
		}


		let left = Math.floor(window.innerWidth / 2)
		let top = Math.floor(window.innerHeight / 2)

		console.log(this.mapsdatas.spawns[0].top)
		console.log(this.mapsdatas.spawns[0].left)
		this.map.style.left = (left + this.mapsdatas.datas.left - this.mapsdatas.spawns[0].left) + 'px'
		this.map.style.top = (top + this.mapsdatas.datas.top - this.mapsdatas.spawns[0].top) + 'px'
		document.body.appendChild(this.map)
	}
	appliqueCaA(element, target) {
		if (typeof element.datas != 'undefined' && typeof target === 'object') {
			if (typeof element.datas.left != 'undefined') target.style.left = element.datas.left + 'px';
			if (typeof element.datas.top != 'undefined') target.style.top = element.datas.top + 'px';
			if (typeof element.datas.width != 'undefined') target.style.width = element.datas.width + 'px';
			if (typeof element.datas.height != 'undefined') target.style.height = element.datas.height + 'px';
			if (typeof element.datas.transform != 'undefined') target.style.transform = 'rotate(' + element.datas.transform + 'deg)';

			if (typeof element.datas.className != 'undefined') target.className = element.datas.className;
			if (typeof element.datas.src != 'undefined') target.src = element.datas.src;
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
			let colliding = Algebras.overlapping(elem, item)

			console.log(colliding)
			if (collide === false && colliding === true) {
				collide = true
			}
		});
		console.log('colliding:' + collide)
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
