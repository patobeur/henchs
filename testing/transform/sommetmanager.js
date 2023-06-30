class SommetsManager {
	constructor() {
		// this.setTargetContainerById('map')
		this.AllItems = []
		this.immat = new Number(0)
		this.visual = {
			border: 0,
			width: 4,
			height: 4,
		}
		this.error = false;
	}
	setTargetContainerById(targetId) {
		let tmpTarget = document.getElementById(targetId)
		if (typeof tmpTarget === 'object') this.targetMap = tmpTarget;
		this.targetMapRect = this.targetMap.getBoundingClientRect()
	}
	setElementCoords(element, display = false) {
		let item = this.getNewItem(element)
		this.setItemCoords(item)
		if (display && item.rotate) this.afficheSommets(item);
		return item.coords
	}
	getNewItem(element) {
		let newItem = {
			immat: this.immat,
			element: element,
			rect: element.getBoundingClientRect(),
			sizes: { w: element.offsetWidth, h: element.offsetHeight },
			// purpose is here
			coords: {
				topleft: {
					left: element.offsetLeft,
					top: element.offsetTop
				},
				topright: {
					left: element.offsetLeft + element.offsetWidth,
					top: element.offsetTop
				},
				bottomleft: {
					left: element.offsetLeft,
					top: element.offsetTop + element.offsetHeight
				},
				bottomright: {
					left: element.offsetLeft + element.offsetWidth,
					top: element.offsetTop + element.offsetHeight
				},
				center: {
					left: element.offsetLeft + (element.offsetWidth / 2),
					top: element.offsetTop + (element.offsetHeight / 2)
				}
			},
			rotate: false
		}
		var rotate = element.style.transform.match(/rotate\((\d+)(.+)\)/);
		if (rotate) {
			var [num, unit] = rotate.slice(1);
			newItem.rotate = num
			newItem.rotateUnit = unit
		}
		return newItem
	}
	setItemCoords(item) {
		// apply rotation to vertices
		if (item.rotate) {
			let v = ['topleft', 'topright', 'bottomleft', 'bottomright'] // vertices
			for (let index = 0; index < v.length; index++) {
				let dataName = v[index]
				var nextPosition = this.rotatePoint(
					item.coords[dataName].left, // Coordonnée x du point P
					item.coords[dataName].top, // Coordonnée y du point P
					// purpose is here
					item.coords['center'].left, // Coordonnée x du centre C du cercle
					item.coords['center'].top, // Coordonnée y du centre C du cercle
					item.rotate, // Angle de rotation en degrés
				);
				item.coords[dataName].left = nextPosition.x
				item.coords[dataName].top = nextPosition.y
			}
		}
	}
	rotatePoint(Px, Py, Cx, Cy, rotation) {
		// Convertit l'angle de rotation en radians
		var angleRad = rotation * Math.PI / 180;
		// Calcule les coordonnées du vecteur entre C et P
		var vectorX = Px - Cx;
		var vectorY = Py - Cy;
		// Calcule les nouvelles coordonnées après la rotation 
		var rotatedX = Math.cos(angleRad) * vectorX - Math.sin(angleRad) * vectorY;
		var rotatedY = Math.sin(angleRad) * vectorX + Math.cos(angleRad) * vectorY;
		// Calcule les nouvelles coordonnées absolues
		var newX = rotatedX + Cx;
		var newY = rotatedY + Cy;
		// Retourne les nouvelles coordonnées
		return {
			x: newX,
			y: newY
		};
	}
	afficheSommets(item) {
		let divSommet = document.createElement('div');
		let v = ['topleft', 'topright', 'bottomleft', 'bottomright', 'center'] // vertices
		for (let index = 0; index < v.length; index++) {

			let elem = divSommet.cloneNode();
			elem.className = "vertice " + v[index];
			elem.style.width = ((this.visual.width)) + 'px';
			elem.style.height = ((this.visual.height)) + 'px';
			elem.style.left = (item.coords[v[index]].left - (this.visual.width / 2) - (this.visual.border)) + 'px';
			elem.style.top = (item.coords[v[index]].top - (this.visual.height / 2) - (this.visual.border)) + 'px';
			// if (v[index] === "center") elem.textContent = 'x'
			if (this.targetMap) {
				// this.targetMap.appendChild(elem);
				item.element.insertAdjacentElement('afterend', elem);
			}
			else {
				document.body.appendChild(elem);
			}
		}
	}
	// -------------------------------------	
	hydrateItemsByClassName(ClassName, targetId, display = false) {
		this.setTargetContainerById(targetId)
		let purpose = []
		let allElements = document.getElementsByClassName(ClassName)
		if (allElements) {
			if (typeof allElements === 'object' && allElements.length > 0) {
				for (let index = 0; index < allElements.length; index++) {
					purpose.push(this.setElementCoords(allElements[index], display))
				}
			}
		}
		console.log(purpose)
	}
	// -------------------------------------	
	hydrateItemById(Id, targetId, display = false) {
		this.setTargetContainerById(targetId)
		let square = document.getElementById(Id)
		console.log(this.setElementCoords(square, display))
	}
}
