class Component {
	get type() {
		return this.constructor.name;
	}

	constructor(data) {
		this.data = data;
	}
} 

class Entity {
	constructor() {
		this.components = [];
	}
	
	get(component) {
		return this.components.find(c => c.type === component.prototype.constructor.name);
	}

	set(component) {
		this.components.push(component)
	}
}

class System {
	constructor(components, callback) {
		this.components = components;
		this.callback = callback;
	}

	run(entities) {
		entities.forEach(e => 
			this.components.every(c => e.get(c) !== undefined) &&
			this.callback(e)
		);
	}
}
