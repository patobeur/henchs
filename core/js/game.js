class GAME {
	constructor() {
		this.version = 0.1
		this.errors = []
		this.timeout = 10

	}
	start() {
		this.checkErrors()
		if (this.errors.length === 0) {
			// Players.setPlayerInitialPos()
			// Players.addToBody()
			Maps.displayMapOnce()
			// Players.players[Players.currentNumPlayer].adddots()
			this.run()
		}
		else this.isTheEnd()
	}
	run() {
		setInterval(() => {
			this.update()
		}, this.timeout);
	}
	stop() {
		this.timeout = 0
		this.run()
	}
	checkErrors() {
		// if (typeof Players === 'undefined') { this.errors.push('Class Players : Requis...') }
		if (typeof Algebras === 'undefined') { this.errors.push('Class Algebra : Requis...') }
		if (typeof Maps === 'undefined') { this.errors.push('Class Maps : Requis...') }
		if (typeof Keyboard === 'undefined') { this.errors.push('Class Keyboard : Requis...') }
	}
	isTheEnd() {
		this.stop()
		console.log('Capitaine ? on a un problème ici !');
		console.table(this.errors);
	}
	update() {
		console.log('updating')
		if (this.errors.length === 0) {
			// Players.update();
			// Henchs.update();
			Maps.update()
		}
		//else this.isTheEnd()
	}
}

const Algebra = new Algebras()
// const Players = new PlayerManager();
// const Henchs = new HenchsManager()
const Maps = new MapsManager()
const Keyboard = new KeyboardControls()
const Game = new GAME();

window.onload = () => {
	Game.start()
}
