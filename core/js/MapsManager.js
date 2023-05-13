class MapsManager {
	constructor() {
		this.grid = { x: 100, y: 100, z: 100 }

		this.map = document.createElement('div')
		this.map.className = 'map'
		this.map.style.position = 'absolute'

		this.mapsdatas = this.getMapDatas(0)
		this.parts = []
		this.walls = []
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
		// let allMaps = [
		// 	{
		// 		name: 'one',
		// 		datas: { width: 500, height: 500, top: 0, left: 0, zIndex: 0 },
		// 		parts: [
		// 			{
		// 				name: 'one', tag: 'img', collide: false,
		// 				datas: {
		// 					width: 126, height: 62, top: 50, left: -50, zIndex: 0,
		// 					transform: -7,
		// 					src: 'img/one.png',
		// 					childs: [
		// 						{
		// 							name: 'one', tag: 'img',
		// 							datas: {
		// 								width: 126, height: 62, top: 50, left: -50, zIndex: 0,
		// 								src: 'img/one.png'
		// 							}
		// 						},
		// 					]
		// 				}
		// 			},
		// 			{
		// 				name: 'two', tag: 'img', collide: false,
		// 				datas: {
		// 					width: 168, height: 78,
		// 					top: 110, left: 160, zIndex: 0,
		// 					src: 'img/nuages/nuages_05.png'
		// 				},
		// 			},
		// 			{
		// 				name: 'two', tag: 'img', collide: false, datas: {
		// 					width: 63, height: 31,
		// 					top: 210, left: 210, zIndex: 0,
		// 					src: 'img/one.png'
		// 				},
		// 			}
		// 		],
		// 		walls: [
		// 			{ datas: { className: 'wall', width: 500, height: 5, top: 0, left: 0, zIndex: 0, transform: 0 } },
		// 			{ datas: { className: 'wall', width: 500, height: 5, top: 495, left: 0, zIndex: 0, transform: 0 } },
		// 			{ datas: { className: 'wall', width: 5, height: 500, top: 0, left: 0, zIndex: 0, transform: 0 } },
		// 			{ datas: { className: 'wall', width: 5, height: 500, top: 0, left: 495, zIndex: 0, transform: 0 } }
		// 		]
		// 	},
		// 	{ name: 'two', datas: { width: 1200, height: 300, top: 0, left: 0, zIndex: 0 } }
		// ]
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

		if (this.map != 'undefined') {
			let left = Math.floor(window.innerWidth / 2)
			let top = Math.floor(window.innerHeight / 2)



			this.map.style.left = (left + this.mapsdatas.datas.left) + 'px'
			this.map.style.top = (top + this.mapsdatas.datas.top) + 'px'

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
		if (typeof this.mapsdatas.parts === 'object' && this.mapsdatas.parts.length > 0) {
			this.mapsdatas.parts.forEach(element => {

				// console.log(element)
				let part = document.createElement(element.tag)
				part.className = 'part'
				// part.style.position = 'absolute'
				// part.style.left = element.datas.left + 'px'
				// part.style.top = element.datas.top + 'px'
				// part.style.width = element.datas.width + 'px'
				// part.style.height = element.datas.height + 'px'
				// part.style.transform = 'rotate(-7deg)'
				// part.src = element.datas.src
				if (element.datas != 'undefined') {
					part.style.position = 'absolute'
					if (element.datas.left != 'undefined') part.style.left = element.datas.left + 'px';
					if (element.datas.top != 'undefined') part.style.top = element.datas.top + 'px';
					if (element.datas.width != 'undefined') part.style.width = element.datas.width + 'px';
					if (element.datas.height != 'undefined') part.style.height = element.datas.height + 'px';
					if (element.datas.transform && element.datas.transform != 'undefined') part.style.transform = 'rotate(' + element.datas.transform + 'deg)';
					if (element.datas.src != 'undefined') part.src = element.datas.src;
				}

				this.parts.push(part)
				this.map.prepend(part)
				// console.log(element.tag + ' ' + part.className)
				// console.log(element)
			});
		}
		if (typeof this.mapsdatas.walls === 'object' && this.mapsdatas.walls.length > 0) {
			this.mapsdatas.walls.forEach(element => {

				// console.log('---------------')
				// console.log(element)
				let wall = document.createElement('div')
				if (element.datas != 'undefined') {
					wall.style.position = 'absolute'
					if (element.datas.className != 'undefined') wall.className = element.datas.className;
					if (element.datas.left != 'undefined') wall.style.left = element.datas.left + 'px';
					if (element.datas.top != 'undefined') wall.style.top = element.datas.top + 'px';
					if (element.datas.width != 'undefined') wall.style.width = element.datas.width + 'px';
					if (element.datas.height != 'undefined') wall.style.height = element.datas.height + 'px';
					if (element.datas.transform && element.datas.transform != 'undefined') wall.style.transform = 'rotate(' + element.datas.transform + 'deg)';
					if (element.datas.src != 'undefined') wall.src = element.datas.src;
				}
				this.walls.push(wall)
				this.map.prepend(wall)

				// console.log(element.tag + ' ' + part.className)
				// console.log(element)
			});
			// console.log(this.walls)
		}
		document.body.appendChild(this.map)
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
