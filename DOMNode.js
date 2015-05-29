'use strict';

var Node = require('./Node');
var DOMElement = require('famous/dom-renderables/DOMElement');

function DOMNode(options) {
	Node.call(this);
	this.element = new DOMElement(this, options);
}

DOMNode.prototype = Object.create(Node.prototype);
DOMNode.prototype.constructor = DOMNode;

Object.defineProperties(DOMNode.prototype, {
	content: {
		set: function(content) {
			this.setContent(content);
		},
		get: function() {
			return this.getContent();
		}
	}
});

// TODO properties, attributes

module.exports = DOMNode;
