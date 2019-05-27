class Component {
	constructor(data) {
		this.data = data;
	}
} 

class Entity {
	constructor() {
		this.components = [];
	}

	type(component) {
		return component.prototype === undefined?
			component.constructor.name:
			component.prototype.constructor.name;
	}
	
	get(component) {
		return this.components.find(c => this.type(c) === this.type(component));
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
