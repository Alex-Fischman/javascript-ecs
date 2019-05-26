class Component {
	constructor(data) {
		this.data = data;
	}
} 

class Entity {
	constructor(id) {
		this.id = id;
		this.components = [];
	}

	type(component) {
		return component.prototype === undefined?
			component.constructor.name:
			component.prototype.constructor.name;
	}
	
	get(component) { return this.components.find(c => this.type(c) === this.type(component)); }

	set(component) {
		const included = this.get(component);
		if (included === undefined) this.components.push(component);
		else this.components[this.components.indexOf(included)] = component;
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
