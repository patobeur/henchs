class GAME {
	constructor() {
		this.version = 0.1
		this.errors = []
		this.timeout = 10
		this.starter = true;
	}
	start() {
		Divs.start();
		// Players.setPlayerInitialPos()
		// Players.addToBody()
		Maps.start();
		// TrailDotsManager
		Inventory.start();
		DotsTrailer.start(Maps.ghostDatas);
		// Maps.ghostDatas[0].trail.addTrailDot();
		// Players.players[Players.currentNumPlayer].adddots()
		// Inventory.add()

		this.run()
	}
	run(run = true) {
		if (run === false) this.timeout = false;
		setInterval(() => {
			this.update()
		}, this.timeout);
	}
	checkErrors() {
	}
	isTheEnd() {
		console.log('Capitaine ? on a un problème ici !');
		console.table(this.errors);
	}
	update() {
		Maps.update()
	}
}
const CLOG = new ConsoleLog()
const Algebra = new AlgebrasManager()
// const Players = new PlayerManager();
// const Henchs = new HenchsManager()
const Inventory = new InventoryManager()
const Divs = new DivsManager()
const Collisions = new CollisionsManager()
const DotsTrailer = new TrailDotsManager()
const Maps = new MapsManager()
const Keyboard = new KeyboardControls()
const Game = new GAME();
window.onload = () => {
	Game.start()
	CLOG.display('whatever')
	// Game.run(false)
}
