'use strict';

var CoreNode = require('famous/core/Node');

function Node(options) {
	CoreNode.call(this);

	this.position = new Position(this);
	this.scale = new Scale(this);
	this.rotation = new Rotation(this);
}

Node.prototype = Object.create(CoreNode.prototype);
Node.prototype.constructor = Node;

Node.prototype.onReceive = function(type, ev) {
	CoreNode.prototype.onReceive.call(this, type, ev);
	var methodName = 'on' + type[0].toUpperCase() + type.substr(1);
	if (this[methodName]) {
		this[methodName](ev);
	}
};

function Position(node) {
	this.node = node;
}

Object.defineProperties(Position.prototype, {
	x: {
		set: function(x) {
			this.node.setPosition(x, null, null);
		},
		get: function() {
			return this.node.getPosition()[0];
		}
	},
	y: {
		set: function(y) {
			this.node.setPosition(null, y, null);
		},
		get: function() {
			return this.node.getPosition()[1];
		}
	},
	z: {
		set: function(z) {
			this.node.setPosition(null, null, z);
		},
		get: function() {
			return this.node.getPosition()[2];
		}
	}
});

function Scale(node) {
	this.node = node;
}

Object.defineProperties(Scale.prototype, {
	x: {
		set: function(x) {
			this.node.setScale(x, null, null);
		},
		get: function() {
			return this.node.getScale()[0];
		}
	},
	y: {
		set: function(y) {
			this.node.setScale(null, y, null);
		},
		get: function() {
			return this.node.getScale()[1];
		}
	},
	z: {
		set: function(z) {
			this.node.setScale(null, null, z);
		},
		get: function() {
			return this.node.getScale()[2];
		}
	}
});

// Only supports euler angles
function Rotation(node) {
	this.node = node;
}

Object.defineProperties(Rotation.prototype, {
	x: {
		set: function(x) {
			this.node.setRotation(x, null, null);
		},
		get: function() {
			return this.node.getRotation()[0];
		}
	},
	y: {
		set: function(y) {
			this.node.setRotation(null, y, null);
		},
		get: function() {
			return this.node.getRotation()[1];
		}
	},
	z: {
		set: function(z) {
			this.node.setRotation(null, null, z);
		},
		get: function() {
			return this.node.getRotation()[2];
		}
	}
});

module.exports = Node;
