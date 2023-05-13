class Algebras {
	constructor() {
	}
	calculerRayon(w, h) {
		const surfaceRect = w * h;
		const rayon = Math.sqrt(surfaceRect / Math.PI);
		return rayon.toFixed(2);
	}
	// getDistanceXY = (from, destination) => {
	// 	let AB = (destination.position.x) - (from.position.x)
	// 	let AC = (destination.position.y) - (from.position.y)
	// 	let distance = Math.sqrt((AB * AB) + (AC * AC))
	// 	console.log("distanceXY:", distance)
	// 	return distance
	// }
	getDistanceXY = (from, destination) => {
		let AB = (destination.datas.left) - (from.datas.left)
		let AC = (destination.datas.top) - (from.datas.top)
		let distance = Math.sqrt((AB * AB) + (AC * AC))
		return distance
	}
	getNextPos = (x, y, theta, speed) => {
		return {
			x: x - Math.sin(theta) * speed,
			y: y + Math.cos(theta) * speed
		}
	}
	get_aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
	get_DegreeWithTwoPos(fromX, fromY, destX, destY) {
		var nextY = fromY - destY;
		var nextX = fromX - destX;
		var theta = Math.atan2(-nextY, -nextX); // 0° = east
		theta *= 180 / Math.PI; // radians to degrees
		if (theta < 0) theta += 360; // negative case
		return theta;
	}
	get_Next2DPos(objwithdatas) {
		let datas = objwithdatas.datas
		let speed = objwithdatas.speed;
		let x = datas.left + (speed * Math.cos((objwithdatas.theta) * (Math.PI / 180)))
		let y = datas.top + (speed * Math.sin((objwithdatas.theta) * (Math.PI / 180)))
		return { x: x, y: y }
	}

	overlapping(element1, element2) {
		const rect1 = element1.getBoundingClientRect()
		const rect2 = element2.getBoundingClientRect()
		const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left))
		const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top))
		return overlapX * overlapY > 0;
	}
}
