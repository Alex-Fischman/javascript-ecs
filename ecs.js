class Component {
	get type() { return this.constructor.name; }

	constructor(data) {
		this.data = data;
	}
}

class Entity {
	get type() { return this.constructor.name; }

	constructor(id) {
		this.id = id;
		this.components = [];
	}
	
	get(type) { return this.components.find(c => c.type === type); }

	assign(component) {
		const included = this.get(component.type);
		if (included === undefined) this.components.push(component);
		else this.components[this.components.indexOf(included)] = component;
	}
}

class System {
	get type() { return this.constructor.name; }

	constructor(types, callback) {
		this.types = types;
		this.callback = callback;
	}

	run(entities) {
		entities.forEach(e => 
			this.types.every(t => e.get(t) !== undefined) &&
			this.callback(e)
		);
	}
}
