'use strict';

var FamousEngine = require('famous/core/FamousEngine');
var DOM = require('../DOM');

FamousEngine.init();


var scene = FamousEngine.createScene();

var div = DOM.DIV('Hello World');

scene.addChild(div)

div.addUIEvent('click');

div.onClick = function(ev) {
	console.log(ev)
};
