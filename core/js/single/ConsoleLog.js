class ConsoleLog {
	constructor() {
		this.list={none:[]};
		this.add=(string,cat = 'none')=>{
			if(typeof this.list[cat] === 'undefined'){this.list[cat]=[]}
			this.list[cat].push(string)
		}
		this.display=whatever=>{
			for (const key in this.list) {
				this.list[key].forEach(elem=>{this.log(key+':'+elem)})
			}
		}
		this.log=(string)=>{
			console.log(string);
		}
	}
}
