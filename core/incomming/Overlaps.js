class Overlaps {
	constructor() {
	}
	areElementsOverlapping(element1, element2) {
		const rect1 = element1.getBoundingClientRect();
		const rect2 = element2.getBoundingClientRect();

		const transform1 = this.getTransformMatrix(element1);
		const transform2 = this.getTransformMatrix(element2);

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

	getTransformMatrix2(element) {
		const transform = window.getComputedStyle(element).getPropertyValue('transform');
		// console.log('--------')
		// console.log(element)
		// console.log('transform:', transform)
		if (transform !== 'none') {
			return transform;
		}
		return '';
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
