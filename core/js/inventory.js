class Inventory {
	constructor() {
		this.stock = []
		this.mess = []
	}
	addStock(obj) {
		if (obj.type != 'undefined' && this.stock[obj.type] != 'undefined') {
			this.stock[obj.type].push(obj)
		}
		else if (obj != 'undefined') {
			this.mess.push(obj)
		}
	}
}
