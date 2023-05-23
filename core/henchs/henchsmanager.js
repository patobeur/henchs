class HenchsManager {
	constructor() {
		this.henchs = []
		this.allPeons = ['alice', false]
		this.allPeons.forEach(element => {
			this.addPeon(element)
			// if (element) { this.addPeon(element); } else { this.addPeon(); }
		});
	}
	update() {
		this.updatePeon()
	}
	updatePeon() {
		for (let i = 0; i < this.henchs.length; i++) {
			// let a = Algebras.get_aleaEntreBornes(0, 100)
			let distance = Algebras.getDistanceXY(this.henchs[i], Players.players[Players.currentNumPlayer])

			// console.log(typeof this.henchs[i].master.id)

			if (typeof this.henchs[i].master.id === 'number'
				&& this.henchs[i].master.id >= 0
				&& this.henchs[i].master.id < Players.players.length
			) {
				// console.log('folow: ' + typeof this.henchs[i].master.id)

				//	 	##	  #
				//	   #  #
				//	   ####	  #	
				//	   #  #	  #	
				//	   #  #	  #	

				if (distance > 200 && this.henchs[i].master.inrange) {
					this.henchs[i].state = 'goToMaster'
					// console.log('distance > 200 && this.henchs[i].master.inrange')
				}
				if (distance > 50 && !this.henchs[i].master.inrange) {
					this.henchs[i].state = 'goToMaster'
					// console.log('distance > 50 && !this.henchs[i].master.inrange')
				}


			}

			switch (this.henchs[i].state) {
				case 'goToMaster':
					this.goToMaster(i, Players.currentNumPlayer, distance)
					break;

				default:
					break;
			}
		}
	}

	goToMaster(peonId, playerId, distance) {
		let i = peonId
		this.henchs[i].theta = Algebras.get_DegreeWithTwoPos(
			this.henchs[i].datas.left,
			this.henchs[i].datas.top,
			Players.players[playerId].datas.left,
			Players.players[playerId].datas.top
		)
		let next2DPos = Algebras.get_Next2DPos(this.henchs[i])

		this.henchs[i].datas.left = next2DPos.x
		this.henchs[i].datas.top = next2DPos.y
		this.henchs[i].div.style.top = this.henchs[i].datas.top + 'px'
		this.henchs[i].div.style.left = this.henchs[i].datas.left + 'px'
		this.henchs[i].divs['peontheta'].style.rotate = (this.henchs[i].theta + 90) + 'deg'
		if (distance < 51 && !this.henchs[i].master.inrange) {
			this.henchs[i].master.inrange = true
			this.henchs[i].state = ''
			// console.log('reset' + this.henchs[i].id)
		}

	}

	get_DegreeWithTwoPos(fromX, fromY, destX, destY) {
		var nextY = fromY - destY;
		var nextX = fromX - destX;
		var theta = Math.atan2(-nextY, -nextX); // 0° = east
		theta *= 180 / Math.PI; // radians to degrees
		if (theta < 0) theta += 360; // negative case
		return theta;
	}
	getPeonGrid(peon) {
		peon.grid = Maps.getCurrentGridPos(peon.datas)
	}
	addPeon(peonName) {
		let newPeon = this.getAPeon(peonName)
		newPeon.master.id = Players.currentNumPlayer
		this.henchs.push(newPeon)
	}
	getAPeon(peonName = false) {

		let peon = {
			id: this.henchs.length,
			name: 'peon_' + this.henchs.length,
			master: { id: false, inrange: false },
			type: 'Alice',
			state: false,
			div: document.createElement('div'),
			divs: { peontheta: document.createElement('div') },
			theta: 0,
			speed: 1,
			datas: {
				backgroundColor: 'red',
				className: 'peon ' + (peonName != false ? peonName : 'bob'),
				width: 3,
				height: 3,
				top: 0,
				left: 0,
				zIndex: 1
			},
			setmasterid: (id) => { this.master.id = id }
		};
		peon.div.className = peon.datas.className
		peon.divs['peontheta'].className = 'peontheta'
		peon.div.appendChild(peon.divs['peontheta'])
		// peon.div.style.backgroundColor = peon.datas.backgroundColor

		peon.div.style.width = peon.datas.width + 'px'
		peon.div.style.height = peon.datas.height + 'px'
		peon.div.style.top = peon.datas.top + 'px'
		peon.div.style.left = peon.datas.left + 'px'


		return peon
	}
	setHenchsAleaMapPos() {
		for (let i = 0; i < this.henchs.length; i++) {
			this.henchs[i].datas.top = Algebras.get_aleaEntreBornes(0, Maps.mapsdatas.datas.height)
			this.henchs[i].datas.left = Algebras.get_aleaEntreBornes(0, Maps.mapsdatas.datas.width)
			this.henchs[i].div.style.top = this.henchs[i].datas.top + 'px'
			this.henchs[i].div.style.left = this.henchs[i].datas.left + 'px'
			this.henchs[i].grid = Maps.getCurrentGridPos(this.henchs[i].datas)
		}
	}
}
