"use strict";
class MouseFactory {
	constructor() {
		this.pos = { x: 0, y: 0 };
		this.mousePositionOnScreen = { x: Number(0), y: Number(0), z: Number(0) }
		this.mousePositionOnMap = { x: Number(0), y: Number(0), z: Number(0) }
		this.realPositionOnMap = { x: Number(0), y: Number(0), z: Number(1) }
		this.#init()
	}
	#init() {
		document.body.onmousemove = (event) => {
			this.pos = { x: event.clientX, y: event.clientY };
		}

	}
	nocontext() {
		document.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});
	}
}
