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

	isOverlappingWalls(element1, element2) {
		const rect1 = element1.getBoundingClientRect();
		const rect2 = element2.getBoundingClientRect();

		const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
		const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

		const overlapArea = overlapX * overlapY;
		const element1Area = rect1.width * rect1.height;
		// console.log('element1:', element1)
		console.log('overlapArea:', overlapArea)
		console.log('element1Area:', element1Area)
		return overlapArea > 0;
		// return overlapArea > 0 && overlapArea >= element1Area * 0.5; // Condition de superposition ajustable
	}
	areElementsOverlapping(element1, element2) {
		const rect1 = element1.getBoundingClientRect();
		const rect2 = element2.getBoundingClientRect();

		const transform1 = this.getTransformMatrix(element1);
		const transform2 = this.getTransformMatrix(element2);

		console.log('x:', transform2)

		console.log('x:', transform1)

		const transformedRect1 = this.transformRect(rect1, transform1);
		const transformedRect2 = this.transformRect(rect2, transform2);

		const overlapX = Math.max(0, Math.min(transformedRect1.right, transformedRect2.right) - Math.max(transformedRect1.left, transformedRect2.left));
		const overlapY = Math.max(0, Math.min(transformedRect1.bottom, transformedRect2.bottom) - Math.max(transformedRect1.top, transformedRect2.top));

		const overlapArea = overlapX * overlapY;
		const element1Area = transformedRect1.width * transformedRect1.height;

		const overlapping = overlapArea > 0 && overlapArea >= element1Area * 0.5;

		const positions = {
			element1: {
				topLeft: { x: transformedRect1.left, y: transformedRect1.top },
				topRight: { x: transformedRect1.right, y: transformedRect1.top },
				bottomLeft: { x: transformedRect1.left, y: transformedRect1.bottom },
				bottomRight: { x: transformedRect1.right, y: transformedRect1.bottom }
			},
			element2: {
				topLeft: { x: transformedRect2.left, y: transformedRect2.top },
				topRight: { x: transformedRect2.right, y: transformedRect2.top },
				bottomLeft: { x: transformedRect2.left, y: transformedRect2.bottom },
				bottomRight: { x: transformedRect2.right, y: transformedRect2.bottom }
			}
		};

		console.log('x:', overlapping, positions)
		return { overlapping, positions };
	}
	getSommets(element) {
		const rect1 = element.getBoundingClientRect();
		// console.log('d', window.getComputedStyle(element))
		console.log('d', window.getComputedStyle(element))
		const transform1 = this.getTransformMatrix(element);
		const transformedRect1 = transform1 !== 'none' ? this.transformRect(rect1, transform1) : rect1;

		console.log('element:', element)
		console.log('rect1:', rect1)
		console.log('transform1:', transform1)
		console.log('transformedRect1:', transformedRect1)
		return transform1

		// const overlapX = Math.max(0, Math.min(transformedRect1.right, transformedRect2.right) - Math.max(transformedRect1.left, transformedRect2.left));
		// const overlapY = Math.max(0, Math.min(transformedRect1.bottom, transformedRect2.bottom) - Math.max(transformedRect1.top, transformedRect2.top));

		// const overlapArea = overlapX * overlapY;
		// const element1Area = transformedRect1.width * transformedRect1.height;

		// const overlapping = overlapArea > 0 && overlapArea >= element1Area * 0.5;

		// const positions = {
		// 	element1: {
		// 		topLeft: { x: transformedRect1.left, y: transformedRect1.top },
		// 		topRight: { x: transformedRect1.right, y: transformedRect1.top },
		// 		bottomLeft: { x: transformedRect1.left, y: transformedRect1.bottom },
		// 		bottomRight: { x: transformedRect1.right, y: transformedRect1.bottom }
		// 	},
		// 	element2: {
		// 		topLeft: { x: transformedRect2.left, y: transformedRect2.top },
		// 		topRight: { x: transformedRect2.right, y: transformedRect2.top },
		// 		bottomLeft: { x: transformedRect2.left, y: transformedRect2.bottom },
		// 		bottomRight: { x: transformedRect2.right, y: transformedRect2.bottom }
		// 	}
		// };

		// console.log('x:', overlapping, positions)
		// return { overlapping, positions };
	}
	getTransformMatrix(element) {
		const transform = window.getComputedStyle(element).getPropertyValue('transform');
		if (transform !== 'none' && transform !== '') {
			return transform;
		}
		return 'none';
	}

	transformRect(rect, transform) {
		const matrix = this.parseTransformMatrix(transform);
		const { x, y } = this.getTransformOrigin(rect, matrix);
		const transformedRect = this.transformCoordinates(rect, matrix, x, y);
		return transformedRect;
	}

	parseTransformMatrix(transform) {
		const match = transform.match(/^matrix\((.+)\)$/);
		if (match) {
			const values = match[1].split(',').map(parseFloat);
			return {
				a: values[0],
				b: values[1],
				c: values[2],
				d: values[3],
				e: values[4],
				f: values[5]
			};
		}
		return null;
	}

	getTransformOrigin(rect, matrix) {
		const { x, y } = rect;
		const { a, b, c, d, e, f } = matrix;
		const originX = e + x * a + y * c;
		const originY = f + x * b + y * d;
		return { x: originX, y: originY };
	}

	transformCoordinates(rect, matrix, originX, originY) {
		const { left, top, width, height } = rect;
		const { a, b, c, d, e, f } = matrix;
		const x1 = left - originX;
		const y1 = top - originY;
		const x2 = x1 + width;
		const y2 = y1 + height;

		const transformedX1 = x1 * a + y1 * c + originX;
		const transformedY1 = x1 * b + y1 * d + originY;
		const transformedX2 = x2 * a + y2 * c + originX;
		const transformedY2 = x2 * b + y2 * d + originY;

		const transformedRect = {
			left: Math.min(transformedX1, transformedX2),
			top: Math.min(transformedY1, transformedY2),
			right: Math.max(transformedX1, transformedX2),
			bottom: Math.max(transformedY1, transformedY2),
			width: Math.abs(transformedX2 - transformedX1),
			height: Math.abs(transformedY2 - transformedY1)
		};

		return transformedRect;
	}


}
