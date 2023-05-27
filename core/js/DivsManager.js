class DivsManager {
	constructor() {
	}
	start() {

    }
    
	addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
    
	createEle = (attrib = false) => {
        // console.log(attrib)
		let newDiv = false
		if (typeof attrib === 'object') {
			attrib.newDiv = attrib.tag ?? 'div';
			attrib.id ? newDiv = document.createElement(attrib.tag) : '';

			attrib.id ? newDiv.id = attrib.id : '';
			attrib.borderRadius ? newDiv.style.borderRadius = attrib.borderRadius : '';
			attrib.zIndex ? newDiv.style.zIndex = attrib.zIndex : '';
			attrib.className ? newDiv.className = attrib.className : '';

			attrib.position ? newDiv.style.position = attrib.position : '';
			attrib.width ? newDiv.style.width = attrib.width : '';
			attrib.height ? newDiv.style.height = attrib.height : '';

			attrib.top ? newDiv.style.top = attrib.top : '';
			attrib.left ? newDiv.style.left = attrib.left : '';
			attrib.right ? newDiv.style.right = attrib.right : '';
			attrib.bottom ? newDiv.style.bottom = attrib.bottom : '';

			attrib.overflow ? newDiv.style.overflow = attrib.overflow : '';

			attrib.backgroundColor ? newDiv.style.backgroundColor = attrib.backgroundColor : '';
			attrib.color ? newDiv.style.color = attrib.color : '';

			attrib.display ? newDiv.style.display = attrib.display : '';
			attrib.flexDirection ? newDiv.style.flexDirection = attrib.flexDirection : '';
			attrib.justifyContent ? newDiv.style.justifyContent = attrib.justifyContent : '';
			attrib.alignItems ? newDiv.style.alignItems = attrib.alignItems : '';

			attrib.textContent ? newDiv.textContent = attrib.textContent : '';

		}
		return newDiv ?? false
	}
    sanitize=(string)=> {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match)=>(map[match]));
    }
    
	addTo(element, target = false, before = false) {
		if (target != false && typeof target === 'object') {
			!before ? target.appendChild(element) : target.prepend(element);
		} else {
			!before ? document.body.appendChild(element) : document.body.prepend(element);
		}
	}
}
