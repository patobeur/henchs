class CollisionsManager {
	constructor() {
		this.withWalls = false;
		console.log('Collisions Manager ok...')
	}
	isCollidingWithWalls(elem, list) {
		this.withWalls = false
		list.forEach(item => {
			if (this.withWalls === false && this.isOverlapping(elem, item) === true) {
				console.log('colll')
				this.withWalls = true;
			}
		});
		return this.withWalls;
	}

	isOverlapping(element1, element2) {
		const rect1 = element1.getBoundingClientRect();
		const rect2 = element2.getBoundingClientRect();

		const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
		const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

		const overlapArea = overlapX * overlapY;
		// const element1Area = rect1.width * rect1.height;
		return overlapArea > 0;
	}
}
