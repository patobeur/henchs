class InventoryManager {
	constructor() {
		this.stock = []
		this.mess = []
	}
	start() {
		console.log('Inventory Manager ok...')
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
