class PlayerManager {
	constructor() {
		this.init()
	}
	init() {
		this.diagonalspeedratio = 1.7;
		this.currentNumPlayer = 0
		this.nbPlayers = 2
		this.currentNumPlayer = Number(0)
		this.players = []
		this.setPlayers()
		this.setOya()
		this.setOyaDivs()
	}
	update() {
		let acting = false
		if (this.isUsingSkills()) {
			this.checkActionSkill();
			acting = true;
		}
		if (this.isUsingMove()) {
			this.movePlayer();
			// check player overlapping parts
			Maps.isOverlappingParts();
			acting = true;
		}

		//if (!acting) this.regen()
	}
	setPlayers() {
		for (let i = 0; i < this.nbPlayers; i++) {
			this.addAPlayer(i)
			this.TrailDotManager(i)
		}
		// this.TrailDotManager(this.currentNumPlayer)
	}
	setOyaDivs() {
		let divs = {
			playerMire: document.createElement('div'),
			playerRangeA: document.createElement('div'),
			playerVisual: document.createElement('div'),
			playerCollid: document.createElement('div')
		}
		divs.playerMire.className = "mire"
		divs.playerRangeA.className = "rangeA"
		divs.playerVisual.className = "visual"
		divs.playerCollid.className = "collid"

		// divs.playerMire.appendChild(divs.playerCollid)
		divs.playerMire.appendChild(divs.playerRangeA)
		divs.playerMire.appendChild(divs.playerVisual)

		// divs.playerVisual.className = "player " + this.players[this.currentNumPlayer].anime
		// divs.playerVisual.style.width = this.players[this.currentNumPlayer].datas.width + "px"
		// divs.playerVisual.style.height = this.players[this.currentNumPlayer].datas.height + "px"
		// divs.playerVisual.style.height = this.players[this.currentNumPlayer].datas.height + "px"
		this.OyaDivs = divs

		this.OyaDivs.playerVisual.className = "visual " + this.players[this.currentNumPlayer].anime
		this.OyaDivs.playerVisual.style.width = this.players[this.currentNumPlayer].datas.width + "px"
		this.OyaDivs.playerVisual.style.height = this.players[this.currentNumPlayer].datas.height + "px"

		this.OyaDivs.playerCollid.style.width = this.players[this.currentNumPlayer].datas.width + "px"
		this.OyaDivs.playerCollid.style.height = this.players[this.currentNumPlayer].datas.height + "px"

		console.log('----------------------------')
		console.log(this.OyaDivs)
		console.log('----------------------------')
	}
	addToBody() {
		document.body.append(this.OyaDivs.playerMire)
	}
	setOya() {
		this.Oya = this.players[this.currentNumPlayer]
	}
	setNextOya() {
		this.Oya = this.players[(this.currentNumPlayer < this.players.length - 1 ? this.currentNumPlayer++ : 0)]
	}
	setPlayerInitialPos() {
		for (let i = 0; i < this.nbPlayers; i++) {
			this.players[i].datas.top = Algebras.get_aleaEntreBornes(0, Maps.mapsdatas.datas.height)
			this.players[i].datas.left = Algebras.get_aleaEntreBornes(0, Maps.mapsdatas.datas.width)
			this.players[i].grid = Maps.getCurrentGridPos(this.players[i].datas);
		}
	}
	addAPlayer(i = false) {
		let newNum = i ?? this.players.length
		this.players[newNum] = {
			maxDotsDist: 10,
			ovelap: false,
			anime: 'idle',
			oldAnime: 'idle',
			map: Number(0),
			theta: 0,
			datas: {
				width: 24, height: 24,
				top: 0, left: 0,
				topB: 0, leftB: 0,
				zIndex: 1
			},
			shape: {
				rayon: 0, // rayon
				color: 'red',
				speed: 2,
			},
			ismoving: false,
			xp: 0,
			stats: {
				hp: { current: 100, min: 0, max: 100, regen: 1 },
				mana: { current: 100, min: 0, max: 100, regen: 1 }
			},
			options: {
				update: true,
				trail: true
			},
			keyboard: new KeyboardControls(),
			// div: document.createElement('div'),
			update: () => {

			}

		}

		this.players[newNum].shape.rayon = Algebras.calculerRayon(
			this.players[newNum].datas.width,
			this.players[newNum].datas.height
		)
	}
	TrailDotManager(currentNumPlayer) {
		this.players[currentNumPlayer].adddots = () => {
			let div = document.createElement('div')
			div.className = "dot"
			div.style.left = (this.players[currentNumPlayer].datas.left - 2.5) + 'px'
			div.style.top = (this.players[currentNumPlayer].datas.top - 2.5) + 'px'
			if (this.players[currentNumPlayer].allDots.length > 0) {
				this.players[currentNumPlayer].allDots.splice(0, 1)
			}
			this.players[currentNumPlayer].allDots.push(div);
			this.players[currentNumPlayer].addTrailDotToMap(div);
		};
		this.players[currentNumPlayer].addTrailDotToMap = (div) => {
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
		this.players[currentNumPlayer].addTrailDot = () => {
			if (this.players[this.currentNumPlayer].dotDist > this.players[this.currentNumPlayer].maxDotsDist) {
				this.players[this.currentNumPlayer].adddots()
				this.players[this.currentNumPlayer].dotDist = 0
			}
			else { this.players[this.currentNumPlayer].dotDist++ }
		};
		this.players[currentNumPlayer].dotDist = 0;
		this.players[currentNumPlayer].allDots = [];

	}
	regen() {
		console.dir('regen')
	}
	isUsingSkills() {
		return (this.players[this.currentNumPlayer].keyboard.skills[0])
	}

	// ----------------------------------

	// act(skillName) {
	// 	let skill = this.player.skills[skillName]
	// 	let errors = 0;
	// 	for (let stat in skill.costs) {
	// 		if (Object.hasOwnProperty.call(skill.costs, stat)) {
	// 			let need = skill.costs[stat];
	// 			let current = Players.player.stats[stat].current;
	// 			if (current < need) {
	// 				Con.addMessage('you need : ' + (need - current) + 'pts de ' + stat + '. Attendez un petit moment avant de recommencer !')
	// 				errors++
	// 			}
	// 		}
	// 	}
	// 	if (errors < 1) {
	// 		for (const stat in skill.costs) {
	// 			if (Object.hasOwnProperty.call(skill.costs, stat)) {
	// 				let need = skill.costs[stat];
	// 				Players.player.stats[stat].current -= need
	// 				Svg.updateJauges(stat)
	// 			}
	// 		}

	// 		Con.addMessage('Performing ' + skillName + ' ...')
	// 		this.player.skills[skillName].updateCd()

	// 		setTimeout(() => {
	// 			this.player.skills[skillName].cd = true;
	// 			Con.addMessage(skillName + ' is ok')
	// 		}, this.player.skills[skillName].cdDelay, false);

	// 	}
	// 	else {
	// 		Con.addMessage('Dsl !!! vous n avez cd qu il faut !!!')
	// 	}
	// }
	// checkActionSkill() {
	// 	let skills = this.player.skills
	// 	for (const skillname in skills) {
	// 		if (Object.hasOwnProperty.call(skills, skillname)) {
	// 			if (skills[skillname].cd === true) this.act(skillname)
	// 		}
	// 	}
	// }
	isUsingMove() {
		return (this.players[this.currentNumPlayer].keyboard.way[0] ||
			this.players[this.currentNumPlayer].keyboard.way[2] ||
			this.players[this.currentNumPlayer].keyboard.way[1] ||
			this.players[this.currentNumPlayer].keyboard.way[3]
		)
	}

	setAnimeClass() {
		if (this.players[this.currentNumPlayer].oldAnime != this.players[this.currentNumPlayer].anime) {
			this.OyaDivs.playerVisual.className = 'visual ' + this.players[this.currentNumPlayer].anime
			this.players[this.currentNumPlayer].oldAnime = this.players[this.currentNumPlayer].anime
		}
	}

	movePlayer() {
		let P = this.players[this.currentNumPlayer]
		// way= [top,right,bottom,left]	


		if (P.options.trail) {
			P.addTrailDot()
		}

		if (P.options.update) {

			//get current grid 
			P.grid = Maps.getCurrentGridPos(P.datas);

			let way = P.keyboard.way;
			let speed = P.shape.speed;

			// adjust speed while diagonal move
			if ((way[0] || way[2]) && (way[1] || way[3])) { speed = Math.floor(speed / this.diagonalspeedratio); }



			// update move datas


			// if (P.collide === false) {
			if (way[0] && !way[2]) { P.datas.topB -= speed; }
			if (way[2] && !way[0]) { P.datas.topB += speed; }
			if (way[1] && !way[3]) { P.datas.leftB += speed; }
			if (way[3] && !way[1]) { P.datas.leftB -= speed; }

			if (way[0] && !way[2]) { P.datas.top -= speed; }
			if (way[2] && !way[0]) { P.datas.top += speed; }
			if (way[1] && !way[3]) { P.datas.left += speed; }
			if (way[3] && !way[1]) { P.datas.left -= speed; }
			// }

			// P.collide = Maps.isOverlappingWalls()
			// console.log(P.datas.leftB)

			// if (P.collide === true) {
			// 	if (way[0] && !way[2]) { P.datas.top += speed; }
			// 	if (way[2] && !way[0]) { P.datas.top -= speed; }
			// 	if (way[1] && !way[3]) { P.datas.left -= speed; }
			// 	if (way[3] && !way[1]) { P.datas.left += speed; }
			// 	P.collide = false

			// }


			// if (P.collide === true) console.log('col')
			// if (way[0] && !way[2]) { P.datas.topB -= speed; }
			// if (way[2] && !way[0]) { P.datas.topB += speed; }
			// if (way[1] && !way[3]) { P.datas.leftB += speed; }
			// if (way[3] && !way[1]) { P.datas.leftB -= speed; }


			// update theta (rotation)
			P.theta = way[0] ? 0 : way[1] ? 90 : way[2] ? 180 : 270;

			// update className (gif animation)
			if (way[0] && this.oldAnime != 'top') { P.anime = 'top'; }
			if (way[2] && this.oldAnime != 'bottom') { P.anime = 'bottom'; }
			if (way[1] && this.oldAnime != 'left') { P.anime = 'left'; }
			if (way[3] && this.oldAnime != 'right') { P.anime = 'right'; }
			if (!way[0] && !way[1] && !way[2] && !way[3]) { P.anime = 'idle'; }

			this.setAnimeClass()

		}
	}
}
