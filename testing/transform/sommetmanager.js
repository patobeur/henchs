"use strict";
class SommetsManager {
	constructor() {
		this.AllItems = []
		this.immat = new Number(0)
		// this.elements = null
		this.visual = {
			border: 1,
			rayon: 2,
		}
	}
	start(stringName, targetId, byid = false, display = false) {
		this.id = targetId
		this.target = document.getElementById(this.id)
		let allElements = this.getAllElements(stringName, byid)
		// this.initTarget(divId)



		if (allElements) {
			// if (typeof this.elements === 'object' && this.elements.length > 0) { }
			for (let index = 0; index < this.elements.length; index++) {

				this.AllItems[this.immat] = this.getNewItem(this.elements[index]);
				this.setItemCoords(this.AllItems[this.immat])
				if (display === true) this.afficheSommets(this.AllItems[this.immat]);
				this.immat++;
			}
		}
		return this.AllItems

	}
	setElementCoords(element) {
		let item = this.getNewItem(element)
		console.log(item)
		this.setItemCoords(item)
		this.afficheSommets(item);
	}
	initTarget(id) {
		let targetTest = document.getElementById(id)
		if (typeof targetTest === 'object') this.target = targetTest;
	}
	getAllElements(Name, byId) {
		this.elements = !byId ? document.getElementsByClassName(Name) : document.getElementById(Name);
		if (typeof this.elements === 'object' && this.elements.length > 0) {
			return true
		}
		return false
	}
	getNewItem(element) {
		let newItem = {
			immat: this.immat,
			element: element,
			rect: element.getBoundingClientRect(),
			coords: { topleft: { left: 0, top: 0 }, topright: { left: 0, top: 0 }, bottomleft: { left: 0, top: 0 }, bottomright: { left: 0, top: 0 } },
			rotate: false
		}
		var rotate = element.style.transform.match(/rotate\((\d+)(.+)\)/);
		if (rotate) {
			var [num, unit] = rotate.slice(1);
			newItem.rotate = num
		}
		return newItem
	}
	setItemCoords(item) {
		item.coords = {
			topleft: { left: item.rect.left, top: item.rect.top },
			topright: { left: item.rect.left + item.rect.width, top: item.rect.top },
			bottomleft: { left: item.rect.left, top: item.rect.top + item.rect.height },
			bottomright: { left: item.rect.left + item.rect.width, top: item.rect.top + item.rect.height },
			center: { left: item.rect.left + (item.rect.width / 2), top: item.rect.top + (item.rect.height / 2) }
		}
		if (item.rotate) {
			// apply rotation to vertices
			let v = ['topleft', 'topright', 'bottomleft', 'bottomright'] // vertices
			for (let index = 0; index < v.length; index++) {


				let dataName = v[index]

				// Exemple d'utilisation de la fonction
				var w = item.rect.width;  // largeur du carré
				var h = item.rect.heigth;  // hauteur du carré
				var Px = item.coords[dataName].left;  // Coordonnée x du point P
				var Py = item.coords[dataName].top;  // Coordonnée y du point P
				var Cx = item.coords['center'].left;  // Coordonnée x du centre C du cercle
				var Cy = item.coords['center'].top;  // Coordonnée y du centre C du cercle
				var R = Math.sqrt(w * w + h * h)
				R = R.toFixed(2);    // Rayon du cercle
				var rotate = item.rotate;  // Angle de rotation en degrés

				var nextPosition = sommetsManager.rotatePoint(Px, Py, Cx, Cy, R, rotate);

				item.coords[dataName].left = nextPosition.x
				item.coords[dataName].top = nextPosition.y

			}
		}
	}
	afficheSommets(item) {
		// let item = this.AllItems[immat]
		let divSommet = document.createElement('div');
		let v = ['topleft', 'topright', 'bottomleft', 'bottomright', 'center'] // vertices
		for (let index = 0; index < v.length; index++) {
			let elem = divSommet.cloneNode();
			elem.className = "vertice " + v[index];
			elem.style.width = (this.visual.rayon * 2) + 'px';
			elem.style.height = (this.visual.rayon * 2) + 'px';
			elem.style.left = (item.coords[v[index]].left - this.visual.rayon - this.visual.border) + 'px';
			elem.style.top = (item.coords[v[index]].top - this.visual.rayon - this.visual.border) + 'px';
			//if (this.target) this.target.appendChild(elem);
			//item.element.parentNode.appendChild(elem);
			document.body.appendChild(elem);
		}
	}
	rotatePoint(Px, Py, Cx, Cy, R, rotation) {
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
}
