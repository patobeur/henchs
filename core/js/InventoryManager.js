class InventoryManager {
	constructor() {
		this.stock = {}
		this.mess = []
	}
	start() {
		CLOG.add(this.constructor.name, 'started');

		// console.log('Inventory Manager started...')
		this.creatDivs()
	}
	creatDivs() {
		this.invent = document.createElement('div')
		this.invent.id = 'inventory'
		// Div

		// console.log('Divs Manager started...')
		this.allBags = Divs.createEle({
			tag: 'div',
			id: 'inventory',
			position: "absolute",
			width: 50 + 'px',
			height: 60 + 'px',
			// top: new Number(0),
			// left: new Number(0),
			// right: new Number(0),
			bottom: new Number(0),
			textContent: "🎒",
			backgroundColor: 'rgba(255,255,255,1)'
			// borderRadius: "1rem",
			// overflow: "hidden"
		})
		Divs.addTo(this.allBags, false)
		this.addCats()

	}
	addCats() {
		this.cats = Divs.createEle({
			tag: 'div',
			id: 'cats',
			backgroundColor: 'rgba(255,66,255,1)',
		})
		Divs.addTo(this.cats, this.allBags)

	}
	addStock(obj) {
		if (typeof obj == 'object' && typeof obj.type != 'undefined') {
			if (typeof this.stock[obj.type] === 'undefined') this.stock[obj.type] = [];
			if (typeof this.stock[obj.type] != 'undefined') this.stock[obj.type].push(obj);
			this.refresh()
		}
	}
	refresh() {
		this.cats.remove()
		this.addCats()

		for (const key in this.stock) {
			this.stock[key].forEach(elem => {
				console.log.log(key + ':')
				console.log.log(elem)
			})
		}

		// this.stock.forEach(element => {
		// 	console.log('jj:',element)
		// });
	}
}
