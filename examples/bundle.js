(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var DOMNode = require('./DOMNode');

function register(tagName) {
	tagName = tagName.toUpperCase();
	this[tagName] = this[tagName] || function(content, attributes, properties) {
		if (typeof content === 'object') {
			properties = attributes;
			attributes = content;
			content = '';
		}
		return new DOMNode({
			tagName: tagName,
			attributes: attributes,
			properties: properties,
			content: content
		});
	};
	return this[tagName];
}

var DOM = {
	register: register
};

// See http://www.w3.org/TR/html-markup/elements.html

[
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'command',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'map',
    'mark',
    'menu',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
].forEach(function (tagName) {
	DOM.register(tagName);
});

module.exports = DOM;

},{"./DOMNode":2}],2:[function(require,module,exports){
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

},{"./Node":3,"famous/dom-renderables/DOMElement":14}],3:[function(require,module,exports){
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

},{"famous/core/Node":10}],4:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * Camera is a component that is responsible for sending information to the renderer about where
 * the camera is in the scene.  This allows the user to set the type of projection, the focal depth,
 * and other properties to adjust the way the scenes are rendered.
 *
 * @class Camera
 *
 * @param {Node} node to which the instance of Camera will be a component of
 */
function Camera(node) {
    this._node = node;
    this._projectionType = Camera.ORTHOGRAPHIC_PROJECTION;
    this._focalDepth = 0;
    this._near = 0;
    this._far = 0;
    this._requestingUpdate = false;
    this._id = node.addComponent(this);
    this._viewTransform = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this._viewDirty = false;
    this._perspectiveDirty = false;
    this.setFlat();
}

Camera.FRUSTUM_PROJECTION = 0;
Camera.PINHOLE_PROJECTION = 1;
Camera.ORTHOGRAPHIC_PROJECTION = 2;

/**
 * @method
 *
 * @return {String} Name of the component
 */
Camera.prototype.toString = function toString() {
    return 'Camera';
};

/**
 * Gets object containing serialized data for the component
 *
 * @method
 *
 * @return {Object} the state of the component
 */
Camera.prototype.getValue = function getValue() {
    return {
        component: this.toString(),
        projectionType: this._projectionType,
        focalDepth: this._focalDepth,
        near: this._near,
        far: this._far
    };
};

/**
 * Set the components state based on some serialized data
 *
 * @method
 *
 * @param {Object} state an object defining what the state of the component should be
 *
 * @return {Boolean} status of the set
 */
Camera.prototype.setValue = function setValue(state) {
    if (this.toString() === state.component) {
        this.set(state.projectionType, state.focalDepth, state.near, state.far);
        return true;
    }
    return false;
};

/**
 * Set the internals of the component
 *
 * @method
 *
 * @param {Number} type an id corresponding to the type of projection to use
 * @param {Number} depth the depth for the pinhole projection model
 * @param {Number} near the distance of the near clipping plane for a frustum projection
 * @param {Number} far the distanct of the far clipping plane for a frustum projection
 * 
 * @return {Boolean} status of the set
 */
Camera.prototype.set = function set(type, depth, near, far) {
    if (!this._requestingUpdate) {
        this._node.requestUpdate(this._id);
        this._requestingUpdate = true;
    }
    this._projectionType = type;
    this._focalDepth = depth;
    this._near = near;
    this._far = far;
};

/**
 * Set the camera depth for a pinhole projection model
 *
 * @method
 *
 * @param {Number} depth the distance between the Camera and the origin
 *
 * @return {Camera} this
 */
Camera.prototype.setDepth = function setDepth(depth) {
    if (!this._requestingUpdate) {
        this._node.requestUpdate(this._id);
        this._requestingUpdate = true;
    }
    this._perspectiveDirty = true;
    this._projectionType = Camera.PINHOLE_PROJECTION;
    this._focalDepth = depth;
    this._near = 0;
    this._far = 0;

    return this;
};

/**
 * Gets object containing serialized data for the component
 *
 * @method
 *
 * @param {Number} near distance from the near clipping plane to the camera
 * @param {Number} far distance from the far clipping plane to the camera
 * 
 * @return {Camera} this
 */
Camera.prototype.setFrustum = function setFrustum(near, far) {
    if (!this._requestingUpdate) {
        this._node.requestUpdate(this._id);
        this._requestingUpdate = true;
    }

    this._perspectiveDirty = true;
    this._projectionType = Camera.FRUSTUM_PROJECTION;
    this._focalDepth = 0;
    this._near = near;
    this._far = far;

    return this;
};

/**
 * Set the Camera to have orthographic projection
 *
 * @method
 *
 * @return {Camera} this
 */
Camera.prototype.setFlat = function setFlat() {
    if (!this._requestingUpdate) {
        this._node.requestUpdate(this._id);
        this._requestingUpdate = true;
    }

    this._perspectiveDirty = true;
    this._projectionType = Camera.ORTHOGRAPHIC_PROJECTION;
    this._focalDepth = 0;
    this._near = 0;
    this._far = 0;

    return this;
};

/**
 * When the node this component is attached to updates, the Camera will
 * send new camera information to the Compositor to update the rendering
 * of the scene.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Camera.prototype.onUpdate = function onUpdate() {
    this._requestingUpdate = false;

    var path = this._node.getLocation();

    this._node
        .sendDrawCommand('WITH')
        .sendDrawCommand(path);

    if (this._perspectiveDirty) {
        this._perspectiveDirty = false;

        switch (this._projectionType) {
            case Camera.FRUSTUM_PROJECTION:
                this._node.sendDrawCommand('FRUSTUM_PROJECTION');
                this._node.sendDrawCommand(this._near);
                this._node.sendDrawCommand(this._far);
                break;
            case Camera.PINHOLE_PROJECTION:
                this._node.sendDrawCommand('PINHOLE_PROJECTION');
                this._node.sendDrawCommand(this._focalDepth);
                break;
            case Camera.ORTHOGRAPHIC_PROJECTION:
                this._node.sendDrawCommand('ORTHOGRAPHIC_PROJECTION');
                break;
        }
    }

    if (this._viewDirty) {
        this._viewDirty = false;

        this._node.sendDrawCommand('CHANGE_VIEW_TRANSFORM');
        this._node.sendDrawCommand(this._viewTransform[0]);
        this._node.sendDrawCommand(this._viewTransform[1]);
        this._node.sendDrawCommand(this._viewTransform[2]);
        this._node.sendDrawCommand(this._viewTransform[3]);

        this._node.sendDrawCommand(this._viewTransform[4]);
        this._node.sendDrawCommand(this._viewTransform[5]);
        this._node.sendDrawCommand(this._viewTransform[6]);
        this._node.sendDrawCommand(this._viewTransform[7]);

        this._node.sendDrawCommand(this._viewTransform[8]);
        this._node.sendDrawCommand(this._viewTransform[9]);
        this._node.sendDrawCommand(this._viewTransform[10]);
        this._node.sendDrawCommand(this._viewTransform[11]);

        this._node.sendDrawCommand(this._viewTransform[12]);
        this._node.sendDrawCommand(this._viewTransform[13]);
        this._node.sendDrawCommand(this._viewTransform[14]);
        this._node.sendDrawCommand(this._viewTransform[15]);
    }
};

/**
 * When the transform of the node this component is attached to
 * changes, have the Camera update its projection matrix and
 * if needed, flag to node to update.
 *
 * @method
 *
 * @param {Array} transform an array denoting the transform matrix of the node
 *
 * @return {Camera} this
 */
Camera.prototype.onTransformChange = function onTransformChange(transform) {
    var a = transform;
    this._viewDirty = true;

    if (!this._requestingUpdate) {
        this._node.requestUpdate(this._id);
        this._requestingUpdate = true;
    }

    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
    a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
    a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
    a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

    b00 = a00 * a11 - a01 * a10,
    b01 = a00 * a12 - a02 * a10,
    b02 = a00 * a13 - a03 * a10,
    b03 = a01 * a12 - a02 * a11,
    b04 = a01 * a13 - a03 * a11,
    b05 = a02 * a13 - a03 * a12,
    b06 = a20 * a31 - a21 * a30,
    b07 = a20 * a32 - a22 * a30,
    b08 = a20 * a33 - a23 * a30,
    b09 = a21 * a32 - a22 * a31,
    b10 = a21 * a33 - a23 * a31,
    b11 = a22 * a33 - a23 * a32,

    det = 1/(b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

    this._viewTransform[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    this._viewTransform[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    this._viewTransform[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    this._viewTransform[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    this._viewTransform[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    this._viewTransform[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    this._viewTransform[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    this._viewTransform[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    this._viewTransform[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    this._viewTransform[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    this._viewTransform[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    this._viewTransform[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    this._viewTransform[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    this._viewTransform[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    this._viewTransform[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    this._viewTransform[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
};

module.exports = Camera;

},{}],5:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * Channels are being used for interacting with the UI Thread when running in
 * a Web Worker or with the UIManager/ Compositor when running in single
 * threaded mode (no Web Worker).
 *
 * @class Channel
 * @constructor
 */
function Channel() {
    if (typeof self !== 'undefined' && self.window !== self) {
        this._enterWorkerMode();
    }
}


/**
 * Called during construction. Subscribes for `message` event and routes all
 * future `sendMessage` messages to the Main Thread ("UI Thread").
 *
 * Primarily used for testing.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Channel.prototype._enterWorkerMode = function _enterWorkerMode() {
    this._workerMode = true;
    var _this = this;
    self.addEventListener('message', function onmessage(ev) {
        _this.onMessage(ev.data);
    });
};

/**
 * Meant to be overriden by `Famous`.
 * Assigned method will be invoked for every received message.
 *
 * @type {Function}
 * @override
 *
 * @return {undefined} undefined
 */
Channel.prototype.onMessage = null;

/**
 * Sends a message to the UIManager.
 *
 * @param  {Any}    message Arbitrary message object.
 *
 * @return {undefined} undefined
 */
Channel.prototype.sendMessage = function sendMessage (message) {
    if (this._workerMode) {
        self.postMessage(message);
    }
    else {
        this.onmessage(message);
    }
};

/**
 * Meant to be overriden by the UIManager when running in the UI Thread.
 * Used for preserving API compatibility with Web Workers.
 * When running in Web Worker mode, this property won't be mutated.
 *
 * Assigned method will be invoked for every message posted by `famous-core`.
 *
 * @type {Function}
 * @override
 */
Channel.prototype.onmessage = null;

/**
 * Sends a message to the manager of this channel (the `Famous` singleton) by
 * invoking `onMessage`.
 * Used for preserving API compatibility with Web Workers.
 *
 * @private
 * @alias onMessage
 *
 * @param {Any} message a message to send over the channel
 *
 * @return {undefined} undefined
 */
Channel.prototype.postMessage = function postMessage(message) {
    return this.onMessage(message);
};

module.exports = Channel;

},{}],6:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * Equivalent of an Engine in the Worker Thread. Used to synchronize and manage
 * time across different Threads.
 *
 * @class  Clock
 * @constructor
 * @private
 */
function Clock () {
    this._time = 0;
    this._frame = 0;
    this._timerQueue = [];
    this._updatingIndex = 0;

    this._scale = 1;
    this._scaledTime = this._time;
}

/**
 * Sets the scale at which the clock time is passing.
 * Useful for slow-motion or fast-forward effects.
 * 
 * `1` means no time scaling ("realtime"),
 * `2` means the clock time is passing twice as fast,
 * `0.5` means the clock time is passing two times slower than the "actual"
 * time at which the Clock is being updated via `.step`.
 *
 * Initally the clock time is not being scaled (factor `1`).
 * 
 * @method  setScale
 * @chainable
 * 
 * @param {Number} scale    The scale at which the clock time is passing.
 *
 * @return {Clock} this
 */
Clock.prototype.setScale = function setScale (scale) {
    this._scale = scale;
    return this;
};

/**
 * @method  getScale
 * 
 * @return {Number} scale    The scale at which the clock time is passing.
 */
Clock.prototype.getScale = function getScale () {
    return this._scale;
};

/**
 * Updates the internal clock time.
 *
 * @method  step
 * @chainable
 * 
 * @param  {Number} time high resolution timstamp used for invoking the
 *                       `update` method on all registered objects
 * @return {Clock}       this
 */
Clock.prototype.step = function step (time) {
    this._frame++;

    this._scaledTime = this._scaledTime + (time - this._time)*this._scale;
    this._time = time;

    for (var i = 0; i < this._timerQueue.length; i++) {
        if (this._timerQueue[i](this._scaledTime)) {
            this._timerQueue.splice(i, 1);
        }
    }
    return this;
};

/**
 * Returns the internal clock time.
 *
 * @method  now
 * 
 * @return  {Number} time high resolution timstamp used for invoking the
 *                       `update` method on all registered objects
 */
Clock.prototype.now = function now () {
    return this._scaledTime;
};

/**
 * Returns the internal clock time.
 *
 * @method  getTime
 * @deprecated Use #now instead
 * 
 * @return  {Number} time high resolution timstamp used for invoking the
 *                       `update` method on all registered objects
 */
Clock.prototype.getTime = Clock.prototype.now;

/**
 * Returns the number of frames elapsed so far.
 *
 * @method getFrame
 * 
 * @return {Number} frames
 */
Clock.prototype.getFrame = function getFrame () {
    return this._frame;
};

/**
 * Wraps a function to be invoked after a certain amount of time.
 * After a set duration has passed, it executes the function and
 * removes it as a listener to 'prerender'.
 *
 * @method setTimeout
 *
 * @param {Function} callback function to be run after a specified duration
 * @param {Number} delay milliseconds from now to execute the function
 *
 * @return {Function} timer function used for Clock#clearTimer
 */
Clock.prototype.setTimeout = function (callback, delay) {
    var params = Array.prototype.slice.call(arguments, 2);
    var startedAt = this._time;
    var timer = function(time) {
        if (time - startedAt >= delay) {
            callback.apply(null, params);
            return true;
        }
        return false;
    };
    this._timerQueue.push(timer);
    return timer;
};


/**
 * Wraps a function to be invoked after a certain amount of time.
 *  After a set duration has passed, it executes the function and
 *  resets the execution time.
 *
 * @method setInterval
 *
 * @param {Function} callback function to be run after a specified duration
 * @param {Number} delay interval to execute function in milliseconds
 *
 * @return {Function} timer function used for Clock#clearTimer
 */
Clock.prototype.setInterval = function setInterval(callback, delay) {
    var params = Array.prototype.slice.call(arguments, 2);
    var startedAt = this._time;
    var timer = function(time) {
        if (time - startedAt >= delay) {
            callback.apply(null, params);
            startedAt = time;
        }
        return false;
    };
    this._timerQueue.push(timer);
    return timer;
};

/**
 * Removes previously via `Clock#setTimeout` or `Clock#setInterval`
 * registered callback function
 *
 * @method clearTimer
 * @chainable
 * 
 * @param  {Function} timer  previously by `Clock#setTimeout` or
 *                              `Clock#setInterval` returned callback function
 * @return {Clock}              this
 */
Clock.prototype.clearTimer = function (timer) {
    var index = this._timerQueue.indexOf(timer);
    if (index !== -1) {
        this._timerQueue.splice(index, 1);
    }
    return this;
};

module.exports = Clock;


},{}],7:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*jshint -W079 */

'use strict';

// TODO: Dispatch should be generalized so that it can work on any Node
// not just Contexts.

var Event = require('./Event');

/**
 * The Dispatch class is used to propogate events down the
 * scene graph.
 *
 * @class Dispatch
 * @param {Scene} context The context on which it operates
 * @constructor
 */
function Dispatch (context) {

    if (!context) throw new Error('Dispatch needs to be instantiated on a node');

    this._context = context; // A reference to the context
                             // on which the dispatcher
                             // operates

    this._queue = []; // The queue is used for two purposes
                      // 1. It is used to list indicies in the
                      //    Nodes path which are then used to lookup
                      //    a node in the scene graph.
                      // 2. It is used to assist dispatching
                      //    such that it is possible to do a breadth first
                      //    traversal of the scene graph.
}

/**
 * lookupNode takes a path and returns the node at the location specified
 * by the path, if one exists. If not, it returns undefined.
 *
 * @param {String} location The location of the node specified by its path
 *
 * @return {Node | undefined} The node at the requested path
 */
Dispatch.prototype.lookupNode = function lookupNode (location) {
    if (!location) throw new Error('lookupNode must be called with a path');

    var path = this._queue;

    _splitTo(location, path);

    if (path[0] !== this._context.getSelector()) return void 0;

    var children = this._context.getChildren();
    var child;
    var i = 1;
    path[0] = this._context;

    while (i < path.length) {
        child = children[path[i]];
        path[i] = child;
        if (child) children = child.getChildren();
        else return void 0;
        i++;
    }

    return child;
};

/**
 * dispatch takes an event name and a payload and dispatches it to the
 * entire scene graph below the node that the dispatcher is on. The nodes
 * receive the events in a breadth first traversal, meaning that parents
 * have the opportunity to react to the event before children.
 *
 * @param {String} event name of the event
 * @param {Any} payload the event payload
 *
 * @return {undefined} undefined
 */
Dispatch.prototype.dispatch = function dispatch (event, payload) {
    if (!event) throw new Error('dispatch requires an event name as it\'s first argument');

    var queue = this._queue;
    var item;
    var i;
    var len;
    var children;

    queue.length = 0;
    queue.push(this._context);

    while (queue.length) {
        item = queue.shift();
        if (item.onReceive) item.onReceive(event, payload);
        children = item.getChildren();
        for (i = 0, len = children.length ; i < len ; i++) queue.push(children[i]);
    }
};

/**
 * dispatchUIevent takes a path, an event name, and a payload and dispatches them in
 * a manner anologous to DOM bubbling. It first traverses down to the node specified at
 * the path. That node receives the event first, and then every ancestor receives the event
 * until the context.
 *
 * @param {String} path the path of the node
 * @param {String} event the event name
 * @param {Any} payload the payload
 *
 * @return {undefined} undefined
 */
Dispatch.prototype.dispatchUIEvent = function dispatchUIEvent (path, event, payload) {
    if (!path) throw new Error('dispatchUIEvent needs a valid path to dispatch to');
    if (!event) throw new Error('dispatchUIEvent needs an event name as its second argument');

    var queue = this._queue;
    var node;

    Event.call(payload);
    payload.node = this.lookupNode(path); // After this call, the path is loaded into the queue
                                          // (lookUp node doesn't clear the queue after the lookup)

    while (queue.length) {
        node = queue.pop(); // pop nodes off of the queue to move up the ancestor chain.
        if (node.onReceive) node.onReceive(event, payload);
        if (payload.propagationStopped) break;
    }
};

/**
 * _splitTo is a private method which takes a path and splits it at every '/'
 * pushing the result into the supplied array. This is a destructive change.
 *
 * @private
 * @param {String} string the specified path
 * @param {Array} target the array to which the result should be written
 *
 * @return {Array} the target after having been written to
 */
function _splitTo (string, target) {
    target.length = 0; // clears the array first.
    var last = 0;
    var i;
    var len = string.length;

    for (i = 0 ; i < len ; i++) {
        if (string[i] === '/') {
            target.push(string.substring(last, i));
            last = i + 1;
        }
    }

    if (i - last > 0) target.push(string.substring(last, i));

    return target;
}

module.exports = Dispatch;

},{"./Event":8}],8:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * The Event class adds the stopPropagation functionality
 * to the UIEvents within the scene graph.
 *
 * @constructor Event
 */
function Event () {
    this.propagationStopped = false;
    this.stopPropagation = stopPropagation;
}

/**
 * stopPropagation ends the bubbling of the event in the
 * scene graph.
 *
 * @method stopPropagation
 *
 * @return {undefined} undefined
 */
function stopPropagation () {
    this.propagationStopped = true;
}

module.exports = Event;


},{}],9:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Clock = require('./Clock');
var Scene = require('./Scene');
var Channel = require('./Channel');
var UIManager = require('../renderers/UIManager');
var Compositor = require('../renderers/Compositor');
var RequestAnimationFrameLoop = require('../render-loops/RequestAnimationFrameLoop');

var ENGINE_START = ['ENGINE', 'START'];
var ENGINE_STOP = ['ENGINE', 'STOP'];
var TIME_UPDATE = ['TIME', null];

/**
 * Famous has two responsibilities, one to act as the highest level
 * updater and another to send messages over to the renderers. It is
 * a singleton.
 *
 * @class FamousEngine
 * @constructor
 */
function FamousEngine() {
    this._updateQueue = []; // The updateQueue is a place where nodes
                            // can place themselves in order to be
                            // updated on the frame.

    this._nextUpdateQueue = []; // the nextUpdateQueue is used to queue
                                // updates for the next tick.
                                // this prevents infinite loops where during
                                // an update a node continuously puts itself
                                // back in the update queue.

    this._scenes = {}; // a hash of all of the scenes's that the FamousEngine
                         // is responsible for.

    this._messages = TIME_UPDATE;   // a queue of all of the draw commands to
                                    // send to the the renderers this frame.

    this._inUpdate = false; // when the famous is updating this is true.
                            // all requests for updates will get put in the
                            // nextUpdateQueue

    this._clock = new Clock(); // a clock to keep track of time for the scene
                               // graph.

    this._channel = new Channel();
    this._channel.onMessage = this.handleMessage.bind(this);
}


/**
 * An init script that initializes the FamousEngine with options
 * or default parameters.
 *
 * @method
 *
 * @param {Object} options a set of options containing a compositor and a render loop
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.init = function init(options) {
    this.compositor = options && options.compositor || new Compositor();
    this.renderLoop = options && options.renderLoop || new RequestAnimationFrameLoop();
    this.uiManager = new UIManager(this.getChannel(), this.compositor, this.renderLoop);
    return this;
};

/**
 * Sets the channel that the engine will use to communicate to
 * the renderers.
 *
 * @method
 *
 * @param {Channel} channel     The channel to be used for communicating with
 *                              the `UIManager`/ `Compositor`.
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.setChannel = function setChannel(channel) {
    this._channel = channel;
    return this;
};

/**
 * Returns the channel that the engine is currently using
 * to communicate with the renderers.
 *
 * @method
 *
 * @return {Channel} channel    The channel to be used for communicating with
 *                              the `UIManager`/ `Compositor`.
 */
FamousEngine.prototype.getChannel = function getChannel () {
    return this._channel;
};

/**
 * _update is the body of the update loop. The frame consists of
 * pulling in appending the nextUpdateQueue to the currentUpdate queue
 * then moving through the updateQueue and calling onUpdate with the current
 * time on all nodes. While _update is called _inUpdate is set to true and
 * all requests to be placed in the update queue will be forwarded to the
 * nextUpdateQueue.
 *
 * @method
 *
 * @return {undefined} undefined
 */
FamousEngine.prototype._update = function _update () {
    this._inUpdate = true;
    var time = this._clock.now();
    var nextQueue = this._nextUpdateQueue;
    var queue = this._updateQueue;
    var item;

    this._messages[1] = time;

    while (nextQueue.length) queue.unshift(nextQueue.pop());

    while (queue.length) {
        item = queue.shift();
        if (item && item.onUpdate) item.onUpdate(time);
    }

    this._inUpdate = false;
};

/**
 * requestUpdates takes a class that has an onUpdate method and puts it
 * into the updateQueue to be updated at the next frame.
 * If FamousEngine is currently in an update, requestUpdate
 * passes its argument to requestUpdateOnNextTick.
 *
 * @method
 *
 * @param {Object} requester an object with an onUpdate method
 *
 * @return {undefined} undefined
 */
FamousEngine.prototype.requestUpdate = function requestUpdate (requester) {
    if (!requester)
        throw new Error(
            'requestUpdate must be called with a class to be updated'
        );

    if (this._inUpdate) this.requestUpdateOnNextTick(requester);
    else this._updateQueue.push(requester);
};

/**
 * requestUpdateOnNextTick is requests an update on the next frame.
 * If FamousEngine is not currently in an update than it is functionally equivalent
 * to requestUpdate. This method should be used to prevent infinite loops where
 * a class is updated on the frame but needs to be updated again next frame.
 *
 * @method
 *
 * @param {Object} requester an object with an onUpdate method
 *
 * @return {undefined} undefined
 */
FamousEngine.prototype.requestUpdateOnNextTick = function requestUpdateOnNextTick (requester) {
    this._nextUpdateQueue.push(requester);
};

/**
 * postMessage sends a message queue into FamousEngine to be processed.
 * These messages will be interpreted and sent into the scene graph
 * as events if necessary.
 *
 * @method
 *
 * @param {Array} messages an array of commands.
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.handleMessage = function handleMessage (messages) {
    if (!messages)
        throw new Error(
            'onMessage must be called with an array of messages'
        );

    var command;

    while (messages.length > 0) {
        command = messages.shift();
        switch (command) {
            case 'WITH':
                this.handleWith(messages);
                break;
            case 'FRAME':
                this.handleFrame(messages);
                break;
            default:
                throw new Error('received unknown command: ' + command);
        }
    }
    return this;
};

/**
 * handleWith is a method that takes an array of messages following the
 * WITH command. It'll then issue the next commands to the path specified
 * by the WITH command.
 *
 * @method
 *
 * @param {Array} messages array of messages.
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.handleWith = function handleWith (messages) {
    var path = messages.shift();
    var command = messages.shift();

    switch (command) {
        case 'TRIGGER': // the TRIGGER command sends a UIEvent to the specified path
            var type = messages.shift();
            var ev = messages.shift();

            this.getContext(path).getDispatch().dispatchUIEvent(path, type, ev);
            break;
        default:
            throw new Error('received unknown command: ' + command);
    }
    return this;
};

/**
 * handleFrame is called when the renderers issue a FRAME command to
 * FamousEngine. FamousEngine will then step updating the scene graph to the current time.
 *
 * @method
 *
 * @param {Array} messages array of messages.
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.handleFrame = function handleFrame (messages) {
    if (!messages) throw new Error('handleFrame must be called with an array of messages');
    if (!messages.length) throw new Error('FRAME must be sent with a time');

    this.step(messages.shift());
    return this;
};

/**
 * step updates the clock and the scene graph and then sends the draw commands
 * that accumulated in the update to the renderers.
 *
 * @method
 *
 * @param {Number} time current engine time
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.step = function step (time) {
    if (time == null) throw new Error('step must be called with a time');

    this._clock.step(time);
    this._update();

    if (this._messages.length) {
        this._channel.sendMessage(this._messages);
        this._messages.length = 2;
    }

    return this;
};

/**
 * returns the context of a particular path. The context is looked up by the selector
 * portion of the path and is listed from the start of the string to the first
 * '/'.
 *
 * @method
 *
 * @param {String} selector the path to look up the context for.
 *
 * @return {Context | Undefined} the context if found, else undefined.
 */
FamousEngine.prototype.getContext = function getContext (selector) {
    if (!selector) throw new Error('getContext must be called with a selector');

    var index = selector.indexOf('/');
    selector = index === -1 ? selector : selector.substring(0, index);

    return this._scenes[selector];
};

/**
 * returns the instance of clock within famous.
 *
 * @method
 *
 * @return {Clock} FamousEngine's clock
 */
FamousEngine.prototype.getClock = function getClock () {
    return this._clock;
};

/**
 * queues a message to be transfered to the renderers.
 *
 * @method
 *
 * @param {Any} command Draw Command
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.message = function message (command) {
    this._messages.push(command);
    return this;
};

/**
 * Creates a scene under which a scene graph could be built.
 *
 * @method
 *
 * @param {String} selector a dom selector for where the scene should be placed
 *
 * @return {Scene} a new instance of Scene.
 */
FamousEngine.prototype.createScene = function createScene (selector) {
    selector = selector || 'body';

    if (this._scenes[selector]) this._scenes[selector].dismount();
    this._scenes[selector] = new Scene(selector, this);
    return this._scenes[selector];
};

/**
 * Starts the engine running in the Main-Thread.
 * This effects **every** updateable managed by the Engine.
 *
 * @method
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.startEngine = function startEngine () {
    this._channel.sendMessage(ENGINE_START);
    return this;
};

/**
 * Stops the engine running in the Main-Thread.
 * This effects **every** updateable managed by the Engine.
 *
 * @method
 *
 * @return {FamousEngine} this
 */
FamousEngine.prototype.stopEngine = function stopEngine () {
    this._channel.sendMessage(ENGINE_STOP);
    return this;
};

module.exports = new FamousEngine();

},{"../render-loops/RequestAnimationFrameLoop":34,"../renderers/Compositor":35,"../renderers/UIManager":37,"./Channel":5,"./Clock":6,"./Scene":11}],10:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*jshint -W079 */

'use strict';

var Transform = require('./Transform');
var Size = require('./Size');

var TRANSFORM_PROCESSOR = new Transform();
var SIZE_PROCESSOR = new Size();

var IDENT = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

var ONES = [1, 1, 1];
var QUAT = [0, 0, 0, 1];

/**
 * Nodes define hierarchy and geometrical transformations. They can be moved
 * (translated), scaled and rotated.
 *
 * A Node is either mounted or unmounted. Unmounted nodes are detached from the
 * scene graph. Unmounted nodes have no parent node, while each mounted node has
 * exactly one parent. Nodes have an arbitary number of children, which can be
 * dynamically added using @{@link addChild}.
 *
 * Each Nodes have an arbitrary number of `components`. Those components can
 * send `draw` commands to the renderer or mutate the node itself, in which case
 * they define behavior in the most explicit way. Components that send `draw`
 * commands aare considered `renderables`. From the node's perspective, there is
 * no distinction between nodes that send draw commands and nodes that define
 * behavior.
 *
 * Because of the fact that Nodes themself are very unopinioted (they don't
 * "render" to anything), they are often being subclassed in order to add e.g.
 * components at initialization to them. Because of this flexibility, they might
 * as well have been called `Entities`.
 *
 * @example
 * // create three detached (unmounted) nodes
 * var parent = new Node();
 * var child1 = new Node();
 * var child2 = new Node();
 *
 * // build an unmounted subtree (parent is still detached)
 * parent.addChild(child1);
 * parent.addChild(child2);
 *
 * // mount parent by adding it to the context
 * var context = Famous.createContext("body");
 * context.addChild(parent);
 *
 * @class Node
 * @constructor
 */
function Node () {
    this._calculatedValues = {
        transform: new Float32Array(IDENT),
        size: new Float32Array(3)
    };

    this._requestingUpdate = false;
    this._inUpdate = false;

    this._updateQueue = [];
    this._nextUpdateQueue = [];

    this._freedComponentIndicies = [];
    this._components = [];

    this._freedChildIndicies = [];
    this._children = [];

    this._parent = null;
    this._globalUpdater = null;

    this._lastEulerX = 0;
    this._lastEulerY = 0;
    this._lastEulerZ = 0;
    this._lastEuler = false;

    this.value = new Node.Spec();
}

Node.RELATIVE_SIZE = Size.RELATIVE;
Node.ABSOLUTE_SIZE = Size.ABSOLUTE;
Node.RENDER_SIZE = Size.RENDER;
Node.DEFAULT_SIZE = Size.DEFAULT;

/**
 * A Node spec holds the "data" associated with a Node.
 *
 * @class Spec
 * @constructor
 *
 * @property {String} location path to the node (e.g. "body/0/1")
 * @property {Object} showState
 * @property {Boolean} showState.mounted
 * @property {Boolean} showState.shown
 * @property {Number} showState.opacity
 * @property {Object} offsets
 * @property {Float32Array.<Number>} offsets.mountPoint
 * @property {Float32Array.<Number>} offsets.align
 * @property {Float32Array.<Number>} offsets.origin
 * @property {Object} vectors
 * @property {Float32Array.<Number>} vectors.position
 * @property {Float32Array.<Number>} vectors.rotation
 * @property {Float32Array.<Number>} vectors.scale
 * @property {Object} size
 * @property {Float32Array.<Number>} size.sizeMode
 * @property {Float32Array.<Number>} size.proportional
 * @property {Float32Array.<Number>} size.differential
 * @property {Float32Array.<Number>} size.absolute
 * @property {Float32Array.<Number>} size.render
 */
Node.Spec = function Spec () {
    this.location = null;
    this.showState = {
        mounted: false,
        shown: false,
        opacity: 1
    };
    this.offsets = {
        mountPoint: new Float32Array(3),
        align: new Float32Array(3),
        origin: new Float32Array(3)
    };
    this.vectors = {
        position: new Float32Array(3),
        rotation: new Float32Array(QUAT),
        scale: new Float32Array(ONES)
    };
    this.size = {
        sizeMode: new Float32Array([Size.RELATIVE, Size.RELATIVE, Size.RELATIVE]),
        proportional: new Float32Array(ONES),
        differential: new Float32Array(3),
        absolute: new Float32Array(3),
        render: new Float32Array(3)
    };
    this.UIEvents = [];
};

/**
 * Determine the node's location in the scene graph hierarchy.
 * A location of `body/0/1` can be interpreted as the following scene graph
 * hierarchy (ignoring siblings of ancestors and additional child nodes):
 *
 * `Context:body` -> `Node:0` -> `Node:1`, where `Node:1` is the node the
 * `getLocation` method has been invoked on.
 *
 * @method getLocation
 *
 * @return {String} location (path), e.g. `body/0/1`
 */
Node.prototype.getLocation = function getLocation () {
    return this.value.location;
};

/**
 * @alias getId
 *
 * @return {String} the path of the Node
 */
Node.prototype.getId = Node.prototype.getLocation;

/**
 * Globally dispatches the event using the Scene's Dispatch. All nodes will
 * receive the dispatched event.
 *
 * @method emit
 *
 * @param  {String} event   Event type.
 * @param  {Object} payload Event object to be dispatched.
 *
 * @return {Node} this
 */
Node.prototype.emit = function emit (event, payload) {
    var current = this;

    while (current !== current.getParent()) {
        current = current.getParent();
    }

    current.getDispatch().dispatch(event, payload);
    return this;
};

// THIS WILL BE DEPRICATED
Node.prototype.sendDrawCommand = function sendDrawCommand (message) {
    this._globalUpdater.message(message);
    return this;
};

/**
 * Recursively serializes the Node, including all previously added components.
 *
 * @method getValue
 *
 * @return {Object}     Serialized representation of the node, including
 *                      components.
 */
Node.prototype.getValue = function getValue () {
    var numberOfChildren = this._children.length;
    var numberOfComponents = this._components.length;
    var i = 0;

    var value = {
        location: this.value.location,
        spec: this.value,
        components: new Array(numberOfComponents),
        children: new Array(numberOfChildren)
    };

    for (; i < numberOfChildren ; i++)
        if (this._children[i] && this._children[i].getValue)
            value.children[i] = this._children[i].getValue();

    for (i = 0 ; i < numberOfComponents ; i++)
        if (this._components[i] && this._components[i].getValue)
            value.components[i] = this._components[i].getValue();

    return value;
};

/**
 * Similar to @{@link getValue}, but returns the actual "computed" value. E.g.
 * a proportional size of 0.5 might resolve into a "computed" size of 200px
 * (assuming the parent has a width of 400px).
 *
 * @method getComputedValue
 *
 * @return {Object}     Serialized representation of the node, including
 *                      children, excluding components.
 */
Node.prototype.getComputedValue = function getComputedValue () {
    var numberOfChildren = this._children.length;

    var value = {
        location: this.value.location,
        computedValues: this._calculatedValues,
        children: new Array(numberOfChildren)
    };

    for (var i = 0 ; i < numberOfChildren ; i++)
        value.children[i] = this._children[i].getComputedValue();

    return value;
};

/**
 * Retrieves all children of the current node.
 *
 * @method getChildren
 *
 * @return {Array.<Node>}   An array of children.
 */
Node.prototype.getChildren = function getChildren () {
    return this._children;
};

/**
 * Retrieves the parent of the current node. Unmounted nodes do not have a
 * parent node.
 *
 * @method getParent
 *
 * @return {Node}       Parent node.
 */
Node.prototype.getParent = function getParent () {
    return this._parent;
};

/**
 * Schedules the @{@link update} function of the node to be invoked on the next
 * frame (if no update during this frame has been scheduled already).
 * If the node is currently being updated (which means one of the requesters
 * invoked requestsUpdate while being updated itself), an update will be
 * scheduled on the next frame.
 *
 * @method requestUpdate
 *
 * @param  {Object} requester   If the requester has an `onUpdate` method, it
 *                              will be invoked during the next update phase of
 *                              the node.
 *
 * @return {Node} this
 */
Node.prototype.requestUpdate = function requestUpdate (requester) {
    if (this._inUpdate || !this.isMounted())
        return this.requestUpdateOnNextTick(requester);
    this._updateQueue.push(requester);
    if (!this._requestingUpdate) this._requestUpdate();
    return this;
};

/**
 * Schedules an update on the next tick. Similarily to @{@link requestUpdate},
 * `requestUpdateOnNextTick` schedules the node's `onUpdate` function to be
 * invoked on the frame after the next invocation on the node's onUpdate function.
 *
 * @method requestUpdateOnNextTick
 *
 * @param  {Object} requester   If the requester has an `onUpdate` method, it
 *                              will be invoked during the next update phase of
 *                              the node.
 *
 * @return {Node} this
 */
Node.prototype.requestUpdateOnNextTick = function requestUpdateOnNextTick (requester) {
    this._nextUpdateQueue.push(requester);
    return this;
};

/**
 * Get the object responsible for updating this node.
 *
 * @method
 *
 * @return {Object} The global updater.
 */
Node.prototype.getUpdater = function getUpdater () {
    return this._globalUpdater;
};

/**
 * Checks if the node is mounted. Unmounted nodes are detached from the scene
 * graph.
 *
 * @method isMounted
 *
 * @return {Boolean}    Boolean indicating weather the node is mounted or not.
 */
Node.prototype.isMounted = function isMounted () {
    return this.value.showState.mounted;
};

/**
 * Checks if the node is visible ("shown").
 *
 * @method isShown
 *
 * @return {Boolean}    Boolean indicating weather the node is visible
 *                      ("shown") or not.
 */
Node.prototype.isShown = function isShown () {
    return this.value.showState.shown;
};

/**
 * Determines the node's relative opacity.
 * The opacity needs to be within [0, 1], where 0 indicates a completely
 * transparent, therefore invisible node, whereas an opacity of 1 means the
 * node is completely solid.
 *
 * @method getOpacity
 *
 * @return {Number}         Relative opacity of the node.
 */
Node.prototype.getOpacity = function getOpacity () {
    return this.value.showState.opacity;
};

/**
 * Determines the node's previously set mount point.
 *
 * @method getMountPoint
 *
 * @return {Float32Array}   An array representing the mount point.
 */
Node.prototype.getMountPoint = function getMountPoint () {
    return this.value.offsets.mountPoint;
};

/**
 * Determines the node's previously set align.
 *
 * @method getAlign
 *
 * @return {Float32Array}   An array representing the align.
 */
Node.prototype.getAlign = function getAlign () {
    return this.value.offsets.align;
};

/**
 * Determines the node's previously set origin.
 *
 * @method getOrigin
 *
 * @return {Float32Array}   An array representing the origin.
 */
Node.prototype.getOrigin = function getOrigin () {
    return this.value.offsets.origin;
};

/**
 * Determines the node's previously set position.
 *
 * @method getPosition
 *
 * @return {Float32Array}   An array representing the position.
 */
Node.prototype.getPosition = function getPosition () {
    return this.value.vectors.position;
};

/**
 * Returns the node's current rotation
 *
 * @method getRotation
 *
 * @return {Float32Array} an array of four values, showing the rotation as a quaternion
 */
Node.prototype.getRotation = function getRotation () {
    return this.value.vectors.rotation;
};

/**
 * Returns the scale of the node
 *
 * @method
 *
 * @return {Float32Array} an array showing the current scale vector
 */
Node.prototype.getScale = function getScale () {
    return this.value.vectors.scale;
};

/**
 * Returns the current size mode of the node
 *
 * @method
 *
 * @return {Float32Array} an array of numbers showing the current size mode
 */
Node.prototype.getSizeMode = function getSizeMode () {
    return this.value.size.sizeMode;
};

/**
 * Returns the current proportional size
 *
 * @method
 *
 * @return {Float32Array} a vector 3 showing the current proportional size
 */
Node.prototype.getProportionalSize = function getProportionalSize () {
    return this.value.size.proportional;
};

/**
 * Returns the differential size of the node
 *
 * @method
 *
 * @return {Float32Array} a vector 3 showing the current differential size
 */
Node.prototype.getDifferentialSize = function getDifferentialSize () {
    return this.value.size.differential;
};

/**
 * Returns the absolute size of the node
 *
 * @method
 *
 * @return {Float32Array} a vector 3 showing the current absolute size of the node
 */
Node.prototype.getAbsoluteSize = function getAbsoluteSize () {
    return this.value.size.absolute;
};

/**
 * Returns the current Render Size of the node. Note that the render size
 * is asynchronous (will always be one frame behind) and needs to be explicitely
 * calculated by setting the proper size mode.
 *
 * @method
 *
 * @return {Float32Array} a vector 3 showing the current render size
 */
Node.prototype.getRenderSize = function getRenderSize () {
    return this.value.size.render;
};

/**
 * Returns the external size of the node
 *
 * @method
 *
 * @return {Float32Array} a vector 3 of the final calculated side of the node
 */
Node.prototype.getSize = function getSize () {
    return this._calculatedValues.size;
};

/**
 * Returns the current world transform of the node
 *
 * @method
 *
 * @return {Float32Array} a 16 value transform
 */
Node.prototype.getTransform = function getTransform () {
    return this._calculatedValues.transform;
};

/**
 * Get the list of the UI Events that are currently associated with this node
 *
 * @method
 *
 * @return {Array} an array of strings representing the current subscribed UI event of this node
 */
Node.prototype.getUIEvents = function getUIEvents () {
    return this.value.UIEvents;
};

/**
 * Adds a new child to this node. If this method is called with no argument it will
 * create a new node, however it can also be called with an existing node which it will
 * append to the node that this method is being called on. Returns the new or passed in node.
 *
 * @method
 *
 * @param {Node | void} child the node to appended or no node to create a new node.
 *
 * @return {Node} the appended node.
 */
Node.prototype.addChild = function addChild (child) {
    var index = child ? this._children.indexOf(child) : -1;
    child = child ? child : new Node();

    if (index === -1) {
        index = this._freedChildIndicies.length ? this._freedChildIndicies.pop() : this._children.length;
        this._children[index] = child;

        if (this.isMounted() && child.onMount) {
            var myId = this.getId();
            var childId = myId + '/' + index;
            child.onMount(this, childId);
        }

    }

    return child;
};

/**
 * Removes a child node from another node. The passed in node must be
 * a child of the node that this method is called upon.
 *
 * @method
 *
 * @param {Node} child node to be removed
 *
 * @return {Boolean} whether or not the node was successfully removed
 */
Node.prototype.removeChild = function removeChild (child) {
    var index = this._children.indexOf(child);
    var added = index !== -1;
    if (added) {
        this._freedChildIndicies.push(index);

        this._children[index] = null;

        if (this.isMounted() && child.onDismount)
            child.onDismount();
    }
    return added;
};

/**
 * Each component can only be added once per node.
 *
 * @method addComponent
 *
 * @param {Object} component    An component to be added.
 * @return {Number} index       The index at which the component has been
 *                              registered. Indices aren't necessarily
 *                              consecutive.
 */
Node.prototype.addComponent = function addComponent (component) {
    var index = this._components.indexOf(component);
    if (index === -1) {
        index = this._freedComponentIndicies.length ? this._freedComponentIndicies.pop() : this._components.length;
        this._components[index] = component;

        if (this.isMounted() && component.onMount)
            component.onMount(this, index);

        if (this.isShown() && component.onShow)
            component.onShow();
    }

    return index;
};

/**
 * @method  getComponent
 *
 * @param  {Number} index   Index at which the component has been regsitered
 *                          (using `Node#addComponent`).
 * @return {*}              The component registered at the passed in index (if
 *                          any).
 */
Node.prototype.getComponent = function getComponent (index) {
    return this._components[index];
};

/**
 * Removes a previously via @{@link addComponent} added component.
 *
 * @method removeComponent
 *
 * @param  {Object} component   An component that has previously been added
 *                              using @{@link addComponent}.
 *
 * @return {Node} this
 */
Node.prototype.removeComponent = function removeComponent (component) {
    var index = this._components.indexOf(component);
    if (index !== -1) {
        this._freedComponentIndicies.push(index);
        if (this.isShown() && component.onHide)
            component.onHide();

        if (this.isMounted() && component.onDismount)
            component.onDismount();

        this._components[index] = null;
    }
    return component;
};

/**
 * Subscribes a node to a UI Event. All components on the node
 * will have the opportunity to begin listening to that event
 * and alerting the scene graph.
 *
 * @method
 *
 * @param {String} eventName the name of the event
 *
 * @return {undefined} undefined
 */
Node.prototype.addUIEvent = function addUIEvent (eventName) {
    var UIEvents = this.getUIEvents();
    var components = this._components;
    var component;

    var added = UIEvents.indexOf(eventName) !== -1;
    if (!added) {
        UIEvents.push(eventName);
        for (var i = 0, len = components.length ; i < len ; i++) {
            component = components[i];
            if (component && component.onAddUIEvent) component.onAddUIEvent(eventName);
        }
    }
};

/**
 * Private method for the Node to request an update for itself.
 *
 * @method
 * @private
 *
 * @param {Boolean} force whether or not to force the update
 *
 * @return {undefined} undefined
 */
Node.prototype._requestUpdate = function _requestUpdate (force) {
    if (force || (!this._requestingUpdate && this._globalUpdater)) {
        this._globalUpdater.requestUpdate(this);
        this._requestingUpdate = true;
    }
};

/**
 * Private method to set an optional value in an array, and
 * request an update if this changes the value of the array.
 *
 * @method
 *
 * @param {Array} vec the array to insert the value into
 * @param {Number} index the index at which to insert the value
 * @param {Any} val the value to potentially insert (if not null or undefined)
 *
 * @return {Boolean} whether or not a new value was inserted.
 */
Node.prototype._vecOptionalSet = function _vecOptionalSet (vec, index, val) {
    if (val != null && vec[index] !== val) {
        vec[index] = val;
        if (!this._requestingUpdate) this._requestUpdate();
        return true;
    }
    return false;
};

/**
 * Shows the node, which is to say, calls onShow on all of the
 * node's components. Renderable components can then issue the
 * draw commands necessary to be shown.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.show = function show () {
    var i = 0;
    var items = this._components;
    var len = items.length;
    var item;

    this.value.showState.shown = true;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onShow) item.onShow();
    }

    i = 0;
    items = this._children;
    len = items.length;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onParentShow) item.onParentShow();
    }
    return this;
};

/**
 * Hides the node, which is to say, calls onHide on all of the
 * node's components. Renderable components can then issue
 * the draw commands necessary to be hidden
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.hide = function hide () {
    var i = 0;
    var items = this._components;
    var len = items.length;
    var item;

    this.value.showState.shown = false;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onHide) item.onHide();
    }

    i = 0;
    items = this._children;
    len = items.length;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onParentHide) item.onParentHide();
    }
    return this;
};

/**
 * Sets the align value of the node. Will call onAlignChange
 * on all of the Node's components.
 *
 * @method
 *
 * @param {Number} x Align value in the x dimension.
 * @param {Number} y Align value in the y dimension.
 * @param {Number} z Align value in the z dimension.
 *
 * @return {Node} this
 */
Node.prototype.setAlign = function setAlign (x, y, z) {
    var vec3 = this.value.offsets.align;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    if (z != null) propogate = this._vecOptionalSet(vec3, 2, (z - 0.5)) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onAlignChange) item.onAlignChange(x, y, z);
        }
    }
    return this;
};

/**
 * Sets the mount point value of the node. Will call onMountPointChange
 * on all of the node's components.
 *
 * @method
 *
 * @param {Number} x MountPoint value in x dimension
 * @param {Number} y MountPoint value in y dimension
 * @param {Number} z MountPoint value in z dimension
 *
 * @return {Node} this
 */
Node.prototype.setMountPoint = function setMountPoint (x, y, z) {
    var vec3 = this.value.offsets.mountPoint;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    if (z != null) propogate = this._vecOptionalSet(vec3, 2, (z - 0.5)) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onMountPointChange) item.onMountPointChange(x, y, z);
        }
    }
    return this;
};

/**
 * Sets the origin value of the node. Will call onOriginChange
 * on all of the node's components.
 *
 * @method
 *
 * @param {Number} x Origin value in x dimension
 * @param {Number} y Origin value in y dimension
 * @param {Number} z Origin value in z dimension
 *
 * @return {Node} this
 */
Node.prototype.setOrigin = function setOrigin (x, y, z) {
    var vec3 = this.value.offsets.origin;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    if (z != null) propogate = this._vecOptionalSet(vec3, 2, (z - 0.5)) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onOriginChange) item.onOriginChange(x, y, z);
        }
    }
    return this;
};

/**
 * Sets the position of the node. Will call onPositionChange
 * on all of the node's components.
 *
 * @method
 *
 * @param {Number} x Position in x
 * @param {Number} y Position in y
 * @param {Number} z Position in z
 *
 * @return {Node} this
 */
Node.prototype.setPosition = function setPosition (x, y, z) {
    var vec3 = this.value.vectors.position;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    propogate = this._vecOptionalSet(vec3, 2, z) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onPositionChange) item.onPositionChange(x, y, z);
        }
    }

    return this;
};

/**
 * Sets the rotation of the node. Will call onRotationChange
 * on all of the node's components. This method takes either
 * Euler angles or a quaternion. If the fourth argument is undefined
 * Euler angles are assumed.
 *
 * @method
 *
 * @param {Number} x Either the rotation around the x axis or the magnitude in x of the axis of rotation.
 * @param {Number} y Either the rotation around the y axis or the magnitude in y of the axis of rotation.
 * @param {Number} z Either the rotation around the z axis or the magnitude in z of the axis of rotation.
 * @param {Number|undefined} w the amount of rotation around the axis of rotation, if a quaternion is specified.
 *
 * @return {undefined} undefined
 */
Node.prototype.setRotation = function setRotation (x, y, z, w) {
    var quat = this.value.vectors.rotation;
    var propogate = false;
    var qx, qy, qz, qw;

    if (w != null) {
        qx = x;
        qy = y;
        qz = z;
        qw = w;
        this._lastEulerX = null;
        this._lastEulerY = null;
        this._lastEulerZ = null;
        this._lastEuler = false;
    }
    else {
        if (x == null || y == null || z == null) {
            if (this._lastEuler) {
                x = x == null ? this._lastEulerX : x;
                y = y == null ? this._lastEulerY : y;
                z = z == null ? this._lastEulerZ : z;
            }
            else {
                var sp = -2 * (quat[1] * quat[2] - quat[3] * quat[0]);

                if (Math.abs(sp) > 0.99999) {
                    y = y == null ? Math.PI * 0.5 * sp : y;
                    x = x == null ? Math.atan2(-quat[0] * quat[2] + quat[3] * quat[1], 0.5 - quat[1] * quat[1] - quat[2] * quat[2]) : x;
                    z = z == null ? 0 : z;
                }
                else {
                    y = y == null ? Math.asin(sp) : y;
                    x = x == null ? Math.atan2(quat[0] * quat[2] + quat[3] * quat[1], 0.5 - quat[0] * quat[0] - quat[1] * quat[1]) : x;
                    z = z == null ? Math.atan2(quat[0] * quat[1] + quat[3] * quat[2], 0.5 - quat[0] * quat[0] - quat[2] * quat[2]) : z;
                }
            }
        }

        var hx = x * 0.5;
        var hy = y * 0.5;
        var hz = z * 0.5;

        var sx = Math.sin(hx);
        var sy = Math.sin(hy);
        var sz = Math.sin(hz);
        var cx = Math.cos(hx);
        var cy = Math.cos(hy);
        var cz = Math.cos(hz);

        var sysz = sy * sz;
        var cysz = cy * sz;
        var sycz = sy * cz;
        var cycz = cy * cz;

        qx = sx * cycz + cx * sysz;
        qy = cx * sycz - sx * cysz;
        qz = cx * cysz + sx * sycz;
        qw = cx * cycz - sx * sysz;

        this._lastEuler = true;
        this._lastEulerX = x;
        this._lastEulerY = y;
        this._lastEulerZ = z;
    }

    propogate = this._vecOptionalSet(quat, 0, qx) || propogate;
    propogate = this._vecOptionalSet(quat, 1, qy) || propogate;
    propogate = this._vecOptionalSet(quat, 2, qz) || propogate;
    propogate = this._vecOptionalSet(quat, 3, qw) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = quat[0];
        y = quat[1];
        z = quat[2];
        w = quat[3];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onRotationChange) item.onRotationChange(x, y, z, w);
        }
    }
    return this;
};

/**
 * Sets the scale of the node. The default value is 1 in all dimensions.
 * The node's components will have onScaleChanged called on them.
 *
 * @method
 *
 * @param {Number} x Scale value in x
 * @param {Number} y Scale value in y
 * @param {Number} z Scale value in z
 *
 * @return {Node} this
 */
Node.prototype.setScale = function setScale (x, y, z) {
    var vec3 = this.value.vectors.scale;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    propogate = this._vecOptionalSet(vec3, 2, z) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onScaleChange) item.onScaleChange(x, y, z);
        }
    }
    return this;
};

/**
 * Sets the value of the opacity of this node. All of the node's
 * components will have onOpacityChange called on them/
 *
 * @method
 *
 * @param {Number} val Value of the opacity. 1 is the default.
 *
 * @return {Node} this
 */
Node.prototype.setOpacity = function setOpacity (val) {
    if (val !== this.value.showState.opacity) {
        this.value.showState.opacity = val;
        if (!this._requestingUpdate) this._requestUpdate();

        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onOpacityChange) item.onOpacityChange(val);
        }
    }
    return this;
};

/**
 * Sets the size mode being used for determining the nodes final width, height
 * and depth.
 * Size modes are a way to define the way the node's size is being calculated.
 * Size modes are enums set on the @{@link Size} constructor (and aliased on
 * the Node).
 *
 * @example
 * node.setSizeMode(Node.RELATIVE_SIZE, Node.ABSOLUTE_SIZE, Node.ABSOLUTE_SIZE);
 * // Instead of null, any proporional height or depth can be passed in, since
 * // it would be ignored in any case.
 * node.setProportionalSize(0.5, null, null);
 * node.setAbsoluteSize(null, 100, 200);
 *
 * @method setSizeMode
 *
 * @param {SizeMode} x    The size mode being used for determining the size in
 *                        x direction ("width").
 * @param {SizeMode} y    The size mode being used for determining the size in
 *                        y direction ("height").
 * @param {SizeMode} z    The size mode being used for determining the size in
 *                        z direction ("depth").
 *
 * @return {Node} this
 */
Node.prototype.setSizeMode = function setSizeMode (x, y, z) {
    var vec3 = this.value.size.sizeMode;
    var propogate = false;

    if (x != null) propogate = this._resolveSizeMode(vec3, 0, x) || propogate;
    if (y != null) propogate = this._resolveSizeMode(vec3, 1, y) || propogate;
    if (z != null) propogate = this._resolveSizeMode(vec3, 2, z) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onSizeModeChange) item.onSizeModeChange(x, y, z);
        }
    }
    return this;
};

/**
 * A protected method that resolves string representations of size mode
 * to numeric values and applies them.
 *
 * @method
 *
 * @param {Array} vec the array to write size mode to
 * @param {Number} index the index to write to in the array
 * @param {String|Number} val the value to write
 *
 * @return {Bool} whether or not the sizemode has been changed for this index.
 */
Node.prototype._resolveSizeMode = function _resolveSizeMode (vec, index, val) {
    if (val.constructor === String) {
        switch (val.toLowerCase()) {
            case 'relative':
            case 'default':
                return this._vecOptionalSet(vec, index, 0);
            case 'absolute':
                return this._vecOptionalSet(vec, index, 1);
            case 'render':
                return this._vecOptionalSet(vec, index, 2);
            default: throw new Error('unknown size mode: ' + val);
        }
    }
    else return this._vecOptionalSet(vec, index, val);
};

/**
 * A proportional size defines the node's dimensions relative to its parents
 * final size.
 * Proportional sizes need to be within the range of [0, 1].
 *
 * @method setProportionalSize
 *
 * @param {Number} x    x-Size in pixels ("width").
 * @param {Number} y    y-Size in pixels ("height").
 * @param {Number} z    z-Size in pixels ("depth").
 *
 * @return {Node} this
 */
Node.prototype.setProportionalSize = function setProportionalSize (x, y, z) {
    var vec3 = this.value.size.proportional;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    propogate = this._vecOptionalSet(vec3, 2, z) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onProportionalSizeChange) item.onProportionalSizeChange(x, y, z);
        }
    }
    return this;
};

/**
 * Differential sizing can be used to add or subtract an absolute size from a
 * otherwise proportionally sized node.
 * E.g. a differential width of `-10` and a proportional width of `0.5` is
 * being interpreted as setting the node's size to 50% of its parent's width
 * *minus* 10 pixels.
 *
 * @method setDifferentialSize
 *
 * @param {Number} x    x-Size to be added to the relatively sized node in
 *                      pixels ("width").
 * @param {Number} y    y-Size to be added to the relatively sized node in
 *                      pixels ("height").
 * @param {Number} z    z-Size to be added to the relatively sized node in
 *                      pixels ("depth").
 *
 * @return {Node} this
 */
Node.prototype.setDifferentialSize = function setDifferentialSize (x, y, z) {
    var vec3 = this.value.size.differential;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    propogate = this._vecOptionalSet(vec3, 2, z) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onDifferentialSizeChange) item.onDifferentialSizeChange(x, y, z);
        }
    }
    return this;
};

/**
 * Sets the nodes size in pixels, independent of its parent.
 *
 * @method setAbsoluteSize
 *
 * @param {Number} x    x-Size in pixels ("width").
 * @param {Number} y    y-Size in pixels ("height").
 * @param {Number} z    z-Size in pixels ("depth").
 *
 * @return {Node} this
 */
Node.prototype.setAbsoluteSize = function setAbsoluteSize (x, y, z) {
    var vec3 = this.value.size.absolute;
    var propogate = false;

    propogate = this._vecOptionalSet(vec3, 0, x) || propogate;
    propogate = this._vecOptionalSet(vec3, 1, y) || propogate;
    propogate = this._vecOptionalSet(vec3, 2, z) || propogate;

    if (propogate) {
        var i = 0;
        var list = this._components;
        var len = list.length;
        var item;
        x = vec3[0];
        y = vec3[1];
        z = vec3[2];
        for (; i < len ; i++) {
            item = list[i];
            if (item && item.onAbsoluteSizeChange) item.onAbsoluteSizeChange(x, y, z);
        }
    }
    return this;
};

/**
 * Private method for alerting all components and children that
 * this node's transform has changed.
 *
 * @method
 *
 * @param {Float32Array} transform The transform that has changed
 *
 * @return {undefined} undefined
 */
Node.prototype._transformChanged = function _transformChanged (transform) {
    var i = 0;
    var items = this._components;
    var len = items.length;
    var item;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onTransformChange) item.onTransformChange(transform);
    }

    i = 0;
    items = this._children;
    len = items.length;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onParentTransformChange) item.onParentTransformChange(transform);
    }
};

/**
 * Private method for alerting all components and children that
 * this node's size has changed.
 *
 * @method
 *
 * @param {Float32Array} size the size that has changed
 *
 * @return {undefined} undefined
 */
Node.prototype._sizeChanged = function _sizeChanged (size) {
    var i = 0;
    var items = this._components;
    var len = items.length;
    var item;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onSizeChange) item.onSizeChange(size);
    }

    i = 0;
    items = this._children;
    len = items.length;

    for (; i < len ; i++) {
        item = items[i];
        if (item && item.onParentSizeChange) item.onParentSizeChange(size);
    }
};

/**
 * Method for getting the current frame. Will be depricated.
 *
 * @method
 *
 * @return {Number} current frame
 */
Node.prototype.getFrame = function getFrame () {
    return this._globalUpdater.getFrame();
};

/**
 * returns an array of the components currently attached to this
 * node.
 *
 * @method getComponents
 *
 * @return {Array} list of components.
 */
Node.prototype.getComponents = function getComponents () {
    return this._components;
};

/**
 * Enters the node's update phase while updating its own spec and updating its components.
 *
 * @method update
 *
 * @param  {Number} time    high-resolution timstamp, usually retrieved using
 *                          requestAnimationFrame
 *
 * @return {Node} this
 */
Node.prototype.update = function update (time){
    this._inUpdate = true;
    var nextQueue = this._nextUpdateQueue;
    var queue = this._updateQueue;
    var item;

    while (nextQueue.length) queue.unshift(nextQueue.pop());

    while (queue.length) {
        item = this._components[queue.shift()];
        if (item && item.onUpdate) item.onUpdate(time);
    }

    var mySize = this.getSize();
    var myTransform = this.getTransform();
    var parent = this.getParent();
    var parentSize = parent.getSize();
    var parentTransform = parent.getTransform();
    var sizeChanged = SIZE_PROCESSOR.fromSpecWithParent(parentSize, this, mySize);

    var transformChanged = TRANSFORM_PROCESSOR.fromSpecWithParent(parentTransform, this.value, mySize, parentSize, myTransform);
    if (transformChanged) this._transformChanged(myTransform);
    if (sizeChanged) this._sizeChanged(mySize);

    this._inUpdate = false;
    this._requestingUpdate = false;

    if (!this.isMounted()) {
        // last update
        this._parent = null;
        this.value.location = null;
        this._globalUpdater = null;
    }
    else if (this._nextUpdateQueue.length) {
        this._globalUpdater.requestUpdateOnNextTick(this);
        this._requestingUpdate = true;
    }
    return this;
};

/**
 * Mounts the node and therefore its subtree by setting it as a child of the
 * passed in parent.
 *
 * @method mount
 *
 * @param  {Node} parent    parent node
 * @param  {String} myId    path to node (e.g. `body/0/1`)
 *
 * @return {Node} this
 */
Node.prototype.mount = function mount (parent, myId) {
    if (this.isMounted()) return this;
    var i = 0;
    var list = this._components;
    var len = list.length;
    var item;

    this._parent = parent;
    this._globalUpdater = parent.getUpdater();
    this.value.location = myId;
    this.value.showState.mounted = true;

    for (; i < len ; i++) {
        item = list[i];
        if (item && item.onMount) item.onMount(this, i);
    }

    i = 0;
    list = this._children;
    len = list.length;
    for (; i < len ; i++) {
        item = list[i];
        if (item && item.onParentMount) item.onParentMount(this, myId, i);
    }

    if (!this._requestingUpdate) this._requestUpdate(true);
    return this;
};

/**
 * Dismounts (detaches) the node from the scene graph by removing it as a
 * child of its parent.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.dismount = function dismount () {
    if (!this.isMounted()) return this;
    var i = 0;
    var list = this._components;
    var len = list.length;
    var item;

    this.value.showState.mounted = false;

    this._parent.removeChild(this);

    for (; i < len ; i++) {
        item = list[i];
        if (item && item.onDismount) item.onDismount();
    }

    i = 0;
    list = this._children;
    len = list.length;
    for (; i < len ; i++) {
        item = list[i];
        if (item && item.onParentDismount) item.onParentDismount();
    }

    if (!this._requestingUpdate) this._requestUpdate();
    return this;
};

/**
 * Function to be invoked by the parent as soon as the parent is
 * being mounted.
 *
 * @method onParentMount
 *
 * @param  {Node} parent        The parent node.
 * @param  {String} parentId    The parent id (path to parent).
 * @param  {Number} index       Id the node should be mounted to.
 *
 * @return {Node} this
 */
Node.prototype.onParentMount = function onParentMount (parent, parentId, index) {
    return this.mount(parent, parentId + '/' + index);
};

/**
 * Function to be invoked by the parent as soon as the parent is being
 * unmounted.
 *
 * @method onParentDismount
 *
 * @return {Node} this
 */
Node.prototype.onParentDismount = function onParentDismount () {
    return this.dismount();
};

/**
 * Method to be called in order to dispatch an event to the node and all its
 * components. Note that this doesn't recurse the subtree.
 *
 * @method receive
 *
 * @param  {String} type   The event type (e.g. "click").
 * @param  {Object} ev     The event payload object to be dispatched.
 *
 * @return {Node} this
 */
Node.prototype.receive = function receive (type, ev) {
    var i = 0;
    var list = this._components;
    var len = list.length;
    var item;
    for (; i < len ; i++) {
        item = list[i];
        if (item && item.onReceive) item.onReceive(type, ev);
    }
    return this;
};


/**
 * Private method to avoid accidentally passing arguments
 * to update events.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Node.prototype._requestUpdateWithoutArgs = function _requestUpdateWithoutArgs () {
    if (!this._requestingUpdate) this._requestUpdate();
};

/**
 * A method to execute logic on update. Defaults to the
 * node's .update method.
 *
 * @method
 *
 * @param {Number} current time
 *
 * @return {undefined} undefined
 */
Node.prototype.onUpdate = Node.prototype.update;

/**
 * A method to execute logic when a parent node is shown. Delegates
 * to Node.show.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.onParentShow = Node.prototype.show;

/**
 * A method to execute logic when the parent is hidden. Delegates
 * to Node.hide.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.onParentHide = Node.prototype.hide;

/**
 * A method to execute logic when the parent transform changes.
 * Delegates to Node._requestUpdateWithoutArgs.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Node.prototype.onParentTransformChange = Node.prototype._requestUpdateWithoutArgs;

/**
 * A method to execute logic when the parent size changes.
 * Delegates to Node._requestUpdateWIthoutArgs.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Node.prototype.onParentSizeChange = Node.prototype._requestUpdateWithoutArgs;

/**
 * A method to execute logic when the node something wants
 * to show the node. Delegates to Node.show.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.onShow = Node.prototype.show;

/**
 * A method to execute logic when something wants to hide this
 * node. Delegates to Node.hide.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.onHide = Node.prototype.hide;

/**
 * A method which can execute logic when this node is added to
 * to the scene graph. Delegates to mount.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.onMount = Node.prototype.mount;

/**
 * A method which can execute logic when this node is removed from
 * the scene graph. Delegates to Node.dismount.
 *
 * @method
 *
 * @return {Node} this
 */
Node.prototype.onDismount = Node.prototype.dismount;

/**
 * A method which can execute logic when this node receives
 * an event from the scene graph. Delegates to Node.receive.
 *
 * @method
 *
 * @param {String} event name
 * @param {Object} payload
 *
 * @return {undefined} undefined
 */
Node.prototype.onReceive = Node.prototype.receive;

module.exports = Node;

},{"./Size":12,"./Transform":13}],11:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*jshint -W079 */

'use strict';

var Dispatch = require('./Dispatch');
var Node = require('./Node');
var Size = require('./Size');

/**
 * Scene is the bottom of the scene graph. It is it's own
 * parent and provides the global updater to the scene graph.
 *
 * @class Scene
 * @constructor
 *
 * @param {String} selector a string which is a dom selector
 *                 signifying which dom element the context
 *                 should be set upon
 * @param {Famous} updater a class which conforms to Famous' interface
 *                 it needs to be able to send methods to
 *                 the renderers and update nodes in the scene graph
 */
function Scene (selector, updater) {
    if (!selector) throw new Error('Scene needs to be created with a DOM selector');
    if (!updater) throw new Error('Scene needs to be created with a class like Famous');

    Node.call(this);         // Scene inherits from node

    this._updater = updater; // The updater that will both
                             // send messages to the renderers
                             // and update dirty nodes 

    this._dispatch = new Dispatch(this); // instantiates a dispatcher
                                         // to send events to the scene
                                         // graph below this context
    
    this._selector = selector; // reference to the DOM selector
                               // that represents the elemnent
                               // in the dom that this context
                               // inhabits

    this.onMount(this, selector); // Mount the context to itself
                                  // (it is its own parent)
    
    this._updater                  // message a request for the dom
        .message('NEED_SIZE_FOR')  // size of the context so that
        .message(selector);        // the scene graph has a total size

    this.show(); // the context begins shown (it's already present in the dom)

}

// Scene inherits from node
Scene.prototype = Object.create(Node.prototype);
Scene.prototype.constructor = Scene;

/**
 * Scene getUpdater function returns the passed in updater
 *
 * @return {Famous} the updater for this Scene
 */
Scene.prototype.getUpdater = function getUpdater () {
    return this._updater;
};

/**
 * Returns the selector that the context was instantiated with
 *
 * @return {String} dom selector
 */
Scene.prototype.getSelector = function getSelector () {
    return this._selector;
};

/**
 * Returns the dispatcher of the context. Used to send events
 * to the nodes in the scene graph.
 *
 * @return {Dispatch} the Scene's Dispatch
 */
Scene.prototype.getDispatch = function getDispatch () {
    return this._dispatch;
};

/**
 * Receives an event. If the event is 'CONTEXT_RESIZE' it sets the size of the scene
 * graph to the payload, which must be an array of numbers of at least
 * length three representing the pixel size in 3 dimensions.
 *
 * @param {String} event the name of the event being received
 * @param {*} payload the object being sent
 *
 * @return {undefined} undefined
 */
Scene.prototype.onReceive = function onReceive (event, payload) {
    // TODO: In the future the dom element that the context is attached to
    // should have a representation as a component. It would be render sized
    // and the context would receive its size the same way that any render size
    // component receives its size.
    if (event === 'CONTEXT_RESIZE') {
        
        if (payload.length < 2) 
            throw new Error(
                    'CONTEXT_RESIZE\'s payload needs to be at least a pair' +
                    ' of pixel sizes'
            );

        this.setSizeMode(Size.ABSOLUTE, Size.ABSOLUTE, Size.ABSOLUTE);
        this.setAbsoluteSize(payload[0],
                             payload[1],
                             payload[2] ? payload[2] : 0);

    }
};

module.exports = Scene;


},{"./Dispatch":7,"./Node":10,"./Size":12}],12:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * The Size class is responsible for processing Size from a node
 * @constructor Size
 */
function Size () {
    this._size = new Float32Array(3);
}

// an enumeration of the different types of size modes
Size.RELATIVE = 0;
Size.ABSOLUTE = 1;
Size.RENDER = 2;
Size.DEFAULT = Size.RELATIVE;

/**
 * fromSpecWithParent takes the parent node's size, the target nodes spec,
 * and a target array to write to. Using the node's size mode it calculates 
 * a final size for the node from the node's spec. Returns whether or not
 * the final size has changed from its last value.
 *
 * @param {Array} parentSize parent node's calculated size
 * @param {Node.Spec} node the target node's spec
 * @param {Array} target an array to write the result to
 *
 * @return {Boolean} true if the size of the node has changed.
 */
Size.prototype.fromSpecWithParent = function fromSpecWithParent (parentSize, node, target) {
    var spec = node.getValue().spec;
    var components = node.getComponents();
    var mode = spec.size.sizeMode;
    var prev;
    var changed = false;
    var len = components.length;
    var j;
    for (var i = 0 ; i < 3 ; i++) {
        switch (mode[i]) {
            case Size.RELATIVE:
                prev = target[i];
                target[i] = parentSize[i] * spec.size.proportional[i] + spec.size.differential[i];
                break;
            case Size.ABSOLUTE:
                prev = target[i];
                target[i] = spec.size.absolute[i];
                break;
            case Size.RENDER:
                var candidate;
                for (j = 0; j < len ; j++) {
                    if (components[j].getRenderSize) {
                        candidate = components[j].getRenderSize()[i];
                        prev = target[i];
                        target[i] = target[i] < candidate || target[i] === 0 ? candidate : target[i];
                    }
                }
                break;
        }
        changed = changed || prev !== target[i];
    }
    return changed;
};

module.exports = Size;

},{}],13:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * The transform class is responsible for calculating the transform of a particular
 * node from the data on the node and its parent
 *
 * @constructor Transform
 */
function Transform () {
    this._matrix = new Float32Array(16);
}

/**
 * Returns the last calculated transform
 *
 * @return {Array} a transform
 */
Transform.prototype.get = function get () {
    return this._matrix;
};

/**
 * Uses the parent transform, the node's spec, the node's size, and the parent's size
 * to calculate a final transform for the node. Returns true if the transform has changed.
 *
 * @param {Array} parentMatrix the parent matrix
 * @param {Node.Spec} spec the target node's spec
 * @param {Array} mySize the size of the node
 * @param {Array} parentSize the size of the parent
 * @param {Array} target the target array to write the resulting transform to
 *
 * @return {Boolean} whether or not the transform changed
 */
Transform.prototype.fromSpecWithParent = function fromSpecWithParent (parentMatrix, spec, mySize, parentSize, target) {
    target = target ? target : this._matrix;

    // local cache of everything
    var t00         = target[0];
    var t01         = target[1];
    var t02         = target[2];
    var t10         = target[4];
    var t11         = target[5];
    var t12         = target[6];
    var t20         = target[8];
    var t21         = target[9];
    var t22         = target[10];
    var t30         = target[12];
    var t31         = target[13];
    var t32         = target[14];
    var p00         = parentMatrix[0];
    var p01         = parentMatrix[1];
    var p02         = parentMatrix[2];
    var p10         = parentMatrix[4];
    var p11         = parentMatrix[5];
    var p12         = parentMatrix[6];
    var p20         = parentMatrix[8];
    var p21         = parentMatrix[9];
    var p22         = parentMatrix[10];
    var p30         = parentMatrix[12];
    var p31         = parentMatrix[13];
    var p32         = parentMatrix[14];
    var posX        = spec.vectors.position[0];
    var posY        = spec.vectors.position[1];
    var posZ        = spec.vectors.position[2];
    var rotX        = spec.vectors.rotation[0];
    var rotY        = spec.vectors.rotation[1];
    var rotZ        = spec.vectors.rotation[2];
    var rotW        = spec.vectors.rotation[3];
    var scaleX      = spec.vectors.scale[0];
    var scaleY      = spec.vectors.scale[1];
    var scaleZ      = spec.vectors.scale[2];
    var alignX      = spec.offsets.align[0] * parentSize[0];
    var alignY      = spec.offsets.align[1] * parentSize[1];
    var alignZ      = spec.offsets.align[2] * parentSize[2];
    var mountPointX = spec.offsets.mountPoint[0] * mySize[0];
    var mountPointY = spec.offsets.mountPoint[1] * mySize[1];
    var mountPointZ = spec.offsets.mountPoint[2] * mySize[2];
    var originX     = spec.offsets.origin[0] * mySize[0];
    var originY     = spec.offsets.origin[1] * mySize[1];
    var originZ     = spec.offsets.origin[2] * mySize[2];

    var wx = rotW * rotX;
    var wy = rotW * rotY;
    var wz = rotW * rotZ;
    var xx = rotX * rotX;
    var yy = rotY * rotY;
    var zz = rotZ * rotZ;
    var xy = rotX * rotY;
    var xz = rotX * rotZ;
    var yz = rotY * rotZ;

    var rs0 = (1 - 2 * (yy + zz)) * scaleX;
    var rs1 = (2 * (xy + wz)) * scaleX;
    var rs2 = (2 * (xz - wy)) * scaleX;
    var rs3 = (2 * (xy - wz)) * scaleY;
    var rs4 = (1 - 2 * (xx + zz)) * scaleY;
    var rs5 = (2 * (yz + wx)) * scaleY;
    var rs6 = (2 * (xz + wy)) * scaleZ;
    var rs7 = (2 * (yz - wx)) * scaleZ;
    var rs8 = (1 - 2 * (xx + yy)) * scaleZ;

    var tx = alignX + posX - mountPointX + originX - (rs0 * originX + rs3 * originY + rs6 * originZ);
    var ty = alignY + posY - mountPointY + originY - (rs1 * originX + rs4 * originY + rs7 * originZ);
    var tz = alignZ + posZ - mountPointZ + originZ - (rs2 * originX + rs5 * originY + rs8 * originZ);

    target[0] = p00 * rs0 + p10 * rs1 + p20 * rs2;
    target[1] = p01 * rs0 + p11 * rs1 + p21 * rs2;
    target[2] = p02 * rs0 + p12 * rs1 + p22 * rs2;
    target[3] = 0;
    target[4] = p00 * rs3 + p10 * rs4 + p20 * rs5;
    target[5] = p01 * rs3 + p11 * rs4 + p21 * rs5;
    target[6] = p02 * rs3 + p12 * rs4 + p22 * rs5;
    target[7] = 0;
    target[8] = p00 * rs6 + p10 * rs7 + p20 * rs8;
    target[9] = p01 * rs6 + p11 * rs7 + p21 * rs8;
    target[10] = p02 * rs6 + p12 * rs7 + p22 * rs8;
    target[11] = 0;
    target[12] = p00 * tx + p10 * ty + p20 * tz + p30;
    target[13] = p01 * tx + p11 * ty + p21 * tz + p31;
    target[14] = p02 * tx + p12 * ty + p22 * tz + p32;
    target[15] = 1;

    return t00 !== target[0] ||
        t01 !== target[1] ||
        t02 !== target[2] ||
        t10 !== target[4] ||
        t11 !== target[5] ||
        t12 !== target[6] ||
        t20 !== target[8] ||
        t21 !== target[9] ||
        t22 !== target[10] ||
        t30 !== target[12] ||
        t31 !== target[13] ||
        t32 !== target[14];

};

module.exports = Transform;

},{}],14:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var CallbackStore = require('../utilities/CallbackStore');

var RENDER_SIZE = 2;

/**
 * A DOMElement is a component that can be added to a Node with the
 * purpose of sending draw commands to the renderer. Renderables send draw commands
 * to through their Nodes to the Compositor where they are acted upon.
 *
 * @class DOMElement
 *
 * @param {Node} node                   The Node to which the `DOMElement`
 *                                      renderable should be attached to.
 * @param {Object} options              Initial options used for instantiating
 *                                      the Node.
 * @param {Object} options.properties   CSS properties that should be added to
 *                                      the actual DOMElement on the initial draw.
 * @param {Object} options.attributes   Element attributes that should be added to
 *                                      the actual DOMElement.
 * @param {String} options.id           String to be applied as 'id' of the actual
 *                                      DOMElement.
 * @param {String} options.content      String to be applied as the content of the
 *                                      actual DOMElement.
 * @param {Boolean} options.cutout      Specifies the presence of a 'cutout' in the
 *                                      WebGL canvas over this element which allows
 *                                      for DOM and WebGL layering.  On by default.
 */
function DOMElement(node, options) {
    if (!node) throw new Error('DOMElement must be instantiated on a node');

    this._node = node;
    this._parent = null;
    this._children = [];

    this._requestingUpdate = false;
    this._renderSized = false;
    this._requestRenderSize = false;

    this._changeQueue = [];

    this._UIEvents = node.getUIEvents().slice(0);
    this._classes = ['famous-dom-element'];
    this._requestingEventListeners = [];
    this._styles = {};

    this.setProperty('display', node.isShown() ? 'none' : 'block');
    this.onOpacityChange(node.getOpacity());

    this._attributes = {};
    this._content = '';

    this._tagName = options && options.tagName ? options.tagName : 'div';
    this._id = node ? node.addComponent(this) : null;

    this._renderSize = [0, 0, 0];

    this._callbacks = new CallbackStore();


    if (!options) return;

    var i;
    var key;

    if (options.classes)
        for (i = 0; i < options.classes.length; i++)
            this.addClass(options.classes[i]);

    if (options.attributes)
        for (key in options.attributes)
            this.setAttribute(key, options.attributes[key]);

    if (options.properties)
        for (key in options.properties)
            this.setProperty(key, options.properties[key]);

    if (options.id) this.setId(options.id);
    if (options.content) this.setContent(options.content);
    if (options.cutout === false) this.setCutoutState(options.cutout);
}

/**
 * Serializes the state of the DOMElement.
 *
 * @method
 *
 * @return {Object} serialized interal state
 */
DOMElement.prototype.getValue = function getValue() {
    return {
        classes: this._classes,
        styles: this._styles,
        attributes: this._attributes,
        content: this._content,
        id: this._attributes.id,
        tagName: this._tagName
    };
};

/**
 * Method to be invoked by the node as soon as an update occurs. This allows
 * the DOMElement renderable to dynamically react to state changes on the Node.
 *
 * This flushes the internal draw command queue by sending individual commands
 * to the node using `sendDrawCommand`.
 *
 * @method
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onUpdate = function onUpdate() {
    var node = this._node;
    var queue = this._changeQueue;
    var len = queue.length;

    if (len && node) {
        node.sendDrawCommand('WITH');
        node.sendDrawCommand(node.getLocation());

        while (len--) node.sendDrawCommand(queue.shift());
        if (this._requestRenderSize) {
            node.sendDrawCommand('DOM_RENDER_SIZE');
            node.sendDrawCommand(node.getLocation());
            this._requestRenderSize = false;
        }

    }

    this._requestingUpdate = false;
};

/**
 * Private method which sets the parent of the element in the DOM
 * hierarchy.
 *
 * @method _setParent
 * @private
 *
 * @param {String} path of the parent
 *
 * @return {undefined} undefined
 */
DOMElement.prototype._setParent = function _setParent(path) {
    if (this._node) {
        var location = this._node.getLocation();
        if (location === path || location.indexOf(path) === -1)
            throw new Error('The given path isn\'t an ancestor');
        this._parent = path;
    } else throw new Error('_setParent called on an Element that isn\'t in the scene graph');
};

/**
 * Private method which adds a child of the element in the DOM
 * hierarchy.
 *
 * @method
 * @private
 *
 * @param {String} path of the child
 *
 * @return {undefined} undefined
 */
DOMElement.prototype._addChild = function _addChild(path) {
    if (this._node) {
        var location = this._node.getLocation();
        if (path === location || path.indexOf(location) === -1)
            throw new Error('The given path isn\'t a descendent');
        if (this._children.indexOf(path) === -1) this._children.push(path);
        else throw new Error('The given path is already a child of this element');
    } else throw new Error('_addChild called on an Element that isn\'t in the scene graph');
};

/**
 * Private method which returns the path of the parent of this element
 *
 * @method
 * @private
 *
 * @return {String} path of the parent element
 */
DOMElement.prototype._getParent = function _getParent() {
    return this._parent;
};

/**
 * Private method which returns an array of paths of the children elements
 * of this element
 *
 * @method
 * @private
 *
 * @return {Array} an array of the paths of the child element
 */
DOMElement.prototype._getChildren = function _getChildren() {
    return this._children;
};

/**
 * Method to be invoked by the Node as soon as the node (or any of its
 * ancestors) is being mounted.
 *
 * @method onMount
 *
 * @param {Node} node      Parent node to which the component should be added.
 * @param {String} id      Path at which the component (or node) is being
 *                          attached. The path is being set on the actual
 *                          DOMElement as a `data-fa-path`-attribute.
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onMount = function onMount(node, id) {
    this._node = node;
    this._id = id;
    this._UIEvents = node.getUIEvents().slice(0);
    this.draw();
    this.setAttribute('data-fa-path', node.getLocation());
};

/**
 * Method to be invoked by the Node as soon as the node is being dismounted
 * either directly or by dismounting one of its ancestors.
 *
 * @method
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onDismount = function onDismount() {
    this.setProperty('display', 'none');
    this.setAttribute('data-fa-path', '');
    this._initialized = false;
};

/**
 * Method to be invoked by the node as soon as the DOMElement is being shown.
 * This results into the DOMElement setting the `display` property to `block`
 * and therefore visually showing the corresponding DOMElement (again).
 *
 * @method
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onShow = function onShow() {
    this.setProperty('display', 'block');
};

/**
 * Method to be invoked by the node as soon as the DOMElement is being hidden.
 * This results into the DOMElement setting the `display` property to `none`
 * and therefore visually hiding the corresponding DOMElement (again).
 *
 * @method
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onHide = function onHide() {
    this.setProperty('display', 'none');
};

/**
 * Enables or disables WebGL 'cutout' for this element, which affects
 * how the element is layered with WebGL objects in the scene.  This is designed
 * mainly as a way to acheive
 *
 * @method
 *
 * @param {Boolean} usesCutout  The presence of a WebGL 'cutout' for this element.
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.setCutoutState = function setCutoutState(usesCutout) {
    this._changeQueue.push('GL_CUTOUT_STATE', usesCutout);

    if (this._initialized) this._requestUpdate();
};

/**
 * Method to be invoked by the node as soon as the transform matrix associated
 * with the node changes. The DOMElement will react to transform changes by sending
 * `CHANGE_TRANSFORM` commands to the `DOMRenderer`.
 *
 * @method
 *
 * @param {Float32Array} transform The final transform matrix
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onTransformChange = function onTransformChange (transform) {
    this._changeQueue.push('CHANGE_TRANSFORM');
    for (var i = 0, len = transform.length ; i < len ; i++)
        this._changeQueue.push(transform[i]);

    this.onUpdate();
};

/**
 * Method to be invoked by the node as soon as its computed size changes.
 *
 * @method
 *
 * @param {Float32Array} size Size of the Node in pixels
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.onSizeChange = function onSizeChange(size) {
    var sizeMode = this._node.getSizeMode();
    var sizedX = sizeMode[0] !== RENDER_SIZE;
    var sizedY = sizeMode[1] !== RENDER_SIZE;
    if (this._initialized)
        this._changeQueue.push('CHANGE_SIZE',
            sizedX ? size[0] : sizedX,
            sizedY ? size[1] : sizedY);

    if (!this._requestingUpdate) this._requestUpdate();
    return this;
};

/**
 * Method to be invoked by the node as soon as its opacity changes
 *
 * @method
 *
 * @param {Number} opacity The new opacity, as a scalar from 0 to 1
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.onOpacityChange = function onOpacityChange(opacity) {
    return this.setProperty('opacity', opacity);
};

/**
 * Method to be invoked by the node as soon as a new UIEvent is being added.
 * This results into an `ADD_EVENT_LISTENER` command being send.
 *
 * @param {String} UIEvent UIEvent to be subscribed to (e.g. `click`)
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onAddUIEvent = function onAddUIEvent(UIEvent) {
    if (this._UIEvents.indexOf(UIEvent) === -1) {
        this._subscribe(UIEvent);
        this._UIEvents.push(UIEvent);
    }
    else if (this._inDraw) {
        this._subscribe(UIEvent);
    }
    return this;
};

/**
 * Appends an `ADD_EVENT_LISTENER` command to the command queue.
 *
 * @method
 * @private
 *
 * @param {String} UIEvent Event type (e.g. `click`)
 *
 * @return {undefined} undefined
 */
DOMElement.prototype._subscribe = function _subscribe (UIEvent) {
    if (this._initialized) {
        this._changeQueue.push('SUBSCRIBE', UIEvent, true);
    }
    if (!this._requestingUpdate) {
        this._requestUpdate();
    }
    if (!this._requestingUpdate) this._requestUpdate();
};

/**
 * Method to be invoked by the node as soon as the underlying size mode
 * changes. This results into the size being fetched from the node in
 * order to update the actual, rendered size.
 *
 * @method
 *
 * @param {Number} x the sizing mode in use for determining size in the x direction
 * @param {Number} y the sizing mode in use for determining size in the y direction
 * @param {Number} z the sizing mode in use for determining size in the z direction
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onSizeModeChange = function onSizeModeChange(x, y, z) {
    if (x === RENDER_SIZE || y === RENDER_SIZE || z === RENDER_SIZE) {
        this._renderSized = true;
        this._requestRenderSize = true;
    }
    this.onSizeChange(this._node.getSize());
};

/**
 * Method to be retrieve the rendered size of the DOM element that is
 * drawn for this node.
 *
 * @method
 *
 * @return {Array} size of the rendered DOM element in pixels
 */
DOMElement.prototype.getRenderSize = function getRenderSize() {
    return this._renderSize;
};

/**
 * Method to have the component request an update from its Node
 *
 * @method
 * @private
 *
 * @return {undefined} undefined
 */
DOMElement.prototype._requestUpdate = function _requestUpdate() {
    if (!this._requestingUpdate) {
        this._node.requestUpdate(this._id);
        this._requestingUpdate = true;
    }
};

/**
 * Initializes the DOMElement by sending the `INIT_DOM` command. This creates
 * or reallocates a new Element in the actual DOM hierarchy.
 *
 * @method
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.init = function init() {
    this._changeQueue.push('INIT_DOM', this._tagName);
    this._initialized = true;
    this.onTransformChange(this._node.getTransform());
    this.onSizeChange(this._node.getSize());
    if (!this._requestingUpdate) this._requestUpdate();
};

/**
 * Sets the id attribute of the DOMElement.
 *
 * @method
 *
 * @param {String} id New id to be set
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.setId = function setId (id) {
    this.setAttribute('id', id);
    return this;
};

/**
 * Adds a new class to the internal class list of the underlying Element in the
 * DOM.
 *
 * @method
 *
 * @param {String} value New class name to be added
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.addClass = function addClass (value) {
    if (this._classes.indexOf(value) < 0) {
        if (this._initialized) this._changeQueue.push('ADD_CLASS', value);
        this._classes.push(value);
        if (!this._requestingUpdate) this._requestUpdate();
        if (this._renderSized) this._requestRenderSize = true;
        return this;
    }

    if (this._inDraw) {
        if (this._initialized) this._changeQueue.push('ADD_CLASS', value);
        if (!this._requestingUpdate) this._requestUpdate();
    }
    return this;
};

/**
 * Removes a class from the DOMElement's classList.
 *
 * @method
 *
 * @param {String} value Class name to be removed
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.removeClass = function removeClass (value) {
    var index = this._classes.indexOf(value);

    if (index < 0) return this;

    this._changeQueue.push('REMOVE_CLASS', value);

    this._classes.splice(index, 1);

    if (!this._requestingUpdate) this._requestUpdate();
    return this;
};


/**
 * Checks if the DOMElement has the passed in class.
 *
 * @method
 *
 * @param {String} value The class name
 *
 * @return {Boolean} Boolean value indicating whether the passed in class name is in the DOMElement's class list.
 */
DOMElement.prototype.hasClass = function hasClass (value) {
    return this._classes.indexOf(value) !== -1;
};

/**
 * Sets an attribute of the DOMElement.
 *
 * @method
 *
 * @param {String} name Attribute key (e.g. `src`)
 * @param {String} value Attribute value (e.g. `http://famo.us`)
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.setAttribute = function setAttribute (name, value) {
    if (this._attributes[name] !== value || this._inDraw) {
        this._attributes[name] = value;
        if (this._initialized) this._changeQueue.push('CHANGE_ATTRIBUTE', name, value);
        if (!this._requestUpdate) this._requestUpdate();
    }

    return this;
};

/**
 * Sets a CSS property
 *
 * @chainable
 *
 * @param {String} name  Name of the CSS rule (e.g. `background-color`)
 * @param {String} value Value of CSS property (e.g. `red`)
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.setProperty = function setProperty (name, value) {
    if (this._styles[name] !== value || this._inDraw) {
        this._styles[name] = value;
        if (this._initialized) this._changeQueue.push('CHANGE_PROPERTY', name, value);
        if (!this._requestingUpdate) this._requestUpdate();
        if (this._renderSized) this._requestRenderSize = true;
    }

    return this;
};

/**
 * Sets the content of the DOMElement. This is using `innerHTML`, escaping user
 * generated content is therefore essential for security purposes.
 *
 * @method
 *
 * @param {String} content Content to be set using `.innerHTML = ...`
 *
 * @return {DOMElement} this
 */
DOMElement.prototype.setContent = function setContent (content) {
    if (this._content !== content || this._inDraw) {
        this._content = content;
        if (this._initialized) this._changeQueue.push('CHANGE_CONTENT', content);
        if (!this._requestingUpdate) this._requestUpdate();
        if (this._renderSized) this._requestRenderSize = true;
    }

    return this;
};

/**
 * Subscribes to a DOMElement using.
 *
 * @method on
 *
 * @param {String} event       The event type (e.g. `click`).
 * @param {Function} listener  Handler function for the specified event type
 *                              in which the payload event object will be
 *                              passed into.
 *
 * @return {Function} A function to call if you want to remove the callback
 */
DOMElement.prototype.on = function on (event, listener) {
    return this._callbacks.on(event, listener);
};

/**
 * Function to be invoked by the Node whenever an event is being received.
 * There are two different ways to subscribe for those events:
 *
 * 1. By overriding the onReceive method (and possibly using `switch` in order
 *     to differentiate between the different event types).
 * 2. By using DOMElement and using the built-in CallbackStore.
 *
 * @method
 *
 * @param {String} event Event type (e.g. `click`)
 * @param {Object} payload Event object.
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.onReceive = function onReceive (event, payload) {
    if (event === 'resize') {
        this._renderSize[0] = payload.val[0];
        this._renderSize[1] = payload.val[1];
        if (!this._requestingUpdate) this._requestUpdate();
    }
    this._callbacks.trigger(event, payload);
};

/**
 * The draw function is being used in order to allow mutating the DOMElement
 * before actually mounting the corresponding node.
 *
 * @method
 * @private
 *
 * @return {undefined} undefined
 */
DOMElement.prototype.draw = function draw() {
    var key;
    var i;
    var len;

    this._inDraw = true;

    this.init();

    for (i = 0, len = this._classes.length ; i < len ; i++)
        this.addClass(this._classes[i]);

    if (this._content) this.setContent(this._content);

    for (key in this._styles)
        if (this._styles[key])
            this.setProperty(key, this._styles[key]);

    for (key in this._attributes)
        if (this._attributes[key])
            this.setAttribute(key, this._attributes[key]);

    for (i = 0, len = this._UIEvents.length ; i < len ; i++)
        this.onAddUIEvent(this._UIEvents[i]);

    this._inDraw = false;
};

module.exports = DOMElement;

},{"../utilities/CallbackStore":39}],15:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var ElementCache = require('./ElementCache');
var math = require('./Math');
var vendorPrefix = require('../utilities/vendorPrefix');
var eventMap = require('./events/EventMap');

var TRANSFORM = null;

/**
 * DOMRenderer is a class responsible for adding elements
 * to the DOM and writing to those elements.
 * There is a DOMRenderer per context, represented as an
 * element and a selector. It is instantiated in the
 * context class.
 *
 * @class DOMRenderer
 *
 * @param {HTMLElement} element an element.
 * @param {String} selector the selector of the element.
 * @param {Compositor} compositor the compositor controlling the renderer
 */
function DOMRenderer (element, selector, compositor) {
    element.classList.add('famous-dom-renderer');

    TRANSFORM = TRANSFORM || vendorPrefix('transform');
    this._compositor = compositor; // a reference to the compositor

    this._target = null; // a register for holding the current
                         // element that the Renderer is operating
                         // upon

    this._parent = null; // a register for holding the parent
                         // of the target

    this._path = null; // a register for holding the path of the target
                       // this register must be set first, and then
                       // children, target, and parent are all looked
                       // up from that.

    this._children = []; // a register for holding the children of the
                         // current target.

    this._root = new ElementCache(element, selector); // the root
                                                      // of the dom tree that this
                                                      // renderer is responsible
                                                      // for

    this._boundTriggerEvent = this._triggerEvent.bind(this);

    this._selector = selector;

    this._elements = {};

    this._elements[selector] = this._root;

    this.perspectiveTransform = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this._VPtransform = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    this._size = [null, null];
}


/**
 * Attaches an EventListener to the element associated with the passed in path.
 * Prevents the default browser action on all subsequent events if
 * `preventDefault` is truthy.
 * All incoming events will be forwarded to the compositor by invoking the
 * `sendEvent` method.
 * Delegates events if possible by attaching the event listener to the context.
 *
 * @method
 *
 * @param {String} type DOM event type (e.g. click, mouseover).
 * @param {Boolean} preventDefault Whether or not the default browser action should be prevented.
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.subscribe = function subscribe(type, preventDefault) {
    // TODO preventDefault should be a separate command
    this._assertTargetLoaded();

    this._target.preventDefault[type] = preventDefault;
    this._target.subscribe[type] = true;

    if (
        !this._target.listeners[type] && !this._root.listeners[type]
    ) {
        var target = eventMap[type][1] ? this._root : this._target;
        target.listeners[type] = this._boundTriggerEvent;
        target.element.addEventListener(type, this._boundTriggerEvent);
    }
};

/**
 * Function to be added using `addEventListener` to the corresponding
 * DOMElement.
 *
 * @method
 * @private
 *
 * @param {Event} ev DOM Event payload
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype._triggerEvent = function _triggerEvent(ev) {
    // Use ev.path, which is an array of Elements (polyfilled if needed).
    var evPath = ev.path ? ev.path : _getPath(ev);
    // First element in the path is the element on which the event has actually
    // been emitted.
    for (var i = 0; i < evPath.length; i++) {
        // Skip nodes that don't have a dataset property or data-fa-path
        // attribute.
        if (!evPath[i].dataset) continue;
        var path = evPath[i].dataset.faPath;
        if (!path) continue;

        // Stop further event propogation and path traversal as soon as the
        // first ElementCache subscribing for the emitted event has been found.
        if (this._elements[path].subscribe[ev.type]) {
            ev.stopPropagation();

            // Optionally preventDefault. This needs forther consideration and
            // should be optional. Eventually this should be a separate command/
            // method.
            if (this._elements[path].preventDefault[ev.type]) {
                ev.preventDefault();
            }

            var NormalizedEventConstructor = eventMap[ev.type][0];

            // Finally send the event to the Worker Thread through the
            // compositor.
            this._compositor.sendEvent(path, ev.type, new NormalizedEventConstructor(ev));

            break;
        }
    }
};


/**
 * getSizeOf gets the dom size of a particular DOM element.  This is
 * needed for render sizing in the scene graph.
 *
 * @method
 *
 * @param {String} path path of the Node in the scene graph
 *
 * @return {Array} a vec3 of the offset size of the dom element
 */
DOMRenderer.prototype.getSizeOf = function getSizeOf(path) {
    var element = this._elements[path];
    if (!element) return null;

    var res = {val: element.size};
    this._compositor.sendEvent(path, 'resize', res);
    return res;
};

function _getPath(ev) {
    // TODO move into _triggerEvent, avoid object allocation
    var path = [];
    var node = ev.target;
    while (node !== document.body) {
        path.push(node);
        node = node.parentNode;
    }
    return path;
}


/**
 * Determines the size of the context by querying the DOM for `offsetWidth` and
 * `offsetHeight`.
 *
 * @method
 *
 * @return {Array} Offset size.
 */
DOMRenderer.prototype.getSize = function getSize() {
    this._size[0] = this._root.element.offsetWidth;
    this._size[1] = this._root.element.offsetHeight;
    return this._size;
};

DOMRenderer.prototype._getSize = DOMRenderer.prototype.getSize;


/**
 * Executes the retrieved draw commands. Draw commands only refer to the
 * cross-browser normalized `transform` property.
 *
 * @method
 *
 * @param {Object} renderState description
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.draw = function draw(renderState) {
    if (renderState.perspectiveDirty) {
        this.perspectiveDirty = true;

        this.perspectiveTransform[0] = renderState.perspectiveTransform[0];
        this.perspectiveTransform[1] = renderState.perspectiveTransform[1];
        this.perspectiveTransform[2] = renderState.perspectiveTransform[2];
        this.perspectiveTransform[3] = renderState.perspectiveTransform[3];

        this.perspectiveTransform[4] = renderState.perspectiveTransform[4];
        this.perspectiveTransform[5] = renderState.perspectiveTransform[5];
        this.perspectiveTransform[6] = renderState.perspectiveTransform[6];
        this.perspectiveTransform[7] = renderState.perspectiveTransform[7];

        this.perspectiveTransform[8] = renderState.perspectiveTransform[8];
        this.perspectiveTransform[9] = renderState.perspectiveTransform[9];
        this.perspectiveTransform[10] = renderState.perspectiveTransform[10];
        this.perspectiveTransform[11] = renderState.perspectiveTransform[11];

        this.perspectiveTransform[12] = renderState.perspectiveTransform[12];
        this.perspectiveTransform[13] = renderState.perspectiveTransform[13];
        this.perspectiveTransform[14] = renderState.perspectiveTransform[14];
        this.perspectiveTransform[15] = renderState.perspectiveTransform[15];
    }

    if (renderState.viewDirty || renderState.perspectiveDirty) {
        math.multiply(this._VPtransform, this.perspectiveTransform, renderState.viewTransform);
        this._root.element.style[TRANSFORM] = this._stringifyMatrix(this._VPtransform);
    }
};


/**
 * Internal helper function used for ensuring that a path is currently loaded.
 *
 * @method
 * @private
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype._assertPathLoaded = function _asserPathLoaded() {
    if (!this._path) throw new Error('path not loaded');
};

/**
 * Internal helper function used for ensuring that a parent is currently loaded.
 *
 * @method
 * @private
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype._assertParentLoaded = function _assertParentLoaded() {
    if (!this._parent) throw new Error('parent not loaded');
};

/**
 * Internal helper function used for ensuring that children are currently
 * loaded.
 *
 * @method
 * @private
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype._assertChildrenLoaded = function _assertChildrenLoaded() {
    if (!this._children) throw new Error('children not loaded');
};

/**
 * Internal helper function used for ensuring that a target is currently loaded.
 *
 * @method  _assertTargetLoaded
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype._assertTargetLoaded = function _assertTargetLoaded() {
    if (!this._target) throw new Error('No target loaded');
};

/**
 * Finds and sets the parent of the currently loaded element (path).
 *
 * @method
 * @private
 *
 * @return {ElementCache} Parent element.
 */
DOMRenderer.prototype.findParent = function findParent () {
    this._assertPathLoaded();

    var path = this._path;
    var parent;

    while (!parent && path.length) {
        path = path.substring(0, path.lastIndexOf('/'));
        parent = this._elements[path];
    }
    this._parent = parent;
    return parent;
};


/**
 * Finds all children of the currently loaded element.
 *
 * @method
 * @private
 *
 * @param {Array} array Output-Array used for writing to (subsequently appending children)
 *
 * @return {Array} array of children elements
 */
DOMRenderer.prototype.findChildren = function findChildren(array) {
    // TODO: Optimize me.
    this._assertPathLoaded();

    var path = this._path + '/';
    var keys = Object.keys(this._elements);
    var i = 0;
    var len;
    array = array ? array : this._children;

    this._children.length = 0;

    while (i < keys.length) {
        if (keys[i].indexOf(path) === -1 || keys[i] === path) keys.splice(i, 1);
        else i++;
    }
    var currentPath;
    var j = 0;
    for (i = 0 ; i < keys.length ; i++) {
        currentPath = keys[i];
        for (j = 0 ; j < keys.length ; j++) {
            if (i !== j && keys[j].indexOf(currentPath) !== -1) {
                keys.splice(j, 1);
                i--;
            }
        }
    }
    for (i = 0, len = keys.length ; i < len ; i++)
        array[i] = this._elements[keys[i]];

    return array;
};


/**
 * Used for determining the target loaded under the current path.
 *
 * @method
 *
 * @return {ElementCache|undefined} Element loaded under defined path.
 */
DOMRenderer.prototype.findTarget = function findTarget() {
    this._target = this._elements[this._path];
    return this._target;
};


/**
 * Loads the passed in path.
 *
 * @method
 *
 * @param {String} path Path to be loaded
 *
 * @return {String} Loaded path
 */
DOMRenderer.prototype.loadPath = function loadPath (path) {
    this._path = path;
    return this._path;
};


/**
 * Inserts a DOMElement at the currently loaded path, assuming no target is
 * loaded. Only one DOMElement can be associated with each path.
 *
 * @method
 *
 * @param {String} tagName Tag name (capitalization will be normalized).
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.insertEl = function insertEl (tagName) {
    if (!this._target ||
         this._target.element.tagName.toLowerCase() === tagName.toLowerCase()) {

        this.findParent();
        this.findChildren();

        this._assertParentLoaded();
        this._assertChildrenLoaded();

        if (this._target) this._parent.element.removeChild(this._target.element);

        this._target = new ElementCache(document.createElement(tagName), this._path);
        this._parent.element.appendChild(this._target.element);
        this._elements[this._path] = this._target;

        for (var i = 0, len = this._children.length ; i < len ; i++) {
            this._target.element.appendChild(this._children[i].element);
        }
    }
};


/**
 * Sets a property on the currently loaded target.
 *
 * @method
 *
 * @param {String} name Property name (e.g. background, color, font)
 * @param {String} value Proprty value (e.g. black, 20px)
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setProperty = function setProperty (name, value) {
    this._assertTargetLoaded();
    this._target.element.style[name] = value;
};


/**
 * Sets the size of the currently loaded target.
 * Removes any explicit sizing constraints when passed in `false`
 * ("true-sizing").
 *
 * @method
 *
 * @param {Number|false} width   Width to be set.
 * @param {Number|false} height  Height to be set.
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setSize = function setSize (width, height) {
    this._assertTargetLoaded();

    this.setWidth(width);
    this.setHeight(height);
};

/**
 * Sets the width of the currently loaded target.
 * Removes any explicit sizing constraints when passed in `false`
 * ("true-sizing").
 *
 * @method
 *
 * @param {Number|false} width Width to be set.
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setWidth = function setWidth(width) {
    this._assertTargetLoaded();

    var contentWrapper = this._target.content;

    if (width === false) {
        this._target.explicitWidth = true;
        if (contentWrapper) contentWrapper.style.width = '';
        width = contentWrapper ? contentWrapper.offsetWidth : 0;
        this._target.element.style.width = width + 'px';
    }
    else {
        this._target.explicitWidth = false;
        if (contentWrapper) contentWrapper.style.width = width + 'px';
        this._target.element.style.width = width + 'px';
    }

    this._target.size[0] = width;
};

/**
 * Sets the height of the currently loaded target.
 * Removes any explicit sizing constraints when passed in `false`
 * ("true-sizing").
 *
 * @method
 *
 * @param {Number|false} height Height to be set.
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setHeight = function setHeight(height) {
    this._assertTargetLoaded();

    var contentWrapper = this._target.content;

    if (height === false) {
        this._target.explicitHeight = true;
        if (contentWrapper) contentWrapper.style.height = '';
        height = contentWrapper ? contentWrapper.offsetHeight : 0;
        this._target.element.style.height = height + 'px';
    }
    else {
        this._target.explicitHeight = false;
        if (contentWrapper) contentWrapper.style.height = height + 'px';
        this._target.element.style.height = height + 'px';
    }

    this._target.size[1] = height;
};

/**
 * Sets an attribute on the currently loaded target.
 *
 * @method
 *
 * @param {String} name Attribute name (e.g. href)
 * @param {String} value Attribute value (e.g. http://famous.org)
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setAttribute = function setAttribute(name, value) {
    this._assertTargetLoaded();
    this._target.element.setAttribute(name, value);
};

/**
 * Sets the `innerHTML` content of the currently loaded target.
 *
 * @method
 *
 * @param {String} content Content to be set as `innerHTML`
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setContent = function setContent(content) {
    this._assertTargetLoaded();
    this.findChildren();

    if (!this._target.content) {
        this._target.content = document.createElement('div');
        this._target.content.classList.add('famous-dom-element-content');
        this._target.element.insertBefore(
            this._target.content,
            this._target.element.firstChild
        );
    }
    this._target.content.innerHTML = content;

    this.setSize(
        this._target.explicitWidth ? false : this._target.size[0],
        this._target.explicitHeight ? false : this._target.size[1]
    );
};


/**
 * Sets the passed in transform matrix (world space). Inverts the parent's world
 * transform.
 *
 * @method
 *
 * @param {Float32Array} transform The transform for the loaded DOM Element in world space
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.setMatrix = function setMatrix(transform) {
    // TODO Don't multiply matrics in the first place.
    this._assertTargetLoaded();
    this.findParent();
    var worldTransform = this._target.worldTransform;
    var changed = false;

    var i;
    var len;

    if (transform)
        for (i = 0, len = 16 ; i < len ; i++) {
            changed = changed ? changed : worldTransform[i] === transform[i];
            worldTransform[i] = transform[i];
        }
    else changed = true;

    if (changed) {
        math.invert(this._target.invertedParent, this._parent.worldTransform);
        math.multiply(this._target.finalTransform, this._target.invertedParent, worldTransform);

        // TODO: this is a temporary fix for draw commands
        // coming in out of order
        var children = this.findChildren([]);
        var previousPath = this._path;
        var previousTarget = this._target;
        for (i = 0, len = children.length ; i < len ; i++) {
            this._target = children[i];
            this._path = this._target.path;
            this.setMatrix();
        }
        this._path = previousPath;
        this._target = previousTarget;
    }

    this._target.element.style[TRANSFORM] = this._stringifyMatrix(this._target.finalTransform);
};


/**
 * Adds a class to the classList associated with the currently loaded target.
 *
 * @method
 *
 * @param {String} domClass Class name to be added to the current target.
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.addClass = function addClass(domClass) {
    this._assertTargetLoaded();
    this._target.element.classList.add(domClass);
};


/**
 * Removes a class from the classList associated with the currently loaded
 * target.
 *
 * @method
 *
 * @param {String} domClass Class name to be removed from currently loaded target.
 *
 * @return {undefined} undefined
 */
DOMRenderer.prototype.removeClass = function removeClass(domClass) {
    this._assertTargetLoaded();
    this._target.element.classList.remove(domClass);
};


/**
 * Stringifies the passed in matrix for setting the `transform` property.
 *
 * @method  _stringifyMatrix
 * @private
 *
 * @param {Array} m    Matrix as an array or array-like object.
 * @return {String}     Stringified matrix as `matrix3d`-property.
 */
DOMRenderer.prototype._stringifyMatrix = function _stringifyMatrix(m) {
    var r = 'matrix3d(';

    r += (m[0] < 0.000001 && m[0] > -0.000001) ? '0,' : m[0] + ',';
    r += (m[1] < 0.000001 && m[1] > -0.000001) ? '0,' : m[1] + ',';
    r += (m[2] < 0.000001 && m[2] > -0.000001) ? '0,' : m[2] + ',';
    r += (m[3] < 0.000001 && m[3] > -0.000001) ? '0,' : m[3] + ',';
    r += (m[4] < 0.000001 && m[4] > -0.000001) ? '0,' : m[4] + ',';
    r += (m[5] < 0.000001 && m[5] > -0.000001) ? '0,' : m[5] + ',';
    r += (m[6] < 0.000001 && m[6] > -0.000001) ? '0,' : m[6] + ',';
    r += (m[7] < 0.000001 && m[7] > -0.000001) ? '0,' : m[7] + ',';
    r += (m[8] < 0.000001 && m[8] > -0.000001) ? '0,' : m[8] + ',';
    r += (m[9] < 0.000001 && m[9] > -0.000001) ? '0,' : m[9] + ',';
    r += (m[10] < 0.000001 && m[10] > -0.000001) ? '0,' : m[10] + ',';
    r += (m[11] < 0.000001 && m[11] > -0.000001) ? '0,' : m[11] + ',';
    r += (m[12] < 0.000001 && m[12] > -0.000001) ? '0,' : m[12] + ',';
    r += (m[13] < 0.000001 && m[13] > -0.000001) ? '0,' : m[13] + ',';
    r += (m[14] < 0.000001 && m[14] > -0.000001) ? '0,' : m[14] + ',';

    r += m[15] + ')';
    return r;
};

module.exports = DOMRenderer;

},{"../utilities/vendorPrefix":42,"./ElementCache":16,"./Math":17,"./events/EventMap":20}],16:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

// Transform identity matrix. 
var ident = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

/**
 * ElementCache is being used for keeping track of an element's DOM Element,
 * path, world transform, inverted parent, final transform (as being used for
 * setting the actual `transform`-property) and post render size (final size as
 * being rendered to the DOM).
 * 
 * @class ElementCache
 *  
 * @param {Element} element DOMElement
 * @param {String} path Path used for uniquely identifying the location in the scene graph.
 */ 
function ElementCache (element, path) {
    this.element = element;
    this.path = path;
    this.content = null;
    this.size = new Int16Array(3);
    this.explicitHeight = false;
    this.explicitWidth = false;
    this.worldTransform = new Float32Array(ident);
    this.invertedParent = new Float32Array(ident);
    this.finalTransform = new Float32Array(ident);
    this.postRenderSize = new Float32Array(2);
    this.listeners = {};
    this.preventDefault = {};
    this.subscribe = {};
}

module.exports = ElementCache;

},{}],17:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * A method for inverting a transform matrix
 *
 * @method
 *
 * @param {Array} out array to store the return of the inversion
 * @param {Array} a transform matrix to inverse
 *
 * @return {Array} out
 *   output array that is storing the transform matrix
 */
function invert (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
}

/**
 * A method for multiplying two matricies
 *
 * @method
 *
 * @param {Array} out array to store the return of the multiplication
 * @param {Array} a transform matrix to multiply
 * @param {Array} b transform matrix to multiply
 *
 * @return {Array} out
 *   output array that is storing the transform matrix
 */
function multiply (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3],
        b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7],
        b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11],
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    var changed = false;
    var out0, out1, out2, out3;

    out0 = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out1 = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out2 = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out3 = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    changed = changed ?
              changed : out0 === out[0] ||
                        out1 === out[1] ||
                        out2 === out[2] ||
                        out3 === out[3];

    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = out3;

    b0 = b4; b1 = b5; b2 = b6; b3 = b7;
    out0 = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out1 = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out2 = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out3 = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    changed = changed ?
              changed : out0 === out[4] ||
                        out1 === out[5] ||
                        out2 === out[6] ||
                        out3 === out[7];

    out[4] = out0;
    out[5] = out1;
    out[6] = out2;
    out[7] = out3;

    b0 = b8; b1 = b9; b2 = b10; b3 = b11;
    out0 = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out1 = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out2 = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out3 = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    changed = changed ?
              changed : out0 === out[8] ||
                        out1 === out[9] ||
                        out2 === out[10] ||
                        out3 === out[11];

    out[8] = out0;
    out[9] = out1;
    out[10] = out2;
    out[11] = out3;

    b0 = b12; b1 = b13; b2 = b14; b3 = b15;
    out0 = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out1 = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out2 = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out3 = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    changed = changed ?
              changed : out0 === out[12] ||
                        out1 === out[13] ||
                        out2 === out[14] ||
                        out3 === out[15];

    out[12] = out0;
    out[13] = out1;
    out[14] = out2;
    out[15] = out3;

    return out;
}

module.exports = {
    multiply: multiply,
    invert: invert
};

},{}],18:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var UIEvent = require('./UIEvent');

/**
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428/#events-compositionevents).
 *
 * @class CompositionEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function CompositionEvent(ev) {
    // [Constructor(DOMString typeArg, optional CompositionEventInit compositionEventInitDict)]
    // interface CompositionEvent : UIEvent {
    //     readonly    attribute DOMString data;
    // };

    UIEvent.call(this, ev);

    /**
     * @name CompositionEvent#data
     * @type String
     */
    this.data = ev.data;
}

CompositionEvent.prototype = Object.create(UIEvent.prototype);
CompositionEvent.prototype.constructor = CompositionEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
CompositionEvent.prototype.toString = function toString () {
    return 'CompositionEvent';
};

module.exports = CompositionEvent;

},{"./UIEvent":26}],19:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * The Event class is being used in order to normalize native DOM events.
 * Events need to be normalized in order to be serialized through the structured
 * cloning algorithm used by the `postMessage` method (Web Workers).
 *
 * Wrapping DOM events also has the advantage of providing a consistent
 * interface for interacting with DOM events across browsers by copying over a
 * subset of the exposed properties that is guaranteed to be consistent across
 * browsers.
 *
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428/#interface-Event).
 *
 * @class Event
 *
 * @param {Event} ev The native DOM event.
 */
function Event(ev) {
    // [Constructor(DOMString type, optional EventInit eventInitDict),
    //  Exposed=Window,Worker]
    // interface Event {
    //   readonly attribute DOMString type;
    //   readonly attribute EventTarget? target;
    //   readonly attribute EventTarget? currentTarget;

    //   const unsigned short NONE = 0;
    //   const unsigned short CAPTURING_PHASE = 1;
    //   const unsigned short AT_TARGET = 2;
    //   const unsigned short BUBBLING_PHASE = 3;
    //   readonly attribute unsigned short eventPhase;

    //   void stopPropagation();
    //   void stopImmediatePropagation();

    //   readonly attribute boolean bubbles;
    //   readonly attribute boolean cancelable;
    //   void preventDefault();
    //   readonly attribute boolean defaultPrevented;

    //   [Unforgeable] readonly attribute boolean isTrusted;
    //   readonly attribute DOMTimeStamp timeStamp;

    //   void initEvent(DOMString type, boolean bubbles, boolean cancelable);
    // };

    /**
     * @name Event#type
     * @type String
     */
    this.type = ev.type;

    /**
     * @name Event#defaultPrevented
     * @type Boolean
     */
    this.defaultPrevented = ev.defaultPrevented;

    /**
     * @name Event#timeStamp
     * @type Number
     */
    this.timeStamp = ev.timeStamp;


    /**
     * Used for exposing the current target's value.
     *
     * @name Event#value
     * @type String
     */
    var targetConstructor = ev.target.constructor;
    // TODO Support HTMLKeygenElement
    if (
        targetConstructor === HTMLInputElement ||
        targetConstructor === HTMLTextAreaElement ||
        targetConstructor === HTMLSelectElement
    ) {
        this.value = ev.target.value;
    }
}

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
Event.prototype.toString = function toString () {
    return 'Event';
};

module.exports = Event;

},{}],20:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var CompositionEvent = require('./CompositionEvent');
var Event = require('./Event');
var FocusEvent = require('./FocusEvent');
var InputEvent = require('./InputEvent');
var KeyboardEvent = require('./KeyboardEvent');
var MouseEvent = require('./MouseEvent');
var TouchEvent = require('./TouchEvent');
var UIEvent = require('./UIEvent');
var WheelEvent = require('./WheelEvent');

/**
 * A mapping of DOM events to the corresponding handlers
 *
 * @name EventMap
 * @type Object
 */
var EventMap = {
    change                         : [Event, true],
    submit                         : [Event, true],

    // UI Events (http://www.w3.org/TR/uievents/)
    abort                          : [Event, false],
    beforeinput                    : [InputEvent, true],
    blur                           : [FocusEvent, false],
    click                          : [MouseEvent, true],
    compositionend                 : [CompositionEvent, true],
    compositionstart               : [CompositionEvent, true],
    compositionupdate              : [CompositionEvent, true],
    dblclick                       : [MouseEvent, true],
    focus                          : [FocusEvent, false],
    focusin                        : [FocusEvent, true],
    focusout                       : [FocusEvent, true],
    input                          : [InputEvent, true],
    keydown                        : [KeyboardEvent, true],
    keyup                          : [KeyboardEvent, true],
    load                           : [Event, false],
    mousedown                      : [MouseEvent, true],
    mouseenter                     : [MouseEvent, false],
    mouseleave                     : [MouseEvent, false],

    // bubbles, but will be triggered very frequently
    mousemove                      : [MouseEvent, false],

    mouseout                       : [MouseEvent, true],
    mouseover                      : [MouseEvent, true],
    mouseup                        : [MouseEvent, true],
    resize                         : [UIEvent, false],

    // might bubble
    scroll                         : [UIEvent, false],

    select                         : [Event, true],
    unload                         : [Event, false],
    wheel                          : [WheelEvent, true],

    // Touch Events Extension (http://www.w3.org/TR/touch-events-extensions/)
    touchcancel                    : [TouchEvent, true],
    touchend                       : [TouchEvent, true],
    touchmove                      : [TouchEvent, true],
    touchstart                     : [TouchEvent, true]
};

module.exports = EventMap;

},{"./CompositionEvent":18,"./Event":19,"./FocusEvent":21,"./InputEvent":22,"./KeyboardEvent":23,"./MouseEvent":24,"./TouchEvent":25,"./UIEvent":26,"./WheelEvent":27}],21:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var UIEvent = require('./UIEvent');

/**
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428/#events-focusevent).
 *
 * @class FocusEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function FocusEvent(ev) {
    // [Constructor(DOMString typeArg, optional FocusEventInit focusEventInitDict)]
    // interface FocusEvent : UIEvent {
    //     readonly    attribute EventTarget? relatedTarget;
    // };

    UIEvent.call(this, ev);
}

FocusEvent.prototype = Object.create(UIEvent.prototype);
FocusEvent.prototype.constructor = FocusEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
FocusEvent.prototype.toString = function toString () {
    return 'FocusEvent';
};

module.exports = FocusEvent;

},{"./UIEvent":26}],22:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var UIEvent = require('./UIEvent');

/**
 * See [Input Events](http://w3c.github.io/editing-explainer/input-events.html#idl-def-InputEvent).
 *
 * @class InputEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function InputEvent(ev) {
    // [Constructor(DOMString typeArg, optional InputEventInit inputEventInitDict)]
    // interface InputEvent : UIEvent {
    //     readonly    attribute DOMString inputType;
    //     readonly    attribute DOMString data;
    //     readonly    attribute boolean   isComposing;
    //     readonly    attribute Range     targetRange;
    // };

    UIEvent.call(this, ev);

    /**
     * @name    InputEvent#inputType
     * @type    String
     */
    this.inputType = ev.inputType;

    /**
     * @name    InputEvent#data
     * @type    String
     */
    this.data = ev.data;

    /**
     * @name    InputEvent#isComposing
     * @type    Boolean
     */
    this.isComposing = ev.isComposing;

    /**
     * **Limited browser support**.
     *
     * @name    InputEvent#targetRange
     * @type    Boolean
     */
    this.targetRange = ev.targetRange;
}

InputEvent.prototype = Object.create(UIEvent.prototype);
InputEvent.prototype.constructor = InputEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
InputEvent.prototype.toString = function toString () {
    return 'InputEvent';
};

module.exports = InputEvent;

},{"./UIEvent":26}],23:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var UIEvent = require('./UIEvent');

/**
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428/#events-keyboardevents).
 *
 * @class KeyboardEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function KeyboardEvent(ev) {
    // [Constructor(DOMString typeArg, optional KeyboardEventInit keyboardEventInitDict)]
    // interface KeyboardEvent : UIEvent {
    //     // KeyLocationCode
    //     const unsigned long DOM_KEY_LOCATION_STANDARD = 0x00;
    //     const unsigned long DOM_KEY_LOCATION_LEFT = 0x01;
    //     const unsigned long DOM_KEY_LOCATION_RIGHT = 0x02;
    //     const unsigned long DOM_KEY_LOCATION_NUMPAD = 0x03;
    //     readonly    attribute DOMString     key;
    //     readonly    attribute DOMString     code;
    //     readonly    attribute unsigned long location;
    //     readonly    attribute boolean       ctrlKey;
    //     readonly    attribute boolean       shiftKey;
    //     readonly    attribute boolean       altKey;
    //     readonly    attribute boolean       metaKey;
    //     readonly    attribute boolean       repeat;
    //     readonly    attribute boolean       isComposing;
    //     boolean getModifierState (DOMString keyArg);
    // };

    UIEvent.call(this, ev);

    /**
     * @name KeyboardEvent#DOM_KEY_LOCATION_STANDARD
     * @type Number
     */
    this.DOM_KEY_LOCATION_STANDARD = 0x00;

    /**
     * @name KeyboardEvent#DOM_KEY_LOCATION_LEFT
     * @type Number
     */
    this.DOM_KEY_LOCATION_LEFT = 0x01;

    /**
     * @name KeyboardEvent#DOM_KEY_LOCATION_RIGHT
     * @type Number
     */
    this.DOM_KEY_LOCATION_RIGHT = 0x02;

    /**
     * @name KeyboardEvent#DOM_KEY_LOCATION_NUMPAD
     * @type Number
     */
    this.DOM_KEY_LOCATION_NUMPAD = 0x03;

    /**
     * @name KeyboardEvent#key
     * @type String
     */
    this.key = ev.key;

    /**
     * @name KeyboardEvent#code
     * @type String
     */
    this.code = ev.code;

    /**
     * @name KeyboardEvent#location
     * @type Number
     */
    this.location = ev.location;

    /**
     * @name KeyboardEvent#ctrlKey
     * @type Boolean
     */
    this.ctrlKey = ev.ctrlKey;

    /**
     * @name KeyboardEvent#shiftKey
     * @type Boolean
     */
    this.shiftKey = ev.shiftKey;

    /**
     * @name KeyboardEvent#altKey
     * @type Boolean
     */
    this.altKey = ev.altKey;

    /**
     * @name KeyboardEvent#metaKey
     * @type Boolean
     */
    this.metaKey = ev.metaKey;

    /**
     * @name KeyboardEvent#repeat
     * @type Boolean
     */
    this.repeat = ev.repeat;

    /**
     * @name KeyboardEvent#isComposing
     * @type Boolean
     */
    this.isComposing = ev.isComposing;

    /**
     * @name KeyboardEvent#keyCode
     * @type String
     * @deprecated
     */
    this.keyCode = ev.keyCode;
}

KeyboardEvent.prototype = Object.create(UIEvent.prototype);
KeyboardEvent.prototype.constructor = KeyboardEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
KeyboardEvent.prototype.toString = function toString () {
    return 'KeyboardEvent';
};

module.exports = KeyboardEvent;

},{"./UIEvent":26}],24:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var UIEvent = require('./UIEvent');

/**
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428/#events-mouseevents).
 *
 * @class KeyboardEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function MouseEvent(ev) {
    // [Constructor(DOMString typeArg, optional MouseEventInit mouseEventInitDict)]
    // interface MouseEvent : UIEvent {
    //     readonly    attribute long           screenX;
    //     readonly    attribute long           screenY;
    //     readonly    attribute long           clientX;
    //     readonly    attribute long           clientY;
    //     readonly    attribute boolean        ctrlKey;
    //     readonly    attribute boolean        shiftKey;
    //     readonly    attribute boolean        altKey;
    //     readonly    attribute boolean        metaKey;
    //     readonly    attribute short          button;
    //     readonly    attribute EventTarget?   relatedTarget;
    //     // Introduced in this specification
    //     readonly    attribute unsigned short buttons;
    //     boolean getModifierState (DOMString keyArg);
    // };

    UIEvent.call(this, ev);

    /**
     * @name MouseEvent#screenX
     * @type Number
     */
    this.screenX = ev.screenX;

    /**
     * @name MouseEvent#screenY
     * @type Number
     */
    this.screenY = ev.screenY;

    /**
     * @name MouseEvent#clientX
     * @type Number
     */
    this.clientX = ev.clientX;

    /**
     * @name MouseEvent#clientY
     * @type Number
     */
    this.clientY = ev.clientY;

    /**
     * @name MouseEvent#ctrlKey
     * @type Boolean
     */
    this.ctrlKey = ev.ctrlKey;

    /**
     * @name MouseEvent#shiftKey
     * @type Boolean
     */
    this.shiftKey = ev.shiftKey;

    /**
     * @name MouseEvent#altKey
     * @type Boolean
     */
    this.altKey = ev.altKey;

    /**
     * @name MouseEvent#metaKey
     * @type Boolean
     */
    this.metaKey = ev.metaKey;

    /**
     * @type MouseEvent#button
     * @type Number
     */
    this.button = ev.button;

    /**
     * @type MouseEvent#buttons
     * @type Number
     */
    this.buttons = ev.buttons;

    /**
     * @type MouseEvent#pageX
     * @type Number
     */
    this.pageX = ev.pageX;

    /**
     * @type MouseEvent#pageY
     * @type Number
     */
    this.pageY = ev.pageY;

    /**
     * @type MouseEvent#x
     * @type Number
     */
    this.x = ev.x;

    /**
     * @type MouseEvent#y
     * @type Number
     */
    this.y = ev.y;

    /**
     * @type MouseEvent#offsetX
     * @type Number
     */
    this.offsetX = ev.offsetX;

    /**
     * @type MouseEvent#offsetY
     * @type Number
     */
    this.offsetY = ev.offsetY;
}

MouseEvent.prototype = Object.create(UIEvent.prototype);
MouseEvent.prototype.constructor = MouseEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
MouseEvent.prototype.toString = function toString () {
    return 'MouseEvent';
};

module.exports = MouseEvent;

},{"./UIEvent":26}],25:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var UIEvent = require('./UIEvent');

var EMPTY_ARRAY = [];

/**
 * See [Touch Interface](http://www.w3.org/TR/2013/REC-touch-events-20131010/#touch-interface).
 *
 * @class Touch
 * @private
 *
 * @param {Touch} touch The native Touch object.
 */
function Touch(touch) {
    // interface Touch {
    //     readonly    attribute long        identifier;
    //     readonly    attribute EventTarget target;
    //     readonly    attribute double      screenX;
    //     readonly    attribute double      screenY;
    //     readonly    attribute double      clientX;
    //     readonly    attribute double      clientY;
    //     readonly    attribute double      pageX;
    //     readonly    attribute double      pageY;
    // };

    /**
     * @name Touch#identifier
     * @type Number
     */
    this.identifier = touch.identifier;

    /**
     * @name Touch#screenX
     * @type Number
     */
    this.screenX = touch.screenX;

    /**
     * @name Touch#screenY
     * @type Number
     */
    this.screenY = touch.screenY;

    /**
     * @name Touch#clientX
     * @type Number
     */
    this.clientX = touch.clientX;

    /**
     * @name Touch#clientY
     * @type Number
     */
    this.clientY = touch.clientY;

    /**
     * @name Touch#pageX
     * @type Number
     */
    this.pageX = touch.pageX;

    /**
     * @name Touch#pageY
     * @type Number
     */
    this.pageY = touch.pageY;
}


/**
 * Normalizes the browser's native TouchList by converting it into an array of
 * normalized Touch objects.
 *
 * @method  cloneTouchList
 * @private
 *
 * @param  {TouchList} touchList    The native TouchList array.
 * @return {Array.<Touch>}          An array of normalized Touch objects.
 */
function cloneTouchList(touchList) {
    if (!touchList) return EMPTY_ARRAY;
    // interface TouchList {
    //     readonly    attribute unsigned long length;
    //     getter Touch? item (unsigned long index);
    // };

    var touchListArray = [];
    for (var i = 0; i < touchList.length; i++) {
        touchListArray[i] = new Touch(touchList[i]);
    }
    return touchListArray;
}

/**
 * See [Touch Event Interface](http://www.w3.org/TR/2013/REC-touch-events-20131010/#touchevent-interface).
 *
 * @class TouchEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function TouchEvent(ev) {
    // interface TouchEvent : UIEvent {
    //     readonly    attribute TouchList touches;
    //     readonly    attribute TouchList targetTouches;
    //     readonly    attribute TouchList changedTouches;
    //     readonly    attribute boolean   altKey;
    //     readonly    attribute boolean   metaKey;
    //     readonly    attribute boolean   ctrlKey;
    //     readonly    attribute boolean   shiftKey;
    // };
    UIEvent.call(this, ev);

    /**
     * @name TouchEvent#touches
     * @type Array.<Touch>
     */
    this.touches = cloneTouchList(ev.touches);

    /**
     * @name TouchEvent#targetTouches
     * @type Array.<Touch>
     */
    this.targetTouches = cloneTouchList(ev.targetTouches);

    /**
     * @name TouchEvent#changedTouches
     * @type TouchList
     */
    this.changedTouches = cloneTouchList(ev.changedTouches);

    /**
     * @name TouchEvent#altKey
     * @type Boolean
     */
    this.altKey = ev.altKey;

    /**
     * @name TouchEvent#metaKey
     * @type Boolean
     */
    this.metaKey = ev.metaKey;

    /**
     * @name TouchEvent#ctrlKey
     * @type Boolean
     */
    this.ctrlKey = ev.ctrlKey;

    /**
     * @name TouchEvent#shiftKey
     * @type Boolean
     */
    this.shiftKey = ev.shiftKey;
}

TouchEvent.prototype = Object.create(UIEvent.prototype);
TouchEvent.prototype.constructor = TouchEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
TouchEvent.prototype.toString = function toString () {
    return 'TouchEvent';
};

module.exports = TouchEvent;

},{"./UIEvent":26}],26:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Event = require('./Event');

/**
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428).
 *
 * @class UIEvent
 * @augments Event
 *
 * @param  {Event} ev   The native DOM event.
 */
function UIEvent(ev) {
    // [Constructor(DOMString type, optional UIEventInit eventInitDict)]
    // interface UIEvent : Event {
    //     readonly    attribute Window? view;
    //     readonly    attribute long    detail;
    // };
    Event.call(this, ev);

    /**
     * @name UIEvent#detail
     * @type Number
     */
    this.detail = ev.detail;
}

UIEvent.prototype = Object.create(Event.prototype);
UIEvent.prototype.constructor = UIEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
UIEvent.prototype.toString = function toString () {
    return 'UIEvent';
};

module.exports = UIEvent;

},{"./Event":19}],27:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var MouseEvent = require('./MouseEvent');

/**
 * See [UI Events (formerly DOM Level 3 Events)](http://www.w3.org/TR/2015/WD-uievents-20150428/#events-wheelevents).
 *
 * @class WheelEvent
 * @augments UIEvent
 *
 * @param {Event} ev The native DOM event.
 */
function WheelEvent(ev) {
    // [Constructor(DOMString typeArg, optional WheelEventInit wheelEventInitDict)]
    // interface WheelEvent : MouseEvent {
    //     // DeltaModeCode
    //     const unsigned long DOM_DELTA_PIXEL = 0x00;
    //     const unsigned long DOM_DELTA_LINE = 0x01;
    //     const unsigned long DOM_DELTA_PAGE = 0x02;
    //     readonly    attribute double        deltaX;
    //     readonly    attribute double        deltaY;
    //     readonly    attribute double        deltaZ;
    //     readonly    attribute unsigned long deltaMode;
    // };

    MouseEvent.call(this, ev);

    /**
     * @name WheelEvent#DOM_DELTA_PIXEL
     * @type Number
     */
    this.DOM_DELTA_PIXEL = 0x00;

    /**
     * @name WheelEvent#DOM_DELTA_LINE
     * @type Number
     */
    this.DOM_DELTA_LINE = 0x01;

    /**
     * @name WheelEvent#DOM_DELTA_PAGE
     * @type Number
     */
    this.DOM_DELTA_PAGE = 0x02;

    /**
     * @name WheelEvent#deltaX
     * @type Number
     */
    this.deltaX = ev.deltaX;

    /**
     * @name WheelEvent#deltaY
     * @type Number
     */
    this.deltaY = ev.deltaY;

    /**
     * @name WheelEvent#deltaZ
     * @type Number
     */
    this.deltaZ = ev.deltaZ;

    /**
     * @name WheelEvent#deltaMode
     * @type Number
     */
    this.deltaMode = ev.deltaMode;
}

WheelEvent.prototype = Object.create(MouseEvent.prototype);
WheelEvent.prototype.constructor = WheelEvent;

/**
 * Return the name of the event type
 *
 * @method
 *
 * @return {String} Name of the event type
 */
WheelEvent.prototype.toString = function toString () {
    return 'WheelEvent';
};

module.exports = WheelEvent;

},{"./MouseEvent":24}],28:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * A two-dimensional vector.
 *
 * @class Vec2
 *
 * @param {Number} x The x component.
 * @param {Number} y The y component.
 */
var Vec2 = function(x, y) {
    if (x instanceof Array || x instanceof Float32Array) {
        this.x = x[0] || 0;
        this.y = x[1] || 0;
    }
    else {
        this.x = x || 0;
        this.y = y || 0;
    }
};

/**
 * Set the components of the current Vec2.
 *
 * @method
 *
 * @param {Number} x The x component.
 * @param {Number} y The y component.
 *
 * @return {Vec2} this
 */
Vec2.prototype.set = function set(x, y) {
    if (x != null) this.x = x;
    if (y != null) this.y = y;
    return this;
};

/**
 * Add the input v to the current Vec2.
 *
 * @method
 *
 * @param {Vec2} v The Vec2 to add.
 *
 * @return {Vec2} this
 */
Vec2.prototype.add = function add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
};

/**
 * Subtract the input v from the current Vec2.
 *
 * @method
 *
 * @param {Vec2} v The Vec2 to subtract.
 *
 * @return {Vec2} this
 */
Vec2.prototype.subtract = function subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
};

/**
 * Scale the current Vec2 by a scalar or Vec2.
 *
 * @method
 *
 * @param {Number|Vec2} s The Number or vec2 by which to scale.
 *
 * @return {Vec2} this
 */
Vec2.prototype.scale = function scale(s) {
    if (s instanceof Vec2) {
        this.x *= s.x;
        this.y *= s.y;
    }
    else {
        this.x *= s;
        this.y *= s;
    }
    return this;
};

/**
 * Rotate the Vec2 counter-clockwise by theta about the z-axis.
 *
 * @method
 *
 * @param {Number} theta Angle by which to rotate.
 *
 * @return {Vec2} this
 */
Vec2.prototype.rotate = function(theta) {
    var x = this.x;
    var y = this.y;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    this.x = x * cosTheta - y * sinTheta;
    this.y = x * sinTheta + y * cosTheta;

    return this;
};

/**
 * The dot product of of the current Vec2 with the input Vec2.
 *
 * @method
 *
 * @param {Number} v The other Vec2.
 *
 * @return {Vec2} this
 */
Vec2.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
};

/**
 * The cross product of of the current Vec2 with the input Vec2.
 *
 * @method
 *
 * @param {Number} v The other Vec2.
 *
 * @return {Vec2} this
 */
Vec2.prototype.cross = function(v) {
    return this.x * v.y - this.y * v.x;
};

/**
 * Preserve the magnitude but invert the orientation of the current Vec2.
 *
 * @method
 *
 * @return {Vec2} this
 */
Vec2.prototype.invert = function invert() {
    this.x *= -1;
    this.y *= -1;
    return this;
};

/**
 * Apply a function component-wise to the current Vec2.
 *
 * @method
 *
 * @param {Function} fn Function to apply.
 *
 * @return {Vec2} this
 */
Vec2.prototype.map = function map(fn) {
    this.x = fn(this.x);
    this.y = fn(this.y);
    return this;
};

/**
 * Get the magnitude of the current Vec2.
 *
 * @method
 *
 * @return {Number} the length of the vector
 */
Vec2.prototype.length = function length() {
    var x = this.x;
    var y = this.y;

    return Math.sqrt(x * x + y * y);
};

/**
 * Copy the input onto the current Vec2.
 *
 * @method
 *
 * @param {Vec2} v Vec2 to copy
 *
 * @return {Vec2} this
 */
Vec2.prototype.copy = function copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
};

/**
 * Reset the current Vec2.
 *
 * @method
 *
 * @return {Vec2} this
 */
Vec2.prototype.clear = function clear() {
    this.x = 0;
    this.y = 0;
    return this;
};

/**
 * Check whether the magnitude of the current Vec2 is exactly 0.
 *
 * @method
 *
 * @return {Boolean} whether or not the length is 0
 */
Vec2.prototype.isZero = function isZero() {
    if (this.x !== 0 || this.y !== 0) return false;
    else return true;
};

/**
 * The array form of the current Vec2.
 *
 * @method
 *
 * @return {Array} the Vec to as an array
 */
Vec2.prototype.toArray = function toArray() {
    return [this.x, this.y];
};

/**
 * Normalize the input Vec2.
 *
 * @method
 *
 * @param {Vec2} v The reference Vec2.
 * @param {Vec2} output Vec2 in which to place the result.
 *
 * @return {Vec2} The normalized Vec2.
 */
Vec2.normalize = function normalize(v, output) {
    var x = v.x;
    var y = v.y;

    var length = Math.sqrt(x * x + y * y) || 1;
    length = 1 / length;
    output.x = v.x * length;
    output.y = v.y * length;

    return output;
};

/**
 * Clone the input Vec2.
 *
 * @method
 *
 * @param {Vec2} v The Vec2 to clone.
 *
 * @return {Vec2} The cloned Vec2.
 */
Vec2.clone = function clone(v) {
    return new Vec2(v.x, v.y);
};

/**
 * Add the input Vec2's.
 *
 * @method
 *
 * @param {Vec2} v1 The left Vec2.
 * @param {Vec2} v2 The right Vec2.
 * @param {Vec2} output Vec2 in which to place the result.
 *
 * @return {Vec2} The result of the addition.
 */
Vec2.add = function add(v1, v2, output) {
    output.x = v1.x + v2.x;
    output.y = v1.y + v2.y;

    return output;
};

/**
 * Subtract the second Vec2 from the first.
 *
 * @method
 *
 * @param {Vec2} v1 The left Vec2.
 * @param {Vec2} v2 The right Vec2.
 * @param {Vec2} output Vec2 in which to place the result.
 *
 * @return {Vec2} The result of the subtraction.
 */
Vec2.subtract = function subtract(v1, v2, output) {
    output.x = v1.x - v2.x;
    output.y = v1.y - v2.y;
    return output;
};

/**
 * Scale the input Vec2.
 *
 * @method
 *
 * @param {Vec2} v The reference Vec2.
 * @param {Number} s Number to scale by.
 * @param {Vec2} output Vec2 in which to place the result.
 *
 * @return {Vec2} The result of the scaling.
 */
Vec2.scale = function scale(v, s, output) {
    output.x = v.x * s;
    output.y = v.y * s;
    return output;
};

/**
 * The dot product of the input Vec2's.
 *
 * @method
 *
 * @param {Vec2} v1 The left Vec2.
 * @param {Vec2} v2 The right Vec2.
 *
 * @return {Number} The dot product.
 */
Vec2.dot = function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

/**
 * The cross product of the input Vec2's.
 *
 * @method
 *
 * @param {Number} v1 The left Vec2.
 * @param {Number} v2 The right Vec2.
 *
 * @return {Number} The z-component of the cross product.
 */
Vec2.cross = function(v1,v2) {
    return v1.x * v2.y - v1.y * v2.x;
};

module.exports = Vec2;

},{}],29:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * A three-dimensional vector.
 *
 * @class Vec3
 *
 * @param {Number} x The x component.
 * @param {Number} y The y component.
 * @param {Number} z The z component.
 */
var Vec3 = function(x ,y, z){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

/**
 * Set the components of the current Vec3.
 *
 * @method
 *
 * @param {Number} x The x component.
 * @param {Number} y The y component.
 * @param {Number} z The z component.
 *
 * @return {Vec3} this
 */
Vec3.prototype.set = function set(x, y, z) {
    if (x != null) this.x = x;
    if (y != null) this.y = y;
    if (z != null) this.z = z;

    return this;
};

/**
 * Add the input v to the current Vec3.
 *
 * @method
 *
 * @param {Vec3} v The Vec3 to add.
 *
 * @return {Vec3} this
 */
Vec3.prototype.add = function add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
};

/**
 * Subtract the input v from the current Vec3.
 *
 * @method
 *
 * @param {Vec3} v The Vec3 to subtract.
 *
 * @return {Vec3} this
 */
Vec3.prototype.subtract = function subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
};

/**
 * Rotate the current Vec3 by theta clockwise about the x axis.
 *
 * @method
 *
 * @param {Number} theta Angle by which to rotate.
 *
 * @return {Vec3} this
 */
Vec3.prototype.rotateX = function rotateX(theta) {
    var y = this.y;
    var z = this.z;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    this.y = y * cosTheta - z * sinTheta;
    this.z = y * sinTheta + z * cosTheta;

    return this;
};

/**
 * Rotate the current Vec3 by theta clockwise about the y axis.
 *
 * @method
 *
 * @param {Number} theta Angle by which to rotate.
 *
 * @return {Vec3} this
 */
Vec3.prototype.rotateY = function rotateY(theta) {
    var x = this.x;
    var z = this.z;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    this.x = z * sinTheta + x * cosTheta;
    this.z = z * cosTheta - x * sinTheta;

    return this;
};

/**
 * Rotate the current Vec3 by theta clockwise about the z axis.
 *
 * @method
 *
 * @param {Number} theta Angle by which to rotate.
 *
 * @return {Vec3} this
 */
Vec3.prototype.rotateZ = function rotateZ(theta) {
    var x = this.x;
    var y = this.y;

    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    this.x = x * cosTheta - y * sinTheta;
    this.y = x * sinTheta + y * cosTheta;

    return this;
};

/**
 * The dot product of the current Vec3 with input Vec3 v.
 *
 * @method
 *
 * @param {Vec3} v The other Vec3.
 *
 * @return {Vec3} this
 */
Vec3.prototype.dot = function dot(v) {
    return this.x*v.x + this.y*v.y + this.z*v.z;
};

/**
 * The dot product of the current Vec3 with input Vec3 v.
 * Stores the result in the current Vec3.
 *
 * @method cross
 *
 * @param {Vec3} v The other Vec3
 *
 * @return {Vec3} this
 */
Vec3.prototype.cross = function cross(v) {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    var vx = v.x;
    var vy = v.y;
    var vz = v.z;

    this.x = y * vz - z * vy;
    this.y = z * vx - x * vz;
    this.z = x * vy - y * vx;
    return this;
};

/**
 * Scale the current Vec3 by a scalar.
 *
 * @method
 *
 * @param {Number} s The Number by which to scale
 *
 * @return {Vec3} this
 */
Vec3.prototype.scale = function scale(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
};

/**
 * Preserve the magnitude but invert the orientation of the current Vec3.
 *
 * @method
 *
 * @return {Vec3} this
 */
Vec3.prototype.invert = function invert() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
};

/**
 * Apply a function component-wise to the current Vec3.
 *
 * @method
 *
 * @param {Function} fn Function to apply.
 *
 * @return {Vec3} this
 */
Vec3.prototype.map = function map(fn) {
    this.x = fn(this.x);
    this.y = fn(this.y);
    this.z = fn(this.z);

    return this;
};

/**
 * The magnitude of the current Vec3.
 *
 * @method
 *
 * @return {Number} the magnitude of the Vec3
 */
Vec3.prototype.length = function length() {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * The magnitude squared of the current Vec3.
 *
 * @method
 *
 * @return {Number} magnitude of the Vec3 squared
 */
Vec3.prototype.lengthSq = function lengthSq() {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return x * x + y * y + z * z;
};

/**
 * Copy the input onto the current Vec3.
 *
 * @method
 *
 * @param {Vec3} v Vec3 to copy
 *
 * @return {Vec3} this
 */
Vec3.prototype.copy = function copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
};

/**
 * Reset the current Vec3.
 *
 * @method
 *
 * @return {Vec3} this
 */
Vec3.prototype.clear = function clear() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
};

/**
 * Check whether the magnitude of the current Vec3 is exactly 0.
 *
 * @method
 *
 * @return {Boolean} whether or not the magnitude is zero
 */
Vec3.prototype.isZero = function isZero() {
    return this.x === 0 && this.y === 0 && this.z === 0;
};

/**
 * The array form of the current Vec3.
 *
 * @method
 *
 * @return {Array} a three element array representing the components of the Vec3
 */
Vec3.prototype.toArray = function toArray() {
    return [this.x, this.y, this.z];
};

/**
 * Preserve the orientation but change the length of the current Vec3 to 1.
 *
 * @method
 *
 * @return {Vec3} this
 */
Vec3.prototype.normalize = function normalize() {
    var x = this.x;
    var y = this.y;
    var z = this.z;

    var len = Math.sqrt(x * x + y * y + z * z) || 1;
    len = 1 / len;

    this.x *= len;
    this.y *= len;
    this.z *= len;
    return this;
};

/**
 * Apply the rotation corresponding to the input (unit) Quaternion
 * to the current Vec3.
 *
 * @method
 *
 * @param {Quaternion} q Unit Quaternion representing the rotation to apply
 *
 * @return {Vec3} this
 */
Vec3.prototype.applyRotation = function applyRotation(q) {
    var cw = q.w;
    var cx = -q.x;
    var cy = -q.y;
    var cz = -q.z;

    var vx = this.x;
    var vy = this.y;
    var vz = this.z;

    var tw = -cx * vx - cy * vy - cz * vz;
    var tx = vx * cw + vy * cz - cy * vz;
    var ty = vy * cw + cx * vz - vx * cz;
    var tz = vz * cw + vx * cy - cx * vy;

    var w = cw;
    var x = -cx;
    var y = -cy;
    var z = -cz;

    this.x = tx * w + x * tw + y * tz - ty * z;
    this.y = ty * w + y * tw + tx * z - x * tz;
    this.z = tz * w + z * tw + x * ty - tx * y;
    return this;
};

/**
 * Apply the input Mat33 the the current Vec3.
 *
 * @method
 *
 * @param {Mat33} matrix Mat33 to apply
 *
 * @return {Vec3} this
 */
Vec3.prototype.applyMatrix = function applyMatrix(matrix) {
    var M = matrix.get();

    var x = this.x;
    var y = this.y;
    var z = this.z;

    this.x = M[0]*x + M[1]*y + M[2]*z;
    this.y = M[3]*x + M[4]*y + M[5]*z;
    this.z = M[6]*x + M[7]*y + M[8]*z;
    return this;
};

/**
 * Normalize the input Vec3.
 *
 * @method
 *
 * @param {Vec3} v The reference Vec3.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Vec3} The normalize Vec3.
 */
Vec3.normalize = function normalize(v, output) {
    var x = v.x;
    var y = v.y;
    var z = v.z;

    var length = Math.sqrt(x * x + y * y + z * z) || 1;
    length = 1 / length;

    output.x = x * length;
    output.y = y * length;
    output.z = z * length;
    return output;
};

/**
 * Apply a rotation to the input Vec3.
 *
 * @method
 *
 * @param {Vec3} v The reference Vec3.
 * @param {Quaternion} q Unit Quaternion representing the rotation to apply.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Vec3} The rotated version of the input Vec3.
 */
Vec3.applyRotation = function applyRotation(v, q, output) {
    var cw = q.w;
    var cx = -q.x;
    var cy = -q.y;
    var cz = -q.z;

    var vx = v.x;
    var vy = v.y;
    var vz = v.z;

    var tw = -cx * vx - cy * vy - cz * vz;
    var tx = vx * cw + vy * cz - cy * vz;
    var ty = vy * cw + cx * vz - vx * cz;
    var tz = vz * cw + vx * cy - cx * vy;

    var w = cw;
    var x = -cx;
    var y = -cy;
    var z = -cz;

    output.x = tx * w + x * tw + y * tz - ty * z;
    output.y = ty * w + y * tw + tx * z - x * tz;
    output.z = tz * w + z * tw + x * ty - tx * y;
    return output;
};

/**
 * Clone the input Vec3.
 *
 * @method
 *
 * @param {Vec3} v The Vec3 to clone.
 *
 * @return {Vec3} The cloned Vec3.
 */
Vec3.clone = function clone(v) {
    return new Vec3(v.x, v.y, v.z);
};

/**
 * Add the input Vec3's.
 *
 * @method
 *
 * @param {Vec3} v1 The left Vec3.
 * @param {Vec3} v2 The right Vec3.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Vec3} The result of the addition.
 */
Vec3.add = function add(v1, v2, output) {
    output.x = v1.x + v2.x;
    output.y = v1.y + v2.y;
    output.z = v1.z + v2.z;
    return output;
};

/**
 * Subtract the second Vec3 from the first.
 *
 * @method
 *
 * @param {Vec3} v1 The left Vec3.
 * @param {Vec3} v2 The right Vec3.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Vec3} The result of the subtraction.
 */
Vec3.subtract = function subtract(v1, v2, output) {
    output.x = v1.x - v2.x;
    output.y = v1.y - v2.y;
    output.z = v1.z - v2.z;
    return output;
};

/**
 * Scale the input Vec3.
 *
 * @method
 *
 * @param {Vec3} v The reference Vec3.
 * @param {Number} s Number to scale by.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Vec3} The result of the scaling.
 */
Vec3.scale = function scale(v, s, output) {
    output.x = v.x * s;
    output.y = v.y * s;
    output.z = v.z * s;
    return output;
};

/**
 * The dot product of the input Vec3's.
 *
 * @method
 *
 * @param {Vec3} v1 The left Vec3.
 * @param {Vec3} v2 The right Vec3.
 *
 * @return {Number} The dot product.
 */
Vec3.dot = function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

/**
 * The (right-handed) cross product of the input Vec3's.
 * v1 x v2.
 *
 * @method
 *
 * @param {Vec3} v1 The left Vec3.
 * @param {Vec3} v2 The right Vec3.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Object} the object the result of the cross product was placed into
 */
Vec3.cross = function cross(v1, v2, output) {
    var x1 = v1.x;
    var y1 = v1.y;
    var z1 = v1.z;
    var x2 = v2.x;
    var y2 = v2.y;
    var z2 = v2.z;

    output.x = y1 * z2 - z1 * y2;
    output.y = z1 * x2 - x1 * z2;
    output.z = x1 * y2 - y1 * x2;
    return output;
};

/**
 * The projection of v1 onto v2.
 *
 * @method
 *
 * @param {Vec3} v1 The left Vec3.
 * @param {Vec3} v2 The right Vec3.
 * @param {Vec3} output Vec3 in which to place the result.
 *
 * @return {Object} the object the result of the cross product was placed into 
 */
Vec3.project = function project(v1, v2, output) {
    var x1 = v1.x;
    var y1 = v1.y;
    var z1 = v1.z;
    var x2 = v2.x;
    var y2 = v2.y;
    var z2 = v2.z;

    var scale = x1 * x2 + y1 * y2 + z1 * z2;
    scale /= x2 * x2 + y2 * y2 + z2 * z2;

    output.x = x2 * scale;
    output.y = y2 * scale;
    output.z = z2 * scale;

    return output;
};

module.exports = Vec3;

},{}],30:[function(require,module,exports){
module.exports = noop

function noop() {
  throw new Error(
      'You should bundle your code ' +
      'using `glslify` as a transform.'
  )
}

},{}],31:[function(require,module,exports){
module.exports = programify

function programify(vertex, fragment, uniforms, attributes) {
  return {
    vertex: vertex, 
    fragment: fragment,
    uniforms: uniforms, 
    attributes: attributes
  };
}

},{}],32:[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

'use strict';

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];

var rAF, cAF;

if (typeof window === 'object') {
    rAF = window.requestAnimationFrame;
    cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
    for (var x = 0; x < vendors.length && !rAF; ++x) {
        rAF = window[vendors[x] + 'RequestAnimationFrame'];
        cAF = window[vendors[x] + 'CancelRequestAnimationFrame'] ||
              window[vendors[x] + 'CancelAnimationFrame'];
    }

    if (rAF && !cAF) {
        // cAF not supported.
        // Fall back to setInterval for now (very rare).
        rAF = null;
    }
}

if (!rAF) {
    var now = Date.now ? Date.now : function () {
        return new Date().getTime();
    };

    rAF = function(callback) {
        var currTime = now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    cAF = function (id) {
        clearTimeout(id);
    };
}

var animationFrame = {
    /**
     * Cross browser version of [requestAnimationFrame]{@link https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame}.
     *
     * Used by Engine in order to establish a render loop.
     *
     * If no (vendor prefixed version of) `requestAnimationFrame` is available,
     * `setTimeout` will be used in order to emulate a render loop running at
     * approximately 60 frames per second.
     *
     * @method  requestAnimationFrame
     *
     * @param   {Function}  callback function to be invoked on the next frame.
     * @return  {Number}    requestId to be used to cancel the request using
     *                      @link{cancelAnimationFrame}.
     */
    requestAnimationFrame: rAF,

    /**
     * Cross browser version of [cancelAnimationFrame]{@link https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame}.
     *
     * Cancels a previously using [requestAnimationFrame]{@link animationFrame#requestAnimationFrame}
     * scheduled request.
     *
     * Used for immediately stopping the render loop within the Engine.
     *
     * @method  cancelAnimationFrame
     *
     * @param   {Number}    requestId of the scheduled callback function
     *                      returned by [requestAnimationFrame]{@link animationFrame#requestAnimationFrame}.
     */
    cancelAnimationFrame: cAF
};

module.exports = animationFrame;

},{}],33:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

module.exports = {
    requestAnimationFrame: require('./animationFrame').requestAnimationFrame,
    cancelAnimationFrame: require('./animationFrame').cancelAnimationFrame
};

},{"./animationFrame":32}],34:[function(require,module,exports){
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Famous Industries Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var polyfills = require('../polyfills');
var rAF = polyfills.requestAnimationFrame;
var cAF = polyfills.cancelAnimationFrame;

/**
 * Boolean constant indicating whether the RequestAnimationFrameLoop has access to the document.
 * The document is being used in order to subscribe for visibilitychange events
 * used for normalizing the RequestAnimationFrameLoop time when e.g. when switching tabs.
 * 
 * @constant
 * @type {Boolean}
 */ 
var DOCUMENT_ACCESS = typeof document !== 'undefined';

if (DOCUMENT_ACCESS) {
    var VENDOR_HIDDEN, VENDOR_VISIBILITY_CHANGE;

    // Opera 12.10 and Firefox 18 and later support
    if (typeof document.hidden !== 'undefined') {
        VENDOR_HIDDEN = 'hidden';
        VENDOR_VISIBILITY_CHANGE = 'visibilitychange';
    }
    else if (typeof document.mozHidden !== 'undefined') {
        VENDOR_HIDDEN = 'mozHidden';
        VENDOR_VISIBILITY_CHANGE = 'mozvisibilitychange';
    }
    else if (typeof document.msHidden !== 'undefined') {
        VENDOR_HIDDEN = 'msHidden';
        VENDOR_VISIBILITY_CHANGE = 'msvisibilitychange';
    }
    else if (typeof document.webkitHidden !== 'undefined') {
        VENDOR_HIDDEN = 'webkitHidden';
        VENDOR_VISIBILITY_CHANGE = 'webkitvisibilitychange';
    }
}

/**
 * RequestAnimationFrameLoop class used for updating objects on a frame-by-frame. Synchronizes the
 * `update` method invocations to the refresh rate of the screen. Manages
 * the `requestAnimationFrame`-loop by normalizing the passed in timestamp
 * when switching tabs.
 * 
 * @class RequestAnimationFrameLoop
 */
function RequestAnimationFrameLoop() {
    var _this = this;
    
    // References to objects to be updated on next frame.
    this._updates = [];
    
    this._looper = function(time) {
        _this.loop(time);
    };
    this._time = 0;
    this._stoppedAt = 0;
    this._sleep = 0;
    
    // Indicates whether the engine should be restarted when the tab/ window is
    // being focused again (visibility change).
    this._startOnVisibilityChange = true;
    
    // requestId as returned by requestAnimationFrame function;
    this._rAF = null;
    
    this._sleepDiff = true;
    
    // The engine is being started on instantiation.
    // TODO(alexanderGugel)
    this.start();

    // The RequestAnimationFrameLoop supports running in a non-browser environment (e.g. Worker).
    if (DOCUMENT_ACCESS) {
        document.addEventListener(VENDOR_VISIBILITY_CHANGE, function() {
            _this._onVisibilityChange();
        });
    }
}

/**
 * Handle the switching of tabs.
 *
 * @method
 * _private
 * 
 * @return {undefined} undefined
 */
RequestAnimationFrameLoop.prototype._onVisibilityChange = function _onVisibilityChange() {
    if (document[VENDOR_HIDDEN]) {
        this._onUnfocus();
    }
    else {
        this._onFocus();
    }
};

/**
 * Internal helper function to be invoked as soon as the window/ tab is being
 * focused after a visibiltiy change.
 * 
 * @method
 * @private
 *
 * @return {undefined} undefined
 */ 
RequestAnimationFrameLoop.prototype._onFocus = function _onFocus() {
    if (this._startOnVisibilityChange) {
        this._start();
    }
};

/**
 * Internal helper function to be invoked as soon as the window/ tab is being
 * unfocused (hidden) after a visibiltiy change.
 * 
 * @method  _onFocus
 * @private
 *
 * @return {undefined} undefined
 */ 
RequestAnimationFrameLoop.prototype._onUnfocus = function _onUnfocus() {
    this._stop();
};

/**
 * Starts the RequestAnimationFrameLoop. When switching to a differnt tab/ window (changing the
 * visibiltiy), the engine will be retarted when switching back to a visible
 * state.
 *
 * @method
 * 
 * @return {RequestAnimationFrameLoop} this
 */
RequestAnimationFrameLoop.prototype.start = function start() {
    if (!this._running) {
        this._startOnVisibilityChange = true;
        this._start();
    }
    return this;
};

/**
 * Internal version of RequestAnimationFrameLoop's start function, not affecting behavior on visibilty
 * change.
 * 
 * @method
 * @private
*
 * @return {undefined} undefined
 */ 
RequestAnimationFrameLoop.prototype._start = function _start() {
    this._running = true;
    this._sleepDiff = true;
    this._rAF = rAF(this._looper);
};

/**
 * Stops the RequestAnimationFrameLoop.
 *
 * @method
 * 
 * @return {RequestAnimationFrameLoop} this
 */
RequestAnimationFrameLoop.prototype.stop = function stop() {
    if (this._running) {
        this._startOnVisibilityChange = false;
        this._stop();
    }
    return this;
};

/**
 * Internal version of RequestAnimationFrameLoop's stop function, not affecting behavior on visibilty
 * change.
 * 
 * @method
 * @private
 *
 * @return {undefined} undefined
 */ 
RequestAnimationFrameLoop.prototype._stop = function _stop() {
    this._running = false;
    this._stoppedAt = this._time;

    // Bug in old versions of Fx. Explicitly cancel.
    cAF(this._rAF);
};

/**
 * Determines whether the RequestAnimationFrameLoop is currently running or not.
 *
 * @method
 * 
 * @return {Boolean} boolean value indicating whether the RequestAnimationFrameLoop is currently running or not
 */
RequestAnimationFrameLoop.prototype.isRunning = function isRunning() {
    return this._running;
};

/**
 * Updates all registered objects.
 *
 * @method
 * 
 * @param {Number} time high resolution timstamp used for invoking the `update` method on all registered objects
 *
 * @return {RequestAnimationFrameLoop} this
 */
RequestAnimationFrameLoop.prototype.step = function step (time) {
    this._time = time;
    if (this._sleepDiff) {
        this._sleep += time - this._stoppedAt;
        this._sleepDiff = false;
    }
    
    // The same timetamp will be emitted immediately before and after visibility
    // change.
    var normalizedTime = time - this._sleep;
    for (var i = 0, len = this._updates.length ; i < len ; i++) {
        this._updates[i].update(normalizedTime);
    }
    return this;
};

/**
 * Method being called by `requestAnimationFrame` on every paint. Indirectly
 * recursive by scheduling a future invocation of itself on the next paint.
 *
 * @method
 * 
 * @param {Number} time high resolution timstamp used for invoking the `update` method on all registered objects
 * @return {RequestAnimationFrameLoop} this
 */
RequestAnimationFrameLoop.prototype.loop = function loop(time) {
    this.step(time);
    this._rAF = rAF(this._looper);
    return this;
};

/**
 * Registeres an updateable object which `update` method should be invoked on
 * every paint, starting on the next paint (assuming the RequestAnimationFrameLoop is running).
 *
 * @method
 * 
 * @param {Object} updateable object to be updated
 * @param {Function} updateable.update update function to be called on the registered object
 *
 * @return {RequestAnimationFrameLoop} this
 */
RequestAnimationFrameLoop.prototype.update = function update(updateable) {
    if (this._updates.indexOf(updateable) === -1) {
        this._updates.push(updateable);
    }
    return this;
};

/**
 * Deregisters an updateable object previously registered using `update` to be
 * no longer updated.
 *
 * @method
 * 
 * @param {Object} updateable updateable object previously registered using `update`
 *
 * @return {RequestAnimationFrameLoop} this
 */
RequestAnimationFrameLoop.prototype.noLongerUpdate = function noLongerUpdate(updateable) {
    var index = this._updates.indexOf(updateable);
    if (index > -1) {
        this._updates.splice(index, 1);
    }
    return this;
};

module.exports = RequestAnimationFrameLoop;

},{"../polyfills":33}],35:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Context = require('./Context');
var injectCSS = require('./inject-css');

/**
 * Instantiates a new Compositor.
 * The Compositor receives draw commands frm the UIManager and routes the to the
 * respective context objects.
 *
 * Upon creation, it injects a stylesheet used for styling the individual
 * renderers used in the context objects.
 *
 * @class Compositor
 * @constructor
 * @return {undefined} undefined
 */
function Compositor() {
    injectCSS();

    this._contexts = {};
    this._outCommands = [];
    this._inCommands = [];
    this._time = null;

    this._resized = false;

    var _this = this;
    window.addEventListener('resize', function() {
        _this._resized = true;
    });
}

/**
 * Retrieves the time being used by the internal clock managed by
 * `FamousEngine`.
 *
 * The time is being passed into core by the Engine through the UIManager.
 * Since core has the ability to scale the time, the time needs to be passed
 * back to the rendering system.
 *
 * @method
 *
 * @return {Number} time The clock time used in core.
 */
Compositor.prototype.getTime = function getTime() {
    return this._time;
};

/**
 * Schedules an event to be sent the next time the out command queue is being
 * flushed.
 *
 * @method
 * @private
 *
 * @param  {String} path Render path to the node the event should be triggered
 * on (*targeted event*)
 * @param  {String} ev Event type
 * @param  {Object} payload Event object (serializable using structured cloning
 * algorithm)
 *
 * @return {undefined} undefined
 */
Compositor.prototype.sendEvent = function sendEvent(path, ev, payload) {
    this._outCommands.push('WITH', path, 'TRIGGER', ev, payload);
};

/**
 * Internal helper method used for notifying externally
 * resized contexts (e.g. by resizing the browser window).
 *
 * @method
 * @private
 *
 * @param  {String} selector render path to the node (context) that should be
 * resized
 * @param  {Array} size new context size
 *
 * @return {undefined} undefined
 */
Compositor.prototype.sendResize = function sendResize (selector, size) {
    this.sendEvent(selector, 'CONTEXT_RESIZE', size);
};

/**
 * Internal helper method used by `drawCommands`.
 * Subsequent commands are being associated with the node defined the the path
 * following the `WITH` command.
 *
 * @method
 * @private
 *
 * @param  {Number} iterator position index within the commands queue
 * @param  {Array} commands remaining message queue received, used to
 * shift single messages from
 *
 * @return {undefined} undefined
 */
Compositor.prototype.handleWith = function handleWith (iterator, commands) {
    var path = commands[iterator];
    var pathArr = path.split('/');
    var context = this.getOrSetContext(pathArr.shift());
    return context.receive(path, commands, iterator);
};

/**
 * Retrieves the top-level Context associated with the passed in document
 * query selector. If no such Context exists, a new one will be instantiated.
 *
 * @method
 * @private
 *
 * @param  {String} selector document query selector used for retrieving the
 * DOM node the VirtualElement should be attached to
 *
 * @return {Context} context
 */
Compositor.prototype.getOrSetContext = function getOrSetContext(selector) {
    if (this._contexts[selector]) {
        return this._contexts[selector];
    }
    else {
        var context = new Context(selector, this);
        this._contexts[selector] = context;
        return context;
    }
};

/**
 * Internal helper method used by `drawCommands`.
 *
 * @method
 * @private
 *
 * @param  {Number} iterator position index within the command queue
 * @param  {Array} commands remaining message queue received, used to
 * shift single messages
 *
 * @return {undefined} undefined
 */
Compositor.prototype.giveSizeFor = function giveSizeFor(iterator, commands) {
    var selector = commands[iterator];
    var size = this.getOrSetContext(selector).getRootSize();
    this.sendResize(selector, size);
};

/**
 * Processes the previously via `receiveCommands` updated incoming "in"
 * command queue.
 * Called by UIManager on a frame by frame basis.
 *
 * @method
 *
 * @return {Array} outCommands set of commands to be sent back
 */
Compositor.prototype.drawCommands = function drawCommands() {
    var commands = this._inCommands;
    var localIterator = 0;
    var command = commands[localIterator];
    while (command) {
        switch (command) {
            case 'TIME':
                this._time = commands[++localIterator];
                break;
            case 'WITH':
                localIterator = this.handleWith(++localIterator, commands);
                break;
            case 'NEED_SIZE_FOR':
                this.giveSizeFor(++localIterator, commands);
                break;
        }
        command = commands[++localIterator];
    }

    // TODO: Switch to associative arrays here...

    for (var key in this._contexts) {
        this._contexts[key].draw();
    }

    if (this._resized) {
        this.updateSize();
    }

    return this._outCommands;
};


/**
 * Updates the size of all previously registered context objects.
 * This results into CONTEXT_RESIZE events being sent and the root elements
 * used by the individual renderers being resized to the the DOMRenderer's root
 * size.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Compositor.prototype.updateSize = function updateSize() {
    for (var selector in this._contexts) {
        this._contexts[selector].updateSize();
    }
};

/**
 * Used by ThreadManager to update the internal queue of incoming commands.
 * Receiving commands does not immediately start the rendering process.
 *
 * @method
 *
 * @param  {Array} commands command queue to be processed by the compositor's
 * `drawCommands` method
 *
 * @return {undefined} undefined
 */
Compositor.prototype.receiveCommands = function receiveCommands(commands) {
    var len = commands.length;
    for (var i = 0; i < len; i++) {
        this._inCommands.push(commands[i]);
    }
};

/**
 * Flushes the queue of outgoing "out" commands.
 * Called by ThreadManager.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Compositor.prototype.clearCommands = function clearCommands() {
    this._inCommands.length = 0;
    this._outCommands.length = 0;
    this._resized = false;
};

module.exports = Compositor;

},{"./Context":36,"./inject-css":38}],36:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var WebGLRenderer = require('../webgl-renderers/WebGLRenderer');
var Camera = require('../components/Camera');
var DOMRenderer = require('../dom-renderers/DOMRenderer');

/**
 * Context is a render layer with its own WebGLRenderer and DOMRenderer.
 * It is the interface between the Compositor which receives commands
 * and the renderers that interpret them. It also relays information to
 * the renderers about resizing.
 *
 * The DOMElement at the given query selector is used as the root. A
 * new DOMElement is appended to this root element, and used as the
 * parent element for all Famous DOM rendering at this context. A
 * canvas is added and used for all WebGL rendering at this context.
 *
 * @class Context
 * @constructor
 *
 * @param {String} selector Query selector used to locate root element of
 * context layer.
 * @param {Compositor} compositor Compositor reference to pass down to
 * WebGLRenderer.
 *
 * @return {undefined} undefined
 */
function Context(selector, compositor) {
    this._compositor = compositor;
    this._rootEl = document.querySelector(selector);

    this._selector = selector;

    // Create DOM element to be used as root for all famous DOM
    // rendering and append element to the root element.

    var DOMLayerEl = document.createElement('div');
    this._rootEl.appendChild(DOMLayerEl);

    // Instantiate renderers

    this.DOMRenderer = new DOMRenderer(DOMLayerEl, selector, compositor);
    this.WebGLRenderer = null;
    this.canvas = null;

    // State holders

    this._renderState = {
        projectionType: Camera.ORTHOGRAPHIC_PROJECTION,
        perspectiveTransform: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        viewTransform: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        viewDirty: false,
        perspectiveDirty: false
    };

    this._size = [];
    this._children = {};
    this._elementHash = {};

    this._meshTransform = [];
    this._meshSize = [0, 0, 0];
}

/**
 * Queries DOMRenderer size and updates canvas size. Relays size information to
 * WebGLRenderer.
 *
 * @return {Context} this
 */
Context.prototype.updateSize = function () {
    var newSize = this.DOMRenderer.getSize();
    this._compositor.sendResize(this._selector, newSize);

    var width = newSize[0];
    var height = newSize[1];

    this._size[0] = width;
    this._size[1] = height;
    this._size[2] = (width > height) ? width : height;

    if (this.canvas) {
        this.canvas.width  = width;
        this.canvas.height = height;
    }

    if (this.WebGLRenderer) this.WebGLRenderer.updateSize(this._size);

    return this;
};

/**
 * Draw function called after all commands have been handled for current frame.
 * Issues draw commands to all renderers with current renderState.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Context.prototype.draw = function draw() {
    this.DOMRenderer.draw(this._renderState);
    if (this.WebGLRenderer) this.WebGLRenderer.draw(this._renderState);

    if (this._renderState.perspectiveDirty) this._renderState.perspectiveDirty = false;
    if (this._renderState.viewDirty) this._renderState.viewDirty = false;
};

/**
 * Gets the size of the parent element of the DOMRenderer for this context.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Context.prototype.getRootSize = function getRootSize() {
    return this.DOMRenderer.getSize();
};

/**
 * Handles initialization of WebGLRenderer when necessary, including creation
 * of the canvas element and instantiation of the renderer. Also updates size
 * to pass size information to the renderer.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Context.prototype.initWebGL = function initWebGL() {
    this.canvas = document.createElement('canvas');
    this._rootEl.appendChild(this.canvas);
    this.WebGLRenderer = new WebGLRenderer(this.canvas, this._compositor);
    this.updateSize();
};

/**
 * Handles delegation of commands to renderers of this context.
 *
 * @method
 *
 * @param {String} path String used as identifier of a given node in the
 * scene graph.
 * @param {Array} commands List of all commands from this frame.
 * @param {Number} iterator Number indicating progress through the command
 * queue.
 *
 * @return {Number} iterator indicating progress through the command queue.
 */
Context.prototype.receive = function receive(path, commands, iterator) {
    var localIterator = iterator;

    var command = commands[++localIterator];
    this.DOMRenderer.loadPath(path);
    this.DOMRenderer.findTarget();
    while (command) {

        switch (command) {
            case 'INIT_DOM':
                this.DOMRenderer.insertEl(commands[++localIterator]);
                break;

            case 'DOM_RENDER_SIZE':
                this.DOMRenderer.getSizeOf(commands[++localIterator]);
                break;

            case 'CHANGE_TRANSFORM':
                for (var i = 0 ; i < 16 ; i++) this._meshTransform[i] = commands[++localIterator];

                this.DOMRenderer.setMatrix(this._meshTransform);

                if (this.WebGLRenderer)
                    this.WebGLRenderer.setCutoutUniform(path, 'u_transform', this._meshTransform);

                break;

            case 'CHANGE_SIZE':
                var width = commands[++localIterator];
                var height = commands[++localIterator];

                this.DOMRenderer.setSize(width, height);
                if (this.WebGLRenderer) {
                    this._meshSize[0] = width;
                    this._meshSize[1] = height;
                    this.WebGLRenderer.setCutoutUniform(path, 'u_size', this._meshSize);
                }
                break;

            case 'CHANGE_PROPERTY':
                if (this.WebGLRenderer) this.WebGLRenderer.getOrSetCutout(path);
                this.DOMRenderer.setProperty(commands[++localIterator], commands[++localIterator]);
                break;

            case 'CHANGE_CONTENT':
                if (this.WebGLRenderer) this.WebGLRenderer.getOrSetCutout(path);
                this.DOMRenderer.setContent(commands[++localIterator]);
                break;

            case 'CHANGE_ATTRIBUTE':
                if (this.WebGLRenderer) this.WebGLRenderer.getOrSetCutout(path);
                this.DOMRenderer.setAttribute(commands[++localIterator], commands[++localIterator]);
                break;

            case 'ADD_CLASS':
                if (this.WebGLRenderer) this.WebGLRenderer.getOrSetCutout(path);
                this.DOMRenderer.addClass(commands[++localIterator]);
                break;

            case 'REMOVE_CLASS':
                if (this.WebGLRenderer) this.WebGLRenderer.getOrSetCutout(path);
                this.DOMRenderer.removeClass(commands[++localIterator]);
                break;

            case 'SUBSCRIBE':
                if (this.WebGLRenderer) this.WebGLRenderer.getOrSetCutout(path);
                this.DOMRenderer.subscribe(commands[++localIterator], commands[++localIterator]);
                break;

            case 'GL_SET_DRAW_OPTIONS':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setMeshOptions(path, commands[++localIterator]);
                break;

            case 'GL_AMBIENT_LIGHT':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setAmbientLightColor(
                    path,
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'GL_LIGHT_POSITION':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setLightPosition(
                    path,
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'GL_LIGHT_COLOR':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setLightColor(
                    path,
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'MATERIAL_INPUT':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.handleMaterialInput(
                    path,
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'GL_SET_GEOMETRY':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setGeometry(
                    path,
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'GL_UNIFORMS':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setMeshUniform(
                    path,
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'GL_BUFFER_DATA':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.bufferData(
                    path,
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator],
                    commands[++localIterator]
                );
                break;

            case 'GL_CUTOUT_STATE':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setCutoutState(path, commands[++localIterator]);
                break;

            case 'GL_MESH_VISIBILITY':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.setMeshVisibility(path, commands[++localIterator]);
                break;

            case 'GL_REMOVE_MESH':
                if (!this.WebGLRenderer) this.initWebGL();
                this.WebGLRenderer.removeMesh(path);
                break;

            case 'PINHOLE_PROJECTION':
                this._renderState.projectionType = Camera.PINHOLE_PROJECTION;
                this._renderState.perspectiveTransform[11] = -1 / commands[++localIterator];

                this._renderState.perspectiveDirty = true;
                break;

            case 'ORTHOGRAPHIC_PROJECTION':
                this._renderState.projectionType = Camera.ORTHOGRAPHIC_PROJECTION;
                this._renderState.perspectiveTransform[11] = 0;

                this._renderState.perspectiveDirty = true;
                break;

            case 'CHANGE_VIEW_TRANSFORM':
                this._renderState.viewTransform[0] = commands[++localIterator];
                this._renderState.viewTransform[1] = commands[++localIterator];
                this._renderState.viewTransform[2] = commands[++localIterator];
                this._renderState.viewTransform[3] = commands[++localIterator];

                this._renderState.viewTransform[4] = commands[++localIterator];
                this._renderState.viewTransform[5] = commands[++localIterator];
                this._renderState.viewTransform[6] = commands[++localIterator];
                this._renderState.viewTransform[7] = commands[++localIterator];

                this._renderState.viewTransform[8] = commands[++localIterator];
                this._renderState.viewTransform[9] = commands[++localIterator];
                this._renderState.viewTransform[10] = commands[++localIterator];
                this._renderState.viewTransform[11] = commands[++localIterator];

                this._renderState.viewTransform[12] = commands[++localIterator];
                this._renderState.viewTransform[13] = commands[++localIterator];
                this._renderState.viewTransform[14] = commands[++localIterator];
                this._renderState.viewTransform[15] = commands[++localIterator];

                this._renderState.viewDirty = true;
                break;

            case 'WITH': return localIterator - 1;
        }

        command = commands[++localIterator];
    }

    return localIterator;
};

module.exports = Context;

},{"../components/Camera":4,"../dom-renderers/DOMRenderer":15,"../webgl-renderers/WebGLRenderer":52}],37:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * The UIManager is being updated by an Engine by consecutively calling its
 * `update` method. It can either manage a real Web-Worker or the global
 * FamousEngine core singleton.
 *
 * @example
 * var compositor = new Compositor();
 * var engine = new Engine();
 *
 * // Using a Web Worker
 * var worker = new Worker('worker.bundle.js');
 * var threadmanger = new UIManager(worker, compositor, engine);
 *
 * // Without using a Web Worker
 * var threadmanger = new UIManager(Famous, compositor, engine);
 *
 * @class  UIManager
 * @constructor
 *
 * @param {Famous|Worker} thread The thread being used to receive messages
 * from and post messages to. Expected to expose a WebWorker-like API, which
 * means providing a way to listen for updates by setting its `onmessage`
 * property and sending updates using `postMessage`.
 * @param {Compositor} compositor an instance of Compositor used to extract
 * enqueued draw commands from to be sent to the thread.
 * @param {RenderLoop} renderLoop an instance of Engine used for executing
 * the `ENGINE` commands on.
 */
function UIManager (thread, compositor, renderLoop) {
    this._thread = thread;
    this._compositor = compositor;
    this._renderLoop = renderLoop;

    this._renderLoop.update(this);

    var _this = this;
    this._thread.onmessage = function (ev) {
        var message = ev.data ? ev.data : ev;
        if (message[0] === 'ENGINE') {
            switch (message[1]) {
                case 'START':
                    _this._renderLoop.start();
                    break;
                case 'STOP':
                    _this._renderLoop.stop();
                    break;
                default:
                    console.error(
                        'Unknown ENGINE command "' + message[1] + '"'
                    );
                    break;
            }
        }
        else {
            _this._compositor.receiveCommands(message);
        }
    };
    this._thread.onerror = function (error) {
        console.error(error);
    };
}

/**
 * Returns the thread being used by the UIManager.
 * This could either be an an actual web worker or a `FamousEngine` singleton.
 *
 * @method
 *
 * @return {Worker|FamousEngine} Either a web worker or a `FamousEngine` singleton.
 */
UIManager.prototype.getThread = function getThread() {
    return this._thread;
};

/**
 * Returns the compositor being used by this UIManager.
 *
 * @method
 *
 * @return {Compositor} The compositor used by the UIManager.
 */
UIManager.prototype.getCompositor = function getCompositor() {
    return this._compositor;
};

/**
 * Returns the engine being used by this UIManager.
 *
 * @method
 *
 * @return {Engine} The engine used by the UIManager.
 */
UIManager.prototype.getEngine = function getEngine() {
    return this._renderLoop;
};

/**
 * Update method being invoked by the Engine on every `requestAnimationFrame`.
 * Used for updating the notion of time within the managed thread by sending
 * a FRAME command and sending messages to
 *
 * @method
 *
 * @param  {Number} time unix timestamp to be passed down to the worker as a
 * FRAME command
 * @return {undefined} undefined
 */
UIManager.prototype.update = function update (time) {
    this._thread.postMessage(['FRAME', time]);
    var threadMessages = this._compositor.drawCommands();
    this._thread.postMessage(threadMessages);
    this._compositor.clearCommands();
};

module.exports = UIManager;

},{}],38:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var css = '.famous-dom-renderer {' +
    'width:100%;' +
    'height:100%;' +
    'transform-style:preserve-3d;' +
    '-webkit-transform-style:preserve-3d;' +
'}' +

'.famous-dom-element {' +
    '-webkit-transform-origin:0% 0%;' +
    'transform-origin:0% 0%;' +
    '-webkit-backface-visibility:visible;' +
    'backface-visibility:visible;' +
    '-webkit-transform-style:preserve-3d;' +
    'transform-style:preserve-3d;' +
    '-webkit-tap-highlight-color:transparent;' +
    'pointer-events:auto;' +
    'z-index:1;' +
'}' +

'.famous-dom-element-content,' +
'.famous-dom-element {' +
    'position:absolute;' +
    'box-sizing:border-box;' +
    '-moz-box-sizing:border-box;' +
    '-webkit-box-sizing:border-box;' +
'}' +

'.famous-webgl-renderer {' +
    '-webkit-transform: translateZ(1000000px);' +  /* TODO: Fix when Safari Fixes*/
    'transform: translateZ(1000000px)' +
    'pointer-events:none;' +
    'position:absolute;' +
    'z-index:1;' +
    'top:0;' +
    'left:0;' +
'}';

var INJECTED = typeof document === 'undefined';

function injectCSS() {
    if (INJECTED) return;
    INJECTED = true;
    if (document.createStyleSheet) {
        var sheet = document.createStyleSheet();
        sheet.cssText = css;
    }
    else {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }

        (head ? head : document.documentElement).appendChild(style);
    }
}

module.exports = injectCSS;

},{}],39:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * A lightweight, featureless EventEmitter.
 *
 * @class CallbackStore
 * @constructor
 */
function CallbackStore () {
    this._events = {};
}

/**
 * Adds a listener for the specified event (= key).
 *
 * @method on
 * @chainable
 *
 * @param  {String}   key       The event type (e.g. `click`).
 * @param  {Function} callback  A callback function to be invoked whenever `key`
 *                              event is being triggered.
 * @return {Function} destroy   A function to call if you want to remove the
 *                              callback.
 */
CallbackStore.prototype.on = function on (key, callback) {
    if (!this._events[key]) this._events[key] = [];
    var callbackList = this._events[key];
    callbackList.push(callback);
    return function () {
        callbackList.splice(callbackList.indexOf(callback), 1);
    };
};

/**
 * Removes a previously added event listener.
 *
 * @method off
 * @chainable
 *
 * @param  {String} key         The event type from which the callback function
 *                              should be removed.
 * @param  {Function} callback  The callback function to be removed from the
 *                              listeners for key.
 * @return {CallbackStore} this
 */
CallbackStore.prototype.off = function off (key, callback) {
    var events = this._events[key];
    if (events) events.splice(events.indexOf(callback), 1);
    return this;
};

/**
 * Invokes all the previously for this key registered callbacks.
 *
 * @method trigger
 * @chainable
 *
 * @param  {String}        key      The event type.
 * @param  {Object}        payload  The event payload (event object).
 * @return {CallbackStore} this
 */
CallbackStore.prototype.trigger = function trigger (key, payload) {
    var events = this._events[key];
    if (events) {
        var i = 0;
        var len = events.length;
        for (; i < len ; i++) events[i](payload);
    }
    return this;
};

module.exports = CallbackStore;

},{}],40:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * Deep clone an object.
 *
 * @method  clone
 *
 * @param {Object} b       Object to be cloned.
 * @return {Object} a      Cloned object (deep equality).
 */
var clone = function clone(b) {
    var a;
    if (typeof b === 'object') {
        a = (b instanceof Array) ? [] : {};
        for (var key in b) {
            if (typeof b[key] === 'object' && b[key] !== null) {
                if (b[key] instanceof Array) {
                    a[key] = new Array(b[key].length);
                    for (var i = 0; i < b[key].length; i++) {
                        a[key][i] = clone(b[key][i]);
                    }
                }
                else {
                  a[key] = clone(b[key]);
                }
            }
            else {
                a[key] = b[key];
            }
        }
    }
    else {
        a = b;
    }
    return a;
};

module.exports = clone;

},{}],41:[function(require,module,exports){
'use strict';

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Takes an object containing keys and values and returns an object
 * comprising two "associate" arrays, one with the keys and the other
 * with the values.
 *
 * @method keyValuesToArrays
 *
 * @param {Object} obj                      Objects where to extract keys and values
 *                                          from.
 * @return {Object}         result
 *         {Array.<String>} result.keys     Keys of `result`, as returned by
 *                                          `Object.keys()`
 *         {Array}          result.values   Values of passed in object.
 */
module.exports = function keyValuesToArrays(obj) {
    var keysArray = [], valuesArray = [];
    var i = 0;
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keysArray[i] = key;
            valuesArray[i] = obj[key];
            i++;
        }
    }
    return {
        keys: keysArray,
        values: valuesArray
    };
};

},{}],42:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var PREFIXES = ['', '-ms-', '-webkit-', '-moz-', '-o-'];

/**
 * A helper function used for determining the vendor prefixed version of the
 * passed in CSS property.
 *
 * Vendor checks are being conducted in the following order:
 *
 * 1. (no prefix)
 * 2. `-mz-`
 * 3. `-webkit-`
 * 4. `-moz-`
 * 5. `-o-`
 *
 * @method vendorPrefix
 *
 * @param {String} property     CSS property (no camelCase), e.g.
 *                              `border-radius`.
 * @return {String} prefixed    Vendor prefixed version of passed in CSS
 *                              property (e.g. `-webkit-border-radius`).
 */
function vendorPrefix(property) {
    for (var i = 0; i < PREFIXES.length; i++) {
        var prefixed = PREFIXES[i] + property;
        if (document.documentElement.style[prefixed] === '') {
            return prefixed;
        }
    }
    return property;
}

module.exports = vendorPrefix;

},{}],43:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var GeometryIds = 0;

/**
 * Geometry is a component that defines and manages data
 * (vertex data and attributes) that is used to draw to WebGL.
 *
 * @class Geometry
 * @constructor
 *
 * @param {Object} options instantiation options
 * @return {undefined} undefined
 */
function Geometry(options) {
    this.options = options || {};
    this.DEFAULT_BUFFER_SIZE = 3;

    this.spec = {
        id: GeometryIds++,
        dynamic: false,
        type: this.options.type || 'TRIANGLES',
        bufferNames: [],
        bufferValues: [],
        bufferSpacings: [],
        invalidations: []
    };

    if (this.options.buffers) {
        var len = this.options.buffers.length;
        for (var i = 0; i < len;) {
            this.spec.bufferNames.push(this.options.buffers[i].name);
            this.spec.bufferValues.push(this.options.buffers[i].data);
            this.spec.bufferSpacings.push(this.options.buffers[i].size || this.DEFAULT_BUFFER_SIZE);
            this.spec.invalidations.push(i++);
        }
    }
}

module.exports = Geometry;

},{}],44:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Vec3 = require('../math/Vec3');
var Vec2 = require('../math/Vec2');

var outputs = [
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec2(),
    new Vec2()
];

/**
 * A helper object used to calculate buffers for complicated geometries.
 * Tailored for the WebGLRenderer, used by most primitives.
 *
 * @static
 * @class GeometryHelper
 * @return {undefined} undefined
 */
var GeometryHelper = {};

/**
 * A function that iterates through vertical and horizontal slices
 * based on input detail, and generates vertices and indices for each
 * subdivision.
 *
 * @static
 * @method
 *
 * @param  {Number} detailX Amount of slices to iterate through.
 * @param  {Number} detailY Amount of stacks to iterate through.
 * @param  {Function} func Function used to generate vertex positions at each point.
 * @param  {Boolean} wrap Optional parameter (default: Pi) for setting a custom wrap range
 *
 * @return {Object} Object containing generated vertices and indices.
 */
GeometryHelper.generateParametric = function generateParametric(detailX, detailY, func, wrap) {
    var vertices = [];
    var i;
    var theta;
    var phi;
    var j;

    // We can wrap around slightly more than once for uv coordinates to look correct.

    var Xrange = wrap ? Math.PI + (Math.PI / (detailX - 1)) : Math.PI;
    var out = [];

    for (i = 0; i < detailX + 1; i++) {
        theta = i * Xrange / detailX;
        for (j = 0; j < detailY; j++) {
            phi = j * 2.0 * Xrange / detailY;
            func(theta, phi, out);
            vertices.push(out[0], out[1], out[2]);
        }
    }

    var indices = [],
        v = 0,
        next;
    for (i = 0; i < detailX; i++) {
        for (j = 0; j < detailY; j++) {
            next = (j + 1) % detailY;
            indices.push(v + j, v + j + detailY, v + next);
            indices.push(v + next, v + j + detailY, v + next + detailY);
        }
        v += detailY;
    }

    return {
        vertices: vertices,
        indices: indices
    };
};

/**
 * Calculates normals belonging to each face of a geometry.
 * Assumes clockwise declaration of vertices.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry.
 * @param {Array} indices Indices declaring faces of geometry.
 * @param {Array} out Array to be filled and returned.
 *
 * @return {Array} Calculated face normals.
 */
GeometryHelper.computeNormals = function computeNormals(vertices, indices, out) {
    var normals = out || [];
    var indexOne;
    var indexTwo;
    var indexThree;
    var normal;
    var j;
    var len = indices.length / 3;
    var i;
    var x;
    var y;
    var z;
    var length;

    for (i = 0; i < len; i++) {
        indexTwo = indices[i*3 + 0] * 3;
        indexOne = indices[i*3 + 1] * 3;
        indexThree = indices[i*3 + 2] * 3;

        outputs[0].set(vertices[indexOne], vertices[indexOne + 1], vertices[indexOne + 2]);
        outputs[1].set(vertices[indexTwo], vertices[indexTwo + 1], vertices[indexTwo + 2]);
        outputs[2].set(vertices[indexThree], vertices[indexThree + 1], vertices[indexThree + 2]);

        normal = outputs[2].subtract(outputs[0]).cross(outputs[1].subtract(outputs[0])).normalize();

        normals[indexOne + 0] = (normals[indexOne + 0] || 0) + normal.x;
        normals[indexOne + 1] = (normals[indexOne + 1] || 0) + normal.y;
        normals[indexOne + 2] = (normals[indexOne + 2] || 0) + normal.z;

        normals[indexTwo + 0] = (normals[indexTwo + 0] || 0) + normal.x;
        normals[indexTwo + 1] = (normals[indexTwo + 1] || 0) + normal.y;
        normals[indexTwo + 2] = (normals[indexTwo + 2] || 0) + normal.z;

        normals[indexThree + 0] = (normals[indexThree + 0] || 0) + normal.x;
        normals[indexThree + 1] = (normals[indexThree + 1] || 0) + normal.y;
        normals[indexThree + 2] = (normals[indexThree + 2] || 0) + normal.z;
    }

    for (i = 0; i < normals.length; i += 3) {
        x = normals[i];
        y = normals[i+1];
        z = normals[i+2];
        length = Math.sqrt(x * x + y * y + z * z);
        for(j = 0; j< 3; j++) {
            normals[i+j] /= length;
        }
    }

    return normals;
};

/**
 * Divides all inserted triangles into four sub-triangles. Alters the
 * passed in arrays.
 *
 * @static
 * @method
 *
 * @param {Array} indices Indices declaring faces of geometry
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} textureCoords Texture coordinates of all points on the geometry
 * @return {undefined} undefined
 */
GeometryHelper.subdivide = function subdivide(indices, vertices, textureCoords) {
    var triangleIndex = indices.length / 3;
    var face;
    var i;
    var j;
    var k;
    var pos;
    var tex;

    while (triangleIndex--) {
        face = indices.slice(triangleIndex * 3, triangleIndex * 3 + 3);

        pos = face.map(function(vertIndex) {
            return new Vec3(vertices[vertIndex * 3], vertices[vertIndex * 3 + 1], vertices[vertIndex * 3 + 2]);
        });
        vertices.push.apply(vertices, Vec3.scale(Vec3.add(pos[0], pos[1], outputs[0]), 0.5, outputs[1]).toArray());
        vertices.push.apply(vertices, Vec3.scale(Vec3.add(pos[1], pos[2], outputs[0]), 0.5, outputs[1]).toArray());
        vertices.push.apply(vertices, Vec3.scale(Vec3.add(pos[0], pos[2], outputs[0]), 0.5, outputs[1]).toArray());

        if (textureCoords) {
            tex = face.map(function(vertIndex) {
                return new Vec2(textureCoords[vertIndex * 2], textureCoords[vertIndex * 2 + 1]);
            });
            textureCoords.push.apply(textureCoords, Vec2.scale(Vec2.add(tex[0], tex[1], outputs[3]), 0.5, outputs[4]).toArray());
            textureCoords.push.apply(textureCoords, Vec2.scale(Vec2.add(tex[1], tex[2], outputs[3]), 0.5, outputs[4]).toArray());
            textureCoords.push.apply(textureCoords, Vec2.scale(Vec2.add(tex[0], tex[2], outputs[3]), 0.5, outputs[4]).toArray());
        }

        i = vertices.length - 3;
        j = i + 1;
        k = i + 2;

        indices.push(i, j, k);
        indices.push(face[0], i, k);
        indices.push(i, face[1], j);
        indices[triangleIndex] = k;
        indices[triangleIndex + 1] = j;
        indices[triangleIndex + 2] = face[2];
    }
};

/**
 * Creates duplicate of vertices that are shared between faces.
 * Alters the input vertex and index arrays.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} indices Indices declaring faces of geometry
 * @return {undefined} undefined
 */
GeometryHelper.getUniqueFaces = function getUniqueFaces(vertices, indices) {
    var triangleIndex = indices.length / 3,
        registered = [],
        index;

    while (triangleIndex--) {
        for (var i = 0; i < 3; i++) {

            index = indices[triangleIndex * 3 + i];

            if (registered[index]) {
                vertices.push(vertices[index * 3], vertices[index * 3 + 1], vertices[index * 3 + 2]);
                indices[triangleIndex * 3 + i] = vertices.length / 3 - 1;
            }
            else {
                registered[index] = true;
            }
        }
    }
};

/**
 * Divides all inserted triangles into four sub-triangles while maintaining
 * a radius of one. Alters the passed in arrays.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} indices Indices declaring faces of geometry
 * @return {undefined} undefined
 */
GeometryHelper.subdivideSpheroid = function subdivideSpheroid(vertices, indices) {
    var triangleIndex = indices.length / 3,
        abc,
        face,
        i, j, k;

    while (triangleIndex--) {
        face = indices.slice(triangleIndex * 3, triangleIndex * 3 + 3);
        abc = face.map(function(vertIndex) {
            return new Vec3(vertices[vertIndex * 3], vertices[vertIndex * 3 + 1], vertices[vertIndex * 3 + 2]);
        });

        vertices.push.apply(vertices, Vec3.normalize(Vec3.add(abc[0], abc[1], outputs[0]), outputs[1]).toArray());
        vertices.push.apply(vertices, Vec3.normalize(Vec3.add(abc[1], abc[2], outputs[0]), outputs[1]).toArray());
        vertices.push.apply(vertices, Vec3.normalize(Vec3.add(abc[0], abc[2], outputs[0]), outputs[1]).toArray());

        i = vertices.length / 3 - 3;
        j = i + 1;
        k = i + 2;

        indices.push(i, j, k);
        indices.push(face[0], i, k);
        indices.push(i, face[1], j);
        indices[triangleIndex * 3] = k;
        indices[triangleIndex * 3 + 1] = j;
        indices[triangleIndex * 3 + 2] = face[2];
    }
};

/**
 * Divides all inserted triangles into four sub-triangles while maintaining
 * a radius of one. Alters the passed in arrays.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} out Optional array to be filled with resulting normals.
 *
 * @return {Array} New list of calculated normals.
 */
GeometryHelper.getSpheroidNormals = function getSpheroidNormals(vertices, out) {
    out = out || [];
    var length = vertices.length / 3;
    var normalized;

    for (var i = 0; i < length; i++) {
        normalized = new Vec3(
            vertices[i * 3 + 0],
            vertices[i * 3 + 1],
            vertices[i * 3 + 2]
        ).normalize().toArray();

        out[i * 3 + 0] = normalized[0];
        out[i * 3 + 1] = normalized[1];
        out[i * 3 + 2] = normalized[2];
    }

    return out;
};

/**
 * Calculates texture coordinates for spheroid primitives based on
 * input vertices.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} out Optional array to be filled with resulting texture coordinates.
 *
 * @return {Array} New list of calculated texture coordinates
 */
GeometryHelper.getSpheroidUV = function getSpheroidUV(vertices, out) {
    out = out || [];
    var length = vertices.length / 3;
    var vertex;

    var uv = [];

    for(var i = 0; i < length; i++) {
        vertex = outputs[0].set(
            vertices[i * 3],
            vertices[i * 3 + 1],
            vertices[i * 3 + 2]
        )
        .normalize()
        .toArray();

        uv[0] = this.getAzimuth(vertex) * 0.5 / Math.PI + 0.5;
        uv[1] = this.getAltitude(vertex) / Math.PI + 0.5;

        out.push.apply(out, uv);
    }

    return out;
};

/**
 * Iterates through and normalizes a list of vertices.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} out Optional array to be filled with resulting normalized vectors.
 *
 * @return {Array} New list of normalized vertices
 */
GeometryHelper.normalizeAll = function normalizeAll(vertices, out) {
    out = out || [];
    var len = vertices.length / 3;

    for (var i = 0; i < len; i++) {
        Array.prototype.push.apply(out, new Vec3(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]).normalize().toArray());
    }

    return out;
};

/**
 * Normalizes a set of vertices to model space.
 *
 * @static
 * @method
 *
 * @param {Array} vertices Vertices of all points on the geometry
 * @param {Array} out Optional array to be filled with model space position vectors.
 *
 * @return {Array} Output vertices.
 */
GeometryHelper.normalizeVertices = function normalizeVertices(vertices, out) {
    out = out || [];
    var len = vertices.length / 3;
    var vectors = [];
    var minX;
    var maxX;
    var minY;
    var maxY;
    var minZ;
    var maxZ;
    var v;
    var i;

    for (i = 0; i < len; i++) {
        v = vectors[i] = new Vec3(
            vertices[i * 3],
            vertices[i * 3 + 1],
            vertices[i * 3 + 2]
        );

        if (minX == null || v.x < minX) minX = v.x;
        if (maxX == null || v.x > maxX) maxX = v.x;

        if (minY == null || v.y < minY) minY = v.y;
        if (maxY == null || v.y > maxY) maxY = v.y;

        if (minZ == null || v.z < minZ) minZ = v.z;
        if (maxZ == null || v.z > maxZ) maxZ = v.z;
    }

    var translation = new Vec3(
        getTranslationFactor(maxX, minX),
        getTranslationFactor(maxY, minY),
        getTranslationFactor(maxZ, minZ)
    );

    var scale = Math.min(
        getScaleFactor(maxX + translation.x, minX + translation.x),
        getScaleFactor(maxY + translation.y, minY + translation.y),
        getScaleFactor(maxZ + translation.z, minZ + translation.z)
    );

    for (i = 0; i < vectors.length; i++) {
        out.push.apply(out, vectors[i].add(translation).scale(scale).toArray());
    }

    return out;
};

/**
 * Determines translation amount for a given axis to normalize model coordinates.
 *
 * @method
 * @private
 *
 * @param {Number} max Maximum position value of given axis on the model.
 * @param {Number} min Minimum position value of given axis on the model.
 *
 * @return {Number} Number by which the given axis should be translated for all vertices.
 */
function getTranslationFactor(max, min) {
    return -(min + (max - min) / 2);
}

/**
 * Determines scale amount for a given axis to normalize model coordinates.
 *
 * @method
 * @private
 *
 * @param {Number} max Maximum scale value of given axis on the model.
 * @param {Number} min Minimum scale value of given axis on the model.
 *
 * @return {Number} Number by which the given axis should be scaled for all vertices.
 */
function getScaleFactor(max, min) {
    return 1 / ((max - min) / 2);
}

/**
 * Finds the azimuth, or angle above the XY plane, of a given vector.
 *
 * @static
 * @method
 *
 * @param {Array} v Vertex to retreive azimuth from.
 *
 * @return {Number} Azimuth value in radians.
 */
GeometryHelper.getAzimuth = function azimuth(v) {
    return Math.atan2(v[2], -v[0]);
};

/**
 * Finds the altitude, or angle above the XZ plane, of a given vector.
 *
 * @static
 * @method
 *
 * @param {Array} v Vertex to retreive altitude from.
 *
 * @return {Number} Altitude value in radians.
 */
GeometryHelper.getAltitude = function altitude(v) {
    return Math.atan2(-v[1], Math.sqrt((v[0] * v[0]) + (v[2] * v[2])));
};

/**
 * Converts a list of indices from 'triangle' to 'line' format.
 *
 * @static
 * @method
 *
 * @param {Array} indices Indices of all faces on the geometry
 * @param {Array} out Indices of all faces on the geometry
 *
 * @return {Array} New list of line-formatted indices
 */
GeometryHelper.trianglesToLines = function triangleToLines(indices, out) {
    var numVectors = indices.length / 3;
    out = out || [];
    var i;

    for (i = 0; i < numVectors; i++) {
        out.push(indices[i * 3 + 0], indices[i * 3 + 1]);
        out.push(indices[i * 3 + 1], indices[i * 3 + 2]);
        out.push(indices[i * 3 + 2], indices[i * 3 + 0]);
    }

    return out;
};

/**
 * Adds a reverse order triangle for every triangle in the mesh. Adds extra vertices
 * and indices to input arrays.
 *
 * @static
 * @method
 *
 * @param {Array} vertices X, Y, Z positions of all vertices in the geometry
 * @param {Array} indices Indices of all faces on the geometry
 * @return {undefined} undefined
 */
GeometryHelper.addBackfaceTriangles = function addBackfaceTriangles(vertices, indices) {
    var nFaces = indices.length / 3;

    var maxIndex = 0;
    var i = indices.length;
    while (i--) if (indices[i] > maxIndex) maxIndex = indices[i];

    maxIndex++;

    for (i = 0; i < nFaces; i++) {
        var indexOne = indices[i * 3],
            indexTwo = indices[i * 3 + 1],
            indexThree = indices[i * 3 + 2];

        indices.push(indexOne + maxIndex, indexThree + maxIndex, indexTwo + maxIndex);
    }

    // Iterating instead of .slice() here to avoid max call stack issue.

    var nVerts = vertices.length;
    for (i = 0; i < nVerts; i++) {
        vertices.push(vertices[i]);
    }
};

module.exports = GeometryHelper;

},{"../math/Vec2":28,"../math/Vec3":29}],45:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Geometry = require('../Geometry');
var GeometryHelper = require('../GeometryHelper');

/**
 * This function returns a new static geometry, which is passed
 * custom buffer data.
 *
 * @class Plane
 * @constructor
 *
 * @param {Object} options Parameters that alter the
 * vertex buffers of the generated geometry.
 *
 * @return {Object} constructed geometry
 */
function Plane(options) {
    options = options || {};
    var detailX = options.detailX || options.detail || 1;
    var detailY = options.detailY || options.detail || 1;

    var vertices      = [];
    var textureCoords = [];
    var normals       = [];
    var indices       = [];

    var i;

    for (var y = 0; y <= detailY; y++) {
        var t = y / detailY;
        for (var x = 0; x <= detailX; x++) {
            var s = x / detailX;
            vertices.push(2. * (s - .5), 2 * (t - .5), 0);
            textureCoords.push(s, 1 - t);
            if (x < detailX && y < detailY) {
                i = x + y * (detailX + 1);
                indices.push(i, i + 1, i + detailX + 1);
                indices.push(i + detailX + 1, i + 1, i + detailX + 2);
            }
        }
    }

    if (options.backface !== false) {
        GeometryHelper.addBackfaceTriangles(vertices, indices);

        // duplicate texture coordinates as well

        var len = textureCoords.length;
        for (i = 0; i < len; i++) textureCoords.push(textureCoords[i]);
    }

    normals = GeometryHelper.computeNormals(vertices, indices);

    return new Geometry({
        buffers: [
            { name: 'a_pos', data: vertices },
            { name: 'a_texCoord', data: textureCoords, size: 2 },
            { name: 'a_normals', data: normals },
            { name: 'indices', data: indices, size: 1 }
        ]
    });
}

module.exports = Plane;

},{"../Geometry":43,"../GeometryHelper":44}],46:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * Buffer is a private class that wraps the vertex data that defines
 * the the points of the triangles that webgl draws. Each buffer
 * maps to one attribute of a mesh.
 *
 * @class Buffer
 * @constructor
 *
 * @param {Number} target The bind target of the buffer to update: ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER
 * @param {Object} type Array type to be used in calls to gl.bufferData.
 * @param {WebGLContext} gl The WebGL context that the buffer is hosted by.
 *
 * @return {undefined} undefined
 */
function Buffer(target, type, gl) {
    this.buffer = null;
    this.target = target;
    this.type = type;
    this.data = [];
    this.gl = gl;
}

/**
 * Creates a WebGL buffer if one does not yet exist and binds the buffer to
 * to the context. Runs bufferData with appropriate data.
 *
 * @method
 *
 * @return {undefined} undefined
 */
Buffer.prototype.subData = function subData() {
    var gl = this.gl;
    var data = [];

    // to prevent against maximum call-stack issue.
    for (var i = 0, chunk = 10000; i < this.data.length; i += chunk)
        data = Array.prototype.concat.apply(data, this.data.slice(i, i + chunk));

    this.buffer = this.buffer || gl.createBuffer();
    gl.bindBuffer(this.target, this.buffer);
    gl.bufferData(this.target, new this.type(data), gl.STATIC_DRAW);
};

module.exports = Buffer;

},{}],47:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var INDICES = 'indices';

var Buffer = require('./Buffer');

/**
 * BufferRegistry is a class that manages allocation of buffers to
 * input geometries.
 *
 * @class BufferRegistry
 * @constructor
 *
 * @param {WebGLContext} context WebGL drawing context to be passed to buffers.
 *
 * @return {undefined} undefined
 */
function BufferRegistry(context) {
    this.gl = context;

    this.registry = {};
    this._dynamicBuffers = [];
    this._staticBuffers = [];

    this._arrayBufferMax = 30000;
    this._elementBufferMax = 30000;
}

/**
 * Binds and fills all the vertex data into webgl buffers.  Will reuse buffers if
 * possible.  Populates registry with the name of the buffer, the WebGL buffer
 * object, spacing of the attribute, the attribute's offset within the buffer,
 * and finally the length of the buffer.  This information is later accessed by
 * the root to draw the buffers.
 *
 * @method
 *
 * @param {Number} geometryId Id of the geometry instance that holds the buffers.
 * @param {String} name Key of the input buffer in the geometry.
 * @param {Array} value Flat array containing input data for buffer.
 * @param {Number} spacing The spacing, or itemSize, of the input buffer.
 * @param {Boolean} dynamic Boolean denoting whether a geometry is dynamic or static.
 *
 * @return {undefined} undefined
 */
BufferRegistry.prototype.allocate = function allocate(geometryId, name, value, spacing, dynamic) {
    var vertexBuffers = this.registry[geometryId] || (this.registry[geometryId] = { keys: [], values: [], spacing: [], offset: [], length: [] });

    var j = vertexBuffers.keys.indexOf(name);
    var isIndex = name === INDICES;
    var bufferFound = false;
    var newOffset;
    var offset = 0;
    var length;
    var buffer;
    var k;

    if (j === -1) {
        j = vertexBuffers.keys.length;
        length = isIndex ? value.length : Math.floor(value.length / spacing);

        if (!dynamic) {

            // Use a previously created buffer if available.

            for (k = 0; k < this._staticBuffers.length; k++) {

                if (isIndex === this._staticBuffers[k].isIndex) {
                    newOffset = this._staticBuffers[k].offset + value.length;
                    if ((!isIndex && newOffset < this._arrayBufferMax) || (isIndex && newOffset < this._elementBufferMax)) {
                        buffer = this._staticBuffers[k].buffer;
                        offset = this._staticBuffers[k].offset;
                        this._staticBuffers[k].offset += value.length;
                        bufferFound = true;
                        break;
                    }
                }
            }

            // Create a new static buffer in none were found.

            if (!bufferFound) {
                buffer = new Buffer(
                    isIndex ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER,
                    isIndex ? Uint16Array : Float32Array,
                    this.gl
                );

                this._staticBuffers.push({ buffer: buffer, offset: value.length, isIndex: isIndex });
            }
        }
        else {

            // For dynamic geometries, always create new buffer.

            buffer = new Buffer(
                isIndex ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER,
                isIndex ? Uint16Array : Float32Array,
                this.gl
            );

            this._dynamicBuffers.push({ buffer: buffer, offset: value.length, isIndex: isIndex });
        }

        // Update the registry for the spec with buffer information.

        vertexBuffers.keys.push(name);
        vertexBuffers.values.push(buffer);
        vertexBuffers.spacing.push(spacing);
        vertexBuffers.offset.push(offset);
        vertexBuffers.length.push(length);
    }

    var len = value.length;
    for (k = 0; k < len; k++) {
        vertexBuffers.values[j].data[offset + k] = value[k];
    }
    vertexBuffers.values[j].subData();
};

module.exports = BufferRegistry;

},{"./Buffer":46}],48:[function(require,module,exports){
'use strict';

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Takes the original rendering contexts' compiler function
 * and augments it with added functionality for parsing and
 * displaying errors.
 *
 * @method
 *
 * @returns {Function} Augmented function
 */
module.exports = function Debug() {
    return _augmentFunction(
        this.gl.compileShader,
        function(shader) {
            if (!this.getShaderParameter(shader, this.COMPILE_STATUS)) {
                var errors = this.getShaderInfoLog(shader);
                var source = this.getShaderSource(shader);
                _processErrors(errors, source);
            }
        }
    );
};

// Takes a function, keeps the reference and replaces it by a closure that
// executes the original function and the provided callback.
function _augmentFunction(func, callback) {
    return function() {
        var res = func.apply(this, arguments);
        callback.apply(this, arguments);
        return res;
    };
}

// Parses errors and failed source code from shaders in order
// to build displayable error blocks.
// Inspired by Jaume Sanchez Elias.
function _processErrors(errors, source) {

    var css = 'body,html{background:#e3e3e3;font-family:monaco,monospace;font-size:14px;line-height:1.7em}' +
              '#shaderReport{left:0;top:0;right:0;box-sizing:border-box;position:absolute;z-index:1000;color:' +
              '#222;padding:15px;white-space:normal;list-style-type:none;margin:50px auto;max-width:1200px}' +
              '#shaderReport li{background-color:#fff;margin:13px 0;box-shadow:0 1px 2px rgba(0,0,0,.15);' +
              'padding:20px 30px;border-radius:2px;border-left:20px solid #e01111}span{color:#e01111;' +
              'text-decoration:underline;font-weight:700}#shaderReport li p{padding:0;margin:0}' +
              '#shaderReport li:nth-child(even){background-color:#f4f4f4}' +
              '#shaderReport li p:first-child{margin-bottom:10px;color:#666}';

    var el = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(el);
    el.textContent = css;

    var report = document.createElement('ul');
    report.setAttribute('id', 'shaderReport');
    document.body.appendChild(report);

    var re = /ERROR: [\d]+:([\d]+): (.+)/gmi;
    var lines = source.split('\n');

    var m;
    while ((m = re.exec(errors)) != null) {
        if (m.index === re.lastIndex) re.lastIndex++;
        var li = document.createElement('li');
        var code = '<p><span>ERROR</span> "' + m[2] + '" in line ' + m[1] + '</p>';
        code += '<p><b>' + lines[m[1] - 1].replace(/^[ \t]+/g, '') + '</b></p>';
        li.innerHTML = code;
        report.appendChild(li);
    }
}

},{}],49:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var clone = require('../utilities/clone');
var keyValueToArrays = require('../utilities/keyValueToArrays');

var vertexWrapper = require('../webgl-shaders').vertex;
var fragmentWrapper = require('../webgl-shaders').fragment;
var Debug = require('./Debug');

var VERTEX_SHADER = 35633;
var FRAGMENT_SHADER = 35632;
var identityMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

var header = 'precision mediump float;\n';

var TYPES = {
    undefined: 'float ',
    1: 'float ',
    2: 'vec2 ',
    3: 'vec3 ',
    4: 'vec4 ',
    16: 'mat4 '
};

var inputTypes = {
    u_baseColor: 'vec4',
    u_normals: 'vert',
    u_glossiness: 'vec4',
    u_positionOffset: 'vert'
};

var masks =  {
    vert: 1,
    vec3: 2,
    vec4: 4,
    float: 8
};

/**
 * Uniform keys and values
 */
var uniforms = keyValueToArrays({
    u_perspective: identityMatrix,
    u_view: identityMatrix,
    u_resolution: [0, 0, 0],
    u_transform: identityMatrix,
    u_size: [1, 1, 1],
    u_time: 0,
    u_opacity: 1,
    u_metalness: 0,
    u_glossiness: [0, 0, 0, 0],
    u_baseColor: [1, 1, 1, 1],
    u_normals: [1, 1, 1],
    u_positionOffset: [0, 0, 0],
    u_lightPosition: identityMatrix,
    u_lightColor: identityMatrix,
    u_ambientLight: [0, 0, 0],
    u_flatShading: 0,
    u_numLights: 0
});

/**
 * Attributes keys and values
 */
var attributes = keyValueToArrays({
    a_pos: [0, 0, 0],
    a_texCoord: [0, 0],
    a_normals: [0, 0, 0]
});

/**
 * Varyings keys and values
 */
var varyings = keyValueToArrays({
    v_textureCoordinate: [0, 0],
    v_normal: [0, 0, 0],
    v_position: [0, 0, 0],
    v_eyeVector: [0, 0, 0]
});

/**
 * A class that handles interactions with the WebGL shader program
 * used by a specific context.  It manages creation of the shader program
 * and the attached vertex and fragment shaders.  It is also in charge of
 * passing all uniforms to the WebGLContext.
 *
 * @class Program
 * @constructor
 *
 * @param {WebGL_Context} gl Context to be used to create the shader program
 * @param {Object} options Program options
 *
 * @return {undefined} undefined
 */
function Program(gl, options) {
    this.gl = gl;
    this.textureSlots = 1;
    this.options = options || {};

    this.registeredMaterials = {};
    this.flaggedUniforms = [];
    this.cachedUniforms  = {};
    this.uniformTypes = [];

    this.definitionVec4 = [];
    this.definitionVec3 = [];
    this.definitionFloat = [];
    this.applicationVec3 = [];
    this.applicationVec4 = [];
    this.applicationFloat = [];
    this.applicationVert = [];
    this.definitionVert = [];

    this.resetProgram();
}

/**
 * Determines whether a material has already been registered to
 * the shader program.
 *
 * @method
 *
 * @param {String} name Name of target input of material.
 * @param {Object} material Compiled material object being verified.
 *
 * @return {Program} this Current program.
 */
Program.prototype.registerMaterial = function registerMaterial(name, material) {
    var compiled = material;
    var type = inputTypes[name];
    var mask = masks[type];

    if ((this.registeredMaterials[material._id] & mask) === mask) return this;

    var k;

    for (k in compiled.uniforms) {
        if (uniforms.keys.indexOf(k) === -1) {
            uniforms.keys.push(k);
            uniforms.values.push(compiled.uniforms[k]);
        }
    }

    for (k in compiled.varyings) {
        if (varyings.keys.indexOf(k) === -1) {
            varyings.keys.push(k);
            varyings.values.push(compiled.varyings[k]);
        }
    }

    for (k in compiled.attributes) {
        if (attributes.keys.indexOf(k) === -1) {
            attributes.keys.push(k);
            attributes.values.push(compiled.attributes[k]);
        }
    }

    this.registeredMaterials[material._id] |= mask;

    if (type === 'float') {
        this.definitionFloat.push(material.defines);
        this.definitionFloat.push('float fa_' + material._id + '() {\n '  + compiled.glsl + ' \n}');
        this.applicationFloat.push('if (int(abs(ID)) == ' + material._id + ') return fa_' + material._id  + '();');
    }

    if (type === 'vec3') {
        this.definitionVec3.push(material.defines);
        this.definitionVec3.push('vec3 fa_' + material._id + '() {\n '  + compiled.glsl + ' \n}');
        this.applicationVec3.push('if (int(abs(ID.x)) == ' + material._id + ') return fa_' + material._id + '();');
    }

    if (type === 'vec4') {
        this.definitionVec4.push(material.defines);
        this.definitionVec4.push('vec4 fa_' + material._id + '() {\n '  + compiled.glsl + ' \n}');
        this.applicationVec4.push('if (int(abs(ID.x)) == ' + material._id + ') return fa_' + material._id + '();');
    }

    if (type === 'vert') {
        this.definitionVert.push(material.defines);
        this.definitionVert.push('vec3 fa_' + material._id + '() {\n '  + compiled.glsl + ' \n}');
        this.applicationVert.push('if (int(abs(ID.x)) == ' + material._id + ') return fa_' + material._id + '();');
    }

    return this.resetProgram();
};

/**
 * Clears all cached uniforms and attribute locations.  Assembles
 * new fragment and vertex shaders and based on material from
 * currently registered materials.  Attaches said shaders to new
 * shader program and upon success links program to the WebGL
 * context.
 *
 * @method
 *
 * @return {Program} Current program.
 */
Program.prototype.resetProgram = function resetProgram() {
    var vertexHeader = [header];
    var fragmentHeader = [header];

    var fragmentSource;
    var vertexSource;
    var program;
    var name;
    var value;
    var i;

    this.uniformLocations   = [];
    this.attributeLocations = {};

    this.uniformTypes = {};

    this.attributeNames = clone(attributes.keys);
    this.attributeValues = clone(attributes.values);

    this.varyingNames = clone(varyings.keys);
    this.varyingValues = clone(varyings.values);

    this.uniformNames = clone(uniforms.keys);
    this.uniformValues = clone(uniforms.values);

    this.flaggedUniforms = [];
    this.cachedUniforms = {};

    fragmentHeader.push('uniform sampler2D u_textures[7];\n');

    if (this.applicationVert.length) {
        vertexHeader.push('uniform sampler2D u_textures[7];\n');
    }

    for(i = 0; i < this.uniformNames.length; i++) {
        name = this.uniformNames[i];
        value = this.uniformValues[i];
        vertexHeader.push('uniform ' + TYPES[value.length] + name + ';\n');
        fragmentHeader.push('uniform ' + TYPES[value.length] + name + ';\n');
    }

    for(i = 0; i < this.attributeNames.length; i++) {
        name = this.attributeNames[i];
        value = this.attributeValues[i];
        vertexHeader.push('attribute ' + TYPES[value.length] + name + ';\n');
    }

    for(i = 0; i < this.varyingNames.length; i++) {
        name = this.varyingNames[i];
        value = this.varyingValues[i];
        vertexHeader.push('varying ' + TYPES[value.length]  + name + ';\n');
        fragmentHeader.push('varying ' + TYPES[value.length] + name + ';\n');
    }

    vertexSource = vertexHeader.join('') + vertexWrapper
        .replace('#vert_definitions', this.definitionVert.join('\n'))
        .replace('#vert_applications', this.applicationVert.join('\n'));

    fragmentSource = fragmentHeader.join('') + fragmentWrapper
        .replace('#vec3_definitions', this.definitionVec3.join('\n'))
        .replace('#vec3_applications', this.applicationVec3.join('\n'))
        .replace('#vec4_definitions', this.definitionVec4.join('\n'))
        .replace('#vec4_applications', this.applicationVec4.join('\n'))
        .replace('#float_definitions', this.definitionFloat.join('\n'))
        .replace('#float_applications', this.applicationFloat.join('\n'));

    program = this.gl.createProgram();

    this.gl.attachShader(
        program,
        this.compileShader(this.gl.createShader(VERTEX_SHADER), vertexSource)
    );

    this.gl.attachShader(
        program,
        this.compileShader(this.gl.createShader(FRAGMENT_SHADER), fragmentSource)
    );

    this.gl.linkProgram(program);

    if (! this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        console.error('link error: ' + this.gl.getProgramInfoLog(program));
        this.program = null;
    }
    else {
        this.program = program;
        this.gl.useProgram(this.program);
    }

    this.setUniforms(this.uniformNames, this.uniformValues);

    var textureLocation = this.gl.getUniformLocation(this.program, 'u_textures[0]');
    this.gl.uniform1iv(textureLocation, [0, 1, 2, 3, 4, 5, 6]);

    return this;
};

/**
 * Compares the value of the input uniform value against
 * the cached value stored on the Program class.  Updates and
 * creates new entries in the cache when necessary.
 *
 * @method
 * @param {String} targetName Key of uniform spec being evaluated.
 * @param {Number|Array} value Value of uniform spec being evaluated.
 *
 * @return {Boolean} boolean Indicating whether the uniform being set is cached.
 */
Program.prototype.uniformIsCached = function(targetName, value) {
    if(this.cachedUniforms[targetName] == null) {
        if (value.length) {
            this.cachedUniforms[targetName] = new Float32Array(value);
        }
        else {
            this.cachedUniforms[targetName] = value;
        }
        return false;
    }
    else if (value.length) {
        var i = value.length;
        while (i--) {
            if(value[i] !== this.cachedUniforms[targetName][i]) {
                i = value.length;
                while(i--) this.cachedUniforms[targetName][i] = value[i];
                return false;
            }
        }
    }

    else if (this.cachedUniforms[targetName] !== value) {
        this.cachedUniforms[targetName] = value;
        return false;
    }

    return true;
};

/**
 * Handles all passing of uniforms to WebGL drawing context.  This
 * function will find the uniform location and then, based on
 * a type inferred from the javascript value of the uniform, it will call
 * the appropriate function to pass the uniform to WebGL.  Finally,
 * setUniforms will iterate through the passed in shaderChunks (if any)
 * and set the appropriate uniforms to specify which chunks to use.
 *
 * @method
 * @param {Array} uniformNames Array containing the keys of all uniforms to be set.
 * @param {Array} uniformValue Array containing the values of all uniforms to be set.
 *
 * @return {Program} Current program.
 */
Program.prototype.setUniforms = function (uniformNames, uniformValue) {
    var gl = this.gl;
    var location;
    var value;
    var name;
    var len;
    var i;

    if (!this.program) return this;

    len = uniformNames.length;
    for (i = 0; i < len; i++) {
        name = uniformNames[i];
        value = uniformValue[i];

        // Retreive the cached location of the uniform,
        // requesting a new location from the WebGL context
        // if it does not yet exist.

        location = this.uniformLocations[name] || gl.getUniformLocation(this.program, name);
        if (!location) continue;

        this.uniformLocations[name] = location;

        // Check if the value is already set for the
        // given uniform.

        if (this.uniformIsCached(name, value)) continue;

        // Determine the correct function and pass the uniform
        // value to WebGL.

        if (!this.uniformTypes[name]) {
            this.uniformTypes[name] = this.getUniformTypeFromValue(value);
        }

        // Call uniform setter function on WebGL context with correct value

        switch (this.uniformTypes[name]) {
            case 'uniform4fv':  gl.uniform4fv(location, value); break;
            case 'uniform3fv':  gl.uniform3fv(location, value); break;
            case 'uniform2fv':  gl.uniform2fv(location, value); break;
            case 'uniform1fv':  gl.uniform1fv(location, value); break;
            case 'uniform1f' :  gl.uniform1f(location, value); break;
            case 'uniformMatrix3fv': gl.uniformMatrix3fv(location, false, value); break;
            case 'uniformMatrix4fv': gl.uniformMatrix4fv(location, false, value); break;
        }
    }

    return this;
};

/**
 * Infers uniform setter function to be called on the WebGL context, based
 * on an input value.
 *
 * @method
 *
 * @param {Number|Array} value Value from which uniform type is inferred.
 *
 * @return {String} Name of uniform function for given value.
 */
Program.prototype.getUniformTypeFromValue = function getUniformTypeFromValue(value) {
    if (Array.isArray(value) || value instanceof Float32Array) {
        switch (value.length) {
            case 1:  return 'uniform1fv';
            case 2:  return 'uniform2fv';
            case 3:  return 'uniform3fv';
            case 4:  return 'uniform4fv';
            case 9:  return 'uniformMatrix3fv';
            case 16: return 'uniformMatrix4fv';
        }
    }
    else if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return 'uniform1f';
    }

    throw 'cant load uniform "' + name + '" with value:' + JSON.stringify(value);
};

/**
 * Adds shader source to shader and compiles the input shader.  Checks
 * compile status and logs error if necessary.
 *
 * @method
 *
 * @param {Object} shader Program to be compiled.
 * @param {String} source Source to be used in the shader.
 *
 * @return {Object} Compiled shader.
 */
Program.prototype.compileShader = function compileShader(shader, source) {
    var i = 1;

    if (this.options.debug) {
        this.gl.compileShader = Debug.call(this);
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.error('compile error: ' + this.gl.getShaderInfoLog(shader));
        console.error('1: ' + source.replace(/\n/g, function () {
            return '\n' + (i+=1) + ': ';
        }));
    }

    return shader;
};

module.exports = Program;

},{"../utilities/clone":40,"../utilities/keyValueToArrays":41,"../webgl-shaders":56,"./Debug":48}],50:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/**
 * Texture is a private class that stores image data
 * to be accessed from a shader or used as a render target.
 *
 * @class Texture
 * @constructor
 *
 * @param {GL} gl GL
 * @param {Object} options Options
 *
 * @return {undefined} undefined
 */
function Texture(gl, options) {
    options = options || {};
    this.id = gl.createTexture();
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.mipmap = options.mipmap;
    this.format = options.format || 'RGBA';
    this.type = options.type || 'UNSIGNED_BYTE';
    this.gl = gl;

    this.bind();

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[options.magFilter] || gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[options.minFilter] || gl.NEAREST);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[options.wrapS] || gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[options.wrapT] || gl.CLAMP_TO_EDGE);
}

/**
 * Binds this texture as the selected target.
 *
 * @method
 * @return {Object} Current texture instance.
 */
Texture.prototype.bind = function bind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    return this;
};

/**
 * Erases the texture data in the given texture slot.
 *
 * @method
 * @return {Object} Current texture instance.
 */
Texture.prototype.unbind = function unbind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    return this;
};

/**
 * Replaces the image data in the texture with the given image.
 *
 * @method
 *
 * @param {Image}   img     The image object to upload pixel data from.
 * @return {Object}         Current texture instance.
 */
Texture.prototype.setImage = function setImage(img) {
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl[this.format], this.gl[this.format], this.gl[this.type], img);
    if (this.mipmap) this.gl.generateMipmap(this.gl.TEXTURE_2D);
    return this;
};

/**
 * Replaces the image data in the texture with an array of arbitrary data.
 *
 * @method
 *
 * @param {Array}   input   Array to be set as data to texture.
 * @return {Object}         Current texture instance.
 */
Texture.prototype.setArray = function setArray(input) {
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl[this.format], this.width, this.height, 0, this.gl[this.format], this.gl[this.type], input);
    return this;
};

/**
 * Dumps the rgb-pixel contents of a texture into an array for debugging purposes
 *
 * @method
 *
 * @param {Number} x        x-offset between texture coordinates and snapshot
 * @param {Number} y        y-offset between texture coordinates and snapshot
 * @param {Number} width    x-depth of the snapshot
 * @param {Number} height   y-depth of the snapshot
 *
 * @return {Array}          An array of the pixels contained in the snapshot.
 */
Texture.prototype.readBack = function readBack(x, y, width, height) {
    var gl = this.gl;
    var pixels;
    x = x || 0;
    y = y || 0;
    width = width || this.width;
    height = height || this.height;
    var fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.id, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
        pixels = new Uint8Array(width * height * 4);
        gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    return pixels;
};

module.exports = Texture;

},{}],51:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

var Texture = require('./Texture');
var createCheckerboard = require('./createCheckerboard');

/**
 * Handles loading, binding, and resampling of textures for WebGLRenderer.
 *
 * @class TextureManager
 * @constructor
 *
 * @param {WebGL_Context} gl Context used to create and bind textures.
 *
 * @return {undefined} undefined
 */
function TextureManager(gl) {
    this.registry = [];
    this._needsResample = [];

    this._activeTexture = 0;
    this._boundTexture = null;

    this._checkerboard = createCheckerboard();

    this.gl = gl;
}

/**
 * Update function used by WebGLRenderer to queue resamples on
 * registered textures.
 *
 * @method
 *
 * @param {Number}      time    Time in milliseconds according to the compositor.
 * @return {undefined}          undefined
 */
TextureManager.prototype.update = function update(time) {
    var registryLength = this.registry.length;

    for (var i = 1; i < registryLength; i++) {
        var texture = this.registry[i];

        if (texture && texture.isLoaded && texture.resampleRate) {
            if (!texture.lastResample || time - texture.lastResample > texture.resampleRate) {
                if (!this._needsResample[texture.id]) {
                    this._needsResample[texture.id] = true;
                    texture.lastResample = time;
                }
            }
        }
    }
};

/**
 * Creates a spec and creates a texture based on given texture data.
 * Handles loading assets if necessary.
 *
 * @method
 *
 * @param {Object}  input   Object containing texture id, texture data
 *                          and options used to draw texture.
 * @param {Number}  slot    Texture slot to bind generated texture to.
 * @return {undefined}      undefined
 */
TextureManager.prototype.register = function register(input, slot) {
    var source = input.data;
    var textureId = input.id;
    var options = input.options || {};
    var texture = this.registry[textureId];
    var spec;

    if (!texture) {

        texture = new Texture(this.gl, options);
        texture.setImage(this._checkerboard);

        // Add texture to registry

        spec = this.registry[textureId] = {
            resampleRate: options.resampleRate || null,
            lastResample: null,
            isLoaded: false,
            texture: texture,
            source: source,
            id: textureId,
            slot: slot
        };

        // Handle array

        if (Array.isArray(source) || source instanceof Uint8Array || source instanceof Float32Array) {
            this.bindTexture(textureId);
            texture.setArray(source);
            spec.isLoaded = true;
        }

        // Handle video

        else if (window && source instanceof window.HTMLVideoElement) {
            source.addEventListener('loadeddata', function() {
                this.bindTexture(textureId);
                texture.setImage(source);

                spec.isLoaded = true;
                spec.source = source;
            }.bind(this));
        }

        // Handle image url

        else if (typeof source === 'string') {
            loadImage(source, function (img) {
                this.bindTexture(textureId);
                texture.setImage(img);

                spec.isLoaded = true;
                spec.source = img;
            }.bind(this));
        }
    }

    return textureId;
};

/**
 * Loads an image from a string or Image object and executes a callback function.
 *
 * @method
 * @private
 *
 * @param {Object|String} input The input image data to load as an asset.
 * @param {Function} callback The callback function to be fired when the image has finished loading.
 *
 * @return {Object} Image object being loaded.
 */
function loadImage (input, callback) {
    var image = (typeof input === 'string' ? new Image() : input) || {};
        image.crossOrigin = 'anonymous';

    if (!image.src) image.src = input;
    if (!image.complete) {
        image.onload = function () {
            callback(image);
        };
    }
    else {
        callback(image);
    }

    return image;
}

/**
 * Sets active texture slot and binds target texture.  Also handles
 * resampling when necessary.
 *
 * @method
 *
 * @param {Number} id Identifier used to retreive texture spec
 *
 * @return {undefined} undefined
 */
TextureManager.prototype.bindTexture = function bindTexture(id) {
    var spec = this.registry[id];

    if (this._activeTexture !== spec.slot) {
        this.gl.activeTexture(this.gl.TEXTURE0 + spec.slot);
        this._activeTexture = spec.slot;
    }

    if (this._boundTexture !== id) {
        this._boundTexture = id;
        spec.texture.bind();
    }

    if (this._needsResample[spec.id]) {

        // TODO: Account for resampling of arrays.

        spec.texture.setImage(spec.source);
        this._needsResample[spec.id] = false;
    }
};

module.exports = TextureManager;

},{"./Texture":50,"./createCheckerboard":54}],52:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Program = require('./Program');
var BufferRegistry = require('./BufferRegistry');
var Plane = require('../webgl-geometries/primitives/Plane');
var sorter = require('./radixSort');
var keyValueToArrays = require('../utilities/keyValueToArrays');
var TextureManager = require('./TextureManager');
var compileMaterial = require('./compileMaterial');

var identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

var globalUniforms = keyValueToArrays({
    'u_numLights': 0,
    'u_ambientLight': new Array(3),
    'u_lightPosition': new Array(3),
    'u_lightColor': new Array(3),
    'u_perspective': new Array(16),
    'u_time': 0,
    'u_view': new Array(16)
});

/**
 * WebGLRenderer is a private class that manages all interactions with the WebGL
 * API. Each frame it receives commands from the compositor and updates its
 * registries accordingly. Subsequently, the draw function is called and the
 * WebGLRenderer issues draw calls for all meshes in its registry.
 *
 * @class WebGLRenderer
 * @constructor
 *
 * @param {Element} canvas The DOM element that GL will paint itself onto.
 * @param {Compositor} compositor Compositor used for querying the time from.
 *
 * @return {undefined} undefined
 */
function WebGLRenderer(canvas, compositor) {
    canvas.classList.add('famous-webgl-renderer');

    this.canvas = canvas;
    this.compositor = compositor;

    for (var key in this.constructor.DEFAULT_STYLES) {
        this.canvas.style[key] = this.constructor.DEFAULT_STYLES[key];
    }

    var gl = this.gl = this.getWebGLContext(this.canvas);

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.polygonOffset(0.1, 0.1);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    this.meshRegistry = {};
    this.meshRegistryKeys = [];

    this.cutoutRegistry = {};

    this.cutoutRegistryKeys = [];

    /**
     * Lights
     */
    this.numLights = 0;
    this.ambientLightColor = [0, 0, 0];
    this.lightRegistry = {};
    this.lightRegistryKeys = [];
    this.lightPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.lightColors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.textureManager = new TextureManager(gl);
    this.texCache = {};
    this.bufferRegistry = new BufferRegistry(gl);
    this.program = new Program(gl, { debug: true });

    this.state = {
        boundArrayBuffer: null,
        boundElementBuffer: null,
        lastDrawn: null,
        enabledAttributes: {},
        enabledAttributesKeys: []
    };

    this.resolutionName = ['u_resolution'];
    this.resolutionValues = [];

    this.cachedSize = [];

    /*
    The projectionTransform has some constant components, i.e. the z scale, and the x and y translation.

    The z scale keeps the final z position of any vertex within the clip's domain by scaling it by an
    arbitrarily small coefficient. This has the advantage of being a useful default in the event of the
    user forgoing a near and far plane, an alien convention in dom space as in DOM overlapping is
    conducted via painter's algorithm.

    The x and y translation transforms the world space origin to the top left corner of the screen.

    The final component (this.projectionTransform[15]) is initialized as 1 because certain projection models,
    e.g. the WC3 specified model, keep the XY plane as the projection hyperplane.
    */
    this.projectionTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -0.000001, 0, -1, 1, 0, 1];

    // TODO: remove this hack

    var cutout = this.cutoutGeometry = new Plane();

    this.bufferRegistry.allocate(cutout.spec.id, 'a_pos', cutout.spec.bufferValues[0], 3);
    this.bufferRegistry.allocate(cutout.spec.id, 'a_texCoord', cutout.spec.bufferValues[1], 2);
    this.bufferRegistry.allocate(cutout.spec.id, 'a_normals', cutout.spec.bufferValues[2], 3);
    this.bufferRegistry.allocate(cutout.spec.id, 'indices', cutout.spec.bufferValues[3], 1);
}

/**
 * Attempts to retreive the WebGLRenderer context using several
 * accessors. For browser compatability. Throws on error.
 *
 * @method
 *
 * @param {Object} canvas Canvas element from which the context is retreived
 *
 * @return {Object} WebGLContext of canvas element
 */
WebGLRenderer.prototype.getWebGLContext = function getWebGLContext(canvas) {
    var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    var context = null;
    for (var i = 0; i < names.length; i++) {
        try {
            context = canvas.getContext(names[i]);
        }
        catch (error) {
            var msg = 'Error creating WebGL context: ' + error.prototype.toString();
            console.error(msg);
        }
        if (context) {
            break;
        }
    }
    return context ? context : false;
};

/**
 * Adds a new base spec to the light registry at a given path.
 *
 * @method
 *
 * @param {String} path Path used as id of new light in lightRegistry
 *
 * @return {Object} Newly created light spec
 */
WebGLRenderer.prototype.createLight = function createLight(path) {
    this.numLights++;
    this.lightRegistryKeys.push(path);
    this.lightRegistry[path] = {
        color: [0, 0, 0],
        position: [0, 0, 0]
    };
    return this.lightRegistry[path];
};

/**
 * Adds a new base spec to the mesh registry at a given path.
 *
 * @method
 *
 * @param {String} path Path used as id of new mesh in meshRegistry.
 *
 * @return {Object} Newly created mesh spec.
 */
WebGLRenderer.prototype.createMesh = function createMesh(path) {
    this.meshRegistryKeys.push(path);

    var uniforms = keyValueToArrays({
        u_opacity: 1,
        u_transform: identity,
        u_size: [0, 0, 0],
        u_baseColor: [0.5, 0.5, 0.5, 1],
        u_positionOffset: [0, 0, 0],
        u_normals: [0, 0, 0],
        u_flatShading: 0,
        u_glossiness: [0, 0, 0, 0]
    });
    this.meshRegistry[path] = {
        depth: null,
        uniformKeys: uniforms.keys,
        uniformValues: uniforms.values,
        buffers: {},
        geometry: null,
        drawType: null,
        textures: [],
        visible: true
    };
    return this.meshRegistry[path];
};

/**
 * Sets flag on indicating whether to do skip draw phase for
 * cutout mesh at given path.
 *
 * @method
 *
 * @param {String} path Path used as id of target cutout mesh.
 * @param {Boolean} usesCutout Indicates the presence of a cutout mesh
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.setCutoutState = function setCutoutState(path, usesCutout) {
    var cutout = this.getOrSetCutout(path);

    cutout.visible = usesCutout;
};

/**
 * Creates or retreives cutout
 *
 * @method
 *
 * @param {String} path Path used as id of target cutout mesh.
 *
 * @return {Object} Newly created cutout spec.
 */
WebGLRenderer.prototype.getOrSetCutout = function getOrSetCutout(path) {
    if (this.cutoutRegistry[path]) {
        return this.cutoutRegistry[path];
    }
    else {
        var uniforms = keyValueToArrays({
            u_opacity: 0,
            u_transform: identity.slice(),
            u_size: [0, 0, 0],
            u_origin: [0, 0, 0],
            u_baseColor: [0, 0, 0, 1]
        });

        this.cutoutRegistryKeys.push(path);

        this.cutoutRegistry[path] = {
            uniformKeys: uniforms.keys,
            uniformValues: uniforms.values,
            geometry: this.cutoutGeometry.spec.id,
            drawType: this.cutoutGeometry.spec.type,
            visible: true
        };

        return this.cutoutRegistry[path];
    }
};

/**
 * Sets flag on indicating whether to do skip draw phase for
 * mesh at given path.
 *
 * @method
 * @param {String} path Path used as id of target mesh.
 * @param {Boolean} visibility Indicates the visibility of target mesh.
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.setMeshVisibility = function setMeshVisibility(path, visibility) {
    var mesh = this.meshRegistry[path] || this.createMesh(path);

    mesh.visible = visibility;
};

/**
 * Deletes a mesh from the meshRegistry.
 *
 * @method
 * @param {String} path Path used as id of target mesh.
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.removeMesh = function removeMesh(path) {
    var keyLocation = this.meshRegistryKeys.indexOf(path);
    this.meshRegistryKeys.splice(keyLocation, 1);
    this.meshRegistry[path] = null;
};

/**
 * Creates or retreives cutout
 *
 * @method
 * @param {String} path Path used as id of cutout in cutout registry.
 * @param {String} uniformName Identifier used to upload value
 * @param {Array} uniformValue Value of uniform data
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.setCutoutUniform = function setCutoutUniform(path, uniformName, uniformValue) {
    var cutout = this.getOrSetCutout(path);

    var index = cutout.uniformKeys.indexOf(uniformName);

    if (Array.isArray(uniformValue)) {
        for (var i = 0, len = uniformValue.length; i < len; i++) {
            cutout.uniformValues[index][i] = uniformValue[i];
        }
    }
    else {
        cutout.uniformValues[index] = uniformValue;
    }
};

/**
 * Edits the options field on a mesh
 *
 * @method
 * @param {String} path Path used as id of target mesh
 * @param {Object} options Map of draw options for mesh
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.setMeshOptions = function(path, options) {
    var mesh = this.meshRegistry[path] || this.createMesh(path);

    mesh.options = options;
    return this;
};

/**
 * Changes the color of the fixed intensity lighting in the scene
 *
 * @method
 *
 * @param {String} path Path used as id of light
 * @param {Number} r red channel
 * @param {Number} g green channel
 * @param {Number} b blue channel
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.setAmbientLightColor = function setAmbientLightColor(path, r, g, b) {
    this.ambientLightColor[0] = r;
    this.ambientLightColor[1] = g;
    this.ambientLightColor[2] = b;
    return this;
};

/**
 * Changes the location of the light in the scene
 *
 * @method
 *
 * @param {String} path Path used as id of light
 * @param {Number} x x position
 * @param {Number} y y position
 * @param {Number} z z position
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.setLightPosition = function setLightPosition(path, x, y, z) {
    var light = this.lightRegistry[path] || this.createLight(path);

    light.position[0] = x;
    light.position[1] = y;
    light.position[2] = z;
    return this;
};

/**
 * Changes the color of a dynamic intensity lighting in the scene
 *
 * @method
 *
 * @param {String} path Path used as id of light in light Registry.
 * @param {Number} r red channel
 * @param {Number} g green channel
 * @param {Number} b blue channel
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.setLightColor = function setLightColor(path, r, g, b) {
    var light = this.lightRegistry[path] || this.createLight(path);

    light.color[0] = r;
    light.color[1] = g;
    light.color[2] = b;
    return this;
};

/**
 * Compiles material spec into program shader
 *
 * @method
 *
 * @param {String} path Path used as id of cutout in cutout registry.
 * @param {String} name Name that the rendering input the material is bound to
 * @param {Object} material Material spec
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.handleMaterialInput = function handleMaterialInput(path, name, material) {
    var mesh = this.meshRegistry[path] || this.createMesh(path);
    material = compileMaterial(material, mesh.textures.length);

    // Set uniforms to enable texture!

    mesh.uniformValues[mesh.uniformKeys.indexOf(name)][0] = -material._id;

    // Register textures!

    var i = material.textures.length;
    while (i--) {
        mesh.textures.push(
            this.textureManager.register(material.textures[i], mesh.textures.length + i)
        );
    }

    // Register material!

    this.program.registerMaterial(name, material);

    return this.updateSize();
};

/**
 * Changes the geometry data of a mesh
 *
 * @method
 *
 * @param {String} path Path used as id of cutout in cutout registry.
 * @param {Object} geometry Geometry object containing vertex data to be drawn
 * @param {Number} drawType Primitive identifier
 * @param {Boolean} dynamic Whether geometry is dynamic
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.setGeometry = function setGeometry(path, geometry, drawType, dynamic) {
    var mesh = this.meshRegistry[path] || this.createMesh(path);

    mesh.geometry = geometry;
    mesh.drawType = drawType;
    mesh.dynamic = dynamic;

    return this;
};

/**
 * Uploads a new value for the uniform data when the mesh is being drawn
 *
 * @method
 *
 * @param {String} path Path used as id of mesh in mesh registry
 * @param {String} uniformName Identifier used to upload value
 * @param {Array} uniformValue Value of uniform data
 *
 * @return {undefined} undefined
**/
WebGLRenderer.prototype.setMeshUniform = function setMeshUniform(path, uniformName, uniformValue) {
    var mesh = this.meshRegistry[path] || this.createMesh(path);

    var index = mesh.uniformKeys.indexOf(uniformName);

    if (index === -1) {
        mesh.uniformKeys.push(uniformName);
        mesh.uniformValues.push(uniformValue);
    }
    else {
        mesh.uniformValues[index] = uniformValue;
    }
};

/**
 * Triggers the 'draw' phase of the WebGLRenderer. Iterates through registries
 * to set uniforms, set attributes and issue draw commands for renderables.
 *
 * @method
 *
 * @param {String} path Path used as id of mesh in mesh registry
 * @param {Number} geometryId Id of geometry in geometry registry
 * @param {String} bufferName Attribute location name
 * @param {Array} bufferValue Vertex data
 * @param {Number} bufferSpacing The dimensions of the vertex
 * @param {Boolean} isDynamic Whether geometry is dynamic
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.bufferData = function bufferData(path, geometryId, bufferName, bufferValue, bufferSpacing, isDynamic) {
    this.bufferRegistry.allocate(geometryId, bufferName, bufferValue, bufferSpacing, isDynamic);

    return this;
};

/**
 * Triggers the 'draw' phase of the WebGLRenderer. Iterates through registries
 * to set uniforms, set attributes and issue draw commands for renderables.
 *
 * @method
 *
 * @param {Object} renderState Parameters provided by the compositor, that affect the rendering of all renderables.
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.draw = function draw(renderState) {
    var time = this.compositor.getTime();

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.textureManager.update(time);

    this.meshRegistryKeys = sorter(this.meshRegistryKeys, this.meshRegistry);

    this.setGlobalUniforms(renderState);
    this.drawCutouts();
    this.drawMeshes();
};

/**
 * Iterates through and draws all registered meshes. This includes
 * binding textures, handling draw options, setting mesh uniforms
 * and drawing mesh buffers.
 *
 * @method
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.drawMeshes = function drawMeshes() {
    var gl = this.gl;
    var buffers;
    var mesh;

    for(var i = 0; i < this.meshRegistryKeys.length; i++) {
        mesh = this.meshRegistry[this.meshRegistryKeys[i]];
        buffers = this.bufferRegistry.registry[mesh.geometry];

        if (!mesh.visible) continue;

        if (mesh.uniformValues[0] < 1) {
            gl.depthMask(false);
            gl.enable(gl.BLEND);
        }
        else {
            gl.depthMask(true);
            gl.disable(gl.BLEND);
        }

        if (!buffers) continue;

        var j = mesh.textures.length;
        while (j--) this.textureManager.bindTexture(mesh.textures[j]);

        if (mesh.options) this.handleOptions(mesh.options, mesh);

        this.program.setUniforms(mesh.uniformKeys, mesh.uniformValues);
        this.drawBuffers(buffers, mesh.drawType, mesh.geometry);

        if (mesh.options) this.resetOptions(mesh.options);
    }
};

/**
 * Iterates through and draws all registered cutout meshes. Blending
 * is disabled, cutout uniforms are set and finally buffers are drawn.
 *
 * @method
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.drawCutouts = function drawCutouts() {
    var cutout;
    var buffers;
    var len = this.cutoutRegistryKeys.length;

    if (len) {
        this.gl.enable(this.gl.BLEND);
        this.gl.depthMask(true);
    }

    for (var i = 0; i < len; i++) {
        cutout = this.cutoutRegistry[this.cutoutRegistryKeys[i]];
        buffers = this.bufferRegistry.registry[cutout.geometry];

        if (!cutout.visible) continue;

        this.program.setUniforms(cutout.uniformKeys, cutout.uniformValues);
        this.drawBuffers(buffers, cutout.drawType, cutout.geometry);
    }
};

/**
 * Sets uniforms to be shared by all meshes.
 *
 * @method
 *
 * @param {Object} renderState Draw state options passed down from compositor.
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.setGlobalUniforms = function setGlobalUniforms(renderState) {
    var light;
    var stride;

    for (var i = 0, len = this.lightRegistryKeys.length; i < len; i++) {
        light = this.lightRegistry[this.lightRegistryKeys[i]];
        stride = i * 4;

        // Build the light positions' 4x4 matrix

        this.lightPositions[0 + stride] = light.position[0];
        this.lightPositions[1 + stride] = light.position[1];
        this.lightPositions[2 + stride] = light.position[2];

        // Build the light colors' 4x4 matrix

        this.lightColors[0 + stride] = light.color[0];
        this.lightColors[1 + stride] = light.color[1];
        this.lightColors[2 + stride] = light.color[2];
    }

    globalUniforms.values[0] = this.numLights;
    globalUniforms.values[1] = this.ambientLightColor;
    globalUniforms.values[2] = this.lightPositions;
    globalUniforms.values[3] = this.lightColors;

    /*
     * Set time and projection uniforms
     * projecting world space into a 2d plane representation of the canvas.
     * The x and y scale (this.projectionTransform[0] and this.projectionTransform[5] respectively)
     * convert the projected geometry back into clipspace.
     * The perpective divide (this.projectionTransform[11]), adds the z value of the point
     * multiplied by the perspective divide to the w value of the point. In the process
     * of converting from homogenous coordinates to NDC (normalized device coordinates)
     * the x and y values of the point are divided by w, which implements perspective.
     */
    this.projectionTransform[0] = 1 / (this.cachedSize[0] * 0.5);
    this.projectionTransform[5] = -1 / (this.cachedSize[1] * 0.5);
    this.projectionTransform[11] = renderState.perspectiveTransform[11];

    globalUniforms.values[4] = this.projectionTransform;
    globalUniforms.values[5] = this.compositor.getTime() * 0.001;
    globalUniforms.values[6] = renderState.viewTransform;

    this.program.setUniforms(globalUniforms.keys, globalUniforms.values);
};

/**
 * Loads the buffers and issues the draw command for a geometry.
 *
 * @method
 *
 * @param {Object} vertexBuffers All buffers used to draw the geometry.
 * @param {Number} mode Enumerator defining what primitive to draw
 * @param {Number} id ID of geometry being drawn.
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.drawBuffers = function drawBuffers(vertexBuffers, mode, id) {
    var gl = this.gl;
    var length = 0;
    var attribute;
    var location;
    var spacing;
    var offset;
    var buffer;
    var iter;
    var j;
    var i;

    iter = vertexBuffers.keys.length;
    for (i = 0; i < iter; i++) {
        attribute = vertexBuffers.keys[i];

        // Do not set vertexAttribPointer if index buffer.

        if (attribute === 'indices') {
            j = i; continue;
        }

        // Retreive the attribute location and make sure it is enabled.

        location = this.program.attributeLocations[attribute];

        if (location === -1) continue;
        if (location === undefined) {
            location = gl.getAttribLocation(this.program.program, attribute);
            this.program.attributeLocations[attribute] = location;
            if (location === -1) continue;
        }

        if (!this.state.enabledAttributes[attribute]) {
            gl.enableVertexAttribArray(location);
            this.state.enabledAttributes[attribute] = true;
            this.state.enabledAttributesKeys.push(attribute);
        }

        // Retreive buffer information used to set attribute pointer.

        buffer = vertexBuffers.values[i];
        spacing = vertexBuffers.spacing[i];
        offset = vertexBuffers.offset[i];
        length = vertexBuffers.length[i];

        // Skip bindBuffer if buffer is currently bound.

        if (this.state.boundArrayBuffer !== buffer) {
            gl.bindBuffer(buffer.target, buffer.buffer);
            this.state.boundArrayBuffer = buffer;
        }

        if (this.state.lastDrawn !== id) {
            gl.vertexAttribPointer(location, spacing, gl.FLOAT, gl.FALSE, 0, 4 * offset);
        }
    }

    // Disable any attributes that not currently being used.

    var len = this.state.enabledAttributesKeys.length;
    for (i = 0; i < len; i++) {
        var key = this.state.enabledAttributesKeys[i];
        if (this.state.enabledAttributes[key] && vertexBuffers.keys.indexOf(key) === -1) {
            gl.disableVertexAttribArray(this.program.attributeLocations[key]);
            this.state.enabledAttributes[key] = false;
        }
    }

    if (length) {

        // If index buffer, use drawElements.

        if (j !== undefined) {
            buffer = vertexBuffers.values[j];
            offset = vertexBuffers.offset[j];
            spacing = vertexBuffers.spacing[j];
            length = vertexBuffers.length[j];

            // Skip bindBuffer if buffer is currently bound.

            if (this.state.boundElementBuffer !== buffer) {
                gl.bindBuffer(buffer.target, buffer.buffer);
                this.state.boundElementBuffer = buffer;
            }

            gl.drawElements(gl[mode], length, gl.UNSIGNED_SHORT, 2 * offset);
        }
        else {
            gl.drawArrays(gl[mode], 0, length);
        }
    }

    this.state.lastDrawn = id;
};

/**
 * Updates the width and height of parent canvas, sets the viewport size on
 * the WebGL context and updates the resolution uniform for the shader program.
 * Size is retreived from the container object of the renderer.
 *
 * @method
 *
 * @param {Array} size width, height and depth of canvas
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.updateSize = function updateSize(size) {
    if (size) {
        this.cachedSize[0] = size[0];
        this.cachedSize[1] = size[1];
        this.cachedSize[2] = (size[0] > size[1]) ? size[0] : size[1];
    }

    this.gl.viewport(0, 0, this.cachedSize[0], this.cachedSize[1]);

    this.resolutionValues[0] = this.cachedSize;
    this.program.setUniforms(this.resolutionName, this.resolutionValues);

    return this;
};

/**
 * Updates the state of the WebGL drawing context based on custom parameters
 * defined on a mesh.
 *
 * @method
 *
 * @param {Object} options Draw state options to be set to the context.
 * @param {Mesh} mesh Associated Mesh
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.handleOptions = function handleOptions(options, mesh) {
    var gl = this.gl;
    if (!options) return;

    if (options.side === 'double') {
        this.gl.cullFace(this.gl.FRONT);
        this.drawBuffers(this.bufferRegistry.registry[mesh.geometry], mesh.drawType, mesh.geometry);
        this.gl.cullFace(this.gl.BACK);
    }

    if (options.blending) gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    if (options.side === 'back') gl.cullFace(gl.FRONT);
};

/**
 * Resets the state of the WebGL drawing context to default values.
 *
 * @method
 *
 * @param {Object} options Draw state options to be set to the context.
 *
 * @return {undefined} undefined
 */
WebGLRenderer.prototype.resetOptions = function resetOptions(options) {
    var gl = this.gl;
    if (!options) return;
    if (options.blending) gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    if (options.side === 'back') gl.cullFace(gl.BACK);
};

WebGLRenderer.DEFAULT_STYLES = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    top: '0px',
    left: '0px'
};

module.exports = WebGLRenderer;

},{"../utilities/keyValueToArrays":41,"../webgl-geometries/primitives/Plane":45,"./BufferRegistry":47,"./Program":49,"./TextureManager":51,"./compileMaterial":53,"./radixSort":55}],53:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

var types = {
    1: 'float ',
    2: 'vec2 ',
    3: 'vec3 ',
    4: 'vec4 '
};

/**
 * Traverses material to create a string of glsl code to be applied in
 * the vertex or fragment shader.
 *
 * @method
 * @protected
 *
 * @param {Object} material Material to be compiled.
 * @param {Number} textureSlot Next available texture slot for Mesh.
 *
 * @return {undefined} undefined
 */
function compileMaterial(material, textureSlot) {
    var glsl = '';
    var uniforms = {};
    var varyings = {};
    var attributes = {};
    var defines = [];
    var textures = [];

    _traverse(material, function (node, depth) {
        if (! node.chunk) return;

        var type = types[_getOutputLength(node)];
        var label = _makeLabel(node);
        var output = _processGLSL(node.chunk.glsl, node.inputs, textures.length + textureSlot);

        glsl += type + label + ' = ' + output + '\n ';

        if (node.uniforms) _extend(uniforms, node.uniforms);
        if (node.varyings) _extend(varyings, node.varyings);
        if (node.attributes) _extend(attributes, node.attributes);
        if (node.chunk.defines) defines.push(node.chunk.defines);
        if (node.texture) textures.push(node.texture);
    });

    return {
        _id: material._id,
        glsl: glsl + 'return ' + _makeLabel(material) + ';',
        defines: defines.join('\n'),
        uniforms: uniforms,
        varyings: varyings,
        attributes: attributes,
        textures: textures
    };
}

// Recursively iterates over a material's inputs, invoking a given callback
// with the current material
function _traverse(material, callback) {
	var inputs = material.inputs;
    var len = inputs && inputs.length;
    var idx = -1;

    while (++idx < len) _traverse(inputs[idx], callback);

    callback(material);

    return material;
}

// Helper function used to infer length of the output
// from a given material node.
function _getOutputLength(node) {

    // Handle constant values

    if (typeof node === 'number') return 1;
    if (Array.isArray(node)) return node.length;

    // Handle materials

    var output = node.chunk.output;
    if (typeof output === 'number') return output;

    // Handle polymorphic output

    var key = node.inputs.map(function recurse(node) {
        return _getOutputLength(node);
    }).join(',');

    return output[key];
}

// Helper function to run replace inputs and texture tags with
// correct glsl.
function _processGLSL(str, inputs, textureSlot) {
    return str
        .replace(/%\d/g, function (s) {
            return _makeLabel(inputs[s[1]-1]);
        })
        .replace(/\$TEXTURE/, 'u_textures[' + textureSlot + ']');
}

// Helper function used to create glsl definition of the
// input material node.
function _makeLabel (n) {
    if (Array.isArray(n)) return _arrayToVec(n);
    if (typeof n === 'object') return 'fa_' + (n._id);
    else return n.toFixed(6);
}

// Helper to copy the properties of an object onto another object.
function _extend (a, b) {
	for (var k in b) a[k] = b[k];
}

// Helper to create glsl vector representation of a javascript array.
function _arrayToVec(array) {
    var len = array.length;
    return 'vec' + len + '(' + array.join(',')  + ')';
}

module.exports = compileMaterial;

},{}],54:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

// Generates a checkerboard pattern to be used as a placeholder texture while an
// image loads over the network.
function createCheckerBoard() {
    var context = document.createElement('canvas').getContext('2d');
    context.canvas.width = context.canvas.height = 128;
    for (var y = 0; y < context.canvas.height; y += 16) {
        for (var x = 0; x < context.canvas.width; x += 16) {
            context.fillStyle = (x ^ y) & 16 ? '#FFF' : '#DDD';
            context.fillRect(x, y, 16, 16);
        }
    }

    return context.canvas;
}

module.exports = createCheckerBoard;

},{}],55:[function(require,module,exports){
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Famous Industries Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

var radixBits = 11,
    maxRadix = 1 << (radixBits),
    radixMask = maxRadix - 1,
    buckets = new Array(maxRadix * Math.ceil(64 / radixBits)),
    msbMask = 1 << ((32 - 1) % radixBits),
    lastMask = (msbMask << 1) - 1,
    passCount = ((32 / radixBits) + 0.999999999999999) | 0,
    maxOffset = maxRadix * (passCount - 1),
    normalizer = Math.pow(20, 6);

var buffer = new ArrayBuffer(4);
var floatView = new Float32Array(buffer, 0, 1);
var intView = new Int32Array(buffer, 0, 1);

// comparator pulls relevant sorting keys out of mesh
function comp(list, registry, i) {
    var key = list[i];
    var item = registry[key];
    return (item.depth ? item.depth : registry[key].uniformValues[1][14]) + normalizer;
}

//mutator function records mesh's place in previous pass
function mutator(list, registry, i, value) {
    var key = list[i];
    registry[key].depth = intToFloat(value) - normalizer;
    return key;
}

//clean function removes mutator function's record
function clean(list, registry, i) {
    registry[list[i]].depth = null;
}

//converts a javascript float to a 32bit integer using an array buffer
//of size one
function floatToInt(k) {
    floatView[0] = k;
    return intView[0];
}
//converts a 32 bit integer to a regular javascript float using an array buffer
//of size one
function intToFloat(k) {
    intView[0] = k;
    return floatView[0];
}

//sorts a list of mesh IDs according to their z-depth
function radixSort(list, registry) {
    var pass = 0;
    var out = [];

    var i, j, k, n, div, offset, swap, id, sum, tsum, size;

    passCount = ((32 / radixBits) + 0.999999999999999) | 0;

    for (i = 0, n = maxRadix * passCount; i < n; i++) buckets[i] = 0;

    for (i = 0, n = list.length; i < n; i++) {
        div = floatToInt(comp(list, registry, i));
        div ^= div >> 31 | 0x80000000;
        for (j = 0, k = 0; j < maxOffset; j += maxRadix, k += radixBits) {
            buckets[j + (div >>> k & radixMask)]++;
        }
        buckets[j + (div >>> k & lastMask)]++;
    }

    for (j = 0; j <= maxOffset; j += maxRadix) {
        for (id = j, sum = 0; id < j + maxRadix; id++) {
            tsum = buckets[id] + sum;
            buckets[id] = sum - 1;
            sum = tsum;
        }
    }
    if (--passCount) {
        for (i = 0, n = list.length; i < n; i++) {
            div = floatToInt(comp(list, registry, i));
            out[++buckets[div & radixMask]] = mutator(list, registry, i, div ^= div >> 31 | 0x80000000);
        }
        
        swap = out;
        out = list;
        list = swap;
        while (++pass < passCount) {
            for (i = 0, n = list.length, offset = pass * maxRadix, size = pass * radixBits; i < n; i++) {
                div = floatToInt(comp(list, registry, i));
                out[++buckets[offset + (div >>> size & radixMask)]] = list[i];
            }

            swap = out;
            out = list;
            list = swap;
        }
    }

    for (i = 0, n = list.length, offset = pass * maxRadix, size = pass * radixBits; i < n; i++) {
        div = floatToInt(comp(list, registry, i));
        out[++buckets[offset + (div >>> size & lastMask)]] = mutator(list, registry, i, div ^ (~div >> 31 | 0x80000000));
        clean(list, registry, i);
    }

    return out;
}

module.exports = radixSort;

},{}],56:[function(require,module,exports){
"use strict";
var glslify = require("glslify");
var shaders = require("glslify/simple-adapter.js")("\n#define GLSLIFY 1\n\nmat3 a_x_getNormalMatrix(in mat4 t) {\n  mat3 matNorm;\n  mat4 a = t;\n  float a00 = a[0][0], a01 = a[0][1], a02 = a[0][2], a03 = a[0][3], a10 = a[1][0], a11 = a[1][1], a12 = a[1][2], a13 = a[1][3], a20 = a[2][0], a21 = a[2][1], a22 = a[2][2], a23 = a[2][3], a30 = a[3][0], a31 = a[3][1], a32 = a[3][2], a33 = a[3][3], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n  det = 1.0 / det;\n  matNorm[0][0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;\n  matNorm[0][1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;\n  matNorm[0][2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;\n  matNorm[1][0] = (a02 * b10 - a01 * b11 - a03 * b09) * det;\n  matNorm[1][1] = (a00 * b11 - a02 * b08 + a03 * b07) * det;\n  matNorm[1][2] = (a01 * b08 - a00 * b10 - a03 * b06) * det;\n  matNorm[2][0] = (a31 * b05 - a32 * b04 + a33 * b03) * det;\n  matNorm[2][1] = (a32 * b02 - a30 * b05 - a33 * b01) * det;\n  matNorm[2][2] = (a30 * b04 - a31 * b02 + a33 * b00) * det;\n  return matNorm;\n}\nfloat b_x_inverse(float m) {\n  return 1.0 / m;\n}\nmat2 b_x_inverse(mat2 m) {\n  return mat2(m[1][1], -m[0][1], -m[1][0], m[0][0]) / (m[0][0] * m[1][1] - m[0][1] * m[1][0]);\n}\nmat3 b_x_inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11), b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10), b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\nmat4 b_x_inverse(mat4 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3], a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3], a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3], a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n  return mat4(a11 * b11 - a12 * b10 + a13 * b09, a02 * b10 - a01 * b11 - a03 * b09, a31 * b05 - a32 * b04 + a33 * b03, a22 * b04 - a21 * b05 - a23 * b03, a12 * b08 - a10 * b11 - a13 * b07, a00 * b11 - a02 * b08 + a03 * b07, a32 * b02 - a30 * b05 - a33 * b01, a20 * b05 - a22 * b02 + a23 * b01, a10 * b10 - a11 * b08 + a13 * b06, a01 * b08 - a00 * b10 - a03 * b06, a30 * b04 - a31 * b02 + a33 * b00, a21 * b02 - a20 * b04 - a23 * b00, a11 * b07 - a10 * b09 - a12 * b06, a00 * b09 - a01 * b07 + a02 * b06, a31 * b01 - a30 * b03 - a32 * b00, a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\nfloat c_x_transpose(float m) {\n  return m;\n}\nmat2 c_x_transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0], m[0][1], m[1][1]);\n}\nmat3 c_x_transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0], m[0][1], m[1][1], m[2][1], m[0][2], m[1][2], m[2][2]);\n}\nmat4 c_x_transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0], m[0][1], m[1][1], m[2][1], m[3][1], m[0][2], m[1][2], m[2][2], m[3][2], m[0][3], m[1][3], m[2][3], m[3][3]);\n}\nvec4 applyTransform(vec4 pos) {\n  mat4 MVMatrix = u_view * u_transform;\n  pos.x += 1.0;\n  pos.y -= 1.0;\n  pos.xyz *= u_size * 0.5;\n  pos.y *= -1.0;\n  v_position = (MVMatrix * pos).xyz;\n  v_eyeVector = (u_resolution * 0.5) - v_position;\n  pos = u_perspective * MVMatrix * pos;\n  return pos;\n}\n#vert_definitions\n\nvec3 calculateOffset(vec3 ID) {\n  \n  #vert_applications\n  return vec3(0.0);\n}\nvoid main() {\n  v_textureCoordinate = a_texCoord;\n  vec3 invertedNormals = a_normals + (u_normals.x < 0.0 ? calculateOffset(u_normals) * 2.0 - 1.0 : vec3(0.0));\n  invertedNormals.y *= -1.0;\n  v_normal = c_x_transpose(mat3(b_x_inverse(u_transform))) * invertedNormals;\n  vec3 offsetPos = a_pos + calculateOffset(u_positionOffset);\n  gl_Position = applyTransform(vec4(offsetPos, 1.0));\n}", "\n#define GLSLIFY 1\n\n#float_definitions\n\nfloat a_x_applyMaterial(float ID) {\n  \n  #float_applications\n  return 1.;\n}\n#vec3_definitions\n\nvec3 a_x_applyMaterial(vec3 ID) {\n  \n  #vec3_applications\n  return vec3(0);\n}\n#vec4_definitions\n\nvec4 a_x_applyMaterial(vec4 ID) {\n  \n  #vec4_applications\n  return vec4(0);\n}\nvec4 b_x_applyLight(in vec4 baseColor, in vec3 normal, in vec4 glossiness) {\n  int numLights = int(u_numLights);\n  vec3 ambientColor = u_ambientLight * baseColor.rgb;\n  vec3 eyeVector = normalize(v_eyeVector);\n  vec3 diffuse = vec3(0.0);\n  bool hasGlossiness = glossiness.a > 0.0;\n  bool hasSpecularColor = length(glossiness.rgb) > 0.0;\n  for(int i = 0; i < 4; i++) {\n    if(i >= numLights)\n      break;\n    vec3 lightDirection = normalize(u_lightPosition[i].xyz - v_position);\n    float lambertian = max(dot(lightDirection, normal), 0.0);\n    if(lambertian > 0.0) {\n      diffuse += u_lightColor[i].rgb * baseColor.rgb * lambertian;\n      if(hasGlossiness) {\n        vec3 halfVector = normalize(lightDirection + eyeVector);\n        float specularWeight = pow(max(dot(halfVector, normal), 0.0), glossiness.a);\n        vec3 specularColor = hasSpecularColor ? glossiness.rgb : u_lightColor[i].rgb;\n        diffuse += specularColor * specularWeight * lambertian;\n      }\n    }\n  }\n  return vec4(ambientColor + diffuse, baseColor.a);\n}\nvoid main() {\n  vec4 material = u_baseColor.r >= 0.0 ? u_baseColor : a_x_applyMaterial(u_baseColor);\n  bool lightsEnabled = (u_flatShading == 0.0) && (u_numLights > 0.0 || length(u_ambientLight) > 0.0);\n  vec3 normal = normalize(v_normal);\n  vec4 glossiness = u_glossiness.x < 0.0 ? a_x_applyMaterial(u_glossiness) : u_glossiness;\n  vec4 color = lightsEnabled ? b_x_applyLight(material, normalize(v_normal), glossiness) : material;\n  gl_FragColor = color;\n  gl_FragColor.a *= u_opacity;\n}", [], []);
module.exports = shaders;
},{"glslify":30,"glslify/simple-adapter.js":31}],57:[function(require,module,exports){
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

},{"../DOM":1,"famous/core/FamousEngine":9}]},{},[57])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiRE9NLmpzIiwiRE9NTm9kZS5qcyIsIk5vZGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvbXBvbmVudHMvQ2FtZXJhLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL0NoYW5uZWwuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvQ2xvY2suanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRGlzcGF0Y2guanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRmFtb3VzRW5naW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL05vZGUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvU2NlbmUuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvU2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9UcmFuc2Zvcm0uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJhYmxlcy9ET01FbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9kb20tcmVuZGVyZXJzL0RPTVJlbmRlcmVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9kb20tcmVuZGVyZXJzL0VsZW1lbnRDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvZG9tLXJlbmRlcmVycy9NYXRoLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9kb20tcmVuZGVyZXJzL2V2ZW50cy9Db21wb3NpdGlvbkV2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9kb20tcmVuZGVyZXJzL2V2ZW50cy9FdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvZG9tLXJlbmRlcmVycy9ldmVudHMvRXZlbnRNYXAuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL0ZvY3VzRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL0lucHV0RXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL0tleWJvYXJkRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL01vdXNlRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL1RvdWNoRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL1VJRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL2RvbS1yZW5kZXJlcnMvZXZlbnRzL1doZWVsRXZlbnQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL21hdGgvVmVjMi5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvbWF0aC9WZWMzLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9ub2RlX21vZHVsZXMvZ2xzbGlmeS9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9ub2RlX21vZHVsZXMvZ2xzbGlmeS9zaW1wbGUtYWRhcHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvcG9seWZpbGxzL2FuaW1hdGlvbkZyYW1lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9wb2x5ZmlsbHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3JlbmRlci1sb29wcy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy9yZW5kZXJlcnMvQ29tcG9zaXRvci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvcmVuZGVyZXJzL0NvbnRleHQuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3JlbmRlcmVycy9VSU1hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3JlbmRlcmVycy9pbmplY3QtY3NzLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMvQ2FsbGJhY2tTdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvdXRpbGl0aWVzL2Nsb25lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMva2V5VmFsdWVUb0FycmF5cy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvdXRpbGl0aWVzL3ZlbmRvclByZWZpeC5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvd2ViZ2wtZ2VvbWV0cmllcy9HZW9tZXRyeS5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvd2ViZ2wtZ2VvbWV0cmllcy9HZW9tZXRyeUhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvd2ViZ2wtZ2VvbWV0cmllcy9wcmltaXRpdmVzL1BsYW5lLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1yZW5kZXJlcnMvQnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1yZW5kZXJlcnMvQnVmZmVyUmVnaXN0cnkuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3dlYmdsLXJlbmRlcmVycy9EZWJ1Zy5qcyIsIm5vZGVfbW9kdWxlcy9mYW1vdXMvd2ViZ2wtcmVuZGVyZXJzL1Byb2dyYW0uanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3dlYmdsLXJlbmRlcmVycy9UZXh0dXJlLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1yZW5kZXJlcnMvVGV4dHVyZU1hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvZmFtb3VzL3dlYmdsLXJlbmRlcmVycy9XZWJHTFJlbmRlcmVyLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1yZW5kZXJlcnMvY29tcGlsZU1hdGVyaWFsLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1yZW5kZXJlcnMvY3JlYXRlQ2hlY2tlcmJvYXJkLmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1yZW5kZXJlcnMvcmFkaXhTb3J0LmpzIiwibm9kZV9tb2R1bGVzL2ZhbW91cy93ZWJnbC1zaGFkZXJzL2luZGV4LmpzIiwiZXhhbXBsZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9YQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxb0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNscUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5cUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDampCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOTBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBET01Ob2RlID0gcmVxdWlyZSgnLi9ET01Ob2RlJyk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyKHRhZ05hbWUpIHtcblx0dGFnTmFtZSA9IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcblx0dGhpc1t0YWdOYW1lXSA9IHRoaXNbdGFnTmFtZV0gfHwgZnVuY3Rpb24oY29udGVudCwgYXR0cmlidXRlcywgcHJvcGVydGllcykge1xuXHRcdGlmICh0eXBlb2YgY29udGVudCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdHByb3BlcnRpZXMgPSBhdHRyaWJ1dGVzO1xuXHRcdFx0YXR0cmlidXRlcyA9IGNvbnRlbnQ7XG5cdFx0XHRjb250ZW50ID0gJyc7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgRE9NTm9kZSh7XG5cdFx0XHR0YWdOYW1lOiB0YWdOYW1lLFxuXHRcdFx0YXR0cmlidXRlczogYXR0cmlidXRlcyxcblx0XHRcdHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG5cdFx0XHRjb250ZW50OiBjb250ZW50XG5cdFx0fSk7XG5cdH07XG5cdHJldHVybiB0aGlzW3RhZ05hbWVdO1xufVxuXG52YXIgRE9NID0ge1xuXHRyZWdpc3RlcjogcmVnaXN0ZXJcbn07XG5cbi8vIFNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sLW1hcmt1cC9lbGVtZW50cy5odG1sXG5cbltcbiAgICAnYScsXG4gICAgJ2FiYnInLFxuICAgICdhZGRyZXNzJyxcbiAgICAnYXJlYScsXG4gICAgJ2FydGljbGUnLFxuICAgICdhc2lkZScsXG4gICAgJ2F1ZGlvJyxcbiAgICAnYicsXG4gICAgJ2Jhc2UnLFxuICAgICdiZGknLFxuICAgICdiZG8nLFxuICAgICdibG9ja3F1b3RlJyxcbiAgICAnYm9keScsXG4gICAgJ2JyJyxcbiAgICAnYnV0dG9uJyxcbiAgICAnY2FudmFzJyxcbiAgICAnY2FwdGlvbicsXG4gICAgJ2NpdGUnLFxuICAgICdjb2RlJyxcbiAgICAnY29sJyxcbiAgICAnY29sZ3JvdXAnLFxuICAgICdjb21tYW5kJyxcbiAgICAnZGF0YWxpc3QnLFxuICAgICdkZCcsXG4gICAgJ2RlbCcsXG4gICAgJ2RldGFpbHMnLFxuICAgICdkZm4nLFxuICAgICdkaXYnLFxuICAgICdkbCcsXG4gICAgJ2R0JyxcbiAgICAnZW0nLFxuICAgICdlbWJlZCcsXG4gICAgJ2ZpZWxkc2V0JyxcbiAgICAnZmlnY2FwdGlvbicsXG4gICAgJ2ZpZ3VyZScsXG4gICAgJ2Zvb3RlcicsXG4gICAgJ2Zvcm0nLFxuICAgICdoMScsXG4gICAgJ2gyJyxcbiAgICAnaDMnLFxuICAgICdoNCcsXG4gICAgJ2g1JyxcbiAgICAnaDYnLFxuICAgICdoZWFkJyxcbiAgICAnaGVhZGVyJyxcbiAgICAnaGdyb3VwJyxcbiAgICAnaHInLFxuICAgICdodG1sJyxcbiAgICAnaScsXG4gICAgJ2lmcmFtZScsXG4gICAgJ2ltZycsXG4gICAgJ2lucHV0JyxcbiAgICAnaW5zJyxcbiAgICAna2JkJyxcbiAgICAna2V5Z2VuJyxcbiAgICAnbGFiZWwnLFxuICAgICdsZWdlbmQnLFxuICAgICdsaScsXG4gICAgJ2xpbmsnLFxuICAgICdtYXAnLFxuICAgICdtYXJrJyxcbiAgICAnbWVudScsXG4gICAgJ21ldGEnLFxuICAgICdtZXRlcicsXG4gICAgJ25hdicsXG4gICAgJ25vc2NyaXB0JyxcbiAgICAnb2JqZWN0JyxcbiAgICAnb2wnLFxuICAgICdvcHRncm91cCcsXG4gICAgJ29wdGlvbicsXG4gICAgJ291dHB1dCcsXG4gICAgJ3AnLFxuICAgICdwYXJhbScsXG4gICAgJ3ByZScsXG4gICAgJ3Byb2dyZXNzJyxcbiAgICAncScsXG4gICAgJ3JwJyxcbiAgICAncnQnLFxuICAgICdydWJ5JyxcbiAgICAncycsXG4gICAgJ3NhbXAnLFxuICAgICdzY3JpcHQnLFxuICAgICdzZWN0aW9uJyxcbiAgICAnc2VsZWN0JyxcbiAgICAnc21hbGwnLFxuICAgICdzb3VyY2UnLFxuICAgICdzcGFuJyxcbiAgICAnc3Ryb25nJyxcbiAgICAnc3R5bGUnLFxuICAgICdzdWInLFxuICAgICdzdW1tYXJ5JyxcbiAgICAnc3VwJyxcbiAgICAndGFibGUnLFxuICAgICd0Ym9keScsXG4gICAgJ3RkJyxcbiAgICAndGV4dGFyZWEnLFxuICAgICd0Zm9vdCcsXG4gICAgJ3RoJyxcbiAgICAndGhlYWQnLFxuICAgICd0aW1lJyxcbiAgICAndGl0bGUnLFxuICAgICd0cicsXG4gICAgJ3RyYWNrJyxcbiAgICAndScsXG4gICAgJ3VsJyxcbiAgICAndmFyJyxcbiAgICAndmlkZW8nLFxuICAgICd3YnInLFxuXS5mb3JFYWNoKGZ1bmN0aW9uICh0YWdOYW1lKSB7XG5cdERPTS5yZWdpc3Rlcih0YWdOYW1lKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERPTTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUnKTtcbnZhciBET01FbGVtZW50ID0gcmVxdWlyZSgnZmFtb3VzL2RvbS1yZW5kZXJhYmxlcy9ET01FbGVtZW50Jyk7XG5cbmZ1bmN0aW9uIERPTU5vZGUob3B0aW9ucykge1xuXHROb2RlLmNhbGwodGhpcyk7XG5cdHRoaXMuZWxlbWVudCA9IG5ldyBET01FbGVtZW50KHRoaXMsIG9wdGlvbnMpO1xufVxuXG5ET01Ob2RlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTm9kZS5wcm90b3R5cGUpO1xuRE9NTm9kZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01Ob2RlO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhET01Ob2RlLnByb3RvdHlwZSwge1xuXHRjb250ZW50OiB7XG5cdFx0c2V0OiBmdW5jdGlvbihjb250ZW50KSB7XG5cdFx0XHR0aGlzLnNldENvbnRlbnQoY29udGVudCk7XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0Q29udGVudCgpO1xuXHRcdH1cblx0fVxufSk7XG5cbi8vIFRPRE8gcHJvcGVydGllcywgYXR0cmlidXRlc1xuXG5tb2R1bGUuZXhwb3J0cyA9IERPTU5vZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDb3JlTm9kZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL05vZGUnKTtcblxuZnVuY3Rpb24gTm9kZShvcHRpb25zKSB7XG5cdENvcmVOb2RlLmNhbGwodGhpcyk7XG5cblx0dGhpcy5wb3NpdGlvbiA9IG5ldyBQb3NpdGlvbih0aGlzKTtcblx0dGhpcy5zY2FsZSA9IG5ldyBTY2FsZSh0aGlzKTtcblx0dGhpcy5yb3RhdGlvbiA9IG5ldyBSb3RhdGlvbih0aGlzKTtcbn1cblxuTm9kZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvcmVOb2RlLnByb3RvdHlwZSk7XG5Ob2RlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vZGU7XG5cbk5vZGUucHJvdG90eXBlLm9uUmVjZWl2ZSA9IGZ1bmN0aW9uKHR5cGUsIGV2KSB7XG5cdENvcmVOb2RlLnByb3RvdHlwZS5vblJlY2VpdmUuY2FsbCh0aGlzLCB0eXBlLCBldik7XG5cdHZhciBtZXRob2ROYW1lID0gJ29uJyArIHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc3Vic3RyKDEpO1xuXHRpZiAodGhpc1ttZXRob2ROYW1lXSkge1xuXHRcdHRoaXNbbWV0aG9kTmFtZV0oZXYpO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBQb3NpdGlvbihub2RlKSB7XG5cdHRoaXMubm9kZSA9IG5vZGU7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFBvc2l0aW9uLnByb3RvdHlwZSwge1xuXHR4OiB7XG5cdFx0c2V0OiBmdW5jdGlvbih4KSB7XG5cdFx0XHR0aGlzLm5vZGUuc2V0UG9zaXRpb24oeCwgbnVsbCwgbnVsbCk7XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpWzBdO1xuXHRcdH1cblx0fSxcblx0eToge1xuXHRcdHNldDogZnVuY3Rpb24oeSkge1xuXHRcdFx0dGhpcy5ub2RlLnNldFBvc2l0aW9uKG51bGwsIHksIG51bGwpO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKVsxXTtcblx0XHR9XG5cdH0sXG5cdHo6IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHopIHtcblx0XHRcdHRoaXMubm9kZS5zZXRQb3NpdGlvbihudWxsLCBudWxsLCB6KTtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ub2RlLmdldFBvc2l0aW9uKClbMl07XG5cdFx0fVxuXHR9XG59KTtcblxuZnVuY3Rpb24gU2NhbGUobm9kZSkge1xuXHR0aGlzLm5vZGUgPSBub2RlO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhTY2FsZS5wcm90b3R5cGUsIHtcblx0eDoge1xuXHRcdHNldDogZnVuY3Rpb24oeCkge1xuXHRcdFx0dGhpcy5ub2RlLnNldFNjYWxlKHgsIG51bGwsIG51bGwpO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5vZGUuZ2V0U2NhbGUoKVswXTtcblx0XHR9XG5cdH0sXG5cdHk6IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHkpIHtcblx0XHRcdHRoaXMubm9kZS5zZXRTY2FsZShudWxsLCB5LCBudWxsKTtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ub2RlLmdldFNjYWxlKClbMV07XG5cdFx0fVxuXHR9LFxuXHR6OiB7XG5cdFx0c2V0OiBmdW5jdGlvbih6KSB7XG5cdFx0XHR0aGlzLm5vZGUuc2V0U2NhbGUobnVsbCwgbnVsbCwgeik7XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubm9kZS5nZXRTY2FsZSgpWzJdO1xuXHRcdH1cblx0fVxufSk7XG5cbi8vIE9ubHkgc3VwcG9ydHMgZXVsZXIgYW5nbGVzXG5mdW5jdGlvbiBSb3RhdGlvbihub2RlKSB7XG5cdHRoaXMubm9kZSA9IG5vZGU7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJvdGF0aW9uLnByb3RvdHlwZSwge1xuXHR4OiB7XG5cdFx0c2V0OiBmdW5jdGlvbih4KSB7XG5cdFx0XHR0aGlzLm5vZGUuc2V0Um90YXRpb24oeCwgbnVsbCwgbnVsbCk7XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubm9kZS5nZXRSb3RhdGlvbigpWzBdO1xuXHRcdH1cblx0fSxcblx0eToge1xuXHRcdHNldDogZnVuY3Rpb24oeSkge1xuXHRcdFx0dGhpcy5ub2RlLnNldFJvdGF0aW9uKG51bGwsIHksIG51bGwpO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5vZGUuZ2V0Um90YXRpb24oKVsxXTtcblx0XHR9XG5cdH0sXG5cdHo6IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHopIHtcblx0XHRcdHRoaXMubm9kZS5zZXRSb3RhdGlvbihudWxsLCBudWxsLCB6KTtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ub2RlLmdldFJvdGF0aW9uKClbMl07XG5cdFx0fVxuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDYW1lcmEgaXMgYSBjb21wb25lbnQgdGhhdCBpcyByZXNwb25zaWJsZSBmb3Igc2VuZGluZyBpbmZvcm1hdGlvbiB0byB0aGUgcmVuZGVyZXIgYWJvdXQgd2hlcmVcbiAqIHRoZSBjYW1lcmEgaXMgaW4gdGhlIHNjZW5lLiAgVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gc2V0IHRoZSB0eXBlIG9mIHByb2plY3Rpb24sIHRoZSBmb2NhbCBkZXB0aCxcbiAqIGFuZCBvdGhlciBwcm9wZXJ0aWVzIHRvIGFkanVzdCB0aGUgd2F5IHRoZSBzY2VuZXMgYXJlIHJlbmRlcmVkLlxuICpcbiAqIEBjbGFzcyBDYW1lcmFcbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgdG8gd2hpY2ggdGhlIGluc3RhbmNlIG9mIENhbWVyYSB3aWxsIGJlIGEgY29tcG9uZW50IG9mXG4gKi9cbmZ1bmN0aW9uIENhbWVyYShub2RlKSB7XG4gICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgdGhpcy5fcHJvamVjdGlvblR5cGUgPSBDYW1lcmEuT1JUSE9HUkFQSElDX1BST0pFQ1RJT047XG4gICAgdGhpcy5fZm9jYWxEZXB0aCA9IDA7XG4gICAgdGhpcy5fbmVhciA9IDA7XG4gICAgdGhpcy5fZmFyID0gMDtcbiAgICB0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy5faWQgPSBub2RlLmFkZENvbXBvbmVudCh0aGlzKTtcbiAgICB0aGlzLl92aWV3VHJhbnNmb3JtID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV0pO1xuICAgIHRoaXMuX3ZpZXdEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlcnNwZWN0aXZlRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLnNldEZsYXQoKTtcbn1cblxuQ2FtZXJhLkZSVVNUVU1fUFJPSkVDVElPTiA9IDA7XG5DYW1lcmEuUElOSE9MRV9QUk9KRUNUSU9OID0gMTtcbkNhbWVyYS5PUlRIT0dSQVBISUNfUFJPSkVDVElPTiA9IDI7XG5cbi8qKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gTmFtZSBvZiB0aGUgY29tcG9uZW50XG4gKi9cbkNhbWVyYS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ0NhbWVyYSc7XG59O1xuXG4vKipcbiAqIEdldHMgb2JqZWN0IGNvbnRhaW5pbmcgc2VyaWFsaXplZCBkYXRhIGZvciB0aGUgY29tcG9uZW50XG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBvbmVudDogdGhpcy50b1N0cmluZygpLFxuICAgICAgICBwcm9qZWN0aW9uVHlwZTogdGhpcy5fcHJvamVjdGlvblR5cGUsXG4gICAgICAgIGZvY2FsRGVwdGg6IHRoaXMuX2ZvY2FsRGVwdGgsXG4gICAgICAgIG5lYXI6IHRoaXMuX25lYXIsXG4gICAgICAgIGZhcjogdGhpcy5fZmFyXG4gICAgfTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIHN0YXRlIGJhc2VkIG9uIHNvbWUgc2VyaWFsaXplZCBkYXRhXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBhbiBvYmplY3QgZGVmaW5pbmcgd2hhdCB0aGUgc3RhdGUgb2YgdGhlIGNvbXBvbmVudCBzaG91bGQgYmVcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSBzdGF0dXMgb2YgdGhlIHNldFxuICovXG5DYW1lcmEucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUoc3RhdGUpIHtcbiAgICBpZiAodGhpcy50b1N0cmluZygpID09PSBzdGF0ZS5jb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5zZXQoc3RhdGUucHJvamVjdGlvblR5cGUsIHN0YXRlLmZvY2FsRGVwdGgsIHN0YXRlLm5lYXIsIHN0YXRlLmZhcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgaW50ZXJuYWxzIG9mIHRoZSBjb21wb25lbnRcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgYW4gaWQgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZSBvZiBwcm9qZWN0aW9uIHRvIHVzZVxuICogQHBhcmFtIHtOdW1iZXJ9IGRlcHRoIHRoZSBkZXB0aCBmb3IgdGhlIHBpbmhvbGUgcHJvamVjdGlvbiBtb2RlbFxuICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgdGhlIGRpc3RhbmNlIG9mIHRoZSBuZWFyIGNsaXBwaW5nIHBsYW5lIGZvciBhIGZydXN0dW0gcHJvamVjdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGZhciB0aGUgZGlzdGFuY3Qgb2YgdGhlIGZhciBjbGlwcGluZyBwbGFuZSBmb3IgYSBmcnVzdHVtIHByb2plY3Rpb25cbiAqIFxuICogQHJldHVybiB7Qm9vbGVhbn0gc3RhdHVzIG9mIHRoZSBzZXRcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodHlwZSwgZGVwdGgsIG5lYXIsIGZhcikge1xuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkge1xuICAgICAgICB0aGlzLl9ub2RlLnJlcXVlc3RVcGRhdGUodGhpcy5faWQpO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fcHJvamVjdGlvblR5cGUgPSB0eXBlO1xuICAgIHRoaXMuX2ZvY2FsRGVwdGggPSBkZXB0aDtcbiAgICB0aGlzLl9uZWFyID0gbmVhcjtcbiAgICB0aGlzLl9mYXIgPSBmYXI7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY2FtZXJhIGRlcHRoIGZvciBhIHBpbmhvbGUgcHJvamVjdGlvbiBtb2RlbFxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVwdGggdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIENhbWVyYSBhbmQgdGhlIG9yaWdpblxuICpcbiAqIEByZXR1cm4ge0NhbWVyYX0gdGhpc1xuICovXG5DYW1lcmEucHJvdG90eXBlLnNldERlcHRoID0gZnVuY3Rpb24gc2V0RGVwdGgoZGVwdGgpIHtcbiAgICBpZiAoIXRoaXMuX3JlcXVlc3RpbmdVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5fbm9kZS5yZXF1ZXN0VXBkYXRlKHRoaXMuX2lkKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX3BlcnNwZWN0aXZlRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3Byb2plY3Rpb25UeXBlID0gQ2FtZXJhLlBJTkhPTEVfUFJPSkVDVElPTjtcbiAgICB0aGlzLl9mb2NhbERlcHRoID0gZGVwdGg7XG4gICAgdGhpcy5fbmVhciA9IDA7XG4gICAgdGhpcy5fZmFyID0gMDtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHZXRzIG9iamVjdCBjb250YWluaW5nIHNlcmlhbGl6ZWQgZGF0YSBmb3IgdGhlIGNvbXBvbmVudFxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbmVhciBkaXN0YW5jZSBmcm9tIHRoZSBuZWFyIGNsaXBwaW5nIHBsYW5lIHRvIHRoZSBjYW1lcmFcbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgZGlzdGFuY2UgZnJvbSB0aGUgZmFyIGNsaXBwaW5nIHBsYW5lIHRvIHRoZSBjYW1lcmFcbiAqIFxuICogQHJldHVybiB7Q2FtZXJhfSB0aGlzXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUuc2V0RnJ1c3R1bSA9IGZ1bmN0aW9uIHNldEZydXN0dW0obmVhciwgZmFyKSB7XG4gICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB7XG4gICAgICAgIHRoaXMuX25vZGUucmVxdWVzdFVwZGF0ZSh0aGlzLl9pZCk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuX3BlcnNwZWN0aXZlRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3Byb2plY3Rpb25UeXBlID0gQ2FtZXJhLkZSVVNUVU1fUFJPSkVDVElPTjtcbiAgICB0aGlzLl9mb2NhbERlcHRoID0gMDtcbiAgICB0aGlzLl9uZWFyID0gbmVhcjtcbiAgICB0aGlzLl9mYXIgPSBmYXI7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBDYW1lcmEgdG8gaGF2ZSBvcnRob2dyYXBoaWMgcHJvamVjdGlvblxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtDYW1lcmF9IHRoaXNcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS5zZXRGbGF0ID0gZnVuY3Rpb24gc2V0RmxhdCgpIHtcbiAgICBpZiAoIXRoaXMuX3JlcXVlc3RpbmdVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5fbm9kZS5yZXF1ZXN0VXBkYXRlKHRoaXMuX2lkKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5fcGVyc3BlY3RpdmVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fcHJvamVjdGlvblR5cGUgPSBDYW1lcmEuT1JUSE9HUkFQSElDX1BST0pFQ1RJT047XG4gICAgdGhpcy5fZm9jYWxEZXB0aCA9IDA7XG4gICAgdGhpcy5fbmVhciA9IDA7XG4gICAgdGhpcy5fZmFyID0gMDtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXaGVuIHRoZSBub2RlIHRoaXMgY29tcG9uZW50IGlzIGF0dGFjaGVkIHRvIHVwZGF0ZXMsIHRoZSBDYW1lcmEgd2lsbFxuICogc2VuZCBuZXcgY2FtZXJhIGluZm9ybWF0aW9uIHRvIHRoZSBDb21wb3NpdG9yIHRvIHVwZGF0ZSB0aGUgcmVuZGVyaW5nXG4gKiBvZiB0aGUgc2NlbmUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUub25VcGRhdGUgPSBmdW5jdGlvbiBvblVwZGF0ZSgpIHtcbiAgICB0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlID0gZmFsc2U7XG5cbiAgICB2YXIgcGF0aCA9IHRoaXMuX25vZGUuZ2V0TG9jYXRpb24oKTtcblxuICAgIHRoaXMuX25vZGVcbiAgICAgICAgLnNlbmREcmF3Q29tbWFuZCgnV0lUSCcpXG4gICAgICAgIC5zZW5kRHJhd0NvbW1hbmQocGF0aCk7XG5cbiAgICBpZiAodGhpcy5fcGVyc3BlY3RpdmVEaXJ0eSkge1xuICAgICAgICB0aGlzLl9wZXJzcGVjdGl2ZURpcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLl9wcm9qZWN0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDYW1lcmEuRlJVU1RVTV9QUk9KRUNUSU9OOlxuICAgICAgICAgICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKCdGUlVTVFVNX1BST0pFQ1RJT04nKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl9uZWFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl9mYXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDYW1lcmEuUElOSE9MRV9QUk9KRUNUSU9OOlxuICAgICAgICAgICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKCdQSU5IT0xFX1BST0pFQ1RJT04nKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl9mb2NhbERlcHRoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2FtZXJhLk9SVEhPR1JBUEhJQ19QUk9KRUNUSU9OOlxuICAgICAgICAgICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKCdPUlRIT0dSQVBISUNfUFJPSkVDVElPTicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3ZpZXdEaXJ0eSkge1xuICAgICAgICB0aGlzLl92aWV3RGlydHkgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCgnQ0hBTkdFX1ZJRVdfVFJBTlNGT1JNJyk7XG4gICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKHRoaXMuX3ZpZXdUcmFuc2Zvcm1bMF0pO1xuICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl92aWV3VHJhbnNmb3JtWzFdKTtcbiAgICAgICAgdGhpcy5fbm9kZS5zZW5kRHJhd0NvbW1hbmQodGhpcy5fdmlld1RyYW5zZm9ybVsyXSk7XG4gICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKHRoaXMuX3ZpZXdUcmFuc2Zvcm1bM10pO1xuXG4gICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKHRoaXMuX3ZpZXdUcmFuc2Zvcm1bNF0pO1xuICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl92aWV3VHJhbnNmb3JtWzVdKTtcbiAgICAgICAgdGhpcy5fbm9kZS5zZW5kRHJhd0NvbW1hbmQodGhpcy5fdmlld1RyYW5zZm9ybVs2XSk7XG4gICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKHRoaXMuX3ZpZXdUcmFuc2Zvcm1bN10pO1xuXG4gICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKHRoaXMuX3ZpZXdUcmFuc2Zvcm1bOF0pO1xuICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl92aWV3VHJhbnNmb3JtWzldKTtcbiAgICAgICAgdGhpcy5fbm9kZS5zZW5kRHJhd0NvbW1hbmQodGhpcy5fdmlld1RyYW5zZm9ybVsxMF0pO1xuICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl92aWV3VHJhbnNmb3JtWzExXSk7XG5cbiAgICAgICAgdGhpcy5fbm9kZS5zZW5kRHJhd0NvbW1hbmQodGhpcy5fdmlld1RyYW5zZm9ybVsxMl0pO1xuICAgICAgICB0aGlzLl9ub2RlLnNlbmREcmF3Q29tbWFuZCh0aGlzLl92aWV3VHJhbnNmb3JtWzEzXSk7XG4gICAgICAgIHRoaXMuX25vZGUuc2VuZERyYXdDb21tYW5kKHRoaXMuX3ZpZXdUcmFuc2Zvcm1bMTRdKTtcbiAgICAgICAgdGhpcy5fbm9kZS5zZW5kRHJhd0NvbW1hbmQodGhpcy5fdmlld1RyYW5zZm9ybVsxNV0pO1xuICAgIH1cbn07XG5cbi8qKlxuICogV2hlbiB0aGUgdHJhbnNmb3JtIG9mIHRoZSBub2RlIHRoaXMgY29tcG9uZW50IGlzIGF0dGFjaGVkIHRvXG4gKiBjaGFuZ2VzLCBoYXZlIHRoZSBDYW1lcmEgdXBkYXRlIGl0cyBwcm9qZWN0aW9uIG1hdHJpeCBhbmRcbiAqIGlmIG5lZWRlZCwgZmxhZyB0byBub2RlIHRvIHVwZGF0ZS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdHJhbnNmb3JtIGFuIGFycmF5IGRlbm90aW5nIHRoZSB0cmFuc2Zvcm0gbWF0cml4IG9mIHRoZSBub2RlXG4gKlxuICogQHJldHVybiB7Q2FtZXJhfSB0aGlzXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUub25UcmFuc2Zvcm1DaGFuZ2UgPSBmdW5jdGlvbiBvblRyYW5zZm9ybUNoYW5nZSh0cmFuc2Zvcm0pIHtcbiAgICB2YXIgYSA9IHRyYW5zZm9ybTtcbiAgICB0aGlzLl92aWV3RGlydHkgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB7XG4gICAgICAgIHRoaXMuX25vZGUucmVxdWVzdFVwZGF0ZSh0aGlzLl9pZCk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cbiAgICBkZXQgPSAxLyhiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDYpO1xuXG4gICAgdGhpcy5fdmlld1RyYW5zZm9ybVswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIHRoaXMuX3ZpZXdUcmFuc2Zvcm1bMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICB0aGlzLl92aWV3VHJhbnNmb3JtWzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgdGhpcy5fdmlld1RyYW5zZm9ybVszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICAgIHRoaXMuX3ZpZXdUcmFuc2Zvcm1bNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICB0aGlzLl92aWV3VHJhbnNmb3JtWzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgdGhpcy5fdmlld1RyYW5zZm9ybVs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIHRoaXMuX3ZpZXdUcmFuc2Zvcm1bN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICB0aGlzLl92aWV3VHJhbnNmb3JtWzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgdGhpcy5fdmlld1RyYW5zZm9ybVs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICAgIHRoaXMuX3ZpZXdUcmFuc2Zvcm1bMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgdGhpcy5fdmlld1RyYW5zZm9ybVsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgICB0aGlzLl92aWV3VHJhbnNmb3JtWzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICAgIHRoaXMuX3ZpZXdUcmFuc2Zvcm1bMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgdGhpcy5fdmlld1RyYW5zZm9ybVsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgICB0aGlzLl92aWV3VHJhbnNmb3JtWzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW1lcmE7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hhbm5lbHMgYXJlIGJlaW5nIHVzZWQgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIFVJIFRocmVhZCB3aGVuIHJ1bm5pbmcgaW5cbiAqIGEgV2ViIFdvcmtlciBvciB3aXRoIHRoZSBVSU1hbmFnZXIvIENvbXBvc2l0b3Igd2hlbiBydW5uaW5nIGluIHNpbmdsZVxuICogdGhyZWFkZWQgbW9kZSAobm8gV2ViIFdvcmtlcikuXG4gKlxuICogQGNsYXNzIENoYW5uZWxcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDaGFubmVsKCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi53aW5kb3cgIT09IHNlbGYpIHtcbiAgICAgICAgdGhpcy5fZW50ZXJXb3JrZXJNb2RlKCk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQ2FsbGVkIGR1cmluZyBjb25zdHJ1Y3Rpb24uIFN1YnNjcmliZXMgZm9yIGBtZXNzYWdlYCBldmVudCBhbmQgcm91dGVzIGFsbFxuICogZnV0dXJlIGBzZW5kTWVzc2FnZWAgbWVzc2FnZXMgdG8gdGhlIE1haW4gVGhyZWFkIChcIlVJIFRocmVhZFwiKS5cbiAqXG4gKiBQcmltYXJpbHkgdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuQ2hhbm5lbC5wcm90b3R5cGUuX2VudGVyV29ya2VyTW9kZSA9IGZ1bmN0aW9uIF9lbnRlcldvcmtlck1vZGUoKSB7XG4gICAgdGhpcy5fd29ya2VyTW9kZSA9IHRydWU7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiBvbm1lc3NhZ2UoZXYpIHtcbiAgICAgICAgX3RoaXMub25NZXNzYWdlKGV2LmRhdGEpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBNZWFudCB0byBiZSBvdmVycmlkZW4gYnkgYEZhbW91c2AuXG4gKiBBc3NpZ25lZCBtZXRob2Qgd2lsbCBiZSBpbnZva2VkIGZvciBldmVyeSByZWNlaXZlZCBtZXNzYWdlLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBvdmVycmlkZVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNoYW5uZWwucHJvdG90eXBlLm9uTWVzc2FnZSA9IG51bGw7XG5cbi8qKlxuICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBVSU1hbmFnZXIuXG4gKlxuICogQHBhcmFtICB7QW55fSAgICBtZXNzYWdlIEFyYml0cmFyeSBtZXNzYWdlIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5DaGFubmVsLnByb3RvdHlwZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uIHNlbmRNZXNzYWdlIChtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuX3dvcmtlck1vZGUpIHtcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMub25tZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbn07XG5cbi8qKlxuICogTWVhbnQgdG8gYmUgb3ZlcnJpZGVuIGJ5IHRoZSBVSU1hbmFnZXIgd2hlbiBydW5uaW5nIGluIHRoZSBVSSBUaHJlYWQuXG4gKiBVc2VkIGZvciBwcmVzZXJ2aW5nIEFQSSBjb21wYXRpYmlsaXR5IHdpdGggV2ViIFdvcmtlcnMuXG4gKiBXaGVuIHJ1bm5pbmcgaW4gV2ViIFdvcmtlciBtb2RlLCB0aGlzIHByb3BlcnR5IHdvbid0IGJlIG11dGF0ZWQuXG4gKlxuICogQXNzaWduZWQgbWV0aG9kIHdpbGwgYmUgaW52b2tlZCBmb3IgZXZlcnkgbWVzc2FnZSBwb3N0ZWQgYnkgYGZhbW91cy1jb3JlYC5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAb3ZlcnJpZGVcbiAqL1xuQ2hhbm5lbC5wcm90b3R5cGUub25tZXNzYWdlID0gbnVsbDtcblxuLyoqXG4gKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIG1hbmFnZXIgb2YgdGhpcyBjaGFubmVsICh0aGUgYEZhbW91c2Agc2luZ2xldG9uKSBieVxuICogaW52b2tpbmcgYG9uTWVzc2FnZWAuXG4gKiBVc2VkIGZvciBwcmVzZXJ2aW5nIEFQSSBjb21wYXRpYmlsaXR5IHdpdGggV2ViIFdvcmtlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBhbGlhcyBvbk1lc3NhZ2VcbiAqXG4gKiBAcGFyYW0ge0FueX0gbWVzc2FnZSBhIG1lc3NhZ2UgdG8gc2VuZCBvdmVyIHRoZSBjaGFubmVsXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuQ2hhbm5lbC5wcm90b3R5cGUucG9zdE1lc3NhZ2UgPSBmdW5jdGlvbiBwb3N0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMub25NZXNzYWdlKG1lc3NhZ2UpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGFubmVsO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFcXVpdmFsZW50IG9mIGFuIEVuZ2luZSBpbiB0aGUgV29ya2VyIFRocmVhZC4gVXNlZCB0byBzeW5jaHJvbml6ZSBhbmQgbWFuYWdlXG4gKiB0aW1lIGFjcm9zcyBkaWZmZXJlbnQgVGhyZWFkcy5cbiAqXG4gKiBAY2xhc3MgIENsb2NrXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIENsb2NrICgpIHtcbiAgICB0aGlzLl90aW1lID0gMDtcbiAgICB0aGlzLl9mcmFtZSA9IDA7XG4gICAgdGhpcy5fdGltZXJRdWV1ZSA9IFtdO1xuICAgIHRoaXMuX3VwZGF0aW5nSW5kZXggPSAwO1xuXG4gICAgdGhpcy5fc2NhbGUgPSAxO1xuICAgIHRoaXMuX3NjYWxlZFRpbWUgPSB0aGlzLl90aW1lO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHNjYWxlIGF0IHdoaWNoIHRoZSBjbG9jayB0aW1lIGlzIHBhc3NpbmcuXG4gKiBVc2VmdWwgZm9yIHNsb3ctbW90aW9uIG9yIGZhc3QtZm9yd2FyZCBlZmZlY3RzLlxuICogXG4gKiBgMWAgbWVhbnMgbm8gdGltZSBzY2FsaW5nIChcInJlYWx0aW1lXCIpLFxuICogYDJgIG1lYW5zIHRoZSBjbG9jayB0aW1lIGlzIHBhc3NpbmcgdHdpY2UgYXMgZmFzdCxcbiAqIGAwLjVgIG1lYW5zIHRoZSBjbG9jayB0aW1lIGlzIHBhc3NpbmcgdHdvIHRpbWVzIHNsb3dlciB0aGFuIHRoZSBcImFjdHVhbFwiXG4gKiB0aW1lIGF0IHdoaWNoIHRoZSBDbG9jayBpcyBiZWluZyB1cGRhdGVkIHZpYSBgLnN0ZXBgLlxuICpcbiAqIEluaXRhbGx5IHRoZSBjbG9jayB0aW1lIGlzIG5vdCBiZWluZyBzY2FsZWQgKGZhY3RvciBgMWApLlxuICogXG4gKiBAbWV0aG9kICBzZXRTY2FsZVxuICogQGNoYWluYWJsZVxuICogXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgICAgVGhlIHNjYWxlIGF0IHdoaWNoIHRoZSBjbG9jayB0aW1lIGlzIHBhc3NpbmcuXG4gKlxuICogQHJldHVybiB7Q2xvY2t9IHRoaXNcbiAqL1xuQ2xvY2sucHJvdG90eXBlLnNldFNjYWxlID0gZnVuY3Rpb24gc2V0U2NhbGUgKHNjYWxlKSB7XG4gICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQG1ldGhvZCAgZ2V0U2NhbGVcbiAqIFxuICogQHJldHVybiB7TnVtYmVyfSBzY2FsZSAgICBUaGUgc2NhbGUgYXQgd2hpY2ggdGhlIGNsb2NrIHRpbWUgaXMgcGFzc2luZy5cbiAqL1xuQ2xvY2sucHJvdG90eXBlLmdldFNjYWxlID0gZnVuY3Rpb24gZ2V0U2NhbGUgKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgaW50ZXJuYWwgY2xvY2sgdGltZS5cbiAqXG4gKiBAbWV0aG9kICBzdGVwXG4gKiBAY2hhaW5hYmxlXG4gKiBcbiAqIEBwYXJhbSAge051bWJlcn0gdGltZSBoaWdoIHJlc29sdXRpb24gdGltc3RhbXAgdXNlZCBmb3IgaW52b2tpbmcgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgYHVwZGF0ZWAgbWV0aG9kIG9uIGFsbCByZWdpc3RlcmVkIG9iamVjdHNcbiAqIEByZXR1cm4ge0Nsb2NrfSAgICAgICB0aGlzXG4gKi9cbkNsb2NrLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gc3RlcCAodGltZSkge1xuICAgIHRoaXMuX2ZyYW1lKys7XG5cbiAgICB0aGlzLl9zY2FsZWRUaW1lID0gdGhpcy5fc2NhbGVkVGltZSArICh0aW1lIC0gdGhpcy5fdGltZSkqdGhpcy5fc2NhbGU7XG4gICAgdGhpcy5fdGltZSA9IHRpbWU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RpbWVyUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyUXVldWVbaV0odGhpcy5fc2NhbGVkVGltZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyUXVldWUuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnRlcm5hbCBjbG9jayB0aW1lLlxuICpcbiAqIEBtZXRob2QgIG5vd1xuICogXG4gKiBAcmV0dXJuICB7TnVtYmVyfSB0aW1lIGhpZ2ggcmVzb2x1dGlvbiB0aW1zdGFtcCB1c2VkIGZvciBpbnZva2luZyB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICBgdXBkYXRlYCBtZXRob2Qgb24gYWxsIHJlZ2lzdGVyZWQgb2JqZWN0c1xuICovXG5DbG9jay5wcm90b3R5cGUubm93ID0gZnVuY3Rpb24gbm93ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGVkVGltZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW50ZXJuYWwgY2xvY2sgdGltZS5cbiAqXG4gKiBAbWV0aG9kICBnZXRUaW1lXG4gKiBAZGVwcmVjYXRlZCBVc2UgI25vdyBpbnN0ZWFkXG4gKiBcbiAqIEByZXR1cm4gIHtOdW1iZXJ9IHRpbWUgaGlnaCByZXNvbHV0aW9uIHRpbXN0YW1wIHVzZWQgZm9yIGludm9raW5nIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgIGB1cGRhdGVgIG1ldGhvZCBvbiBhbGwgcmVnaXN0ZXJlZCBvYmplY3RzXG4gKi9cbkNsb2NrLnByb3RvdHlwZS5nZXRUaW1lID0gQ2xvY2sucHJvdG90eXBlLm5vdztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZnJhbWVzIGVsYXBzZWQgc28gZmFyLlxuICpcbiAqIEBtZXRob2QgZ2V0RnJhbWVcbiAqIFxuICogQHJldHVybiB7TnVtYmVyfSBmcmFtZXNcbiAqL1xuQ2xvY2sucHJvdG90eXBlLmdldEZyYW1lID0gZnVuY3Rpb24gZ2V0RnJhbWUgKCkge1xuICAgIHJldHVybiB0aGlzLl9mcmFtZTtcbn07XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIGEgY2VydGFpbiBhbW91bnQgb2YgdGltZS5cbiAqIEFmdGVyIGEgc2V0IGR1cmF0aW9uIGhhcyBwYXNzZWQsIGl0IGV4ZWN1dGVzIHRoZSBmdW5jdGlvbiBhbmRcbiAqIHJlbW92ZXMgaXQgYXMgYSBsaXN0ZW5lciB0byAncHJlcmVuZGVyJy5cbiAqXG4gKiBAbWV0aG9kIHNldFRpbWVvdXRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBydW4gYWZ0ZXIgYSBzcGVjaWZpZWQgZHVyYXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBtaWxsaXNlY29uZHMgZnJvbSBub3cgdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGltZXIgZnVuY3Rpb24gdXNlZCBmb3IgQ2xvY2sjY2xlYXJUaW1lclxuICovXG5DbG9jay5wcm90b3R5cGUuc2V0VGltZW91dCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZGVsYXkpIHtcbiAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgc3RhcnRlZEF0ID0gdGhpcy5fdGltZTtcbiAgICB2YXIgdGltZXIgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgIGlmICh0aW1lIC0gc3RhcnRlZEF0ID49IGRlbGF5KSB7XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBwYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgdGhpcy5fdGltZXJRdWV1ZS5wdXNoKHRpbWVyKTtcbiAgICByZXR1cm4gdGltZXI7XG59O1xuXG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIGEgY2VydGFpbiBhbW91bnQgb2YgdGltZS5cbiAqICBBZnRlciBhIHNldCBkdXJhdGlvbiBoYXMgcGFzc2VkLCBpdCBleGVjdXRlcyB0aGUgZnVuY3Rpb24gYW5kXG4gKiAgcmVzZXRzIHRoZSBleGVjdXRpb24gdGltZS5cbiAqXG4gKiBAbWV0aG9kIHNldEludGVydmFsXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgcnVuIGFmdGVyIGEgc3BlY2lmaWVkIGR1cmF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgaW50ZXJ2YWwgdG8gZXhlY3V0ZSBmdW5jdGlvbiBpbiBtaWxsaXNlY29uZHNcbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGltZXIgZnVuY3Rpb24gdXNlZCBmb3IgQ2xvY2sjY2xlYXJUaW1lclxuICovXG5DbG9jay5wcm90b3R5cGUuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbiBzZXRJbnRlcnZhbChjYWxsYmFjaywgZGVsYXkpIHtcbiAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgc3RhcnRlZEF0ID0gdGhpcy5fdGltZTtcbiAgICB2YXIgdGltZXIgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgIGlmICh0aW1lIC0gc3RhcnRlZEF0ID49IGRlbGF5KSB7XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBwYXJhbXMpO1xuICAgICAgICAgICAgc3RhcnRlZEF0ID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICB0aGlzLl90aW1lclF1ZXVlLnB1c2godGltZXIpO1xuICAgIHJldHVybiB0aW1lcjtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBwcmV2aW91c2x5IHZpYSBgQ2xvY2sjc2V0VGltZW91dGAgb3IgYENsb2NrI3NldEludGVydmFsYFxuICogcmVnaXN0ZXJlZCBjYWxsYmFjayBmdW5jdGlvblxuICpcbiAqIEBtZXRob2QgY2xlYXJUaW1lclxuICogQGNoYWluYWJsZVxuICogXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGltZXIgIHByZXZpb3VzbHkgYnkgYENsb2NrI3NldFRpbWVvdXRgIG9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBDbG9jayNzZXRJbnRlcnZhbGAgcmV0dXJuZWQgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm4ge0Nsb2NrfSAgICAgICAgICAgICAgdGhpc1xuICovXG5DbG9jay5wcm90b3R5cGUuY2xlYXJUaW1lciA9IGZ1bmN0aW9uICh0aW1lcikge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX3RpbWVyUXVldWUuaW5kZXhPZih0aW1lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLl90aW1lclF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbG9jaztcblxuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLypqc2hpbnQgLVcwNzkgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUT0RPOiBEaXNwYXRjaCBzaG91bGQgYmUgZ2VuZXJhbGl6ZWQgc28gdGhhdCBpdCBjYW4gd29yayBvbiBhbnkgTm9kZVxuLy8gbm90IGp1c3QgQ29udGV4dHMuXG5cbnZhciBFdmVudCA9IHJlcXVpcmUoJy4vRXZlbnQnKTtcblxuLyoqXG4gKiBUaGUgRGlzcGF0Y2ggY2xhc3MgaXMgdXNlZCB0byBwcm9wb2dhdGUgZXZlbnRzIGRvd24gdGhlXG4gKiBzY2VuZSBncmFwaC5cbiAqXG4gKiBAY2xhc3MgRGlzcGF0Y2hcbiAqIEBwYXJhbSB7U2NlbmV9IGNvbnRleHQgVGhlIGNvbnRleHQgb24gd2hpY2ggaXQgb3BlcmF0ZXNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEaXNwYXRjaCAoY29udGV4dCkge1xuXG4gICAgaWYgKCFjb250ZXh0KSB0aHJvdyBuZXcgRXJyb3IoJ0Rpc3BhdGNoIG5lZWRzIHRvIGJlIGluc3RhbnRpYXRlZCBvbiBhIG5vZGUnKTtcblxuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0OyAvLyBBIHJlZmVyZW5jZSB0byB0aGUgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiB3aGljaCB0aGUgZGlzcGF0Y2hlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYXRlc1xuXG4gICAgdGhpcy5fcXVldWUgPSBbXTsgLy8gVGhlIHF1ZXVlIGlzIHVzZWQgZm9yIHR3byBwdXJwb3Nlc1xuICAgICAgICAgICAgICAgICAgICAgIC8vIDEuIEl0IGlzIHVzZWQgdG8gbGlzdCBpbmRpY2llcyBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgICBOb2RlcyBwYXRoIHdoaWNoIGFyZSB0aGVuIHVzZWQgdG8gbG9va3VwXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICAgYSBub2RlIGluIHRoZSBzY2VuZSBncmFwaC5cbiAgICAgICAgICAgICAgICAgICAgICAvLyAyLiBJdCBpcyB1c2VkIHRvIGFzc2lzdCBkaXNwYXRjaGluZ1xuICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHN1Y2ggdGhhdCBpdCBpcyBwb3NzaWJsZSB0byBkbyBhIGJyZWFkdGggZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0cmF2ZXJzYWwgb2YgdGhlIHNjZW5lIGdyYXBoLlxufVxuXG4vKipcbiAqIGxvb2t1cE5vZGUgdGFrZXMgYSBwYXRoIGFuZCByZXR1cm5zIHRoZSBub2RlIGF0IHRoZSBsb2NhdGlvbiBzcGVjaWZpZWRcbiAqIGJ5IHRoZSBwYXRoLCBpZiBvbmUgZXhpc3RzLiBJZiBub3QsIGl0IHJldHVybnMgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBsb2NhdGlvbiBUaGUgbG9jYXRpb24gb2YgdGhlIG5vZGUgc3BlY2lmaWVkIGJ5IGl0cyBwYXRoXG4gKlxuICogQHJldHVybiB7Tm9kZSB8IHVuZGVmaW5lZH0gVGhlIG5vZGUgYXQgdGhlIHJlcXVlc3RlZCBwYXRoXG4gKi9cbkRpc3BhdGNoLnByb3RvdHlwZS5sb29rdXBOb2RlID0gZnVuY3Rpb24gbG9va3VwTm9kZSAobG9jYXRpb24pIHtcbiAgICBpZiAoIWxvY2F0aW9uKSB0aHJvdyBuZXcgRXJyb3IoJ2xvb2t1cE5vZGUgbXVzdCBiZSBjYWxsZWQgd2l0aCBhIHBhdGgnKTtcblxuICAgIHZhciBwYXRoID0gdGhpcy5fcXVldWU7XG5cbiAgICBfc3BsaXRUbyhsb2NhdGlvbiwgcGF0aCk7XG5cbiAgICBpZiAocGF0aFswXSAhPT0gdGhpcy5fY29udGV4dC5nZXRTZWxlY3RvcigpKSByZXR1cm4gdm9pZCAwO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY29udGV4dC5nZXRDaGlsZHJlbigpO1xuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgaSA9IDE7XG4gICAgcGF0aFswXSA9IHRoaXMuX2NvbnRleHQ7XG5cbiAgICB3aGlsZSAoaSA8IHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGRyZW5bcGF0aFtpXV07XG4gICAgICAgIHBhdGhbaV0gPSBjaGlsZDtcbiAgICAgICAgaWYgKGNoaWxkKSBjaGlsZHJlbiA9IGNoaWxkLmdldENoaWxkcmVuKCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiBjaGlsZDtcbn07XG5cbi8qKlxuICogZGlzcGF0Y2ggdGFrZXMgYW4gZXZlbnQgbmFtZSBhbmQgYSBwYXlsb2FkIGFuZCBkaXNwYXRjaGVzIGl0IHRvIHRoZVxuICogZW50aXJlIHNjZW5lIGdyYXBoIGJlbG93IHRoZSBub2RlIHRoYXQgdGhlIGRpc3BhdGNoZXIgaXMgb24uIFRoZSBub2Rlc1xuICogcmVjZWl2ZSB0aGUgZXZlbnRzIGluIGEgYnJlYWR0aCBmaXJzdCB0cmF2ZXJzYWwsIG1lYW5pbmcgdGhhdCBwYXJlbnRzXG4gKiBoYXZlIHRoZSBvcHBvcnR1bml0eSB0byByZWFjdCB0byB0aGUgZXZlbnQgYmVmb3JlIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHtBbnl9IHBheWxvYWQgdGhlIGV2ZW50IHBheWxvYWRcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5EaXNwYXRjaC5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCAoZXZlbnQsIHBheWxvYWQpIHtcbiAgICBpZiAoIWV2ZW50KSB0aHJvdyBuZXcgRXJyb3IoJ2Rpc3BhdGNoIHJlcXVpcmVzIGFuIGV2ZW50IG5hbWUgYXMgaXRcXCdzIGZpcnN0IGFyZ3VtZW50Jyk7XG5cbiAgICB2YXIgcXVldWUgPSB0aGlzLl9xdWV1ZTtcbiAgICB2YXIgaXRlbTtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuO1xuICAgIHZhciBjaGlsZHJlbjtcblxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgcXVldWUucHVzaCh0aGlzLl9jb250ZXh0KTtcblxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgaXRlbSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGlmIChpdGVtLm9uUmVjZWl2ZSkgaXRlbS5vblJlY2VpdmUoZXZlbnQsIHBheWxvYWQpO1xuICAgICAgICBjaGlsZHJlbiA9IGl0ZW0uZ2V0Q2hpbGRyZW4oKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoIDsgaSA8IGxlbiA7IGkrKykgcXVldWUucHVzaChjaGlsZHJlbltpXSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBkaXNwYXRjaFVJZXZlbnQgdGFrZXMgYSBwYXRoLCBhbiBldmVudCBuYW1lLCBhbmQgYSBwYXlsb2FkIGFuZCBkaXNwYXRjaGVzIHRoZW0gaW5cbiAqIGEgbWFubmVyIGFub2xvZ291cyB0byBET00gYnViYmxpbmcuIEl0IGZpcnN0IHRyYXZlcnNlcyBkb3duIHRvIHRoZSBub2RlIHNwZWNpZmllZCBhdFxuICogdGhlIHBhdGguIFRoYXQgbm9kZSByZWNlaXZlcyB0aGUgZXZlbnQgZmlyc3QsIGFuZCB0aGVuIGV2ZXJ5IGFuY2VzdG9yIHJlY2VpdmVzIHRoZSBldmVudFxuICogdW50aWwgdGhlIGNvbnRleHQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIHBhdGggb2YgdGhlIG5vZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCB0aGUgZXZlbnQgbmFtZVxuICogQHBhcmFtIHtBbnl9IHBheWxvYWQgdGhlIHBheWxvYWRcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5EaXNwYXRjaC5wcm90b3R5cGUuZGlzcGF0Y2hVSUV2ZW50ID0gZnVuY3Rpb24gZGlzcGF0Y2hVSUV2ZW50IChwYXRoLCBldmVudCwgcGF5bG9hZCkge1xuICAgIGlmICghcGF0aCkgdGhyb3cgbmV3IEVycm9yKCdkaXNwYXRjaFVJRXZlbnQgbmVlZHMgYSB2YWxpZCBwYXRoIHRvIGRpc3BhdGNoIHRvJyk7XG4gICAgaWYgKCFldmVudCkgdGhyb3cgbmV3IEVycm9yKCdkaXNwYXRjaFVJRXZlbnQgbmVlZHMgYW4gZXZlbnQgbmFtZSBhcyBpdHMgc2Vjb25kIGFyZ3VtZW50Jyk7XG5cbiAgICB2YXIgcXVldWUgPSB0aGlzLl9xdWV1ZTtcbiAgICB2YXIgbm9kZTtcblxuICAgIEV2ZW50LmNhbGwocGF5bG9hZCk7XG4gICAgcGF5bG9hZC5ub2RlID0gdGhpcy5sb29rdXBOb2RlKHBhdGgpOyAvLyBBZnRlciB0aGlzIGNhbGwsIHRoZSBwYXRoIGlzIGxvYWRlZCBpbnRvIHRoZSBxdWV1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKGxvb2tVcCBub2RlIGRvZXNuJ3QgY2xlYXIgdGhlIHF1ZXVlIGFmdGVyIHRoZSBsb29rdXApXG5cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIG5vZGUgPSBxdWV1ZS5wb3AoKTsgLy8gcG9wIG5vZGVzIG9mZiBvZiB0aGUgcXVldWUgdG8gbW92ZSB1cCB0aGUgYW5jZXN0b3IgY2hhaW4uXG4gICAgICAgIGlmIChub2RlLm9uUmVjZWl2ZSkgbm9kZS5vblJlY2VpdmUoZXZlbnQsIHBheWxvYWQpO1xuICAgICAgICBpZiAocGF5bG9hZC5wcm9wYWdhdGlvblN0b3BwZWQpIGJyZWFrO1xuICAgIH1cbn07XG5cbi8qKlxuICogX3NwbGl0VG8gaXMgYSBwcml2YXRlIG1ldGhvZCB3aGljaCB0YWtlcyBhIHBhdGggYW5kIHNwbGl0cyBpdCBhdCBldmVyeSAnLydcbiAqIHB1c2hpbmcgdGhlIHJlc3VsdCBpbnRvIHRoZSBzdXBwbGllZCBhcnJheS4gVGhpcyBpcyBhIGRlc3RydWN0aXZlIGNoYW5nZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyB0aGUgc3BlY2lmaWVkIHBhdGhcbiAqIEBwYXJhbSB7QXJyYXl9IHRhcmdldCB0aGUgYXJyYXkgdG8gd2hpY2ggdGhlIHJlc3VsdCBzaG91bGQgYmUgd3JpdHRlblxuICpcbiAqIEByZXR1cm4ge0FycmF5fSB0aGUgdGFyZ2V0IGFmdGVyIGhhdmluZyBiZWVuIHdyaXR0ZW4gdG9cbiAqL1xuZnVuY3Rpb24gX3NwbGl0VG8gKHN0cmluZywgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lmxlbmd0aCA9IDA7IC8vIGNsZWFycyB0aGUgYXJyYXkgZmlyc3QuXG4gICAgdmFyIGxhc3QgPSAwO1xuICAgIHZhciBpO1xuICAgIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMCA7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgaWYgKHN0cmluZ1tpXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzdHJpbmcuc3Vic3RyaW5nKGxhc3QsIGkpKTtcbiAgICAgICAgICAgIGxhc3QgPSBpICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpIC0gbGFzdCA+IDApIHRhcmdldC5wdXNoKHN0cmluZy5zdWJzdHJpbmcobGFzdCwgaSkpO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaDtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlIEV2ZW50IGNsYXNzIGFkZHMgdGhlIHN0b3BQcm9wYWdhdGlvbiBmdW5jdGlvbmFsaXR5XG4gKiB0byB0aGUgVUlFdmVudHMgd2l0aGluIHRoZSBzY2VuZSBncmFwaC5cbiAqXG4gKiBAY29uc3RydWN0b3IgRXZlbnRcbiAqL1xuZnVuY3Rpb24gRXZlbnQgKCkge1xuICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdG9wUHJvcGFnYXRpb24gPSBzdG9wUHJvcGFnYXRpb247XG59XG5cbi8qKlxuICogc3RvcFByb3BhZ2F0aW9uIGVuZHMgdGhlIGJ1YmJsaW5nIG9mIHRoZSBldmVudCBpbiB0aGVcbiAqIHNjZW5lIGdyYXBoLlxuICpcbiAqIEBtZXRob2Qgc3RvcFByb3BhZ2F0aW9uXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uICgpIHtcbiAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQ7XG5cbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDbG9jayA9IHJlcXVpcmUoJy4vQ2xvY2snKTtcbnZhciBTY2VuZSA9IHJlcXVpcmUoJy4vU2NlbmUnKTtcbnZhciBDaGFubmVsID0gcmVxdWlyZSgnLi9DaGFubmVsJyk7XG52YXIgVUlNYW5hZ2VyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXJzL1VJTWFuYWdlcicpO1xudmFyIENvbXBvc2l0b3IgPSByZXF1aXJlKCcuLi9yZW5kZXJlcnMvQ29tcG9zaXRvcicpO1xudmFyIFJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AgPSByZXF1aXJlKCcuLi9yZW5kZXItbG9vcHMvUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcCcpO1xuXG52YXIgRU5HSU5FX1NUQVJUID0gWydFTkdJTkUnLCAnU1RBUlQnXTtcbnZhciBFTkdJTkVfU1RPUCA9IFsnRU5HSU5FJywgJ1NUT1AnXTtcbnZhciBUSU1FX1VQREFURSA9IFsnVElNRScsIG51bGxdO1xuXG4vKipcbiAqIEZhbW91cyBoYXMgdHdvIHJlc3BvbnNpYmlsaXRpZXMsIG9uZSB0byBhY3QgYXMgdGhlIGhpZ2hlc3QgbGV2ZWxcbiAqIHVwZGF0ZXIgYW5kIGFub3RoZXIgdG8gc2VuZCBtZXNzYWdlcyBvdmVyIHRvIHRoZSByZW5kZXJlcnMuIEl0IGlzXG4gKiBhIHNpbmdsZXRvbi5cbiAqXG4gKiBAY2xhc3MgRmFtb3VzRW5naW5lXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRmFtb3VzRW5naW5lKCkge1xuICAgIHRoaXMuX3VwZGF0ZVF1ZXVlID0gW107IC8vIFRoZSB1cGRhdGVRdWV1ZSBpcyBhIHBsYWNlIHdoZXJlIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuIHBsYWNlIHRoZW1zZWx2ZXMgaW4gb3JkZXIgdG8gYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGVkIG9uIHRoZSBmcmFtZS5cblxuICAgIHRoaXMuX25leHRVcGRhdGVRdWV1ZSA9IFtdOyAvLyB0aGUgbmV4dFVwZGF0ZVF1ZXVlIGlzIHVzZWQgdG8gcXVldWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlcyBmb3IgdGhlIG5leHQgdGljay5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBwcmV2ZW50cyBpbmZpbml0ZSBsb29wcyB3aGVyZSBkdXJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW4gdXBkYXRlIGEgbm9kZSBjb250aW51b3VzbHkgcHV0cyBpdHNlbGZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmFjayBpbiB0aGUgdXBkYXRlIHF1ZXVlLlxuXG4gICAgdGhpcy5fc2NlbmVzID0ge307IC8vIGEgaGFzaCBvZiBhbGwgb2YgdGhlIHNjZW5lcydzIHRoYXQgdGhlIEZhbW91c0VuZ2luZVxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIHJlc3BvbnNpYmxlIGZvci5cblxuICAgIHRoaXMuX21lc3NhZ2VzID0gVElNRV9VUERBVEU7ICAgLy8gYSBxdWV1ZSBvZiBhbGwgb2YgdGhlIGRyYXcgY29tbWFuZHMgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgdG8gdGhlIHRoZSByZW5kZXJlcnMgdGhpcyBmcmFtZS5cblxuICAgIHRoaXMuX2luVXBkYXRlID0gZmFsc2U7IC8vIHdoZW4gdGhlIGZhbW91cyBpcyB1cGRhdGluZyB0aGlzIGlzIHRydWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIHJlcXVlc3RzIGZvciB1cGRhdGVzIHdpbGwgZ2V0IHB1dCBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0VXBkYXRlUXVldWVcblxuICAgIHRoaXMuX2Nsb2NrID0gbmV3IENsb2NrKCk7IC8vIGEgY2xvY2sgdG8ga2VlcCB0cmFjayBvZiB0aW1lIGZvciB0aGUgc2NlbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBncmFwaC5cblxuICAgIHRoaXMuX2NoYW5uZWwgPSBuZXcgQ2hhbm5lbCgpO1xuICAgIHRoaXMuX2NoYW5uZWwub25NZXNzYWdlID0gdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQodGhpcyk7XG59XG5cblxuLyoqXG4gKiBBbiBpbml0IHNjcmlwdCB0aGF0IGluaXRpYWxpemVzIHRoZSBGYW1vdXNFbmdpbmUgd2l0aCBvcHRpb25zXG4gKiBvciBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIGEgc2V0IG9mIG9wdGlvbnMgY29udGFpbmluZyBhIGNvbXBvc2l0b3IgYW5kIGEgcmVuZGVyIGxvb3BcbiAqXG4gKiBAcmV0dXJuIHtGYW1vdXNFbmdpbmV9IHRoaXNcbiAqL1xuRmFtb3VzRW5naW5lLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gaW5pdChvcHRpb25zKSB7XG4gICAgdGhpcy5jb21wb3NpdG9yID0gb3B0aW9ucyAmJiBvcHRpb25zLmNvbXBvc2l0b3IgfHwgbmV3IENvbXBvc2l0b3IoKTtcbiAgICB0aGlzLnJlbmRlckxvb3AgPSBvcHRpb25zICYmIG9wdGlvbnMucmVuZGVyTG9vcCB8fCBuZXcgUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcCgpO1xuICAgIHRoaXMudWlNYW5hZ2VyID0gbmV3IFVJTWFuYWdlcih0aGlzLmdldENoYW5uZWwoKSwgdGhpcy5jb21wb3NpdG9yLCB0aGlzLnJlbmRlckxvb3ApO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjaGFubmVsIHRoYXQgdGhlIGVuZ2luZSB3aWxsIHVzZSB0byBjb21tdW5pY2F0ZSB0b1xuICogdGhlIHJlbmRlcmVycy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsICAgICBUaGUgY2hhbm5lbCB0byBiZSB1c2VkIGZvciBjb21tdW5pY2F0aW5nIHdpdGhcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGBVSU1hbmFnZXJgLyBgQ29tcG9zaXRvcmAuXG4gKlxuICogQHJldHVybiB7RmFtb3VzRW5naW5lfSB0aGlzXG4gKi9cbkZhbW91c0VuZ2luZS5wcm90b3R5cGUuc2V0Q2hhbm5lbCA9IGZ1bmN0aW9uIHNldENoYW5uZWwoY2hhbm5lbCkge1xuICAgIHRoaXMuX2NoYW5uZWwgPSBjaGFubmVsO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjaGFubmVsIHRoYXQgdGhlIGVuZ2luZSBpcyBjdXJyZW50bHkgdXNpbmdcbiAqIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIHJlbmRlcmVycy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Q2hhbm5lbH0gY2hhbm5lbCAgICBUaGUgY2hhbm5lbCB0byBiZSB1c2VkIGZvciBjb21tdW5pY2F0aW5nIHdpdGhcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGBVSU1hbmFnZXJgLyBgQ29tcG9zaXRvcmAuXG4gKi9cbkZhbW91c0VuZ2luZS5wcm90b3R5cGUuZ2V0Q2hhbm5lbCA9IGZ1bmN0aW9uIGdldENoYW5uZWwgKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGFubmVsO1xufTtcblxuLyoqXG4gKiBfdXBkYXRlIGlzIHRoZSBib2R5IG9mIHRoZSB1cGRhdGUgbG9vcC4gVGhlIGZyYW1lIGNvbnNpc3RzIG9mXG4gKiBwdWxsaW5nIGluIGFwcGVuZGluZyB0aGUgbmV4dFVwZGF0ZVF1ZXVlIHRvIHRoZSBjdXJyZW50VXBkYXRlIHF1ZXVlXG4gKiB0aGVuIG1vdmluZyB0aHJvdWdoIHRoZSB1cGRhdGVRdWV1ZSBhbmQgY2FsbGluZyBvblVwZGF0ZSB3aXRoIHRoZSBjdXJyZW50XG4gKiB0aW1lIG9uIGFsbCBub2Rlcy4gV2hpbGUgX3VwZGF0ZSBpcyBjYWxsZWQgX2luVXBkYXRlIGlzIHNldCB0byB0cnVlIGFuZFxuICogYWxsIHJlcXVlc3RzIHRvIGJlIHBsYWNlZCBpbiB0aGUgdXBkYXRlIHF1ZXVlIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZVxuICogbmV4dFVwZGF0ZVF1ZXVlLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiBfdXBkYXRlICgpIHtcbiAgICB0aGlzLl9pblVwZGF0ZSA9IHRydWU7XG4gICAgdmFyIHRpbWUgPSB0aGlzLl9jbG9jay5ub3coKTtcbiAgICB2YXIgbmV4dFF1ZXVlID0gdGhpcy5fbmV4dFVwZGF0ZVF1ZXVlO1xuICAgIHZhciBxdWV1ZSA9IHRoaXMuX3VwZGF0ZVF1ZXVlO1xuICAgIHZhciBpdGVtO1xuXG4gICAgdGhpcy5fbWVzc2FnZXNbMV0gPSB0aW1lO1xuXG4gICAgd2hpbGUgKG5leHRRdWV1ZS5sZW5ndGgpIHF1ZXVlLnVuc2hpZnQobmV4dFF1ZXVlLnBvcCgpKTtcblxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgaXRlbSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25VcGRhdGUpIGl0ZW0ub25VcGRhdGUodGltZSk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5VcGRhdGUgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogcmVxdWVzdFVwZGF0ZXMgdGFrZXMgYSBjbGFzcyB0aGF0IGhhcyBhbiBvblVwZGF0ZSBtZXRob2QgYW5kIHB1dHMgaXRcbiAqIGludG8gdGhlIHVwZGF0ZVF1ZXVlIHRvIGJlIHVwZGF0ZWQgYXQgdGhlIG5leHQgZnJhbWUuXG4gKiBJZiBGYW1vdXNFbmdpbmUgaXMgY3VycmVudGx5IGluIGFuIHVwZGF0ZSwgcmVxdWVzdFVwZGF0ZVxuICogcGFzc2VzIGl0cyBhcmd1bWVudCB0byByZXF1ZXN0VXBkYXRlT25OZXh0VGljay5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RlciBhbiBvYmplY3Qgd2l0aCBhbiBvblVwZGF0ZSBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLnJlcXVlc3RVcGRhdGUgPSBmdW5jdGlvbiByZXF1ZXN0VXBkYXRlIChyZXF1ZXN0ZXIpIHtcbiAgICBpZiAoIXJlcXVlc3RlcilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ3JlcXVlc3RVcGRhdGUgbXVzdCBiZSBjYWxsZWQgd2l0aCBhIGNsYXNzIHRvIGJlIHVwZGF0ZWQnXG4gICAgICAgICk7XG5cbiAgICBpZiAodGhpcy5faW5VcGRhdGUpIHRoaXMucmVxdWVzdFVwZGF0ZU9uTmV4dFRpY2socmVxdWVzdGVyKTtcbiAgICBlbHNlIHRoaXMuX3VwZGF0ZVF1ZXVlLnB1c2gocmVxdWVzdGVyKTtcbn07XG5cbi8qKlxuICogcmVxdWVzdFVwZGF0ZU9uTmV4dFRpY2sgaXMgcmVxdWVzdHMgYW4gdXBkYXRlIG9uIHRoZSBuZXh0IGZyYW1lLlxuICogSWYgRmFtb3VzRW5naW5lIGlzIG5vdCBjdXJyZW50bHkgaW4gYW4gdXBkYXRlIHRoYW4gaXQgaXMgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnRcbiAqIHRvIHJlcXVlc3RVcGRhdGUuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSB1c2VkIHRvIHByZXZlbnQgaW5maW5pdGUgbG9vcHMgd2hlcmVcbiAqIGEgY2xhc3MgaXMgdXBkYXRlZCBvbiB0aGUgZnJhbWUgYnV0IG5lZWRzIHRvIGJlIHVwZGF0ZWQgYWdhaW4gbmV4dCBmcmFtZS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RlciBhbiBvYmplY3Qgd2l0aCBhbiBvblVwZGF0ZSBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLnJlcXVlc3RVcGRhdGVPbk5leHRUaWNrID0gZnVuY3Rpb24gcmVxdWVzdFVwZGF0ZU9uTmV4dFRpY2sgKHJlcXVlc3Rlcikge1xuICAgIHRoaXMuX25leHRVcGRhdGVRdWV1ZS5wdXNoKHJlcXVlc3Rlcik7XG59O1xuXG4vKipcbiAqIHBvc3RNZXNzYWdlIHNlbmRzIGEgbWVzc2FnZSBxdWV1ZSBpbnRvIEZhbW91c0VuZ2luZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBUaGVzZSBtZXNzYWdlcyB3aWxsIGJlIGludGVycHJldGVkIGFuZCBzZW50IGludG8gdGhlIHNjZW5lIGdyYXBoXG4gKiBhcyBldmVudHMgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBtZXNzYWdlcyBhbiBhcnJheSBvZiBjb21tYW5kcy5cbiAqXG4gKiBAcmV0dXJuIHtGYW1vdXNFbmdpbmV9IHRoaXNcbiAqL1xuRmFtb3VzRW5naW5lLnByb3RvdHlwZS5oYW5kbGVNZXNzYWdlID0gZnVuY3Rpb24gaGFuZGxlTWVzc2FnZSAobWVzc2FnZXMpIHtcbiAgICBpZiAoIW1lc3NhZ2VzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnb25NZXNzYWdlIG11c3QgYmUgY2FsbGVkIHdpdGggYW4gYXJyYXkgb2YgbWVzc2FnZXMnXG4gICAgICAgICk7XG5cbiAgICB2YXIgY29tbWFuZDtcblxuICAgIHdoaWxlIChtZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbW1hbmQgPSBtZXNzYWdlcy5zaGlmdCgpO1xuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ1dJVEgnOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV2l0aChtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdGUkFNRSc6XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVGcmFtZShtZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmVjZWl2ZWQgdW5rbm93biBjb21tYW5kOiAnICsgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIGhhbmRsZVdpdGggaXMgYSBtZXRob2QgdGhhdCB0YWtlcyBhbiBhcnJheSBvZiBtZXNzYWdlcyBmb2xsb3dpbmcgdGhlXG4gKiBXSVRIIGNvbW1hbmQuIEl0J2xsIHRoZW4gaXNzdWUgdGhlIG5leHQgY29tbWFuZHMgdG8gdGhlIHBhdGggc3BlY2lmaWVkXG4gKiBieSB0aGUgV0lUSCBjb21tYW5kLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBtZXNzYWdlcyBhcnJheSBvZiBtZXNzYWdlcy5cbiAqXG4gKiBAcmV0dXJuIHtGYW1vdXNFbmdpbmV9IHRoaXNcbiAqL1xuRmFtb3VzRW5naW5lLnByb3RvdHlwZS5oYW5kbGVXaXRoID0gZnVuY3Rpb24gaGFuZGxlV2l0aCAobWVzc2FnZXMpIHtcbiAgICB2YXIgcGF0aCA9IG1lc3NhZ2VzLnNoaWZ0KCk7XG4gICAgdmFyIGNvbW1hbmQgPSBtZXNzYWdlcy5zaGlmdCgpO1xuXG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgIGNhc2UgJ1RSSUdHRVInOiAvLyB0aGUgVFJJR0dFUiBjb21tYW5kIHNlbmRzIGEgVUlFdmVudCB0byB0aGUgc3BlY2lmaWVkIHBhdGhcbiAgICAgICAgICAgIHZhciB0eXBlID0gbWVzc2FnZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBldiA9IG1lc3NhZ2VzLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0Q29udGV4dChwYXRoKS5nZXREaXNwYXRjaCgpLmRpc3BhdGNoVUlFdmVudChwYXRoLCB0eXBlLCBldik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmVjZWl2ZWQgdW5rbm93biBjb21tYW5kOiAnICsgY29tbWFuZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBoYW5kbGVGcmFtZSBpcyBjYWxsZWQgd2hlbiB0aGUgcmVuZGVyZXJzIGlzc3VlIGEgRlJBTUUgY29tbWFuZCB0b1xuICogRmFtb3VzRW5naW5lLiBGYW1vdXNFbmdpbmUgd2lsbCB0aGVuIHN0ZXAgdXBkYXRpbmcgdGhlIHNjZW5lIGdyYXBoIHRvIHRoZSBjdXJyZW50IHRpbWUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG1lc3NhZ2VzIGFycmF5IG9mIG1lc3NhZ2VzLlxuICpcbiAqIEByZXR1cm4ge0ZhbW91c0VuZ2luZX0gdGhpc1xuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLmhhbmRsZUZyYW1lID0gZnVuY3Rpb24gaGFuZGxlRnJhbWUgKG1lc3NhZ2VzKSB7XG4gICAgaWYgKCFtZXNzYWdlcykgdGhyb3cgbmV3IEVycm9yKCdoYW5kbGVGcmFtZSBtdXN0IGJlIGNhbGxlZCB3aXRoIGFuIGFycmF5IG9mIG1lc3NhZ2VzJyk7XG4gICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignRlJBTUUgbXVzdCBiZSBzZW50IHdpdGggYSB0aW1lJyk7XG5cbiAgICB0aGlzLnN0ZXAobWVzc2FnZXMuc2hpZnQoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIHN0ZXAgdXBkYXRlcyB0aGUgY2xvY2sgYW5kIHRoZSBzY2VuZSBncmFwaCBhbmQgdGhlbiBzZW5kcyB0aGUgZHJhdyBjb21tYW5kc1xuICogdGhhdCBhY2N1bXVsYXRlZCBpbiB0aGUgdXBkYXRlIHRvIHRoZSByZW5kZXJlcnMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIGN1cnJlbnQgZW5naW5lIHRpbWVcbiAqXG4gKiBAcmV0dXJuIHtGYW1vdXNFbmdpbmV9IHRoaXNcbiAqL1xuRmFtb3VzRW5naW5lLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gc3RlcCAodGltZSkge1xuICAgIGlmICh0aW1lID09IG51bGwpIHRocm93IG5ldyBFcnJvcignc3RlcCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgdGltZScpO1xuXG4gICAgdGhpcy5fY2xvY2suc3RlcCh0aW1lKTtcbiAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLl9tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fY2hhbm5lbC5zZW5kTWVzc2FnZSh0aGlzLl9tZXNzYWdlcyk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VzLmxlbmd0aCA9IDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIHJldHVybnMgdGhlIGNvbnRleHQgb2YgYSBwYXJ0aWN1bGFyIHBhdGguIFRoZSBjb250ZXh0IGlzIGxvb2tlZCB1cCBieSB0aGUgc2VsZWN0b3JcbiAqIHBvcnRpb24gb2YgdGhlIHBhdGggYW5kIGlzIGxpc3RlZCBmcm9tIHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nIHRvIHRoZSBmaXJzdFxuICogJy8nLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgdGhlIHBhdGggdG8gbG9vayB1cCB0aGUgY29udGV4dCBmb3IuXG4gKlxuICogQHJldHVybiB7Q29udGV4dCB8IFVuZGVmaW5lZH0gdGhlIGNvbnRleHQgaWYgZm91bmQsIGVsc2UgdW5kZWZpbmVkLlxuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLmdldENvbnRleHQgPSBmdW5jdGlvbiBnZXRDb250ZXh0IChzZWxlY3Rvcikge1xuICAgIGlmICghc2VsZWN0b3IpIHRocm93IG5ldyBFcnJvcignZ2V0Q29udGV4dCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgc2VsZWN0b3InKTtcblxuICAgIHZhciBpbmRleCA9IHNlbGVjdG9yLmluZGV4T2YoJy8nKTtcbiAgICBzZWxlY3RvciA9IGluZGV4ID09PSAtMSA/IHNlbGVjdG9yIDogc2VsZWN0b3Iuc3Vic3RyaW5nKDAsIGluZGV4KTtcblxuICAgIHJldHVybiB0aGlzLl9zY2VuZXNbc2VsZWN0b3JdO1xufTtcblxuLyoqXG4gKiByZXR1cm5zIHRoZSBpbnN0YW5jZSBvZiBjbG9jayB3aXRoaW4gZmFtb3VzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtDbG9ja30gRmFtb3VzRW5naW5lJ3MgY2xvY2tcbiAqL1xuRmFtb3VzRW5naW5lLnByb3RvdHlwZS5nZXRDbG9jayA9IGZ1bmN0aW9uIGdldENsb2NrICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvY2s7XG59O1xuXG4vKipcbiAqIHF1ZXVlcyBhIG1lc3NhZ2UgdG8gYmUgdHJhbnNmZXJlZCB0byB0aGUgcmVuZGVyZXJzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FueX0gY29tbWFuZCBEcmF3IENvbW1hbmRcbiAqXG4gKiBAcmV0dXJuIHtGYW1vdXNFbmdpbmV9IHRoaXNcbiAqL1xuRmFtb3VzRW5naW5lLnByb3RvdHlwZS5tZXNzYWdlID0gZnVuY3Rpb24gbWVzc2FnZSAoY29tbWFuZCkge1xuICAgIHRoaXMuX21lc3NhZ2VzLnB1c2goY29tbWFuZCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzY2VuZSB1bmRlciB3aGljaCBhIHNjZW5lIGdyYXBoIGNvdWxkIGJlIGJ1aWx0LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgYSBkb20gc2VsZWN0b3IgZm9yIHdoZXJlIHRoZSBzY2VuZSBzaG91bGQgYmUgcGxhY2VkXG4gKlxuICogQHJldHVybiB7U2NlbmV9IGEgbmV3IGluc3RhbmNlIG9mIFNjZW5lLlxuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLmNyZWF0ZVNjZW5lID0gZnVuY3Rpb24gY3JlYXRlU2NlbmUgKHNlbGVjdG9yKSB7XG4gICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnYm9keSc7XG5cbiAgICBpZiAodGhpcy5fc2NlbmVzW3NlbGVjdG9yXSkgdGhpcy5fc2NlbmVzW3NlbGVjdG9yXS5kaXNtb3VudCgpO1xuICAgIHRoaXMuX3NjZW5lc1tzZWxlY3Rvcl0gPSBuZXcgU2NlbmUoc2VsZWN0b3IsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLl9zY2VuZXNbc2VsZWN0b3JdO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdGhlIGVuZ2luZSBydW5uaW5nIGluIHRoZSBNYWluLVRocmVhZC5cbiAqIFRoaXMgZWZmZWN0cyAqKmV2ZXJ5KiogdXBkYXRlYWJsZSBtYW5hZ2VkIGJ5IHRoZSBFbmdpbmUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0ZhbW91c0VuZ2luZX0gdGhpc1xuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLnN0YXJ0RW5naW5lID0gZnVuY3Rpb24gc3RhcnRFbmdpbmUgKCkge1xuICAgIHRoaXMuX2NoYW5uZWwuc2VuZE1lc3NhZ2UoRU5HSU5FX1NUQVJUKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3RvcHMgdGhlIGVuZ2luZSBydW5uaW5nIGluIHRoZSBNYWluLVRocmVhZC5cbiAqIFRoaXMgZWZmZWN0cyAqKmV2ZXJ5KiogdXBkYXRlYWJsZSBtYW5hZ2VkIGJ5IHRoZSBFbmdpbmUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0ZhbW91c0VuZ2luZX0gdGhpc1xuICovXG5GYW1vdXNFbmdpbmUucHJvdG90eXBlLnN0b3BFbmdpbmUgPSBmdW5jdGlvbiBzdG9wRW5naW5lICgpIHtcbiAgICB0aGlzLl9jaGFubmVsLnNlbmRNZXNzYWdlKEVOR0lORV9TVE9QKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZhbW91c0VuZ2luZSgpO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLypqc2hpbnQgLVcwNzkgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBTaXplID0gcmVxdWlyZSgnLi9TaXplJyk7XG5cbnZhciBUUkFOU0ZPUk1fUFJPQ0VTU09SID0gbmV3IFRyYW5zZm9ybSgpO1xudmFyIFNJWkVfUFJPQ0VTU09SID0gbmV3IFNpemUoKTtcblxudmFyIElERU5UID0gW1xuICAgIDEsIDAsIDAsIDAsXG4gICAgMCwgMSwgMCwgMCxcbiAgICAwLCAwLCAxLCAwLFxuICAgIDAsIDAsIDAsIDFcbl07XG5cbnZhciBPTkVTID0gWzEsIDEsIDFdO1xudmFyIFFVQVQgPSBbMCwgMCwgMCwgMV07XG5cbi8qKlxuICogTm9kZXMgZGVmaW5lIGhpZXJhcmNoeSBhbmQgZ2VvbWV0cmljYWwgdHJhbnNmb3JtYXRpb25zLiBUaGV5IGNhbiBiZSBtb3ZlZFxuICogKHRyYW5zbGF0ZWQpLCBzY2FsZWQgYW5kIHJvdGF0ZWQuXG4gKlxuICogQSBOb2RlIGlzIGVpdGhlciBtb3VudGVkIG9yIHVubW91bnRlZC4gVW5tb3VudGVkIG5vZGVzIGFyZSBkZXRhY2hlZCBmcm9tIHRoZVxuICogc2NlbmUgZ3JhcGguIFVubW91bnRlZCBub2RlcyBoYXZlIG5vIHBhcmVudCBub2RlLCB3aGlsZSBlYWNoIG1vdW50ZWQgbm9kZSBoYXNcbiAqIGV4YWN0bHkgb25lIHBhcmVudC4gTm9kZXMgaGF2ZSBhbiBhcmJpdGFyeSBudW1iZXIgb2YgY2hpbGRyZW4sIHdoaWNoIGNhbiBiZVxuICogZHluYW1pY2FsbHkgYWRkZWQgdXNpbmcgQHtAbGluayBhZGRDaGlsZH0uXG4gKlxuICogRWFjaCBOb2RlcyBoYXZlIGFuIGFyYml0cmFyeSBudW1iZXIgb2YgYGNvbXBvbmVudHNgLiBUaG9zZSBjb21wb25lbnRzIGNhblxuICogc2VuZCBgZHJhd2AgY29tbWFuZHMgdG8gdGhlIHJlbmRlcmVyIG9yIG11dGF0ZSB0aGUgbm9kZSBpdHNlbGYsIGluIHdoaWNoIGNhc2VcbiAqIHRoZXkgZGVmaW5lIGJlaGF2aW9yIGluIHRoZSBtb3N0IGV4cGxpY2l0IHdheS4gQ29tcG9uZW50cyB0aGF0IHNlbmQgYGRyYXdgXG4gKiBjb21tYW5kcyBhYXJlIGNvbnNpZGVyZWQgYHJlbmRlcmFibGVzYC4gRnJvbSB0aGUgbm9kZSdzIHBlcnNwZWN0aXZlLCB0aGVyZSBpc1xuICogbm8gZGlzdGluY3Rpb24gYmV0d2VlbiBub2RlcyB0aGF0IHNlbmQgZHJhdyBjb21tYW5kcyBhbmQgbm9kZXMgdGhhdCBkZWZpbmVcbiAqIGJlaGF2aW9yLlxuICpcbiAqIEJlY2F1c2Ugb2YgdGhlIGZhY3QgdGhhdCBOb2RlcyB0aGVtc2VsZiBhcmUgdmVyeSB1bm9waW5pb3RlZCAodGhleSBkb24ndFxuICogXCJyZW5kZXJcIiB0byBhbnl0aGluZyksIHRoZXkgYXJlIG9mdGVuIGJlaW5nIHN1YmNsYXNzZWQgaW4gb3JkZXIgdG8gYWRkIGUuZy5cbiAqIGNvbXBvbmVudHMgYXQgaW5pdGlhbGl6YXRpb24gdG8gdGhlbS4gQmVjYXVzZSBvZiB0aGlzIGZsZXhpYmlsaXR5LCB0aGV5IG1pZ2h0XG4gKiBhcyB3ZWxsIGhhdmUgYmVlbiBjYWxsZWQgYEVudGl0aWVzYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gY3JlYXRlIHRocmVlIGRldGFjaGVkICh1bm1vdW50ZWQpIG5vZGVzXG4gKiB2YXIgcGFyZW50ID0gbmV3IE5vZGUoKTtcbiAqIHZhciBjaGlsZDEgPSBuZXcgTm9kZSgpO1xuICogdmFyIGNoaWxkMiA9IG5ldyBOb2RlKCk7XG4gKlxuICogLy8gYnVpbGQgYW4gdW5tb3VudGVkIHN1YnRyZWUgKHBhcmVudCBpcyBzdGlsbCBkZXRhY2hlZClcbiAqIHBhcmVudC5hZGRDaGlsZChjaGlsZDEpO1xuICogcGFyZW50LmFkZENoaWxkKGNoaWxkMik7XG4gKlxuICogLy8gbW91bnQgcGFyZW50IGJ5IGFkZGluZyBpdCB0byB0aGUgY29udGV4dFxuICogdmFyIGNvbnRleHQgPSBGYW1vdXMuY3JlYXRlQ29udGV4dChcImJvZHlcIik7XG4gKiBjb250ZXh0LmFkZENoaWxkKHBhcmVudCk7XG4gKlxuICogQGNsYXNzIE5vZGVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBOb2RlICgpIHtcbiAgICB0aGlzLl9jYWxjdWxhdGVkVmFsdWVzID0ge1xuICAgICAgICB0cmFuc2Zvcm06IG5ldyBGbG9hdDMyQXJyYXkoSURFTlQpLFxuICAgICAgICBzaXplOiBuZXcgRmxvYXQzMkFycmF5KDMpXG4gICAgfTtcblxuICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9pblVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fdXBkYXRlUXVldWUgPSBbXTtcbiAgICB0aGlzLl9uZXh0VXBkYXRlUXVldWUgPSBbXTtcblxuICAgIHRoaXMuX2ZyZWVkQ29tcG9uZW50SW5kaWNpZXMgPSBbXTtcbiAgICB0aGlzLl9jb21wb25lbnRzID0gW107XG5cbiAgICB0aGlzLl9mcmVlZENoaWxkSW5kaWNpZXMgPSBbXTtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXG4gICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9nbG9iYWxVcGRhdGVyID0gbnVsbDtcblxuICAgIHRoaXMuX2xhc3RFdWxlclggPSAwO1xuICAgIHRoaXMuX2xhc3RFdWxlclkgPSAwO1xuICAgIHRoaXMuX2xhc3RFdWxlclogPSAwO1xuICAgIHRoaXMuX2xhc3RFdWxlciA9IGZhbHNlO1xuXG4gICAgdGhpcy52YWx1ZSA9IG5ldyBOb2RlLlNwZWMoKTtcbn1cblxuTm9kZS5SRUxBVElWRV9TSVpFID0gU2l6ZS5SRUxBVElWRTtcbk5vZGUuQUJTT0xVVEVfU0laRSA9IFNpemUuQUJTT0xVVEU7XG5Ob2RlLlJFTkRFUl9TSVpFID0gU2l6ZS5SRU5ERVI7XG5Ob2RlLkRFRkFVTFRfU0laRSA9IFNpemUuREVGQVVMVDtcblxuLyoqXG4gKiBBIE5vZGUgc3BlYyBob2xkcyB0aGUgXCJkYXRhXCIgYXNzb2NpYXRlZCB3aXRoIGEgTm9kZS5cbiAqXG4gKiBAY2xhc3MgU3BlY1xuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHByb3BlcnR5IHtTdHJpbmd9IGxvY2F0aW9uIHBhdGggdG8gdGhlIG5vZGUgKGUuZy4gXCJib2R5LzAvMVwiKVxuICogQHByb3BlcnR5IHtPYmplY3R9IHNob3dTdGF0ZVxuICogQHByb3BlcnR5IHtCb29sZWFufSBzaG93U3RhdGUubW91bnRlZFxuICogQHByb3BlcnR5IHtCb29sZWFufSBzaG93U3RhdGUuc2hvd25cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzaG93U3RhdGUub3BhY2l0eVxuICogQHByb3BlcnR5IHtPYmplY3R9IG9mZnNldHNcbiAqIEBwcm9wZXJ0eSB7RmxvYXQzMkFycmF5LjxOdW1iZXI+fSBvZmZzZXRzLm1vdW50UG9pbnRcbiAqIEBwcm9wZXJ0eSB7RmxvYXQzMkFycmF5LjxOdW1iZXI+fSBvZmZzZXRzLmFsaWduXG4gKiBAcHJvcGVydHkge0Zsb2F0MzJBcnJheS48TnVtYmVyPn0gb2Zmc2V0cy5vcmlnaW5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB2ZWN0b3JzXG4gKiBAcHJvcGVydHkge0Zsb2F0MzJBcnJheS48TnVtYmVyPn0gdmVjdG9ycy5wb3NpdGlvblxuICogQHByb3BlcnR5IHtGbG9hdDMyQXJyYXkuPE51bWJlcj59IHZlY3RvcnMucm90YXRpb25cbiAqIEBwcm9wZXJ0eSB7RmxvYXQzMkFycmF5LjxOdW1iZXI+fSB2ZWN0b3JzLnNjYWxlXG4gKiBAcHJvcGVydHkge09iamVjdH0gc2l6ZVxuICogQHByb3BlcnR5IHtGbG9hdDMyQXJyYXkuPE51bWJlcj59IHNpemUuc2l6ZU1vZGVcbiAqIEBwcm9wZXJ0eSB7RmxvYXQzMkFycmF5LjxOdW1iZXI+fSBzaXplLnByb3BvcnRpb25hbFxuICogQHByb3BlcnR5IHtGbG9hdDMyQXJyYXkuPE51bWJlcj59IHNpemUuZGlmZmVyZW50aWFsXG4gKiBAcHJvcGVydHkge0Zsb2F0MzJBcnJheS48TnVtYmVyPn0gc2l6ZS5hYnNvbHV0ZVxuICogQHByb3BlcnR5IHtGbG9hdDMyQXJyYXkuPE51bWJlcj59IHNpemUucmVuZGVyXG4gKi9cbk5vZGUuU3BlYyA9IGZ1bmN0aW9uIFNwZWMgKCkge1xuICAgIHRoaXMubG9jYXRpb24gPSBudWxsO1xuICAgIHRoaXMuc2hvd1N0YXRlID0ge1xuICAgICAgICBtb3VudGVkOiBmYWxzZSxcbiAgICAgICAgc2hvd246IGZhbHNlLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfTtcbiAgICB0aGlzLm9mZnNldHMgPSB7XG4gICAgICAgIG1vdW50UG9pbnQ6IG5ldyBGbG9hdDMyQXJyYXkoMyksXG4gICAgICAgIGFsaWduOiBuZXcgRmxvYXQzMkFycmF5KDMpLFxuICAgICAgICBvcmlnaW46IG5ldyBGbG9hdDMyQXJyYXkoMylcbiAgICB9O1xuICAgIHRoaXMudmVjdG9ycyA9IHtcbiAgICAgICAgcG9zaXRpb246IG5ldyBGbG9hdDMyQXJyYXkoMyksXG4gICAgICAgIHJvdGF0aW9uOiBuZXcgRmxvYXQzMkFycmF5KFFVQVQpLFxuICAgICAgICBzY2FsZTogbmV3IEZsb2F0MzJBcnJheShPTkVTKVxuICAgIH07XG4gICAgdGhpcy5zaXplID0ge1xuICAgICAgICBzaXplTW9kZTogbmV3IEZsb2F0MzJBcnJheShbU2l6ZS5SRUxBVElWRSwgU2l6ZS5SRUxBVElWRSwgU2l6ZS5SRUxBVElWRV0pLFxuICAgICAgICBwcm9wb3J0aW9uYWw6IG5ldyBGbG9hdDMyQXJyYXkoT05FUyksXG4gICAgICAgIGRpZmZlcmVudGlhbDogbmV3IEZsb2F0MzJBcnJheSgzKSxcbiAgICAgICAgYWJzb2x1dGU6IG5ldyBGbG9hdDMyQXJyYXkoMyksXG4gICAgICAgIHJlbmRlcjogbmV3IEZsb2F0MzJBcnJheSgzKVxuICAgIH07XG4gICAgdGhpcy5VSUV2ZW50cyA9IFtdO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIG5vZGUncyBsb2NhdGlvbiBpbiB0aGUgc2NlbmUgZ3JhcGggaGllcmFyY2h5LlxuICogQSBsb2NhdGlvbiBvZiBgYm9keS8wLzFgIGNhbiBiZSBpbnRlcnByZXRlZCBhcyB0aGUgZm9sbG93aW5nIHNjZW5lIGdyYXBoXG4gKiBoaWVyYXJjaHkgKGlnbm9yaW5nIHNpYmxpbmdzIG9mIGFuY2VzdG9ycyBhbmQgYWRkaXRpb25hbCBjaGlsZCBub2Rlcyk6XG4gKlxuICogYENvbnRleHQ6Ym9keWAgLT4gYE5vZGU6MGAgLT4gYE5vZGU6MWAsIHdoZXJlIGBOb2RlOjFgIGlzIHRoZSBub2RlIHRoZVxuICogYGdldExvY2F0aW9uYCBtZXRob2QgaGFzIGJlZW4gaW52b2tlZCBvbi5cbiAqXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBsb2NhdGlvbiAocGF0aCksIGUuZy4gYGJvZHkvMC8xYFxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uIGdldExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5sb2NhdGlvbjtcbn07XG5cbi8qKlxuICogQGFsaWFzIGdldElkXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSB0aGUgcGF0aCBvZiB0aGUgTm9kZVxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRJZCA9IE5vZGUucHJvdG90eXBlLmdldExvY2F0aW9uO1xuXG4vKipcbiAqIEdsb2JhbGx5IGRpc3BhdGNoZXMgdGhlIGV2ZW50IHVzaW5nIHRoZSBTY2VuZSdzIERpc3BhdGNoLiBBbGwgbm9kZXMgd2lsbFxuICogcmVjZWl2ZSB0aGUgZGlzcGF0Y2hlZCBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGVtaXRcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGV2ZW50ICAgRXZlbnQgdHlwZS5cbiAqIEBwYXJhbSAge09iamVjdH0gcGF5bG9hZCBFdmVudCBvYmplY3QgdG8gYmUgZGlzcGF0Y2hlZC5cbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0IChldmVudCwgcGF5bG9hZCkge1xuICAgIHZhciBjdXJyZW50ID0gdGhpcztcblxuICAgIHdoaWxlIChjdXJyZW50ICE9PSBjdXJyZW50LmdldFBhcmVudCgpKSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmdldFBhcmVudCgpO1xuICAgIH1cblxuICAgIGN1cnJlbnQuZ2V0RGlzcGF0Y2goKS5kaXNwYXRjaChldmVudCwgcGF5bG9hZCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUSElTIFdJTEwgQkUgREVQUklDQVRFRFxuTm9kZS5wcm90b3R5cGUuc2VuZERyYXdDb21tYW5kID0gZnVuY3Rpb24gc2VuZERyYXdDb21tYW5kIChtZXNzYWdlKSB7XG4gICAgdGhpcy5fZ2xvYmFsVXBkYXRlci5tZXNzYWdlKG1lc3NhZ2UpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBzZXJpYWxpemVzIHRoZSBOb2RlLCBpbmNsdWRpbmcgYWxsIHByZXZpb3VzbHkgYWRkZWQgY29tcG9uZW50cy5cbiAqXG4gKiBAbWV0aG9kIGdldFZhbHVlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAgICAgU2VyaWFsaXplZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbm9kZSwgaW5jbHVkaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLlxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlICgpIHtcbiAgICB2YXIgbnVtYmVyT2ZDaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgbnVtYmVyT2ZDb21wb25lbnRzID0gdGhpcy5fY29tcG9uZW50cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgdmFyIHZhbHVlID0ge1xuICAgICAgICBsb2NhdGlvbjogdGhpcy52YWx1ZS5sb2NhdGlvbixcbiAgICAgICAgc3BlYzogdGhpcy52YWx1ZSxcbiAgICAgICAgY29tcG9uZW50czogbmV3IEFycmF5KG51bWJlck9mQ29tcG9uZW50cyksXG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQXJyYXkobnVtYmVyT2ZDaGlsZHJlbilcbiAgICB9O1xuXG4gICAgZm9yICg7IGkgPCBudW1iZXJPZkNoaWxkcmVuIDsgaSsrKVxuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5baV0gJiYgdGhpcy5fY2hpbGRyZW5baV0uZ2V0VmFsdWUpXG4gICAgICAgICAgICB2YWx1ZS5jaGlsZHJlbltpXSA9IHRoaXMuX2NoaWxkcmVuW2ldLmdldFZhbHVlKCk7XG5cbiAgICBmb3IgKGkgPSAwIDsgaSA8IG51bWJlck9mQ29tcG9uZW50cyA7IGkrKylcbiAgICAgICAgaWYgKHRoaXMuX2NvbXBvbmVudHNbaV0gJiYgdGhpcy5fY29tcG9uZW50c1tpXS5nZXRWYWx1ZSlcbiAgICAgICAgICAgIHZhbHVlLmNvbXBvbmVudHNbaV0gPSB0aGlzLl9jb21wb25lbnRzW2ldLmdldFZhbHVlKCk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gQHtAbGluayBnZXRWYWx1ZX0sIGJ1dCByZXR1cm5zIHRoZSBhY3R1YWwgXCJjb21wdXRlZFwiIHZhbHVlLiBFLmcuXG4gKiBhIHByb3BvcnRpb25hbCBzaXplIG9mIDAuNSBtaWdodCByZXNvbHZlIGludG8gYSBcImNvbXB1dGVkXCIgc2l6ZSBvZiAyMDBweFxuICogKGFzc3VtaW5nIHRoZSBwYXJlbnQgaGFzIGEgd2lkdGggb2YgNDAwcHgpLlxuICpcbiAqIEBtZXRob2QgZ2V0Q29tcHV0ZWRWYWx1ZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gICAgIFNlcmlhbGl6ZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIG5vZGUsIGluY2x1ZGluZ1xuICogICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sIGV4Y2x1ZGluZyBjb21wb25lbnRzLlxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRDb21wdXRlZFZhbHVlID0gZnVuY3Rpb24gZ2V0Q29tcHV0ZWRWYWx1ZSAoKSB7XG4gICAgdmFyIG51bWJlck9mQ2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgIGxvY2F0aW9uOiB0aGlzLnZhbHVlLmxvY2F0aW9uLFxuICAgICAgICBjb21wdXRlZFZhbHVlczogdGhpcy5fY2FsY3VsYXRlZFZhbHVlcyxcbiAgICAgICAgY2hpbGRyZW46IG5ldyBBcnJheShudW1iZXJPZkNoaWxkcmVuKVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBudW1iZXJPZkNoaWxkcmVuIDsgaSsrKVxuICAgICAgICB2YWx1ZS5jaGlsZHJlbltpXSA9IHRoaXMuX2NoaWxkcmVuW2ldLmdldENvbXB1dGVkVmFsdWUoKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIGFsbCBjaGlsZHJlbiBvZiB0aGUgY3VycmVudCBub2RlLlxuICpcbiAqIEBtZXRob2QgZ2V0Q2hpbGRyZW5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48Tm9kZT59ICAgQW4gYXJyYXkgb2YgY2hpbGRyZW4uXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gZ2V0Q2hpbGRyZW4gKCkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBwYXJlbnQgb2YgdGhlIGN1cnJlbnQgbm9kZS4gVW5tb3VudGVkIG5vZGVzIGRvIG5vdCBoYXZlIGFcbiAqIHBhcmVudCBub2RlLlxuICpcbiAqIEBtZXRob2QgZ2V0UGFyZW50XG4gKlxuICogQHJldHVybiB7Tm9kZX0gICAgICAgUGFyZW50IG5vZGUuXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uIGdldFBhcmVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbn07XG5cbi8qKlxuICogU2NoZWR1bGVzIHRoZSBAe0BsaW5rIHVwZGF0ZX0gZnVuY3Rpb24gb2YgdGhlIG5vZGUgdG8gYmUgaW52b2tlZCBvbiB0aGUgbmV4dFxuICogZnJhbWUgKGlmIG5vIHVwZGF0ZSBkdXJpbmcgdGhpcyBmcmFtZSBoYXMgYmVlbiBzY2hlZHVsZWQgYWxyZWFkeSkuXG4gKiBJZiB0aGUgbm9kZSBpcyBjdXJyZW50bHkgYmVpbmcgdXBkYXRlZCAod2hpY2ggbWVhbnMgb25lIG9mIHRoZSByZXF1ZXN0ZXJzXG4gKiBpbnZva2VkIHJlcXVlc3RzVXBkYXRlIHdoaWxlIGJlaW5nIHVwZGF0ZWQgaXRzZWxmKSwgYW4gdXBkYXRlIHdpbGwgYmVcbiAqIHNjaGVkdWxlZCBvbiB0aGUgbmV4dCBmcmFtZS5cbiAqXG4gKiBAbWV0aG9kIHJlcXVlc3RVcGRhdGVcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHJlcXVlc3RlciAgIElmIHRoZSByZXF1ZXN0ZXIgaGFzIGFuIGBvblVwZGF0ZWAgbWV0aG9kLCBpdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGJlIGludm9rZWQgZHVyaW5nIHRoZSBuZXh0IHVwZGF0ZSBwaGFzZSBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLnJlcXVlc3RVcGRhdGUgPSBmdW5jdGlvbiByZXF1ZXN0VXBkYXRlIChyZXF1ZXN0ZXIpIHtcbiAgICBpZiAodGhpcy5faW5VcGRhdGUgfHwgIXRoaXMuaXNNb3VudGVkKCkpXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RVcGRhdGVPbk5leHRUaWNrKHJlcXVlc3Rlcik7XG4gICAgdGhpcy5fdXBkYXRlUXVldWUucHVzaChyZXF1ZXN0ZXIpO1xuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTY2hlZHVsZXMgYW4gdXBkYXRlIG9uIHRoZSBuZXh0IHRpY2suIFNpbWlsYXJpbHkgdG8gQHtAbGluayByZXF1ZXN0VXBkYXRlfSxcbiAqIGByZXF1ZXN0VXBkYXRlT25OZXh0VGlja2Agc2NoZWR1bGVzIHRoZSBub2RlJ3MgYG9uVXBkYXRlYCBmdW5jdGlvbiB0byBiZVxuICogaW52b2tlZCBvbiB0aGUgZnJhbWUgYWZ0ZXIgdGhlIG5leHQgaW52b2NhdGlvbiBvbiB0aGUgbm9kZSdzIG9uVXBkYXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBtZXRob2QgcmVxdWVzdFVwZGF0ZU9uTmV4dFRpY2tcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHJlcXVlc3RlciAgIElmIHRoZSByZXF1ZXN0ZXIgaGFzIGFuIGBvblVwZGF0ZWAgbWV0aG9kLCBpdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGJlIGludm9rZWQgZHVyaW5nIHRoZSBuZXh0IHVwZGF0ZSBwaGFzZSBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLnJlcXVlc3RVcGRhdGVPbk5leHRUaWNrID0gZnVuY3Rpb24gcmVxdWVzdFVwZGF0ZU9uTmV4dFRpY2sgKHJlcXVlc3Rlcikge1xuICAgIHRoaXMuX25leHRVcGRhdGVRdWV1ZS5wdXNoKHJlcXVlc3Rlcik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgb2JqZWN0IHJlc3BvbnNpYmxlIGZvciB1cGRhdGluZyB0aGlzIG5vZGUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGdsb2JhbCB1cGRhdGVyLlxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRVcGRhdGVyID0gZnVuY3Rpb24gZ2V0VXBkYXRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dsb2JhbFVwZGF0ZXI7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgbm9kZSBpcyBtb3VudGVkLiBVbm1vdW50ZWQgbm9kZXMgYXJlIGRldGFjaGVkIGZyb20gdGhlIHNjZW5lXG4gKiBncmFwaC5cbiAqXG4gKiBAbWV0aG9kIGlzTW91bnRlZFxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgIEJvb2xlYW4gaW5kaWNhdGluZyB3ZWF0aGVyIHRoZSBub2RlIGlzIG1vdW50ZWQgb3Igbm90LlxuICovXG5Ob2RlLnByb3RvdHlwZS5pc01vdW50ZWQgPSBmdW5jdGlvbiBpc01vdW50ZWQgKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLnNob3dTdGF0ZS5tb3VudGVkO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIG5vZGUgaXMgdmlzaWJsZSAoXCJzaG93blwiKS5cbiAqXG4gKiBAbWV0aG9kIGlzU2hvd25cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICBCb29sZWFuIGluZGljYXRpbmcgd2VhdGhlciB0aGUgbm9kZSBpcyB2aXNpYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAoXCJzaG93blwiKSBvciBub3QuXG4gKi9cbk5vZGUucHJvdG90eXBlLmlzU2hvd24gPSBmdW5jdGlvbiBpc1Nob3duICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zaG93U3RhdGUuc2hvd247XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIG5vZGUncyByZWxhdGl2ZSBvcGFjaXR5LlxuICogVGhlIG9wYWNpdHkgbmVlZHMgdG8gYmUgd2l0aGluIFswLCAxXSwgd2hlcmUgMCBpbmRpY2F0ZXMgYSBjb21wbGV0ZWx5XG4gKiB0cmFuc3BhcmVudCwgdGhlcmVmb3JlIGludmlzaWJsZSBub2RlLCB3aGVyZWFzIGFuIG9wYWNpdHkgb2YgMSBtZWFucyB0aGVcbiAqIG5vZGUgaXMgY29tcGxldGVseSBzb2xpZC5cbiAqXG4gKiBAbWV0aG9kIGdldE9wYWNpdHlcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICAgUmVsYXRpdmUgb3BhY2l0eSBvZiB0aGUgbm9kZS5cbiAqL1xuTm9kZS5wcm90b3R5cGUuZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uIGdldE9wYWNpdHkgKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLnNob3dTdGF0ZS5vcGFjaXR5O1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBub2RlJ3MgcHJldmlvdXNseSBzZXQgbW91bnQgcG9pbnQuXG4gKlxuICogQG1ldGhvZCBnZXRNb3VudFBvaW50XG4gKlxuICogQHJldHVybiB7RmxvYXQzMkFycmF5fSAgIEFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgbW91bnQgcG9pbnQuXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldE1vdW50UG9pbnQgPSBmdW5jdGlvbiBnZXRNb3VudFBvaW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5vZmZzZXRzLm1vdW50UG9pbnQ7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIG5vZGUncyBwcmV2aW91c2x5IHNldCBhbGlnbi5cbiAqXG4gKiBAbWV0aG9kIGdldEFsaWduXG4gKlxuICogQHJldHVybiB7RmxvYXQzMkFycmF5fSAgIEFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgYWxpZ24uXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldEFsaWduID0gZnVuY3Rpb24gZ2V0QWxpZ24gKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLm9mZnNldHMuYWxpZ247XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIG5vZGUncyBwcmV2aW91c2x5IHNldCBvcmlnaW4uXG4gKlxuICogQG1ldGhvZCBnZXRPcmlnaW5cbiAqXG4gKiBAcmV0dXJuIHtGbG9hdDMyQXJyYXl9ICAgQW4gYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4uXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUub2Zmc2V0cy5vcmlnaW47XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIG5vZGUncyBwcmV2aW91c2x5IHNldCBwb3NpdGlvbi5cbiAqXG4gKiBAbWV0aG9kIGdldFBvc2l0aW9uXG4gKlxuICogQHJldHVybiB7RmxvYXQzMkFycmF5fSAgIEFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb24uXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gZ2V0UG9zaXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLnZlY3RvcnMucG9zaXRpb247XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5vZGUncyBjdXJyZW50IHJvdGF0aW9uXG4gKlxuICogQG1ldGhvZCBnZXRSb3RhdGlvblxuICpcbiAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gYW4gYXJyYXkgb2YgZm91ciB2YWx1ZXMsIHNob3dpbmcgdGhlIHJvdGF0aW9uIGFzIGEgcXVhdGVybmlvblxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRSb3RhdGlvbiA9IGZ1bmN0aW9uIGdldFJvdGF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS52ZWN0b3JzLnJvdGF0aW9uO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzY2FsZSBvZiB0aGUgbm9kZVxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtGbG9hdDMyQXJyYXl9IGFuIGFycmF5IHNob3dpbmcgdGhlIGN1cnJlbnQgc2NhbGUgdmVjdG9yXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldFNjYWxlID0gZnVuY3Rpb24gZ2V0U2NhbGUgKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLnZlY3RvcnMuc2NhbGU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2l6ZSBtb2RlIG9mIHRoZSBub2RlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gYW4gYXJyYXkgb2YgbnVtYmVycyBzaG93aW5nIHRoZSBjdXJyZW50IHNpemUgbW9kZVxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRTaXplTW9kZSA9IGZ1bmN0aW9uIGdldFNpemVNb2RlICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zaXplLnNpemVNb2RlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IHByb3BvcnRpb25hbCBzaXplXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gYSB2ZWN0b3IgMyBzaG93aW5nIHRoZSBjdXJyZW50IHByb3BvcnRpb25hbCBzaXplXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldFByb3BvcnRpb25hbFNpemUgPSBmdW5jdGlvbiBnZXRQcm9wb3J0aW9uYWxTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zaXplLnByb3BvcnRpb25hbDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZGlmZmVyZW50aWFsIHNpemUgb2YgdGhlIG5vZGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7RmxvYXQzMkFycmF5fSBhIHZlY3RvciAzIHNob3dpbmcgdGhlIGN1cnJlbnQgZGlmZmVyZW50aWFsIHNpemVcbiAqL1xuTm9kZS5wcm90b3R5cGUuZ2V0RGlmZmVyZW50aWFsU2l6ZSA9IGZ1bmN0aW9uIGdldERpZmZlcmVudGlhbFNpemUgKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlLnNpemUuZGlmZmVyZW50aWFsO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhYnNvbHV0ZSBzaXplIG9mIHRoZSBub2RlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gYSB2ZWN0b3IgMyBzaG93aW5nIHRoZSBjdXJyZW50IGFic29sdXRlIHNpemUgb2YgdGhlIG5vZGVcbiAqL1xuTm9kZS5wcm90b3R5cGUuZ2V0QWJzb2x1dGVTaXplID0gZnVuY3Rpb24gZ2V0QWJzb2x1dGVTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zaXplLmFic29sdXRlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IFJlbmRlciBTaXplIG9mIHRoZSBub2RlLiBOb3RlIHRoYXQgdGhlIHJlbmRlciBzaXplXG4gKiBpcyBhc3luY2hyb25vdXMgKHdpbGwgYWx3YXlzIGJlIG9uZSBmcmFtZSBiZWhpbmQpIGFuZCBuZWVkcyB0byBiZSBleHBsaWNpdGVseVxuICogY2FsY3VsYXRlZCBieSBzZXR0aW5nIHRoZSBwcm9wZXIgc2l6ZSBtb2RlLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtGbG9hdDMyQXJyYXl9IGEgdmVjdG9yIDMgc2hvd2luZyB0aGUgY3VycmVudCByZW5kZXIgc2l6ZVxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRSZW5kZXJTaXplID0gZnVuY3Rpb24gZ2V0UmVuZGVyU2l6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUuc2l6ZS5yZW5kZXI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGV4dGVybmFsIHNpemUgb2YgdGhlIG5vZGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7RmxvYXQzMkFycmF5fSBhIHZlY3RvciAzIG9mIHRoZSBmaW5hbCBjYWxjdWxhdGVkIHNpZGUgb2YgdGhlIG5vZGVcbiAqL1xuTm9kZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUgKCkge1xuICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGVkVmFsdWVzLnNpemU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgd29ybGQgdHJhbnNmb3JtIG9mIHRoZSBub2RlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gYSAxNiB2YWx1ZSB0cmFuc2Zvcm1cbiAqL1xuTm9kZS5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRlZFZhbHVlcy50cmFuc2Zvcm07XG59O1xuXG4vKipcbiAqIEdldCB0aGUgbGlzdCBvZiB0aGUgVUkgRXZlbnRzIHRoYXQgYXJlIGN1cnJlbnRseSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdWJzY3JpYmVkIFVJIGV2ZW50IG9mIHRoaXMgbm9kZVxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRVSUV2ZW50cyA9IGZ1bmN0aW9uIGdldFVJRXZlbnRzICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5VSUV2ZW50cztcbn07XG5cbi8qKlxuICogQWRkcyBhIG5ldyBjaGlsZCB0byB0aGlzIG5vZGUuIElmIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aXRoIG5vIGFyZ3VtZW50IGl0IHdpbGxcbiAqIGNyZWF0ZSBhIG5ldyBub2RlLCBob3dldmVyIGl0IGNhbiBhbHNvIGJlIGNhbGxlZCB3aXRoIGFuIGV4aXN0aW5nIG5vZGUgd2hpY2ggaXQgd2lsbFxuICogYXBwZW5kIHRvIHRoZSBub2RlIHRoYXQgdGhpcyBtZXRob2QgaXMgYmVpbmcgY2FsbGVkIG9uLiBSZXR1cm5zIHRoZSBuZXcgb3IgcGFzc2VkIGluIG5vZGUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7Tm9kZSB8IHZvaWR9IGNoaWxkIHRoZSBub2RlIHRvIGFwcGVuZGVkIG9yIG5vIG5vZGUgdG8gY3JlYXRlIGEgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhlIGFwcGVuZGVkIG5vZGUuXG4gKi9cbk5vZGUucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gYWRkQ2hpbGQgKGNoaWxkKSB7XG4gICAgdmFyIGluZGV4ID0gY2hpbGQgPyB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSA6IC0xO1xuICAgIGNoaWxkID0gY2hpbGQgPyBjaGlsZCA6IG5ldyBOb2RlKCk7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5fZnJlZWRDaGlsZEluZGljaWVzLmxlbmd0aCA/IHRoaXMuX2ZyZWVkQ2hpbGRJbmRpY2llcy5wb3AoKSA6IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW5baW5kZXhdID0gY2hpbGQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkgJiYgY2hpbGQub25Nb3VudCkge1xuICAgICAgICAgICAgdmFyIG15SWQgPSB0aGlzLmdldElkKCk7XG4gICAgICAgICAgICB2YXIgY2hpbGRJZCA9IG15SWQgKyAnLycgKyBpbmRleDtcbiAgICAgICAgICAgIGNoaWxkLm9uTW91bnQodGhpcywgY2hpbGRJZCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZDtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGNoaWxkIG5vZGUgZnJvbSBhbm90aGVyIG5vZGUuIFRoZSBwYXNzZWQgaW4gbm9kZSBtdXN0IGJlXG4gKiBhIGNoaWxkIG9mIHRoZSBub2RlIHRoYXQgdGhpcyBtZXRob2QgaXMgY2FsbGVkIHVwb24uXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gY2hpbGQgbm9kZSB0byBiZSByZW1vdmVkXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBvciBub3QgdGhlIG5vZGUgd2FzIHN1Y2Nlc3NmdWxseSByZW1vdmVkXG4gKi9cbk5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gcmVtb3ZlQ2hpbGQgKGNoaWxkKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgdmFyIGFkZGVkID0gaW5kZXggIT09IC0xO1xuICAgIGlmIChhZGRlZCkge1xuICAgICAgICB0aGlzLl9mcmVlZENoaWxkSW5kaWNpZXMucHVzaChpbmRleCk7XG5cbiAgICAgICAgdGhpcy5fY2hpbGRyZW5baW5kZXhdID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSAmJiBjaGlsZC5vbkRpc21vdW50KVxuICAgICAgICAgICAgY2hpbGQub25EaXNtb3VudCgpO1xuICAgIH1cbiAgICByZXR1cm4gYWRkZWQ7XG59O1xuXG4vKipcbiAqIEVhY2ggY29tcG9uZW50IGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgcGVyIG5vZGUuXG4gKlxuICogQG1ldGhvZCBhZGRDb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50ICAgIEFuIGNvbXBvbmVudCB0byBiZSBhZGRlZC5cbiAqIEByZXR1cm4ge051bWJlcn0gaW5kZXggICAgICAgVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBjb21wb25lbnQgaGFzIGJlZW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJlZC4gSW5kaWNlcyBhcmVuJ3QgbmVjZXNzYXJpbHlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VjdXRpdmUuXG4gKi9cbk5vZGUucHJvdG90eXBlLmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uIGFkZENvbXBvbmVudCAoY29tcG9uZW50KSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5fY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBpbmRleCA9IHRoaXMuX2ZyZWVkQ29tcG9uZW50SW5kaWNpZXMubGVuZ3RoID8gdGhpcy5fZnJlZWRDb21wb25lbnRJbmRpY2llcy5wb3AoKSA6IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoO1xuICAgICAgICB0aGlzLl9jb21wb25lbnRzW2luZGV4XSA9IGNvbXBvbmVudDtcblxuICAgICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSAmJiBjb21wb25lbnQub25Nb3VudClcbiAgICAgICAgICAgIGNvbXBvbmVudC5vbk1vdW50KHRoaXMsIGluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5pc1Nob3duKCkgJiYgY29tcG9uZW50Lm9uU2hvdylcbiAgICAgICAgICAgIGNvbXBvbmVudC5vblNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG59O1xuXG4vKipcbiAqIEBtZXRob2QgIGdldENvbXBvbmVudFxuICpcbiAqIEBwYXJhbSAge051bWJlcn0gaW5kZXggICBJbmRleCBhdCB3aGljaCB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHJlZ3NpdGVyZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAodXNpbmcgYE5vZGUjYWRkQ29tcG9uZW50YCkuXG4gKiBAcmV0dXJuIHsqfSAgICAgICAgICAgICAgVGhlIGNvbXBvbmVudCByZWdpc3RlcmVkIGF0IHRoZSBwYXNzZWQgaW4gaW5kZXggKGlmXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYW55KS5cbiAqL1xuTm9kZS5wcm90b3R5cGUuZ2V0Q29tcG9uZW50ID0gZnVuY3Rpb24gZ2V0Q29tcG9uZW50IChpbmRleCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzW2luZGV4XTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIHByZXZpb3VzbHkgdmlhIEB7QGxpbmsgYWRkQ29tcG9uZW50fSBhZGRlZCBjb21wb25lbnQuXG4gKlxuICogQG1ldGhvZCByZW1vdmVDb21wb25lbnRcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbXBvbmVudCAgIEFuIGNvbXBvbmVudCB0aGF0IGhhcyBwcmV2aW91c2x5IGJlZW4gYWRkZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNpbmcgQHtAbGluayBhZGRDb21wb25lbnR9LlxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUucmVtb3ZlQ29tcG9uZW50ID0gZnVuY3Rpb24gcmVtb3ZlQ29tcG9uZW50IChjb21wb25lbnQpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2ZyZWVkQ29tcG9uZW50SW5kaWNpZXMucHVzaChpbmRleCk7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvd24oKSAmJiBjb21wb25lbnQub25IaWRlKVxuICAgICAgICAgICAgY29tcG9uZW50Lm9uSGlkZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTW91bnRlZCgpICYmIGNvbXBvbmVudC5vbkRpc21vdW50KVxuICAgICAgICAgICAgY29tcG9uZW50Lm9uRGlzbW91bnQoKTtcblxuICAgICAgICB0aGlzLl9jb21wb25lbnRzW2luZGV4XSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZXMgYSBub2RlIHRvIGEgVUkgRXZlbnQuIEFsbCBjb21wb25lbnRzIG9uIHRoZSBub2RlXG4gKiB3aWxsIGhhdmUgdGhlIG9wcG9ydHVuaXR5IHRvIGJlZ2luIGxpc3RlbmluZyB0byB0aGF0IGV2ZW50XG4gKiBhbmQgYWxlcnRpbmcgdGhlIHNjZW5lIGdyYXBoLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIHRoZSBuYW1lIG9mIHRoZSBldmVudFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbk5vZGUucHJvdG90eXBlLmFkZFVJRXZlbnQgPSBmdW5jdGlvbiBhZGRVSUV2ZW50IChldmVudE5hbWUpIHtcbiAgICB2YXIgVUlFdmVudHMgPSB0aGlzLmdldFVJRXZlbnRzKCk7XG4gICAgdmFyIGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgIHZhciBjb21wb25lbnQ7XG5cbiAgICB2YXIgYWRkZWQgPSBVSUV2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSkgIT09IC0xO1xuICAgIGlmICghYWRkZWQpIHtcbiAgICAgICAgVUlFdmVudHMucHVzaChldmVudE5hbWUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29tcG9uZW50cy5sZW5ndGggOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnQub25BZGRVSUV2ZW50KSBjb21wb25lbnQub25BZGRVSUV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIFByaXZhdGUgbWV0aG9kIGZvciB0aGUgTm9kZSB0byByZXF1ZXN0IGFuIHVwZGF0ZSBmb3IgaXRzZWxmLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZSB3aGV0aGVyIG9yIG5vdCB0byBmb3JjZSB0aGUgdXBkYXRlXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuTm9kZS5wcm90b3R5cGUuX3JlcXVlc3RVcGRhdGUgPSBmdW5jdGlvbiBfcmVxdWVzdFVwZGF0ZSAoZm9yY2UpIHtcbiAgICBpZiAoZm9yY2UgfHwgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlICYmIHRoaXMuX2dsb2JhbFVwZGF0ZXIpKSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbFVwZGF0ZXIucmVxdWVzdFVwZGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSA9IHRydWU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBQcml2YXRlIG1ldGhvZCB0byBzZXQgYW4gb3B0aW9uYWwgdmFsdWUgaW4gYW4gYXJyYXksIGFuZFxuICogcmVxdWVzdCBhbiB1cGRhdGUgaWYgdGhpcyBjaGFuZ2VzIHRoZSB2YWx1ZSBvZiB0aGUgYXJyYXkuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZlYyB0aGUgYXJyYXkgdG8gaW5zZXJ0IHRoZSB2YWx1ZSBpbnRvXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggdGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgdmFsdWVcbiAqIEBwYXJhbSB7QW55fSB2YWwgdGhlIHZhbHVlIHRvIHBvdGVudGlhbGx5IGluc2VydCAoaWYgbm90IG51bGwgb3IgdW5kZWZpbmVkKVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGEgbmV3IHZhbHVlIHdhcyBpbnNlcnRlZC5cbiAqL1xuTm9kZS5wcm90b3R5cGUuX3ZlY09wdGlvbmFsU2V0ID0gZnVuY3Rpb24gX3ZlY09wdGlvbmFsU2V0ICh2ZWMsIGluZGV4LCB2YWwpIHtcbiAgICBpZiAodmFsICE9IG51bGwgJiYgdmVjW2luZGV4XSAhPT0gdmFsKSB7XG4gICAgICAgIHZlY1tpbmRleF0gPSB2YWw7XG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBTaG93cyB0aGUgbm9kZSwgd2hpY2ggaXMgdG8gc2F5LCBjYWxscyBvblNob3cgb24gYWxsIG9mIHRoZVxuICogbm9kZSdzIGNvbXBvbmVudHMuIFJlbmRlcmFibGUgY29tcG9uZW50cyBjYW4gdGhlbiBpc3N1ZSB0aGVcbiAqIGRyYXcgY29tbWFuZHMgbmVjZXNzYXJ5IHRvIGJlIHNob3duLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93ICgpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGl0ZW1zID0gdGhpcy5fY29tcG9uZW50cztcbiAgICB2YXIgbGVuID0gaXRlbXMubGVuZ3RoO1xuICAgIHZhciBpdGVtO1xuXG4gICAgdGhpcy52YWx1ZS5zaG93U3RhdGUuc2hvd24gPSB0cnVlO1xuXG4gICAgZm9yICg7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uU2hvdykgaXRlbS5vblNob3coKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBpdGVtcyA9IHRoaXMuX2NoaWxkcmVuO1xuICAgIGxlbiA9IGl0ZW1zLmxlbmd0aDtcblxuICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5vblBhcmVudFNob3cpIGl0ZW0ub25QYXJlbnRTaG93KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBIaWRlcyB0aGUgbm9kZSwgd2hpY2ggaXMgdG8gc2F5LCBjYWxscyBvbkhpZGUgb24gYWxsIG9mIHRoZVxuICogbm9kZSdzIGNvbXBvbmVudHMuIFJlbmRlcmFibGUgY29tcG9uZW50cyBjYW4gdGhlbiBpc3N1ZVxuICogdGhlIGRyYXcgY29tbWFuZHMgbmVjZXNzYXJ5IHRvIGJlIGhpZGRlblxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiBoaWRlICgpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGl0ZW1zID0gdGhpcy5fY29tcG9uZW50cztcbiAgICB2YXIgbGVuID0gaXRlbXMubGVuZ3RoO1xuICAgIHZhciBpdGVtO1xuXG4gICAgdGhpcy52YWx1ZS5zaG93U3RhdGUuc2hvd24gPSBmYWxzZTtcblxuICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5vbkhpZGUpIGl0ZW0ub25IaWRlKCk7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgaXRlbXMgPSB0aGlzLl9jaGlsZHJlbjtcbiAgICBsZW4gPSBpdGVtcy5sZW5ndGg7XG5cbiAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25QYXJlbnRIaWRlKSBpdGVtLm9uUGFyZW50SGlkZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgYWxpZ24gdmFsdWUgb2YgdGhlIG5vZGUuIFdpbGwgY2FsbCBvbkFsaWduQ2hhbmdlXG4gKiBvbiBhbGwgb2YgdGhlIE5vZGUncyBjb21wb25lbnRzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBBbGlnbiB2YWx1ZSBpbiB0aGUgeCBkaW1lbnNpb24uXG4gKiBAcGFyYW0ge051bWJlcn0geSBBbGlnbiB2YWx1ZSBpbiB0aGUgeSBkaW1lbnNpb24uXG4gKiBAcGFyYW0ge051bWJlcn0geiBBbGlnbiB2YWx1ZSBpbiB0aGUgeiBkaW1lbnNpb24uXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5zZXRBbGlnbiA9IGZ1bmN0aW9uIHNldEFsaWduICh4LCB5LCB6KSB7XG4gICAgdmFyIHZlYzMgPSB0aGlzLnZhbHVlLm9mZnNldHMuYWxpZ247XG4gICAgdmFyIHByb3BvZ2F0ZSA9IGZhbHNlO1xuXG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMCwgeCkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDEsIHkpIHx8IHByb3BvZ2F0ZTtcbiAgICBpZiAoeiAhPSBudWxsKSBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAyLCAoeiAtIDAuNSkpIHx8IHByb3BvZ2F0ZTtcblxuICAgIGlmIChwcm9wb2dhdGUpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIHggPSB2ZWMzWzBdO1xuICAgICAgICB5ID0gdmVjM1sxXTtcbiAgICAgICAgeiA9IHZlYzNbMl07XG4gICAgICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25BbGlnbkNoYW5nZSkgaXRlbS5vbkFsaWduQ2hhbmdlKHgsIHksIHopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtb3VudCBwb2ludCB2YWx1ZSBvZiB0aGUgbm9kZS4gV2lsbCBjYWxsIG9uTW91bnRQb2ludENoYW5nZVxuICogb24gYWxsIG9mIHRoZSBub2RlJ3MgY29tcG9uZW50cy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggTW91bnRQb2ludCB2YWx1ZSBpbiB4IGRpbWVuc2lvblxuICogQHBhcmFtIHtOdW1iZXJ9IHkgTW91bnRQb2ludCB2YWx1ZSBpbiB5IGRpbWVuc2lvblxuICogQHBhcmFtIHtOdW1iZXJ9IHogTW91bnRQb2ludCB2YWx1ZSBpbiB6IGRpbWVuc2lvblxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUuc2V0TW91bnRQb2ludCA9IGZ1bmN0aW9uIHNldE1vdW50UG9pbnQgKHgsIHksIHopIHtcbiAgICB2YXIgdmVjMyA9IHRoaXMudmFsdWUub2Zmc2V0cy5tb3VudFBvaW50O1xuICAgIHZhciBwcm9wb2dhdGUgPSBmYWxzZTtcblxuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDAsIHgpIHx8IHByb3BvZ2F0ZTtcbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAxLCB5KSB8fCBwcm9wb2dhdGU7XG4gICAgaWYgKHogIT0gbnVsbCkgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMiwgKHogLSAwLjUpKSB8fCBwcm9wb2dhdGU7XG5cbiAgICBpZiAocHJvcG9nYXRlKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciBpdGVtO1xuICAgICAgICB4ID0gdmVjM1swXTtcbiAgICAgICAgeSA9IHZlYzNbMV07XG4gICAgICAgIHogPSB2ZWMzWzJdO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uTW91bnRQb2ludENoYW5nZSkgaXRlbS5vbk1vdW50UG9pbnRDaGFuZ2UoeCwgeSwgeik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIG9yaWdpbiB2YWx1ZSBvZiB0aGUgbm9kZS4gV2lsbCBjYWxsIG9uT3JpZ2luQ2hhbmdlXG4gKiBvbiBhbGwgb2YgdGhlIG5vZGUncyBjb21wb25lbnRzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBPcmlnaW4gdmFsdWUgaW4geCBkaW1lbnNpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IE9yaWdpbiB2YWx1ZSBpbiB5IGRpbWVuc2lvblxuICogQHBhcmFtIHtOdW1iZXJ9IHogT3JpZ2luIHZhbHVlIGluIHogZGltZW5zaW9uXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbiBzZXRPcmlnaW4gKHgsIHksIHopIHtcbiAgICB2YXIgdmVjMyA9IHRoaXMudmFsdWUub2Zmc2V0cy5vcmlnaW47XG4gICAgdmFyIHByb3BvZ2F0ZSA9IGZhbHNlO1xuXG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMCwgeCkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDEsIHkpIHx8IHByb3BvZ2F0ZTtcbiAgICBpZiAoeiAhPSBudWxsKSBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAyLCAoeiAtIDAuNSkpIHx8IHByb3BvZ2F0ZTtcblxuICAgIGlmIChwcm9wb2dhdGUpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIHggPSB2ZWMzWzBdO1xuICAgICAgICB5ID0gdmVjM1sxXTtcbiAgICAgICAgeiA9IHZlYzNbMl07XG4gICAgICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25PcmlnaW5DaGFuZ2UpIGl0ZW0ub25PcmlnaW5DaGFuZ2UoeCwgeSwgeik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBub2RlLiBXaWxsIGNhbGwgb25Qb3NpdGlvbkNoYW5nZVxuICogb24gYWxsIG9mIHRoZSBub2RlJ3MgY29tcG9uZW50cy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggUG9zaXRpb24gaW4geFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgUG9zaXRpb24gaW4geVxuICogQHBhcmFtIHtOdW1iZXJ9IHogUG9zaXRpb24gaW4gelxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiBzZXRQb3NpdGlvbiAoeCwgeSwgeikge1xuICAgIHZhciB2ZWMzID0gdGhpcy52YWx1ZS52ZWN0b3JzLnBvc2l0aW9uO1xuICAgIHZhciBwcm9wb2dhdGUgPSBmYWxzZTtcblxuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDAsIHgpIHx8IHByb3BvZ2F0ZTtcbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAxLCB5KSB8fCBwcm9wb2dhdGU7XG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMiwgeikgfHwgcHJvcG9nYXRlO1xuXG4gICAgaWYgKHByb3BvZ2F0ZSkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5fY29tcG9uZW50cztcbiAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICB2YXIgaXRlbTtcbiAgICAgICAgeCA9IHZlYzNbMF07XG4gICAgICAgIHkgPSB2ZWMzWzFdO1xuICAgICAgICB6ID0gdmVjM1syXTtcbiAgICAgICAgZm9yICg7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5vblBvc2l0aW9uQ2hhbmdlKSBpdGVtLm9uUG9zaXRpb25DaGFuZ2UoeCwgeSwgeik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgcm90YXRpb24gb2YgdGhlIG5vZGUuIFdpbGwgY2FsbCBvblJvdGF0aW9uQ2hhbmdlXG4gKiBvbiBhbGwgb2YgdGhlIG5vZGUncyBjb21wb25lbnRzLiBUaGlzIG1ldGhvZCB0YWtlcyBlaXRoZXJcbiAqIEV1bGVyIGFuZ2xlcyBvciBhIHF1YXRlcm5pb24uIElmIHRoZSBmb3VydGggYXJndW1lbnQgaXMgdW5kZWZpbmVkXG4gKiBFdWxlciBhbmdsZXMgYXJlIGFzc3VtZWQuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IEVpdGhlciB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB4IGF4aXMgb3IgdGhlIG1hZ25pdHVkZSBpbiB4IG9mIHRoZSBheGlzIG9mIHJvdGF0aW9uLlxuICogQHBhcmFtIHtOdW1iZXJ9IHkgRWl0aGVyIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHkgYXhpcyBvciB0aGUgbWFnbml0dWRlIGluIHkgb2YgdGhlIGF4aXMgb2Ygcm90YXRpb24uXG4gKiBAcGFyYW0ge051bWJlcn0geiBFaXRoZXIgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeiBheGlzIG9yIHRoZSBtYWduaXR1ZGUgaW4geiBvZiB0aGUgYXhpcyBvZiByb3RhdGlvbi5cbiAqIEBwYXJhbSB7TnVtYmVyfHVuZGVmaW5lZH0gdyB0aGUgYW1vdW50IG9mIHJvdGF0aW9uIGFyb3VuZCB0aGUgYXhpcyBvZiByb3RhdGlvbiwgaWYgYSBxdWF0ZXJuaW9uIGlzIHNwZWNpZmllZC5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5Ob2RlLnByb3RvdHlwZS5zZXRSb3RhdGlvbiA9IGZ1bmN0aW9uIHNldFJvdGF0aW9uICh4LCB5LCB6LCB3KSB7XG4gICAgdmFyIHF1YXQgPSB0aGlzLnZhbHVlLnZlY3RvcnMucm90YXRpb247XG4gICAgdmFyIHByb3BvZ2F0ZSA9IGZhbHNlO1xuICAgIHZhciBxeCwgcXksIHF6LCBxdztcblxuICAgIGlmICh3ICE9IG51bGwpIHtcbiAgICAgICAgcXggPSB4O1xuICAgICAgICBxeSA9IHk7XG4gICAgICAgIHF6ID0gejtcbiAgICAgICAgcXcgPSB3O1xuICAgICAgICB0aGlzLl9sYXN0RXVsZXJYID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdEV1bGVyWSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xhc3RFdWxlclogPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0RXVsZXIgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh4ID09IG51bGwgfHwgeSA9PSBudWxsIHx8IHogPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3RFdWxlcikge1xuICAgICAgICAgICAgICAgIHggPSB4ID09IG51bGwgPyB0aGlzLl9sYXN0RXVsZXJYIDogeDtcbiAgICAgICAgICAgICAgICB5ID0geSA9PSBudWxsID8gdGhpcy5fbGFzdEV1bGVyWSA6IHk7XG4gICAgICAgICAgICAgICAgeiA9IHogPT0gbnVsbCA/IHRoaXMuX2xhc3RFdWxlclogOiB6O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNwID0gLTIgKiAocXVhdFsxXSAqIHF1YXRbMl0gLSBxdWF0WzNdICogcXVhdFswXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoc3ApID4gMC45OTk5OSkge1xuICAgICAgICAgICAgICAgICAgICB5ID0geSA9PSBudWxsID8gTWF0aC5QSSAqIDAuNSAqIHNwIDogeTtcbiAgICAgICAgICAgICAgICAgICAgeCA9IHggPT0gbnVsbCA/IE1hdGguYXRhbjIoLXF1YXRbMF0gKiBxdWF0WzJdICsgcXVhdFszXSAqIHF1YXRbMV0sIDAuNSAtIHF1YXRbMV0gKiBxdWF0WzFdIC0gcXVhdFsyXSAqIHF1YXRbMl0pIDogeDtcbiAgICAgICAgICAgICAgICAgICAgeiA9IHogPT0gbnVsbCA/IDAgOiB6O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeSA9IHkgPT0gbnVsbCA/IE1hdGguYXNpbihzcCkgOiB5O1xuICAgICAgICAgICAgICAgICAgICB4ID0geCA9PSBudWxsID8gTWF0aC5hdGFuMihxdWF0WzBdICogcXVhdFsyXSArIHF1YXRbM10gKiBxdWF0WzFdLCAwLjUgLSBxdWF0WzBdICogcXVhdFswXSAtIHF1YXRbMV0gKiBxdWF0WzFdKSA6IHg7XG4gICAgICAgICAgICAgICAgICAgIHogPSB6ID09IG51bGwgPyBNYXRoLmF0YW4yKHF1YXRbMF0gKiBxdWF0WzFdICsgcXVhdFszXSAqIHF1YXRbMl0sIDAuNSAtIHF1YXRbMF0gKiBxdWF0WzBdIC0gcXVhdFsyXSAqIHF1YXRbMl0pIDogejtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaHggPSB4ICogMC41O1xuICAgICAgICB2YXIgaHkgPSB5ICogMC41O1xuICAgICAgICB2YXIgaHogPSB6ICogMC41O1xuXG4gICAgICAgIHZhciBzeCA9IE1hdGguc2luKGh4KTtcbiAgICAgICAgdmFyIHN5ID0gTWF0aC5zaW4oaHkpO1xuICAgICAgICB2YXIgc3ogPSBNYXRoLnNpbihoeik7XG4gICAgICAgIHZhciBjeCA9IE1hdGguY29zKGh4KTtcbiAgICAgICAgdmFyIGN5ID0gTWF0aC5jb3MoaHkpO1xuICAgICAgICB2YXIgY3ogPSBNYXRoLmNvcyhoeik7XG5cbiAgICAgICAgdmFyIHN5c3ogPSBzeSAqIHN6O1xuICAgICAgICB2YXIgY3lzeiA9IGN5ICogc3o7XG4gICAgICAgIHZhciBzeWN6ID0gc3kgKiBjejtcbiAgICAgICAgdmFyIGN5Y3ogPSBjeSAqIGN6O1xuXG4gICAgICAgIHF4ID0gc3ggKiBjeWN6ICsgY3ggKiBzeXN6O1xuICAgICAgICBxeSA9IGN4ICogc3ljeiAtIHN4ICogY3lzejtcbiAgICAgICAgcXogPSBjeCAqIGN5c3ogKyBzeCAqIHN5Y3o7XG4gICAgICAgIHF3ID0gY3ggKiBjeWN6IC0gc3ggKiBzeXN6O1xuXG4gICAgICAgIHRoaXMuX2xhc3RFdWxlciA9IHRydWU7XG4gICAgICAgIHRoaXMuX2xhc3RFdWxlclggPSB4O1xuICAgICAgICB0aGlzLl9sYXN0RXVsZXJZID0geTtcbiAgICAgICAgdGhpcy5fbGFzdEV1bGVyWiA9IHo7XG4gICAgfVxuXG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQocXVhdCwgMCwgcXgpIHx8IHByb3BvZ2F0ZTtcbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldChxdWF0LCAxLCBxeSkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHF1YXQsIDIsIHF6KSB8fCBwcm9wb2dhdGU7XG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQocXVhdCwgMywgcXcpIHx8IHByb3BvZ2F0ZTtcblxuICAgIGlmIChwcm9wb2dhdGUpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIHggPSBxdWF0WzBdO1xuICAgICAgICB5ID0gcXVhdFsxXTtcbiAgICAgICAgeiA9IHF1YXRbMl07XG4gICAgICAgIHcgPSBxdWF0WzNdO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uUm90YXRpb25DaGFuZ2UpIGl0ZW0ub25Sb3RhdGlvbkNoYW5nZSh4LCB5LCB6LCB3KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgc2NhbGUgb2YgdGhlIG5vZGUuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDEgaW4gYWxsIGRpbWVuc2lvbnMuXG4gKiBUaGUgbm9kZSdzIGNvbXBvbmVudHMgd2lsbCBoYXZlIG9uU2NhbGVDaGFuZ2VkIGNhbGxlZCBvbiB0aGVtLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBTY2FsZSB2YWx1ZSBpbiB4XG4gKiBAcGFyYW0ge051bWJlcn0geSBTY2FsZSB2YWx1ZSBpbiB5XG4gKiBAcGFyYW0ge051bWJlcn0geiBTY2FsZSB2YWx1ZSBpbiB6XG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5zZXRTY2FsZSA9IGZ1bmN0aW9uIHNldFNjYWxlICh4LCB5LCB6KSB7XG4gICAgdmFyIHZlYzMgPSB0aGlzLnZhbHVlLnZlY3RvcnMuc2NhbGU7XG4gICAgdmFyIHByb3BvZ2F0ZSA9IGZhbHNlO1xuXG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMCwgeCkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDEsIHkpIHx8IHByb3BvZ2F0ZTtcbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAyLCB6KSB8fCBwcm9wb2dhdGU7XG5cbiAgICBpZiAocHJvcG9nYXRlKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciBpdGVtO1xuICAgICAgICB4ID0gdmVjM1swXTtcbiAgICAgICAgeSA9IHZlYzNbMV07XG4gICAgICAgIHogPSB2ZWMzWzJdO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uU2NhbGVDaGFuZ2UpIGl0ZW0ub25TY2FsZUNoYW5nZSh4LCB5LCB6KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIG9wYWNpdHkgb2YgdGhpcyBub2RlLiBBbGwgb2YgdGhlIG5vZGUnc1xuICogY29tcG9uZW50cyB3aWxsIGhhdmUgb25PcGFjaXR5Q2hhbmdlIGNhbGxlZCBvbiB0aGVtL1xuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsIFZhbHVlIG9mIHRoZSBvcGFjaXR5LiAxIGlzIHRoZSBkZWZhdWx0LlxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUuc2V0T3BhY2l0eSA9IGZ1bmN0aW9uIHNldE9wYWNpdHkgKHZhbCkge1xuICAgIGlmICh2YWwgIT09IHRoaXMudmFsdWUuc2hvd1N0YXRlLm9wYWNpdHkpIHtcbiAgICAgICAgdGhpcy52YWx1ZS5zaG93U3RhdGUub3BhY2l0eSA9IHZhbDtcbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25PcGFjaXR5Q2hhbmdlKSBpdGVtLm9uT3BhY2l0eUNoYW5nZSh2YWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBzaXplIG1vZGUgYmVpbmcgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgdGhlIG5vZGVzIGZpbmFsIHdpZHRoLCBoZWlnaHRcbiAqIGFuZCBkZXB0aC5cbiAqIFNpemUgbW9kZXMgYXJlIGEgd2F5IHRvIGRlZmluZSB0aGUgd2F5IHRoZSBub2RlJ3Mgc2l6ZSBpcyBiZWluZyBjYWxjdWxhdGVkLlxuICogU2l6ZSBtb2RlcyBhcmUgZW51bXMgc2V0IG9uIHRoZSBAe0BsaW5rIFNpemV9IGNvbnN0cnVjdG9yIChhbmQgYWxpYXNlZCBvblxuICogdGhlIE5vZGUpLlxuICpcbiAqIEBleGFtcGxlXG4gKiBub2RlLnNldFNpemVNb2RlKE5vZGUuUkVMQVRJVkVfU0laRSwgTm9kZS5BQlNPTFVURV9TSVpFLCBOb2RlLkFCU09MVVRFX1NJWkUpO1xuICogLy8gSW5zdGVhZCBvZiBudWxsLCBhbnkgcHJvcG9yaW9uYWwgaGVpZ2h0IG9yIGRlcHRoIGNhbiBiZSBwYXNzZWQgaW4sIHNpbmNlXG4gKiAvLyBpdCB3b3VsZCBiZSBpZ25vcmVkIGluIGFueSBjYXNlLlxuICogbm9kZS5zZXRQcm9wb3J0aW9uYWxTaXplKDAuNSwgbnVsbCwgbnVsbCk7XG4gKiBub2RlLnNldEFic29sdXRlU2l6ZShudWxsLCAxMDAsIDIwMCk7XG4gKlxuICogQG1ldGhvZCBzZXRTaXplTW9kZVxuICpcbiAqIEBwYXJhbSB7U2l6ZU1vZGV9IHggICAgVGhlIHNpemUgbW9kZSBiZWluZyB1c2VkIGZvciBkZXRlcm1pbmluZyB0aGUgc2l6ZSBpblxuICogICAgICAgICAgICAgICAgICAgICAgICB4IGRpcmVjdGlvbiAoXCJ3aWR0aFwiKS5cbiAqIEBwYXJhbSB7U2l6ZU1vZGV9IHkgICAgVGhlIHNpemUgbW9kZSBiZWluZyB1c2VkIGZvciBkZXRlcm1pbmluZyB0aGUgc2l6ZSBpblxuICogICAgICAgICAgICAgICAgICAgICAgICB5IGRpcmVjdGlvbiAoXCJoZWlnaHRcIikuXG4gKiBAcGFyYW0ge1NpemVNb2RlfSB6ICAgIFRoZSBzaXplIG1vZGUgYmVpbmcgdXNlZCBmb3IgZGV0ZXJtaW5pbmcgdGhlIHNpemUgaW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgeiBkaXJlY3Rpb24gKFwiZGVwdGhcIikuXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5zZXRTaXplTW9kZSA9IGZ1bmN0aW9uIHNldFNpemVNb2RlICh4LCB5LCB6KSB7XG4gICAgdmFyIHZlYzMgPSB0aGlzLnZhbHVlLnNpemUuc2l6ZU1vZGU7XG4gICAgdmFyIHByb3BvZ2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHggIT0gbnVsbCkgcHJvcG9nYXRlID0gdGhpcy5fcmVzb2x2ZVNpemVNb2RlKHZlYzMsIDAsIHgpIHx8IHByb3BvZ2F0ZTtcbiAgICBpZiAoeSAhPSBudWxsKSBwcm9wb2dhdGUgPSB0aGlzLl9yZXNvbHZlU2l6ZU1vZGUodmVjMywgMSwgeSkgfHwgcHJvcG9nYXRlO1xuICAgIGlmICh6ICE9IG51bGwpIHByb3BvZ2F0ZSA9IHRoaXMuX3Jlc29sdmVTaXplTW9kZSh2ZWMzLCAyLCB6KSB8fCBwcm9wb2dhdGU7XG5cbiAgICBpZiAocHJvcG9nYXRlKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciBpdGVtO1xuICAgICAgICB4ID0gdmVjM1swXTtcbiAgICAgICAgeSA9IHZlYzNbMV07XG4gICAgICAgIHogPSB2ZWMzWzJdO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uU2l6ZU1vZGVDaGFuZ2UpIGl0ZW0ub25TaXplTW9kZUNoYW5nZSh4LCB5LCB6KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQSBwcm90ZWN0ZWQgbWV0aG9kIHRoYXQgcmVzb2x2ZXMgc3RyaW5nIHJlcHJlc2VudGF0aW9ucyBvZiBzaXplIG1vZGVcbiAqIHRvIG51bWVyaWMgdmFsdWVzIGFuZCBhcHBsaWVzIHRoZW0uXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZlYyB0aGUgYXJyYXkgdG8gd3JpdGUgc2l6ZSBtb2RlIHRvXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggdGhlIGluZGV4IHRvIHdyaXRlIHRvIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWwgdGhlIHZhbHVlIHRvIHdyaXRlXG4gKlxuICogQHJldHVybiB7Qm9vbH0gd2hldGhlciBvciBub3QgdGhlIHNpemVtb2RlIGhhcyBiZWVuIGNoYW5nZWQgZm9yIHRoaXMgaW5kZXguXG4gKi9cbk5vZGUucHJvdG90eXBlLl9yZXNvbHZlU2l6ZU1vZGUgPSBmdW5jdGlvbiBfcmVzb2x2ZVNpemVNb2RlICh2ZWMsIGluZGV4LCB2YWwpIHtcbiAgICBpZiAodmFsLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpIHtcbiAgICAgICAgc3dpdGNoICh2YWwudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgY2FzZSAncmVsYXRpdmUnOlxuICAgICAgICAgICAgY2FzZSAnZGVmYXVsdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYywgaW5kZXgsIDApO1xuICAgICAgICAgICAgY2FzZSAnYWJzb2x1dGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMsIGluZGV4LCAxKTtcbiAgICAgICAgICAgIGNhc2UgJ3JlbmRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYywgaW5kZXgsIDIpO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIHNpemUgbW9kZTogJyArIHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSByZXR1cm4gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjLCBpbmRleCwgdmFsKTtcbn07XG5cbi8qKlxuICogQSBwcm9wb3J0aW9uYWwgc2l6ZSBkZWZpbmVzIHRoZSBub2RlJ3MgZGltZW5zaW9ucyByZWxhdGl2ZSB0byBpdHMgcGFyZW50c1xuICogZmluYWwgc2l6ZS5cbiAqIFByb3BvcnRpb25hbCBzaXplcyBuZWVkIHRvIGJlIHdpdGhpbiB0aGUgcmFuZ2Ugb2YgWzAsIDFdLlxuICpcbiAqIEBtZXRob2Qgc2V0UHJvcG9ydGlvbmFsU2l6ZVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4ICAgIHgtU2l6ZSBpbiBwaXhlbHMgKFwid2lkdGhcIikuXG4gKiBAcGFyYW0ge051bWJlcn0geSAgICB5LVNpemUgaW4gcGl4ZWxzIChcImhlaWdodFwiKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB6ICAgIHotU2l6ZSBpbiBwaXhlbHMgKFwiZGVwdGhcIikuXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5zZXRQcm9wb3J0aW9uYWxTaXplID0gZnVuY3Rpb24gc2V0UHJvcG9ydGlvbmFsU2l6ZSAoeCwgeSwgeikge1xuICAgIHZhciB2ZWMzID0gdGhpcy52YWx1ZS5zaXplLnByb3BvcnRpb25hbDtcbiAgICB2YXIgcHJvcG9nYXRlID0gZmFsc2U7XG5cbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAwLCB4KSB8fCBwcm9wb2dhdGU7XG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMSwgeSkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDIsIHopIHx8IHByb3BvZ2F0ZTtcblxuICAgIGlmIChwcm9wb2dhdGUpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIHggPSB2ZWMzWzBdO1xuICAgICAgICB5ID0gdmVjM1sxXTtcbiAgICAgICAgeiA9IHZlYzNbMl07XG4gICAgICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25Qcm9wb3J0aW9uYWxTaXplQ2hhbmdlKSBpdGVtLm9uUHJvcG9ydGlvbmFsU2l6ZUNoYW5nZSh4LCB5LCB6KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGlmZmVyZW50aWFsIHNpemluZyBjYW4gYmUgdXNlZCB0byBhZGQgb3Igc3VidHJhY3QgYW4gYWJzb2x1dGUgc2l6ZSBmcm9tIGFcbiAqIG90aGVyd2lzZSBwcm9wb3J0aW9uYWxseSBzaXplZCBub2RlLlxuICogRS5nLiBhIGRpZmZlcmVudGlhbCB3aWR0aCBvZiBgLTEwYCBhbmQgYSBwcm9wb3J0aW9uYWwgd2lkdGggb2YgYDAuNWAgaXNcbiAqIGJlaW5nIGludGVycHJldGVkIGFzIHNldHRpbmcgdGhlIG5vZGUncyBzaXplIHRvIDUwJSBvZiBpdHMgcGFyZW50J3Mgd2lkdGhcbiAqICptaW51cyogMTAgcGl4ZWxzLlxuICpcbiAqIEBtZXRob2Qgc2V0RGlmZmVyZW50aWFsU2l6ZVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4ICAgIHgtU2l6ZSB0byBiZSBhZGRlZCB0byB0aGUgcmVsYXRpdmVseSBzaXplZCBub2RlIGluXG4gKiAgICAgICAgICAgICAgICAgICAgICBwaXhlbHMgKFwid2lkdGhcIikuXG4gKiBAcGFyYW0ge051bWJlcn0geSAgICB5LVNpemUgdG8gYmUgYWRkZWQgdG8gdGhlIHJlbGF0aXZlbHkgc2l6ZWQgbm9kZSBpblxuICogICAgICAgICAgICAgICAgICAgICAgcGl4ZWxzIChcImhlaWdodFwiKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB6ICAgIHotU2l6ZSB0byBiZSBhZGRlZCB0byB0aGUgcmVsYXRpdmVseSBzaXplZCBub2RlIGluXG4gKiAgICAgICAgICAgICAgICAgICAgICBwaXhlbHMgKFwiZGVwdGhcIikuXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5zZXREaWZmZXJlbnRpYWxTaXplID0gZnVuY3Rpb24gc2V0RGlmZmVyZW50aWFsU2l6ZSAoeCwgeSwgeikge1xuICAgIHZhciB2ZWMzID0gdGhpcy52YWx1ZS5zaXplLmRpZmZlcmVudGlhbDtcbiAgICB2YXIgcHJvcG9nYXRlID0gZmFsc2U7XG5cbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAwLCB4KSB8fCBwcm9wb2dhdGU7XG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMSwgeSkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDIsIHopIHx8IHByb3BvZ2F0ZTtcblxuICAgIGlmIChwcm9wb2dhdGUpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZW07XG4gICAgICAgIHggPSB2ZWMzWzBdO1xuICAgICAgICB5ID0gdmVjM1sxXTtcbiAgICAgICAgeiA9IHZlYzNbMl07XG4gICAgICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25EaWZmZXJlbnRpYWxTaXplQ2hhbmdlKSBpdGVtLm9uRGlmZmVyZW50aWFsU2l6ZUNoYW5nZSh4LCB5LCB6KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbm9kZXMgc2l6ZSBpbiBwaXhlbHMsIGluZGVwZW5kZW50IG9mIGl0cyBwYXJlbnQuXG4gKlxuICogQG1ldGhvZCBzZXRBYnNvbHV0ZVNpemVcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCAgICB4LVNpemUgaW4gcGl4ZWxzIChcIndpZHRoXCIpLlxuICogQHBhcmFtIHtOdW1iZXJ9IHkgICAgeS1TaXplIGluIHBpeGVscyAoXCJoZWlnaHRcIikuXG4gKiBAcGFyYW0ge051bWJlcn0geiAgICB6LVNpemUgaW4gcGl4ZWxzIChcImRlcHRoXCIpLlxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUuc2V0QWJzb2x1dGVTaXplID0gZnVuY3Rpb24gc2V0QWJzb2x1dGVTaXplICh4LCB5LCB6KSB7XG4gICAgdmFyIHZlYzMgPSB0aGlzLnZhbHVlLnNpemUuYWJzb2x1dGU7XG4gICAgdmFyIHByb3BvZ2F0ZSA9IGZhbHNlO1xuXG4gICAgcHJvcG9nYXRlID0gdGhpcy5fdmVjT3B0aW9uYWxTZXQodmVjMywgMCwgeCkgfHwgcHJvcG9nYXRlO1xuICAgIHByb3BvZ2F0ZSA9IHRoaXMuX3ZlY09wdGlvbmFsU2V0KHZlYzMsIDEsIHkpIHx8IHByb3BvZ2F0ZTtcbiAgICBwcm9wb2dhdGUgPSB0aGlzLl92ZWNPcHRpb25hbFNldCh2ZWMzLCAyLCB6KSB8fCBwcm9wb2dhdGU7XG5cbiAgICBpZiAocHJvcG9nYXRlKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciBpdGVtO1xuICAgICAgICB4ID0gdmVjM1swXTtcbiAgICAgICAgeSA9IHZlYzNbMV07XG4gICAgICAgIHogPSB2ZWMzWzJdO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uQWJzb2x1dGVTaXplQ2hhbmdlKSBpdGVtLm9uQWJzb2x1dGVTaXplQ2hhbmdlKHgsIHksIHopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBQcml2YXRlIG1ldGhvZCBmb3IgYWxlcnRpbmcgYWxsIGNvbXBvbmVudHMgYW5kIGNoaWxkcmVuIHRoYXRcbiAqIHRoaXMgbm9kZSdzIHRyYW5zZm9ybSBoYXMgY2hhbmdlZC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtGbG9hdDMyQXJyYXl9IHRyYW5zZm9ybSBUaGUgdHJhbnNmb3JtIHRoYXQgaGFzIGNoYW5nZWRcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5Ob2RlLnByb3RvdHlwZS5fdHJhbnNmb3JtQ2hhbmdlZCA9IGZ1bmN0aW9uIF90cmFuc2Zvcm1DaGFuZ2VkICh0cmFuc2Zvcm0pIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGl0ZW1zID0gdGhpcy5fY29tcG9uZW50cztcbiAgICB2YXIgbGVuID0gaXRlbXMubGVuZ3RoO1xuICAgIHZhciBpdGVtO1xuXG4gICAgZm9yICg7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uVHJhbnNmb3JtQ2hhbmdlKSBpdGVtLm9uVHJhbnNmb3JtQ2hhbmdlKHRyYW5zZm9ybSk7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgaXRlbXMgPSB0aGlzLl9jaGlsZHJlbjtcbiAgICBsZW4gPSBpdGVtcy5sZW5ndGg7XG5cbiAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25QYXJlbnRUcmFuc2Zvcm1DaGFuZ2UpIGl0ZW0ub25QYXJlbnRUcmFuc2Zvcm1DaGFuZ2UodHJhbnNmb3JtKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFByaXZhdGUgbWV0aG9kIGZvciBhbGVydGluZyBhbGwgY29tcG9uZW50cyBhbmQgY2hpbGRyZW4gdGhhdFxuICogdGhpcyBub2RlJ3Mgc2l6ZSBoYXMgY2hhbmdlZC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtGbG9hdDMyQXJyYXl9IHNpemUgdGhlIHNpemUgdGhhdCBoYXMgY2hhbmdlZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbk5vZGUucHJvdG90eXBlLl9zaXplQ2hhbmdlZCA9IGZ1bmN0aW9uIF9zaXplQ2hhbmdlZCAoc2l6ZSkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaXRlbXMgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgIHZhciBsZW4gPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIGl0ZW07XG5cbiAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25TaXplQ2hhbmdlKSBpdGVtLm9uU2l6ZUNoYW5nZShzaXplKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBpdGVtcyA9IHRoaXMuX2NoaWxkcmVuO1xuICAgIGxlbiA9IGl0ZW1zLmxlbmd0aDtcblxuICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5vblBhcmVudFNpemVDaGFuZ2UpIGl0ZW0ub25QYXJlbnRTaXplQ2hhbmdlKHNpemUpO1xuICAgIH1cbn07XG5cbi8qKlxuICogTWV0aG9kIGZvciBnZXR0aW5nIHRoZSBjdXJyZW50IGZyYW1lLiBXaWxsIGJlIGRlcHJpY2F0ZWQuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gY3VycmVudCBmcmFtZVxuICovXG5Ob2RlLnByb3RvdHlwZS5nZXRGcmFtZSA9IGZ1bmN0aW9uIGdldEZyYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2xvYmFsVXBkYXRlci5nZXRGcmFtZSgpO1xufTtcblxuLyoqXG4gKiByZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBjb21wb25lbnRzIGN1cnJlbnRseSBhdHRhY2hlZCB0byB0aGlzXG4gKiBub2RlLlxuICpcbiAqIEBtZXRob2QgZ2V0Q29tcG9uZW50c1xuICpcbiAqIEByZXR1cm4ge0FycmF5fSBsaXN0IG9mIGNvbXBvbmVudHMuXG4gKi9cbk5vZGUucHJvdG90eXBlLmdldENvbXBvbmVudHMgPSBmdW5jdGlvbiBnZXRDb21wb25lbnRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cztcbn07XG5cbi8qKlxuICogRW50ZXJzIHRoZSBub2RlJ3MgdXBkYXRlIHBoYXNlIHdoaWxlIHVwZGF0aW5nIGl0cyBvd24gc3BlYyBhbmQgdXBkYXRpbmcgaXRzIGNvbXBvbmVudHMuXG4gKlxuICogQG1ldGhvZCB1cGRhdGVcbiAqXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHRpbWUgICAgaGlnaC1yZXNvbHV0aW9uIHRpbXN0YW1wLCB1c3VhbGx5IHJldHJpZXZlZCB1c2luZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlICh0aW1lKXtcbiAgICB0aGlzLl9pblVwZGF0ZSA9IHRydWU7XG4gICAgdmFyIG5leHRRdWV1ZSA9IHRoaXMuX25leHRVcGRhdGVRdWV1ZTtcbiAgICB2YXIgcXVldWUgPSB0aGlzLl91cGRhdGVRdWV1ZTtcbiAgICB2YXIgaXRlbTtcblxuICAgIHdoaWxlIChuZXh0UXVldWUubGVuZ3RoKSBxdWV1ZS51bnNoaWZ0KG5leHRRdWV1ZS5wb3AoKSk7XG5cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGl0ZW0gPSB0aGlzLl9jb21wb25lbnRzW3F1ZXVlLnNoaWZ0KCldO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uVXBkYXRlKSBpdGVtLm9uVXBkYXRlKHRpbWUpO1xuICAgIH1cblxuICAgIHZhciBteVNpemUgPSB0aGlzLmdldFNpemUoKTtcbiAgICB2YXIgbXlUcmFuc2Zvcm0gPSB0aGlzLmdldFRyYW5zZm9ybSgpO1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgIHZhciBwYXJlbnRTaXplID0gcGFyZW50LmdldFNpemUoKTtcbiAgICB2YXIgcGFyZW50VHJhbnNmb3JtID0gcGFyZW50LmdldFRyYW5zZm9ybSgpO1xuICAgIHZhciBzaXplQ2hhbmdlZCA9IFNJWkVfUFJPQ0VTU09SLmZyb21TcGVjV2l0aFBhcmVudChwYXJlbnRTaXplLCB0aGlzLCBteVNpemUpO1xuXG4gICAgdmFyIHRyYW5zZm9ybUNoYW5nZWQgPSBUUkFOU0ZPUk1fUFJPQ0VTU09SLmZyb21TcGVjV2l0aFBhcmVudChwYXJlbnRUcmFuc2Zvcm0sIHRoaXMudmFsdWUsIG15U2l6ZSwgcGFyZW50U2l6ZSwgbXlUcmFuc2Zvcm0pO1xuICAgIGlmICh0cmFuc2Zvcm1DaGFuZ2VkKSB0aGlzLl90cmFuc2Zvcm1DaGFuZ2VkKG15VHJhbnNmb3JtKTtcbiAgICBpZiAoc2l6ZUNoYW5nZWQpIHRoaXMuX3NpemVDaGFuZ2VkKG15U2l6ZSk7XG5cbiAgICB0aGlzLl9pblVwZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5pc01vdW50ZWQoKSkge1xuICAgICAgICAvLyBsYXN0IHVwZGF0ZVxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnZhbHVlLmxvY2F0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZ2xvYmFsVXBkYXRlciA9IG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuX25leHRVcGRhdGVRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fZ2xvYmFsVXBkYXRlci5yZXF1ZXN0VXBkYXRlT25OZXh0VGljayh0aGlzKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNb3VudHMgdGhlIG5vZGUgYW5kIHRoZXJlZm9yZSBpdHMgc3VidHJlZSBieSBzZXR0aW5nIGl0IGFzIGEgY2hpbGQgb2YgdGhlXG4gKiBwYXNzZWQgaW4gcGFyZW50LlxuICpcbiAqIEBtZXRob2QgbW91bnRcbiAqXG4gKiBAcGFyYW0gIHtOb2RlfSBwYXJlbnQgICAgcGFyZW50IG5vZGVcbiAqIEBwYXJhbSAge1N0cmluZ30gbXlJZCAgICBwYXRoIHRvIG5vZGUgKGUuZy4gYGJvZHkvMC8xYClcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24gbW91bnQgKHBhcmVudCwgbXlJZCkge1xuICAgIGlmICh0aGlzLmlzTW91bnRlZCgpKSByZXR1cm4gdGhpcztcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxpc3QgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICB2YXIgaXRlbTtcblxuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9nbG9iYWxVcGRhdGVyID0gcGFyZW50LmdldFVwZGF0ZXIoKTtcbiAgICB0aGlzLnZhbHVlLmxvY2F0aW9uID0gbXlJZDtcbiAgICB0aGlzLnZhbHVlLnNob3dTdGF0ZS5tb3VudGVkID0gdHJ1ZTtcblxuICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uTW91bnQpIGl0ZW0ub25Nb3VudCh0aGlzLCBpKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsaXN0ID0gdGhpcy5fY2hpbGRyZW47XG4gICAgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgZm9yICg7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25QYXJlbnRNb3VudCkgaXRlbS5vblBhcmVudE1vdW50KHRoaXMsIG15SWQsIGkpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSh0cnVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGlzbW91bnRzIChkZXRhY2hlcykgdGhlIG5vZGUgZnJvbSB0aGUgc2NlbmUgZ3JhcGggYnkgcmVtb3ZpbmcgaXQgYXMgYVxuICogY2hpbGQgb2YgaXRzIHBhcmVudC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5kaXNtb3VudCA9IGZ1bmN0aW9uIGRpc21vdW50ICgpIHtcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpIHJldHVybiB0aGlzO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGlzdCA9IHRoaXMuX2NvbXBvbmVudHM7XG4gICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIHZhciBpdGVtO1xuXG4gICAgdGhpcy52YWx1ZS5zaG93U3RhdGUubW91bnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuXG4gICAgZm9yICg7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub25EaXNtb3VudCkgaXRlbS5vbkRpc21vdW50KCk7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGlzdCA9IHRoaXMuX2NoaWxkcmVuO1xuICAgIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm9uUGFyZW50RGlzbW91bnQpIGl0ZW0ub25QYXJlbnREaXNtb3VudCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGJ5IHRoZSBwYXJlbnQgYXMgc29vbiBhcyB0aGUgcGFyZW50IGlzXG4gKiBiZWluZyBtb3VudGVkLlxuICpcbiAqIEBtZXRob2Qgb25QYXJlbnRNb3VudFxuICpcbiAqIEBwYXJhbSAge05vZGV9IHBhcmVudCAgICAgICAgVGhlIHBhcmVudCBub2RlLlxuICogQHBhcmFtICB7U3RyaW5nfSBwYXJlbnRJZCAgICBUaGUgcGFyZW50IGlkIChwYXRoIHRvIHBhcmVudCkuXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGluZGV4ICAgICAgIElkIHRoZSBub2RlIHNob3VsZCBiZSBtb3VudGVkIHRvLlxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUub25QYXJlbnRNb3VudCA9IGZ1bmN0aW9uIG9uUGFyZW50TW91bnQgKHBhcmVudCwgcGFyZW50SWQsIGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMubW91bnQocGFyZW50LCBwYXJlbnRJZCArICcvJyArIGluZGV4KTtcbn07XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBieSB0aGUgcGFyZW50IGFzIHNvb24gYXMgdGhlIHBhcmVudCBpcyBiZWluZ1xuICogdW5tb3VudGVkLlxuICpcbiAqIEBtZXRob2Qgb25QYXJlbnREaXNtb3VudFxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUub25QYXJlbnREaXNtb3VudCA9IGZ1bmN0aW9uIG9uUGFyZW50RGlzbW91bnQgKCkge1xuICAgIHJldHVybiB0aGlzLmRpc21vdW50KCk7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gZGlzcGF0Y2ggYW4gZXZlbnQgdG8gdGhlIG5vZGUgYW5kIGFsbCBpdHNcbiAqIGNvbXBvbmVudHMuIE5vdGUgdGhhdCB0aGlzIGRvZXNuJ3QgcmVjdXJzZSB0aGUgc3VidHJlZS5cbiAqXG4gKiBAbWV0aG9kIHJlY2VpdmVcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGUgICBUaGUgZXZlbnQgdHlwZSAoZS5nLiBcImNsaWNrXCIpLlxuICogQHBhcmFtICB7T2JqZWN0fSBldiAgICAgVGhlIGV2ZW50IHBheWxvYWQgb2JqZWN0IHRvIGJlIGRpc3BhdGNoZWQuXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5yZWNlaXZlID0gZnVuY3Rpb24gcmVjZWl2ZSAodHlwZSwgZXYpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxpc3QgPSB0aGlzLl9jb21wb25lbnRzO1xuICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICB2YXIgaXRlbTtcbiAgICBmb3IgKDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5vblJlY2VpdmUpIGl0ZW0ub25SZWNlaXZlKHR5cGUsIGV2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogUHJpdmF0ZSBtZXRob2QgdG8gYXZvaWQgYWNjaWRlbnRhbGx5IHBhc3NpbmcgYXJndW1lbnRzXG4gKiB0byB1cGRhdGUgZXZlbnRzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5Ob2RlLnByb3RvdHlwZS5fcmVxdWVzdFVwZGF0ZVdpdGhvdXRBcmdzID0gZnVuY3Rpb24gX3JlcXVlc3RVcGRhdGVXaXRob3V0QXJncyAoKSB7XG4gICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XG59O1xuXG4vKipcbiAqIEEgbWV0aG9kIHRvIGV4ZWN1dGUgbG9naWMgb24gdXBkYXRlLiBEZWZhdWx0cyB0byB0aGVcbiAqIG5vZGUncyAudXBkYXRlIG1ldGhvZC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGN1cnJlbnQgdGltZVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbk5vZGUucHJvdG90eXBlLm9uVXBkYXRlID0gTm9kZS5wcm90b3R5cGUudXBkYXRlO1xuXG4vKipcbiAqIEEgbWV0aG9kIHRvIGV4ZWN1dGUgbG9naWMgd2hlbiBhIHBhcmVudCBub2RlIGlzIHNob3duLiBEZWxlZ2F0ZXNcbiAqIHRvIE5vZGUuc2hvdy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5vblBhcmVudFNob3cgPSBOb2RlLnByb3RvdHlwZS5zaG93O1xuXG4vKipcbiAqIEEgbWV0aG9kIHRvIGV4ZWN1dGUgbG9naWMgd2hlbiB0aGUgcGFyZW50IGlzIGhpZGRlbi4gRGVsZWdhdGVzXG4gKiB0byBOb2RlLmhpZGUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUub25QYXJlbnRIaWRlID0gTm9kZS5wcm90b3R5cGUuaGlkZTtcblxuLyoqXG4gKiBBIG1ldGhvZCB0byBleGVjdXRlIGxvZ2ljIHdoZW4gdGhlIHBhcmVudCB0cmFuc2Zvcm0gY2hhbmdlcy5cbiAqIERlbGVnYXRlcyB0byBOb2RlLl9yZXF1ZXN0VXBkYXRlV2l0aG91dEFyZ3MuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbk5vZGUucHJvdG90eXBlLm9uUGFyZW50VHJhbnNmb3JtQ2hhbmdlID0gTm9kZS5wcm90b3R5cGUuX3JlcXVlc3RVcGRhdGVXaXRob3V0QXJncztcblxuLyoqXG4gKiBBIG1ldGhvZCB0byBleGVjdXRlIGxvZ2ljIHdoZW4gdGhlIHBhcmVudCBzaXplIGNoYW5nZXMuXG4gKiBEZWxlZ2F0ZXMgdG8gTm9kZS5fcmVxdWVzdFVwZGF0ZVdJdGhvdXRBcmdzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5Ob2RlLnByb3RvdHlwZS5vblBhcmVudFNpemVDaGFuZ2UgPSBOb2RlLnByb3RvdHlwZS5fcmVxdWVzdFVwZGF0ZVdpdGhvdXRBcmdzO1xuXG4vKipcbiAqIEEgbWV0aG9kIHRvIGV4ZWN1dGUgbG9naWMgd2hlbiB0aGUgbm9kZSBzb21ldGhpbmcgd2FudHNcbiAqIHRvIHNob3cgdGhlIG5vZGUuIERlbGVnYXRlcyB0byBOb2RlLnNob3cuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge05vZGV9IHRoaXNcbiAqL1xuTm9kZS5wcm90b3R5cGUub25TaG93ID0gTm9kZS5wcm90b3R5cGUuc2hvdztcblxuLyoqXG4gKiBBIG1ldGhvZCB0byBleGVjdXRlIGxvZ2ljIHdoZW4gc29tZXRoaW5nIHdhbnRzIHRvIGhpZGUgdGhpc1xuICogbm9kZS4gRGVsZWdhdGVzIHRvIE5vZGUuaGlkZS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5vbkhpZGUgPSBOb2RlLnByb3RvdHlwZS5oaWRlO1xuXG4vKipcbiAqIEEgbWV0aG9kIHdoaWNoIGNhbiBleGVjdXRlIGxvZ2ljIHdoZW4gdGhpcyBub2RlIGlzIGFkZGVkIHRvXG4gKiB0byB0aGUgc2NlbmUgZ3JhcGguIERlbGVnYXRlcyB0byBtb3VudC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Tm9kZX0gdGhpc1xuICovXG5Ob2RlLnByb3RvdHlwZS5vbk1vdW50ID0gTm9kZS5wcm90b3R5cGUubW91bnQ7XG5cbi8qKlxuICogQSBtZXRob2Qgd2hpY2ggY2FuIGV4ZWN1dGUgbG9naWMgd2hlbiB0aGlzIG5vZGUgaXMgcmVtb3ZlZCBmcm9tXG4gKiB0aGUgc2NlbmUgZ3JhcGguIERlbGVnYXRlcyB0byBOb2RlLmRpc21vdW50LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfSB0aGlzXG4gKi9cbk5vZGUucHJvdG90eXBlLm9uRGlzbW91bnQgPSBOb2RlLnByb3RvdHlwZS5kaXNtb3VudDtcblxuLyoqXG4gKiBBIG1ldGhvZCB3aGljaCBjYW4gZXhlY3V0ZSBsb2dpYyB3aGVuIHRoaXMgbm9kZSByZWNlaXZlc1xuICogYW4gZXZlbnQgZnJvbSB0aGUgc2NlbmUgZ3JhcGguIERlbGVnYXRlcyB0byBOb2RlLnJlY2VpdmUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbk5vZGUucHJvdG90eXBlLm9uUmVjZWl2ZSA9IE5vZGUucHJvdG90eXBlLnJlY2VpdmU7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZTtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKmpzaGludCAtVzA3OSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBEaXNwYXRjaCA9IHJlcXVpcmUoJy4vRGlzcGF0Y2gnKTtcbnZhciBOb2RlID0gcmVxdWlyZSgnLi9Ob2RlJyk7XG52YXIgU2l6ZSA9IHJlcXVpcmUoJy4vU2l6ZScpO1xuXG4vKipcbiAqIFNjZW5lIGlzIHRoZSBib3R0b20gb2YgdGhlIHNjZW5lIGdyYXBoLiBJdCBpcyBpdCdzIG93blxuICogcGFyZW50IGFuZCBwcm92aWRlcyB0aGUgZ2xvYmFsIHVwZGF0ZXIgdG8gdGhlIHNjZW5lIGdyYXBoLlxuICpcbiAqIEBjbGFzcyBTY2VuZVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIGEgc3RyaW5nIHdoaWNoIGlzIGEgZG9tIHNlbGVjdG9yXG4gKiAgICAgICAgICAgICAgICAgc2lnbmlmeWluZyB3aGljaCBkb20gZWxlbWVudCB0aGUgY29udGV4dFxuICogICAgICAgICAgICAgICAgIHNob3VsZCBiZSBzZXQgdXBvblxuICogQHBhcmFtIHtGYW1vdXN9IHVwZGF0ZXIgYSBjbGFzcyB3aGljaCBjb25mb3JtcyB0byBGYW1vdXMnIGludGVyZmFjZVxuICogICAgICAgICAgICAgICAgIGl0IG5lZWRzIHRvIGJlIGFibGUgdG8gc2VuZCBtZXRob2RzIHRvXG4gKiAgICAgICAgICAgICAgICAgdGhlIHJlbmRlcmVycyBhbmQgdXBkYXRlIG5vZGVzIGluIHRoZSBzY2VuZSBncmFwaFxuICovXG5mdW5jdGlvbiBTY2VuZSAoc2VsZWN0b3IsIHVwZGF0ZXIpIHtcbiAgICBpZiAoIXNlbGVjdG9yKSB0aHJvdyBuZXcgRXJyb3IoJ1NjZW5lIG5lZWRzIHRvIGJlIGNyZWF0ZWQgd2l0aCBhIERPTSBzZWxlY3RvcicpO1xuICAgIGlmICghdXBkYXRlcikgdGhyb3cgbmV3IEVycm9yKCdTY2VuZSBuZWVkcyB0byBiZSBjcmVhdGVkIHdpdGggYSBjbGFzcyBsaWtlIEZhbW91cycpO1xuXG4gICAgTm9kZS5jYWxsKHRoaXMpOyAgICAgICAgIC8vIFNjZW5lIGluaGVyaXRzIGZyb20gbm9kZVxuXG4gICAgdGhpcy5fdXBkYXRlciA9IHVwZGF0ZXI7IC8vIFRoZSB1cGRhdGVyIHRoYXQgd2lsbCBib3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgbWVzc2FnZXMgdG8gdGhlIHJlbmRlcmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdXBkYXRlIGRpcnR5IG5vZGVzIFxuXG4gICAgdGhpcy5fZGlzcGF0Y2ggPSBuZXcgRGlzcGF0Y2godGhpcyk7IC8vIGluc3RhbnRpYXRlcyBhIGRpc3BhdGNoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gc2VuZCBldmVudHMgdG8gdGhlIHNjZW5lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyYXBoIGJlbG93IHRoaXMgY29udGV4dFxuICAgIFxuICAgIHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3I7IC8vIHJlZmVyZW5jZSB0byB0aGUgRE9NIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCByZXByZXNlbnRzIHRoZSBlbGVtbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHRoZSBkb20gdGhhdCB0aGlzIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmhhYml0c1xuXG4gICAgdGhpcy5vbk1vdW50KHRoaXMsIHNlbGVjdG9yKTsgLy8gTW91bnQgdGhlIGNvbnRleHQgdG8gaXRzZWxmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKGl0IGlzIGl0cyBvd24gcGFyZW50KVxuICAgIFxuICAgIHRoaXMuX3VwZGF0ZXIgICAgICAgICAgICAgICAgICAvLyBtZXNzYWdlIGEgcmVxdWVzdCBmb3IgdGhlIGRvbVxuICAgICAgICAubWVzc2FnZSgnTkVFRF9TSVpFX0ZPUicpICAvLyBzaXplIG9mIHRoZSBjb250ZXh0IHNvIHRoYXRcbiAgICAgICAgLm1lc3NhZ2Uoc2VsZWN0b3IpOyAgICAgICAgLy8gdGhlIHNjZW5lIGdyYXBoIGhhcyBhIHRvdGFsIHNpemVcblxuICAgIHRoaXMuc2hvdygpOyAvLyB0aGUgY29udGV4dCBiZWdpbnMgc2hvd24gKGl0J3MgYWxyZWFkeSBwcmVzZW50IGluIHRoZSBkb20pXG5cbn1cblxuLy8gU2NlbmUgaW5oZXJpdHMgZnJvbSBub2RlXG5TY2VuZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE5vZGUucHJvdG90eXBlKTtcblNjZW5lLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNjZW5lO1xuXG4vKipcbiAqIFNjZW5lIGdldFVwZGF0ZXIgZnVuY3Rpb24gcmV0dXJucyB0aGUgcGFzc2VkIGluIHVwZGF0ZXJcbiAqXG4gKiBAcmV0dXJuIHtGYW1vdXN9IHRoZSB1cGRhdGVyIGZvciB0aGlzIFNjZW5lXG4gKi9cblNjZW5lLnByb3RvdHlwZS5nZXRVcGRhdGVyID0gZnVuY3Rpb24gZ2V0VXBkYXRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0ZXI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHNlbGVjdG9yIHRoYXQgdGhlIGNvbnRleHQgd2FzIGluc3RhbnRpYXRlZCB3aXRoXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBkb20gc2VsZWN0b3JcbiAqL1xuU2NlbmUucHJvdG90eXBlLmdldFNlbGVjdG9yID0gZnVuY3Rpb24gZ2V0U2VsZWN0b3IgKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rvcjtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZGlzcGF0Y2hlciBvZiB0aGUgY29udGV4dC4gVXNlZCB0byBzZW5kIGV2ZW50c1xuICogdG8gdGhlIG5vZGVzIGluIHRoZSBzY2VuZSBncmFwaC5cbiAqXG4gKiBAcmV0dXJuIHtEaXNwYXRjaH0gdGhlIFNjZW5lJ3MgRGlzcGF0Y2hcbiAqL1xuU2NlbmUucHJvdG90eXBlLmdldERpc3BhdGNoID0gZnVuY3Rpb24gZ2V0RGlzcGF0Y2ggKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaDtcbn07XG5cbi8qKlxuICogUmVjZWl2ZXMgYW4gZXZlbnQuIElmIHRoZSBldmVudCBpcyAnQ09OVEVYVF9SRVNJWkUnIGl0IHNldHMgdGhlIHNpemUgb2YgdGhlIHNjZW5lXG4gKiBncmFwaCB0byB0aGUgcGF5bG9hZCwgd2hpY2ggbXVzdCBiZSBhbiBhcnJheSBvZiBudW1iZXJzIG9mIGF0IGxlYXN0XG4gKiBsZW5ndGggdGhyZWUgcmVwcmVzZW50aW5nIHRoZSBwaXhlbCBzaXplIGluIDMgZGltZW5zaW9ucy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgdGhlIG5hbWUgb2YgdGhlIGV2ZW50IGJlaW5nIHJlY2VpdmVkXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgdGhlIG9iamVjdCBiZWluZyBzZW50XG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuU2NlbmUucHJvdG90eXBlLm9uUmVjZWl2ZSA9IGZ1bmN0aW9uIG9uUmVjZWl2ZSAoZXZlbnQsIHBheWxvYWQpIHtcbiAgICAvLyBUT0RPOiBJbiB0aGUgZnV0dXJlIHRoZSBkb20gZWxlbWVudCB0aGF0IHRoZSBjb250ZXh0IGlzIGF0dGFjaGVkIHRvXG4gICAgLy8gc2hvdWxkIGhhdmUgYSByZXByZXNlbnRhdGlvbiBhcyBhIGNvbXBvbmVudC4gSXQgd291bGQgYmUgcmVuZGVyIHNpemVkXG4gICAgLy8gYW5kIHRoZSBjb250ZXh0IHdvdWxkIHJlY2VpdmUgaXRzIHNpemUgdGhlIHNhbWUgd2F5IHRoYXQgYW55IHJlbmRlciBzaXplXG4gICAgLy8gY29tcG9uZW50IHJlY2VpdmVzIGl0cyBzaXplLlxuICAgIGlmIChldmVudCA9PT0gJ0NPTlRFWFRfUkVTSVpFJykge1xuICAgICAgICBcbiAgICAgICAgaWYgKHBheWxvYWQubGVuZ3RoIDwgMikgXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdDT05URVhUX1JFU0laRVxcJ3MgcGF5bG9hZCBuZWVkcyB0byBiZSBhdCBsZWFzdCBhIHBhaXInICtcbiAgICAgICAgICAgICAgICAgICAgJyBvZiBwaXhlbCBzaXplcydcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZXRTaXplTW9kZShTaXplLkFCU09MVVRFLCBTaXplLkFCU09MVVRFLCBTaXplLkFCU09MVVRFKTtcbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZVNpemUocGF5bG9hZFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFsyXSA/IHBheWxvYWRbMl0gOiAwKTtcblxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmU7XG5cbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlIFNpemUgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIHByb2Nlc3NpbmcgU2l6ZSBmcm9tIGEgbm9kZVxuICogQGNvbnN0cnVjdG9yIFNpemVcbiAqL1xuZnVuY3Rpb24gU2l6ZSAoKSB7XG4gICAgdGhpcy5fc2l6ZSA9IG5ldyBGbG9hdDMyQXJyYXkoMyk7XG59XG5cbi8vIGFuIGVudW1lcmF0aW9uIG9mIHRoZSBkaWZmZXJlbnQgdHlwZXMgb2Ygc2l6ZSBtb2Rlc1xuU2l6ZS5SRUxBVElWRSA9IDA7XG5TaXplLkFCU09MVVRFID0gMTtcblNpemUuUkVOREVSID0gMjtcblNpemUuREVGQVVMVCA9IFNpemUuUkVMQVRJVkU7XG5cbi8qKlxuICogZnJvbVNwZWNXaXRoUGFyZW50IHRha2VzIHRoZSBwYXJlbnQgbm9kZSdzIHNpemUsIHRoZSB0YXJnZXQgbm9kZXMgc3BlYyxcbiAqIGFuZCBhIHRhcmdldCBhcnJheSB0byB3cml0ZSB0by4gVXNpbmcgdGhlIG5vZGUncyBzaXplIG1vZGUgaXQgY2FsY3VsYXRlcyBcbiAqIGEgZmluYWwgc2l6ZSBmb3IgdGhlIG5vZGUgZnJvbSB0aGUgbm9kZSdzIHNwZWMuIFJldHVybnMgd2hldGhlciBvciBub3RcbiAqIHRoZSBmaW5hbCBzaXplIGhhcyBjaGFuZ2VkIGZyb20gaXRzIGxhc3QgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFyZW50U2l6ZSBwYXJlbnQgbm9kZSdzIGNhbGN1bGF0ZWQgc2l6ZVxuICogQHBhcmFtIHtOb2RlLlNwZWN9IG5vZGUgdGhlIHRhcmdldCBub2RlJ3Mgc3BlY1xuICogQHBhcmFtIHtBcnJheX0gdGFyZ2V0IGFuIGFycmF5IHRvIHdyaXRlIHRoZSByZXN1bHQgdG9cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIHRoZSBzaXplIG9mIHRoZSBub2RlIGhhcyBjaGFuZ2VkLlxuICovXG5TaXplLnByb3RvdHlwZS5mcm9tU3BlY1dpdGhQYXJlbnQgPSBmdW5jdGlvbiBmcm9tU3BlY1dpdGhQYXJlbnQgKHBhcmVudFNpemUsIG5vZGUsIHRhcmdldCkge1xuICAgIHZhciBzcGVjID0gbm9kZS5nZXRWYWx1ZSgpLnNwZWM7XG4gICAgdmFyIGNvbXBvbmVudHMgPSBub2RlLmdldENvbXBvbmVudHMoKTtcbiAgICB2YXIgbW9kZSA9IHNwZWMuc2l6ZS5zaXplTW9kZTtcbiAgICB2YXIgcHJldjtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBsZW4gPSBjb21wb25lbnRzLmxlbmd0aDtcbiAgICB2YXIgajtcbiAgICBmb3IgKHZhciBpID0gMCA7IGkgPCAzIDsgaSsrKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZVtpXSkge1xuICAgICAgICAgICAgY2FzZSBTaXplLlJFTEFUSVZFOlxuICAgICAgICAgICAgICAgIHByZXYgPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gcGFyZW50U2l6ZVtpXSAqIHNwZWMuc2l6ZS5wcm9wb3J0aW9uYWxbaV0gKyBzcGVjLnNpemUuZGlmZmVyZW50aWFsW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTaXplLkFCU09MVVRFOlxuICAgICAgICAgICAgICAgIHByZXYgPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gc3BlYy5zaXplLmFic29sdXRlW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTaXplLlJFTkRFUjpcbiAgICAgICAgICAgICAgICB2YXIgY2FuZGlkYXRlO1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW4gOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudHNbal0uZ2V0UmVuZGVyU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gY29tcG9uZW50c1tqXS5nZXRSZW5kZXJTaXplKClbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gdGFyZ2V0W2ldIDwgY2FuZGlkYXRlIHx8IHRhcmdldFtpXSA9PT0gMCA/IGNhbmRpZGF0ZSA6IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VkID0gY2hhbmdlZCB8fCBwcmV2ICE9PSB0YXJnZXRbaV07XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaXplO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgdHJhbnNmb3JtIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBjYWxjdWxhdGluZyB0aGUgdHJhbnNmb3JtIG9mIGEgcGFydGljdWxhclxuICogbm9kZSBmcm9tIHRoZSBkYXRhIG9uIHRoZSBub2RlIGFuZCBpdHMgcGFyZW50XG4gKlxuICogQGNvbnN0cnVjdG9yIFRyYW5zZm9ybVxuICovXG5mdW5jdGlvbiBUcmFuc2Zvcm0gKCkge1xuICAgIHRoaXMuX21hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGxhc3QgY2FsY3VsYXRlZCB0cmFuc2Zvcm1cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gYSB0cmFuc2Zvcm1cbiAqL1xuVHJhbnNmb3JtLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXRyaXg7XG59O1xuXG4vKipcbiAqIFVzZXMgdGhlIHBhcmVudCB0cmFuc2Zvcm0sIHRoZSBub2RlJ3Mgc3BlYywgdGhlIG5vZGUncyBzaXplLCBhbmQgdGhlIHBhcmVudCdzIHNpemVcbiAqIHRvIGNhbGN1bGF0ZSBhIGZpbmFsIHRyYW5zZm9ybSBmb3IgdGhlIG5vZGUuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHJhbnNmb3JtIGhhcyBjaGFuZ2VkLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmVudE1hdHJpeCB0aGUgcGFyZW50IG1hdHJpeFxuICogQHBhcmFtIHtOb2RlLlNwZWN9IHNwZWMgdGhlIHRhcmdldCBub2RlJ3Mgc3BlY1xuICogQHBhcmFtIHtBcnJheX0gbXlTaXplIHRoZSBzaXplIG9mIHRoZSBub2RlXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJlbnRTaXplIHRoZSBzaXplIG9mIHRoZSBwYXJlbnRcbiAqIEBwYXJhbSB7QXJyYXl9IHRhcmdldCB0aGUgdGFyZ2V0IGFycmF5IHRvIHdyaXRlIHRoZSByZXN1bHRpbmcgdHJhbnNmb3JtIHRvXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBvciBub3QgdGhlIHRyYW5zZm9ybSBjaGFuZ2VkXG4gKi9cblRyYW5zZm9ybS5wcm90b3R5cGUuZnJvbVNwZWNXaXRoUGFyZW50ID0gZnVuY3Rpb24gZnJvbVNwZWNXaXRoUGFyZW50IChwYXJlbnRNYXRyaXgsIHNwZWMsIG15U2l6ZSwgcGFyZW50U2l6ZSwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0ID8gdGFyZ2V0IDogdGhpcy5fbWF0cml4O1xuXG4gICAgLy8gbG9jYWwgY2FjaGUgb2YgZXZlcnl0aGluZ1xuICAgIHZhciB0MDAgICAgICAgICA9IHRhcmdldFswXTtcbiAgICB2YXIgdDAxICAgICAgICAgPSB0YXJnZXRbMV07XG4gICAgdmFyIHQwMiAgICAgICAgID0gdGFyZ2V0WzJdO1xuICAgIHZhciB0MTAgICAgICAgICA9IHRhcmdldFs0XTtcbiAgICB2YXIgdDExICAgICAgICAgPSB0YXJnZXRbNV07XG4gICAgdmFyIHQxMiAgICAgICAgID0gdGFyZ2V0WzZdO1xuICAgIHZhciB0MjAgICAgICAgICA9IHRhcmdldFs4XTtcbiAgICB2YXIgdDIxICAgICAgICAgPSB0YXJnZXRbOV07XG4gICAgdmFyIHQyMiAgICAgICAgID0gdGFyZ2V0WzEwXTtcbiAgICB2YXIgdDMwICAgICAgICAgPSB0YXJnZXRbMTJdO1xuICAgIHZhciB0MzEgICAgICAgICA9IHRhcmdldFsxM107XG4gICAgdmFyIHQzMiAgICAgICAgID0gdGFyZ2V0WzE0XTtcbiAgICB2YXIgcDAwICAgICAgICAgPSBwYXJlbnRNYXRyaXhbMF07XG4gICAgdmFyIHAwMSAgICAgICAgID0gcGFyZW50TWF0cml4WzFdO1xuICAgIHZhciBwMDIgICAgICAgICA9IHBhcmVudE1hdHJpeFsyXTtcbiAgICB2YXIgcDEwICAgICAgICAgPSBwYXJlbnRNYXRyaXhbNF07XG4gICAgdmFyIHAxMSAgICAgICAgID0gcGFyZW50TWF0cml4WzVdO1xuICAgIHZhciBwMTIgICAgICAgICA9IHBhcmVudE1hdHJpeFs2XTtcbiAgICB2YXIgcDIwICAgICAgICAgPSBwYXJlbnRNYXRyaXhbOF07XG4gICAgdmFyIHAyMSAgICAgICAgID0gcGFyZW50TWF0cml4WzldO1xuICAgIHZhciBwMjIgICAgICAgICA9IHBhcmVudE1hdHJpeFsxMF07XG4gICAgdmFyIHAzMCAgICAgICAgID0gcGFyZW50TWF0cml4WzEyXTtcbiAgICB2YXIgcDMxICAgICAgICAgPSBwYXJlbnRNYXRyaXhbMTNdO1xuICAgIHZhciBwMzIgICAgICAgICA9IHBhcmVudE1hdHJpeFsxNF07XG4gICAgdmFyIHBvc1ggICAgICAgID0gc3BlYy52ZWN0b3JzLnBvc2l0aW9uWzBdO1xuICAgIHZhciBwb3NZICAgICAgICA9IHNwZWMudmVjdG9ycy5wb3NpdGlvblsxXTtcbiAgICB2YXIgcG9zWiAgICAgICAgPSBzcGVjLnZlY3RvcnMucG9zaXRpb25bMl07XG4gICAgdmFyIHJvdFggICAgICAgID0gc3BlYy52ZWN0b3JzLnJvdGF0aW9uWzBdO1xuICAgIHZhciByb3RZICAgICAgICA9IHNwZWMudmVjdG9ycy5yb3RhdGlvblsxXTtcbiAgICB2YXIgcm90WiAgICAgICAgPSBzcGVjLnZlY3RvcnMucm90YXRpb25bMl07XG4gICAgdmFyIHJvdFcgICAgICAgID0gc3BlYy52ZWN0b3JzLnJvdGF0aW9uWzNdO1xuICAgIHZhciBzY2FsZVggICAgICA9IHNwZWMudmVjdG9ycy5zY2FsZVswXTtcbiAgICB2YXIgc2NhbGVZICAgICAgPSBzcGVjLnZlY3RvcnMuc2NhbGVbMV07XG4gICAgdmFyIHNjYWxlWiAgICAgID0gc3BlYy52ZWN0b3JzLnNjYWxlWzJdO1xuICAgIHZhciBhbGlnblggICAgICA9IHNwZWMub2Zmc2V0cy5hbGlnblswXSAqIHBhcmVudFNpemVbMF07XG4gICAgdmFyIGFsaWduWSAgICAgID0gc3BlYy5vZmZzZXRzLmFsaWduWzFdICogcGFyZW50U2l6ZVsxXTtcbiAgICB2YXIgYWxpZ25aICAgICAgPSBzcGVjLm9mZnNldHMuYWxpZ25bMl0gKiBwYXJlbnRTaXplWzJdO1xuICAgIHZhciBtb3VudFBvaW50WCA9IHNwZWMub2Zmc2V0cy5tb3VudFBvaW50WzBdICogbXlTaXplWzBdO1xuICAgIHZhciBtb3VudFBvaW50WSA9IHNwZWMub2Zmc2V0cy5tb3VudFBvaW50WzFdICogbXlTaXplWzFdO1xuICAgIHZhciBtb3VudFBvaW50WiA9IHNwZWMub2Zmc2V0cy5tb3VudFBvaW50WzJdICogbXlTaXplWzJdO1xuICAgIHZhciBvcmlnaW5YICAgICA9IHNwZWMub2Zmc2V0cy5vcmlnaW5bMF0gKiBteVNpemVbMF07XG4gICAgdmFyIG9yaWdpblkgICAgID0gc3BlYy5vZmZzZXRzLm9yaWdpblsxXSAqIG15U2l6ZVsxXTtcbiAgICB2YXIgb3JpZ2luWiAgICAgPSBzcGVjLm9mZnNldHMub3JpZ2luWzJdICogbXlTaXplWzJdO1xuXG4gICAgdmFyIHd4ID0gcm90VyAqIHJvdFg7XG4gICAgdmFyIHd5ID0gcm90VyAqIHJvdFk7XG4gICAgdmFyIHd6ID0gcm90VyAqIHJvdFo7XG4gICAgdmFyIHh4ID0gcm90WCAqIHJvdFg7XG4gICAgdmFyIHl5ID0gcm90WSAqIHJvdFk7XG4gICAgdmFyIHp6ID0gcm90WiAqIHJvdFo7XG4gICAgdmFyIHh5ID0gcm90WCAqIHJvdFk7XG4gICAgdmFyIHh6ID0gcm90WCAqIHJvdFo7XG4gICAgdmFyIHl6ID0gcm90WSAqIHJvdFo7XG5cbiAgICB2YXIgcnMwID0gKDEgLSAyICogKHl5ICsgenopKSAqIHNjYWxlWDtcbiAgICB2YXIgcnMxID0gKDIgKiAoeHkgKyB3eikpICogc2NhbGVYO1xuICAgIHZhciByczIgPSAoMiAqICh4eiAtIHd5KSkgKiBzY2FsZVg7XG4gICAgdmFyIHJzMyA9ICgyICogKHh5IC0gd3opKSAqIHNjYWxlWTtcbiAgICB2YXIgcnM0ID0gKDEgLSAyICogKHh4ICsgenopKSAqIHNjYWxlWTtcbiAgICB2YXIgcnM1ID0gKDIgKiAoeXogKyB3eCkpICogc2NhbGVZO1xuICAgIHZhciByczYgPSAoMiAqICh4eiArIHd5KSkgKiBzY2FsZVo7XG4gICAgdmFyIHJzNyA9ICgyICogKHl6IC0gd3gpKSAqIHNjYWxlWjtcbiAgICB2YXIgcnM4ID0gKDEgLSAyICogKHh4ICsgeXkpKSAqIHNjYWxlWjtcblxuICAgIHZhciB0eCA9IGFsaWduWCArIHBvc1ggLSBtb3VudFBvaW50WCArIG9yaWdpblggLSAocnMwICogb3JpZ2luWCArIHJzMyAqIG9yaWdpblkgKyByczYgKiBvcmlnaW5aKTtcbiAgICB2YXIgdHkgPSBhbGlnblkgKyBwb3NZIC0gbW91bnRQb2ludFkgKyBvcmlnaW5ZIC0gKHJzMSAqIG9yaWdpblggKyByczQgKiBvcmlnaW5ZICsgcnM3ICogb3JpZ2luWik7XG4gICAgdmFyIHR6ID0gYWxpZ25aICsgcG9zWiAtIG1vdW50UG9pbnRaICsgb3JpZ2luWiAtIChyczIgKiBvcmlnaW5YICsgcnM1ICogb3JpZ2luWSArIHJzOCAqIG9yaWdpblopO1xuXG4gICAgdGFyZ2V0WzBdID0gcDAwICogcnMwICsgcDEwICogcnMxICsgcDIwICogcnMyO1xuICAgIHRhcmdldFsxXSA9IHAwMSAqIHJzMCArIHAxMSAqIHJzMSArIHAyMSAqIHJzMjtcbiAgICB0YXJnZXRbMl0gPSBwMDIgKiByczAgKyBwMTIgKiByczEgKyBwMjIgKiByczI7XG4gICAgdGFyZ2V0WzNdID0gMDtcbiAgICB0YXJnZXRbNF0gPSBwMDAgKiByczMgKyBwMTAgKiByczQgKyBwMjAgKiByczU7XG4gICAgdGFyZ2V0WzVdID0gcDAxICogcnMzICsgcDExICogcnM0ICsgcDIxICogcnM1O1xuICAgIHRhcmdldFs2XSA9IHAwMiAqIHJzMyArIHAxMiAqIHJzNCArIHAyMiAqIHJzNTtcbiAgICB0YXJnZXRbN10gPSAwO1xuICAgIHRhcmdldFs4XSA9IHAwMCAqIHJzNiArIHAxMCAqIHJzNyArIHAyMCAqIHJzODtcbiAgICB0YXJnZXRbOV0gPSBwMDEgKiByczYgKyBwMTEgKiByczcgKyBwMjEgKiByczg7XG4gICAgdGFyZ2V0WzEwXSA9IHAwMiAqIHJzNiArIHAxMiAqIHJzNyArIHAyMiAqIHJzODtcbiAgICB0YXJnZXRbMTFdID0gMDtcbiAgICB0YXJnZXRbMTJdID0gcDAwICogdHggKyBwMTAgKiB0eSArIHAyMCAqIHR6ICsgcDMwO1xuICAgIHRhcmdldFsxM10gPSBwMDEgKiB0eCArIHAxMSAqIHR5ICsgcDIxICogdHogKyBwMzE7XG4gICAgdGFyZ2V0WzE0XSA9IHAwMiAqIHR4ICsgcDEyICogdHkgKyBwMjIgKiB0eiArIHAzMjtcbiAgICB0YXJnZXRbMTVdID0gMTtcblxuICAgIHJldHVybiB0MDAgIT09IHRhcmdldFswXSB8fFxuICAgICAgICB0MDEgIT09IHRhcmdldFsxXSB8fFxuICAgICAgICB0MDIgIT09IHRhcmdldFsyXSB8fFxuICAgICAgICB0MTAgIT09IHRhcmdldFs0XSB8fFxuICAgICAgICB0MTEgIT09IHRhcmdldFs1XSB8fFxuICAgICAgICB0MTIgIT09IHRhcmdldFs2XSB8fFxuICAgICAgICB0MjAgIT09IHRhcmdldFs4XSB8fFxuICAgICAgICB0MjEgIT09IHRhcmdldFs5XSB8fFxuICAgICAgICB0MjIgIT09IHRhcmdldFsxMF0gfHxcbiAgICAgICAgdDMwICE9PSB0YXJnZXRbMTJdIHx8XG4gICAgICAgIHQzMSAhPT0gdGFyZ2V0WzEzXSB8fFxuICAgICAgICB0MzIgIT09IHRhcmdldFsxNF07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNmb3JtO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FsbGJhY2tTdG9yZSA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9DYWxsYmFja1N0b3JlJyk7XG5cbnZhciBSRU5ERVJfU0laRSA9IDI7XG5cbi8qKlxuICogQSBET01FbGVtZW50IGlzIGEgY29tcG9uZW50IHRoYXQgY2FuIGJlIGFkZGVkIHRvIGEgTm9kZSB3aXRoIHRoZVxuICogcHVycG9zZSBvZiBzZW5kaW5nIGRyYXcgY29tbWFuZHMgdG8gdGhlIHJlbmRlcmVyLiBSZW5kZXJhYmxlcyBzZW5kIGRyYXcgY29tbWFuZHNcbiAqIHRvIHRocm91Z2ggdGhlaXIgTm9kZXMgdG8gdGhlIENvbXBvc2l0b3Igd2hlcmUgdGhleSBhcmUgYWN0ZWQgdXBvbi5cbiAqXG4gKiBAY2xhc3MgRE9NRWxlbWVudFxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAgICAgICAgICAgICAgICBUaGUgTm9kZSB0byB3aGljaCB0aGUgYERPTUVsZW1lbnRgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyYWJsZSBzaG91bGQgYmUgYXR0YWNoZWQgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgICAgICAgSW5pdGlhbCBvcHRpb25zIHVzZWQgZm9yIGluc3RhbnRpYXRpbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgTm9kZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnByb3BlcnRpZXMgICBDU1MgcHJvcGVydGllcyB0aGF0IHNob3VsZCBiZSBhZGRlZCB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBhY3R1YWwgRE9NRWxlbWVudCBvbiB0aGUgaW5pdGlhbCBkcmF3LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuYXR0cmlidXRlcyAgIEVsZW1lbnQgYXR0cmlidXRlcyB0aGF0IHNob3VsZCBiZSBhZGRlZCB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBhY3R1YWwgRE9NRWxlbWVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmlkICAgICAgICAgICBTdHJpbmcgdG8gYmUgYXBwbGllZCBhcyAnaWQnIG9mIHRoZSBhY3R1YWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBET01FbGVtZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29udGVudCAgICAgIFN0cmluZyB0byBiZSBhcHBsaWVkIGFzIHRoZSBjb250ZW50IG9mIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbCBET01FbGVtZW50LlxuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmN1dG91dCAgICAgIFNwZWNpZmllcyB0aGUgcHJlc2VuY2Ugb2YgYSAnY3V0b3V0JyBpbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZWJHTCBjYW52YXMgb3ZlciB0aGlzIGVsZW1lbnQgd2hpY2ggYWxsb3dzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIERPTSBhbmQgV2ViR0wgbGF5ZXJpbmcuICBPbiBieSBkZWZhdWx0LlxuICovXG5mdW5jdGlvbiBET01FbGVtZW50KG5vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignRE9NRWxlbWVudCBtdXN0IGJlIGluc3RhbnRpYXRlZCBvbiBhIG5vZGUnKTtcblxuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcblxuICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9yZW5kZXJTaXplZCA9IGZhbHNlO1xuICAgIHRoaXMuX3JlcXVlc3RSZW5kZXJTaXplID0gZmFsc2U7XG5cbiAgICB0aGlzLl9jaGFuZ2VRdWV1ZSA9IFtdO1xuXG4gICAgdGhpcy5fVUlFdmVudHMgPSBub2RlLmdldFVJRXZlbnRzKCkuc2xpY2UoMCk7XG4gICAgdGhpcy5fY2xhc3NlcyA9IFsnZmFtb3VzLWRvbS1lbGVtZW50J107XG4gICAgdGhpcy5fcmVxdWVzdGluZ0V2ZW50TGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5fc3R5bGVzID0ge307XG5cbiAgICB0aGlzLnNldFByb3BlcnR5KCdkaXNwbGF5Jywgbm9kZS5pc1Nob3duKCkgPyAnbm9uZScgOiAnYmxvY2snKTtcbiAgICB0aGlzLm9uT3BhY2l0eUNoYW5nZShub2RlLmdldE9wYWNpdHkoKSk7XG5cbiAgICB0aGlzLl9hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5fY29udGVudCA9ICcnO1xuXG4gICAgdGhpcy5fdGFnTmFtZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50YWdOYW1lID8gb3B0aW9ucy50YWdOYW1lIDogJ2Rpdic7XG4gICAgdGhpcy5faWQgPSBub2RlID8gbm9kZS5hZGRDb21wb25lbnQodGhpcykgOiBudWxsO1xuXG4gICAgdGhpcy5fcmVuZGVyU2l6ZSA9IFswLCAwLCAwXTtcblxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IG5ldyBDYWxsYmFja1N0b3JlKCk7XG5cblxuICAgIGlmICghb3B0aW9ucykgcmV0dXJuO1xuXG4gICAgdmFyIGk7XG4gICAgdmFyIGtleTtcblxuICAgIGlmIChvcHRpb25zLmNsYXNzZXMpXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLmNsYXNzZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlc1tpXSk7XG5cbiAgICBpZiAob3B0aW9ucy5hdHRyaWJ1dGVzKVxuICAgICAgICBmb3IgKGtleSBpbiBvcHRpb25zLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIG9wdGlvbnMuYXR0cmlidXRlc1trZXldKTtcblxuICAgIGlmIChvcHRpb25zLnByb3BlcnRpZXMpXG4gICAgICAgIGZvciAoa2V5IGluIG9wdGlvbnMucHJvcGVydGllcylcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHkoa2V5LCBvcHRpb25zLnByb3BlcnRpZXNba2V5XSk7XG5cbiAgICBpZiAob3B0aW9ucy5pZCkgdGhpcy5zZXRJZChvcHRpb25zLmlkKTtcbiAgICBpZiAob3B0aW9ucy5jb250ZW50KSB0aGlzLnNldENvbnRlbnQob3B0aW9ucy5jb250ZW50KTtcbiAgICBpZiAob3B0aW9ucy5jdXRvdXQgPT09IGZhbHNlKSB0aGlzLnNldEN1dG91dFN0YXRlKG9wdGlvbnMuY3V0b3V0KTtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBzdGF0ZSBvZiB0aGUgRE9NRWxlbWVudC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBzZXJpYWxpemVkIGludGVyYWwgc3RhdGVcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjbGFzc2VzOiB0aGlzLl9jbGFzc2VzLFxuICAgICAgICBzdHlsZXM6IHRoaXMuX3N0eWxlcyxcbiAgICAgICAgYXR0cmlidXRlczogdGhpcy5fYXR0cmlidXRlcyxcbiAgICAgICAgY29udGVudDogdGhpcy5fY29udGVudCxcbiAgICAgICAgaWQ6IHRoaXMuX2F0dHJpYnV0ZXMuaWQsXG4gICAgICAgIHRhZ05hbWU6IHRoaXMuX3RhZ05hbWVcbiAgICB9O1xufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgaW52b2tlZCBieSB0aGUgbm9kZSBhcyBzb29uIGFzIGFuIHVwZGF0ZSBvY2N1cnMuIFRoaXMgYWxsb3dzXG4gKiB0aGUgRE9NRWxlbWVudCByZW5kZXJhYmxlIHRvIGR5bmFtaWNhbGx5IHJlYWN0IHRvIHN0YXRlIGNoYW5nZXMgb24gdGhlIE5vZGUuXG4gKlxuICogVGhpcyBmbHVzaGVzIHRoZSBpbnRlcm5hbCBkcmF3IGNvbW1hbmQgcXVldWUgYnkgc2VuZGluZyBpbmRpdmlkdWFsIGNvbW1hbmRzXG4gKiB0byB0aGUgbm9kZSB1c2luZyBgc2VuZERyYXdDb21tYW5kYC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUub25VcGRhdGUgPSBmdW5jdGlvbiBvblVwZGF0ZSgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGU7XG4gICAgdmFyIHF1ZXVlID0gdGhpcy5fY2hhbmdlUXVldWU7XG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblxuICAgIGlmIChsZW4gJiYgbm9kZSkge1xuICAgICAgICBub2RlLnNlbmREcmF3Q29tbWFuZCgnV0lUSCcpO1xuICAgICAgICBub2RlLnNlbmREcmF3Q29tbWFuZChub2RlLmdldExvY2F0aW9uKCkpO1xuXG4gICAgICAgIHdoaWxlIChsZW4tLSkgbm9kZS5zZW5kRHJhd0NvbW1hbmQocXVldWUuc2hpZnQoKSk7XG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0UmVuZGVyU2l6ZSkge1xuICAgICAgICAgICAgbm9kZS5zZW5kRHJhd0NvbW1hbmQoJ0RPTV9SRU5ERVJfU0laRScpO1xuICAgICAgICAgICAgbm9kZS5zZW5kRHJhd0NvbW1hbmQobm9kZS5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RSZW5kZXJTaXplID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogUHJpdmF0ZSBtZXRob2Qgd2hpY2ggc2V0cyB0aGUgcGFyZW50IG9mIHRoZSBlbGVtZW50IGluIHRoZSBET01cbiAqIGhpZXJhcmNoeS5cbiAqXG4gKiBAbWV0aG9kIF9zZXRQYXJlbnRcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggb2YgdGhlIHBhcmVudFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLl9zZXRQYXJlbnQgPSBmdW5jdGlvbiBfc2V0UGFyZW50KHBhdGgpIHtcbiAgICBpZiAodGhpcy5fbm9kZSkge1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLl9ub2RlLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gcGF0aCB8fCBsb2NhdGlvbi5pbmRleE9mKHBhdGgpID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGdpdmVuIHBhdGggaXNuXFwndCBhbiBhbmNlc3RvcicpO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXRoO1xuICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ19zZXRQYXJlbnQgY2FsbGVkIG9uIGFuIEVsZW1lbnQgdGhhdCBpc25cXCd0IGluIHRoZSBzY2VuZSBncmFwaCcpO1xufTtcblxuLyoqXG4gKiBQcml2YXRlIG1ldGhvZCB3aGljaCBhZGRzIGEgY2hpbGQgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIERPTVxuICogaGllcmFyY2h5LlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggb2YgdGhlIGNoaWxkXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuX2FkZENoaWxkID0gZnVuY3Rpb24gX2FkZENoaWxkKHBhdGgpIHtcbiAgICBpZiAodGhpcy5fbm9kZSkge1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLl9ub2RlLmdldExvY2F0aW9uKCk7XG4gICAgICAgIGlmIChwYXRoID09PSBsb2NhdGlvbiB8fCBwYXRoLmluZGV4T2YobG9jYXRpb24pID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGdpdmVuIHBhdGggaXNuXFwndCBhIGRlc2NlbmRlbnQnKTtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuLmluZGV4T2YocGF0aCkgPT09IC0xKSB0aGlzLl9jaGlsZHJlbi5wdXNoKHBhdGgpO1xuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignVGhlIGdpdmVuIHBhdGggaXMgYWxyZWFkeSBhIGNoaWxkIG9mIHRoaXMgZWxlbWVudCcpO1xuICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ19hZGRDaGlsZCBjYWxsZWQgb24gYW4gRWxlbWVudCB0aGF0IGlzblxcJ3QgaW4gdGhlIHNjZW5lIGdyYXBoJyk7XG59O1xuXG4vKipcbiAqIFByaXZhdGUgbWV0aG9kIHdoaWNoIHJldHVybnMgdGhlIHBhdGggb2YgdGhlIHBhcmVudCBvZiB0aGlzIGVsZW1lbnRcbiAqXG4gKiBAbWV0aG9kXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcGF0aCBvZiB0aGUgcGFyZW50IGVsZW1lbnRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuX2dldFBhcmVudCA9IGZ1bmN0aW9uIF9nZXRQYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbn07XG5cbi8qKlxuICogUHJpdmF0ZSBtZXRob2Qgd2hpY2ggcmV0dXJucyBhbiBhcnJheSBvZiBwYXRocyBvZiB0aGUgY2hpbGRyZW4gZWxlbWVudHNcbiAqIG9mIHRoaXMgZWxlbWVudFxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHJldHVybiB7QXJyYXl9IGFuIGFycmF5IG9mIHRoZSBwYXRocyBvZiB0aGUgY2hpbGQgZWxlbWVudFxuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5fZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiBfZ2V0Q2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgaW52b2tlZCBieSB0aGUgTm9kZSBhcyBzb29uIGFzIHRoZSBub2RlIChvciBhbnkgb2YgaXRzXG4gKiBhbmNlc3RvcnMpIGlzIGJlaW5nIG1vdW50ZWQuXG4gKlxuICogQG1ldGhvZCBvbk1vdW50XG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlICAgICAgUGFyZW50IG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgYWRkZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgICAgICBQYXRoIGF0IHdoaWNoIHRoZSBjb21wb25lbnQgKG9yIG5vZGUpIGlzIGJlaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWQuIFRoZSBwYXRoIGlzIGJlaW5nIHNldCBvbiB0aGUgYWN0dWFsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NRWxlbWVudCBhcyBhIGBkYXRhLWZhLXBhdGhgLWF0dHJpYnV0ZS5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5vbk1vdW50ID0gZnVuY3Rpb24gb25Nb3VudChub2RlLCBpZCkge1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fVUlFdmVudHMgPSBub2RlLmdldFVJRXZlbnRzKCkuc2xpY2UoMCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtZmEtcGF0aCcsIG5vZGUuZ2V0TG9jYXRpb24oKSk7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBpbnZva2VkIGJ5IHRoZSBOb2RlIGFzIHNvb24gYXMgdGhlIG5vZGUgaXMgYmVpbmcgZGlzbW91bnRlZFxuICogZWl0aGVyIGRpcmVjdGx5IG9yIGJ5IGRpc21vdW50aW5nIG9uZSBvZiBpdHMgYW5jZXN0b3JzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5vbkRpc21vdW50ID0gZnVuY3Rpb24gb25EaXNtb3VudCgpIHtcbiAgICB0aGlzLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS1mYS1wYXRoJywgJycpO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBpbnZva2VkIGJ5IHRoZSBub2RlIGFzIHNvb24gYXMgdGhlIERPTUVsZW1lbnQgaXMgYmVpbmcgc2hvd24uXG4gKiBUaGlzIHJlc3VsdHMgaW50byB0aGUgRE9NRWxlbWVudCBzZXR0aW5nIHRoZSBgZGlzcGxheWAgcHJvcGVydHkgdG8gYGJsb2NrYFxuICogYW5kIHRoZXJlZm9yZSB2aXN1YWxseSBzaG93aW5nIHRoZSBjb3JyZXNwb25kaW5nIERPTUVsZW1lbnQgKGFnYWluKS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUub25TaG93ID0gZnVuY3Rpb24gb25TaG93KCkge1xuICAgIHRoaXMuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbn07XG5cbi8qKlxuICogTWV0aG9kIHRvIGJlIGludm9rZWQgYnkgdGhlIG5vZGUgYXMgc29vbiBhcyB0aGUgRE9NRWxlbWVudCBpcyBiZWluZyBoaWRkZW4uXG4gKiBUaGlzIHJlc3VsdHMgaW50byB0aGUgRE9NRWxlbWVudCBzZXR0aW5nIHRoZSBgZGlzcGxheWAgcHJvcGVydHkgdG8gYG5vbmVgXG4gKiBhbmQgdGhlcmVmb3JlIHZpc3VhbGx5IGhpZGluZyB0aGUgY29ycmVzcG9uZGluZyBET01FbGVtZW50IChhZ2FpbikuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLm9uSGlkZSA9IGZ1bmN0aW9uIG9uSGlkZSgpIHtcbiAgICB0aGlzLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbn07XG5cbi8qKlxuICogRW5hYmxlcyBvciBkaXNhYmxlcyBXZWJHTCAnY3V0b3V0JyBmb3IgdGhpcyBlbGVtZW50LCB3aGljaCBhZmZlY3RzXG4gKiBob3cgdGhlIGVsZW1lbnQgaXMgbGF5ZXJlZCB3aXRoIFdlYkdMIG9iamVjdHMgaW4gdGhlIHNjZW5lLiAgVGhpcyBpcyBkZXNpZ25lZFxuICogbWFpbmx5IGFzIGEgd2F5IHRvIGFjaGVpdmVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSB1c2VzQ3V0b3V0ICBUaGUgcHJlc2VuY2Ugb2YgYSBXZWJHTCAnY3V0b3V0JyBmb3IgdGhpcyBlbGVtZW50LlxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLnNldEN1dG91dFN0YXRlID0gZnVuY3Rpb24gc2V0Q3V0b3V0U3RhdGUodXNlc0N1dG91dCkge1xuICAgIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2goJ0dMX0NVVE9VVF9TVEFURScsIHVzZXNDdXRvdXQpO1xuXG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBpbnZva2VkIGJ5IHRoZSBub2RlIGFzIHNvb24gYXMgdGhlIHRyYW5zZm9ybSBtYXRyaXggYXNzb2NpYXRlZFxuICogd2l0aCB0aGUgbm9kZSBjaGFuZ2VzLiBUaGUgRE9NRWxlbWVudCB3aWxsIHJlYWN0IHRvIHRyYW5zZm9ybSBjaGFuZ2VzIGJ5IHNlbmRpbmdcbiAqIGBDSEFOR0VfVFJBTlNGT1JNYCBjb21tYW5kcyB0byB0aGUgYERPTVJlbmRlcmVyYC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtGbG9hdDMyQXJyYXl9IHRyYW5zZm9ybSBUaGUgZmluYWwgdHJhbnNmb3JtIG1hdHJpeFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLm9uVHJhbnNmb3JtQ2hhbmdlID0gZnVuY3Rpb24gb25UcmFuc2Zvcm1DaGFuZ2UgKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2goJ0NIQU5HRV9UUkFOU0ZPUk0nKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdHJhbnNmb3JtLmxlbmd0aCA7IGkgPCBsZW4gOyBpKyspXG4gICAgICAgIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2godHJhbnNmb3JtW2ldKTtcblxuICAgIHRoaXMub25VcGRhdGUoKTtcbn07XG5cbi8qKlxuICogTWV0aG9kIHRvIGJlIGludm9rZWQgYnkgdGhlIG5vZGUgYXMgc29vbiBhcyBpdHMgY29tcHV0ZWQgc2l6ZSBjaGFuZ2VzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0Zsb2F0MzJBcnJheX0gc2l6ZSBTaXplIG9mIHRoZSBOb2RlIGluIHBpeGVsc1xuICpcbiAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoaXNcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUub25TaXplQ2hhbmdlID0gZnVuY3Rpb24gb25TaXplQ2hhbmdlKHNpemUpIHtcbiAgICB2YXIgc2l6ZU1vZGUgPSB0aGlzLl9ub2RlLmdldFNpemVNb2RlKCk7XG4gICAgdmFyIHNpemVkWCA9IHNpemVNb2RlWzBdICE9PSBSRU5ERVJfU0laRTtcbiAgICB2YXIgc2l6ZWRZID0gc2l6ZU1vZGVbMV0gIT09IFJFTkRFUl9TSVpFO1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZClcbiAgICAgICAgdGhpcy5fY2hhbmdlUXVldWUucHVzaCgnQ0hBTkdFX1NJWkUnLFxuICAgICAgICAgICAgc2l6ZWRYID8gc2l6ZVswXSA6IHNpemVkWCxcbiAgICAgICAgICAgIHNpemVkWSA/IHNpemVbMV0gOiBzaXplZFkpO1xuXG4gICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBpbnZva2VkIGJ5IHRoZSBub2RlIGFzIHNvb24gYXMgaXRzIG9wYWNpdHkgY2hhbmdlc1xuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gb3BhY2l0eSBUaGUgbmV3IG9wYWNpdHksIGFzIGEgc2NhbGFyIGZyb20gMCB0byAxXG4gKlxuICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhpc1xuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5vbk9wYWNpdHlDaGFuZ2UgPSBmdW5jdGlvbiBvbk9wYWNpdHlDaGFuZ2Uob3BhY2l0eSkge1xuICAgIHJldHVybiB0aGlzLnNldFByb3BlcnR5KCdvcGFjaXR5Jywgb3BhY2l0eSk7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBpbnZva2VkIGJ5IHRoZSBub2RlIGFzIHNvb24gYXMgYSBuZXcgVUlFdmVudCBpcyBiZWluZyBhZGRlZC5cbiAqIFRoaXMgcmVzdWx0cyBpbnRvIGFuIGBBRERfRVZFTlRfTElTVEVORVJgIGNvbW1hbmQgYmVpbmcgc2VuZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gVUlFdmVudCBVSUV2ZW50IHRvIGJlIHN1YnNjcmliZWQgdG8gKGUuZy4gYGNsaWNrYClcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5vbkFkZFVJRXZlbnQgPSBmdW5jdGlvbiBvbkFkZFVJRXZlbnQoVUlFdmVudCkge1xuICAgIGlmICh0aGlzLl9VSUV2ZW50cy5pbmRleE9mKFVJRXZlbnQpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpYmUoVUlFdmVudCk7XG4gICAgICAgIHRoaXMuX1VJRXZlbnRzLnB1c2goVUlFdmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuX2luRHJhdykge1xuICAgICAgICB0aGlzLl9zdWJzY3JpYmUoVUlFdmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBcHBlbmRzIGFuIGBBRERfRVZFTlRfTElTVEVORVJgIGNvbW1hbmQgdG8gdGhlIGNvbW1hbmQgcXVldWUuXG4gKlxuICogQG1ldGhvZFxuICogQHByaXZhdGVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gVUlFdmVudCBFdmVudCB0eXBlIChlLmcuIGBjbGlja2ApXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIF9zdWJzY3JpYmUgKFVJRXZlbnQpIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlUXVldWUucHVzaCgnU1VCU0NSSUJFJywgVUlFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkge1xuICAgICAgICB0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgaW52b2tlZCBieSB0aGUgbm9kZSBhcyBzb29uIGFzIHRoZSB1bmRlcmx5aW5nIHNpemUgbW9kZVxuICogY2hhbmdlcy4gVGhpcyByZXN1bHRzIGludG8gdGhlIHNpemUgYmVpbmcgZmV0Y2hlZCBmcm9tIHRoZSBub2RlIGluXG4gKiBvcmRlciB0byB1cGRhdGUgdGhlIGFjdHVhbCwgcmVuZGVyZWQgc2l6ZS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggdGhlIHNpemluZyBtb2RlIGluIHVzZSBmb3IgZGV0ZXJtaW5pbmcgc2l6ZSBpbiB0aGUgeCBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IHRoZSBzaXppbmcgbW9kZSBpbiB1c2UgZm9yIGRldGVybWluaW5nIHNpemUgaW4gdGhlIHkgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0geiB0aGUgc2l6aW5nIG1vZGUgaW4gdXNlIGZvciBkZXRlcm1pbmluZyBzaXplIGluIHRoZSB6IGRpcmVjdGlvblxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLm9uU2l6ZU1vZGVDaGFuZ2UgPSBmdW5jdGlvbiBvblNpemVNb2RlQ2hhbmdlKHgsIHksIHopIHtcbiAgICBpZiAoeCA9PT0gUkVOREVSX1NJWkUgfHwgeSA9PT0gUkVOREVSX1NJWkUgfHwgeiA9PT0gUkVOREVSX1NJWkUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyU2l6ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0UmVuZGVyU2l6ZSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMub25TaXplQ2hhbmdlKHRoaXMuX25vZGUuZ2V0U2l6ZSgpKTtcbn07XG5cbi8qKlxuICogTWV0aG9kIHRvIGJlIHJldHJpZXZlIHRoZSByZW5kZXJlZCBzaXplIG9mIHRoZSBET00gZWxlbWVudCB0aGF0IGlzXG4gKiBkcmF3biBmb3IgdGhpcyBub2RlLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gc2l6ZSBvZiB0aGUgcmVuZGVyZWQgRE9NIGVsZW1lbnQgaW4gcGl4ZWxzXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLmdldFJlbmRlclNpemUgPSBmdW5jdGlvbiBnZXRSZW5kZXJTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaXplO1xufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gaGF2ZSB0aGUgY29tcG9uZW50IHJlcXVlc3QgYW4gdXBkYXRlIGZyb20gaXRzIE5vZGVcbiAqXG4gKiBAbWV0aG9kXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLl9yZXF1ZXN0VXBkYXRlID0gZnVuY3Rpb24gX3JlcXVlc3RVcGRhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB7XG4gICAgICAgIHRoaXMuX25vZGUucmVxdWVzdFVwZGF0ZSh0aGlzLl9pZCk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3RpbmdVcGRhdGUgPSB0cnVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIERPTUVsZW1lbnQgYnkgc2VuZGluZyB0aGUgYElOSVRfRE9NYCBjb21tYW5kLiBUaGlzIGNyZWF0ZXNcbiAqIG9yIHJlYWxsb2NhdGVzIGEgbmV3IEVsZW1lbnQgaW4gdGhlIGFjdHVhbCBET00gaGllcmFyY2h5LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLl9jaGFuZ2VRdWV1ZS5wdXNoKCdJTklUX0RPTScsIHRoaXMuX3RhZ05hbWUpO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLm9uVHJhbnNmb3JtQ2hhbmdlKHRoaXMuX25vZGUuZ2V0VHJhbnNmb3JtKCkpO1xuICAgIHRoaXMub25TaXplQ2hhbmdlKHRoaXMuX25vZGUuZ2V0U2l6ZSgpKTtcbiAgICBpZiAoIXRoaXMuX3JlcXVlc3RpbmdVcGRhdGUpIHRoaXMuX3JlcXVlc3RVcGRhdGUoKTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgaWQgYXR0cmlidXRlIG9mIHRoZSBET01FbGVtZW50LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgTmV3IGlkIHRvIGJlIHNldFxuICpcbiAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoaXNcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuc2V0SWQgPSBmdW5jdGlvbiBzZXRJZCAoaWQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYSBuZXcgY2xhc3MgdG8gdGhlIGludGVybmFsIGNsYXNzIGxpc3Qgb2YgdGhlIHVuZGVybHlpbmcgRWxlbWVudCBpbiB0aGVcbiAqIERPTS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIE5ldyBjbGFzcyBuYW1lIHRvIGJlIGFkZGVkXG4gKlxuICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhpc1xuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzICh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9jbGFzc2VzLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2goJ0FERF9DTEFTUycsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgaWYgKCF0aGlzLl9yZXF1ZXN0aW5nVXBkYXRlKSB0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJTaXplZCkgdGhpcy5fcmVxdWVzdFJlbmRlclNpemUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW5EcmF3KSB7XG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkgdGhpcy5fY2hhbmdlUXVldWUucHVzaCgnQUREX0NMQVNTJywgdmFsdWUpO1xuICAgICAgICBpZiAoIXRoaXMuX3JlcXVlc3RpbmdVcGRhdGUpIHRoaXMuX3JlcXVlc3RVcGRhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBET01FbGVtZW50J3MgY2xhc3NMaXN0LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgQ2xhc3MgbmFtZSB0byBiZSByZW1vdmVkXG4gKlxuICogQHJldHVybiB7RE9NRWxlbWVudH0gdGhpc1xuICovXG5ET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzICh2YWx1ZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX2NsYXNzZXMuaW5kZXhPZih2YWx1ZSk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSByZXR1cm4gdGhpcztcblxuICAgIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2goJ1JFTU9WRV9DTEFTUycsIHZhbHVlKTtcblxuICAgIHRoaXMuX2NsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgRE9NRWxlbWVudCBoYXMgdGhlIHBhc3NlZCBpbiBjbGFzcy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFRoZSBjbGFzcyBuYW1lXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gQm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHBhc3NlZCBpbiBjbGFzcyBuYW1lIGlzIGluIHRoZSBET01FbGVtZW50J3MgY2xhc3MgbGlzdC5cbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuaGFzQ2xhc3MgPSBmdW5jdGlvbiBoYXNDbGFzcyAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3Nlcy5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIFNldHMgYW4gYXR0cmlidXRlIG9mIHRoZSBET01FbGVtZW50LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBBdHRyaWJ1dGUga2V5IChlLmcuIGBzcmNgKVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZSAoZS5nLiBgaHR0cDovL2ZhbW8udXNgKVxuICpcbiAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoaXNcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24gc2V0QXR0cmlidXRlIChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9hdHRyaWJ1dGVzW25hbWVdICE9PSB2YWx1ZSB8fCB0aGlzLl9pbkRyYXcpIHtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2goJ0NIQU5HRV9BVFRSSUJVVEUnLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdFVwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIGEgQ1NTIHByb3BlcnR5XG4gKlxuICogQGNoYWluYWJsZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBOYW1lIG9mIHRoZSBDU1MgcnVsZSAoZS5nLiBgYmFja2dyb3VuZC1jb2xvcmApXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVmFsdWUgb2YgQ1NTIHByb3BlcnR5IChlLmcuIGByZWRgKVxuICpcbiAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoaXNcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuc2V0UHJvcGVydHkgPSBmdW5jdGlvbiBzZXRQcm9wZXJ0eSAobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAodGhpcy5fc3R5bGVzW25hbWVdICE9PSB2YWx1ZSB8fCB0aGlzLl9pbkRyYXcpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzW25hbWVdID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkgdGhpcy5fY2hhbmdlUXVldWUucHVzaCgnQ0hBTkdFX1BST1BFUlRZJywgbmFtZSwgdmFsdWUpO1xuICAgICAgICBpZiAoIXRoaXMuX3JlcXVlc3RpbmdVcGRhdGUpIHRoaXMuX3JlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlclNpemVkKSB0aGlzLl9yZXF1ZXN0UmVuZGVyU2l6ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIERPTUVsZW1lbnQuIFRoaXMgaXMgdXNpbmcgYGlubmVySFRNTGAsIGVzY2FwaW5nIHVzZXJcbiAqIGdlbmVyYXRlZCBjb250ZW50IGlzIHRoZXJlZm9yZSBlc3NlbnRpYWwgZm9yIHNlY3VyaXR5IHB1cnBvc2VzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY29udGVudCBDb250ZW50IHRvIGJlIHNldCB1c2luZyBgLmlubmVySFRNTCA9IC4uLmBcbiAqXG4gKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGlzXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50IChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuX2NvbnRlbnQgIT09IGNvbnRlbnQgfHwgdGhpcy5faW5EcmF3KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHRoaXMuX2NoYW5nZVF1ZXVlLnB1c2goJ0NIQU5HRV9DT05URU5UJywgY29udGVudCk7XG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5fcmVuZGVyU2l6ZWQpIHRoaXMuX3JlcXVlc3RSZW5kZXJTaXplID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlcyB0byBhIERPTUVsZW1lbnQgdXNpbmcuXG4gKlxuICogQG1ldGhvZCBvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCAgICAgICBUaGUgZXZlbnQgdHlwZSAoZS5nLiBgY2xpY2tgKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyICBIYW5kbGVyIGZ1bmN0aW9uIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50IHR5cGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gd2hpY2ggdGhlIHBheWxvYWQgZXZlbnQgb2JqZWN0IHdpbGwgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkIGludG8uXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gY2FsbCBpZiB5b3Ugd2FudCB0byByZW1vdmUgdGhlIGNhbGxiYWNrXG4gKi9cbkRPTUVsZW1lbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24gKGV2ZW50LCBsaXN0ZW5lcikge1xuICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3Mub24oZXZlbnQsIGxpc3RlbmVyKTtcbn07XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBieSB0aGUgTm9kZSB3aGVuZXZlciBhbiBldmVudCBpcyBiZWluZyByZWNlaXZlZC5cbiAqIFRoZXJlIGFyZSB0d28gZGlmZmVyZW50IHdheXMgdG8gc3Vic2NyaWJlIGZvciB0aG9zZSBldmVudHM6XG4gKlxuICogMS4gQnkgb3ZlcnJpZGluZyB0aGUgb25SZWNlaXZlIG1ldGhvZCAoYW5kIHBvc3NpYmx5IHVzaW5nIGBzd2l0Y2hgIGluIG9yZGVyXG4gKiAgICAgdG8gZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHRoZSBkaWZmZXJlbnQgZXZlbnQgdHlwZXMpLlxuICogMi4gQnkgdXNpbmcgRE9NRWxlbWVudCBhbmQgdXNpbmcgdGhlIGJ1aWx0LWluIENhbGxiYWNrU3RvcmUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBFdmVudCB0eXBlIChlLmcuIGBjbGlja2ApXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZCBFdmVudCBvYmplY3QuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUub25SZWNlaXZlID0gZnVuY3Rpb24gb25SZWNlaXZlIChldmVudCwgcGF5bG9hZCkge1xuICAgIGlmIChldmVudCA9PT0gJ3Jlc2l6ZScpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyU2l6ZVswXSA9IHBheWxvYWQudmFsWzBdO1xuICAgICAgICB0aGlzLl9yZW5kZXJTaXplWzFdID0gcGF5bG9hZC52YWxbMV07XG4gICAgICAgIGlmICghdGhpcy5fcmVxdWVzdGluZ1VwZGF0ZSkgdGhpcy5fcmVxdWVzdFVwZGF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsYmFja3MudHJpZ2dlcihldmVudCwgcGF5bG9hZCk7XG59O1xuXG4vKipcbiAqIFRoZSBkcmF3IGZ1bmN0aW9uIGlzIGJlaW5nIHVzZWQgaW4gb3JkZXIgdG8gYWxsb3cgbXV0YXRpbmcgdGhlIERPTUVsZW1lbnRcbiAqIGJlZm9yZSBhY3R1YWxseSBtb3VudGluZyB0aGUgY29ycmVzcG9uZGluZyBub2RlLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NRWxlbWVudC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgdmFyIGtleTtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuO1xuXG4gICAgdGhpcy5faW5EcmF3ID0gdHJ1ZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gdGhpcy5fY2xhc3Nlcy5sZW5ndGggOyBpIDwgbGVuIDsgaSsrKVxuICAgICAgICB0aGlzLmFkZENsYXNzKHRoaXMuX2NsYXNzZXNbaV0pO1xuXG4gICAgaWYgKHRoaXMuX2NvbnRlbnQpIHRoaXMuc2V0Q29udGVudCh0aGlzLl9jb250ZW50KTtcblxuICAgIGZvciAoa2V5IGluIHRoaXMuX3N0eWxlcylcbiAgICAgICAgaWYgKHRoaXMuX3N0eWxlc1trZXldKVxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShrZXksIHRoaXMuX3N0eWxlc1trZXldKTtcblxuICAgIGZvciAoa2V5IGluIHRoaXMuX2F0dHJpYnV0ZXMpXG4gICAgICAgIGlmICh0aGlzLl9hdHRyaWJ1dGVzW2tleV0pXG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHRoaXMuX2F0dHJpYnV0ZXNba2V5XSk7XG5cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSB0aGlzLl9VSUV2ZW50cy5sZW5ndGggOyBpIDwgbGVuIDsgaSsrKVxuICAgICAgICB0aGlzLm9uQWRkVUlFdmVudCh0aGlzLl9VSUV2ZW50c1tpXSk7XG5cbiAgICB0aGlzLl9pbkRyYXcgPSBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NRWxlbWVudDtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEVsZW1lbnRDYWNoZSA9IHJlcXVpcmUoJy4vRWxlbWVudENhY2hlJyk7XG52YXIgbWF0aCA9IHJlcXVpcmUoJy4vTWF0aCcpO1xudmFyIHZlbmRvclByZWZpeCA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy92ZW5kb3JQcmVmaXgnKTtcbnZhciBldmVudE1hcCA9IHJlcXVpcmUoJy4vZXZlbnRzL0V2ZW50TWFwJyk7XG5cbnZhciBUUkFOU0ZPUk0gPSBudWxsO1xuXG4vKipcbiAqIERPTVJlbmRlcmVyIGlzIGEgY2xhc3MgcmVzcG9uc2libGUgZm9yIGFkZGluZyBlbGVtZW50c1xuICogdG8gdGhlIERPTSBhbmQgd3JpdGluZyB0byB0aG9zZSBlbGVtZW50cy5cbiAqIFRoZXJlIGlzIGEgRE9NUmVuZGVyZXIgcGVyIGNvbnRleHQsIHJlcHJlc2VudGVkIGFzIGFuXG4gKiBlbGVtZW50IGFuZCBhIHNlbGVjdG9yLiBJdCBpcyBpbnN0YW50aWF0ZWQgaW4gdGhlXG4gKiBjb250ZXh0IGNsYXNzLlxuICpcbiAqIEBjbGFzcyBET01SZW5kZXJlclxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciB0aGUgc2VsZWN0b3Igb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0NvbXBvc2l0b3J9IGNvbXBvc2l0b3IgdGhlIGNvbXBvc2l0b3IgY29udHJvbGxpbmcgdGhlIHJlbmRlcmVyXG4gKi9cbmZ1bmN0aW9uIERPTVJlbmRlcmVyIChlbGVtZW50LCBzZWxlY3RvciwgY29tcG9zaXRvcikge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmFtb3VzLWRvbS1yZW5kZXJlcicpO1xuXG4gICAgVFJBTlNGT1JNID0gVFJBTlNGT1JNIHx8IHZlbmRvclByZWZpeCgndHJhbnNmb3JtJyk7XG4gICAgdGhpcy5fY29tcG9zaXRvciA9IGNvbXBvc2l0b3I7IC8vIGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb3NpdG9yXG5cbiAgICB0aGlzLl90YXJnZXQgPSBudWxsOyAvLyBhIHJlZ2lzdGVyIGZvciBob2xkaW5nIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCB0aGF0IHRoZSBSZW5kZXJlciBpcyBvcGVyYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cG9uXG5cbiAgICB0aGlzLl9wYXJlbnQgPSBudWxsOyAvLyBhIHJlZ2lzdGVyIGZvciBob2xkaW5nIHRoZSBwYXJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUgdGFyZ2V0XG5cbiAgICB0aGlzLl9wYXRoID0gbnVsbDsgLy8gYSByZWdpc3RlciBmb3IgaG9sZGluZyB0aGUgcGF0aCBvZiB0aGUgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgcmVnaXN0ZXIgbXVzdCBiZSBzZXQgZmlyc3QsIGFuZCB0aGVuXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIGNoaWxkcmVuLCB0YXJnZXQsIGFuZCBwYXJlbnQgYXJlIGFsbCBsb29rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gdXAgZnJvbSB0aGF0LlxuXG4gICAgdGhpcy5fY2hpbGRyZW4gPSBbXTsgLy8gYSByZWdpc3RlciBmb3IgaG9sZGluZyB0aGUgY2hpbGRyZW4gb2YgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudCB0YXJnZXQuXG5cbiAgICB0aGlzLl9yb290ID0gbmV3IEVsZW1lbnRDYWNoZShlbGVtZW50LCBzZWxlY3Rvcik7IC8vIHRoZSByb290XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUgZG9tIHRyZWUgdGhhdCB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW5kZXJlciBpcyByZXNwb25zaWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yXG5cbiAgICB0aGlzLl9ib3VuZFRyaWdnZXJFdmVudCA9IHRoaXMuX3RyaWdnZXJFdmVudC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvcjtcblxuICAgIHRoaXMuX2VsZW1lbnRzID0ge307XG5cbiAgICB0aGlzLl9lbGVtZW50c1tzZWxlY3Rvcl0gPSB0aGlzLl9yb290O1xuXG4gICAgdGhpcy5wZXJzcGVjdGl2ZVRyYW5zZm9ybSA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdKTtcbiAgICB0aGlzLl9WUHRyYW5zZm9ybSA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdKTtcblxuICAgIHRoaXMuX3NpemUgPSBbbnVsbCwgbnVsbF07XG59XG5cblxuLyoqXG4gKiBBdHRhY2hlcyBhbiBFdmVudExpc3RlbmVyIHRvIHRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgcGFzc2VkIGluIHBhdGguXG4gKiBQcmV2ZW50cyB0aGUgZGVmYXVsdCBicm93c2VyIGFjdGlvbiBvbiBhbGwgc3Vic2VxdWVudCBldmVudHMgaWZcbiAqIGBwcmV2ZW50RGVmYXVsdGAgaXMgdHJ1dGh5LlxuICogQWxsIGluY29taW5nIGV2ZW50cyB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgY29tcG9zaXRvciBieSBpbnZva2luZyB0aGVcbiAqIGBzZW5kRXZlbnRgIG1ldGhvZC5cbiAqIERlbGVnYXRlcyBldmVudHMgaWYgcG9zc2libGUgYnkgYXR0YWNoaW5nIHRoZSBldmVudCBsaXN0ZW5lciB0byB0aGUgY29udGV4dC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgRE9NIGV2ZW50IHR5cGUgKGUuZy4gY2xpY2ssIG1vdXNlb3ZlcikuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHByZXZlbnREZWZhdWx0IFdoZXRoZXIgb3Igbm90IHRoZSBkZWZhdWx0IGJyb3dzZXIgYWN0aW9uIHNob3VsZCBiZSBwcmV2ZW50ZWQuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZSh0eXBlLCBwcmV2ZW50RGVmYXVsdCkge1xuICAgIC8vIFRPRE8gcHJldmVudERlZmF1bHQgc2hvdWxkIGJlIGEgc2VwYXJhdGUgY29tbWFuZFxuICAgIHRoaXMuX2Fzc2VydFRhcmdldExvYWRlZCgpO1xuXG4gICAgdGhpcy5fdGFyZ2V0LnByZXZlbnREZWZhdWx0W3R5cGVdID0gcHJldmVudERlZmF1bHQ7XG4gICAgdGhpcy5fdGFyZ2V0LnN1YnNjcmliZVt0eXBlXSA9IHRydWU7XG5cbiAgICBpZiAoXG4gICAgICAgICF0aGlzLl90YXJnZXQubGlzdGVuZXJzW3R5cGVdICYmICF0aGlzLl9yb290Lmxpc3RlbmVyc1t0eXBlXVxuICAgICkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnRNYXBbdHlwZV1bMV0gPyB0aGlzLl9yb290IDogdGhpcy5fdGFyZ2V0O1xuICAgICAgICB0YXJnZXQubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5fYm91bmRUcmlnZ2VyRXZlbnQ7XG4gICAgICAgIHRhcmdldC5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5fYm91bmRUcmlnZ2VyRXZlbnQpO1xuICAgIH1cbn07XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gYmUgYWRkZWQgdXNpbmcgYGFkZEV2ZW50TGlzdGVuZXJgIHRvIHRoZSBjb3JyZXNwb25kaW5nXG4gKiBET01FbGVtZW50LlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXYgRE9NIEV2ZW50IHBheWxvYWRcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuX3RyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIF90cmlnZ2VyRXZlbnQoZXYpIHtcbiAgICAvLyBVc2UgZXYucGF0aCwgd2hpY2ggaXMgYW4gYXJyYXkgb2YgRWxlbWVudHMgKHBvbHlmaWxsZWQgaWYgbmVlZGVkKS5cbiAgICB2YXIgZXZQYXRoID0gZXYucGF0aCA/IGV2LnBhdGggOiBfZ2V0UGF0aChldik7XG4gICAgLy8gRmlyc3QgZWxlbWVudCBpbiB0aGUgcGF0aCBpcyB0aGUgZWxlbWVudCBvbiB3aGljaCB0aGUgZXZlbnQgaGFzIGFjdHVhbGx5XG4gICAgLy8gYmVlbiBlbWl0dGVkLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIFNraXAgbm9kZXMgdGhhdCBkb24ndCBoYXZlIGEgZGF0YXNldCBwcm9wZXJ0eSBvciBkYXRhLWZhLXBhdGhcbiAgICAgICAgLy8gYXR0cmlidXRlLlxuICAgICAgICBpZiAoIWV2UGF0aFtpXS5kYXRhc2V0KSBjb250aW51ZTtcbiAgICAgICAgdmFyIHBhdGggPSBldlBhdGhbaV0uZGF0YXNldC5mYVBhdGg7XG4gICAgICAgIGlmICghcGF0aCkgY29udGludWU7XG5cbiAgICAgICAgLy8gU3RvcCBmdXJ0aGVyIGV2ZW50IHByb3BvZ2F0aW9uIGFuZCBwYXRoIHRyYXZlcnNhbCBhcyBzb29uIGFzIHRoZVxuICAgICAgICAvLyBmaXJzdCBFbGVtZW50Q2FjaGUgc3Vic2NyaWJpbmcgZm9yIHRoZSBlbWl0dGVkIGV2ZW50IGhhcyBiZWVuIGZvdW5kLlxuICAgICAgICBpZiAodGhpcy5fZWxlbWVudHNbcGF0aF0uc3Vic2NyaWJlW2V2LnR5cGVdKSB7XG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBwcmV2ZW50RGVmYXVsdC4gVGhpcyBuZWVkcyBmb3J0aGVyIGNvbnNpZGVyYXRpb24gYW5kXG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgb3B0aW9uYWwuIEV2ZW50dWFsbHkgdGhpcyBzaG91bGQgYmUgYSBzZXBhcmF0ZSBjb21tYW5kL1xuICAgICAgICAgICAgLy8gbWV0aG9kLlxuICAgICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRzW3BhdGhdLnByZXZlbnREZWZhdWx0W2V2LnR5cGVdKSB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIE5vcm1hbGl6ZWRFdmVudENvbnN0cnVjdG9yID0gZXZlbnRNYXBbZXYudHlwZV1bMF07XG5cbiAgICAgICAgICAgIC8vIEZpbmFsbHkgc2VuZCB0aGUgZXZlbnQgdG8gdGhlIFdvcmtlciBUaHJlYWQgdGhyb3VnaCB0aGVcbiAgICAgICAgICAgIC8vIGNvbXBvc2l0b3IuXG4gICAgICAgICAgICB0aGlzLl9jb21wb3NpdG9yLnNlbmRFdmVudChwYXRoLCBldi50eXBlLCBuZXcgTm9ybWFsaXplZEV2ZW50Q29uc3RydWN0b3IoZXYpKTtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbi8qKlxuICogZ2V0U2l6ZU9mIGdldHMgdGhlIGRvbSBzaXplIG9mIGEgcGFydGljdWxhciBET00gZWxlbWVudC4gIFRoaXMgaXNcbiAqIG5lZWRlZCBmb3IgcmVuZGVyIHNpemluZyBpbiB0aGUgc2NlbmUgZ3JhcGguXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIHBhdGggb2YgdGhlIE5vZGUgaW4gdGhlIHNjZW5lIGdyYXBoXG4gKlxuICogQHJldHVybiB7QXJyYXl9IGEgdmVjMyBvZiB0aGUgb2Zmc2V0IHNpemUgb2YgdGhlIGRvbSBlbGVtZW50XG4gKi9cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5nZXRTaXplT2YgPSBmdW5jdGlvbiBnZXRTaXplT2YocGF0aCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbcGF0aF07XG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm4gbnVsbDtcblxuICAgIHZhciByZXMgPSB7dmFsOiBlbGVtZW50LnNpemV9O1xuICAgIHRoaXMuX2NvbXBvc2l0b3Iuc2VuZEV2ZW50KHBhdGgsICdyZXNpemUnLCByZXMpO1xuICAgIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0UGF0aChldikge1xuICAgIC8vIFRPRE8gbW92ZSBpbnRvIF90cmlnZ2VyRXZlbnQsIGF2b2lkIG9iamVjdCBhbGxvY2F0aW9uXG4gICAgdmFyIHBhdGggPSBbXTtcbiAgICB2YXIgbm9kZSA9IGV2LnRhcmdldDtcbiAgICB3aGlsZSAobm9kZSAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBwYXRoLnB1c2gobm9kZSk7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgc2l6ZSBvZiB0aGUgY29udGV4dCBieSBxdWVyeWluZyB0aGUgRE9NIGZvciBgb2Zmc2V0V2lkdGhgIGFuZFxuICogYG9mZnNldEhlaWdodGAuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBPZmZzZXQgc2l6ZS5cbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHRoaXMuX3NpemVbMF0gPSB0aGlzLl9yb290LmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5fc2l6ZVsxXSA9IHRoaXMuX3Jvb3QuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG59O1xuXG5ET01SZW5kZXJlci5wcm90b3R5cGUuX2dldFNpemUgPSBET01SZW5kZXJlci5wcm90b3R5cGUuZ2V0U2l6ZTtcblxuXG4vKipcbiAqIEV4ZWN1dGVzIHRoZSByZXRyaWV2ZWQgZHJhdyBjb21tYW5kcy4gRHJhdyBjb21tYW5kcyBvbmx5IHJlZmVyIHRvIHRoZVxuICogY3Jvc3MtYnJvd3NlciBub3JtYWxpemVkIGB0cmFuc2Zvcm1gIHByb3BlcnR5LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyU3RhdGUgZGVzY3JpcHRpb25cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIGRyYXcocmVuZGVyU3RhdGUpIHtcbiAgICBpZiAocmVuZGVyU3RhdGUucGVyc3BlY3RpdmVEaXJ0eSkge1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlRGlydHkgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMF0gPSByZW5kZXJTdGF0ZS5wZXJzcGVjdGl2ZVRyYW5zZm9ybVswXTtcbiAgICAgICAgdGhpcy5wZXJzcGVjdGl2ZVRyYW5zZm9ybVsxXSA9IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzFdO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzJdID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMl07XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmVUcmFuc2Zvcm1bM10gPSByZW5kZXJTdGF0ZS5wZXJzcGVjdGl2ZVRyYW5zZm9ybVszXTtcblxuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzRdID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bNF07XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmVUcmFuc2Zvcm1bNV0gPSByZW5kZXJTdGF0ZS5wZXJzcGVjdGl2ZVRyYW5zZm9ybVs1XTtcbiAgICAgICAgdGhpcy5wZXJzcGVjdGl2ZVRyYW5zZm9ybVs2XSA9IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzZdO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzddID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bN107XG5cbiAgICAgICAgdGhpcy5wZXJzcGVjdGl2ZVRyYW5zZm9ybVs4XSA9IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzhdO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzldID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bOV07XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMTBdID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMTBdO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzExXSA9IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzExXTtcblxuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzEyXSA9IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzEyXTtcbiAgICAgICAgdGhpcy5wZXJzcGVjdGl2ZVRyYW5zZm9ybVsxM10gPSByZW5kZXJTdGF0ZS5wZXJzcGVjdGl2ZVRyYW5zZm9ybVsxM107XG4gICAgICAgIHRoaXMucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMTRdID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMTRdO1xuICAgICAgICB0aGlzLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzE1XSA9IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzE1XTtcbiAgICB9XG5cbiAgICBpZiAocmVuZGVyU3RhdGUudmlld0RpcnR5IHx8IHJlbmRlclN0YXRlLnBlcnNwZWN0aXZlRGlydHkpIHtcbiAgICAgICAgbWF0aC5tdWx0aXBseSh0aGlzLl9WUHRyYW5zZm9ybSwgdGhpcy5wZXJzcGVjdGl2ZVRyYW5zZm9ybSwgcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybSk7XG4gICAgICAgIHRoaXMuX3Jvb3QuZWxlbWVudC5zdHlsZVtUUkFOU0ZPUk1dID0gdGhpcy5fc3RyaW5naWZ5TWF0cml4KHRoaXMuX1ZQdHJhbnNmb3JtKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIGZ1bmN0aW9uIHVzZWQgZm9yIGVuc3VyaW5nIHRoYXQgYSBwYXRoIGlzIGN1cnJlbnRseSBsb2FkZWQuXG4gKlxuICogQG1ldGhvZFxuICogQHByaXZhdGVcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuX2Fzc2VydFBhdGhMb2FkZWQgPSBmdW5jdGlvbiBfYXNzZXJQYXRoTG9hZGVkKCkge1xuICAgIGlmICghdGhpcy5fcGF0aCkgdGhyb3cgbmV3IEVycm9yKCdwYXRoIG5vdCBsb2FkZWQnKTtcbn07XG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIGZ1bmN0aW9uIHVzZWQgZm9yIGVuc3VyaW5nIHRoYXQgYSBwYXJlbnQgaXMgY3VycmVudGx5IGxvYWRlZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5fYXNzZXJ0UGFyZW50TG9hZGVkID0gZnVuY3Rpb24gX2Fzc2VydFBhcmVudExvYWRlZCgpIHtcbiAgICBpZiAoIXRoaXMuX3BhcmVudCkgdGhyb3cgbmV3IEVycm9yKCdwYXJlbnQgbm90IGxvYWRlZCcpO1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBoZWxwZXIgZnVuY3Rpb24gdXNlZCBmb3IgZW5zdXJpbmcgdGhhdCBjaGlsZHJlbiBhcmUgY3VycmVudGx5XG4gKiBsb2FkZWQuXG4gKlxuICogQG1ldGhvZFxuICogQHByaXZhdGVcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuX2Fzc2VydENoaWxkcmVuTG9hZGVkID0gZnVuY3Rpb24gX2Fzc2VydENoaWxkcmVuTG9hZGVkKCkge1xuICAgIGlmICghdGhpcy5fY2hpbGRyZW4pIHRocm93IG5ldyBFcnJvcignY2hpbGRyZW4gbm90IGxvYWRlZCcpO1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBoZWxwZXIgZnVuY3Rpb24gdXNlZCBmb3IgZW5zdXJpbmcgdGhhdCBhIHRhcmdldCBpcyBjdXJyZW50bHkgbG9hZGVkLlxuICpcbiAqIEBtZXRob2QgIF9hc3NlcnRUYXJnZXRMb2FkZWRcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuX2Fzc2VydFRhcmdldExvYWRlZCA9IGZ1bmN0aW9uIF9hc3NlcnRUYXJnZXRMb2FkZWQoKSB7XG4gICAgaWYgKCF0aGlzLl90YXJnZXQpIHRocm93IG5ldyBFcnJvcignTm8gdGFyZ2V0IGxvYWRlZCcpO1xufTtcblxuLyoqXG4gKiBGaW5kcyBhbmQgc2V0cyB0aGUgcGFyZW50IG9mIHRoZSBjdXJyZW50bHkgbG9hZGVkIGVsZW1lbnQgKHBhdGgpLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHJldHVybiB7RWxlbWVudENhY2hlfSBQYXJlbnQgZWxlbWVudC5cbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLmZpbmRQYXJlbnQgPSBmdW5jdGlvbiBmaW5kUGFyZW50ICgpIHtcbiAgICB0aGlzLl9hc3NlcnRQYXRoTG9hZGVkKCk7XG5cbiAgICB2YXIgcGF0aCA9IHRoaXMuX3BhdGg7XG4gICAgdmFyIHBhcmVudDtcblxuICAgIHdoaWxlICghcGFyZW50ICYmIHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuICAgICAgICBwYXJlbnQgPSB0aGlzLl9lbGVtZW50c1twYXRoXTtcbiAgICB9XG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIHJldHVybiBwYXJlbnQ7XG59O1xuXG5cbi8qKlxuICogRmluZHMgYWxsIGNoaWxkcmVuIG9mIHRoZSBjdXJyZW50bHkgbG9hZGVkIGVsZW1lbnQuXG4gKlxuICogQG1ldGhvZFxuICogQHByaXZhdGVcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBPdXRwdXQtQXJyYXkgdXNlZCBmb3Igd3JpdGluZyB0byAoc3Vic2VxdWVudGx5IGFwcGVuZGluZyBjaGlsZHJlbilcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gYXJyYXkgb2YgY2hpbGRyZW4gZWxlbWVudHNcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLmZpbmRDaGlsZHJlbiA9IGZ1bmN0aW9uIGZpbmRDaGlsZHJlbihhcnJheSkge1xuICAgIC8vIFRPRE86IE9wdGltaXplIG1lLlxuICAgIHRoaXMuX2Fzc2VydFBhdGhMb2FkZWQoKTtcblxuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aCArICcvJztcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2VsZW1lbnRzKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxlbjtcbiAgICBhcnJheSA9IGFycmF5ID8gYXJyYXkgOiB0aGlzLl9jaGlsZHJlbjtcblxuICAgIHRoaXMuX2NoaWxkcmVuLmxlbmd0aCA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChrZXlzW2ldLmluZGV4T2YocGF0aCkgPT09IC0xIHx8IGtleXNbaV0gPT09IHBhdGgpIGtleXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBlbHNlIGkrKztcbiAgICB9XG4gICAgdmFyIGN1cnJlbnRQYXRoO1xuICAgIHZhciBqID0gMDtcbiAgICBmb3IgKGkgPSAwIDsgaSA8IGtleXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRQYXRoID0ga2V5c1tpXTtcbiAgICAgICAgZm9yIChqID0gMCA7IGogPCBrZXlzLmxlbmd0aCA7IGorKykge1xuICAgICAgICAgICAgaWYgKGkgIT09IGogJiYga2V5c1tqXS5pbmRleE9mKGN1cnJlbnRQYXRoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMCwgbGVuID0ga2V5cy5sZW5ndGggOyBpIDwgbGVuIDsgaSsrKVxuICAgICAgICBhcnJheVtpXSA9IHRoaXMuX2VsZW1lbnRzW2tleXNbaV1dO1xuXG4gICAgcmV0dXJuIGFycmF5O1xufTtcblxuXG4vKipcbiAqIFVzZWQgZm9yIGRldGVybWluaW5nIHRoZSB0YXJnZXQgbG9hZGVkIHVuZGVyIHRoZSBjdXJyZW50IHBhdGguXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0VsZW1lbnRDYWNoZXx1bmRlZmluZWR9IEVsZW1lbnQgbG9hZGVkIHVuZGVyIGRlZmluZWQgcGF0aC5cbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLmZpbmRUYXJnZXQgPSBmdW5jdGlvbiBmaW5kVGFyZ2V0KCkge1xuICAgIHRoaXMuX3RhcmdldCA9IHRoaXMuX2VsZW1lbnRzW3RoaXMuX3BhdGhdO1xuICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG59O1xuXG5cbi8qKlxuICogTG9hZHMgdGhlIHBhc3NlZCBpbiBwYXRoLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBQYXRoIHRvIGJlIGxvYWRlZFxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gTG9hZGVkIHBhdGhcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLmxvYWRQYXRoID0gZnVuY3Rpb24gbG9hZFBhdGggKHBhdGgpIHtcbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgICByZXR1cm4gdGhpcy5fcGF0aDtcbn07XG5cblxuLyoqXG4gKiBJbnNlcnRzIGEgRE9NRWxlbWVudCBhdCB0aGUgY3VycmVudGx5IGxvYWRlZCBwYXRoLCBhc3N1bWluZyBubyB0YXJnZXQgaXNcbiAqIGxvYWRlZC4gT25seSBvbmUgRE9NRWxlbWVudCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIGVhY2ggcGF0aC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhZ05hbWUgVGFnIG5hbWUgKGNhcGl0YWxpemF0aW9uIHdpbGwgYmUgbm9ybWFsaXplZCkuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLmluc2VydEVsID0gZnVuY3Rpb24gaW5zZXJ0RWwgKHRhZ05hbWUpIHtcbiAgICBpZiAoIXRoaXMuX3RhcmdldCB8fFxuICAgICAgICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0YWdOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblxuICAgICAgICB0aGlzLmZpbmRQYXJlbnQoKTtcbiAgICAgICAgdGhpcy5maW5kQ2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLl9hc3NlcnRQYXJlbnRMb2FkZWQoKTtcbiAgICAgICAgdGhpcy5fYXNzZXJ0Q2hpbGRyZW5Mb2FkZWQoKTtcblxuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0KSB0aGlzLl9wYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLl90YXJnZXQuZWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gbmV3IEVsZW1lbnRDYWNoZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpLCB0aGlzLl9wYXRoKTtcbiAgICAgICAgdGhpcy5fcGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fdGFyZ2V0LmVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9lbGVtZW50c1t0aGlzLl9wYXRoXSA9IHRoaXMuX3RhcmdldDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoIDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2hpbGRyZW5baV0uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbi8qKlxuICogU2V0cyBhIHByb3BlcnR5IG9uIHRoZSBjdXJyZW50bHkgbG9hZGVkIHRhcmdldC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgUHJvcGVydHkgbmFtZSAoZS5nLiBiYWNrZ3JvdW5kLCBjb2xvciwgZm9udClcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBQcm9wcnR5IHZhbHVlIChlLmcuIGJsYWNrLCAyMHB4KVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5zZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIHNldFByb3BlcnR5IChuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMuX2Fzc2VydFRhcmdldExvYWRlZCgpO1xuICAgIHRoaXMuX3RhcmdldC5lbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgY3VycmVudGx5IGxvYWRlZCB0YXJnZXQuXG4gKiBSZW1vdmVzIGFueSBleHBsaWNpdCBzaXppbmcgY29uc3RyYWludHMgd2hlbiBwYXNzZWQgaW4gYGZhbHNlYFxuICogKFwidHJ1ZS1zaXppbmdcIikuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfGZhbHNlfSB3aWR0aCAgIFdpZHRoIHRvIGJlIHNldC5cbiAqIEBwYXJhbSB7TnVtYmVyfGZhbHNlfSBoZWlnaHQgIEhlaWdodCB0byBiZSBzZXQuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5fYXNzZXJ0VGFyZ2V0TG9hZGVkKCk7XG5cbiAgICB0aGlzLnNldFdpZHRoKHdpZHRoKTtcbiAgICB0aGlzLnNldEhlaWdodChoZWlnaHQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgY3VycmVudGx5IGxvYWRlZCB0YXJnZXQuXG4gKiBSZW1vdmVzIGFueSBleHBsaWNpdCBzaXppbmcgY29uc3RyYWludHMgd2hlbiBwYXNzZWQgaW4gYGZhbHNlYFxuICogKFwidHJ1ZS1zaXppbmdcIikuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfGZhbHNlfSB3aWR0aCBXaWR0aCB0byBiZSBzZXQuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLnNldFdpZHRoID0gZnVuY3Rpb24gc2V0V2lkdGgod2lkdGgpIHtcbiAgICB0aGlzLl9hc3NlcnRUYXJnZXRMb2FkZWQoKTtcblxuICAgIHZhciBjb250ZW50V3JhcHBlciA9IHRoaXMuX3RhcmdldC5jb250ZW50O1xuXG4gICAgaWYgKHdpZHRoID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLl90YXJnZXQuZXhwbGljaXRXaWR0aCA9IHRydWU7XG4gICAgICAgIGlmIChjb250ZW50V3JhcHBlcikgY29udGVudFdyYXBwZXIuc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgd2lkdGggPSBjb250ZW50V3JhcHBlciA/IGNvbnRlbnRXcmFwcGVyLm9mZnNldFdpZHRoIDogMDtcbiAgICAgICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl90YXJnZXQuZXhwbGljaXRXaWR0aCA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udGVudFdyYXBwZXIpIGNvbnRlbnRXcmFwcGVyLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLl90YXJnZXQuZWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICB9XG5cbiAgICB0aGlzLl90YXJnZXQuc2l6ZVswXSA9IHdpZHRoO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGN1cnJlbnRseSBsb2FkZWQgdGFyZ2V0LlxuICogUmVtb3ZlcyBhbnkgZXhwbGljaXQgc2l6aW5nIGNvbnN0cmFpbnRzIHdoZW4gcGFzc2VkIGluIGBmYWxzZWBcbiAqIChcInRydWUtc2l6aW5nXCIpLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcnxmYWxzZX0gaGVpZ2h0IEhlaWdodCB0byBiZSBzZXQuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uIHNldEhlaWdodChoZWlnaHQpIHtcbiAgICB0aGlzLl9hc3NlcnRUYXJnZXRMb2FkZWQoKTtcblxuICAgIHZhciBjb250ZW50V3JhcHBlciA9IHRoaXMuX3RhcmdldC5jb250ZW50O1xuXG4gICAgaWYgKGhlaWdodCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0LmV4cGxpY2l0SGVpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNvbnRlbnRXcmFwcGVyKSBjb250ZW50V3JhcHBlci5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgaGVpZ2h0ID0gY29udGVudFdyYXBwZXIgPyBjb250ZW50V3JhcHBlci5vZmZzZXRIZWlnaHQgOiAwO1xuICAgICAgICB0aGlzLl90YXJnZXQuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0LmV4cGxpY2l0SGVpZ2h0ID0gZmFsc2U7XG4gICAgICAgIGlmIChjb250ZW50V3JhcHBlcikgY29udGVudFdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICB9XG5cbiAgICB0aGlzLl90YXJnZXQuc2l6ZVsxXSA9IGhlaWdodDtcbn07XG5cbi8qKlxuICogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIGN1cnJlbnRseSBsb2FkZWQgdGFyZ2V0LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBBdHRyaWJ1dGUgbmFtZSAoZS5nLiBocmVmKVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZSAoZS5nLiBodHRwOi8vZmFtb3VzLm9yZylcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24gc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXNzZXJ0VGFyZ2V0TG9hZGVkKCk7XG4gICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgYGlubmVySFRNTGAgY29udGVudCBvZiB0aGUgY3VycmVudGx5IGxvYWRlZCB0YXJnZXQuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IENvbnRlbnQgdG8gYmUgc2V0IGFzIGBpbm5lckhUTUxgXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLl9hc3NlcnRUYXJnZXRMb2FkZWQoKTtcbiAgICB0aGlzLmZpbmRDaGlsZHJlbigpO1xuXG4gICAgaWYgKCF0aGlzLl90YXJnZXQuY29udGVudCkge1xuICAgICAgICB0aGlzLl90YXJnZXQuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl90YXJnZXQuY29udGVudC5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtZG9tLWVsZW1lbnQtY29udGVudCcpO1xuICAgICAgICB0aGlzLl90YXJnZXQuZWxlbWVudC5pbnNlcnRCZWZvcmUoXG4gICAgICAgICAgICB0aGlzLl90YXJnZXQuY29udGVudCxcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldC5lbGVtZW50LmZpcnN0Q2hpbGRcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fdGFyZ2V0LmNvbnRlbnQuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuc2V0U2l6ZShcbiAgICAgICAgdGhpcy5fdGFyZ2V0LmV4cGxpY2l0V2lkdGggPyBmYWxzZSA6IHRoaXMuX3RhcmdldC5zaXplWzBdLFxuICAgICAgICB0aGlzLl90YXJnZXQuZXhwbGljaXRIZWlnaHQgPyBmYWxzZSA6IHRoaXMuX3RhcmdldC5zaXplWzFdXG4gICAgKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBwYXNzZWQgaW4gdHJhbnNmb3JtIG1hdHJpeCAod29ybGQgc3BhY2UpLiBJbnZlcnRzIHRoZSBwYXJlbnQncyB3b3JsZFxuICogdHJhbnNmb3JtLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0Zsb2F0MzJBcnJheX0gdHJhbnNmb3JtIFRoZSB0cmFuc2Zvcm0gZm9yIHRoZSBsb2FkZWQgRE9NIEVsZW1lbnQgaW4gd29ybGQgc3BhY2VcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5ET01SZW5kZXJlci5wcm90b3R5cGUuc2V0TWF0cml4ID0gZnVuY3Rpb24gc2V0TWF0cml4KHRyYW5zZm9ybSkge1xuICAgIC8vIFRPRE8gRG9uJ3QgbXVsdGlwbHkgbWF0cmljcyBpbiB0aGUgZmlyc3QgcGxhY2UuXG4gICAgdGhpcy5fYXNzZXJ0VGFyZ2V0TG9hZGVkKCk7XG4gICAgdGhpcy5maW5kUGFyZW50KCk7XG4gICAgdmFyIHdvcmxkVHJhbnNmb3JtID0gdGhpcy5fdGFyZ2V0LndvcmxkVHJhbnNmb3JtO1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuO1xuXG4gICAgaWYgKHRyYW5zZm9ybSlcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gMTYgOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gY2hhbmdlZCA/IGNoYW5nZWQgOiB3b3JsZFRyYW5zZm9ybVtpXSA9PT0gdHJhbnNmb3JtW2ldO1xuICAgICAgICAgICAgd29ybGRUcmFuc2Zvcm1baV0gPSB0cmFuc2Zvcm1baV07XG4gICAgICAgIH1cbiAgICBlbHNlIGNoYW5nZWQgPSB0cnVlO1xuXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgbWF0aC5pbnZlcnQodGhpcy5fdGFyZ2V0LmludmVydGVkUGFyZW50LCB0aGlzLl9wYXJlbnQud29ybGRUcmFuc2Zvcm0pO1xuICAgICAgICBtYXRoLm11bHRpcGx5KHRoaXMuX3RhcmdldC5maW5hbFRyYW5zZm9ybSwgdGhpcy5fdGFyZ2V0LmludmVydGVkUGFyZW50LCB3b3JsZFRyYW5zZm9ybSk7XG5cbiAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBhIHRlbXBvcmFyeSBmaXggZm9yIGRyYXcgY29tbWFuZHNcbiAgICAgICAgLy8gY29taW5nIGluIG91dCBvZiBvcmRlclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmZpbmRDaGlsZHJlbihbXSk7XG4gICAgICAgIHZhciBwcmV2aW91c1BhdGggPSB0aGlzLl9wYXRoO1xuICAgICAgICB2YXIgcHJldmlvdXNUYXJnZXQgPSB0aGlzLl90YXJnZXQ7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aCA7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgdGhpcy5fcGF0aCA9IHRoaXMuX3RhcmdldC5wYXRoO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXRyaXgoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXRoID0gcHJldmlvdXNQYXRoO1xuICAgICAgICB0aGlzLl90YXJnZXQgPSBwcmV2aW91c1RhcmdldDtcbiAgICB9XG5cbiAgICB0aGlzLl90YXJnZXQuZWxlbWVudC5zdHlsZVtUUkFOU0ZPUk1dID0gdGhpcy5fc3RyaW5naWZ5TWF0cml4KHRoaXMuX3RhcmdldC5maW5hbFRyYW5zZm9ybSk7XG59O1xuXG5cbi8qKlxuICogQWRkcyBhIGNsYXNzIHRvIHRoZSBjbGFzc0xpc3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50bHkgbG9hZGVkIHRhcmdldC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRvbUNsYXNzIENsYXNzIG5hbWUgdG8gYmUgYWRkZWQgdG8gdGhlIGN1cnJlbnQgdGFyZ2V0LlxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGRvbUNsYXNzKSB7XG4gICAgdGhpcy5fYXNzZXJ0VGFyZ2V0TG9hZGVkKCk7XG4gICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZChkb21DbGFzcyk7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGNsYXNzTGlzdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnRseSBsb2FkZWRcbiAqIHRhcmdldC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRvbUNsYXNzIENsYXNzIG5hbWUgdG8gYmUgcmVtb3ZlZCBmcm9tIGN1cnJlbnRseSBsb2FkZWQgdGFyZ2V0LlxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGRvbUNsYXNzKSB7XG4gICAgdGhpcy5fYXNzZXJ0VGFyZ2V0TG9hZGVkKCk7XG4gICAgdGhpcy5fdGFyZ2V0LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShkb21DbGFzcyk7XG59O1xuXG5cbi8qKlxuICogU3RyaW5naWZpZXMgdGhlIHBhc3NlZCBpbiBtYXRyaXggZm9yIHNldHRpbmcgdGhlIGB0cmFuc2Zvcm1gIHByb3BlcnR5LlxuICpcbiAqIEBtZXRob2QgIF9zdHJpbmdpZnlNYXRyaXhcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtBcnJheX0gbSAgICBNYXRyaXggYXMgYW4gYXJyYXkgb3IgYXJyYXktbGlrZSBvYmplY3QuXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICBTdHJpbmdpZmllZCBtYXRyaXggYXMgYG1hdHJpeDNkYC1wcm9wZXJ0eS5cbiAqL1xuRE9NUmVuZGVyZXIucHJvdG90eXBlLl9zdHJpbmdpZnlNYXRyaXggPSBmdW5jdGlvbiBfc3RyaW5naWZ5TWF0cml4KG0pIHtcbiAgICB2YXIgciA9ICdtYXRyaXgzZCgnO1xuXG4gICAgciArPSAobVswXSA8IDAuMDAwMDAxICYmIG1bMF0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bMF0gKyAnLCc7XG4gICAgciArPSAobVsxXSA8IDAuMDAwMDAxICYmIG1bMV0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bMV0gKyAnLCc7XG4gICAgciArPSAobVsyXSA8IDAuMDAwMDAxICYmIG1bMl0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bMl0gKyAnLCc7XG4gICAgciArPSAobVszXSA8IDAuMDAwMDAxICYmIG1bM10gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bM10gKyAnLCc7XG4gICAgciArPSAobVs0XSA8IDAuMDAwMDAxICYmIG1bNF0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bNF0gKyAnLCc7XG4gICAgciArPSAobVs1XSA8IDAuMDAwMDAxICYmIG1bNV0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bNV0gKyAnLCc7XG4gICAgciArPSAobVs2XSA8IDAuMDAwMDAxICYmIG1bNl0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bNl0gKyAnLCc7XG4gICAgciArPSAobVs3XSA8IDAuMDAwMDAxICYmIG1bN10gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bN10gKyAnLCc7XG4gICAgciArPSAobVs4XSA8IDAuMDAwMDAxICYmIG1bOF0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bOF0gKyAnLCc7XG4gICAgciArPSAobVs5XSA8IDAuMDAwMDAxICYmIG1bOV0gPiAtMC4wMDAwMDEpID8gJzAsJyA6IG1bOV0gKyAnLCc7XG4gICAgciArPSAobVsxMF0gPCAwLjAwMDAwMSAmJiBtWzEwXSA+IC0wLjAwMDAwMSkgPyAnMCwnIDogbVsxMF0gKyAnLCc7XG4gICAgciArPSAobVsxMV0gPCAwLjAwMDAwMSAmJiBtWzExXSA+IC0wLjAwMDAwMSkgPyAnMCwnIDogbVsxMV0gKyAnLCc7XG4gICAgciArPSAobVsxMl0gPCAwLjAwMDAwMSAmJiBtWzEyXSA+IC0wLjAwMDAwMSkgPyAnMCwnIDogbVsxMl0gKyAnLCc7XG4gICAgciArPSAobVsxM10gPCAwLjAwMDAwMSAmJiBtWzEzXSA+IC0wLjAwMDAwMSkgPyAnMCwnIDogbVsxM10gKyAnLCc7XG4gICAgciArPSAobVsxNF0gPCAwLjAwMDAwMSAmJiBtWzE0XSA+IC0wLjAwMDAwMSkgPyAnMCwnIDogbVsxNF0gKyAnLCc7XG5cbiAgICByICs9IG1bMTVdICsgJyknO1xuICAgIHJldHVybiByO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBET01SZW5kZXJlcjtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFRyYW5zZm9ybSBpZGVudGl0eSBtYXRyaXguIFxudmFyIGlkZW50ID0gW1xuICAgIDEsIDAsIDAsIDAsXG4gICAgMCwgMSwgMCwgMCxcbiAgICAwLCAwLCAxLCAwLFxuICAgIDAsIDAsIDAsIDFcbl07XG5cbi8qKlxuICogRWxlbWVudENhY2hlIGlzIGJlaW5nIHVzZWQgZm9yIGtlZXBpbmcgdHJhY2sgb2YgYW4gZWxlbWVudCdzIERPTSBFbGVtZW50LFxuICogcGF0aCwgd29ybGQgdHJhbnNmb3JtLCBpbnZlcnRlZCBwYXJlbnQsIGZpbmFsIHRyYW5zZm9ybSAoYXMgYmVpbmcgdXNlZCBmb3JcbiAqIHNldHRpbmcgdGhlIGFjdHVhbCBgdHJhbnNmb3JtYC1wcm9wZXJ0eSkgYW5kIHBvc3QgcmVuZGVyIHNpemUgKGZpbmFsIHNpemUgYXNcbiAqIGJlaW5nIHJlbmRlcmVkIHRvIHRoZSBET00pLlxuICogXG4gKiBAY2xhc3MgRWxlbWVudENhY2hlXG4gKiAgXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgRE9NRWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggUGF0aCB1c2VkIGZvciB1bmlxdWVseSBpZGVudGlmeWluZyB0aGUgbG9jYXRpb24gaW4gdGhlIHNjZW5lIGdyYXBoLlxuICovIFxuZnVuY3Rpb24gRWxlbWVudENhY2hlIChlbGVtZW50LCBwYXRoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgdGhpcy5zaXplID0gbmV3IEludDE2QXJyYXkoMyk7XG4gICAgdGhpcy5leHBsaWNpdEhlaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuZXhwbGljaXRXaWR0aCA9IGZhbHNlO1xuICAgIHRoaXMud29ybGRUcmFuc2Zvcm0gPSBuZXcgRmxvYXQzMkFycmF5KGlkZW50KTtcbiAgICB0aGlzLmludmVydGVkUGFyZW50ID0gbmV3IEZsb2F0MzJBcnJheShpZGVudCk7XG4gICAgdGhpcy5maW5hbFRyYW5zZm9ybSA9IG5ldyBGbG9hdDMyQXJyYXkoaWRlbnQpO1xuICAgIHRoaXMucG9zdFJlbmRlclNpemUgPSBuZXcgRmxvYXQzMkFycmF5KDIpO1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IHt9O1xuICAgIHRoaXMuc3Vic2NyaWJlID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudENhY2hlO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgbWV0aG9kIGZvciBpbnZlcnRpbmcgYSB0cmFuc2Zvcm0gbWF0cml4XG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG91dCBhcnJheSB0byBzdG9yZSB0aGUgcmV0dXJuIG9mIHRoZSBpbnZlcnNpb25cbiAqIEBwYXJhbSB7QXJyYXl9IGEgdHJhbnNmb3JtIG1hdHJpeCB0byBpbnZlcnNlXG4gKlxuICogQHJldHVybiB7QXJyYXl9IG91dFxuICogICBvdXRwdXQgYXJyYXkgdGhhdCBpcyBzdG9yaW5nIHRoZSB0cmFuc2Zvcm0gbWF0cml4XG4gKi9cbmZ1bmN0aW9uIGludmVydCAob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQSBtZXRob2QgZm9yIG11bHRpcGx5aW5nIHR3byBtYXRyaWNpZXNcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gb3V0IGFycmF5IHRvIHN0b3JlIHRoZSByZXR1cm4gb2YgdGhlIG11bHRpcGxpY2F0aW9uXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRyYW5zZm9ybSBtYXRyaXggdG8gbXVsdGlwbHlcbiAqIEBwYXJhbSB7QXJyYXl9IGIgdHJhbnNmb3JtIG1hdHJpeCB0byBtdWx0aXBseVxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBvdXRcbiAqICAgb3V0cHV0IGFycmF5IHRoYXQgaXMgc3RvcmluZyB0aGUgdHJhbnNmb3JtIG1hdHJpeFxuICovXG5mdW5jdGlvbiBtdWx0aXBseSAob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdLFxuICAgICAgICBiNCA9IGJbNF0sIGI1ID0gYls1XSwgYjYgPSBiWzZdLCBiNyA9IGJbN10sXG4gICAgICAgIGI4ID0gYls4XSwgYjkgPSBiWzldLCBiMTAgPSBiWzEwXSwgYjExID0gYlsxMV0sXG4gICAgICAgIGIxMiA9IGJbMTJdLCBiMTMgPSBiWzEzXSwgYjE0ID0gYlsxNF0sIGIxNSA9IGJbMTVdO1xuXG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgb3V0MCwgb3V0MSwgb3V0Miwgb3V0MztcblxuICAgIG91dDAgPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0MSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXQyID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dDMgPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBjaGFuZ2VkID0gY2hhbmdlZCA/XG4gICAgICAgICAgICAgIGNoYW5nZWQgOiBvdXQwID09PSBvdXRbMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dDEgPT09IG91dFsxXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0MiA9PT0gb3V0WzJdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQzID09PSBvdXRbM107XG5cbiAgICBvdXRbMF0gPSBvdXQwO1xuICAgIG91dFsxXSA9IG91dDE7XG4gICAgb3V0WzJdID0gb3V0MjtcbiAgICBvdXRbM10gPSBvdXQzO1xuXG4gICAgYjAgPSBiNDsgYjEgPSBiNTsgYjIgPSBiNjsgYjMgPSBiNztcbiAgICBvdXQwID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dDEgPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0MiA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXQzID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgY2hhbmdlZCA9IGNoYW5nZWQgP1xuICAgICAgICAgICAgICBjaGFuZ2VkIDogb3V0MCA9PT0gb3V0WzRdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQxID09PSBvdXRbNV0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dDIgPT09IG91dFs2XSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0MyA9PT0gb3V0WzddO1xuXG4gICAgb3V0WzRdID0gb3V0MDtcbiAgICBvdXRbNV0gPSBvdXQxO1xuICAgIG91dFs2XSA9IG91dDI7XG4gICAgb3V0WzddID0gb3V0MztcblxuICAgIGIwID0gYjg7IGIxID0gYjk7IGIyID0gYjEwOyBiMyA9IGIxMTtcbiAgICBvdXQwID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dDEgPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0MiA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXQzID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgY2hhbmdlZCA9IGNoYW5nZWQgP1xuICAgICAgICAgICAgICBjaGFuZ2VkIDogb3V0MCA9PT0gb3V0WzhdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQxID09PSBvdXRbOV0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dDIgPT09IG91dFsxMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dDMgPT09IG91dFsxMV07XG5cbiAgICBvdXRbOF0gPSBvdXQwO1xuICAgIG91dFs5XSA9IG91dDE7XG4gICAgb3V0WzEwXSA9IG91dDI7XG4gICAgb3V0WzExXSA9IG91dDM7XG5cbiAgICBiMCA9IGIxMjsgYjEgPSBiMTM7IGIyID0gYjE0OyBiMyA9IGIxNTtcbiAgICBvdXQwID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dDEgPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0MiA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXQzID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgY2hhbmdlZCA9IGNoYW5nZWQgP1xuICAgICAgICAgICAgICBjaGFuZ2VkIDogb3V0MCA9PT0gb3V0WzEyXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0MSA9PT0gb3V0WzEzXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0MiA9PT0gb3V0WzE0XSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0MyA9PT0gb3V0WzE1XTtcblxuICAgIG91dFsxMl0gPSBvdXQwO1xuICAgIG91dFsxM10gPSBvdXQxO1xuICAgIG91dFsxNF0gPSBvdXQyO1xuICAgIG91dFsxNV0gPSBvdXQzO1xuXG4gICAgcmV0dXJuIG91dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbXVsdGlwbHk6IG11bHRpcGx5LFxuICAgIGludmVydDogaW52ZXJ0XG59O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVUlFdmVudCA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xuXG4vKipcbiAqIFNlZSBbVUkgRXZlbnRzIChmb3JtZXJseSBET00gTGV2ZWwgMyBFdmVudHMpXShodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1dELXVpZXZlbnRzLTIwMTUwNDI4LyNldmVudHMtY29tcG9zaXRpb25ldmVudHMpLlxuICpcbiAqIEBjbGFzcyBDb21wb3NpdGlvbkV2ZW50XG4gKiBAYXVnbWVudHMgVUlFdmVudFxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2IFRoZSBuYXRpdmUgRE9NIGV2ZW50LlxuICovXG5mdW5jdGlvbiBDb21wb3NpdGlvbkV2ZW50KGV2KSB7XG4gICAgLy8gW0NvbnN0cnVjdG9yKERPTVN0cmluZyB0eXBlQXJnLCBvcHRpb25hbCBDb21wb3NpdGlvbkV2ZW50SW5pdCBjb21wb3NpdGlvbkV2ZW50SW5pdERpY3QpXVxuICAgIC8vIGludGVyZmFjZSBDb21wb3NpdGlvbkV2ZW50IDogVUlFdmVudCB7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgZGF0YTtcbiAgICAvLyB9O1xuXG4gICAgVUlFdmVudC5jYWxsKHRoaXMsIGV2KTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIENvbXBvc2l0aW9uRXZlbnQjZGF0YVxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMuZGF0YSA9IGV2LmRhdGE7XG59XG5cbkNvbXBvc2l0aW9uRXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUV2ZW50LnByb3RvdHlwZSk7XG5Db21wb3NpdGlvbkV2ZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbXBvc2l0aW9uRXZlbnQ7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gTmFtZSBvZiB0aGUgZXZlbnQgdHlwZVxuICovXG5Db21wb3NpdGlvbkV2ZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gJ0NvbXBvc2l0aW9uRXZlbnQnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb3NpdGlvbkV2ZW50O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSBFdmVudCBjbGFzcyBpcyBiZWluZyB1c2VkIGluIG9yZGVyIHRvIG5vcm1hbGl6ZSBuYXRpdmUgRE9NIGV2ZW50cy5cbiAqIEV2ZW50cyBuZWVkIHRvIGJlIG5vcm1hbGl6ZWQgaW4gb3JkZXIgdG8gYmUgc2VyaWFsaXplZCB0aHJvdWdoIHRoZSBzdHJ1Y3R1cmVkXG4gKiBjbG9uaW5nIGFsZ29yaXRobSB1c2VkIGJ5IHRoZSBgcG9zdE1lc3NhZ2VgIG1ldGhvZCAoV2ViIFdvcmtlcnMpLlxuICpcbiAqIFdyYXBwaW5nIERPTSBldmVudHMgYWxzbyBoYXMgdGhlIGFkdmFudGFnZSBvZiBwcm92aWRpbmcgYSBjb25zaXN0ZW50XG4gKiBpbnRlcmZhY2UgZm9yIGludGVyYWN0aW5nIHdpdGggRE9NIGV2ZW50cyBhY3Jvc3MgYnJvd3NlcnMgYnkgY29weWluZyBvdmVyIGFcbiAqIHN1YnNldCBvZiB0aGUgZXhwb3NlZCBwcm9wZXJ0aWVzIHRoYXQgaXMgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50IGFjcm9zc1xuICogYnJvd3NlcnMuXG4gKlxuICogU2VlIFtVSSBFdmVudHMgKGZvcm1lcmx5IERPTSBMZXZlbCAzIEV2ZW50cyldKGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvV0QtdWlldmVudHMtMjAxNTA0MjgvI2ludGVyZmFjZS1FdmVudCkuXG4gKlxuICogQGNsYXNzIEV2ZW50XG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXYgVGhlIG5hdGl2ZSBET00gZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIEV2ZW50KGV2KSB7XG4gICAgLy8gW0NvbnN0cnVjdG9yKERPTVN0cmluZyB0eXBlLCBvcHRpb25hbCBFdmVudEluaXQgZXZlbnRJbml0RGljdCksXG4gICAgLy8gIEV4cG9zZWQ9V2luZG93LFdvcmtlcl1cbiAgICAvLyBpbnRlcmZhY2UgRXZlbnQge1xuICAgIC8vICAgcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyB0eXBlO1xuICAgIC8vICAgcmVhZG9ubHkgYXR0cmlidXRlIEV2ZW50VGFyZ2V0PyB0YXJnZXQ7XG4gICAgLy8gICByZWFkb25seSBhdHRyaWJ1dGUgRXZlbnRUYXJnZXQ/IGN1cnJlbnRUYXJnZXQ7XG5cbiAgICAvLyAgIGNvbnN0IHVuc2lnbmVkIHNob3J0IE5PTkUgPSAwO1xuICAgIC8vICAgY29uc3QgdW5zaWduZWQgc2hvcnQgQ0FQVFVSSU5HX1BIQVNFID0gMTtcbiAgICAvLyAgIGNvbnN0IHVuc2lnbmVkIHNob3J0IEFUX1RBUkdFVCA9IDI7XG4gICAgLy8gICBjb25zdCB1bnNpZ25lZCBzaG9ydCBCVUJCTElOR19QSEFTRSA9IDM7XG4gICAgLy8gICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgc2hvcnQgZXZlbnRQaGFzZTtcblxuICAgIC8vICAgdm9pZCBzdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyAgIHZvaWQgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAvLyAgIHJlYWRvbmx5IGF0dHJpYnV0ZSBib29sZWFuIGJ1YmJsZXM7XG4gICAgLy8gICByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiBjYW5jZWxhYmxlO1xuICAgIC8vICAgdm9pZCBwcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgcmVhZG9ubHkgYXR0cmlidXRlIGJvb2xlYW4gZGVmYXVsdFByZXZlbnRlZDtcblxuICAgIC8vICAgW1VuZm9yZ2VhYmxlXSByZWFkb25seSBhdHRyaWJ1dGUgYm9vbGVhbiBpc1RydXN0ZWQ7XG4gICAgLy8gICByZWFkb25seSBhdHRyaWJ1dGUgRE9NVGltZVN0YW1wIHRpbWVTdGFtcDtcblxuICAgIC8vICAgdm9pZCBpbml0RXZlbnQoRE9NU3RyaW5nIHR5cGUsIGJvb2xlYW4gYnViYmxlcywgYm9vbGVhbiBjYW5jZWxhYmxlKTtcbiAgICAvLyB9O1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgRXZlbnQjdHlwZVxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IGV2LnR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBFdmVudCNkZWZhdWx0UHJldmVudGVkXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGV2LmRlZmF1bHRQcmV2ZW50ZWQ7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBFdmVudCN0aW1lU3RhbXBcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLnRpbWVTdGFtcCA9IGV2LnRpbWVTdGFtcDtcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBmb3IgZXhwb3NpbmcgdGhlIGN1cnJlbnQgdGFyZ2V0J3MgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBFdmVudCN2YWx1ZVxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgIHZhciB0YXJnZXRDb25zdHJ1Y3RvciA9IGV2LnRhcmdldC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBUT0RPIFN1cHBvcnQgSFRNTEtleWdlbkVsZW1lbnRcbiAgICBpZiAoXG4gICAgICAgIHRhcmdldENvbnN0cnVjdG9yID09PSBIVE1MSW5wdXRFbGVtZW50IHx8XG4gICAgICAgIHRhcmdldENvbnN0cnVjdG9yID09PSBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XG4gICAgICAgIHRhcmdldENvbnN0cnVjdG9yID09PSBIVE1MU2VsZWN0RWxlbWVudFxuICAgICkge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHR5cGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBOYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKi9cbkV2ZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gJ0V2ZW50Jztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQ7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb3NpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9Db21wb3NpdGlvbkV2ZW50Jyk7XG52YXIgRXZlbnQgPSByZXF1aXJlKCcuL0V2ZW50Jyk7XG52YXIgRm9jdXNFdmVudCA9IHJlcXVpcmUoJy4vRm9jdXNFdmVudCcpO1xudmFyIElucHV0RXZlbnQgPSByZXF1aXJlKCcuL0lucHV0RXZlbnQnKTtcbnZhciBLZXlib2FyZEV2ZW50ID0gcmVxdWlyZSgnLi9LZXlib2FyZEV2ZW50Jyk7XG52YXIgTW91c2VFdmVudCA9IHJlcXVpcmUoJy4vTW91c2VFdmVudCcpO1xudmFyIFRvdWNoRXZlbnQgPSByZXF1aXJlKCcuL1RvdWNoRXZlbnQnKTtcbnZhciBVSUV2ZW50ID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG52YXIgV2hlZWxFdmVudCA9IHJlcXVpcmUoJy4vV2hlZWxFdmVudCcpO1xuXG4vKipcbiAqIEEgbWFwcGluZyBvZiBET00gZXZlbnRzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGhhbmRsZXJzXG4gKlxuICogQG5hbWUgRXZlbnRNYXBcbiAqIEB0eXBlIE9iamVjdFxuICovXG52YXIgRXZlbnRNYXAgPSB7XG4gICAgY2hhbmdlICAgICAgICAgICAgICAgICAgICAgICAgIDogW0V2ZW50LCB0cnVlXSxcbiAgICBzdWJtaXQgICAgICAgICAgICAgICAgICAgICAgICAgOiBbRXZlbnQsIHRydWVdLFxuXG4gICAgLy8gVUkgRXZlbnRzIChodHRwOi8vd3d3LnczLm9yZy9UUi91aWV2ZW50cy8pXG4gICAgYWJvcnQgICAgICAgICAgICAgICAgICAgICAgICAgIDogW0V2ZW50LCBmYWxzZV0sXG4gICAgYmVmb3JlaW5wdXQgICAgICAgICAgICAgICAgICAgIDogW0lucHV0RXZlbnQsIHRydWVdLFxuICAgIGJsdXIgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtGb2N1c0V2ZW50LCBmYWxzZV0sXG4gICAgY2xpY2sgICAgICAgICAgICAgICAgICAgICAgICAgIDogW01vdXNlRXZlbnQsIHRydWVdLFxuICAgIGNvbXBvc2l0aW9uZW5kICAgICAgICAgICAgICAgICA6IFtDb21wb3NpdGlvbkV2ZW50LCB0cnVlXSxcbiAgICBjb21wb3NpdGlvbnN0YXJ0ICAgICAgICAgICAgICAgOiBbQ29tcG9zaXRpb25FdmVudCwgdHJ1ZV0sXG4gICAgY29tcG9zaXRpb251cGRhdGUgICAgICAgICAgICAgIDogW0NvbXBvc2l0aW9uRXZlbnQsIHRydWVdLFxuICAgIGRibGNsaWNrICAgICAgICAgICAgICAgICAgICAgICA6IFtNb3VzZUV2ZW50LCB0cnVlXSxcbiAgICBmb2N1cyAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbRm9jdXNFdmVudCwgZmFsc2VdLFxuICAgIGZvY3VzaW4gICAgICAgICAgICAgICAgICAgICAgICA6IFtGb2N1c0V2ZW50LCB0cnVlXSxcbiAgICBmb2N1c291dCAgICAgICAgICAgICAgICAgICAgICAgOiBbRm9jdXNFdmVudCwgdHJ1ZV0sXG4gICAgaW5wdXQgICAgICAgICAgICAgICAgICAgICAgICAgIDogW0lucHV0RXZlbnQsIHRydWVdLFxuICAgIGtleWRvd24gICAgICAgICAgICAgICAgICAgICAgICA6IFtLZXlib2FyZEV2ZW50LCB0cnVlXSxcbiAgICBrZXl1cCAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbS2V5Ym9hcmRFdmVudCwgdHJ1ZV0sXG4gICAgbG9hZCAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW0V2ZW50LCBmYWxzZV0sXG4gICAgbW91c2Vkb3duICAgICAgICAgICAgICAgICAgICAgIDogW01vdXNlRXZlbnQsIHRydWVdLFxuICAgIG1vdXNlZW50ZXIgICAgICAgICAgICAgICAgICAgICA6IFtNb3VzZUV2ZW50LCBmYWxzZV0sXG4gICAgbW91c2VsZWF2ZSAgICAgICAgICAgICAgICAgICAgIDogW01vdXNlRXZlbnQsIGZhbHNlXSxcblxuICAgIC8vIGJ1YmJsZXMsIGJ1dCB3aWxsIGJlIHRyaWdnZXJlZCB2ZXJ5IGZyZXF1ZW50bHlcbiAgICBtb3VzZW1vdmUgICAgICAgICAgICAgICAgICAgICAgOiBbTW91c2VFdmVudCwgZmFsc2VdLFxuXG4gICAgbW91c2VvdXQgICAgICAgICAgICAgICAgICAgICAgIDogW01vdXNlRXZlbnQsIHRydWVdLFxuICAgIG1vdXNlb3ZlciAgICAgICAgICAgICAgICAgICAgICA6IFtNb3VzZUV2ZW50LCB0cnVlXSxcbiAgICBtb3VzZXVwICAgICAgICAgICAgICAgICAgICAgICAgOiBbTW91c2VFdmVudCwgdHJ1ZV0sXG4gICAgcmVzaXplICAgICAgICAgICAgICAgICAgICAgICAgIDogW1VJRXZlbnQsIGZhbHNlXSxcblxuICAgIC8vIG1pZ2h0IGJ1YmJsZVxuICAgIHNjcm9sbCAgICAgICAgICAgICAgICAgICAgICAgICA6IFtVSUV2ZW50LCBmYWxzZV0sXG5cbiAgICBzZWxlY3QgICAgICAgICAgICAgICAgICAgICAgICAgOiBbRXZlbnQsIHRydWVdLFxuICAgIHVubG9hZCAgICAgICAgICAgICAgICAgICAgICAgICA6IFtFdmVudCwgZmFsc2VdLFxuICAgIHdoZWVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtXaGVlbEV2ZW50LCB0cnVlXSxcblxuICAgIC8vIFRvdWNoIEV2ZW50cyBFeHRlbnNpb24gKGh0dHA6Ly93d3cudzMub3JnL1RSL3RvdWNoLWV2ZW50cy1leHRlbnNpb25zLylcbiAgICB0b3VjaGNhbmNlbCAgICAgICAgICAgICAgICAgICAgOiBbVG91Y2hFdmVudCwgdHJ1ZV0sXG4gICAgdG91Y2hlbmQgICAgICAgICAgICAgICAgICAgICAgIDogW1RvdWNoRXZlbnQsIHRydWVdLFxuICAgIHRvdWNobW92ZSAgICAgICAgICAgICAgICAgICAgICA6IFtUb3VjaEV2ZW50LCB0cnVlXSxcbiAgICB0b3VjaHN0YXJ0ICAgICAgICAgICAgICAgICAgICAgOiBbVG91Y2hFdmVudCwgdHJ1ZV1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYXA7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBVSUV2ZW50ID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG5cbi8qKlxuICogU2VlIFtVSSBFdmVudHMgKGZvcm1lcmx5IERPTSBMZXZlbCAzIEV2ZW50cyldKGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvV0QtdWlldmVudHMtMjAxNTA0MjgvI2V2ZW50cy1mb2N1c2V2ZW50KS5cbiAqXG4gKiBAY2xhc3MgRm9jdXNFdmVudFxuICogQGF1Z21lbnRzIFVJRXZlbnRcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldiBUaGUgbmF0aXZlIERPTSBldmVudC5cbiAqL1xuZnVuY3Rpb24gRm9jdXNFdmVudChldikge1xuICAgIC8vIFtDb25zdHJ1Y3RvcihET01TdHJpbmcgdHlwZUFyZywgb3B0aW9uYWwgRm9jdXNFdmVudEluaXQgZm9jdXNFdmVudEluaXREaWN0KV1cbiAgICAvLyBpbnRlcmZhY2UgRm9jdXNFdmVudCA6IFVJRXZlbnQge1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgRXZlbnRUYXJnZXQ/IHJlbGF0ZWRUYXJnZXQ7XG4gICAgLy8gfTtcblxuICAgIFVJRXZlbnQuY2FsbCh0aGlzLCBldik7XG59XG5cbkZvY3VzRXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUV2ZW50LnByb3RvdHlwZSk7XG5Gb2N1c0V2ZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZvY3VzRXZlbnQ7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gTmFtZSBvZiB0aGUgZXZlbnQgdHlwZVxuICovXG5Gb2N1c0V2ZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gJ0ZvY3VzRXZlbnQnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb2N1c0V2ZW50O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVUlFdmVudCA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xuXG4vKipcbiAqIFNlZSBbSW5wdXQgRXZlbnRzXShodHRwOi8vdzNjLmdpdGh1Yi5pby9lZGl0aW5nLWV4cGxhaW5lci9pbnB1dC1ldmVudHMuaHRtbCNpZGwtZGVmLUlucHV0RXZlbnQpLlxuICpcbiAqIEBjbGFzcyBJbnB1dEV2ZW50XG4gKiBAYXVnbWVudHMgVUlFdmVudFxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2IFRoZSBuYXRpdmUgRE9NIGV2ZW50LlxuICovXG5mdW5jdGlvbiBJbnB1dEV2ZW50KGV2KSB7XG4gICAgLy8gW0NvbnN0cnVjdG9yKERPTVN0cmluZyB0eXBlQXJnLCBvcHRpb25hbCBJbnB1dEV2ZW50SW5pdCBpbnB1dEV2ZW50SW5pdERpY3QpXVxuICAgIC8vIGludGVyZmFjZSBJbnB1dEV2ZW50IDogVUlFdmVudCB7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgaW5wdXRUeXBlO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nIGRhdGE7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBib29sZWFuICAgaXNDb21wb3Npbmc7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBSYW5nZSAgICAgdGFyZ2V0UmFuZ2U7XG4gICAgLy8gfTtcblxuICAgIFVJRXZlbnQuY2FsbCh0aGlzLCBldik7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSAgICBJbnB1dEV2ZW50I2lucHV0VHlwZVxuICAgICAqIEB0eXBlICAgIFN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMuaW5wdXRUeXBlID0gZXYuaW5wdXRUeXBlO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgICAgSW5wdXRFdmVudCNkYXRhXG4gICAgICogQHR5cGUgICAgU3RyaW5nXG4gICAgICovXG4gICAgdGhpcy5kYXRhID0gZXYuZGF0YTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lICAgIElucHV0RXZlbnQjaXNDb21wb3NpbmdcbiAgICAgKiBAdHlwZSAgICBCb29sZWFuXG4gICAgICovXG4gICAgdGhpcy5pc0NvbXBvc2luZyA9IGV2LmlzQ29tcG9zaW5nO1xuXG4gICAgLyoqXG4gICAgICogKipMaW1pdGVkIGJyb3dzZXIgc3VwcG9ydCoqLlxuICAgICAqXG4gICAgICogQG5hbWUgICAgSW5wdXRFdmVudCN0YXJnZXRSYW5nZVxuICAgICAqIEB0eXBlICAgIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLnRhcmdldFJhbmdlID0gZXYudGFyZ2V0UmFuZ2U7XG59XG5cbklucHV0RXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUV2ZW50LnByb3RvdHlwZSk7XG5JbnB1dEV2ZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IElucHV0RXZlbnQ7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gTmFtZSBvZiB0aGUgZXZlbnQgdHlwZVxuICovXG5JbnB1dEV2ZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gJ0lucHV0RXZlbnQnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEV2ZW50O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVUlFdmVudCA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xuXG4vKipcbiAqIFNlZSBbVUkgRXZlbnRzIChmb3JtZXJseSBET00gTGV2ZWwgMyBFdmVudHMpXShodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1dELXVpZXZlbnRzLTIwMTUwNDI4LyNldmVudHMta2V5Ym9hcmRldmVudHMpLlxuICpcbiAqIEBjbGFzcyBLZXlib2FyZEV2ZW50XG4gKiBAYXVnbWVudHMgVUlFdmVudFxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2IFRoZSBuYXRpdmUgRE9NIGV2ZW50LlxuICovXG5mdW5jdGlvbiBLZXlib2FyZEV2ZW50KGV2KSB7XG4gICAgLy8gW0NvbnN0cnVjdG9yKERPTVN0cmluZyB0eXBlQXJnLCBvcHRpb25hbCBLZXlib2FyZEV2ZW50SW5pdCBrZXlib2FyZEV2ZW50SW5pdERpY3QpXVxuICAgIC8vIGludGVyZmFjZSBLZXlib2FyZEV2ZW50IDogVUlFdmVudCB7XG4gICAgLy8gICAgIC8vIEtleUxvY2F0aW9uQ29kZVxuICAgIC8vICAgICBjb25zdCB1bnNpZ25lZCBsb25nIERPTV9LRVlfTE9DQVRJT05fU1RBTkRBUkQgPSAweDAwO1xuICAgIC8vICAgICBjb25zdCB1bnNpZ25lZCBsb25nIERPTV9LRVlfTE9DQVRJT05fTEVGVCA9IDB4MDE7XG4gICAgLy8gICAgIGNvbnN0IHVuc2lnbmVkIGxvbmcgRE9NX0tFWV9MT0NBVElPTl9SSUdIVCA9IDB4MDI7XG4gICAgLy8gICAgIGNvbnN0IHVuc2lnbmVkIGxvbmcgRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgPSAweDAzO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgRE9NU3RyaW5nICAgICBrZXk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBET01TdHJpbmcgICAgIGNvZGU7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxvY2F0aW9uO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICBjdHJsS2V5O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICBzaGlmdEtleTtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGJvb2xlYW4gICAgICAgYWx0S2V5O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICBtZXRhS2V5O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICByZXBlYXQ7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBib29sZWFuICAgICAgIGlzQ29tcG9zaW5nO1xuICAgIC8vICAgICBib29sZWFuIGdldE1vZGlmaWVyU3RhdGUgKERPTVN0cmluZyBrZXlBcmcpO1xuICAgIC8vIH07XG5cbiAgICBVSUV2ZW50LmNhbGwodGhpcywgZXYpO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgS2V5Ym9hcmRFdmVudCNET01fS0VZX0xPQ0FUSU9OX1NUQU5EQVJEXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5ET01fS0VZX0xPQ0FUSU9OX1NUQU5EQVJEID0gMHgwMDtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIEtleWJvYXJkRXZlbnQjRE9NX0tFWV9MT0NBVElPTl9MRUZUXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5ET01fS0VZX0xPQ0FUSU9OX0xFRlQgPSAweDAxO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgS2V5Ym9hcmRFdmVudCNET01fS0VZX0xPQ0FUSU9OX1JJR0hUXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5ET01fS0VZX0xPQ0FUSU9OX1JJR0hUID0gMHgwMjtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIEtleWJvYXJkRXZlbnQjRE9NX0tFWV9MT0NBVElPTl9OVU1QQURcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLkRPTV9LRVlfTE9DQVRJT05fTlVNUEFEID0gMHgwMztcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIEtleWJvYXJkRXZlbnQja2V5XG4gICAgICogQHR5cGUgU3RyaW5nXG4gICAgICovXG4gICAgdGhpcy5rZXkgPSBldi5rZXk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBLZXlib2FyZEV2ZW50I2NvZGVcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICB0aGlzLmNvZGUgPSBldi5jb2RlO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgS2V5Ym9hcmRFdmVudCNsb2NhdGlvblxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMubG9jYXRpb24gPSBldi5sb2NhdGlvbjtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIEtleWJvYXJkRXZlbnQjY3RybEtleVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLmN0cmxLZXkgPSBldi5jdHJsS2V5O1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgS2V5Ym9hcmRFdmVudCNzaGlmdEtleVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLnNoaWZ0S2V5ID0gZXYuc2hpZnRLZXk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBLZXlib2FyZEV2ZW50I2FsdEtleVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLmFsdEtleSA9IGV2LmFsdEtleTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIEtleWJvYXJkRXZlbnQjbWV0YUtleVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLm1ldGFLZXkgPSBldi5tZXRhS2V5O1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgS2V5Ym9hcmRFdmVudCNyZXBlYXRcbiAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICovXG4gICAgdGhpcy5yZXBlYXQgPSBldi5yZXBlYXQ7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBLZXlib2FyZEV2ZW50I2lzQ29tcG9zaW5nXG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuaXNDb21wb3NpbmcgPSBldi5pc0NvbXBvc2luZztcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIEtleWJvYXJkRXZlbnQja2V5Q29kZVxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgdGhpcy5rZXlDb2RlID0gZXYua2V5Q29kZTtcbn1cblxuS2V5Ym9hcmRFdmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRXZlbnQucHJvdG90eXBlKTtcbktleWJvYXJkRXZlbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gS2V5Ym9hcmRFdmVudDtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHR5cGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBOYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKi9cbktleWJvYXJkRXZlbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiAnS2V5Ym9hcmRFdmVudCc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkRXZlbnQ7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBVSUV2ZW50ID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG5cbi8qKlxuICogU2VlIFtVSSBFdmVudHMgKGZvcm1lcmx5IERPTSBMZXZlbCAzIEV2ZW50cyldKGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvV0QtdWlldmVudHMtMjAxNTA0MjgvI2V2ZW50cy1tb3VzZWV2ZW50cykuXG4gKlxuICogQGNsYXNzIEtleWJvYXJkRXZlbnRcbiAqIEBhdWdtZW50cyBVSUV2ZW50XG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXYgVGhlIG5hdGl2ZSBET00gZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIE1vdXNlRXZlbnQoZXYpIHtcbiAgICAvLyBbQ29uc3RydWN0b3IoRE9NU3RyaW5nIHR5cGVBcmcsIG9wdGlvbmFsIE1vdXNlRXZlbnRJbml0IG1vdXNlRXZlbnRJbml0RGljdCldXG4gICAgLy8gaW50ZXJmYWNlIE1vdXNlRXZlbnQgOiBVSUV2ZW50IHtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGxvbmcgICAgICAgICAgIHNjcmVlblg7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBsb25nICAgICAgICAgICBzY3JlZW5ZO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgbG9uZyAgICAgICAgICAgY2xpZW50WDtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGxvbmcgICAgICAgICAgIGNsaWVudFk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBjdHJsS2V5O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgICAgICAgc2hpZnRLZXk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBhbHRLZXk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBib29sZWFuICAgICAgICBtZXRhS2V5O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgc2hvcnQgICAgICAgICAgYnV0dG9uO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgRXZlbnRUYXJnZXQ/ICAgcmVsYXRlZFRhcmdldDtcbiAgICAvLyAgICAgLy8gSW50cm9kdWNlZCBpbiB0aGlzIHNwZWNpZmljYXRpb25cbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIHVuc2lnbmVkIHNob3J0IGJ1dHRvbnM7XG4gICAgLy8gICAgIGJvb2xlYW4gZ2V0TW9kaWZpZXJTdGF0ZSAoRE9NU3RyaW5nIGtleUFyZyk7XG4gICAgLy8gfTtcblxuICAgIFVJRXZlbnQuY2FsbCh0aGlzLCBldik7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBNb3VzZUV2ZW50I3NjcmVlblhcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLnNjcmVlblggPSBldi5zY3JlZW5YO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgTW91c2VFdmVudCNzY3JlZW5ZXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5zY3JlZW5ZID0gZXYuc2NyZWVuWTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIE1vdXNlRXZlbnQjY2xpZW50WFxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuY2xpZW50WCA9IGV2LmNsaWVudFg7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBNb3VzZUV2ZW50I2NsaWVudFlcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLmNsaWVudFkgPSBldi5jbGllbnRZO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgTW91c2VFdmVudCNjdHJsS2V5XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuY3RybEtleSA9IGV2LmN0cmxLZXk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBNb3VzZUV2ZW50I3NoaWZ0S2V5XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuc2hpZnRLZXkgPSBldi5zaGlmdEtleTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIE1vdXNlRXZlbnQjYWx0S2V5XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuYWx0S2V5ID0gZXYuYWx0S2V5O1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgTW91c2VFdmVudCNtZXRhS2V5XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMubWV0YUtleSA9IGV2Lm1ldGFLZXk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSBNb3VzZUV2ZW50I2J1dHRvblxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuYnV0dG9uID0gZXYuYnV0dG9uO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgTW91c2VFdmVudCNidXR0b25zXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5idXR0b25zID0gZXYuYnV0dG9ucztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIE1vdXNlRXZlbnQjcGFnZVhcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLnBhZ2VYID0gZXYucGFnZVg7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSBNb3VzZUV2ZW50I3BhZ2VZXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5wYWdlWSA9IGV2LnBhZ2VZO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgTW91c2VFdmVudCN4XG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy54ID0gZXYueDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIE1vdXNlRXZlbnQjeVxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMueSA9IGV2Lnk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSBNb3VzZUV2ZW50I29mZnNldFhcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLm9mZnNldFggPSBldi5vZmZzZXRYO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgTW91c2VFdmVudCNvZmZzZXRZXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5vZmZzZXRZID0gZXYub2Zmc2V0WTtcbn1cblxuTW91c2VFdmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRXZlbnQucHJvdG90eXBlKTtcbk1vdXNlRXZlbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTW91c2VFdmVudDtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHR5cGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBOYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKi9cbk1vdXNlRXZlbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiAnTW91c2VFdmVudCc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdXNlRXZlbnQ7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBVSUV2ZW50ID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG5cbnZhciBFTVBUWV9BUlJBWSA9IFtdO1xuXG4vKipcbiAqIFNlZSBbVG91Y2ggSW50ZXJmYWNlXShodHRwOi8vd3d3LnczLm9yZy9UUi8yMDEzL1JFQy10b3VjaC1ldmVudHMtMjAxMzEwMTAvI3RvdWNoLWludGVyZmFjZSkuXG4gKlxuICogQGNsYXNzIFRvdWNoXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEBwYXJhbSB7VG91Y2h9IHRvdWNoIFRoZSBuYXRpdmUgVG91Y2ggb2JqZWN0LlxuICovXG5mdW5jdGlvbiBUb3VjaCh0b3VjaCkge1xuICAgIC8vIGludGVyZmFjZSBUb3VjaCB7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBsb25nICAgICAgICBpZGVudGlmaWVyO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgRXZlbnRUYXJnZXQgdGFyZ2V0O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgZG91YmxlICAgICAgc2NyZWVuWDtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGRvdWJsZSAgICAgIHNjcmVlblk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBkb3VibGUgICAgICBjbGllbnRYO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgZG91YmxlICAgICAgY2xpZW50WTtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGRvdWJsZSAgICAgIHBhZ2VYO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgZG91YmxlICAgICAgcGFnZVk7XG4gICAgLy8gfTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIFRvdWNoI2lkZW50aWZpZXJcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLmlkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgVG91Y2gjc2NyZWVuWFxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuc2NyZWVuWCA9IHRvdWNoLnNjcmVlblg7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBUb3VjaCNzY3JlZW5ZXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5zY3JlZW5ZID0gdG91Y2guc2NyZWVuWTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIFRvdWNoI2NsaWVudFhcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLmNsaWVudFggPSB0b3VjaC5jbGllbnRYO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgVG91Y2gjY2xpZW50WVxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuY2xpZW50WSA9IHRvdWNoLmNsaWVudFk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBUb3VjaCNwYWdlWFxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMucGFnZVggPSB0b3VjaC5wYWdlWDtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIFRvdWNoI3BhZ2VZXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5wYWdlWSA9IHRvdWNoLnBhZ2VZO1xufVxuXG5cbi8qKlxuICogTm9ybWFsaXplcyB0aGUgYnJvd3NlcidzIG5hdGl2ZSBUb3VjaExpc3QgYnkgY29udmVydGluZyBpdCBpbnRvIGFuIGFycmF5IG9mXG4gKiBub3JtYWxpemVkIFRvdWNoIG9iamVjdHMuXG4gKlxuICogQG1ldGhvZCAgY2xvbmVUb3VjaExpc3RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtICB7VG91Y2hMaXN0fSB0b3VjaExpc3QgICAgVGhlIG5hdGl2ZSBUb3VjaExpc3QgYXJyYXkuXG4gKiBAcmV0dXJuIHtBcnJheS48VG91Y2g+fSAgICAgICAgICBBbiBhcnJheSBvZiBub3JtYWxpemVkIFRvdWNoIG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVG91Y2hMaXN0KHRvdWNoTGlzdCkge1xuICAgIGlmICghdG91Y2hMaXN0KSByZXR1cm4gRU1QVFlfQVJSQVk7XG4gICAgLy8gaW50ZXJmYWNlIFRvdWNoTGlzdCB7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSB1bnNpZ25lZCBsb25nIGxlbmd0aDtcbiAgICAvLyAgICAgZ2V0dGVyIFRvdWNoPyBpdGVtICh1bnNpZ25lZCBsb25nIGluZGV4KTtcbiAgICAvLyB9O1xuXG4gICAgdmFyIHRvdWNoTGlzdEFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3VjaExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG91Y2hMaXN0QXJyYXlbaV0gPSBuZXcgVG91Y2godG91Y2hMaXN0W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRvdWNoTGlzdEFycmF5O1xufVxuXG4vKipcbiAqIFNlZSBbVG91Y2ggRXZlbnQgSW50ZXJmYWNlXShodHRwOi8vd3d3LnczLm9yZy9UUi8yMDEzL1JFQy10b3VjaC1ldmVudHMtMjAxMzEwMTAvI3RvdWNoZXZlbnQtaW50ZXJmYWNlKS5cbiAqXG4gKiBAY2xhc3MgVG91Y2hFdmVudFxuICogQGF1Z21lbnRzIFVJRXZlbnRcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldiBUaGUgbmF0aXZlIERPTSBldmVudC5cbiAqL1xuZnVuY3Rpb24gVG91Y2hFdmVudChldikge1xuICAgIC8vIGludGVyZmFjZSBUb3VjaEV2ZW50IDogVUlFdmVudCB7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBUb3VjaExpc3QgdG91Y2hlcztcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIFRvdWNoTGlzdCB0YXJnZXRUb3VjaGVzO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgVG91Y2hMaXN0IGNoYW5nZWRUb3VjaGVzO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgIGFsdEtleTtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGJvb2xlYW4gICBtZXRhS2V5O1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgYm9vbGVhbiAgIGN0cmxLZXk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBib29sZWFuICAgc2hpZnRLZXk7XG4gICAgLy8gfTtcbiAgICBVSUV2ZW50LmNhbGwodGhpcywgZXYpO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgVG91Y2hFdmVudCN0b3VjaGVzXG4gICAgICogQHR5cGUgQXJyYXkuPFRvdWNoPlxuICAgICAqL1xuICAgIHRoaXMudG91Y2hlcyA9IGNsb25lVG91Y2hMaXN0KGV2LnRvdWNoZXMpO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgVG91Y2hFdmVudCN0YXJnZXRUb3VjaGVzXG4gICAgICogQHR5cGUgQXJyYXkuPFRvdWNoPlxuICAgICAqL1xuICAgIHRoaXMudGFyZ2V0VG91Y2hlcyA9IGNsb25lVG91Y2hMaXN0KGV2LnRhcmdldFRvdWNoZXMpO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgVG91Y2hFdmVudCNjaGFuZ2VkVG91Y2hlc1xuICAgICAqIEB0eXBlIFRvdWNoTGlzdFxuICAgICAqL1xuICAgIHRoaXMuY2hhbmdlZFRvdWNoZXMgPSBjbG9uZVRvdWNoTGlzdChldi5jaGFuZ2VkVG91Y2hlcyk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBUb3VjaEV2ZW50I2FsdEtleVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLmFsdEtleSA9IGV2LmFsdEtleTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIFRvdWNoRXZlbnQjbWV0YUtleVxuICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgKi9cbiAgICB0aGlzLm1ldGFLZXkgPSBldi5tZXRhS2V5O1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgVG91Y2hFdmVudCNjdHJsS2V5XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuY3RybEtleSA9IGV2LmN0cmxLZXk7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBUb3VjaEV2ZW50I3NoaWZ0S2V5XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuc2hpZnRLZXkgPSBldi5zaGlmdEtleTtcbn1cblxuVG91Y2hFdmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRXZlbnQucHJvdG90eXBlKTtcblRvdWNoRXZlbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVG91Y2hFdmVudDtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHR5cGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBOYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKi9cblRvdWNoRXZlbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiAnVG91Y2hFdmVudCc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvdWNoRXZlbnQ7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudCA9IHJlcXVpcmUoJy4vRXZlbnQnKTtcblxuLyoqXG4gKiBTZWUgW1VJIEV2ZW50cyAoZm9ybWVybHkgRE9NIExldmVsIDMgRXZlbnRzKV0oaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9XRC11aWV2ZW50cy0yMDE1MDQyOCkuXG4gKlxuICogQGNsYXNzIFVJRXZlbnRcbiAqIEBhdWdtZW50cyBFdmVudFxuICpcbiAqIEBwYXJhbSAge0V2ZW50fSBldiAgIFRoZSBuYXRpdmUgRE9NIGV2ZW50LlxuICovXG5mdW5jdGlvbiBVSUV2ZW50KGV2KSB7XG4gICAgLy8gW0NvbnN0cnVjdG9yKERPTVN0cmluZyB0eXBlLCBvcHRpb25hbCBVSUV2ZW50SW5pdCBldmVudEluaXREaWN0KV1cbiAgICAvLyBpbnRlcmZhY2UgVUlFdmVudCA6IEV2ZW50IHtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIFdpbmRvdz8gdmlldztcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGxvbmcgICAgZGV0YWlsO1xuICAgIC8vIH07XG4gICAgRXZlbnQuY2FsbCh0aGlzLCBldik7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBVSUV2ZW50I2RldGFpbFxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuZGV0YWlsID0gZXYuZGV0YWlsO1xufVxuXG5VSUV2ZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnQucHJvdG90eXBlKTtcblVJRXZlbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVUlFdmVudDtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHR5cGVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBOYW1lIG9mIHRoZSBldmVudCB0eXBlXG4gKi9cblVJRXZlbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiAnVUlFdmVudCc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVJRXZlbnQ7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBNb3VzZUV2ZW50ID0gcmVxdWlyZSgnLi9Nb3VzZUV2ZW50Jyk7XG5cbi8qKlxuICogU2VlIFtVSSBFdmVudHMgKGZvcm1lcmx5IERPTSBMZXZlbCAzIEV2ZW50cyldKGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvV0QtdWlldmVudHMtMjAxNTA0MjgvI2V2ZW50cy13aGVlbGV2ZW50cykuXG4gKlxuICogQGNsYXNzIFdoZWVsRXZlbnRcbiAqIEBhdWdtZW50cyBVSUV2ZW50XG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXYgVGhlIG5hdGl2ZSBET00gZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIFdoZWVsRXZlbnQoZXYpIHtcbiAgICAvLyBbQ29uc3RydWN0b3IoRE9NU3RyaW5nIHR5cGVBcmcsIG9wdGlvbmFsIFdoZWVsRXZlbnRJbml0IHdoZWVsRXZlbnRJbml0RGljdCldXG4gICAgLy8gaW50ZXJmYWNlIFdoZWVsRXZlbnQgOiBNb3VzZUV2ZW50IHtcbiAgICAvLyAgICAgLy8gRGVsdGFNb2RlQ29kZVxuICAgIC8vICAgICBjb25zdCB1bnNpZ25lZCBsb25nIERPTV9ERUxUQV9QSVhFTCA9IDB4MDA7XG4gICAgLy8gICAgIGNvbnN0IHVuc2lnbmVkIGxvbmcgRE9NX0RFTFRBX0xJTkUgPSAweDAxO1xuICAgIC8vICAgICBjb25zdCB1bnNpZ25lZCBsb25nIERPTV9ERUxUQV9QQUdFID0gMHgwMjtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIGRvdWJsZSAgICAgICAgZGVsdGFYO1xuICAgIC8vICAgICByZWFkb25seSAgICBhdHRyaWJ1dGUgZG91YmxlICAgICAgICBkZWx0YVk7XG4gICAgLy8gICAgIHJlYWRvbmx5ICAgIGF0dHJpYnV0ZSBkb3VibGUgICAgICAgIGRlbHRhWjtcbiAgICAvLyAgICAgcmVhZG9ubHkgICAgYXR0cmlidXRlIHVuc2lnbmVkIGxvbmcgZGVsdGFNb2RlO1xuICAgIC8vIH07XG5cbiAgICBNb3VzZUV2ZW50LmNhbGwodGhpcywgZXYpO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgV2hlZWxFdmVudCNET01fREVMVEFfUElYRUxcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLkRPTV9ERUxUQV9QSVhFTCA9IDB4MDA7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBXaGVlbEV2ZW50I0RPTV9ERUxUQV9MSU5FXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5ET01fREVMVEFfTElORSA9IDB4MDE7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBXaGVlbEV2ZW50I0RPTV9ERUxUQV9QQUdFXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5ET01fREVMVEFfUEFHRSA9IDB4MDI7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBXaGVlbEV2ZW50I2RlbHRhWFxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuZGVsdGFYID0gZXYuZGVsdGFYO1xuXG4gICAgLyoqXG4gICAgICogQG5hbWUgV2hlZWxFdmVudCNkZWx0YVlcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLmRlbHRhWSA9IGV2LmRlbHRhWTtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIFdoZWVsRXZlbnQjZGVsdGFaXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICovXG4gICAgdGhpcy5kZWx0YVogPSBldi5kZWx0YVo7XG5cbiAgICAvKipcbiAgICAgKiBAbmFtZSBXaGVlbEV2ZW50I2RlbHRhTW9kZVxuICAgICAqIEB0eXBlIE51bWJlclxuICAgICAqL1xuICAgIHRoaXMuZGVsdGFNb2RlID0gZXYuZGVsdGFNb2RlO1xufVxuXG5XaGVlbEV2ZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTW91c2VFdmVudC5wcm90b3R5cGUpO1xuV2hlZWxFdmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBXaGVlbEV2ZW50O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgdHlwZVxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IE5hbWUgb2YgdGhlIGV2ZW50IHR5cGVcbiAqL1xuV2hlZWxFdmVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuICdXaGVlbEV2ZW50Jztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2hlZWxFdmVudDtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIHR3by1kaW1lbnNpb25hbCB2ZWN0b3IuXG4gKlxuICogQGNsYXNzIFZlYzJcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBUaGUgeCBjb21wb25lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0geSBUaGUgeSBjb21wb25lbnQuXG4gKi9cbnZhciBWZWMyID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIGlmICh4IGluc3RhbmNlb2YgQXJyYXkgfHwgeCBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSkge1xuICAgICAgICB0aGlzLnggPSB4WzBdIHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHhbMV0gfHwgMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIHRoZSBjdXJyZW50IFZlYzIuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFRoZSB4IGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFRoZSB5IGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSB0aGlzXG4gKi9cblZlYzIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCh4LCB5KSB7XG4gICAgaWYgKHggIT0gbnVsbCkgdGhpcy54ID0geDtcbiAgICBpZiAoeSAhPSBudWxsKSB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgdGhlIGlucHV0IHYgdG8gdGhlIGN1cnJlbnQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMyfSB2IFRoZSBWZWMyIHRvIGFkZC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSB0aGlzXG4gKi9cblZlYzIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCh2KSB7XG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgaW5wdXQgdiBmcm9tIHRoZSBjdXJyZW50IFZlYzIuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjMn0gdiBUaGUgVmVjMiB0byBzdWJ0cmFjdC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSB0aGlzXG4gKi9cblZlYzIucHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3Qodikge1xuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2NhbGUgdGhlIGN1cnJlbnQgVmVjMiBieSBhIHNjYWxhciBvciBWZWMyLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcnxWZWMyfSBzIFRoZSBOdW1iZXIgb3IgdmVjMiBieSB3aGljaCB0byBzY2FsZS5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSB0aGlzXG4gKi9cblZlYzIucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUocykge1xuICAgIGlmIChzIGluc3RhbmNlb2YgVmVjMikge1xuICAgICAgICB0aGlzLnggKj0gcy54O1xuICAgICAgICB0aGlzLnkgKj0gcy55O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy54ICo9IHM7XG4gICAgICAgIHRoaXMueSAqPSBzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUm90YXRlIHRoZSBWZWMyIGNvdW50ZXItY2xvY2t3aXNlIGJ5IHRoZXRhIGFib3V0IHRoZSB6LWF4aXMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aGV0YSBBbmdsZSBieSB3aGljaCB0byByb3RhdGUuXG4gKlxuICogQHJldHVybiB7VmVjMn0gdGhpc1xuICovXG5WZWMyLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbih0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuXG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcblxuICAgIHRoaXMueCA9IHggKiBjb3NUaGV0YSAtIHkgKiBzaW5UaGV0YTtcbiAgICB0aGlzLnkgPSB4ICogc2luVGhldGEgKyB5ICogY29zVGhldGE7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogVGhlIGRvdCBwcm9kdWN0IG9mIG9mIHRoZSBjdXJyZW50IFZlYzIgd2l0aCB0aGUgaW5wdXQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHYgVGhlIG90aGVyIFZlYzIuXG4gKlxuICogQHJldHVybiB7VmVjMn0gdGhpc1xuICovXG5WZWMyLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbih2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbn07XG5cbi8qKlxuICogVGhlIGNyb3NzIHByb2R1Y3Qgb2Ygb2YgdGhlIGN1cnJlbnQgVmVjMiB3aXRoIHRoZSBpbnB1dCBWZWMyLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdiBUaGUgb3RoZXIgVmVjMi5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSB0aGlzXG4gKi9cblZlYzIucHJvdG90eXBlLmNyb3NzID0gZnVuY3Rpb24odikge1xuICAgIHJldHVybiB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2Lng7XG59O1xuXG4vKipcbiAqIFByZXNlcnZlIHRoZSBtYWduaXR1ZGUgYnV0IGludmVydCB0aGUgb3JpZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7VmVjMn0gdGhpc1xuICovXG5WZWMyLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbiBpbnZlcnQoKSB7XG4gICAgdGhpcy54ICo9IC0xO1xuICAgIHRoaXMueSAqPSAtMTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQXBwbHkgYSBmdW5jdGlvbiBjb21wb25lbnQtd2lzZSB0byB0aGUgY3VycmVudCBWZWMyLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBhcHBseS5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSB0aGlzXG4gKi9cblZlYzIucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcChmbikge1xuICAgIHRoaXMueCA9IGZuKHRoaXMueCk7XG4gICAgdGhpcy55ID0gZm4odGhpcy55KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0IHRoZSBtYWduaXR1ZGUgb2YgdGhlIGN1cnJlbnQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3JcbiAqL1xuVmVjMi5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKCkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuXG4gICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgaW5wdXQgb250byB0aGUgY3VycmVudCBWZWMyLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzJ9IHYgVmVjMiB0byBjb3B5XG4gKlxuICogQHJldHVybiB7VmVjMn0gdGhpc1xuICovXG5WZWMyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIGN1cnJlbnQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7VmVjMn0gdGhpc1xuICovXG5WZWMyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgbWFnbml0dWRlIG9mIHRoZSBjdXJyZW50IFZlYzIgaXMgZXhhY3RseSAwLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIG9yIG5vdCB0aGUgbGVuZ3RoIGlzIDBcbiAqL1xuVmVjMi5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gaXNaZXJvKCkge1xuICAgIGlmICh0aGlzLnggIT09IDAgfHwgdGhpcy55ICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgZWxzZSByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogVGhlIGFycmF5IGZvcm0gb2YgdGhlIGN1cnJlbnQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7QXJyYXl9IHRoZSBWZWMgdG8gYXMgYW4gYXJyYXlcbiAqL1xuVmVjMi5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgaW5wdXQgVmVjMi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMyfSB2IFRoZSByZWZlcmVuY2UgVmVjMi5cbiAqIEBwYXJhbSB7VmVjMn0gb3V0cHV0IFZlYzIgaW4gd2hpY2ggdG8gcGxhY2UgdGhlIHJlc3VsdC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSBUaGUgbm9ybWFsaXplZCBWZWMyLlxuICovXG5WZWMyLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZSh2LCBvdXRwdXQpIHtcbiAgICB2YXIgeCA9IHYueDtcbiAgICB2YXIgeSA9IHYueTtcblxuICAgIHZhciBsZW5ndGggPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkgfHwgMTtcbiAgICBsZW5ndGggPSAxIC8gbGVuZ3RoO1xuICAgIG91dHB1dC54ID0gdi54ICogbGVuZ3RoO1xuICAgIG91dHB1dC55ID0gdi55ICogbGVuZ3RoO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogQ2xvbmUgdGhlIGlucHV0IFZlYzIuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjMn0gdiBUaGUgVmVjMiB0byBjbG9uZS5cbiAqXG4gKiBAcmV0dXJuIHtWZWMyfSBUaGUgY2xvbmVkIFZlYzIuXG4gKi9cblZlYzIuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSh2KSB7XG4gICAgcmV0dXJuIG5ldyBWZWMyKHYueCwgdi55KTtcbn07XG5cbi8qKlxuICogQWRkIHRoZSBpbnB1dCBWZWMyJ3MuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjMn0gdjEgVGhlIGxlZnQgVmVjMi5cbiAqIEBwYXJhbSB7VmVjMn0gdjIgVGhlIHJpZ2h0IFZlYzIuXG4gKiBAcGFyYW0ge1ZlYzJ9IG91dHB1dCBWZWMyIGluIHdoaWNoIHRvIHBsYWNlIHRoZSByZXN1bHQuXG4gKlxuICogQHJldHVybiB7VmVjMn0gVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb24uXG4gKi9cblZlYzIuYWRkID0gZnVuY3Rpb24gYWRkKHYxLCB2Miwgb3V0cHV0KSB7XG4gICAgb3V0cHV0LnggPSB2MS54ICsgdjIueDtcbiAgICBvdXRwdXQueSA9IHYxLnkgKyB2Mi55O1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3QgdGhlIHNlY29uZCBWZWMyIGZyb20gdGhlIGZpcnN0LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzJ9IHYxIFRoZSBsZWZ0IFZlYzIuXG4gKiBAcGFyYW0ge1ZlYzJ9IHYyIFRoZSByaWdodCBWZWMyLlxuICogQHBhcmFtIHtWZWMyfSBvdXRwdXQgVmVjMiBpbiB3aGljaCB0byBwbGFjZSB0aGUgcmVzdWx0LlxuICpcbiAqIEByZXR1cm4ge1ZlYzJ9IFRoZSByZXN1bHQgb2YgdGhlIHN1YnRyYWN0aW9uLlxuICovXG5WZWMyLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3QodjEsIHYyLCBvdXRwdXQpIHtcbiAgICBvdXRwdXQueCA9IHYxLnggLSB2Mi54O1xuICAgIG91dHB1dC55ID0gdjEueSAtIHYyLnk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogU2NhbGUgdGhlIGlucHV0IFZlYzIuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjMn0gdiBUaGUgcmVmZXJlbmNlIFZlYzIuXG4gKiBAcGFyYW0ge051bWJlcn0gcyBOdW1iZXIgdG8gc2NhbGUgYnkuXG4gKiBAcGFyYW0ge1ZlYzJ9IG91dHB1dCBWZWMyIGluIHdoaWNoIHRvIHBsYWNlIHRoZSByZXN1bHQuXG4gKlxuICogQHJldHVybiB7VmVjMn0gVGhlIHJlc3VsdCBvZiB0aGUgc2NhbGluZy5cbiAqL1xuVmVjMi5zY2FsZSA9IGZ1bmN0aW9uIHNjYWxlKHYsIHMsIG91dHB1dCkge1xuICAgIG91dHB1dC54ID0gdi54ICogcztcbiAgICBvdXRwdXQueSA9IHYueSAqIHM7XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogVGhlIGRvdCBwcm9kdWN0IG9mIHRoZSBpbnB1dCBWZWMyJ3MuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjMn0gdjEgVGhlIGxlZnQgVmVjMi5cbiAqIEBwYXJhbSB7VmVjMn0gdjIgVGhlIHJpZ2h0IFZlYzIuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgZG90IHByb2R1Y3QuXG4gKi9cblZlYzIuZG90ID0gZnVuY3Rpb24gZG90KHYxLCB2Mikge1xuICAgIHJldHVybiB2MS54ICogdjIueCArIHYxLnkgKiB2Mi55O1xufTtcblxuLyoqXG4gKiBUaGUgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgaW5wdXQgVmVjMidzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdjEgVGhlIGxlZnQgVmVjMi5cbiAqIEBwYXJhbSB7TnVtYmVyfSB2MiBUaGUgcmlnaHQgVmVjMi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSB6LWNvbXBvbmVudCBvZiB0aGUgY3Jvc3MgcHJvZHVjdC5cbiAqL1xuVmVjMi5jcm9zcyA9IGZ1bmN0aW9uKHYxLHYyKSB7XG4gICAgcmV0dXJuIHYxLnggKiB2Mi55IC0gdjEueSAqIHYyLng7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZlYzI7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSB0aHJlZS1kaW1lbnNpb25hbCB2ZWN0b3IuXG4gKlxuICogQGNsYXNzIFZlYzNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBUaGUgeCBjb21wb25lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0geSBUaGUgeSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0geiBUaGUgeiBjb21wb25lbnQuXG4gKi9cbnZhciBWZWMzID0gZnVuY3Rpb24oeCAseSwgeil7XG4gICAgdGhpcy54ID0geCB8fCAwO1xuICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICB0aGlzLnogPSB6IHx8IDA7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiB0aGUgY3VycmVudCBWZWMzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBUaGUgeCBjb21wb25lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0geSBUaGUgeSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge051bWJlcn0geiBUaGUgeiBjb21wb25lbnQuXG4gKlxuICogQHJldHVybiB7VmVjM30gdGhpc1xuICovXG5WZWMzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoeCwgeSwgeikge1xuICAgIGlmICh4ICE9IG51bGwpIHRoaXMueCA9IHg7XG4gICAgaWYgKHkgIT0gbnVsbCkgdGhpcy55ID0geTtcbiAgICBpZiAoeiAhPSBudWxsKSB0aGlzLnogPSB6O1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCB0aGUgaW5wdXQgdiB0byB0aGUgY3VycmVudCBWZWMzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzN9IHYgVGhlIFZlYzMgdG8gYWRkLlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IHRoaXNcbiAqL1xuVmVjMy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKHYpIHtcbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG4gICAgdGhpcy56ICs9IHYuejtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB0aGUgaW5wdXQgdiBmcm9tIHRoZSBjdXJyZW50IFZlYzMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjM30gdiBUaGUgVmVjMyB0byBzdWJ0cmFjdC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSB0aGlzXG4gKi9cblZlYzMucHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3Qodikge1xuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcbiAgICB0aGlzLnogLT0gdi56O1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdGF0ZSB0aGUgY3VycmVudCBWZWMzIGJ5IHRoZXRhIGNsb2Nrd2lzZSBhYm91dCB0aGUgeCBheGlzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdGhldGEgQW5nbGUgYnkgd2hpY2ggdG8gcm90YXRlLlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IHRoaXNcbiAqL1xuVmVjMy5wcm90b3R5cGUucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICB0aGlzLnkgPSB5ICogY29zVGhldGEgLSB6ICogc2luVGhldGE7XG4gICAgdGhpcy56ID0geSAqIHNpblRoZXRhICsgeiAqIGNvc1RoZXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdGF0ZSB0aGUgY3VycmVudCBWZWMzIGJ5IHRoZXRhIGNsb2Nrd2lzZSBhYm91dCB0aGUgeSBheGlzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdGhldGEgQW5nbGUgYnkgd2hpY2ggdG8gcm90YXRlLlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IHRoaXNcbiAqL1xuVmVjMy5wcm90b3R5cGUucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICB0aGlzLnggPSB6ICogc2luVGhldGEgKyB4ICogY29zVGhldGE7XG4gICAgdGhpcy56ID0geiAqIGNvc1RoZXRhIC0geCAqIHNpblRoZXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdGF0ZSB0aGUgY3VycmVudCBWZWMzIGJ5IHRoZXRhIGNsb2Nrd2lzZSBhYm91dCB0aGUgeiBheGlzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdGhldGEgQW5nbGUgYnkgd2hpY2ggdG8gcm90YXRlLlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IHRoaXNcbiAqL1xuVmVjMy5wcm90b3R5cGUucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVoodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcblxuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG5cbiAgICB0aGlzLnggPSB4ICogY29zVGhldGEgLSB5ICogc2luVGhldGE7XG4gICAgdGhpcy55ID0geCAqIHNpblRoZXRhICsgeSAqIGNvc1RoZXRhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgY3VycmVudCBWZWMzIHdpdGggaW5wdXQgVmVjMyB2LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzN9IHYgVGhlIG90aGVyIFZlYzMuXG4gKlxuICogQHJldHVybiB7VmVjM30gdGhpc1xuICovXG5WZWMzLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiBkb3Qodikge1xuICAgIHJldHVybiB0aGlzLngqdi54ICsgdGhpcy55KnYueSArIHRoaXMueip2Lno7XG59O1xuXG4vKipcbiAqIFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgY3VycmVudCBWZWMzIHdpdGggaW5wdXQgVmVjMyB2LlxuICogU3RvcmVzIHRoZSByZXN1bHQgaW4gdGhlIGN1cnJlbnQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kIGNyb3NzXG4gKlxuICogQHBhcmFtIHtWZWMzfSB2IFRoZSBvdGhlciBWZWMzXG4gKlxuICogQHJldHVybiB7VmVjM30gdGhpc1xuICovXG5WZWMzLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uIGNyb3NzKHYpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciB2eCA9IHYueDtcbiAgICB2YXIgdnkgPSB2Lnk7XG4gICAgdmFyIHZ6ID0gdi56O1xuXG4gICAgdGhpcy54ID0geSAqIHZ6IC0geiAqIHZ5O1xuICAgIHRoaXMueSA9IHogKiB2eCAtIHggKiB2ejtcbiAgICB0aGlzLnogPSB4ICogdnkgLSB5ICogdng7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNjYWxlIHRoZSBjdXJyZW50IFZlYzMgYnkgYSBzY2FsYXIuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzIFRoZSBOdW1iZXIgYnkgd2hpY2ggdG8gc2NhbGVcbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSB0aGlzXG4gKi9cblZlYzMucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gc2NhbGUocykge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuICAgIHRoaXMueiAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFByZXNlcnZlIHRoZSBtYWduaXR1ZGUgYnV0IGludmVydCB0aGUgb3JpZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7VmVjM30gdGhpc1xuICovXG5WZWMzLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbiBpbnZlcnQoKSB7XG4gICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xuICAgIHRoaXMueiA9IC10aGlzLno7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQXBwbHkgYSBmdW5jdGlvbiBjb21wb25lbnQtd2lzZSB0byB0aGUgY3VycmVudCBWZWMzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBhcHBseS5cbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSB0aGlzXG4gKi9cblZlYzMucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcChmbikge1xuICAgIHRoaXMueCA9IGZuKHRoaXMueCk7XG4gICAgdGhpcy55ID0gZm4odGhpcy55KTtcbiAgICB0aGlzLnogPSBmbih0aGlzLnopO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFRoZSBtYWduaXR1ZGUgb2YgdGhlIGN1cnJlbnQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSB0aGUgbWFnbml0dWRlIG9mIHRoZSBWZWMzXG4gKi9cblZlYzMucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aCgpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcbn07XG5cbi8qKlxuICogVGhlIG1hZ25pdHVkZSBzcXVhcmVkIG9mIHRoZSBjdXJyZW50IFZlYzMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gbWFnbml0dWRlIG9mIHRoZSBWZWMzIHNxdWFyZWRcbiAqL1xuVmVjMy5wcm90b3R5cGUubGVuZ3RoU3EgPSBmdW5jdGlvbiBsZW5ndGhTcSgpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIGlucHV0IG9udG8gdGhlIGN1cnJlbnQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMzfSB2IFZlYzMgdG8gY29weVxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IHRoaXNcbiAqL1xuVmVjMy5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkodikge1xuICAgIHRoaXMueCA9IHYueDtcbiAgICB0aGlzLnkgPSB2Lnk7XG4gICAgdGhpcy56ID0gdi56O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgY3VycmVudCBWZWMzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSB0aGlzXG4gKi9cblZlYzMucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy54ID0gMDtcbiAgICB0aGlzLnkgPSAwO1xuICAgIHRoaXMueiA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIG1hZ25pdHVkZSBvZiB0aGUgY3VycmVudCBWZWMzIGlzIGV4YWN0bHkgMC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBvciBub3QgdGhlIG1hZ25pdHVkZSBpcyB6ZXJvXG4gKi9cblZlYzMucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uIGlzWmVybygpIHtcbiAgICByZXR1cm4gdGhpcy54ID09PSAwICYmIHRoaXMueSA9PT0gMCAmJiB0aGlzLnogPT09IDA7XG59O1xuXG4vKipcbiAqIFRoZSBhcnJheSBmb3JtIG9mIHRoZSBjdXJyZW50IFZlYzMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBhIHRocmVlIGVsZW1lbnQgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnRzIG9mIHRoZSBWZWMzXG4gKi9cblZlYzMucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiB0b0FycmF5KCkge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnksIHRoaXMuel07XG59O1xuXG4vKipcbiAqIFByZXNlcnZlIHRoZSBvcmllbnRhdGlvbiBidXQgY2hhbmdlIHRoZSBsZW5ndGggb2YgdGhlIGN1cnJlbnQgVmVjMyB0byAxLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSB0aGlzXG4gKi9cblZlYzMucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZSgpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcblxuICAgIHZhciBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KSB8fCAxO1xuICAgIGxlbiA9IDEgLyBsZW47XG5cbiAgICB0aGlzLnggKj0gbGVuO1xuICAgIHRoaXMueSAqPSBsZW47XG4gICAgdGhpcy56ICo9IGxlbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQXBwbHkgdGhlIHJvdGF0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGlucHV0ICh1bml0KSBRdWF0ZXJuaW9uXG4gKiB0byB0aGUgY3VycmVudCBWZWMzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1F1YXRlcm5pb259IHEgVW5pdCBRdWF0ZXJuaW9uIHJlcHJlc2VudGluZyB0aGUgcm90YXRpb24gdG8gYXBwbHlcbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSB0aGlzXG4gKi9cblZlYzMucHJvdG90eXBlLmFwcGx5Um90YXRpb24gPSBmdW5jdGlvbiBhcHBseVJvdGF0aW9uKHEpIHtcbiAgICB2YXIgY3cgPSBxLnc7XG4gICAgdmFyIGN4ID0gLXEueDtcbiAgICB2YXIgY3kgPSAtcS55O1xuICAgIHZhciBjeiA9IC1xLno7XG5cbiAgICB2YXIgdnggPSB0aGlzLng7XG4gICAgdmFyIHZ5ID0gdGhpcy55O1xuICAgIHZhciB2eiA9IHRoaXMuejtcblxuICAgIHZhciB0dyA9IC1jeCAqIHZ4IC0gY3kgKiB2eSAtIGN6ICogdno7XG4gICAgdmFyIHR4ID0gdnggKiBjdyArIHZ5ICogY3ogLSBjeSAqIHZ6O1xuICAgIHZhciB0eSA9IHZ5ICogY3cgKyBjeCAqIHZ6IC0gdnggKiBjejtcbiAgICB2YXIgdHogPSB2eiAqIGN3ICsgdnggKiBjeSAtIGN4ICogdnk7XG5cbiAgICB2YXIgdyA9IGN3O1xuICAgIHZhciB4ID0gLWN4O1xuICAgIHZhciB5ID0gLWN5O1xuICAgIHZhciB6ID0gLWN6O1xuXG4gICAgdGhpcy54ID0gdHggKiB3ICsgeCAqIHR3ICsgeSAqIHR6IC0gdHkgKiB6O1xuICAgIHRoaXMueSA9IHR5ICogdyArIHkgKiB0dyArIHR4ICogeiAtIHggKiB0ejtcbiAgICB0aGlzLnogPSB0eiAqIHcgKyB6ICogdHcgKyB4ICogdHkgLSB0eCAqIHk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFwcGx5IHRoZSBpbnB1dCBNYXQzMyB0aGUgdGhlIGN1cnJlbnQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtNYXQzM30gbWF0cml4IE1hdDMzIHRvIGFwcGx5XG4gKlxuICogQHJldHVybiB7VmVjM30gdGhpc1xuICovXG5WZWMzLnByb3RvdHlwZS5hcHBseU1hdHJpeCA9IGZ1bmN0aW9uIGFwcGx5TWF0cml4KG1hdHJpeCkge1xuICAgIHZhciBNID0gbWF0cml4LmdldCgpO1xuXG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG5cbiAgICB0aGlzLnggPSBNWzBdKnggKyBNWzFdKnkgKyBNWzJdKno7XG4gICAgdGhpcy55ID0gTVszXSp4ICsgTVs0XSp5ICsgTVs1XSp6O1xuICAgIHRoaXMueiA9IE1bNl0qeCArIE1bN10qeSArIE1bOF0qejtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBpbnB1dCBWZWMzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzN9IHYgVGhlIHJlZmVyZW5jZSBWZWMzLlxuICogQHBhcmFtIHtWZWMzfSBvdXRwdXQgVmVjMyBpbiB3aGljaCB0byBwbGFjZSB0aGUgcmVzdWx0LlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IFRoZSBub3JtYWxpemUgVmVjMy5cbiAqL1xuVmVjMy5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUodiwgb3V0cHV0KSB7XG4gICAgdmFyIHggPSB2Lng7XG4gICAgdmFyIHkgPSB2Lnk7XG4gICAgdmFyIHogPSB2Lno7XG5cbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeikgfHwgMTtcbiAgICBsZW5ndGggPSAxIC8gbGVuZ3RoO1xuXG4gICAgb3V0cHV0LnggPSB4ICogbGVuZ3RoO1xuICAgIG91dHB1dC55ID0geSAqIGxlbmd0aDtcbiAgICBvdXRwdXQueiA9IHogKiBsZW5ndGg7XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogQXBwbHkgYSByb3RhdGlvbiB0byB0aGUgaW5wdXQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMzfSB2IFRoZSByZWZlcmVuY2UgVmVjMy5cbiAqIEBwYXJhbSB7UXVhdGVybmlvbn0gcSBVbml0IFF1YXRlcm5pb24gcmVwcmVzZW50aW5nIHRoZSByb3RhdGlvbiB0byBhcHBseS5cbiAqIEBwYXJhbSB7VmVjM30gb3V0cHV0IFZlYzMgaW4gd2hpY2ggdG8gcGxhY2UgdGhlIHJlc3VsdC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSBUaGUgcm90YXRlZCB2ZXJzaW9uIG9mIHRoZSBpbnB1dCBWZWMzLlxuICovXG5WZWMzLmFwcGx5Um90YXRpb24gPSBmdW5jdGlvbiBhcHBseVJvdGF0aW9uKHYsIHEsIG91dHB1dCkge1xuICAgIHZhciBjdyA9IHEudztcbiAgICB2YXIgY3ggPSAtcS54O1xuICAgIHZhciBjeSA9IC1xLnk7XG4gICAgdmFyIGN6ID0gLXEuejtcblxuICAgIHZhciB2eCA9IHYueDtcbiAgICB2YXIgdnkgPSB2Lnk7XG4gICAgdmFyIHZ6ID0gdi56O1xuXG4gICAgdmFyIHR3ID0gLWN4ICogdnggLSBjeSAqIHZ5IC0gY3ogKiB2ejtcbiAgICB2YXIgdHggPSB2eCAqIGN3ICsgdnkgKiBjeiAtIGN5ICogdno7XG4gICAgdmFyIHR5ID0gdnkgKiBjdyArIGN4ICogdnogLSB2eCAqIGN6O1xuICAgIHZhciB0eiA9IHZ6ICogY3cgKyB2eCAqIGN5IC0gY3ggKiB2eTtcblxuICAgIHZhciB3ID0gY3c7XG4gICAgdmFyIHggPSAtY3g7XG4gICAgdmFyIHkgPSAtY3k7XG4gICAgdmFyIHogPSAtY3o7XG5cbiAgICBvdXRwdXQueCA9IHR4ICogdyArIHggKiB0dyArIHkgKiB0eiAtIHR5ICogejtcbiAgICBvdXRwdXQueSA9IHR5ICogdyArIHkgKiB0dyArIHR4ICogeiAtIHggKiB0ejtcbiAgICBvdXRwdXQueiA9IHR6ICogdyArIHogKiB0dyArIHggKiB0eSAtIHR4ICogeTtcbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBDbG9uZSB0aGUgaW5wdXQgVmVjMy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMzfSB2IFRoZSBWZWMzIHRvIGNsb25lLlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IFRoZSBjbG9uZWQgVmVjMy5cbiAqL1xuVmVjMy5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKHYpIHtcbiAgICByZXR1cm4gbmV3IFZlYzModi54LCB2LnksIHYueik7XG59O1xuXG4vKipcbiAqIEFkZCB0aGUgaW5wdXQgVmVjMydzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzN9IHYxIFRoZSBsZWZ0IFZlYzMuXG4gKiBAcGFyYW0ge1ZlYzN9IHYyIFRoZSByaWdodCBWZWMzLlxuICogQHBhcmFtIHtWZWMzfSBvdXRwdXQgVmVjMyBpbiB3aGljaCB0byBwbGFjZSB0aGUgcmVzdWx0LlxuICpcbiAqIEByZXR1cm4ge1ZlYzN9IFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uLlxuICovXG5WZWMzLmFkZCA9IGZ1bmN0aW9uIGFkZCh2MSwgdjIsIG91dHB1dCkge1xuICAgIG91dHB1dC54ID0gdjEueCArIHYyLng7XG4gICAgb3V0cHV0LnkgPSB2MS55ICsgdjIueTtcbiAgICBvdXRwdXQueiA9IHYxLnogKyB2Mi56O1xuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IHRoZSBzZWNvbmQgVmVjMyBmcm9tIHRoZSBmaXJzdC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMzfSB2MSBUaGUgbGVmdCBWZWMzLlxuICogQHBhcmFtIHtWZWMzfSB2MiBUaGUgcmlnaHQgVmVjMy5cbiAqIEBwYXJhbSB7VmVjM30gb3V0cHV0IFZlYzMgaW4gd2hpY2ggdG8gcGxhY2UgdGhlIHJlc3VsdC5cbiAqXG4gKiBAcmV0dXJuIHtWZWMzfSBUaGUgcmVzdWx0IG9mIHRoZSBzdWJ0cmFjdGlvbi5cbiAqL1xuVmVjMy5zdWJ0cmFjdCA9IGZ1bmN0aW9uIHN1YnRyYWN0KHYxLCB2Miwgb3V0cHV0KSB7XG4gICAgb3V0cHV0LnggPSB2MS54IC0gdjIueDtcbiAgICBvdXRwdXQueSA9IHYxLnkgLSB2Mi55O1xuICAgIG91dHB1dC56ID0gdjEueiAtIHYyLno7XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogU2NhbGUgdGhlIGlucHV0IFZlYzMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7VmVjM30gdiBUaGUgcmVmZXJlbmNlIFZlYzMuXG4gKiBAcGFyYW0ge051bWJlcn0gcyBOdW1iZXIgdG8gc2NhbGUgYnkuXG4gKiBAcGFyYW0ge1ZlYzN9IG91dHB1dCBWZWMzIGluIHdoaWNoIHRvIHBsYWNlIHRoZSByZXN1bHQuXG4gKlxuICogQHJldHVybiB7VmVjM30gVGhlIHJlc3VsdCBvZiB0aGUgc2NhbGluZy5cbiAqL1xuVmVjMy5zY2FsZSA9IGZ1bmN0aW9uIHNjYWxlKHYsIHMsIG91dHB1dCkge1xuICAgIG91dHB1dC54ID0gdi54ICogcztcbiAgICBvdXRwdXQueSA9IHYueSAqIHM7XG4gICAgb3V0cHV0LnogPSB2LnogKiBzO1xuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG4vKipcbiAqIFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgaW5wdXQgVmVjMydzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzN9IHYxIFRoZSBsZWZ0IFZlYzMuXG4gKiBAcGFyYW0ge1ZlYzN9IHYyIFRoZSByaWdodCBWZWMzLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGRvdCBwcm9kdWN0LlxuICovXG5WZWMzLmRvdCA9IGZ1bmN0aW9uIGRvdCh2MSwgdjIpIHtcbiAgICByZXR1cm4gdjEueCAqIHYyLnggKyB2MS55ICogdjIueSArIHYxLnogKiB2Mi56O1xufTtcblxuLyoqXG4gKiBUaGUgKHJpZ2h0LWhhbmRlZCkgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgaW5wdXQgVmVjMydzLlxuICogdjEgeCB2Mi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtWZWMzfSB2MSBUaGUgbGVmdCBWZWMzLlxuICogQHBhcmFtIHtWZWMzfSB2MiBUaGUgcmlnaHQgVmVjMy5cbiAqIEBwYXJhbSB7VmVjM30gb3V0cHV0IFZlYzMgaW4gd2hpY2ggdG8gcGxhY2UgdGhlIHJlc3VsdC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBvYmplY3QgdGhlIHJlc3VsdCBvZiB0aGUgY3Jvc3MgcHJvZHVjdCB3YXMgcGxhY2VkIGludG9cbiAqL1xuVmVjMy5jcm9zcyA9IGZ1bmN0aW9uIGNyb3NzKHYxLCB2Miwgb3V0cHV0KSB7XG4gICAgdmFyIHgxID0gdjEueDtcbiAgICB2YXIgeTEgPSB2MS55O1xuICAgIHZhciB6MSA9IHYxLno7XG4gICAgdmFyIHgyID0gdjIueDtcbiAgICB2YXIgeTIgPSB2Mi55O1xuICAgIHZhciB6MiA9IHYyLno7XG5cbiAgICBvdXRwdXQueCA9IHkxICogejIgLSB6MSAqIHkyO1xuICAgIG91dHB1dC55ID0gejEgKiB4MiAtIHgxICogejI7XG4gICAgb3V0cHV0LnogPSB4MSAqIHkyIC0geTEgKiB4MjtcbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBUaGUgcHJvamVjdGlvbiBvZiB2MSBvbnRvIHYyLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1ZlYzN9IHYxIFRoZSBsZWZ0IFZlYzMuXG4gKiBAcGFyYW0ge1ZlYzN9IHYyIFRoZSByaWdodCBWZWMzLlxuICogQHBhcmFtIHtWZWMzfSBvdXRwdXQgVmVjMyBpbiB3aGljaCB0byBwbGFjZSB0aGUgcmVzdWx0LlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIG9iamVjdCB0aGUgcmVzdWx0IG9mIHRoZSBjcm9zcyBwcm9kdWN0IHdhcyBwbGFjZWQgaW50byBcbiAqL1xuVmVjMy5wcm9qZWN0ID0gZnVuY3Rpb24gcHJvamVjdCh2MSwgdjIsIG91dHB1dCkge1xuICAgIHZhciB4MSA9IHYxLng7XG4gICAgdmFyIHkxID0gdjEueTtcbiAgICB2YXIgejEgPSB2MS56O1xuICAgIHZhciB4MiA9IHYyLng7XG4gICAgdmFyIHkyID0gdjIueTtcbiAgICB2YXIgejIgPSB2Mi56O1xuXG4gICAgdmFyIHNjYWxlID0geDEgKiB4MiArIHkxICogeTIgKyB6MSAqIHoyO1xuICAgIHNjYWxlIC89IHgyICogeDIgKyB5MiAqIHkyICsgejIgKiB6MjtcblxuICAgIG91dHB1dC54ID0geDIgKiBzY2FsZTtcbiAgICBvdXRwdXQueSA9IHkyICogc2NhbGU7XG4gICAgb3V0cHV0LnogPSB6MiAqIHNjYWxlO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjMztcbiIsIm1vZHVsZS5leHBvcnRzID0gbm9vcFxuXG5mdW5jdGlvbiBub29wKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnWW91IHNob3VsZCBidW5kbGUgeW91ciBjb2RlICcgK1xuICAgICAgJ3VzaW5nIGBnbHNsaWZ5YCBhcyBhIHRyYW5zZm9ybS4nXG4gIClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcHJvZ3JhbWlmeVxuXG5mdW5jdGlvbiBwcm9ncmFtaWZ5KHZlcnRleCwgZnJhZ21lbnQsIHVuaWZvcm1zLCBhdHRyaWJ1dGVzKSB7XG4gIHJldHVybiB7XG4gICAgdmVydGV4OiB2ZXJ0ZXgsIFxuICAgIGZyYWdtZW50OiBmcmFnbWVudCxcbiAgICB1bmlmb3JtczogdW5pZm9ybXMsIFxuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNcbiAgfTtcbn1cbiIsIi8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4vLyBNSVQgbGljZW5zZVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBsYXN0VGltZSA9IDA7XG52YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG5cbnZhciByQUYsIGNBRjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgckFGID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICBjQUYgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICFyQUY7ICsreCkge1xuICAgICAgICByQUYgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgY0FGID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ10gfHxcbiAgICAgICAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXTtcbiAgICB9XG5cbiAgICBpZiAockFGICYmICFjQUYpIHtcbiAgICAgICAgLy8gY0FGIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBzZXRJbnRlcnZhbCBmb3Igbm93ICh2ZXJ5IHJhcmUpLlxuICAgICAgICByQUYgPSBudWxsO1xuICAgIH1cbn1cblxuaWYgKCFyQUYpIHtcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3cgPyBEYXRlLm5vdyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICByQUYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBub3coKTtcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgIHZhciBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIGNBRiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH07XG59XG5cbnZhciBhbmltYXRpb25GcmFtZSA9IHtcbiAgICAvKipcbiAgICAgKiBDcm9zcyBicm93c2VyIHZlcnNpb24gb2YgW3JlcXVlc3RBbmltYXRpb25GcmFtZV17QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL3dpbmRvdy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWV9LlxuICAgICAqXG4gICAgICogVXNlZCBieSBFbmdpbmUgaW4gb3JkZXIgdG8gZXN0YWJsaXNoIGEgcmVuZGVyIGxvb3AuXG4gICAgICpcbiAgICAgKiBJZiBubyAodmVuZG9yIHByZWZpeGVkIHZlcnNpb24gb2YpIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGlzIGF2YWlsYWJsZSxcbiAgICAgKiBgc2V0VGltZW91dGAgd2lsbCBiZSB1c2VkIGluIG9yZGVyIHRvIGVtdWxhdGUgYSByZW5kZXIgbG9vcCBydW5uaW5nIGF0XG4gICAgICogYXBwcm94aW1hdGVseSA2MCBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtICAge0Z1bmN0aW9ufSAgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBvbiB0aGUgbmV4dCBmcmFtZS5cbiAgICAgKiBAcmV0dXJuICB7TnVtYmVyfSAgICByZXF1ZXN0SWQgdG8gYmUgdXNlZCB0byBjYW5jZWwgdGhlIHJlcXVlc3QgdXNpbmdcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICBAbGlua3tjYW5jZWxBbmltYXRpb25GcmFtZX0uXG4gICAgICovXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lOiByQUYsXG5cbiAgICAvKipcbiAgICAgKiBDcm9zcyBicm93c2VyIHZlcnNpb24gb2YgW2NhbmNlbEFuaW1hdGlvbkZyYW1lXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvd2luZG93L2NhbmNlbEFuaW1hdGlvbkZyYW1lfS5cbiAgICAgKlxuICAgICAqIENhbmNlbHMgYSBwcmV2aW91c2x5IHVzaW5nIFtyZXF1ZXN0QW5pbWF0aW9uRnJhbWVde0BsaW5rIGFuaW1hdGlvbkZyYW1lI3JlcXVlc3RBbmltYXRpb25GcmFtZX1cbiAgICAgKiBzY2hlZHVsZWQgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGltbWVkaWF0ZWx5IHN0b3BwaW5nIHRoZSByZW5kZXIgbG9vcCB3aXRoaW4gdGhlIEVuZ2luZS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgIGNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7TnVtYmVyfSAgICByZXF1ZXN0SWQgb2YgdGhlIHNjaGVkdWxlZCBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkIGJ5IFtyZXF1ZXN0QW5pbWF0aW9uRnJhbWVde0BsaW5rIGFuaW1hdGlvbkZyYW1lI3JlcXVlc3RBbmltYXRpb25GcmFtZX0uXG4gICAgICovXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWU6IGNBRlxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhbmltYXRpb25GcmFtZTtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZTogcmVxdWlyZSgnLi9hbmltYXRpb25GcmFtZScpLnJlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZTogcmVxdWlyZSgnLi9hbmltYXRpb25GcmFtZScpLmNhbmNlbEFuaW1hdGlvbkZyYW1lXG59O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHBvbHlmaWxscyA9IHJlcXVpcmUoJy4uL3BvbHlmaWxscycpO1xudmFyIHJBRiA9IHBvbHlmaWxscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG52YXIgY0FGID0gcG9seWZpbGxzLmNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4vKipcbiAqIEJvb2xlYW4gY29uc3RhbnQgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wIGhhcyBhY2Nlc3MgdG8gdGhlIGRvY3VtZW50LlxuICogVGhlIGRvY3VtZW50IGlzIGJlaW5nIHVzZWQgaW4gb3JkZXIgdG8gc3Vic2NyaWJlIGZvciB2aXNpYmlsaXR5Y2hhbmdlIGV2ZW50c1xuICogdXNlZCBmb3Igbm9ybWFsaXppbmcgdGhlIFJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AgdGltZSB3aGVuIGUuZy4gd2hlbiBzd2l0Y2hpbmcgdGFicy5cbiAqIFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqLyBcbnZhciBET0NVTUVOVF9BQ0NFU1MgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5pZiAoRE9DVU1FTlRfQUNDRVNTKSB7XG4gICAgdmFyIFZFTkRPUl9ISURERU4sIFZFTkRPUl9WSVNJQklMSVRZX0NIQU5HRTtcblxuICAgIC8vIE9wZXJhIDEyLjEwIGFuZCBGaXJlZm94IDE4IGFuZCBsYXRlciBzdXBwb3J0XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFZFTkRPUl9ISURERU4gPSAnaGlkZGVuJztcbiAgICAgICAgVkVORE9SX1ZJU0lCSUxJVFlfQ0hBTkdFID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBWRU5ET1JfSElEREVOID0gJ21vekhpZGRlbic7XG4gICAgICAgIFZFTkRPUl9WSVNJQklMSVRZX0NIQU5HRSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBWRU5ET1JfSElEREVOID0gJ21zSGlkZGVuJztcbiAgICAgICAgVkVORE9SX1ZJU0lCSUxJVFlfQ0hBTkdFID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFZFTkRPUl9ISURERU4gPSAnd2Via2l0SGlkZGVuJztcbiAgICAgICAgVkVORE9SX1ZJU0lCSUxJVFlfQ0hBTkdFID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wIGNsYXNzIHVzZWQgZm9yIHVwZGF0aW5nIG9iamVjdHMgb24gYSBmcmFtZS1ieS1mcmFtZS4gU3luY2hyb25pemVzIHRoZVxuICogYHVwZGF0ZWAgbWV0aG9kIGludm9jYXRpb25zIHRvIHRoZSByZWZyZXNoIHJhdGUgb2YgdGhlIHNjcmVlbi4gTWFuYWdlc1xuICogdGhlIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLWxvb3AgYnkgbm9ybWFsaXppbmcgdGhlIHBhc3NlZCBpbiB0aW1lc3RhbXBcbiAqIHdoZW4gc3dpdGNoaW5nIHRhYnMuXG4gKiBcbiAqIEBjbGFzcyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wXG4gKi9cbmZ1bmN0aW9uIFJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBcbiAgICAvLyBSZWZlcmVuY2VzIHRvIG9iamVjdHMgdG8gYmUgdXBkYXRlZCBvbiBuZXh0IGZyYW1lLlxuICAgIHRoaXMuX3VwZGF0ZXMgPSBbXTtcbiAgICBcbiAgICB0aGlzLl9sb29wZXIgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgIF90aGlzLmxvb3AodGltZSk7XG4gICAgfTtcbiAgICB0aGlzLl90aW1lID0gMDtcbiAgICB0aGlzLl9zdG9wcGVkQXQgPSAwO1xuICAgIHRoaXMuX3NsZWVwID0gMDtcbiAgICBcbiAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZW5naW5lIHNob3VsZCBiZSByZXN0YXJ0ZWQgd2hlbiB0aGUgdGFiLyB3aW5kb3cgaXNcbiAgICAvLyBiZWluZyBmb2N1c2VkIGFnYWluICh2aXNpYmlsaXR5IGNoYW5nZSkuXG4gICAgdGhpcy5fc3RhcnRPblZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xuICAgIFxuICAgIC8vIHJlcXVlc3RJZCBhcyByZXR1cm5lZCBieSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnVuY3Rpb247XG4gICAgdGhpcy5fckFGID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLl9zbGVlcERpZmYgPSB0cnVlO1xuICAgIFxuICAgIC8vIFRoZSBlbmdpbmUgaXMgYmVpbmcgc3RhcnRlZCBvbiBpbnN0YW50aWF0aW9uLlxuICAgIC8vIFRPRE8oYWxleGFuZGVyR3VnZWwpXG4gICAgdGhpcy5zdGFydCgpO1xuXG4gICAgLy8gVGhlIFJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3Agc3VwcG9ydHMgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IChlLmcuIFdvcmtlcikuXG4gICAgaWYgKERPQ1VNRU5UX0FDQ0VTUykge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFZFTkRPUl9WSVNJQklMSVRZX0NIQU5HRSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgdGhlIHN3aXRjaGluZyBvZiB0YWJzLlxuICpcbiAqIEBtZXRob2RcbiAqIF9wcml2YXRlXG4gKiBcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cblJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AucHJvdG90eXBlLl9vblZpc2liaWxpdHlDaGFuZ2UgPSBmdW5jdGlvbiBfb25WaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgIGlmIChkb2N1bWVudFtWRU5ET1JfSElEREVOXSkge1xuICAgICAgICB0aGlzLl9vblVuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29uRm9jdXMoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEludGVybmFsIGhlbHBlciBmdW5jdGlvbiB0byBiZSBpbnZva2VkIGFzIHNvb24gYXMgdGhlIHdpbmRvdy8gdGFiIGlzIGJlaW5nXG4gKiBmb2N1c2VkIGFmdGVyIGEgdmlzaWJpbHRpeSBjaGFuZ2UuXG4gKiBcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqLyBcblJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AucHJvdG90eXBlLl9vbkZvY3VzID0gZnVuY3Rpb24gX29uRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuX3N0YXJ0T25WaXNpYmlsaXR5Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBoZWxwZXIgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhcyBzb29uIGFzIHRoZSB3aW5kb3cvIHRhYiBpcyBiZWluZ1xuICogdW5mb2N1c2VkIChoaWRkZW4pIGFmdGVyIGEgdmlzaWJpbHRpeSBjaGFuZ2UuXG4gKiBcbiAqIEBtZXRob2QgIF9vbkZvY3VzXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi8gXG5SZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLnByb3RvdHlwZS5fb25VbmZvY3VzID0gZnVuY3Rpb24gX29uVW5mb2N1cygpIHtcbiAgICB0aGlzLl9zdG9wKCk7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyB0aGUgUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcC4gV2hlbiBzd2l0Y2hpbmcgdG8gYSBkaWZmZXJudCB0YWIvIHdpbmRvdyAoY2hhbmdpbmcgdGhlXG4gKiB2aXNpYmlsdGl5KSwgdGhlIGVuZ2luZSB3aWxsIGJlIHJldGFydGVkIHdoZW4gc3dpdGNoaW5nIGJhY2sgdG8gYSB2aXNpYmxlXG4gKiBzdGF0ZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBcbiAqIEByZXR1cm4ge1JlcXVlc3RBbmltYXRpb25GcmFtZUxvb3B9IHRoaXNcbiAqL1xuUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICBpZiAoIXRoaXMuX3J1bm5pbmcpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRPblZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zdGFydCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW50ZXJuYWwgdmVyc2lvbiBvZiBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wJ3Mgc3RhcnQgZnVuY3Rpb24sIG5vdCBhZmZlY3RpbmcgYmVoYXZpb3Igb24gdmlzaWJpbHR5XG4gKiBjaGFuZ2UuXG4gKiBcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4qXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovIFxuUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcC5wcm90b3R5cGUuX3N0YXJ0ID0gZnVuY3Rpb24gX3N0YXJ0KCkge1xuICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuX3NsZWVwRGlmZiA9IHRydWU7XG4gICAgdGhpcy5fckFGID0gckFGKHRoaXMuX2xvb3Blcik7XG59O1xuXG4vKipcbiAqIFN0b3BzIHRoZSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLlxuICpcbiAqIEBtZXRob2RcbiAqIFxuICogQHJldHVybiB7UmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcH0gdGhpc1xuICovXG5SZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBpZiAodGhpcy5fcnVubmluZykge1xuICAgICAgICB0aGlzLl9zdGFydE9uVmlzaWJpbGl0eUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnRlcm5hbCB2ZXJzaW9uIG9mIFJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AncyBzdG9wIGZ1bmN0aW9uLCBub3QgYWZmZWN0aW5nIGJlaGF2aW9yIG9uIHZpc2liaWx0eVxuICogY2hhbmdlLlxuICogXG4gKiBAbWV0aG9kXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi8gXG5SZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLnByb3RvdHlwZS5fc3RvcCA9IGZ1bmN0aW9uIF9zdG9wKCkge1xuICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9zdG9wcGVkQXQgPSB0aGlzLl90aW1lO1xuXG4gICAgLy8gQnVnIGluIG9sZCB2ZXJzaW9ucyBvZiBGeC4gRXhwbGljaXRseSBjYW5jZWwuXG4gICAgY0FGKHRoaXMuX3JBRik7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcCBpcyBjdXJyZW50bHkgcnVubmluZyBvciBub3QuXG4gKlxuICogQG1ldGhvZFxuICogXG4gKiBAcmV0dXJuIHtCb29sZWFufSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcCBpcyBjdXJyZW50bHkgcnVubmluZyBvciBub3RcbiAqL1xuUmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcC5wcm90b3R5cGUuaXNSdW5uaW5nID0gZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9ydW5uaW5nO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIGFsbCByZWdpc3RlcmVkIG9iamVjdHMuXG4gKlxuICogQG1ldGhvZFxuICogXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZSBoaWdoIHJlc29sdXRpb24gdGltc3RhbXAgdXNlZCBmb3IgaW52b2tpbmcgdGhlIGB1cGRhdGVgIG1ldGhvZCBvbiBhbGwgcmVnaXN0ZXJlZCBvYmplY3RzXG4gKlxuICogQHJldHVybiB7UmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcH0gdGhpc1xuICovXG5SZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gc3RlcCAodGltZSkge1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIGlmICh0aGlzLl9zbGVlcERpZmYpIHtcbiAgICAgICAgdGhpcy5fc2xlZXAgKz0gdGltZSAtIHRoaXMuX3N0b3BwZWRBdDtcbiAgICAgICAgdGhpcy5fc2xlZXBEaWZmID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIC8vIFRoZSBzYW1lIHRpbWV0YW1wIHdpbGwgYmUgZW1pdHRlZCBpbW1lZGlhdGVseSBiZWZvcmUgYW5kIGFmdGVyIHZpc2liaWxpdHlcbiAgICAvLyBjaGFuZ2UuXG4gICAgdmFyIG5vcm1hbGl6ZWRUaW1lID0gdGltZSAtIHRoaXMuX3NsZWVwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl91cGRhdGVzLmxlbmd0aCA7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tpXS51cGRhdGUobm9ybWFsaXplZFRpbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWV0aG9kIGJlaW5nIGNhbGxlZCBieSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBvbiBldmVyeSBwYWludC4gSW5kaXJlY3RseVxuICogcmVjdXJzaXZlIGJ5IHNjaGVkdWxpbmcgYSBmdXR1cmUgaW52b2NhdGlvbiBvZiBpdHNlbGYgb24gdGhlIG5leHQgcGFpbnQuXG4gKlxuICogQG1ldGhvZFxuICogXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZSBoaWdoIHJlc29sdXRpb24gdGltc3RhbXAgdXNlZCBmb3IgaW52b2tpbmcgdGhlIGB1cGRhdGVgIG1ldGhvZCBvbiBhbGwgcmVnaXN0ZXJlZCBvYmplY3RzXG4gKiBAcmV0dXJuIHtSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wfSB0aGlzXG4gKi9cblJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiBsb29wKHRpbWUpIHtcbiAgICB0aGlzLnN0ZXAodGltZSk7XG4gICAgdGhpcy5fckFGID0gckFGKHRoaXMuX2xvb3Blcik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyZXMgYW4gdXBkYXRlYWJsZSBvYmplY3Qgd2hpY2ggYHVwZGF0ZWAgbWV0aG9kIHNob3VsZCBiZSBpbnZva2VkIG9uXG4gKiBldmVyeSBwYWludCwgc3RhcnRpbmcgb24gdGhlIG5leHQgcGFpbnQgKGFzc3VtaW5nIHRoZSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wIGlzIHJ1bm5pbmcpLlxuICpcbiAqIEBtZXRob2RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZWFibGUgb2JqZWN0IHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZWFibGUudXBkYXRlIHVwZGF0ZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gdGhlIHJlZ2lzdGVyZWQgb2JqZWN0XG4gKlxuICogQHJldHVybiB7UmVxdWVzdEFuaW1hdGlvbkZyYW1lTG9vcH0gdGhpc1xuICovXG5SZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUodXBkYXRlYWJsZSkge1xuICAgIGlmICh0aGlzLl91cGRhdGVzLmluZGV4T2YodXBkYXRlYWJsZSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZXMucHVzaCh1cGRhdGVhYmxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERlcmVnaXN0ZXJzIGFuIHVwZGF0ZWFibGUgb2JqZWN0IHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB1c2luZyBgdXBkYXRlYCB0byBiZVxuICogbm8gbG9uZ2VyIHVwZGF0ZWQuXG4gKlxuICogQG1ldGhvZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gdXBkYXRlYWJsZSB1cGRhdGVhYmxlIG9iamVjdCBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgdXNpbmcgYHVwZGF0ZWBcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wfSB0aGlzXG4gKi9cblJlcXVlc3RBbmltYXRpb25GcmFtZUxvb3AucHJvdG90eXBlLm5vTG9uZ2VyVXBkYXRlID0gZnVuY3Rpb24gbm9Mb25nZXJVcGRhdGUodXBkYXRlYWJsZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX3VwZGF0ZXMuaW5kZXhPZih1cGRhdGVhYmxlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLl91cGRhdGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVMb29wO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xudmFyIGluamVjdENTUyA9IHJlcXVpcmUoJy4vaW5qZWN0LWNzcycpO1xuXG4vKipcbiAqIEluc3RhbnRpYXRlcyBhIG5ldyBDb21wb3NpdG9yLlxuICogVGhlIENvbXBvc2l0b3IgcmVjZWl2ZXMgZHJhdyBjb21tYW5kcyBmcm0gdGhlIFVJTWFuYWdlciBhbmQgcm91dGVzIHRoZSB0byB0aGVcbiAqIHJlc3BlY3RpdmUgY29udGV4dCBvYmplY3RzLlxuICpcbiAqIFVwb24gY3JlYXRpb24sIGl0IGluamVjdHMgYSBzdHlsZXNoZWV0IHVzZWQgZm9yIHN0eWxpbmcgdGhlIGluZGl2aWR1YWxcbiAqIHJlbmRlcmVycyB1c2VkIGluIHRoZSBjb250ZXh0IG9iamVjdHMuXG4gKlxuICogQGNsYXNzIENvbXBvc2l0b3JcbiAqIEBjb25zdHJ1Y3RvclxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gQ29tcG9zaXRvcigpIHtcbiAgICBpbmplY3RDU1MoKTtcblxuICAgIHRoaXMuX2NvbnRleHRzID0ge307XG4gICAgdGhpcy5fb3V0Q29tbWFuZHMgPSBbXTtcbiAgICB0aGlzLl9pbkNvbW1hbmRzID0gW107XG4gICAgdGhpcy5fdGltZSA9IG51bGw7XG5cbiAgICB0aGlzLl9yZXNpemVkID0gZmFsc2U7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3Jlc2l6ZWQgPSB0cnVlO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgdGltZSBiZWluZyB1c2VkIGJ5IHRoZSBpbnRlcm5hbCBjbG9jayBtYW5hZ2VkIGJ5XG4gKiBgRmFtb3VzRW5naW5lYC5cbiAqXG4gKiBUaGUgdGltZSBpcyBiZWluZyBwYXNzZWQgaW50byBjb3JlIGJ5IHRoZSBFbmdpbmUgdGhyb3VnaCB0aGUgVUlNYW5hZ2VyLlxuICogU2luY2UgY29yZSBoYXMgdGhlIGFiaWxpdHkgdG8gc2NhbGUgdGhlIHRpbWUsIHRoZSB0aW1lIG5lZWRzIHRvIGJlIHBhc3NlZFxuICogYmFjayB0byB0aGUgcmVuZGVyaW5nIHN5c3RlbS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSB0aW1lIFRoZSBjbG9jayB0aW1lIHVzZWQgaW4gY29yZS5cbiAqL1xuQ29tcG9zaXRvci5wcm90b3R5cGUuZ2V0VGltZSA9IGZ1bmN0aW9uIGdldFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RpbWU7XG59O1xuXG4vKipcbiAqIFNjaGVkdWxlcyBhbiBldmVudCB0byBiZSBzZW50IHRoZSBuZXh0IHRpbWUgdGhlIG91dCBjb21tYW5kIHF1ZXVlIGlzIGJlaW5nXG4gKiBmbHVzaGVkLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBwYXRoIFJlbmRlciBwYXRoIHRvIHRoZSBub2RlIHRoZSBldmVudCBzaG91bGQgYmUgdHJpZ2dlcmVkXG4gKiBvbiAoKnRhcmdldGVkIGV2ZW50KilcbiAqIEBwYXJhbSAge1N0cmluZ30gZXYgRXZlbnQgdHlwZVxuICogQHBhcmFtICB7T2JqZWN0fSBwYXlsb2FkIEV2ZW50IG9iamVjdCAoc2VyaWFsaXphYmxlIHVzaW5nIHN0cnVjdHVyZWQgY2xvbmluZ1xuICogYWxnb3JpdGhtKVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNvbXBvc2l0b3IucHJvdG90eXBlLnNlbmRFdmVudCA9IGZ1bmN0aW9uIHNlbmRFdmVudChwYXRoLCBldiwgcGF5bG9hZCkge1xuICAgIHRoaXMuX291dENvbW1hbmRzLnB1c2goJ1dJVEgnLCBwYXRoLCAnVFJJR0dFUicsIGV2LCBwYXlsb2FkKTtcbn07XG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIG1ldGhvZCB1c2VkIGZvciBub3RpZnlpbmcgZXh0ZXJuYWxseVxuICogcmVzaXplZCBjb250ZXh0cyAoZS5nLiBieSByZXNpemluZyB0aGUgYnJvd3NlciB3aW5kb3cpLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvciByZW5kZXIgcGF0aCB0byB0aGUgbm9kZSAoY29udGV4dCkgdGhhdCBzaG91bGQgYmVcbiAqIHJlc2l6ZWRcbiAqIEBwYXJhbSAge0FycmF5fSBzaXplIG5ldyBjb250ZXh0IHNpemVcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5Db21wb3NpdG9yLnByb3RvdHlwZS5zZW5kUmVzaXplID0gZnVuY3Rpb24gc2VuZFJlc2l6ZSAoc2VsZWN0b3IsIHNpemUpIHtcbiAgICB0aGlzLnNlbmRFdmVudChzZWxlY3RvciwgJ0NPTlRFWFRfUkVTSVpFJywgc2l6ZSk7XG59O1xuXG4vKipcbiAqIEludGVybmFsIGhlbHBlciBtZXRob2QgdXNlZCBieSBgZHJhd0NvbW1hbmRzYC5cbiAqIFN1YnNlcXVlbnQgY29tbWFuZHMgYXJlIGJlaW5nIGFzc29jaWF0ZWQgd2l0aCB0aGUgbm9kZSBkZWZpbmVkIHRoZSB0aGUgcGF0aFxuICogZm9sbG93aW5nIHRoZSBgV0lUSGAgY29tbWFuZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEBwYXJhbSAge051bWJlcn0gaXRlcmF0b3IgcG9zaXRpb24gaW5kZXggd2l0aGluIHRoZSBjb21tYW5kcyBxdWV1ZVxuICogQHBhcmFtICB7QXJyYXl9IGNvbW1hbmRzIHJlbWFpbmluZyBtZXNzYWdlIHF1ZXVlIHJlY2VpdmVkLCB1c2VkIHRvXG4gKiBzaGlmdCBzaW5nbGUgbWVzc2FnZXMgZnJvbVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNvbXBvc2l0b3IucHJvdG90eXBlLmhhbmRsZVdpdGggPSBmdW5jdGlvbiBoYW5kbGVXaXRoIChpdGVyYXRvciwgY29tbWFuZHMpIHtcbiAgICB2YXIgcGF0aCA9IGNvbW1hbmRzW2l0ZXJhdG9yXTtcbiAgICB2YXIgcGF0aEFyciA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMuZ2V0T3JTZXRDb250ZXh0KHBhdGhBcnIuc2hpZnQoKSk7XG4gICAgcmV0dXJuIGNvbnRleHQucmVjZWl2ZShwYXRoLCBjb21tYW5kcywgaXRlcmF0b3IpO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHRvcC1sZXZlbCBDb250ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgcGFzc2VkIGluIGRvY3VtZW50XG4gKiBxdWVyeSBzZWxlY3Rvci4gSWYgbm8gc3VjaCBDb250ZXh0IGV4aXN0cywgYSBuZXcgb25lIHdpbGwgYmUgaW5zdGFudGlhdGVkLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvciBkb2N1bWVudCBxdWVyeSBzZWxlY3RvciB1c2VkIGZvciByZXRyaWV2aW5nIHRoZVxuICogRE9NIG5vZGUgdGhlIFZpcnR1YWxFbGVtZW50IHNob3VsZCBiZSBhdHRhY2hlZCB0b1xuICpcbiAqIEByZXR1cm4ge0NvbnRleHR9IGNvbnRleHRcbiAqL1xuQ29tcG9zaXRvci5wcm90b3R5cGUuZ2V0T3JTZXRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0T3JTZXRDb250ZXh0KHNlbGVjdG9yKSB7XG4gICAgaWYgKHRoaXMuX2NvbnRleHRzW3NlbGVjdG9yXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dHNbc2VsZWN0b3JdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChzZWxlY3RvciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHRzW3NlbGVjdG9yXSA9IGNvbnRleHQ7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn07XG5cbi8qKlxuICogSW50ZXJuYWwgaGVscGVyIG1ldGhvZCB1c2VkIGJ5IGBkcmF3Q29tbWFuZHNgLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtICB7TnVtYmVyfSBpdGVyYXRvciBwb3NpdGlvbiBpbmRleCB3aXRoaW4gdGhlIGNvbW1hbmQgcXVldWVcbiAqIEBwYXJhbSAge0FycmF5fSBjb21tYW5kcyByZW1haW5pbmcgbWVzc2FnZSBxdWV1ZSByZWNlaXZlZCwgdXNlZCB0b1xuICogc2hpZnQgc2luZ2xlIG1lc3NhZ2VzXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuQ29tcG9zaXRvci5wcm90b3R5cGUuZ2l2ZVNpemVGb3IgPSBmdW5jdGlvbiBnaXZlU2l6ZUZvcihpdGVyYXRvciwgY29tbWFuZHMpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSBjb21tYW5kc1tpdGVyYXRvcl07XG4gICAgdmFyIHNpemUgPSB0aGlzLmdldE9yU2V0Q29udGV4dChzZWxlY3RvcikuZ2V0Um9vdFNpemUoKTtcbiAgICB0aGlzLnNlbmRSZXNpemUoc2VsZWN0b3IsIHNpemUpO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgdGhlIHByZXZpb3VzbHkgdmlhIGByZWNlaXZlQ29tbWFuZHNgIHVwZGF0ZWQgaW5jb21pbmcgXCJpblwiXG4gKiBjb21tYW5kIHF1ZXVlLlxuICogQ2FsbGVkIGJ5IFVJTWFuYWdlciBvbiBhIGZyYW1lIGJ5IGZyYW1lIGJhc2lzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gb3V0Q29tbWFuZHMgc2V0IG9mIGNvbW1hbmRzIHRvIGJlIHNlbnQgYmFja1xuICovXG5Db21wb3NpdG9yLnByb3RvdHlwZS5kcmF3Q29tbWFuZHMgPSBmdW5jdGlvbiBkcmF3Q29tbWFuZHMoKSB7XG4gICAgdmFyIGNvbW1hbmRzID0gdGhpcy5faW5Db21tYW5kcztcbiAgICB2YXIgbG9jYWxJdGVyYXRvciA9IDA7XG4gICAgdmFyIGNvbW1hbmQgPSBjb21tYW5kc1tsb2NhbEl0ZXJhdG9yXTtcbiAgICB3aGlsZSAoY29tbWFuZCkge1xuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ1RJTUUnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnV0lUSCc6XG4gICAgICAgICAgICAgICAgbG9jYWxJdGVyYXRvciA9IHRoaXMuaGFuZGxlV2l0aCgrK2xvY2FsSXRlcmF0b3IsIGNvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ05FRURfU0laRV9GT1InOlxuICAgICAgICAgICAgICAgIHRoaXMuZ2l2ZVNpemVGb3IoKytsb2NhbEl0ZXJhdG9yLCBjb21tYW5kcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29tbWFuZCA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG4gICAgfVxuXG4gICAgLy8gVE9ETzogU3dpdGNoIHRvIGFzc29jaWF0aXZlIGFycmF5cyBoZXJlLi4uXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fY29udGV4dHMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dHNba2V5XS5kcmF3KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3Jlc2l6ZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTaXplKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX291dENvbW1hbmRzO1xufTtcblxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHNpemUgb2YgYWxsIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjb250ZXh0IG9iamVjdHMuXG4gKiBUaGlzIHJlc3VsdHMgaW50byBDT05URVhUX1JFU0laRSBldmVudHMgYmVpbmcgc2VudCBhbmQgdGhlIHJvb3QgZWxlbWVudHNcbiAqIHVzZWQgYnkgdGhlIGluZGl2aWR1YWwgcmVuZGVyZXJzIGJlaW5nIHJlc2l6ZWQgdG8gdGhlIHRoZSBET01SZW5kZXJlcidzIHJvb3RcbiAqIHNpemUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNvbXBvc2l0b3IucHJvdG90eXBlLnVwZGF0ZVNpemUgPSBmdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICAgIGZvciAodmFyIHNlbGVjdG9yIGluIHRoaXMuX2NvbnRleHRzKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHRzW3NlbGVjdG9yXS51cGRhdGVTaXplKCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBVc2VkIGJ5IFRocmVhZE1hbmFnZXIgdG8gdXBkYXRlIHRoZSBpbnRlcm5hbCBxdWV1ZSBvZiBpbmNvbWluZyBjb21tYW5kcy5cbiAqIFJlY2VpdmluZyBjb21tYW5kcyBkb2VzIG5vdCBpbW1lZGlhdGVseSBzdGFydCB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSAge0FycmF5fSBjb21tYW5kcyBjb21tYW5kIHF1ZXVlIHRvIGJlIHByb2Nlc3NlZCBieSB0aGUgY29tcG9zaXRvcidzXG4gKiBgZHJhd0NvbW1hbmRzYCBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5Db21wb3NpdG9yLnByb3RvdHlwZS5yZWNlaXZlQ29tbWFuZHMgPSBmdW5jdGlvbiByZWNlaXZlQ29tbWFuZHMoY29tbWFuZHMpIHtcbiAgICB2YXIgbGVuID0gY29tbWFuZHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5faW5Db21tYW5kcy5wdXNoKGNvbW1hbmRzW2ldKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEZsdXNoZXMgdGhlIHF1ZXVlIG9mIG91dGdvaW5nIFwib3V0XCIgY29tbWFuZHMuXG4gKiBDYWxsZWQgYnkgVGhyZWFkTWFuYWdlci5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuQ29tcG9zaXRvci5wcm90b3R5cGUuY2xlYXJDb21tYW5kcyA9IGZ1bmN0aW9uIGNsZWFyQ29tbWFuZHMoKSB7XG4gICAgdGhpcy5faW5Db21tYW5kcy5sZW5ndGggPSAwO1xuICAgIHRoaXMuX291dENvbW1hbmRzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fcmVzaXplZCA9IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb3NpdG9yO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgV2ViR0xSZW5kZXJlciA9IHJlcXVpcmUoJy4uL3dlYmdsLXJlbmRlcmVycy9XZWJHTFJlbmRlcmVyJyk7XG52YXIgQ2FtZXJhID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9DYW1lcmEnKTtcbnZhciBET01SZW5kZXJlciA9IHJlcXVpcmUoJy4uL2RvbS1yZW5kZXJlcnMvRE9NUmVuZGVyZXInKTtcblxuLyoqXG4gKiBDb250ZXh0IGlzIGEgcmVuZGVyIGxheWVyIHdpdGggaXRzIG93biBXZWJHTFJlbmRlcmVyIGFuZCBET01SZW5kZXJlci5cbiAqIEl0IGlzIHRoZSBpbnRlcmZhY2UgYmV0d2VlbiB0aGUgQ29tcG9zaXRvciB3aGljaCByZWNlaXZlcyBjb21tYW5kc1xuICogYW5kIHRoZSByZW5kZXJlcnMgdGhhdCBpbnRlcnByZXQgdGhlbS4gSXQgYWxzbyByZWxheXMgaW5mb3JtYXRpb24gdG9cbiAqIHRoZSByZW5kZXJlcnMgYWJvdXQgcmVzaXppbmcuXG4gKlxuICogVGhlIERPTUVsZW1lbnQgYXQgdGhlIGdpdmVuIHF1ZXJ5IHNlbGVjdG9yIGlzIHVzZWQgYXMgdGhlIHJvb3QuIEFcbiAqIG5ldyBET01FbGVtZW50IGlzIGFwcGVuZGVkIHRvIHRoaXMgcm9vdCBlbGVtZW50LCBhbmQgdXNlZCBhcyB0aGVcbiAqIHBhcmVudCBlbGVtZW50IGZvciBhbGwgRmFtb3VzIERPTSByZW5kZXJpbmcgYXQgdGhpcyBjb250ZXh0LiBBXG4gKiBjYW52YXMgaXMgYWRkZWQgYW5kIHVzZWQgZm9yIGFsbCBXZWJHTCByZW5kZXJpbmcgYXQgdGhpcyBjb250ZXh0LlxuICpcbiAqIEBjbGFzcyBDb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgUXVlcnkgc2VsZWN0b3IgdXNlZCB0byBsb2NhdGUgcm9vdCBlbGVtZW50IG9mXG4gKiBjb250ZXh0IGxheWVyLlxuICogQHBhcmFtIHtDb21wb3NpdG9yfSBjb21wb3NpdG9yIENvbXBvc2l0b3IgcmVmZXJlbmNlIHRvIHBhc3MgZG93biB0b1xuICogV2ViR0xSZW5kZXJlci5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBDb250ZXh0KHNlbGVjdG9yLCBjb21wb3NpdG9yKSB7XG4gICAgdGhpcy5fY29tcG9zaXRvciA9IGNvbXBvc2l0b3I7XG4gICAgdGhpcy5fcm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG4gICAgLy8gQ3JlYXRlIERPTSBlbGVtZW50IHRvIGJlIHVzZWQgYXMgcm9vdCBmb3IgYWxsIGZhbW91cyBET01cbiAgICAvLyByZW5kZXJpbmcgYW5kIGFwcGVuZCBlbGVtZW50IHRvIHRoZSByb290IGVsZW1lbnQuXG5cbiAgICB2YXIgRE9NTGF5ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3Jvb3RFbC5hcHBlbmRDaGlsZChET01MYXllckVsKTtcblxuICAgIC8vIEluc3RhbnRpYXRlIHJlbmRlcmVyc1xuXG4gICAgdGhpcy5ET01SZW5kZXJlciA9IG5ldyBET01SZW5kZXJlcihET01MYXllckVsLCBzZWxlY3RvciwgY29tcG9zaXRvcik7XG4gICAgdGhpcy5XZWJHTFJlbmRlcmVyID0gbnVsbDtcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG5cbiAgICAvLyBTdGF0ZSBob2xkZXJzXG5cbiAgICB0aGlzLl9yZW5kZXJTdGF0ZSA9IHtcbiAgICAgICAgcHJvamVjdGlvblR5cGU6IENhbWVyYS5PUlRIT0dSQVBISUNfUFJPSkVDVElPTixcbiAgICAgICAgcGVyc3BlY3RpdmVUcmFuc2Zvcm06IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdKSxcbiAgICAgICAgdmlld1RyYW5zZm9ybTogbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV0pLFxuICAgICAgICB2aWV3RGlydHk6IGZhbHNlLFxuICAgICAgICBwZXJzcGVjdGl2ZURpcnR5OiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLl9zaXplID0gW107XG4gICAgdGhpcy5fY2hpbGRyZW4gPSB7fTtcbiAgICB0aGlzLl9lbGVtZW50SGFzaCA9IHt9O1xuXG4gICAgdGhpcy5fbWVzaFRyYW5zZm9ybSA9IFtdO1xuICAgIHRoaXMuX21lc2hTaXplID0gWzAsIDAsIDBdO1xufVxuXG4vKipcbiAqIFF1ZXJpZXMgRE9NUmVuZGVyZXIgc2l6ZSBhbmQgdXBkYXRlcyBjYW52YXMgc2l6ZS4gUmVsYXlzIHNpemUgaW5mb3JtYXRpb24gdG9cbiAqIFdlYkdMUmVuZGVyZXIuXG4gKlxuICogQHJldHVybiB7Q29udGV4dH0gdGhpc1xuICovXG5Db250ZXh0LnByb3RvdHlwZS51cGRhdGVTaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdTaXplID0gdGhpcy5ET01SZW5kZXJlci5nZXRTaXplKCk7XG4gICAgdGhpcy5fY29tcG9zaXRvci5zZW5kUmVzaXplKHRoaXMuX3NlbGVjdG9yLCBuZXdTaXplKTtcblxuICAgIHZhciB3aWR0aCA9IG5ld1NpemVbMF07XG4gICAgdmFyIGhlaWdodCA9IG5ld1NpemVbMV07XG5cbiAgICB0aGlzLl9zaXplWzBdID0gd2lkdGg7XG4gICAgdGhpcy5fc2l6ZVsxXSA9IGhlaWdodDtcbiAgICB0aGlzLl9zaXplWzJdID0gKHdpZHRoID4gaGVpZ2h0KSA/IHdpZHRoIDogaGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMuY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoICA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuV2ViR0xSZW5kZXJlcikgdGhpcy5XZWJHTFJlbmRlcmVyLnVwZGF0ZVNpemUodGhpcy5fc2l6ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRHJhdyBmdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgYWxsIGNvbW1hbmRzIGhhdmUgYmVlbiBoYW5kbGVkIGZvciBjdXJyZW50IGZyYW1lLlxuICogSXNzdWVzIGRyYXcgY29tbWFuZHMgdG8gYWxsIHJlbmRlcmVycyB3aXRoIGN1cnJlbnQgcmVuZGVyU3RhdGUuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiBkcmF3KCkge1xuICAgIHRoaXMuRE9NUmVuZGVyZXIuZHJhdyh0aGlzLl9yZW5kZXJTdGF0ZSk7XG4gICAgaWYgKHRoaXMuV2ViR0xSZW5kZXJlcikgdGhpcy5XZWJHTFJlbmRlcmVyLmRyYXcodGhpcy5fcmVuZGVyU3RhdGUpO1xuXG4gICAgaWYgKHRoaXMuX3JlbmRlclN0YXRlLnBlcnNwZWN0aXZlRGlydHkpIHRoaXMuX3JlbmRlclN0YXRlLnBlcnNwZWN0aXZlRGlydHkgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fcmVuZGVyU3RhdGUudmlld0RpcnR5KSB0aGlzLl9yZW5kZXJTdGF0ZS52aWV3RGlydHkgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgc2l6ZSBvZiB0aGUgcGFyZW50IGVsZW1lbnQgb2YgdGhlIERPTVJlbmRlcmVyIGZvciB0aGlzIGNvbnRleHQuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmdldFJvb3RTaXplID0gZnVuY3Rpb24gZ2V0Um9vdFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuRE9NUmVuZGVyZXIuZ2V0U2l6ZSgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGluaXRpYWxpemF0aW9uIG9mIFdlYkdMUmVuZGVyZXIgd2hlbiBuZWNlc3NhcnksIGluY2x1ZGluZyBjcmVhdGlvblxuICogb2YgdGhlIGNhbnZhcyBlbGVtZW50IGFuZCBpbnN0YW50aWF0aW9uIG9mIHRoZSByZW5kZXJlci4gQWxzbyB1cGRhdGVzIHNpemVcbiAqIHRvIHBhc3Mgc2l6ZSBpbmZvcm1hdGlvbiB0byB0aGUgcmVuZGVyZXIuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmluaXRXZWJHTCA9IGZ1bmN0aW9uIGluaXRXZWJHTCgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX3Jvb3RFbC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgdGhpcy5XZWJHTFJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIodGhpcy5jYW52YXMsIHRoaXMuX2NvbXBvc2l0b3IpO1xuICAgIHRoaXMudXBkYXRlU2l6ZSgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGRlbGVnYXRpb24gb2YgY29tbWFuZHMgdG8gcmVuZGVyZXJzIG9mIHRoaXMgY29udGV4dC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggU3RyaW5nIHVzZWQgYXMgaWRlbnRpZmllciBvZiBhIGdpdmVuIG5vZGUgaW4gdGhlXG4gKiBzY2VuZSBncmFwaC5cbiAqIEBwYXJhbSB7QXJyYXl9IGNvbW1hbmRzIExpc3Qgb2YgYWxsIGNvbW1hbmRzIGZyb20gdGhpcyBmcmFtZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBpdGVyYXRvciBOdW1iZXIgaW5kaWNhdGluZyBwcm9ncmVzcyB0aHJvdWdoIHRoZSBjb21tYW5kXG4gKiBxdWV1ZS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGl0ZXJhdG9yIGluZGljYXRpbmcgcHJvZ3Jlc3MgdGhyb3VnaCB0aGUgY29tbWFuZCBxdWV1ZS5cbiAqL1xuQ29udGV4dC5wcm90b3R5cGUucmVjZWl2ZSA9IGZ1bmN0aW9uIHJlY2VpdmUocGF0aCwgY29tbWFuZHMsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIGxvY2FsSXRlcmF0b3IgPSBpdGVyYXRvcjtcblxuICAgIHZhciBjb21tYW5kID0gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcbiAgICB0aGlzLkRPTVJlbmRlcmVyLmxvYWRQYXRoKHBhdGgpO1xuICAgIHRoaXMuRE9NUmVuZGVyZXIuZmluZFRhcmdldCgpO1xuICAgIHdoaWxlIChjb21tYW5kKSB7XG5cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgICBjYXNlICdJTklUX0RPTSc6XG4gICAgICAgICAgICAgICAgdGhpcy5ET01SZW5kZXJlci5pbnNlcnRFbChjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRE9NX1JFTkRFUl9TSVpFJzpcbiAgICAgICAgICAgICAgICB0aGlzLkRPTVJlbmRlcmVyLmdldFNpemVPZihjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQ0hBTkdFX1RSQU5TRk9STSc6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgMTYgOyBpKyspIHRoaXMuX21lc2hUcmFuc2Zvcm1baV0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ET01SZW5kZXJlci5zZXRNYXRyaXgodGhpcy5fbWVzaFRyYW5zZm9ybSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5XZWJHTFJlbmRlcmVyKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLldlYkdMUmVuZGVyZXIuc2V0Q3V0b3V0VW5pZm9ybShwYXRoLCAndV90cmFuc2Zvcm0nLCB0aGlzLl9tZXNoVHJhbnNmb3JtKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdDSEFOR0VfU0laRSc6XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuRE9NUmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5XZWJHTFJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hTaXplWzBdID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hTaXplWzFdID0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLldlYkdMUmVuZGVyZXIuc2V0Q3V0b3V0VW5pZm9ybShwYXRoLCAndV9zaXplJywgdGhpcy5fbWVzaFNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQ0hBTkdFX1BST1BFUlRZJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLldlYkdMUmVuZGVyZXIuZ2V0T3JTZXRDdXRvdXQocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ET01SZW5kZXJlci5zZXRQcm9wZXJ0eShjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLCBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQ0hBTkdFX0NPTlRFTlQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLldlYkdMUmVuZGVyZXIpIHRoaXMuV2ViR0xSZW5kZXJlci5nZXRPclNldEN1dG91dChwYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkRPTVJlbmRlcmVyLnNldENvbnRlbnQoY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0NIQU5HRV9BVFRSSUJVVEUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLldlYkdMUmVuZGVyZXIpIHRoaXMuV2ViR0xSZW5kZXJlci5nZXRPclNldEN1dG91dChwYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkRPTVJlbmRlcmVyLnNldEF0dHJpYnV0ZShjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLCBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQUREX0NMQVNTJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLldlYkdMUmVuZGVyZXIuZ2V0T3JTZXRDdXRvdXQocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ET01SZW5kZXJlci5hZGRDbGFzcyhjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUkVNT1ZFX0NMQVNTJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLldlYkdMUmVuZGVyZXIuZ2V0T3JTZXRDdXRvdXQocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ET01SZW5kZXJlci5yZW1vdmVDbGFzcyhjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnU1VCU0NSSUJFJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLldlYkdMUmVuZGVyZXIuZ2V0T3JTZXRDdXRvdXQocGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ET01SZW5kZXJlci5zdWJzY3JpYmUoY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXSwgY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0dMX1NFVF9EUkFXX09QVElPTlMnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLmluaXRXZWJHTCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuV2ViR0xSZW5kZXJlci5zZXRNZXNoT3B0aW9ucyhwYXRoLCBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnR0xfQU1CSUVOVF9MSUdIVCc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLldlYkdMUmVuZGVyZXIpIHRoaXMuaW5pdFdlYkdMKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5XZWJHTFJlbmRlcmVyLnNldEFtYmllbnRMaWdodENvbG9yKFxuICAgICAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnR0xfTElHSFRfUE9TSVRJT04nOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLmluaXRXZWJHTCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuV2ViR0xSZW5kZXJlci5zZXRMaWdodFBvc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnR0xfTElHSFRfQ09MT1InOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLmluaXRXZWJHTCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuV2ViR0xSZW5kZXJlci5zZXRMaWdodENvbG9yKFxuICAgICAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnTUFURVJJQUxfSU5QVVQnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLmluaXRXZWJHTCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuV2ViR0xSZW5kZXJlci5oYW5kbGVNYXRlcmlhbElucHV0KFxuICAgICAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnR0xfU0VUX0dFT01FVFJZJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuV2ViR0xSZW5kZXJlcikgdGhpcy5pbml0V2ViR0woKTtcbiAgICAgICAgICAgICAgICB0aGlzLldlYkdMUmVuZGVyZXIuc2V0R2VvbWV0cnkoXG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl0sXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl0sXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdHTF9VTklGT1JNUyc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLldlYkdMUmVuZGVyZXIpIHRoaXMuaW5pdFdlYkdMKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5XZWJHTFJlbmRlcmVyLnNldE1lc2hVbmlmb3JtKFxuICAgICAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnR0xfQlVGRkVSX0RBVEEnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5XZWJHTFJlbmRlcmVyKSB0aGlzLmluaXRXZWJHTCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuV2ViR0xSZW5kZXJlci5idWZmZXJEYXRhKFxuICAgICAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnR0xfQ1VUT1VUX1NUQVRFJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuV2ViR0xSZW5kZXJlcikgdGhpcy5pbml0V2ViR0woKTtcbiAgICAgICAgICAgICAgICB0aGlzLldlYkdMUmVuZGVyZXIuc2V0Q3V0b3V0U3RhdGUocGF0aCwgY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0dMX01FU0hfVklTSUJJTElUWSc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLldlYkdMUmVuZGVyZXIpIHRoaXMuaW5pdFdlYkdMKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5XZWJHTFJlbmRlcmVyLnNldE1lc2hWaXNpYmlsaXR5KHBhdGgsIGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdHTF9SRU1PVkVfTUVTSCc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLldlYkdMUmVuZGVyZXIpIHRoaXMuaW5pdFdlYkdMKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5XZWJHTFJlbmRlcmVyLnJlbW92ZU1lc2gocGF0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BJTkhPTEVfUFJPSkVDVElPTic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUucHJvamVjdGlvblR5cGUgPSBDYW1lcmEuUElOSE9MRV9QUk9KRUNUSU9OO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnBlcnNwZWN0aXZlVHJhbnNmb3JtWzExXSA9IC0xIC8gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnBlcnNwZWN0aXZlRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdPUlRIT0dSQVBISUNfUFJPSkVDVElPTic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUucHJvamVjdGlvblR5cGUgPSBDYW1lcmEuT1JUSE9HUkFQSElDX1BST0pFQ1RJT047XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMTFdID0gMDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnBlcnNwZWN0aXZlRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdDSEFOR0VfVklFV19UUkFOU0ZPUk0nOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnZpZXdUcmFuc2Zvcm1bMF0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnZpZXdUcmFuc2Zvcm1bMV0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnZpZXdUcmFuc2Zvcm1bMl0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnZpZXdUcmFuc2Zvcm1bM10gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVs0XSA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVs1XSA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVs2XSA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVs3XSA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdGF0ZS52aWV3VHJhbnNmb3JtWzhdID0gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdGF0ZS52aWV3VHJhbnNmb3JtWzldID0gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdGF0ZS52aWV3VHJhbnNmb3JtWzEwXSA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVsxMV0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVsxMl0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN0YXRlLnZpZXdUcmFuc2Zvcm1bMTNdID0gY29tbWFuZHNbKytsb2NhbEl0ZXJhdG9yXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdGF0ZS52aWV3VHJhbnNmb3JtWzE0XSA9IGNvbW1hbmRzWysrbG9jYWxJdGVyYXRvcl07XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld1RyYW5zZm9ybVsxNV0gPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhdGUudmlld0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnV0lUSCc6IHJldHVybiBsb2NhbEl0ZXJhdG9yIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbW1hbmQgPSBjb21tYW5kc1srK2xvY2FsSXRlcmF0b3JdO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbEl0ZXJhdG9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSBVSU1hbmFnZXIgaXMgYmVpbmcgdXBkYXRlZCBieSBhbiBFbmdpbmUgYnkgY29uc2VjdXRpdmVseSBjYWxsaW5nIGl0c1xuICogYHVwZGF0ZWAgbWV0aG9kLiBJdCBjYW4gZWl0aGVyIG1hbmFnZSBhIHJlYWwgV2ViLVdvcmtlciBvciB0aGUgZ2xvYmFsXG4gKiBGYW1vdXNFbmdpbmUgY29yZSBzaW5nbGV0b24uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBjb21wb3NpdG9yID0gbmV3IENvbXBvc2l0b3IoKTtcbiAqIHZhciBlbmdpbmUgPSBuZXcgRW5naW5lKCk7XG4gKlxuICogLy8gVXNpbmcgYSBXZWIgV29ya2VyXG4gKiB2YXIgd29ya2VyID0gbmV3IFdvcmtlcignd29ya2VyLmJ1bmRsZS5qcycpO1xuICogdmFyIHRocmVhZG1hbmdlciA9IG5ldyBVSU1hbmFnZXIod29ya2VyLCBjb21wb3NpdG9yLCBlbmdpbmUpO1xuICpcbiAqIC8vIFdpdGhvdXQgdXNpbmcgYSBXZWIgV29ya2VyXG4gKiB2YXIgdGhyZWFkbWFuZ2VyID0gbmV3IFVJTWFuYWdlcihGYW1vdXMsIGNvbXBvc2l0b3IsIGVuZ2luZSk7XG4gKlxuICogQGNsYXNzICBVSU1hbmFnZXJcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7RmFtb3VzfFdvcmtlcn0gdGhyZWFkIFRoZSB0aHJlYWQgYmVpbmcgdXNlZCB0byByZWNlaXZlIG1lc3NhZ2VzXG4gKiBmcm9tIGFuZCBwb3N0IG1lc3NhZ2VzIHRvLiBFeHBlY3RlZCB0byBleHBvc2UgYSBXZWJXb3JrZXItbGlrZSBBUEksIHdoaWNoXG4gKiBtZWFucyBwcm92aWRpbmcgYSB3YXkgdG8gbGlzdGVuIGZvciB1cGRhdGVzIGJ5IHNldHRpbmcgaXRzIGBvbm1lc3NhZ2VgXG4gKiBwcm9wZXJ0eSBhbmQgc2VuZGluZyB1cGRhdGVzIHVzaW5nIGBwb3N0TWVzc2FnZWAuXG4gKiBAcGFyYW0ge0NvbXBvc2l0b3J9IGNvbXBvc2l0b3IgYW4gaW5zdGFuY2Ugb2YgQ29tcG9zaXRvciB1c2VkIHRvIGV4dHJhY3RcbiAqIGVucXVldWVkIGRyYXcgY29tbWFuZHMgZnJvbSB0byBiZSBzZW50IHRvIHRoZSB0aHJlYWQuXG4gKiBAcGFyYW0ge1JlbmRlckxvb3B9IHJlbmRlckxvb3AgYW4gaW5zdGFuY2Ugb2YgRW5naW5lIHVzZWQgZm9yIGV4ZWN1dGluZ1xuICogdGhlIGBFTkdJTkVgIGNvbW1hbmRzIG9uLlxuICovXG5mdW5jdGlvbiBVSU1hbmFnZXIgKHRocmVhZCwgY29tcG9zaXRvciwgcmVuZGVyTG9vcCkge1xuICAgIHRoaXMuX3RocmVhZCA9IHRocmVhZDtcbiAgICB0aGlzLl9jb21wb3NpdG9yID0gY29tcG9zaXRvcjtcbiAgICB0aGlzLl9yZW5kZXJMb29wID0gcmVuZGVyTG9vcDtcblxuICAgIHRoaXMuX3JlbmRlckxvb3AudXBkYXRlKHRoaXMpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl90aHJlYWQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gZXYuZGF0YSA/IGV2LmRhdGEgOiBldjtcbiAgICAgICAgaWYgKG1lc3NhZ2VbMF0gPT09ICdFTkdJTkUnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdTVEFSVCc6XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9yZW5kZXJMb29wLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NUT1AnOlxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcmVuZGVyTG9vcC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAnVW5rbm93biBFTkdJTkUgY29tbWFuZCBcIicgKyBtZXNzYWdlWzFdICsgJ1wiJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLl9jb21wb3NpdG9yLnJlY2VpdmVDb21tYW5kcyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fdGhyZWFkLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0aHJlYWQgYmVpbmcgdXNlZCBieSB0aGUgVUlNYW5hZ2VyLlxuICogVGhpcyBjb3VsZCBlaXRoZXIgYmUgYW4gYW4gYWN0dWFsIHdlYiB3b3JrZXIgb3IgYSBgRmFtb3VzRW5naW5lYCBzaW5nbGV0b24uXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge1dvcmtlcnxGYW1vdXNFbmdpbmV9IEVpdGhlciBhIHdlYiB3b3JrZXIgb3IgYSBgRmFtb3VzRW5naW5lYCBzaW5nbGV0b24uXG4gKi9cblVJTWFuYWdlci5wcm90b3R5cGUuZ2V0VGhyZWFkID0gZnVuY3Rpb24gZ2V0VGhyZWFkKCkge1xuICAgIHJldHVybiB0aGlzLl90aHJlYWQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvbXBvc2l0b3IgYmVpbmcgdXNlZCBieSB0aGlzIFVJTWFuYWdlci5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7Q29tcG9zaXRvcn0gVGhlIGNvbXBvc2l0b3IgdXNlZCBieSB0aGUgVUlNYW5hZ2VyLlxuICovXG5VSU1hbmFnZXIucHJvdG90eXBlLmdldENvbXBvc2l0b3IgPSBmdW5jdGlvbiBnZXRDb21wb3NpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wb3NpdG9yO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbmdpbmUgYmVpbmcgdXNlZCBieSB0aGlzIFVJTWFuYWdlci5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7RW5naW5lfSBUaGUgZW5naW5lIHVzZWQgYnkgdGhlIFVJTWFuYWdlci5cbiAqL1xuVUlNYW5hZ2VyLnByb3RvdHlwZS5nZXRFbmdpbmUgPSBmdW5jdGlvbiBnZXRFbmdpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckxvb3A7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBtZXRob2QgYmVpbmcgaW52b2tlZCBieSB0aGUgRW5naW5lIG9uIGV2ZXJ5IGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLlxuICogVXNlZCBmb3IgdXBkYXRpbmcgdGhlIG5vdGlvbiBvZiB0aW1lIHdpdGhpbiB0aGUgbWFuYWdlZCB0aHJlYWQgYnkgc2VuZGluZ1xuICogYSBGUkFNRSBjb21tYW5kIGFuZCBzZW5kaW5nIG1lc3NhZ2VzIHRvXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSAge051bWJlcn0gdGltZSB1bml4IHRpbWVzdGFtcCB0byBiZSBwYXNzZWQgZG93biB0byB0aGUgd29ya2VyIGFzIGFcbiAqIEZSQU1FIGNvbW1hbmRcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cblVJTWFuYWdlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlICh0aW1lKSB7XG4gICAgdGhpcy5fdGhyZWFkLnBvc3RNZXNzYWdlKFsnRlJBTUUnLCB0aW1lXSk7XG4gICAgdmFyIHRocmVhZE1lc3NhZ2VzID0gdGhpcy5fY29tcG9zaXRvci5kcmF3Q29tbWFuZHMoKTtcbiAgICB0aGlzLl90aHJlYWQucG9zdE1lc3NhZ2UodGhyZWFkTWVzc2FnZXMpO1xuICAgIHRoaXMuX2NvbXBvc2l0b3IuY2xlYXJDb21tYW5kcygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBVSU1hbmFnZXI7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjc3MgPSAnLmZhbW91cy1kb20tcmVuZGVyZXIgeycgK1xuICAgICd3aWR0aDoxMDAlOycgK1xuICAgICdoZWlnaHQ6MTAwJTsnICtcbiAgICAndHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOycgK1xuICAgICctd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsnICtcbid9JyArXG5cbicuZmFtb3VzLWRvbS1lbGVtZW50IHsnICtcbiAgICAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAlIDAlOycgK1xuICAgICd0cmFuc2Zvcm0tb3JpZ2luOjAlIDAlOycgK1xuICAgICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6dmlzaWJsZTsnICtcbiAgICAnYmFja2ZhY2UtdmlzaWJpbGl0eTp2aXNpYmxlOycgK1xuICAgICctd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsnICtcbiAgICAndHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOycgK1xuICAgICctd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7JyArXG4gICAgJ3BvaW50ZXItZXZlbnRzOmF1dG87JyArXG4gICAgJ3otaW5kZXg6MTsnICtcbid9JyArXG5cbicuZmFtb3VzLWRvbS1lbGVtZW50LWNvbnRlbnQsJyArXG4nLmZhbW91cy1kb20tZWxlbWVudCB7JyArXG4gICAgJ3Bvc2l0aW9uOmFic29sdXRlOycgK1xuICAgICdib3gtc2l6aW5nOmJvcmRlci1ib3g7JyArXG4gICAgJy1tb3otYm94LXNpemluZzpib3JkZXItYm94OycgK1xuICAgICctd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDsnICtcbid9JyArXG5cbicuZmFtb3VzLXdlYmdsLXJlbmRlcmVyIHsnICtcbiAgICAnLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMTAwMDAwMHB4KTsnICsgIC8qIFRPRE86IEZpeCB3aGVuIFNhZmFyaSBGaXhlcyovXG4gICAgJ3RyYW5zZm9ybTogdHJhbnNsYXRlWigxMDAwMDAwcHgpJyArXG4gICAgJ3BvaW50ZXItZXZlbnRzOm5vbmU7JyArXG4gICAgJ3Bvc2l0aW9uOmFic29sdXRlOycgK1xuICAgICd6LWluZGV4OjE7JyArXG4gICAgJ3RvcDowOycgK1xuICAgICdsZWZ0OjA7JyArXG4nfSc7XG5cbnZhciBJTkpFQ1RFRCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCc7XG5cbmZ1bmN0aW9uIGluamVjdENTUygpIHtcbiAgICBpZiAoSU5KRUNURUQpIHJldHVybjtcbiAgICBJTkpFQ1RFRCA9IHRydWU7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQpIHtcbiAgICAgICAgdmFyIHNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCgpO1xuICAgICAgICBzaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIChoZWFkID8gaGVhZCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmplY3RDU1M7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBsaWdodHdlaWdodCwgZmVhdHVyZWxlc3MgRXZlbnRFbWl0dGVyLlxuICpcbiAqIEBjbGFzcyBDYWxsYmFja1N0b3JlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FsbGJhY2tTdG9yZSAoKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG59XG5cbi8qKlxuICogQWRkcyBhIGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50ICg9IGtleSkuXG4gKlxuICogQG1ldGhvZCBvblxuICogQGNoYWluYWJsZVxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gICBrZXkgICAgICAgVGhlIGV2ZW50IHR5cGUgKGUuZy4gYGNsaWNrYCkuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuZXZlciBga2V5YFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpcyBiZWluZyB0cmlnZ2VyZWQuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZGVzdHJveSAgIEEgZnVuY3Rpb24gdG8gY2FsbCBpZiB5b3Ugd2FudCB0byByZW1vdmUgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLlxuICovXG5DYWxsYmFja1N0b3JlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uIChrZXksIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNba2V5XSkgdGhpcy5fZXZlbnRzW2tleV0gPSBbXTtcbiAgICB2YXIgY2FsbGJhY2tMaXN0ID0gdGhpcy5fZXZlbnRzW2tleV07XG4gICAgY2FsbGJhY2tMaXN0LnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrTGlzdC5zcGxpY2UoY2FsbGJhY2tMaXN0LmluZGV4T2YoY2FsbGJhY2spLCAxKTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgcHJldmlvdXNseSBhZGRlZCBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAbWV0aG9kIG9mZlxuICogQGNoYWluYWJsZVxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30ga2V5ICAgICAgICAgVGhlIGV2ZW50IHR5cGUgZnJvbSB3aGljaCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkIGJlIHJlbW92ZWQuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSByZW1vdmVkIGZyb20gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyBmb3Iga2V5LlxuICogQHJldHVybiB7Q2FsbGJhY2tTdG9yZX0gdGhpc1xuICovXG5DYWxsYmFja1N0b3JlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYgKGtleSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW2tleV07XG4gICAgaWYgKGV2ZW50cykgZXZlbnRzLnNwbGljZShldmVudHMuaW5kZXhPZihjYWxsYmFjayksIDEpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIGFsbCB0aGUgcHJldmlvdXNseSBmb3IgdGhpcyBrZXkgcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQG1ldGhvZCB0cmlnZ2VyXG4gKiBAY2hhaW5hYmxlXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAga2V5ICAgICAgVGhlIGV2ZW50IHR5cGUuXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICBwYXlsb2FkICBUaGUgZXZlbnQgcGF5bG9hZCAoZXZlbnQgb2JqZWN0KS5cbiAqIEByZXR1cm4ge0NhbGxiYWNrU3RvcmV9IHRoaXNcbiAqL1xuQ2FsbGJhY2tTdG9yZS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIHRyaWdnZXIgKGtleSwgcGF5bG9hZCkge1xuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNba2V5XTtcbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxlbiA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuIDsgaSsrKSBldmVudHNbaV0ocGF5bG9hZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYWxsYmFja1N0b3JlO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICpcbiAqIEBtZXRob2QgIGNsb25lXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGIgICAgICAgT2JqZWN0IHRvIGJlIGNsb25lZC5cbiAqIEByZXR1cm4ge09iamVjdH0gYSAgICAgIENsb25lZCBvYmplY3QgKGRlZXAgZXF1YWxpdHkpLlxuICovXG52YXIgY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShiKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0gKGIgaW5zdGFuY2VvZiBBcnJheSkgPyBbXSA6IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiW2tleV0gPT09ICdvYmplY3QnICYmIGJba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChiW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBuZXcgQXJyYXkoYltrZXldLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYltrZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhW2tleV1baV0gPSBjbG9uZShiW2tleV1baV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYVtrZXldID0gY2xvbmUoYltrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGEgPSBiO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogVGFrZXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcga2V5cyBhbmQgdmFsdWVzIGFuZCByZXR1cm5zIGFuIG9iamVjdFxuICogY29tcHJpc2luZyB0d28gXCJhc3NvY2lhdGVcIiBhcnJheXMsIG9uZSB3aXRoIHRoZSBrZXlzIGFuZCB0aGUgb3RoZXJcbiAqIHdpdGggdGhlIHZhbHVlcy5cbiAqXG4gKiBAbWV0aG9kIGtleVZhbHVlc1RvQXJyYXlzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAgICAgICAgICAgICAgICAgICAgICBPYmplY3RzIHdoZXJlIHRvIGV4dHJhY3Qga2V5cyBhbmQgdmFsdWVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20uXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgcmVzdWx0XG4gKiAgICAgICAgIHtBcnJheS48U3RyaW5nPn0gcmVzdWx0LmtleXMgICAgIEtleXMgb2YgYHJlc3VsdGAsIGFzIHJldHVybmVkIGJ5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBPYmplY3Qua2V5cygpYFxuICogICAgICAgICB7QXJyYXl9ICAgICAgICAgIHJlc3VsdC52YWx1ZXMgICBWYWx1ZXMgb2YgcGFzc2VkIGluIG9iamVjdC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrZXlWYWx1ZXNUb0FycmF5cyhvYmopIHtcbiAgICB2YXIga2V5c0FycmF5ID0gW10sIHZhbHVlc0FycmF5ID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvcih2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXNBcnJheVtpXSA9IGtleTtcbiAgICAgICAgICAgIHZhbHVlc0FycmF5W2ldID0gb2JqW2tleV07XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAga2V5czoga2V5c0FycmF5LFxuICAgICAgICB2YWx1ZXM6IHZhbHVlc0FycmF5XG4gICAgfTtcbn07XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQUkVGSVhFUyA9IFsnJywgJy1tcy0nLCAnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW8tJ107XG5cbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gdXNlZCBmb3IgZGV0ZXJtaW5pbmcgdGhlIHZlbmRvciBwcmVmaXhlZCB2ZXJzaW9uIG9mIHRoZVxuICogcGFzc2VkIGluIENTUyBwcm9wZXJ0eS5cbiAqXG4gKiBWZW5kb3IgY2hlY2tzIGFyZSBiZWluZyBjb25kdWN0ZWQgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcbiAqXG4gKiAxLiAobm8gcHJlZml4KVxuICogMi4gYC1tei1gXG4gKiAzLiBgLXdlYmtpdC1gXG4gKiA0LiBgLW1vei1gXG4gKiA1LiBgLW8tYFxuICpcbiAqIEBtZXRob2QgdmVuZG9yUHJlZml4XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5ICAgICBDU1MgcHJvcGVydHkgKG5vIGNhbWVsQ2FzZSksIGUuZy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGJvcmRlci1yYWRpdXNgLlxuICogQHJldHVybiB7U3RyaW5nfSBwcmVmaXhlZCAgICBWZW5kb3IgcHJlZml4ZWQgdmVyc2lvbiBvZiBwYXNzZWQgaW4gQ1NTXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IChlLmcuIGAtd2Via2l0LWJvcmRlci1yYWRpdXNgKS5cbiAqL1xuZnVuY3Rpb24gdmVuZG9yUHJlZml4KHByb3BlcnR5KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBQUkVGSVhFUy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJlZml4ZWQgPSBQUkVGSVhFU1tpXSArIHByb3BlcnR5O1xuICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlW3ByZWZpeGVkXSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXhlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcGVydHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVuZG9yUHJlZml4O1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2VvbWV0cnlJZHMgPSAwO1xuXG4vKipcbiAqIEdlb21ldHJ5IGlzIGEgY29tcG9uZW50IHRoYXQgZGVmaW5lcyBhbmQgbWFuYWdlcyBkYXRhXG4gKiAodmVydGV4IGRhdGEgYW5kIGF0dHJpYnV0ZXMpIHRoYXQgaXMgdXNlZCB0byBkcmF3IHRvIFdlYkdMLlxuICpcbiAqIEBjbGFzcyBHZW9tZXRyeVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgaW5zdGFudGlhdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBHZW9tZXRyeShvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLkRFRkFVTFRfQlVGRkVSX1NJWkUgPSAzO1xuXG4gICAgdGhpcy5zcGVjID0ge1xuICAgICAgICBpZDogR2VvbWV0cnlJZHMrKyxcbiAgICAgICAgZHluYW1pYzogZmFsc2UsXG4gICAgICAgIHR5cGU6IHRoaXMub3B0aW9ucy50eXBlIHx8ICdUUklBTkdMRVMnLFxuICAgICAgICBidWZmZXJOYW1lczogW10sXG4gICAgICAgIGJ1ZmZlclZhbHVlczogW10sXG4gICAgICAgIGJ1ZmZlclNwYWNpbmdzOiBbXSxcbiAgICAgICAgaW52YWxpZGF0aW9uczogW11cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5idWZmZXJzKSB7XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLm9wdGlvbnMuYnVmZmVycy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOykge1xuICAgICAgICAgICAgdGhpcy5zcGVjLmJ1ZmZlck5hbWVzLnB1c2godGhpcy5vcHRpb25zLmJ1ZmZlcnNbaV0ubmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNwZWMuYnVmZmVyVmFsdWVzLnB1c2godGhpcy5vcHRpb25zLmJ1ZmZlcnNbaV0uZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnNwZWMuYnVmZmVyU3BhY2luZ3MucHVzaCh0aGlzLm9wdGlvbnMuYnVmZmVyc1tpXS5zaXplIHx8IHRoaXMuREVGQVVMVF9CVUZGRVJfU0laRSk7XG4gICAgICAgICAgICB0aGlzLnNwZWMuaW52YWxpZGF0aW9ucy5wdXNoKGkrKyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2VvbWV0cnk7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBWZWMzID0gcmVxdWlyZSgnLi4vbWF0aC9WZWMzJyk7XG52YXIgVmVjMiA9IHJlcXVpcmUoJy4uL21hdGgvVmVjMicpO1xuXG52YXIgb3V0cHV0cyA9IFtcbiAgICBuZXcgVmVjMygpLFxuICAgIG5ldyBWZWMzKCksXG4gICAgbmV3IFZlYzMoKSxcbiAgICBuZXcgVmVjMigpLFxuICAgIG5ldyBWZWMyKClcbl07XG5cbi8qKlxuICogQSBoZWxwZXIgb2JqZWN0IHVzZWQgdG8gY2FsY3VsYXRlIGJ1ZmZlcnMgZm9yIGNvbXBsaWNhdGVkIGdlb21ldHJpZXMuXG4gKiBUYWlsb3JlZCBmb3IgdGhlIFdlYkdMUmVuZGVyZXIsIHVzZWQgYnkgbW9zdCBwcmltaXRpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBjbGFzcyBHZW9tZXRyeUhlbHBlclxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xudmFyIEdlb21ldHJ5SGVscGVyID0ge307XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGl0ZXJhdGVzIHRocm91Z2ggdmVydGljYWwgYW5kIGhvcml6b250YWwgc2xpY2VzXG4gKiBiYXNlZCBvbiBpbnB1dCBkZXRhaWwsIGFuZCBnZW5lcmF0ZXMgdmVydGljZXMgYW5kIGluZGljZXMgZm9yIGVhY2hcbiAqIHN1YmRpdmlzaW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGRldGFpbFggQW1vdW50IG9mIHNsaWNlcyB0byBpdGVyYXRlIHRocm91Z2guXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGRldGFpbFkgQW1vdW50IG9mIHN0YWNrcyB0byBpdGVyYXRlIHRocm91Z2guXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZnVuYyBGdW5jdGlvbiB1c2VkIHRvIGdlbmVyYXRlIHZlcnRleCBwb3NpdGlvbnMgYXQgZWFjaCBwb2ludC5cbiAqIEBwYXJhbSAge0Jvb2xlYW59IHdyYXAgT3B0aW9uYWwgcGFyYW1ldGVyIChkZWZhdWx0OiBQaSkgZm9yIHNldHRpbmcgYSBjdXN0b20gd3JhcCByYW5nZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgZ2VuZXJhdGVkIHZlcnRpY2VzIGFuZCBpbmRpY2VzLlxuICovXG5HZW9tZXRyeUhlbHBlci5nZW5lcmF0ZVBhcmFtZXRyaWMgPSBmdW5jdGlvbiBnZW5lcmF0ZVBhcmFtZXRyaWMoZGV0YWlsWCwgZGV0YWlsWSwgZnVuYywgd3JhcCkge1xuICAgIHZhciB2ZXJ0aWNlcyA9IFtdO1xuICAgIHZhciBpO1xuICAgIHZhciB0aGV0YTtcbiAgICB2YXIgcGhpO1xuICAgIHZhciBqO1xuXG4gICAgLy8gV2UgY2FuIHdyYXAgYXJvdW5kIHNsaWdodGx5IG1vcmUgdGhhbiBvbmNlIGZvciB1diBjb29yZGluYXRlcyB0byBsb29rIGNvcnJlY3QuXG5cbiAgICB2YXIgWHJhbmdlID0gd3JhcCA/IE1hdGguUEkgKyAoTWF0aC5QSSAvIChkZXRhaWxYIC0gMSkpIDogTWF0aC5QSTtcbiAgICB2YXIgb3V0ID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGV0YWlsWCArIDE7IGkrKykge1xuICAgICAgICB0aGV0YSA9IGkgKiBYcmFuZ2UgLyBkZXRhaWxYO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgZGV0YWlsWTsgaisrKSB7XG4gICAgICAgICAgICBwaGkgPSBqICogMi4wICogWHJhbmdlIC8gZGV0YWlsWTtcbiAgICAgICAgICAgIGZ1bmModGhldGEsIHBoaSwgb3V0KTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gob3V0WzBdLCBvdXRbMV0sIG91dFsyXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaW5kaWNlcyA9IFtdLFxuICAgICAgICB2ID0gMCxcbiAgICAgICAgbmV4dDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZGV0YWlsWDsgaSsrKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBkZXRhaWxZOyBqKyspIHtcbiAgICAgICAgICAgIG5leHQgPSAoaiArIDEpICUgZGV0YWlsWTtcbiAgICAgICAgICAgIGluZGljZXMucHVzaCh2ICsgaiwgdiArIGogKyBkZXRhaWxZLCB2ICsgbmV4dCk7XG4gICAgICAgICAgICBpbmRpY2VzLnB1c2godiArIG5leHQsIHYgKyBqICsgZGV0YWlsWSwgdiArIG5leHQgKyBkZXRhaWxZKTtcbiAgICAgICAgfVxuICAgICAgICB2ICs9IGRldGFpbFk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLFxuICAgICAgICBpbmRpY2VzOiBpbmRpY2VzXG4gICAgfTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBub3JtYWxzIGJlbG9uZ2luZyB0byBlYWNoIGZhY2Ugb2YgYSBnZW9tZXRyeS5cbiAqIEFzc3VtZXMgY2xvY2t3aXNlIGRlY2xhcmF0aW9uIG9mIHZlcnRpY2VzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2ZXJ0aWNlcyBWZXJ0aWNlcyBvZiBhbGwgcG9pbnRzIG9uIHRoZSBnZW9tZXRyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IGluZGljZXMgSW5kaWNlcyBkZWNsYXJpbmcgZmFjZXMgb2YgZ2VvbWV0cnkuXG4gKiBAcGFyYW0ge0FycmF5fSBvdXQgQXJyYXkgdG8gYmUgZmlsbGVkIGFuZCByZXR1cm5lZC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gQ2FsY3VsYXRlZCBmYWNlIG5vcm1hbHMuXG4gKi9cbkdlb21ldHJ5SGVscGVyLmNvbXB1dGVOb3JtYWxzID0gZnVuY3Rpb24gY29tcHV0ZU5vcm1hbHModmVydGljZXMsIGluZGljZXMsIG91dCkge1xuICAgIHZhciBub3JtYWxzID0gb3V0IHx8IFtdO1xuICAgIHZhciBpbmRleE9uZTtcbiAgICB2YXIgaW5kZXhUd287XG4gICAgdmFyIGluZGV4VGhyZWU7XG4gICAgdmFyIG5vcm1hbDtcbiAgICB2YXIgajtcbiAgICB2YXIgbGVuID0gaW5kaWNlcy5sZW5ndGggLyAzO1xuICAgIHZhciBpO1xuICAgIHZhciB4O1xuICAgIHZhciB5O1xuICAgIHZhciB6O1xuICAgIHZhciBsZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaW5kZXhUd28gPSBpbmRpY2VzW2kqMyArIDBdICogMztcbiAgICAgICAgaW5kZXhPbmUgPSBpbmRpY2VzW2kqMyArIDFdICogMztcbiAgICAgICAgaW5kZXhUaHJlZSA9IGluZGljZXNbaSozICsgMl0gKiAzO1xuXG4gICAgICAgIG91dHB1dHNbMF0uc2V0KHZlcnRpY2VzW2luZGV4T25lXSwgdmVydGljZXNbaW5kZXhPbmUgKyAxXSwgdmVydGljZXNbaW5kZXhPbmUgKyAyXSk7XG4gICAgICAgIG91dHB1dHNbMV0uc2V0KHZlcnRpY2VzW2luZGV4VHdvXSwgdmVydGljZXNbaW5kZXhUd28gKyAxXSwgdmVydGljZXNbaW5kZXhUd28gKyAyXSk7XG4gICAgICAgIG91dHB1dHNbMl0uc2V0KHZlcnRpY2VzW2luZGV4VGhyZWVdLCB2ZXJ0aWNlc1tpbmRleFRocmVlICsgMV0sIHZlcnRpY2VzW2luZGV4VGhyZWUgKyAyXSk7XG5cbiAgICAgICAgbm9ybWFsID0gb3V0cHV0c1syXS5zdWJ0cmFjdChvdXRwdXRzWzBdKS5jcm9zcyhvdXRwdXRzWzFdLnN1YnRyYWN0KG91dHB1dHNbMF0pKS5ub3JtYWxpemUoKTtcblxuICAgICAgICBub3JtYWxzW2luZGV4T25lICsgMF0gPSAobm9ybWFsc1tpbmRleE9uZSArIDBdIHx8IDApICsgbm9ybWFsLng7XG4gICAgICAgIG5vcm1hbHNbaW5kZXhPbmUgKyAxXSA9IChub3JtYWxzW2luZGV4T25lICsgMV0gfHwgMCkgKyBub3JtYWwueTtcbiAgICAgICAgbm9ybWFsc1tpbmRleE9uZSArIDJdID0gKG5vcm1hbHNbaW5kZXhPbmUgKyAyXSB8fCAwKSArIG5vcm1hbC56O1xuXG4gICAgICAgIG5vcm1hbHNbaW5kZXhUd28gKyAwXSA9IChub3JtYWxzW2luZGV4VHdvICsgMF0gfHwgMCkgKyBub3JtYWwueDtcbiAgICAgICAgbm9ybWFsc1tpbmRleFR3byArIDFdID0gKG5vcm1hbHNbaW5kZXhUd28gKyAxXSB8fCAwKSArIG5vcm1hbC55O1xuICAgICAgICBub3JtYWxzW2luZGV4VHdvICsgMl0gPSAobm9ybWFsc1tpbmRleFR3byArIDJdIHx8IDApICsgbm9ybWFsLno7XG5cbiAgICAgICAgbm9ybWFsc1tpbmRleFRocmVlICsgMF0gPSAobm9ybWFsc1tpbmRleFRocmVlICsgMF0gfHwgMCkgKyBub3JtYWwueDtcbiAgICAgICAgbm9ybWFsc1tpbmRleFRocmVlICsgMV0gPSAobm9ybWFsc1tpbmRleFRocmVlICsgMV0gfHwgMCkgKyBub3JtYWwueTtcbiAgICAgICAgbm9ybWFsc1tpbmRleFRocmVlICsgMl0gPSAobm9ybWFsc1tpbmRleFRocmVlICsgMl0gfHwgMCkgKyBub3JtYWwuejtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbm9ybWFscy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB4ID0gbm9ybWFsc1tpXTtcbiAgICAgICAgeSA9IG5vcm1hbHNbaSsxXTtcbiAgICAgICAgeiA9IG5vcm1hbHNbaSsyXTtcbiAgICAgICAgbGVuZ3RoID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG4gICAgICAgIGZvcihqID0gMDsgajwgMzsgaisrKSB7XG4gICAgICAgICAgICBub3JtYWxzW2kral0gLz0gbGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbHM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgYWxsIGluc2VydGVkIHRyaWFuZ2xlcyBpbnRvIGZvdXIgc3ViLXRyaWFuZ2xlcy4gQWx0ZXJzIHRoZVxuICogcGFzc2VkIGluIGFycmF5cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gaW5kaWNlcyBJbmRpY2VzIGRlY2xhcmluZyBmYWNlcyBvZiBnZW9tZXRyeVxuICogQHBhcmFtIHtBcnJheX0gdmVydGljZXMgVmVydGljZXMgb2YgYWxsIHBvaW50cyBvbiB0aGUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7QXJyYXl9IHRleHR1cmVDb29yZHMgVGV4dHVyZSBjb29yZGluYXRlcyBvZiBhbGwgcG9pbnRzIG9uIHRoZSBnZW9tZXRyeVxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuR2VvbWV0cnlIZWxwZXIuc3ViZGl2aWRlID0gZnVuY3Rpb24gc3ViZGl2aWRlKGluZGljZXMsIHZlcnRpY2VzLCB0ZXh0dXJlQ29vcmRzKSB7XG4gICAgdmFyIHRyaWFuZ2xlSW5kZXggPSBpbmRpY2VzLmxlbmd0aCAvIDM7XG4gICAgdmFyIGZhY2U7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIGs7XG4gICAgdmFyIHBvcztcbiAgICB2YXIgdGV4O1xuXG4gICAgd2hpbGUgKHRyaWFuZ2xlSW5kZXgtLSkge1xuICAgICAgICBmYWNlID0gaW5kaWNlcy5zbGljZSh0cmlhbmdsZUluZGV4ICogMywgdHJpYW5nbGVJbmRleCAqIDMgKyAzKTtcblxuICAgICAgICBwb3MgPSBmYWNlLm1hcChmdW5jdGlvbih2ZXJ0SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjMyh2ZXJ0aWNlc1t2ZXJ0SW5kZXggKiAzXSwgdmVydGljZXNbdmVydEluZGV4ICogMyArIDFdLCB2ZXJ0aWNlc1t2ZXJ0SW5kZXggKiAzICsgMl0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmVydGljZXMucHVzaC5hcHBseSh2ZXJ0aWNlcywgVmVjMy5zY2FsZShWZWMzLmFkZChwb3NbMF0sIHBvc1sxXSwgb3V0cHV0c1swXSksIDAuNSwgb3V0cHV0c1sxXSkudG9BcnJheSgpKTtcbiAgICAgICAgdmVydGljZXMucHVzaC5hcHBseSh2ZXJ0aWNlcywgVmVjMy5zY2FsZShWZWMzLmFkZChwb3NbMV0sIHBvc1syXSwgb3V0cHV0c1swXSksIDAuNSwgb3V0cHV0c1sxXSkudG9BcnJheSgpKTtcbiAgICAgICAgdmVydGljZXMucHVzaC5hcHBseSh2ZXJ0aWNlcywgVmVjMy5zY2FsZShWZWMzLmFkZChwb3NbMF0sIHBvc1syXSwgb3V0cHV0c1swXSksIDAuNSwgb3V0cHV0c1sxXSkudG9BcnJheSgpKTtcblxuICAgICAgICBpZiAodGV4dHVyZUNvb3Jkcykge1xuICAgICAgICAgICAgdGV4ID0gZmFjZS5tYXAoZnVuY3Rpb24odmVydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRleHR1cmVDb29yZHNbdmVydEluZGV4ICogMl0sIHRleHR1cmVDb29yZHNbdmVydEluZGV4ICogMiArIDFdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGV4dHVyZUNvb3Jkcy5wdXNoLmFwcGx5KHRleHR1cmVDb29yZHMsIFZlYzIuc2NhbGUoVmVjMi5hZGQodGV4WzBdLCB0ZXhbMV0sIG91dHB1dHNbM10pLCAwLjUsIG91dHB1dHNbNF0pLnRvQXJyYXkoKSk7XG4gICAgICAgICAgICB0ZXh0dXJlQ29vcmRzLnB1c2guYXBwbHkodGV4dHVyZUNvb3JkcywgVmVjMi5zY2FsZShWZWMyLmFkZCh0ZXhbMV0sIHRleFsyXSwgb3V0cHV0c1szXSksIDAuNSwgb3V0cHV0c1s0XSkudG9BcnJheSgpKTtcbiAgICAgICAgICAgIHRleHR1cmVDb29yZHMucHVzaC5hcHBseSh0ZXh0dXJlQ29vcmRzLCBWZWMyLnNjYWxlKFZlYzIuYWRkKHRleFswXSwgdGV4WzJdLCBvdXRwdXRzWzNdKSwgMC41LCBvdXRwdXRzWzRdKS50b0FycmF5KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaSA9IHZlcnRpY2VzLmxlbmd0aCAtIDM7XG4gICAgICAgIGogPSBpICsgMTtcbiAgICAgICAgayA9IGkgKyAyO1xuXG4gICAgICAgIGluZGljZXMucHVzaChpLCBqLCBrKTtcbiAgICAgICAgaW5kaWNlcy5wdXNoKGZhY2VbMF0sIGksIGspO1xuICAgICAgICBpbmRpY2VzLnB1c2goaSwgZmFjZVsxXSwgaik7XG4gICAgICAgIGluZGljZXNbdHJpYW5nbGVJbmRleF0gPSBrO1xuICAgICAgICBpbmRpY2VzW3RyaWFuZ2xlSW5kZXggKyAxXSA9IGo7XG4gICAgICAgIGluZGljZXNbdHJpYW5nbGVJbmRleCArIDJdID0gZmFjZVsyXTtcbiAgICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgZHVwbGljYXRlIG9mIHZlcnRpY2VzIHRoYXQgYXJlIHNoYXJlZCBiZXR3ZWVuIGZhY2VzLlxuICogQWx0ZXJzIHRoZSBpbnB1dCB2ZXJ0ZXggYW5kIGluZGV4IGFycmF5cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmVydGljZXMgVmVydGljZXMgb2YgYWxsIHBvaW50cyBvbiB0aGUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7QXJyYXl9IGluZGljZXMgSW5kaWNlcyBkZWNsYXJpbmcgZmFjZXMgb2YgZ2VvbWV0cnlcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkdlb21ldHJ5SGVscGVyLmdldFVuaXF1ZUZhY2VzID0gZnVuY3Rpb24gZ2V0VW5pcXVlRmFjZXModmVydGljZXMsIGluZGljZXMpIHtcbiAgICB2YXIgdHJpYW5nbGVJbmRleCA9IGluZGljZXMubGVuZ3RoIC8gMyxcbiAgICAgICAgcmVnaXN0ZXJlZCA9IFtdLFxuICAgICAgICBpbmRleDtcblxuICAgIHdoaWxlICh0cmlhbmdsZUluZGV4LS0pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblxuICAgICAgICAgICAgaW5kZXggPSBpbmRpY2VzW3RyaWFuZ2xlSW5kZXggKiAzICsgaV07XG5cbiAgICAgICAgICAgIGlmIChyZWdpc3RlcmVkW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbaW5kZXggKiAzXSwgdmVydGljZXNbaW5kZXggKiAzICsgMV0sIHZlcnRpY2VzW2luZGV4ICogMyArIDJdKTtcbiAgICAgICAgICAgICAgICBpbmRpY2VzW3RyaWFuZ2xlSW5kZXggKiAzICsgaV0gPSB2ZXJ0aWNlcy5sZW5ndGggLyAzIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogRGl2aWRlcyBhbGwgaW5zZXJ0ZWQgdHJpYW5nbGVzIGludG8gZm91ciBzdWItdHJpYW5nbGVzIHdoaWxlIG1haW50YWluaW5nXG4gKiBhIHJhZGl1cyBvZiBvbmUuIEFsdGVycyB0aGUgcGFzc2VkIGluIGFycmF5cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmVydGljZXMgVmVydGljZXMgb2YgYWxsIHBvaW50cyBvbiB0aGUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7QXJyYXl9IGluZGljZXMgSW5kaWNlcyBkZWNsYXJpbmcgZmFjZXMgb2YgZ2VvbWV0cnlcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbkdlb21ldHJ5SGVscGVyLnN1YmRpdmlkZVNwaGVyb2lkID0gZnVuY3Rpb24gc3ViZGl2aWRlU3BoZXJvaWQodmVydGljZXMsIGluZGljZXMpIHtcbiAgICB2YXIgdHJpYW5nbGVJbmRleCA9IGluZGljZXMubGVuZ3RoIC8gMyxcbiAgICAgICAgYWJjLFxuICAgICAgICBmYWNlLFxuICAgICAgICBpLCBqLCBrO1xuXG4gICAgd2hpbGUgKHRyaWFuZ2xlSW5kZXgtLSkge1xuICAgICAgICBmYWNlID0gaW5kaWNlcy5zbGljZSh0cmlhbmdsZUluZGV4ICogMywgdHJpYW5nbGVJbmRleCAqIDMgKyAzKTtcbiAgICAgICAgYWJjID0gZmFjZS5tYXAoZnVuY3Rpb24odmVydEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlYzModmVydGljZXNbdmVydEluZGV4ICogM10sIHZlcnRpY2VzW3ZlcnRJbmRleCAqIDMgKyAxXSwgdmVydGljZXNbdmVydEluZGV4ICogMyArIDJdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmVydGljZXMucHVzaC5hcHBseSh2ZXJ0aWNlcywgVmVjMy5ub3JtYWxpemUoVmVjMy5hZGQoYWJjWzBdLCBhYmNbMV0sIG91dHB1dHNbMF0pLCBvdXRwdXRzWzFdKS50b0FycmF5KCkpO1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoLmFwcGx5KHZlcnRpY2VzLCBWZWMzLm5vcm1hbGl6ZShWZWMzLmFkZChhYmNbMV0sIGFiY1syXSwgb3V0cHV0c1swXSksIG91dHB1dHNbMV0pLnRvQXJyYXkoKSk7XG4gICAgICAgIHZlcnRpY2VzLnB1c2guYXBwbHkodmVydGljZXMsIFZlYzMubm9ybWFsaXplKFZlYzMuYWRkKGFiY1swXSwgYWJjWzJdLCBvdXRwdXRzWzBdKSwgb3V0cHV0c1sxXSkudG9BcnJheSgpKTtcblxuICAgICAgICBpID0gdmVydGljZXMubGVuZ3RoIC8gMyAtIDM7XG4gICAgICAgIGogPSBpICsgMTtcbiAgICAgICAgayA9IGkgKyAyO1xuXG4gICAgICAgIGluZGljZXMucHVzaChpLCBqLCBrKTtcbiAgICAgICAgaW5kaWNlcy5wdXNoKGZhY2VbMF0sIGksIGspO1xuICAgICAgICBpbmRpY2VzLnB1c2goaSwgZmFjZVsxXSwgaik7XG4gICAgICAgIGluZGljZXNbdHJpYW5nbGVJbmRleCAqIDNdID0gaztcbiAgICAgICAgaW5kaWNlc1t0cmlhbmdsZUluZGV4ICogMyArIDFdID0gajtcbiAgICAgICAgaW5kaWNlc1t0cmlhbmdsZUluZGV4ICogMyArIDJdID0gZmFjZVsyXTtcbiAgICB9XG59O1xuXG4vKipcbiAqIERpdmlkZXMgYWxsIGluc2VydGVkIHRyaWFuZ2xlcyBpbnRvIGZvdXIgc3ViLXRyaWFuZ2xlcyB3aGlsZSBtYWludGFpbmluZ1xuICogYSByYWRpdXMgb2Ygb25lLiBBbHRlcnMgdGhlIHBhc3NlZCBpbiBhcnJheXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZlcnRpY2VzIFZlcnRpY2VzIG9mIGFsbCBwb2ludHMgb24gdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge0FycmF5fSBvdXQgT3B0aW9uYWwgYXJyYXkgdG8gYmUgZmlsbGVkIHdpdGggcmVzdWx0aW5nIG5vcm1hbHMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9IE5ldyBsaXN0IG9mIGNhbGN1bGF0ZWQgbm9ybWFscy5cbiAqL1xuR2VvbWV0cnlIZWxwZXIuZ2V0U3BoZXJvaWROb3JtYWxzID0gZnVuY3Rpb24gZ2V0U3BoZXJvaWROb3JtYWxzKHZlcnRpY2VzLCBvdXQpIHtcbiAgICBvdXQgPSBvdXQgfHwgW107XG4gICAgdmFyIGxlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDM7XG4gICAgdmFyIG5vcm1hbGl6ZWQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQgPSBuZXcgVmVjMyhcbiAgICAgICAgICAgIHZlcnRpY2VzW2kgKiAzICsgMF0sXG4gICAgICAgICAgICB2ZXJ0aWNlc1tpICogMyArIDFdLFxuICAgICAgICAgICAgdmVydGljZXNbaSAqIDMgKyAyXVxuICAgICAgICApLm5vcm1hbGl6ZSgpLnRvQXJyYXkoKTtcblxuICAgICAgICBvdXRbaSAqIDMgKyAwXSA9IG5vcm1hbGl6ZWRbMF07XG4gICAgICAgIG91dFtpICogMyArIDFdID0gbm9ybWFsaXplZFsxXTtcbiAgICAgICAgb3V0W2kgKiAzICsgMl0gPSBub3JtYWxpemVkWzJdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGV4dHVyZSBjb29yZGluYXRlcyBmb3Igc3BoZXJvaWQgcHJpbWl0aXZlcyBiYXNlZCBvblxuICogaW5wdXQgdmVydGljZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZlcnRpY2VzIFZlcnRpY2VzIG9mIGFsbCBwb2ludHMgb24gdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge0FycmF5fSBvdXQgT3B0aW9uYWwgYXJyYXkgdG8gYmUgZmlsbGVkIHdpdGggcmVzdWx0aW5nIHRleHR1cmUgY29vcmRpbmF0ZXMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9IE5ldyBsaXN0IG9mIGNhbGN1bGF0ZWQgdGV4dHVyZSBjb29yZGluYXRlc1xuICovXG5HZW9tZXRyeUhlbHBlci5nZXRTcGhlcm9pZFVWID0gZnVuY3Rpb24gZ2V0U3BoZXJvaWRVVih2ZXJ0aWNlcywgb3V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGggLyAzO1xuICAgIHZhciB2ZXJ0ZXg7XG5cbiAgICB2YXIgdXYgPSBbXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2ZXJ0ZXggPSBvdXRwdXRzWzBdLnNldChcbiAgICAgICAgICAgIHZlcnRpY2VzW2kgKiAzXSxcbiAgICAgICAgICAgIHZlcnRpY2VzW2kgKiAzICsgMV0sXG4gICAgICAgICAgICB2ZXJ0aWNlc1tpICogMyArIDJdXG4gICAgICAgIClcbiAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgIC50b0FycmF5KCk7XG5cbiAgICAgICAgdXZbMF0gPSB0aGlzLmdldEF6aW11dGgodmVydGV4KSAqIDAuNSAvIE1hdGguUEkgKyAwLjU7XG4gICAgICAgIHV2WzFdID0gdGhpcy5nZXRBbHRpdHVkZSh2ZXJ0ZXgpIC8gTWF0aC5QSSArIDAuNTtcblxuICAgICAgICBvdXQucHVzaC5hcHBseShvdXQsIHV2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGFuZCBub3JtYWxpemVzIGEgbGlzdCBvZiB2ZXJ0aWNlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmVydGljZXMgVmVydGljZXMgb2YgYWxsIHBvaW50cyBvbiB0aGUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7QXJyYXl9IG91dCBPcHRpb25hbCBhcnJheSB0byBiZSBmaWxsZWQgd2l0aCByZXN1bHRpbmcgbm9ybWFsaXplZCB2ZWN0b3JzLlxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBOZXcgbGlzdCBvZiBub3JtYWxpemVkIHZlcnRpY2VzXG4gKi9cbkdlb21ldHJ5SGVscGVyLm5vcm1hbGl6ZUFsbCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUFsbCh2ZXJ0aWNlcywgb3V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgIHZhciBsZW4gPSB2ZXJ0aWNlcy5sZW5ndGggLyAzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXQsIG5ldyBWZWMzKHZlcnRpY2VzW2kgKiAzXSwgdmVydGljZXNbaSAqIDMgKyAxXSwgdmVydGljZXNbaSAqIDMgKyAyXSkubm9ybWFsaXplKCkudG9BcnJheSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemVzIGEgc2V0IG9mIHZlcnRpY2VzIHRvIG1vZGVsIHNwYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2ZXJ0aWNlcyBWZXJ0aWNlcyBvZiBhbGwgcG9pbnRzIG9uIHRoZSBnZW9tZXRyeVxuICogQHBhcmFtIHtBcnJheX0gb3V0IE9wdGlvbmFsIGFycmF5IHRvIGJlIGZpbGxlZCB3aXRoIG1vZGVsIHNwYWNlIHBvc2l0aW9uIHZlY3RvcnMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9IE91dHB1dCB2ZXJ0aWNlcy5cbiAqL1xuR2VvbWV0cnlIZWxwZXIubm9ybWFsaXplVmVydGljZXMgPSBmdW5jdGlvbiBub3JtYWxpemVWZXJ0aWNlcyh2ZXJ0aWNlcywgb3V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgIHZhciBsZW4gPSB2ZXJ0aWNlcy5sZW5ndGggLyAzO1xuICAgIHZhciB2ZWN0b3JzID0gW107XG4gICAgdmFyIG1pblg7XG4gICAgdmFyIG1heFg7XG4gICAgdmFyIG1pblk7XG4gICAgdmFyIG1heFk7XG4gICAgdmFyIG1pblo7XG4gICAgdmFyIG1heFo7XG4gICAgdmFyIHY7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdiA9IHZlY3RvcnNbaV0gPSBuZXcgVmVjMyhcbiAgICAgICAgICAgIHZlcnRpY2VzW2kgKiAzXSxcbiAgICAgICAgICAgIHZlcnRpY2VzW2kgKiAzICsgMV0sXG4gICAgICAgICAgICB2ZXJ0aWNlc1tpICogMyArIDJdXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKG1pblggPT0gbnVsbCB8fCB2LnggPCBtaW5YKSBtaW5YID0gdi54O1xuICAgICAgICBpZiAobWF4WCA9PSBudWxsIHx8IHYueCA+IG1heFgpIG1heFggPSB2Lng7XG5cbiAgICAgICAgaWYgKG1pblkgPT0gbnVsbCB8fCB2LnkgPCBtaW5ZKSBtaW5ZID0gdi55O1xuICAgICAgICBpZiAobWF4WSA9PSBudWxsIHx8IHYueSA+IG1heFkpIG1heFkgPSB2Lnk7XG5cbiAgICAgICAgaWYgKG1pblogPT0gbnVsbCB8fCB2LnogPCBtaW5aKSBtaW5aID0gdi56O1xuICAgICAgICBpZiAobWF4WiA9PSBudWxsIHx8IHYueiA+IG1heFopIG1heFogPSB2Lno7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IFZlYzMoXG4gICAgICAgIGdldFRyYW5zbGF0aW9uRmFjdG9yKG1heFgsIG1pblgpLFxuICAgICAgICBnZXRUcmFuc2xhdGlvbkZhY3RvcihtYXhZLCBtaW5ZKSxcbiAgICAgICAgZ2V0VHJhbnNsYXRpb25GYWN0b3IobWF4WiwgbWluWilcbiAgICApO1xuXG4gICAgdmFyIHNjYWxlID0gTWF0aC5taW4oXG4gICAgICAgIGdldFNjYWxlRmFjdG9yKG1heFggKyB0cmFuc2xhdGlvbi54LCBtaW5YICsgdHJhbnNsYXRpb24ueCksXG4gICAgICAgIGdldFNjYWxlRmFjdG9yKG1heFkgKyB0cmFuc2xhdGlvbi55LCBtaW5ZICsgdHJhbnNsYXRpb24ueSksXG4gICAgICAgIGdldFNjYWxlRmFjdG9yKG1heFogKyB0cmFuc2xhdGlvbi56LCBtaW5aICsgdHJhbnNsYXRpb24ueilcbiAgICApO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHZlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb3V0LnB1c2guYXBwbHkob3V0LCB2ZWN0b3JzW2ldLmFkZCh0cmFuc2xhdGlvbikuc2NhbGUoc2NhbGUpLnRvQXJyYXkoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0cmFuc2xhdGlvbiBhbW91bnQgZm9yIGEgZ2l2ZW4gYXhpcyB0byBub3JtYWxpemUgbW9kZWwgY29vcmRpbmF0ZXMuXG4gKlxuICogQG1ldGhvZFxuICogQHByaXZhdGVcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IE1heGltdW0gcG9zaXRpb24gdmFsdWUgb2YgZ2l2ZW4gYXhpcyBvbiB0aGUgbW9kZWwuXG4gKiBAcGFyYW0ge051bWJlcn0gbWluIE1pbmltdW0gcG9zaXRpb24gdmFsdWUgb2YgZ2l2ZW4gYXhpcyBvbiB0aGUgbW9kZWwuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBOdW1iZXIgYnkgd2hpY2ggdGhlIGdpdmVuIGF4aXMgc2hvdWxkIGJlIHRyYW5zbGF0ZWQgZm9yIGFsbCB2ZXJ0aWNlcy5cbiAqL1xuZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb25GYWN0b3IobWF4LCBtaW4pIHtcbiAgICByZXR1cm4gLShtaW4gKyAobWF4IC0gbWluKSAvIDIpO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgc2NhbGUgYW1vdW50IGZvciBhIGdpdmVuIGF4aXMgdG8gbm9ybWFsaXplIG1vZGVsIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBNYXhpbXVtIHNjYWxlIHZhbHVlIG9mIGdpdmVuIGF4aXMgb24gdGhlIG1vZGVsLlxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbiBNaW5pbXVtIHNjYWxlIHZhbHVlIG9mIGdpdmVuIGF4aXMgb24gdGhlIG1vZGVsLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gTnVtYmVyIGJ5IHdoaWNoIHRoZSBnaXZlbiBheGlzIHNob3VsZCBiZSBzY2FsZWQgZm9yIGFsbCB2ZXJ0aWNlcy5cbiAqL1xuZnVuY3Rpb24gZ2V0U2NhbGVGYWN0b3IobWF4LCBtaW4pIHtcbiAgICByZXR1cm4gMSAvICgobWF4IC0gbWluKSAvIDIpO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBhemltdXRoLCBvciBhbmdsZSBhYm92ZSB0aGUgWFkgcGxhbmUsIG9mIGEgZ2l2ZW4gdmVjdG9yLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2IFZlcnRleCB0byByZXRyZWl2ZSBhemltdXRoIGZyb20uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBemltdXRoIHZhbHVlIGluIHJhZGlhbnMuXG4gKi9cbkdlb21ldHJ5SGVscGVyLmdldEF6aW11dGggPSBmdW5jdGlvbiBhemltdXRoKHYpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih2WzJdLCAtdlswXSk7XG59O1xuXG4vKipcbiAqIEZpbmRzIHRoZSBhbHRpdHVkZSwgb3IgYW5nbGUgYWJvdmUgdGhlIFhaIHBsYW5lLCBvZiBhIGdpdmVuIHZlY3Rvci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdiBWZXJ0ZXggdG8gcmV0cmVpdmUgYWx0aXR1ZGUgZnJvbS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFsdGl0dWRlIHZhbHVlIGluIHJhZGlhbnMuXG4gKi9cbkdlb21ldHJ5SGVscGVyLmdldEFsdGl0dWRlID0gZnVuY3Rpb24gYWx0aXR1ZGUodikge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKC12WzFdLCBNYXRoLnNxcnQoKHZbMF0gKiB2WzBdKSArICh2WzJdICogdlsyXSkpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBsaXN0IG9mIGluZGljZXMgZnJvbSAndHJpYW5nbGUnIHRvICdsaW5lJyBmb3JtYXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGluZGljZXMgSW5kaWNlcyBvZiBhbGwgZmFjZXMgb24gdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge0FycmF5fSBvdXQgSW5kaWNlcyBvZiBhbGwgZmFjZXMgb24gdGhlIGdlb21ldHJ5XG4gKlxuICogQHJldHVybiB7QXJyYXl9IE5ldyBsaXN0IG9mIGxpbmUtZm9ybWF0dGVkIGluZGljZXNcbiAqL1xuR2VvbWV0cnlIZWxwZXIudHJpYW5nbGVzVG9MaW5lcyA9IGZ1bmN0aW9uIHRyaWFuZ2xlVG9MaW5lcyhpbmRpY2VzLCBvdXQpIHtcbiAgICB2YXIgbnVtVmVjdG9ycyA9IGluZGljZXMubGVuZ3RoIC8gMztcbiAgICBvdXQgPSBvdXQgfHwgW107XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbnVtVmVjdG9yczsgaSsrKSB7XG4gICAgICAgIG91dC5wdXNoKGluZGljZXNbaSAqIDMgKyAwXSwgaW5kaWNlc1tpICogMyArIDFdKTtcbiAgICAgICAgb3V0LnB1c2goaW5kaWNlc1tpICogMyArIDFdLCBpbmRpY2VzW2kgKiAzICsgMl0pO1xuICAgICAgICBvdXQucHVzaChpbmRpY2VzW2kgKiAzICsgMl0sIGluZGljZXNbaSAqIDMgKyAwXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyBhIHJldmVyc2Ugb3JkZXIgdHJpYW5nbGUgZm9yIGV2ZXJ5IHRyaWFuZ2xlIGluIHRoZSBtZXNoLiBBZGRzIGV4dHJhIHZlcnRpY2VzXG4gKiBhbmQgaW5kaWNlcyB0byBpbnB1dCBhcnJheXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZlcnRpY2VzIFgsIFksIFogcG9zaXRpb25zIG9mIGFsbCB2ZXJ0aWNlcyBpbiB0aGUgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7QXJyYXl9IGluZGljZXMgSW5kaWNlcyBvZiBhbGwgZmFjZXMgb24gdGhlIGdlb21ldHJ5XG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5HZW9tZXRyeUhlbHBlci5hZGRCYWNrZmFjZVRyaWFuZ2xlcyA9IGZ1bmN0aW9uIGFkZEJhY2tmYWNlVHJpYW5nbGVzKHZlcnRpY2VzLCBpbmRpY2VzKSB7XG4gICAgdmFyIG5GYWNlcyA9IGluZGljZXMubGVuZ3RoIC8gMztcblxuICAgIHZhciBtYXhJbmRleCA9IDA7XG4gICAgdmFyIGkgPSBpbmRpY2VzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSBpZiAoaW5kaWNlc1tpXSA+IG1heEluZGV4KSBtYXhJbmRleCA9IGluZGljZXNbaV07XG5cbiAgICBtYXhJbmRleCsrO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG5GYWNlczsgaSsrKSB7XG4gICAgICAgIHZhciBpbmRleE9uZSA9IGluZGljZXNbaSAqIDNdLFxuICAgICAgICAgICAgaW5kZXhUd28gPSBpbmRpY2VzW2kgKiAzICsgMV0sXG4gICAgICAgICAgICBpbmRleFRocmVlID0gaW5kaWNlc1tpICogMyArIDJdO1xuXG4gICAgICAgIGluZGljZXMucHVzaChpbmRleE9uZSArIG1heEluZGV4LCBpbmRleFRocmVlICsgbWF4SW5kZXgsIGluZGV4VHdvICsgbWF4SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIEl0ZXJhdGluZyBpbnN0ZWFkIG9mIC5zbGljZSgpIGhlcmUgdG8gYXZvaWQgbWF4IGNhbGwgc3RhY2sgaXNzdWUuXG5cbiAgICB2YXIgblZlcnRzID0gdmVydGljZXMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuVmVydHM7IGkrKykge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW2ldKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdlb21ldHJ5SGVscGVyO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2VvbWV0cnkgPSByZXF1aXJlKCcuLi9HZW9tZXRyeScpO1xudmFyIEdlb21ldHJ5SGVscGVyID0gcmVxdWlyZSgnLi4vR2VvbWV0cnlIZWxwZXInKTtcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBuZXcgc3RhdGljIGdlb21ldHJ5LCB3aGljaCBpcyBwYXNzZWRcbiAqIGN1c3RvbSBidWZmZXIgZGF0YS5cbiAqXG4gKiBAY2xhc3MgUGxhbmVcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFBhcmFtZXRlcnMgdGhhdCBhbHRlciB0aGVcbiAqIHZlcnRleCBidWZmZXJzIG9mIHRoZSBnZW5lcmF0ZWQgZ2VvbWV0cnkuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBjb25zdHJ1Y3RlZCBnZW9tZXRyeVxuICovXG5mdW5jdGlvbiBQbGFuZShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGRldGFpbFggPSBvcHRpb25zLmRldGFpbFggfHwgb3B0aW9ucy5kZXRhaWwgfHwgMTtcbiAgICB2YXIgZGV0YWlsWSA9IG9wdGlvbnMuZGV0YWlsWSB8fCBvcHRpb25zLmRldGFpbCB8fCAxO1xuXG4gICAgdmFyIHZlcnRpY2VzICAgICAgPSBbXTtcbiAgICB2YXIgdGV4dHVyZUNvb3JkcyA9IFtdO1xuICAgIHZhciBub3JtYWxzICAgICAgID0gW107XG4gICAgdmFyIGluZGljZXMgICAgICAgPSBbXTtcblxuICAgIHZhciBpO1xuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPD0gZGV0YWlsWTsgeSsrKSB7XG4gICAgICAgIHZhciB0ID0geSAvIGRldGFpbFk7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDw9IGRldGFpbFg7IHgrKykge1xuICAgICAgICAgICAgdmFyIHMgPSB4IC8gZGV0YWlsWDtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goMi4gKiAocyAtIC41KSwgMiAqICh0IC0gLjUpLCAwKTtcbiAgICAgICAgICAgIHRleHR1cmVDb29yZHMucHVzaChzLCAxIC0gdCk7XG4gICAgICAgICAgICBpZiAoeCA8IGRldGFpbFggJiYgeSA8IGRldGFpbFkpIHtcbiAgICAgICAgICAgICAgICBpID0geCArIHkgKiAoZGV0YWlsWCArIDEpO1xuICAgICAgICAgICAgICAgIGluZGljZXMucHVzaChpLCBpICsgMSwgaSArIGRldGFpbFggKyAxKTtcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnB1c2goaSArIGRldGFpbFggKyAxLCBpICsgMSwgaSArIGRldGFpbFggKyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmJhY2tmYWNlICE9PSBmYWxzZSkge1xuICAgICAgICBHZW9tZXRyeUhlbHBlci5hZGRCYWNrZmFjZVRyaWFuZ2xlcyh2ZXJ0aWNlcywgaW5kaWNlcyk7XG5cbiAgICAgICAgLy8gZHVwbGljYXRlIHRleHR1cmUgY29vcmRpbmF0ZXMgYXMgd2VsbFxuXG4gICAgICAgIHZhciBsZW4gPSB0ZXh0dXJlQ29vcmRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB0ZXh0dXJlQ29vcmRzLnB1c2godGV4dHVyZUNvb3Jkc1tpXSk7XG4gICAgfVxuXG4gICAgbm9ybWFscyA9IEdlb21ldHJ5SGVscGVyLmNvbXB1dGVOb3JtYWxzKHZlcnRpY2VzLCBpbmRpY2VzKTtcblxuICAgIHJldHVybiBuZXcgR2VvbWV0cnkoe1xuICAgICAgICBidWZmZXJzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdhX3BvcycsIGRhdGE6IHZlcnRpY2VzIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdhX3RleENvb3JkJywgZGF0YTogdGV4dHVyZUNvb3Jkcywgc2l6ZTogMiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYV9ub3JtYWxzJywgZGF0YTogbm9ybWFscyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnaW5kaWNlcycsIGRhdGE6IGluZGljZXMsIHNpemU6IDEgfVxuICAgICAgICBdXG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxhbmU7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQnVmZmVyIGlzIGEgcHJpdmF0ZSBjbGFzcyB0aGF0IHdyYXBzIHRoZSB2ZXJ0ZXggZGF0YSB0aGF0IGRlZmluZXNcbiAqIHRoZSB0aGUgcG9pbnRzIG9mIHRoZSB0cmlhbmdsZXMgdGhhdCB3ZWJnbCBkcmF3cy4gRWFjaCBidWZmZXJcbiAqIG1hcHMgdG8gb25lIGF0dHJpYnV0ZSBvZiBhIG1lc2guXG4gKlxuICogQGNsYXNzIEJ1ZmZlclxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHRhcmdldCBUaGUgYmluZCB0YXJnZXQgb2YgdGhlIGJ1ZmZlciB0byB1cGRhdGU6IEFSUkFZX0JVRkZFUiBvciBFTEVNRU5UX0FSUkFZX0JVRkZFUlxuICogQHBhcmFtIHtPYmplY3R9IHR5cGUgQXJyYXkgdHlwZSB0byBiZSB1c2VkIGluIGNhbGxzIHRvIGdsLmJ1ZmZlckRhdGEuXG4gKiBAcGFyYW0ge1dlYkdMQ29udGV4dH0gZ2wgVGhlIFdlYkdMIGNvbnRleHQgdGhhdCB0aGUgYnVmZmVyIGlzIGhvc3RlZCBieS5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBCdWZmZXIodGFyZ2V0LCB0eXBlLCBnbCkge1xuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuZ2wgPSBnbDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgV2ViR0wgYnVmZmVyIGlmIG9uZSBkb2VzIG5vdCB5ZXQgZXhpc3QgYW5kIGJpbmRzIHRoZSBidWZmZXIgdG9cbiAqIHRvIHRoZSBjb250ZXh0LiBSdW5zIGJ1ZmZlckRhdGEgd2l0aCBhcHByb3ByaWF0ZSBkYXRhLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5CdWZmZXIucHJvdG90eXBlLnN1YkRhdGEgPSBmdW5jdGlvbiBzdWJEYXRhKCkge1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgdmFyIGRhdGEgPSBbXTtcblxuICAgIC8vIHRvIHByZXZlbnQgYWdhaW5zdCBtYXhpbXVtIGNhbGwtc3RhY2sgaXNzdWUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGNodW5rID0gMTAwMDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpICs9IGNodW5rKVxuICAgICAgICBkYXRhID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShkYXRhLCB0aGlzLmRhdGEuc2xpY2UoaSwgaSArIGNodW5rKSk7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuYnVmZmVyIHx8IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIodGhpcy50YXJnZXQsIHRoaXMuYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKHRoaXMudGFyZ2V0LCBuZXcgdGhpcy50eXBlKGRhdGEpLCBnbC5TVEFUSUNfRFJBVyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcjtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIElORElDRVMgPSAnaW5kaWNlcyc7XG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCcuL0J1ZmZlcicpO1xuXG4vKipcbiAqIEJ1ZmZlclJlZ2lzdHJ5IGlzIGEgY2xhc3MgdGhhdCBtYW5hZ2VzIGFsbG9jYXRpb24gb2YgYnVmZmVycyB0b1xuICogaW5wdXQgZ2VvbWV0cmllcy5cbiAqXG4gKiBAY2xhc3MgQnVmZmVyUmVnaXN0cnlcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7V2ViR0xDb250ZXh0fSBjb250ZXh0IFdlYkdMIGRyYXdpbmcgY29udGV4dCB0byBiZSBwYXNzZWQgdG8gYnVmZmVycy5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBCdWZmZXJSZWdpc3RyeShjb250ZXh0KSB7XG4gICAgdGhpcy5nbCA9IGNvbnRleHQ7XG5cbiAgICB0aGlzLnJlZ2lzdHJ5ID0ge307XG4gICAgdGhpcy5fZHluYW1pY0J1ZmZlcnMgPSBbXTtcbiAgICB0aGlzLl9zdGF0aWNCdWZmZXJzID0gW107XG5cbiAgICB0aGlzLl9hcnJheUJ1ZmZlck1heCA9IDMwMDAwO1xuICAgIHRoaXMuX2VsZW1lbnRCdWZmZXJNYXggPSAzMDAwMDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbmQgZmlsbHMgYWxsIHRoZSB2ZXJ0ZXggZGF0YSBpbnRvIHdlYmdsIGJ1ZmZlcnMuICBXaWxsIHJldXNlIGJ1ZmZlcnMgaWZcbiAqIHBvc3NpYmxlLiAgUG9wdWxhdGVzIHJlZ2lzdHJ5IHdpdGggdGhlIG5hbWUgb2YgdGhlIGJ1ZmZlciwgdGhlIFdlYkdMIGJ1ZmZlclxuICogb2JqZWN0LCBzcGFjaW5nIG9mIHRoZSBhdHRyaWJ1dGUsIHRoZSBhdHRyaWJ1dGUncyBvZmZzZXQgd2l0aGluIHRoZSBidWZmZXIsXG4gKiBhbmQgZmluYWxseSB0aGUgbGVuZ3RoIG9mIHRoZSBidWZmZXIuICBUaGlzIGluZm9ybWF0aW9uIGlzIGxhdGVyIGFjY2Vzc2VkIGJ5XG4gKiB0aGUgcm9vdCB0byBkcmF3IHRoZSBidWZmZXJzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZ2VvbWV0cnlJZCBJZCBvZiB0aGUgZ2VvbWV0cnkgaW5zdGFuY2UgdGhhdCBob2xkcyB0aGUgYnVmZmVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIEtleSBvZiB0aGUgaW5wdXQgYnVmZmVyIGluIHRoZSBnZW9tZXRyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEZsYXQgYXJyYXkgY29udGFpbmluZyBpbnB1dCBkYXRhIGZvciBidWZmZXIuXG4gKiBAcGFyYW0ge051bWJlcn0gc3BhY2luZyBUaGUgc3BhY2luZywgb3IgaXRlbVNpemUsIG9mIHRoZSBpbnB1dCBidWZmZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGR5bmFtaWMgQm9vbGVhbiBkZW5vdGluZyB3aGV0aGVyIGEgZ2VvbWV0cnkgaXMgZHluYW1pYyBvciBzdGF0aWMuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuQnVmZmVyUmVnaXN0cnkucHJvdG90eXBlLmFsbG9jYXRlID0gZnVuY3Rpb24gYWxsb2NhdGUoZ2VvbWV0cnlJZCwgbmFtZSwgdmFsdWUsIHNwYWNpbmcsIGR5bmFtaWMpIHtcbiAgICB2YXIgdmVydGV4QnVmZmVycyA9IHRoaXMucmVnaXN0cnlbZ2VvbWV0cnlJZF0gfHwgKHRoaXMucmVnaXN0cnlbZ2VvbWV0cnlJZF0gPSB7IGtleXM6IFtdLCB2YWx1ZXM6IFtdLCBzcGFjaW5nOiBbXSwgb2Zmc2V0OiBbXSwgbGVuZ3RoOiBbXSB9KTtcblxuICAgIHZhciBqID0gdmVydGV4QnVmZmVycy5rZXlzLmluZGV4T2YobmFtZSk7XG4gICAgdmFyIGlzSW5kZXggPSBuYW1lID09PSBJTkRJQ0VTO1xuICAgIHZhciBidWZmZXJGb3VuZCA9IGZhbHNlO1xuICAgIHZhciBuZXdPZmZzZXQ7XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgdmFyIGxlbmd0aDtcbiAgICB2YXIgYnVmZmVyO1xuICAgIHZhciBrO1xuXG4gICAgaWYgKGogPT09IC0xKSB7XG4gICAgICAgIGogPSB2ZXJ0ZXhCdWZmZXJzLmtleXMubGVuZ3RoO1xuICAgICAgICBsZW5ndGggPSBpc0luZGV4ID8gdmFsdWUubGVuZ3RoIDogTWF0aC5mbG9vcih2YWx1ZS5sZW5ndGggLyBzcGFjaW5nKTtcblxuICAgICAgICBpZiAoIWR5bmFtaWMpIHtcblxuICAgICAgICAgICAgLy8gVXNlIGEgcHJldmlvdXNseSBjcmVhdGVkIGJ1ZmZlciBpZiBhdmFpbGFibGUuXG5cbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCB0aGlzLl9zdGF0aWNCdWZmZXJzLmxlbmd0aDsgaysrKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNJbmRleCA9PT0gdGhpcy5fc3RhdGljQnVmZmVyc1trXS5pc0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld09mZnNldCA9IHRoaXMuX3N0YXRpY0J1ZmZlcnNba10ub2Zmc2V0ICsgdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKCFpc0luZGV4ICYmIG5ld09mZnNldCA8IHRoaXMuX2FycmF5QnVmZmVyTWF4KSB8fCAoaXNJbmRleCAmJiBuZXdPZmZzZXQgPCB0aGlzLl9lbGVtZW50QnVmZmVyTWF4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gdGhpcy5fc3RhdGljQnVmZmVyc1trXS5idWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9zdGF0aWNCdWZmZXJzW2tdLm9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRpY0J1ZmZlcnNba10ub2Zmc2V0ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc3RhdGljIGJ1ZmZlciBpbiBub25lIHdlcmUgZm91bmQuXG5cbiAgICAgICAgICAgIGlmICghYnVmZmVyRm91bmQpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBuZXcgQnVmZmVyKFxuICAgICAgICAgICAgICAgICAgICBpc0luZGV4ID8gdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiA6IHRoaXMuZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgICAgICAgICAgICAgICBpc0luZGV4ID8gVWludDE2QXJyYXkgOiBGbG9hdDMyQXJyYXksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGljQnVmZmVycy5wdXNoKHsgYnVmZmVyOiBidWZmZXIsIG9mZnNldDogdmFsdWUubGVuZ3RoLCBpc0luZGV4OiBpc0luZGV4IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBGb3IgZHluYW1pYyBnZW9tZXRyaWVzLCBhbHdheXMgY3JlYXRlIG5ldyBidWZmZXIuXG5cbiAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBCdWZmZXIoXG4gICAgICAgICAgICAgICAgaXNJbmRleCA/IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIgOiB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgICAgICAgICAgICBpc0luZGV4ID8gVWludDE2QXJyYXkgOiBGbG9hdDMyQXJyYXksXG4gICAgICAgICAgICAgICAgdGhpcy5nbFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5fZHluYW1pY0J1ZmZlcnMucHVzaCh7IGJ1ZmZlcjogYnVmZmVyLCBvZmZzZXQ6IHZhbHVlLmxlbmd0aCwgaXNJbmRleDogaXNJbmRleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVnaXN0cnkgZm9yIHRoZSBzcGVjIHdpdGggYnVmZmVyIGluZm9ybWF0aW9uLlxuXG4gICAgICAgIHZlcnRleEJ1ZmZlcnMua2V5cy5wdXNoKG5hbWUpO1xuICAgICAgICB2ZXJ0ZXhCdWZmZXJzLnZhbHVlcy5wdXNoKGJ1ZmZlcik7XG4gICAgICAgIHZlcnRleEJ1ZmZlcnMuc3BhY2luZy5wdXNoKHNwYWNpbmcpO1xuICAgICAgICB2ZXJ0ZXhCdWZmZXJzLm9mZnNldC5wdXNoKG9mZnNldCk7XG4gICAgICAgIHZlcnRleEJ1ZmZlcnMubGVuZ3RoLnB1c2gobGVuZ3RoKTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoO1xuICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB2ZXJ0ZXhCdWZmZXJzLnZhbHVlc1tqXS5kYXRhW29mZnNldCArIGtdID0gdmFsdWVba107XG4gICAgfVxuICAgIHZlcnRleEJ1ZmZlcnMudmFsdWVzW2pdLnN1YkRhdGEoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyUmVnaXN0cnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogVGFrZXMgdGhlIG9yaWdpbmFsIHJlbmRlcmluZyBjb250ZXh0cycgY29tcGlsZXIgZnVuY3Rpb25cbiAqIGFuZCBhdWdtZW50cyBpdCB3aXRoIGFkZGVkIGZ1bmN0aW9uYWxpdHkgZm9yIHBhcnNpbmcgYW5kXG4gKiBkaXNwbGF5aW5nIGVycm9ycy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBdWdtZW50ZWQgZnVuY3Rpb25cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEZWJ1ZygpIHtcbiAgICByZXR1cm4gX2F1Z21lbnRGdW5jdGlvbihcbiAgICAgICAgdGhpcy5nbC5jb21waWxlU2hhZGVyLFxuICAgICAgICBmdW5jdGlvbihzaGFkZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSB0aGlzLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gdGhpcy5nZXRTaGFkZXJTb3VyY2Uoc2hhZGVyKTtcbiAgICAgICAgICAgICAgICBfcHJvY2Vzc0Vycm9ycyhlcnJvcnMsIHNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xufTtcblxuLy8gVGFrZXMgYSBmdW5jdGlvbiwga2VlcHMgdGhlIHJlZmVyZW5jZSBhbmQgcmVwbGFjZXMgaXQgYnkgYSBjbG9zdXJlIHRoYXRcbi8vIGV4ZWN1dGVzIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBhbmQgdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuZnVuY3Rpb24gX2F1Z21lbnRGdW5jdGlvbihmdW5jLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlcyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xufVxuXG4vLyBQYXJzZXMgZXJyb3JzIGFuZCBmYWlsZWQgc291cmNlIGNvZGUgZnJvbSBzaGFkZXJzIGluIG9yZGVyXG4vLyB0byBidWlsZCBkaXNwbGF5YWJsZSBlcnJvciBibG9ja3MuXG4vLyBJbnNwaXJlZCBieSBKYXVtZSBTYW5jaGV6IEVsaWFzLlxuZnVuY3Rpb24gX3Byb2Nlc3NFcnJvcnMoZXJyb3JzLCBzb3VyY2UpIHtcblxuICAgIHZhciBjc3MgPSAnYm9keSxodG1se2JhY2tncm91bmQ6I2UzZTNlMztmb250LWZhbWlseTptb25hY28sbW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB4O2xpbmUtaGVpZ2h0OjEuN2VtfScgK1xuICAgICAgICAgICAgICAnI3NoYWRlclJlcG9ydHtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2NvbG9yOicgK1xuICAgICAgICAgICAgICAnIzIyMjtwYWRkaW5nOjE1cHg7d2hpdGUtc3BhY2U6bm9ybWFsO2xpc3Qtc3R5bGUtdHlwZTpub25lO21hcmdpbjo1MHB4IGF1dG87bWF4LXdpZHRoOjEyMDBweH0nICtcbiAgICAgICAgICAgICAgJyNzaGFkZXJSZXBvcnQgbGl7YmFja2dyb3VuZC1jb2xvcjojZmZmO21hcmdpbjoxM3B4IDA7Ym94LXNoYWRvdzowIDFweCAycHggcmdiYSgwLDAsMCwuMTUpOycgK1xuICAgICAgICAgICAgICAncGFkZGluZzoyMHB4IDMwcHg7Ym9yZGVyLXJhZGl1czoycHg7Ym9yZGVyLWxlZnQ6MjBweCBzb2xpZCAjZTAxMTExfXNwYW57Y29sb3I6I2UwMTExMTsnICtcbiAgICAgICAgICAgICAgJ3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7Zm9udC13ZWlnaHQ6NzAwfSNzaGFkZXJSZXBvcnQgbGkgcHtwYWRkaW5nOjA7bWFyZ2luOjB9JyArXG4gICAgICAgICAgICAgICcjc2hhZGVyUmVwb3J0IGxpOm50aC1jaGlsZChldmVuKXtiYWNrZ3JvdW5kLWNvbG9yOiNmNGY0ZjR9JyArXG4gICAgICAgICAgICAgICcjc2hhZGVyUmVwb3J0IGxpIHA6Zmlyc3QtY2hpbGR7bWFyZ2luLWJvdHRvbToxMHB4O2NvbG9yOiM2NjZ9JztcblxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbCk7XG4gICAgZWwudGV4dENvbnRlbnQgPSBjc3M7XG5cbiAgICB2YXIgcmVwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICByZXBvcnQuc2V0QXR0cmlidXRlKCdpZCcsICdzaGFkZXJSZXBvcnQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlcG9ydCk7XG5cbiAgICB2YXIgcmUgPSAvRVJST1I6IFtcXGRdKzooW1xcZF0rKTogKC4rKS9nbWk7XG4gICAgdmFyIGxpbmVzID0gc291cmNlLnNwbGl0KCdcXG4nKTtcblxuICAgIHZhciBtO1xuICAgIHdoaWxlICgobSA9IHJlLmV4ZWMoZXJyb3JzKSkgIT0gbnVsbCkge1xuICAgICAgICBpZiAobS5pbmRleCA9PT0gcmUubGFzdEluZGV4KSByZS5sYXN0SW5kZXgrKztcbiAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgdmFyIGNvZGUgPSAnPHA+PHNwYW4+RVJST1I8L3NwYW4+IFwiJyArIG1bMl0gKyAnXCIgaW4gbGluZSAnICsgbVsxXSArICc8L3A+JztcbiAgICAgICAgY29kZSArPSAnPHA+PGI+JyArIGxpbmVzW21bMV0gLSAxXS5yZXBsYWNlKC9eWyBcXHRdKy9nLCAnJykgKyAnPC9iPjwvcD4nO1xuICAgICAgICBsaS5pbm5lckhUTUwgPSBjb2RlO1xuICAgICAgICByZXBvcnQuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNsb25lID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2Nsb25lJyk7XG52YXIga2V5VmFsdWVUb0FycmF5cyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9rZXlWYWx1ZVRvQXJyYXlzJyk7XG5cbnZhciB2ZXJ0ZXhXcmFwcGVyID0gcmVxdWlyZSgnLi4vd2ViZ2wtc2hhZGVycycpLnZlcnRleDtcbnZhciBmcmFnbWVudFdyYXBwZXIgPSByZXF1aXJlKCcuLi93ZWJnbC1zaGFkZXJzJykuZnJhZ21lbnQ7XG52YXIgRGVidWcgPSByZXF1aXJlKCcuL0RlYnVnJyk7XG5cbnZhciBWRVJURVhfU0hBREVSID0gMzU2MzM7XG52YXIgRlJBR01FTlRfU0hBREVSID0gMzU2MzI7XG52YXIgaWRlbnRpdHlNYXRyaXggPSBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV07XG5cbnZhciBoZWFkZXIgPSAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuJztcblxudmFyIFRZUEVTID0ge1xuICAgIHVuZGVmaW5lZDogJ2Zsb2F0ICcsXG4gICAgMTogJ2Zsb2F0ICcsXG4gICAgMjogJ3ZlYzIgJyxcbiAgICAzOiAndmVjMyAnLFxuICAgIDQ6ICd2ZWM0ICcsXG4gICAgMTY6ICdtYXQ0ICdcbn07XG5cbnZhciBpbnB1dFR5cGVzID0ge1xuICAgIHVfYmFzZUNvbG9yOiAndmVjNCcsXG4gICAgdV9ub3JtYWxzOiAndmVydCcsXG4gICAgdV9nbG9zc2luZXNzOiAndmVjNCcsXG4gICAgdV9wb3NpdGlvbk9mZnNldDogJ3ZlcnQnXG59O1xuXG52YXIgbWFza3MgPSAge1xuICAgIHZlcnQ6IDEsXG4gICAgdmVjMzogMixcbiAgICB2ZWM0OiA0LFxuICAgIGZsb2F0OiA4XG59O1xuXG4vKipcbiAqIFVuaWZvcm0ga2V5cyBhbmQgdmFsdWVzXG4gKi9cbnZhciB1bmlmb3JtcyA9IGtleVZhbHVlVG9BcnJheXMoe1xuICAgIHVfcGVyc3BlY3RpdmU6IGlkZW50aXR5TWF0cml4LFxuICAgIHVfdmlldzogaWRlbnRpdHlNYXRyaXgsXG4gICAgdV9yZXNvbHV0aW9uOiBbMCwgMCwgMF0sXG4gICAgdV90cmFuc2Zvcm06IGlkZW50aXR5TWF0cml4LFxuICAgIHVfc2l6ZTogWzEsIDEsIDFdLFxuICAgIHVfdGltZTogMCxcbiAgICB1X29wYWNpdHk6IDEsXG4gICAgdV9tZXRhbG5lc3M6IDAsXG4gICAgdV9nbG9zc2luZXNzOiBbMCwgMCwgMCwgMF0sXG4gICAgdV9iYXNlQ29sb3I6IFsxLCAxLCAxLCAxXSxcbiAgICB1X25vcm1hbHM6IFsxLCAxLCAxXSxcbiAgICB1X3Bvc2l0aW9uT2Zmc2V0OiBbMCwgMCwgMF0sXG4gICAgdV9saWdodFBvc2l0aW9uOiBpZGVudGl0eU1hdHJpeCxcbiAgICB1X2xpZ2h0Q29sb3I6IGlkZW50aXR5TWF0cml4LFxuICAgIHVfYW1iaWVudExpZ2h0OiBbMCwgMCwgMF0sXG4gICAgdV9mbGF0U2hhZGluZzogMCxcbiAgICB1X251bUxpZ2h0czogMFxufSk7XG5cbi8qKlxuICogQXR0cmlidXRlcyBrZXlzIGFuZCB2YWx1ZXNcbiAqL1xudmFyIGF0dHJpYnV0ZXMgPSBrZXlWYWx1ZVRvQXJyYXlzKHtcbiAgICBhX3BvczogWzAsIDAsIDBdLFxuICAgIGFfdGV4Q29vcmQ6IFswLCAwXSxcbiAgICBhX25vcm1hbHM6IFswLCAwLCAwXVxufSk7XG5cbi8qKlxuICogVmFyeWluZ3Mga2V5cyBhbmQgdmFsdWVzXG4gKi9cbnZhciB2YXJ5aW5ncyA9IGtleVZhbHVlVG9BcnJheXMoe1xuICAgIHZfdGV4dHVyZUNvb3JkaW5hdGU6IFswLCAwXSxcbiAgICB2X25vcm1hbDogWzAsIDAsIDBdLFxuICAgIHZfcG9zaXRpb246IFswLCAwLCAwXSxcbiAgICB2X2V5ZVZlY3RvcjogWzAsIDAsIDBdXG59KTtcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgaGFuZGxlcyBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgV2ViR0wgc2hhZGVyIHByb2dyYW1cbiAqIHVzZWQgYnkgYSBzcGVjaWZpYyBjb250ZXh0LiAgSXQgbWFuYWdlcyBjcmVhdGlvbiBvZiB0aGUgc2hhZGVyIHByb2dyYW1cbiAqIGFuZCB0aGUgYXR0YWNoZWQgdmVydGV4IGFuZCBmcmFnbWVudCBzaGFkZXJzLiAgSXQgaXMgYWxzbyBpbiBjaGFyZ2Ugb2ZcbiAqIHBhc3NpbmcgYWxsIHVuaWZvcm1zIHRvIHRoZSBXZWJHTENvbnRleHQuXG4gKlxuICogQGNsYXNzIFByb2dyYW1cbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7V2ViR0xfQ29udGV4dH0gZ2wgQ29udGV4dCB0byBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgc2hhZGVyIHByb2dyYW1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFByb2dyYW0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIFByb2dyYW0oZ2wsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmdsID0gZ2w7XG4gICAgdGhpcy50ZXh0dXJlU2xvdHMgPSAxO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLnJlZ2lzdGVyZWRNYXRlcmlhbHMgPSB7fTtcbiAgICB0aGlzLmZsYWdnZWRVbmlmb3JtcyA9IFtdO1xuICAgIHRoaXMuY2FjaGVkVW5pZm9ybXMgID0ge307XG4gICAgdGhpcy51bmlmb3JtVHlwZXMgPSBbXTtcblxuICAgIHRoaXMuZGVmaW5pdGlvblZlYzQgPSBbXTtcbiAgICB0aGlzLmRlZmluaXRpb25WZWMzID0gW107XG4gICAgdGhpcy5kZWZpbml0aW9uRmxvYXQgPSBbXTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uVmVjMyA9IFtdO1xuICAgIHRoaXMuYXBwbGljYXRpb25WZWM0ID0gW107XG4gICAgdGhpcy5hcHBsaWNhdGlvbkZsb2F0ID0gW107XG4gICAgdGhpcy5hcHBsaWNhdGlvblZlcnQgPSBbXTtcbiAgICB0aGlzLmRlZmluaXRpb25WZXJ0ID0gW107XG5cbiAgICB0aGlzLnJlc2V0UHJvZ3JhbSgpO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIG1hdGVyaWFsIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCB0b1xuICogdGhlIHNoYWRlciBwcm9ncmFtLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRhcmdldCBpbnB1dCBvZiBtYXRlcmlhbC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXRlcmlhbCBDb21waWxlZCBtYXRlcmlhbCBvYmplY3QgYmVpbmcgdmVyaWZpZWQuXG4gKlxuICogQHJldHVybiB7UHJvZ3JhbX0gdGhpcyBDdXJyZW50IHByb2dyYW0uXG4gKi9cblByb2dyYW0ucHJvdG90eXBlLnJlZ2lzdGVyTWF0ZXJpYWwgPSBmdW5jdGlvbiByZWdpc3Rlck1hdGVyaWFsKG5hbWUsIG1hdGVyaWFsKSB7XG4gICAgdmFyIGNvbXBpbGVkID0gbWF0ZXJpYWw7XG4gICAgdmFyIHR5cGUgPSBpbnB1dFR5cGVzW25hbWVdO1xuICAgIHZhciBtYXNrID0gbWFza3NbdHlwZV07XG5cbiAgICBpZiAoKHRoaXMucmVnaXN0ZXJlZE1hdGVyaWFsc1ttYXRlcmlhbC5faWRdICYgbWFzaykgPT09IG1hc2spIHJldHVybiB0aGlzO1xuXG4gICAgdmFyIGs7XG5cbiAgICBmb3IgKGsgaW4gY29tcGlsZWQudW5pZm9ybXMpIHtcbiAgICAgICAgaWYgKHVuaWZvcm1zLmtleXMuaW5kZXhPZihrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHVuaWZvcm1zLmtleXMucHVzaChrKTtcbiAgICAgICAgICAgIHVuaWZvcm1zLnZhbHVlcy5wdXNoKGNvbXBpbGVkLnVuaWZvcm1zW2tdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoayBpbiBjb21waWxlZC52YXJ5aW5ncykge1xuICAgICAgICBpZiAodmFyeWluZ3Mua2V5cy5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgdmFyeWluZ3Mua2V5cy5wdXNoKGspO1xuICAgICAgICAgICAgdmFyeWluZ3MudmFsdWVzLnB1c2goY29tcGlsZWQudmFyeWluZ3Nba10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChrIGluIGNvbXBpbGVkLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMua2V5cy5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5rZXlzLnB1c2goayk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlcy5wdXNoKGNvbXBpbGVkLmF0dHJpYnV0ZXNba10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZWdpc3RlcmVkTWF0ZXJpYWxzW21hdGVyaWFsLl9pZF0gfD0gbWFzaztcblxuICAgIGlmICh0eXBlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIHRoaXMuZGVmaW5pdGlvbkZsb2F0LnB1c2gobWF0ZXJpYWwuZGVmaW5lcyk7XG4gICAgICAgIHRoaXMuZGVmaW5pdGlvbkZsb2F0LnB1c2goJ2Zsb2F0IGZhXycgKyBtYXRlcmlhbC5faWQgKyAnKCkge1xcbiAnICArIGNvbXBpbGVkLmdsc2wgKyAnIFxcbn0nKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbkZsb2F0LnB1c2goJ2lmIChpbnQoYWJzKElEKSkgPT0gJyArIG1hdGVyaWFsLl9pZCArICcpIHJldHVybiBmYV8nICsgbWF0ZXJpYWwuX2lkICArICcoKTsnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZlYzMnKSB7XG4gICAgICAgIHRoaXMuZGVmaW5pdGlvblZlYzMucHVzaChtYXRlcmlhbC5kZWZpbmVzKTtcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uVmVjMy5wdXNoKCd2ZWMzIGZhXycgKyBtYXRlcmlhbC5faWQgKyAnKCkge1xcbiAnICArIGNvbXBpbGVkLmdsc2wgKyAnIFxcbn0nKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvblZlYzMucHVzaCgnaWYgKGludChhYnMoSUQueCkpID09ICcgKyBtYXRlcmlhbC5faWQgKyAnKSByZXR1cm4gZmFfJyArIG1hdGVyaWFsLl9pZCArICcoKTsnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZlYzQnKSB7XG4gICAgICAgIHRoaXMuZGVmaW5pdGlvblZlYzQucHVzaChtYXRlcmlhbC5kZWZpbmVzKTtcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uVmVjNC5wdXNoKCd2ZWM0IGZhXycgKyBtYXRlcmlhbC5faWQgKyAnKCkge1xcbiAnICArIGNvbXBpbGVkLmdsc2wgKyAnIFxcbn0nKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvblZlYzQucHVzaCgnaWYgKGludChhYnMoSUQueCkpID09ICcgKyBtYXRlcmlhbC5faWQgKyAnKSByZXR1cm4gZmFfJyArIG1hdGVyaWFsLl9pZCArICcoKTsnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZlcnQnKSB7XG4gICAgICAgIHRoaXMuZGVmaW5pdGlvblZlcnQucHVzaChtYXRlcmlhbC5kZWZpbmVzKTtcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uVmVydC5wdXNoKCd2ZWMzIGZhXycgKyBtYXRlcmlhbC5faWQgKyAnKCkge1xcbiAnICArIGNvbXBpbGVkLmdsc2wgKyAnIFxcbn0nKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvblZlcnQucHVzaCgnaWYgKGludChhYnMoSUQueCkpID09ICcgKyBtYXRlcmlhbC5faWQgKyAnKSByZXR1cm4gZmFfJyArIG1hdGVyaWFsLl9pZCArICcoKTsnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXNldFByb2dyYW0oKTtcbn07XG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjYWNoZWQgdW5pZm9ybXMgYW5kIGF0dHJpYnV0ZSBsb2NhdGlvbnMuICBBc3NlbWJsZXNcbiAqIG5ldyBmcmFnbWVudCBhbmQgdmVydGV4IHNoYWRlcnMgYW5kIGJhc2VkIG9uIG1hdGVyaWFsIGZyb21cbiAqIGN1cnJlbnRseSByZWdpc3RlcmVkIG1hdGVyaWFscy4gIEF0dGFjaGVzIHNhaWQgc2hhZGVycyB0byBuZXdcbiAqIHNoYWRlciBwcm9ncmFtIGFuZCB1cG9uIHN1Y2Nlc3MgbGlua3MgcHJvZ3JhbSB0byB0aGUgV2ViR0xcbiAqIGNvbnRleHQuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEByZXR1cm4ge1Byb2dyYW19IEN1cnJlbnQgcHJvZ3JhbS5cbiAqL1xuUHJvZ3JhbS5wcm90b3R5cGUucmVzZXRQcm9ncmFtID0gZnVuY3Rpb24gcmVzZXRQcm9ncmFtKCkge1xuICAgIHZhciB2ZXJ0ZXhIZWFkZXIgPSBbaGVhZGVyXTtcbiAgICB2YXIgZnJhZ21lbnRIZWFkZXIgPSBbaGVhZGVyXTtcblxuICAgIHZhciBmcmFnbWVudFNvdXJjZTtcbiAgICB2YXIgdmVydGV4U291cmNlO1xuICAgIHZhciBwcm9ncmFtO1xuICAgIHZhciBuYW1lO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YXIgaTtcblxuICAgIHRoaXMudW5pZm9ybUxvY2F0aW9ucyAgID0gW107XG4gICAgdGhpcy5hdHRyaWJ1dGVMb2NhdGlvbnMgPSB7fTtcblxuICAgIHRoaXMudW5pZm9ybVR5cGVzID0ge307XG5cbiAgICB0aGlzLmF0dHJpYnV0ZU5hbWVzID0gY2xvbmUoYXR0cmlidXRlcy5rZXlzKTtcbiAgICB0aGlzLmF0dHJpYnV0ZVZhbHVlcyA9IGNsb25lKGF0dHJpYnV0ZXMudmFsdWVzKTtcblxuICAgIHRoaXMudmFyeWluZ05hbWVzID0gY2xvbmUodmFyeWluZ3Mua2V5cyk7XG4gICAgdGhpcy52YXJ5aW5nVmFsdWVzID0gY2xvbmUodmFyeWluZ3MudmFsdWVzKTtcblxuICAgIHRoaXMudW5pZm9ybU5hbWVzID0gY2xvbmUodW5pZm9ybXMua2V5cyk7XG4gICAgdGhpcy51bmlmb3JtVmFsdWVzID0gY2xvbmUodW5pZm9ybXMudmFsdWVzKTtcblxuICAgIHRoaXMuZmxhZ2dlZFVuaWZvcm1zID0gW107XG4gICAgdGhpcy5jYWNoZWRVbmlmb3JtcyA9IHt9O1xuXG4gICAgZnJhZ21lbnRIZWFkZXIucHVzaCgndW5pZm9ybSBzYW1wbGVyMkQgdV90ZXh0dXJlc1s3XTtcXG4nKTtcblxuICAgIGlmICh0aGlzLmFwcGxpY2F0aW9uVmVydC5sZW5ndGgpIHtcbiAgICAgICAgdmVydGV4SGVhZGVyLnB1c2goJ3VuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZXNbN107XFxuJyk7XG4gICAgfVxuXG4gICAgZm9yKGkgPSAwOyBpIDwgdGhpcy51bmlmb3JtTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHRoaXMudW5pZm9ybU5hbWVzW2ldO1xuICAgICAgICB2YWx1ZSA9IHRoaXMudW5pZm9ybVZhbHVlc1tpXTtcbiAgICAgICAgdmVydGV4SGVhZGVyLnB1c2goJ3VuaWZvcm0gJyArIFRZUEVTW3ZhbHVlLmxlbmd0aF0gKyBuYW1lICsgJztcXG4nKTtcbiAgICAgICAgZnJhZ21lbnRIZWFkZXIucHVzaCgndW5pZm9ybSAnICsgVFlQRVNbdmFsdWUubGVuZ3RoXSArIG5hbWUgKyAnO1xcbicpO1xuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IHRoaXMuYXR0cmlidXRlTmFtZXNbaV07XG4gICAgICAgIHZhbHVlID0gdGhpcy5hdHRyaWJ1dGVWYWx1ZXNbaV07XG4gICAgICAgIHZlcnRleEhlYWRlci5wdXNoKCdhdHRyaWJ1dGUgJyArIFRZUEVTW3ZhbHVlLmxlbmd0aF0gKyBuYW1lICsgJztcXG4nKTtcbiAgICB9XG5cbiAgICBmb3IoaSA9IDA7IGkgPCB0aGlzLnZhcnlpbmdOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBuYW1lID0gdGhpcy52YXJ5aW5nTmFtZXNbaV07XG4gICAgICAgIHZhbHVlID0gdGhpcy52YXJ5aW5nVmFsdWVzW2ldO1xuICAgICAgICB2ZXJ0ZXhIZWFkZXIucHVzaCgndmFyeWluZyAnICsgVFlQRVNbdmFsdWUubGVuZ3RoXSAgKyBuYW1lICsgJztcXG4nKTtcbiAgICAgICAgZnJhZ21lbnRIZWFkZXIucHVzaCgndmFyeWluZyAnICsgVFlQRVNbdmFsdWUubGVuZ3RoXSArIG5hbWUgKyAnO1xcbicpO1xuICAgIH1cblxuICAgIHZlcnRleFNvdXJjZSA9IHZlcnRleEhlYWRlci5qb2luKCcnKSArIHZlcnRleFdyYXBwZXJcbiAgICAgICAgLnJlcGxhY2UoJyN2ZXJ0X2RlZmluaXRpb25zJywgdGhpcy5kZWZpbml0aW9uVmVydC5qb2luKCdcXG4nKSlcbiAgICAgICAgLnJlcGxhY2UoJyN2ZXJ0X2FwcGxpY2F0aW9ucycsIHRoaXMuYXBwbGljYXRpb25WZXJ0LmpvaW4oJ1xcbicpKTtcblxuICAgIGZyYWdtZW50U291cmNlID0gZnJhZ21lbnRIZWFkZXIuam9pbignJykgKyBmcmFnbWVudFdyYXBwZXJcbiAgICAgICAgLnJlcGxhY2UoJyN2ZWMzX2RlZmluaXRpb25zJywgdGhpcy5kZWZpbml0aW9uVmVjMy5qb2luKCdcXG4nKSlcbiAgICAgICAgLnJlcGxhY2UoJyN2ZWMzX2FwcGxpY2F0aW9ucycsIHRoaXMuYXBwbGljYXRpb25WZWMzLmpvaW4oJ1xcbicpKVxuICAgICAgICAucmVwbGFjZSgnI3ZlYzRfZGVmaW5pdGlvbnMnLCB0aGlzLmRlZmluaXRpb25WZWM0LmpvaW4oJ1xcbicpKVxuICAgICAgICAucmVwbGFjZSgnI3ZlYzRfYXBwbGljYXRpb25zJywgdGhpcy5hcHBsaWNhdGlvblZlYzQuam9pbignXFxuJykpXG4gICAgICAgIC5yZXBsYWNlKCcjZmxvYXRfZGVmaW5pdGlvbnMnLCB0aGlzLmRlZmluaXRpb25GbG9hdC5qb2luKCdcXG4nKSlcbiAgICAgICAgLnJlcGxhY2UoJyNmbG9hdF9hcHBsaWNhdGlvbnMnLCB0aGlzLmFwcGxpY2F0aW9uRmxvYXQuam9pbignXFxuJykpO1xuXG4gICAgcHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIoXG4gICAgICAgIHByb2dyYW0sXG4gICAgICAgIHRoaXMuY29tcGlsZVNoYWRlcih0aGlzLmdsLmNyZWF0ZVNoYWRlcihWRVJURVhfU0hBREVSKSwgdmVydGV4U291cmNlKVxuICAgICk7XG5cbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihcbiAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgdGhpcy5jb21waWxlU2hhZGVyKHRoaXMuZ2wuY3JlYXRlU2hhZGVyKEZSQUdNRU5UX1NIQURFUiksIGZyYWdtZW50U291cmNlKVxuICAgICk7XG5cbiAgICB0aGlzLmdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgaWYgKCEgdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpbmsgZXJyb3I6ICcgKyB0aGlzLmdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gbnVsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VW5pZm9ybXModGhpcy51bmlmb3JtTmFtZXMsIHRoaXMudW5pZm9ybVZhbHVlcyk7XG5cbiAgICB2YXIgdGV4dHVyZUxvY2F0aW9uID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCAndV90ZXh0dXJlc1swXScpO1xuICAgIHRoaXMuZ2wudW5pZm9ybTFpdih0ZXh0dXJlTG9jYXRpb24sIFswLCAxLCAyLCAzLCA0LCA1LCA2XSk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCB1bmlmb3JtIHZhbHVlIGFnYWluc3RcbiAqIHRoZSBjYWNoZWQgdmFsdWUgc3RvcmVkIG9uIHRoZSBQcm9ncmFtIGNsYXNzLiAgVXBkYXRlcyBhbmRcbiAqIGNyZWF0ZXMgbmV3IGVudHJpZXMgaW4gdGhlIGNhY2hlIHdoZW4gbmVjZXNzYXJ5LlxuICpcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXROYW1lIEtleSBvZiB1bmlmb3JtIHNwZWMgYmVpbmcgZXZhbHVhdGVkLlxuICogQHBhcmFtIHtOdW1iZXJ8QXJyYXl9IHZhbHVlIFZhbHVlIG9mIHVuaWZvcm0gc3BlYyBiZWluZyBldmFsdWF0ZWQuXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gYm9vbGVhbiBJbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHVuaWZvcm0gYmVpbmcgc2V0IGlzIGNhY2hlZC5cbiAqL1xuUHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybUlzQ2FjaGVkID0gZnVuY3Rpb24odGFyZ2V0TmFtZSwgdmFsdWUpIHtcbiAgICBpZih0aGlzLmNhY2hlZFVuaWZvcm1zW3RhcmdldE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRVbmlmb3Jtc1t0YXJnZXROYW1lXSA9IG5ldyBGbG9hdDMyQXJyYXkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRVbmlmb3Jtc1t0YXJnZXROYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZih2YWx1ZVtpXSAhPT0gdGhpcy5jYWNoZWRVbmlmb3Jtc1t0YXJnZXROYW1lXVtpXSkge1xuICAgICAgICAgICAgICAgIGkgPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUoaS0tKSB0aGlzLmNhY2hlZFVuaWZvcm1zW3RhcmdldE5hbWVdW2ldID0gdmFsdWVbaV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWxzZSBpZiAodGhpcy5jYWNoZWRVbmlmb3Jtc1t0YXJnZXROYW1lXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5jYWNoZWRVbmlmb3Jtc1t0YXJnZXROYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYWxsIHBhc3Npbmcgb2YgdW5pZm9ybXMgdG8gV2ViR0wgZHJhd2luZyBjb250ZXh0LiAgVGhpc1xuICogZnVuY3Rpb24gd2lsbCBmaW5kIHRoZSB1bmlmb3JtIGxvY2F0aW9uIGFuZCB0aGVuLCBiYXNlZCBvblxuICogYSB0eXBlIGluZmVycmVkIGZyb20gdGhlIGphdmFzY3JpcHQgdmFsdWUgb2YgdGhlIHVuaWZvcm0sIGl0IHdpbGwgY2FsbFxuICogdGhlIGFwcHJvcHJpYXRlIGZ1bmN0aW9uIHRvIHBhc3MgdGhlIHVuaWZvcm0gdG8gV2ViR0wuICBGaW5hbGx5LFxuICogc2V0VW5pZm9ybXMgd2lsbCBpdGVyYXRlIHRocm91Z2ggdGhlIHBhc3NlZCBpbiBzaGFkZXJDaHVua3MgKGlmIGFueSlcbiAqIGFuZCBzZXQgdGhlIGFwcHJvcHJpYXRlIHVuaWZvcm1zIHRvIHNwZWNpZnkgd2hpY2ggY2h1bmtzIHRvIHVzZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge0FycmF5fSB1bmlmb3JtTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUga2V5cyBvZiBhbGwgdW5pZm9ybXMgdG8gYmUgc2V0LlxuICogQHBhcmFtIHtBcnJheX0gdW5pZm9ybVZhbHVlIEFycmF5IGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiBhbGwgdW5pZm9ybXMgdG8gYmUgc2V0LlxuICpcbiAqIEByZXR1cm4ge1Byb2dyYW19IEN1cnJlbnQgcHJvZ3JhbS5cbiAqL1xuUHJvZ3JhbS5wcm90b3R5cGUuc2V0VW5pZm9ybXMgPSBmdW5jdGlvbiAodW5pZm9ybU5hbWVzLCB1bmlmb3JtVmFsdWUpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuICAgIHZhciBsb2NhdGlvbjtcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFyIG5hbWU7XG4gICAgdmFyIGxlbjtcbiAgICB2YXIgaTtcblxuICAgIGlmICghdGhpcy5wcm9ncmFtKSByZXR1cm4gdGhpcztcblxuICAgIGxlbiA9IHVuaWZvcm1OYW1lcy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSB1bmlmb3JtTmFtZXNbaV07XG4gICAgICAgIHZhbHVlID0gdW5pZm9ybVZhbHVlW2ldO1xuXG4gICAgICAgIC8vIFJldHJlaXZlIHRoZSBjYWNoZWQgbG9jYXRpb24gb2YgdGhlIHVuaWZvcm0sXG4gICAgICAgIC8vIHJlcXVlc3RpbmcgYSBuZXcgbG9jYXRpb24gZnJvbSB0aGUgV2ViR0wgY29udGV4dFxuICAgICAgICAvLyBpZiBpdCBkb2VzIG5vdCB5ZXQgZXhpc3QuXG5cbiAgICAgICAgbG9jYXRpb24gPSB0aGlzLnVuaWZvcm1Mb2NhdGlvbnNbbmFtZV0gfHwgZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgbmFtZSk7XG4gICAgICAgIGlmICghbG9jYXRpb24pIGNvbnRpbnVlO1xuXG4gICAgICAgIHRoaXMudW5pZm9ybUxvY2F0aW9uc1tuYW1lXSA9IGxvY2F0aW9uO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhbHJlYWR5IHNldCBmb3IgdGhlXG4gICAgICAgIC8vIGdpdmVuIHVuaWZvcm0uXG5cbiAgICAgICAgaWYgKHRoaXMudW5pZm9ybUlzQ2FjaGVkKG5hbWUsIHZhbHVlKSkgY29udGludWU7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGZ1bmN0aW9uIGFuZCBwYXNzIHRoZSB1bmlmb3JtXG4gICAgICAgIC8vIHZhbHVlIHRvIFdlYkdMLlxuXG4gICAgICAgIGlmICghdGhpcy51bmlmb3JtVHlwZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybVR5cGVzW25hbWVdID0gdGhpcy5nZXRVbmlmb3JtVHlwZUZyb21WYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsIHVuaWZvcm0gc2V0dGVyIGZ1bmN0aW9uIG9uIFdlYkdMIGNvbnRleHQgd2l0aCBjb3JyZWN0IHZhbHVlXG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnVuaWZvcm1UeXBlc1tuYW1lXSkge1xuICAgICAgICAgICAgY2FzZSAndW5pZm9ybTRmdic6ICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB2YWx1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5pZm9ybTNmdic6ICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2YWx1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5pZm9ybTJmdic6ICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2YWx1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5pZm9ybTFmdic6ICBnbC51bmlmb3JtMWZ2KGxvY2F0aW9uLCB2YWx1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5pZm9ybTFmJyA6ICBnbC51bmlmb3JtMWYobG9jYXRpb24sIHZhbHVlKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1bmlmb3JtTWF0cml4M2Z2JzogZ2wudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1bmlmb3JtTWF0cml4NGZ2JzogZ2wudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW5mZXJzIHVuaWZvcm0gc2V0dGVyIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiB0aGUgV2ViR0wgY29udGV4dCwgYmFzZWRcbiAqIG9uIGFuIGlucHV0IHZhbHVlLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge051bWJlcnxBcnJheX0gdmFsdWUgVmFsdWUgZnJvbSB3aGljaCB1bmlmb3JtIHR5cGUgaXMgaW5mZXJyZWQuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBOYW1lIG9mIHVuaWZvcm0gZnVuY3Rpb24gZm9yIGdpdmVuIHZhbHVlLlxuICovXG5Qcm9ncmFtLnByb3RvdHlwZS5nZXRVbmlmb3JtVHlwZUZyb21WYWx1ZSA9IGZ1bmN0aW9uIGdldFVuaWZvcm1UeXBlRnJvbVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5KSB7XG4gICAgICAgIHN3aXRjaCAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDE6ICByZXR1cm4gJ3VuaWZvcm0xZnYnO1xuICAgICAgICAgICAgY2FzZSAyOiAgcmV0dXJuICd1bmlmb3JtMmZ2JztcbiAgICAgICAgICAgIGNhc2UgMzogIHJldHVybiAndW5pZm9ybTNmdic7XG4gICAgICAgICAgICBjYXNlIDQ6ICByZXR1cm4gJ3VuaWZvcm00ZnYnO1xuICAgICAgICAgICAgY2FzZSA5OiAgcmV0dXJuICd1bmlmb3JtTWF0cml4M2Z2JztcbiAgICAgICAgICAgIGNhc2UgMTY6IHJldHVybiAndW5pZm9ybU1hdHJpeDRmdic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICd1bmlmb3JtMWYnO1xuICAgIH1cblxuICAgIHRocm93ICdjYW50IGxvYWQgdW5pZm9ybSBcIicgKyBuYW1lICsgJ1wiIHdpdGggdmFsdWU6JyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn07XG5cbi8qKlxuICogQWRkcyBzaGFkZXIgc291cmNlIHRvIHNoYWRlciBhbmQgY29tcGlsZXMgdGhlIGlucHV0IHNoYWRlci4gIENoZWNrc1xuICogY29tcGlsZSBzdGF0dXMgYW5kIGxvZ3MgZXJyb3IgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2hhZGVyIFByb2dyYW0gdG8gYmUgY29tcGlsZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gc291cmNlIFNvdXJjZSB0byBiZSB1c2VkIGluIHRoZSBzaGFkZXIuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBDb21waWxlZCBzaGFkZXIuXG4gKi9cblByb2dyYW0ucHJvdG90eXBlLmNvbXBpbGVTaGFkZXIgPSBmdW5jdGlvbiBjb21waWxlU2hhZGVyKHNoYWRlciwgc291cmNlKSB7XG4gICAgdmFyIGkgPSAxO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIgPSBEZWJ1Zy5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICBpZiAoIXRoaXMuZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgdGhpcy5nbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignY29tcGlsZSBlcnJvcjogJyArIHRoaXMuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignMTogJyArIHNvdXJjZS5yZXBsYWNlKC9cXG4vZywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICdcXG4nICsgKGkrPTEpICsgJzogJztcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFkZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyYW07XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGV4dHVyZSBpcyBhIHByaXZhdGUgY2xhc3MgdGhhdCBzdG9yZXMgaW1hZ2UgZGF0YVxuICogdG8gYmUgYWNjZXNzZWQgZnJvbSBhIHNoYWRlciBvciB1c2VkIGFzIGEgcmVuZGVyIHRhcmdldC5cbiAqXG4gKiBAY2xhc3MgVGV4dHVyZVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtHTH0gZ2wgR0xcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBUZXh0dXJlKGdsLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5pZCA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMDtcbiAgICB0aGlzLm1pcG1hcCA9IG9wdGlvbnMubWlwbWFwO1xuICAgIHRoaXMuZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgfHwgJ1JHQkEnO1xuICAgIHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCAnVU5TSUdORURfQllURSc7XG4gICAgdGhpcy5nbCA9IGdsO1xuXG4gICAgdGhpcy5iaW5kKCk7XG5cbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCBmYWxzZSk7XG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLCBmYWxzZSk7XG5cbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2xbb3B0aW9ucy5tYWdGaWx0ZXJdIHx8IGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbFtvcHRpb25zLm1pbkZpbHRlcl0gfHwgZ2wuTkVBUkVTVCk7XG5cbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbFtvcHRpb25zLndyYXBTXSB8fCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbFtvcHRpb25zLndyYXBUXSB8fCBnbC5DTEFNUF9UT19FREdFKTtcbn1cblxuLyoqXG4gKiBCaW5kcyB0aGlzIHRleHR1cmUgYXMgdGhlIHNlbGVjdGVkIHRhcmdldC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgdGV4dHVyZSBpbnN0YW5jZS5cbiAqL1xuVGV4dHVyZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuaWQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFcmFzZXMgdGhlIHRleHR1cmUgZGF0YSBpbiB0aGUgZ2l2ZW4gdGV4dHVyZSBzbG90LlxuICpcbiAqIEBtZXRob2RcbiAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCB0ZXh0dXJlIGluc3RhbmNlLlxuICovXG5UZXh0dXJlLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXBsYWNlcyB0aGUgaW1hZ2UgZGF0YSBpbiB0aGUgdGV4dHVyZSB3aXRoIHRoZSBnaXZlbiBpbWFnZS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtJbWFnZX0gICBpbWcgICAgIFRoZSBpbWFnZSBvYmplY3QgdG8gdXBsb2FkIHBpeGVsIGRhdGEgZnJvbS5cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICBDdXJyZW50IHRleHR1cmUgaW5zdGFuY2UuXG4gKi9cblRleHR1cmUucHJvdG90eXBlLnNldEltYWdlID0gZnVuY3Rpb24gc2V0SW1hZ2UoaW1nKSB7XG4gICAgdGhpcy5nbC50ZXhJbWFnZTJEKHRoaXMuZ2wuVEVYVFVSRV8yRCwgMCwgdGhpcy5nbFt0aGlzLmZvcm1hdF0sIHRoaXMuZ2xbdGhpcy5mb3JtYXRdLCB0aGlzLmdsW3RoaXMudHlwZV0sIGltZyk7XG4gICAgaWYgKHRoaXMubWlwbWFwKSB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlcGxhY2VzIHRoZSBpbWFnZSBkYXRhIGluIHRoZSB0ZXh0dXJlIHdpdGggYW4gYXJyYXkgb2YgYXJiaXRyYXJ5IGRhdGEuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9ICAgaW5wdXQgICBBcnJheSB0byBiZSBzZXQgYXMgZGF0YSB0byB0ZXh0dXJlLlxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgIEN1cnJlbnQgdGV4dHVyZSBpbnN0YW5jZS5cbiAqL1xuVGV4dHVyZS5wcm90b3R5cGUuc2V0QXJyYXkgPSBmdW5jdGlvbiBzZXRBcnJheShpbnB1dCkge1xuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2xbdGhpcy5mb3JtYXRdLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMCwgdGhpcy5nbFt0aGlzLmZvcm1hdF0sIHRoaXMuZ2xbdGhpcy50eXBlXSwgaW5wdXQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEdW1wcyB0aGUgcmdiLXBpeGVsIGNvbnRlbnRzIG9mIGEgdGV4dHVyZSBpbnRvIGFuIGFycmF5IGZvciBkZWJ1Z2dpbmcgcHVycG9zZXNcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggICAgICAgIHgtb2Zmc2V0IGJldHdlZW4gdGV4dHVyZSBjb29yZGluYXRlcyBhbmQgc25hcHNob3RcbiAqIEBwYXJhbSB7TnVtYmVyfSB5ICAgICAgICB5LW9mZnNldCBiZXR3ZWVuIHRleHR1cmUgY29vcmRpbmF0ZXMgYW5kIHNuYXBzaG90XG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGggICAgeC1kZXB0aCBvZiB0aGUgc25hcHNob3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgICB5LWRlcHRoIG9mIHRoZSBzbmFwc2hvdFxuICpcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgICBBbiBhcnJheSBvZiB0aGUgcGl4ZWxzIGNvbnRhaW5lZCBpbiB0aGUgc25hcHNob3QuXG4gKi9cblRleHR1cmUucHJvdG90eXBlLnJlYWRCYWNrID0gZnVuY3Rpb24gcmVhZEJhY2soeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgdmFyIHBpeGVscztcbiAgICB4ID0geCB8fCAwO1xuICAgIHkgPSB5IHx8IDA7XG4gICAgd2lkdGggPSB3aWR0aCB8fCB0aGlzLndpZHRoO1xuICAgIGhlaWdodCA9IGhlaWdodCB8fCB0aGlzLmhlaWdodDtcbiAgICB2YXIgZmIgPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZmIpO1xuICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGdsLkZSQU1FQlVGRkVSLCBnbC5DT0xPUl9BVFRBQ0hNRU5UMCwgZ2wuVEVYVFVSRV8yRCwgdGhpcy5pZCwgMCk7XG4gICAgaWYgKGdsLmNoZWNrRnJhbWVidWZmZXJTdGF0dXMoZ2wuRlJBTUVCVUZGRVIpID09PSBnbC5GUkFNRUJVRkZFUl9DT01QTEVURSkge1xuICAgICAgICBwaXhlbHMgPSBuZXcgVWludDhBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpO1xuICAgICAgICBnbC5yZWFkUGl4ZWxzKHgsIHksIHdpZHRoLCBoZWlnaHQsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHBpeGVscyk7XG4gICAgfVxuICAgIHJldHVybiBwaXhlbHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHR1cmU7XG4iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBGYW1vdXMgSW5kdXN0cmllcyBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVGV4dHVyZSA9IHJlcXVpcmUoJy4vVGV4dHVyZScpO1xudmFyIGNyZWF0ZUNoZWNrZXJib2FyZCA9IHJlcXVpcmUoJy4vY3JlYXRlQ2hlY2tlcmJvYXJkJyk7XG5cbi8qKlxuICogSGFuZGxlcyBsb2FkaW5nLCBiaW5kaW5nLCBhbmQgcmVzYW1wbGluZyBvZiB0ZXh0dXJlcyBmb3IgV2ViR0xSZW5kZXJlci5cbiAqXG4gKiBAY2xhc3MgVGV4dHVyZU1hbmFnZXJcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7V2ViR0xfQ29udGV4dH0gZ2wgQ29udGV4dCB1c2VkIHRvIGNyZWF0ZSBhbmQgYmluZCB0ZXh0dXJlcy5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBUZXh0dXJlTWFuYWdlcihnbCkge1xuICAgIHRoaXMucmVnaXN0cnkgPSBbXTtcbiAgICB0aGlzLl9uZWVkc1Jlc2FtcGxlID0gW107XG5cbiAgICB0aGlzLl9hY3RpdmVUZXh0dXJlID0gMDtcbiAgICB0aGlzLl9ib3VuZFRleHR1cmUgPSBudWxsO1xuXG4gICAgdGhpcy5fY2hlY2tlcmJvYXJkID0gY3JlYXRlQ2hlY2tlcmJvYXJkKCk7XG5cbiAgICB0aGlzLmdsID0gZ2w7XG59XG5cbi8qKlxuICogVXBkYXRlIGZ1bmN0aW9uIHVzZWQgYnkgV2ViR0xSZW5kZXJlciB0byBxdWV1ZSByZXNhbXBsZXMgb25cbiAqIHJlZ2lzdGVyZWQgdGV4dHVyZXMuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSAgICAgIHRpbWUgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgYWNjb3JkaW5nIHRvIHRoZSBjb21wb3NpdG9yLlxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICB1bmRlZmluZWRcbiAqL1xuVGV4dHVyZU1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSh0aW1lKSB7XG4gICAgdmFyIHJlZ2lzdHJ5TGVuZ3RoID0gdGhpcy5yZWdpc3RyeS5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJlZ2lzdHJ5TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRleHR1cmUgPSB0aGlzLnJlZ2lzdHJ5W2ldO1xuXG4gICAgICAgIGlmICh0ZXh0dXJlICYmIHRleHR1cmUuaXNMb2FkZWQgJiYgdGV4dHVyZS5yZXNhbXBsZVJhdGUpIHtcbiAgICAgICAgICAgIGlmICghdGV4dHVyZS5sYXN0UmVzYW1wbGUgfHwgdGltZSAtIHRleHR1cmUubGFzdFJlc2FtcGxlID4gdGV4dHVyZS5yZXNhbXBsZVJhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX25lZWRzUmVzYW1wbGVbdGV4dHVyZS5pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVlZHNSZXNhbXBsZVt0ZXh0dXJlLmlkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUubGFzdFJlc2FtcGxlID0gdGltZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzcGVjIGFuZCBjcmVhdGVzIGEgdGV4dHVyZSBiYXNlZCBvbiBnaXZlbiB0ZXh0dXJlIGRhdGEuXG4gKiBIYW5kbGVzIGxvYWRpbmcgYXNzZXRzIGlmIG5lY2Vzc2FyeS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9ICBpbnB1dCAgIE9iamVjdCBjb250YWluaW5nIHRleHR1cmUgaWQsIHRleHR1cmUgZGF0YVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBvcHRpb25zIHVzZWQgdG8gZHJhdyB0ZXh0dXJlLlxuICogQHBhcmFtIHtOdW1iZXJ9ICBzbG90ICAgIFRleHR1cmUgc2xvdCB0byBiaW5kIGdlbmVyYXRlZCB0ZXh0dXJlIHRvLlxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgIHVuZGVmaW5lZFxuICovXG5UZXh0dXJlTWFuYWdlci5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihpbnB1dCwgc2xvdCkge1xuICAgIHZhciBzb3VyY2UgPSBpbnB1dC5kYXRhO1xuICAgIHZhciB0ZXh0dXJlSWQgPSBpbnB1dC5pZDtcbiAgICB2YXIgb3B0aW9ucyA9IGlucHV0Lm9wdGlvbnMgfHwge307XG4gICAgdmFyIHRleHR1cmUgPSB0aGlzLnJlZ2lzdHJ5W3RleHR1cmVJZF07XG4gICAgdmFyIHNwZWM7XG5cbiAgICBpZiAoIXRleHR1cmUpIHtcblxuICAgICAgICB0ZXh0dXJlID0gbmV3IFRleHR1cmUodGhpcy5nbCwgb3B0aW9ucyk7XG4gICAgICAgIHRleHR1cmUuc2V0SW1hZ2UodGhpcy5fY2hlY2tlcmJvYXJkKTtcblxuICAgICAgICAvLyBBZGQgdGV4dHVyZSB0byByZWdpc3RyeVxuXG4gICAgICAgIHNwZWMgPSB0aGlzLnJlZ2lzdHJ5W3RleHR1cmVJZF0gPSB7XG4gICAgICAgICAgICByZXNhbXBsZVJhdGU6IG9wdGlvbnMucmVzYW1wbGVSYXRlIHx8IG51bGwsXG4gICAgICAgICAgICBsYXN0UmVzYW1wbGU6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICB0ZXh0dXJlOiB0ZXh0dXJlLFxuICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICBpZDogdGV4dHVyZUlkLFxuICAgICAgICAgICAgc2xvdDogc2xvdFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEhhbmRsZSBhcnJheVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZSkgfHwgc291cmNlIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBzb3VyY2UgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZFRleHR1cmUodGV4dHVyZUlkKTtcbiAgICAgICAgICAgIHRleHR1cmUuc2V0QXJyYXkoc291cmNlKTtcbiAgICAgICAgICAgIHNwZWMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIHZpZGVvXG5cbiAgICAgICAgZWxzZSBpZiAod2luZG93ICYmIHNvdXJjZSBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFRleHR1cmUodGV4dHVyZUlkKTtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLnNldEltYWdlKHNvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICBzcGVjLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzcGVjLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgaW1hZ2UgdXJsXG5cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxvYWRJbWFnZShzb3VyY2UsIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRUZXh0dXJlKHRleHR1cmVJZCk7XG4gICAgICAgICAgICAgICAgdGV4dHVyZS5zZXRJbWFnZShpbWcpO1xuXG4gICAgICAgICAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc3BlYy5zb3VyY2UgPSBpbWc7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHR1cmVJZDtcbn07XG5cbi8qKlxuICogTG9hZHMgYW4gaW1hZ2UgZnJvbSBhIHN0cmluZyBvciBJbWFnZSBvYmplY3QgYW5kIGV4ZWN1dGVzIGEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKlxuICogQG1ldGhvZFxuICogQHByaXZhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGlucHV0IFRoZSBpbnB1dCBpbWFnZSBkYXRhIHRvIGxvYWQgYXMgYW4gYXNzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgZmlyZWQgd2hlbiB0aGUgaW1hZ2UgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBJbWFnZSBvYmplY3QgYmVpbmcgbG9hZGVkLlxuICovXG5mdW5jdGlvbiBsb2FkSW1hZ2UgKGlucHV0LCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZSA9ICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gbmV3IEltYWdlKCkgOiBpbnB1dCkgfHwge307XG4gICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG5cbiAgICBpZiAoIWltYWdlLnNyYykgaW1hZ2Uuc3JjID0gaW5wdXQ7XG4gICAgaWYgKCFpbWFnZS5jb21wbGV0ZSkge1xuICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpbWFnZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhpbWFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltYWdlO1xufVxuXG4vKipcbiAqIFNldHMgYWN0aXZlIHRleHR1cmUgc2xvdCBhbmQgYmluZHMgdGFyZ2V0IHRleHR1cmUuICBBbHNvIGhhbmRsZXNcbiAqIHJlc2FtcGxpbmcgd2hlbiBuZWNlc3NhcnkuXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBJZGVudGlmaWVyIHVzZWQgdG8gcmV0cmVpdmUgdGV4dHVyZSBzcGVjXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuVGV4dHVyZU1hbmFnZXIucHJvdG90eXBlLmJpbmRUZXh0dXJlID0gZnVuY3Rpb24gYmluZFRleHR1cmUoaWQpIHtcbiAgICB2YXIgc3BlYyA9IHRoaXMucmVnaXN0cnlbaWRdO1xuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVRleHR1cmUgIT09IHNwZWMuc2xvdCkge1xuICAgICAgICB0aGlzLmdsLmFjdGl2ZVRleHR1cmUodGhpcy5nbC5URVhUVVJFMCArIHNwZWMuc2xvdCk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRleHR1cmUgPSBzcGVjLnNsb3Q7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2JvdW5kVGV4dHVyZSAhPT0gaWQpIHtcbiAgICAgICAgdGhpcy5fYm91bmRUZXh0dXJlID0gaWQ7XG4gICAgICAgIHNwZWMudGV4dHVyZS5iaW5kKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX25lZWRzUmVzYW1wbGVbc3BlYy5pZF0pIHtcblxuICAgICAgICAvLyBUT0RPOiBBY2NvdW50IGZvciByZXNhbXBsaW5nIG9mIGFycmF5cy5cblxuICAgICAgICBzcGVjLnRleHR1cmUuc2V0SW1hZ2Uoc3BlYy5zb3VyY2UpO1xuICAgICAgICB0aGlzLl9uZWVkc1Jlc2FtcGxlW3NwZWMuaWRdID0gZmFsc2U7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0dXJlTWFuYWdlcjtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFByb2dyYW0gPSByZXF1aXJlKCcuL1Byb2dyYW0nKTtcbnZhciBCdWZmZXJSZWdpc3RyeSA9IHJlcXVpcmUoJy4vQnVmZmVyUmVnaXN0cnknKTtcbnZhciBQbGFuZSA9IHJlcXVpcmUoJy4uL3dlYmdsLWdlb21ldHJpZXMvcHJpbWl0aXZlcy9QbGFuZScpO1xudmFyIHNvcnRlciA9IHJlcXVpcmUoJy4vcmFkaXhTb3J0Jyk7XG52YXIga2V5VmFsdWVUb0FycmF5cyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9rZXlWYWx1ZVRvQXJyYXlzJyk7XG52YXIgVGV4dHVyZU1hbmFnZXIgPSByZXF1aXJlKCcuL1RleHR1cmVNYW5hZ2VyJyk7XG52YXIgY29tcGlsZU1hdGVyaWFsID0gcmVxdWlyZSgnLi9jb21waWxlTWF0ZXJpYWwnKTtcblxudmFyIGlkZW50aXR5ID0gWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdO1xuXG52YXIgZ2xvYmFsVW5pZm9ybXMgPSBrZXlWYWx1ZVRvQXJyYXlzKHtcbiAgICAndV9udW1MaWdodHMnOiAwLFxuICAgICd1X2FtYmllbnRMaWdodCc6IG5ldyBBcnJheSgzKSxcbiAgICAndV9saWdodFBvc2l0aW9uJzogbmV3IEFycmF5KDMpLFxuICAgICd1X2xpZ2h0Q29sb3InOiBuZXcgQXJyYXkoMyksXG4gICAgJ3VfcGVyc3BlY3RpdmUnOiBuZXcgQXJyYXkoMTYpLFxuICAgICd1X3RpbWUnOiAwLFxuICAgICd1X3ZpZXcnOiBuZXcgQXJyYXkoMTYpXG59KTtcblxuLyoqXG4gKiBXZWJHTFJlbmRlcmVyIGlzIGEgcHJpdmF0ZSBjbGFzcyB0aGF0IG1hbmFnZXMgYWxsIGludGVyYWN0aW9ucyB3aXRoIHRoZSBXZWJHTFxuICogQVBJLiBFYWNoIGZyYW1lIGl0IHJlY2VpdmVzIGNvbW1hbmRzIGZyb20gdGhlIGNvbXBvc2l0b3IgYW5kIHVwZGF0ZXMgaXRzXG4gKiByZWdpc3RyaWVzIGFjY29yZGluZ2x5LiBTdWJzZXF1ZW50bHksIHRoZSBkcmF3IGZ1bmN0aW9uIGlzIGNhbGxlZCBhbmQgdGhlXG4gKiBXZWJHTFJlbmRlcmVyIGlzc3VlcyBkcmF3IGNhbGxzIGZvciBhbGwgbWVzaGVzIGluIGl0cyByZWdpc3RyeS5cbiAqXG4gKiBAY2xhc3MgV2ViR0xSZW5kZXJlclxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBjYW52YXMgVGhlIERPTSBlbGVtZW50IHRoYXQgR0wgd2lsbCBwYWludCBpdHNlbGYgb250by5cbiAqIEBwYXJhbSB7Q29tcG9zaXRvcn0gY29tcG9zaXRvciBDb21wb3NpdG9yIHVzZWQgZm9yIHF1ZXJ5aW5nIHRoZSB0aW1lIGZyb20uXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gV2ViR0xSZW5kZXJlcihjYW52YXMsIGNvbXBvc2l0b3IpIHtcbiAgICBjYW52YXMuY2xhc3NMaXN0LmFkZCgnZmFtb3VzLXdlYmdsLXJlbmRlcmVyJyk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbXBvc2l0b3IgPSBjb21wb3NpdG9yO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9TVFlMRVMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGVba2V5XSA9IHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9TVFlMRVNba2V5XTtcbiAgICB9XG5cbiAgICB2YXIgZ2wgPSB0aGlzLmdsID0gdGhpcy5nZXRXZWJHTENvbnRleHQodGhpcy5jYW52YXMpO1xuXG4gICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAwLjApO1xuICAgIGdsLnBvbHlnb25PZmZzZXQoMC4xLCAwLjEpO1xuICAgIGdsLmVuYWJsZShnbC5QT0xZR09OX09GRlNFVF9GSUxMKTtcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICBnbC5jdWxsRmFjZShnbC5CQUNLKTtcblxuICAgIHRoaXMubWVzaFJlZ2lzdHJ5ID0ge307XG4gICAgdGhpcy5tZXNoUmVnaXN0cnlLZXlzID0gW107XG5cbiAgICB0aGlzLmN1dG91dFJlZ2lzdHJ5ID0ge307XG5cbiAgICB0aGlzLmN1dG91dFJlZ2lzdHJ5S2V5cyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlnaHRzXG4gICAgICovXG4gICAgdGhpcy5udW1MaWdodHMgPSAwO1xuICAgIHRoaXMuYW1iaWVudExpZ2h0Q29sb3IgPSBbMCwgMCwgMF07XG4gICAgdGhpcy5saWdodFJlZ2lzdHJ5ID0ge307XG4gICAgdGhpcy5saWdodFJlZ2lzdHJ5S2V5cyA9IFtdO1xuICAgIHRoaXMubGlnaHRQb3NpdGlvbnMgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgdGhpcy5saWdodENvbG9ycyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcblxuICAgIHRoaXMudGV4dHVyZU1hbmFnZXIgPSBuZXcgVGV4dHVyZU1hbmFnZXIoZ2wpO1xuICAgIHRoaXMudGV4Q2FjaGUgPSB7fTtcbiAgICB0aGlzLmJ1ZmZlclJlZ2lzdHJ5ID0gbmV3IEJ1ZmZlclJlZ2lzdHJ5KGdsKTtcbiAgICB0aGlzLnByb2dyYW0gPSBuZXcgUHJvZ3JhbShnbCwgeyBkZWJ1ZzogdHJ1ZSB9KTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGJvdW5kQXJyYXlCdWZmZXI6IG51bGwsXG4gICAgICAgIGJvdW5kRWxlbWVudEJ1ZmZlcjogbnVsbCxcbiAgICAgICAgbGFzdERyYXduOiBudWxsLFxuICAgICAgICBlbmFibGVkQXR0cmlidXRlczoge30sXG4gICAgICAgIGVuYWJsZWRBdHRyaWJ1dGVzS2V5czogW11cbiAgICB9O1xuXG4gICAgdGhpcy5yZXNvbHV0aW9uTmFtZSA9IFsndV9yZXNvbHV0aW9uJ107XG4gICAgdGhpcy5yZXNvbHV0aW9uVmFsdWVzID0gW107XG5cbiAgICB0aGlzLmNhY2hlZFNpemUgPSBbXTtcblxuICAgIC8qXG4gICAgVGhlIHByb2plY3Rpb25UcmFuc2Zvcm0gaGFzIHNvbWUgY29uc3RhbnQgY29tcG9uZW50cywgaS5lLiB0aGUgeiBzY2FsZSwgYW5kIHRoZSB4IGFuZCB5IHRyYW5zbGF0aW9uLlxuXG4gICAgVGhlIHogc2NhbGUga2VlcHMgdGhlIGZpbmFsIHogcG9zaXRpb24gb2YgYW55IHZlcnRleCB3aXRoaW4gdGhlIGNsaXAncyBkb21haW4gYnkgc2NhbGluZyBpdCBieSBhblxuICAgIGFyYml0cmFyaWx5IHNtYWxsIGNvZWZmaWNpZW50LiBUaGlzIGhhcyB0aGUgYWR2YW50YWdlIG9mIGJlaW5nIGEgdXNlZnVsIGRlZmF1bHQgaW4gdGhlIGV2ZW50IG9mIHRoZVxuICAgIHVzZXIgZm9yZ29pbmcgYSBuZWFyIGFuZCBmYXIgcGxhbmUsIGFuIGFsaWVuIGNvbnZlbnRpb24gaW4gZG9tIHNwYWNlIGFzIGluIERPTSBvdmVybGFwcGluZyBpc1xuICAgIGNvbmR1Y3RlZCB2aWEgcGFpbnRlcidzIGFsZ29yaXRobS5cblxuICAgIFRoZSB4IGFuZCB5IHRyYW5zbGF0aW9uIHRyYW5zZm9ybXMgdGhlIHdvcmxkIHNwYWNlIG9yaWdpbiB0byB0aGUgdG9wIGxlZnQgY29ybmVyIG9mIHRoZSBzY3JlZW4uXG5cbiAgICBUaGUgZmluYWwgY29tcG9uZW50ICh0aGlzLnByb2plY3Rpb25UcmFuc2Zvcm1bMTVdKSBpcyBpbml0aWFsaXplZCBhcyAxIGJlY2F1c2UgY2VydGFpbiBwcm9qZWN0aW9uIG1vZGVscyxcbiAgICBlLmcuIHRoZSBXQzMgc3BlY2lmaWVkIG1vZGVsLCBrZWVwIHRoZSBYWSBwbGFuZSBhcyB0aGUgcHJvamVjdGlvbiBoeXBlcnBsYW5lLlxuICAgICovXG4gICAgdGhpcy5wcm9qZWN0aW9uVHJhbnNmb3JtID0gWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIC0wLjAwMDAwMSwgMCwgLTEsIDEsIDAsIDFdO1xuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgaGFja1xuXG4gICAgdmFyIGN1dG91dCA9IHRoaXMuY3V0b3V0R2VvbWV0cnkgPSBuZXcgUGxhbmUoKTtcblxuICAgIHRoaXMuYnVmZmVyUmVnaXN0cnkuYWxsb2NhdGUoY3V0b3V0LnNwZWMuaWQsICdhX3BvcycsIGN1dG91dC5zcGVjLmJ1ZmZlclZhbHVlc1swXSwgMyk7XG4gICAgdGhpcy5idWZmZXJSZWdpc3RyeS5hbGxvY2F0ZShjdXRvdXQuc3BlYy5pZCwgJ2FfdGV4Q29vcmQnLCBjdXRvdXQuc3BlYy5idWZmZXJWYWx1ZXNbMV0sIDIpO1xuICAgIHRoaXMuYnVmZmVyUmVnaXN0cnkuYWxsb2NhdGUoY3V0b3V0LnNwZWMuaWQsICdhX25vcm1hbHMnLCBjdXRvdXQuc3BlYy5idWZmZXJWYWx1ZXNbMl0sIDMpO1xuICAgIHRoaXMuYnVmZmVyUmVnaXN0cnkuYWxsb2NhdGUoY3V0b3V0LnNwZWMuaWQsICdpbmRpY2VzJywgY3V0b3V0LnNwZWMuYnVmZmVyVmFsdWVzWzNdLCAxKTtcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byByZXRyZWl2ZSB0aGUgV2ViR0xSZW5kZXJlciBjb250ZXh0IHVzaW5nIHNldmVyYWxcbiAqIGFjY2Vzc29ycy4gRm9yIGJyb3dzZXIgY29tcGF0YWJpbGl0eS4gVGhyb3dzIG9uIGVycm9yLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY2FudmFzIENhbnZhcyBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGNvbnRleHQgaXMgcmV0cmVpdmVkXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBXZWJHTENvbnRleHQgb2YgY2FudmFzIGVsZW1lbnRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuZ2V0V2ViR0xDb250ZXh0ID0gZnVuY3Rpb24gZ2V0V2ViR0xDb250ZXh0KGNhbnZhcykge1xuICAgIHZhciBuYW1lcyA9IFsnd2ViZ2wnLCAnZXhwZXJpbWVudGFsLXdlYmdsJywgJ3dlYmtpdC0zZCcsICdtb3otd2ViZ2wnXTtcbiAgICB2YXIgY29udGV4dCA9IG51bGw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHZhciBtc2cgPSAnRXJyb3IgY3JlYXRpbmcgV2ViR0wgY29udGV4dDogJyArIGVycm9yLnByb3RvdHlwZS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQgOiBmYWxzZTtcbn07XG5cbi8qKlxuICogQWRkcyBhIG5ldyBiYXNlIHNwZWMgdG8gdGhlIGxpZ2h0IHJlZ2lzdHJ5IGF0IGEgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggUGF0aCB1c2VkIGFzIGlkIG9mIG5ldyBsaWdodCBpbiBsaWdodFJlZ2lzdHJ5XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBOZXdseSBjcmVhdGVkIGxpZ2h0IHNwZWNcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuY3JlYXRlTGlnaHQgPSBmdW5jdGlvbiBjcmVhdGVMaWdodChwYXRoKSB7XG4gICAgdGhpcy5udW1MaWdodHMrKztcbiAgICB0aGlzLmxpZ2h0UmVnaXN0cnlLZXlzLnB1c2gocGF0aCk7XG4gICAgdGhpcy5saWdodFJlZ2lzdHJ5W3BhdGhdID0ge1xuICAgICAgICBjb2xvcjogWzAsIDAsIDBdLFxuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIDBdXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5saWdodFJlZ2lzdHJ5W3BhdGhdO1xufTtcblxuLyoqXG4gKiBBZGRzIGEgbmV3IGJhc2Ugc3BlYyB0byB0aGUgbWVzaCByZWdpc3RyeSBhdCBhIGdpdmVuIHBhdGguXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiBuZXcgbWVzaCBpbiBtZXNoUmVnaXN0cnkuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBOZXdseSBjcmVhdGVkIG1lc2ggc3BlYy5cbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuY3JlYXRlTWVzaCA9IGZ1bmN0aW9uIGNyZWF0ZU1lc2gocGF0aCkge1xuICAgIHRoaXMubWVzaFJlZ2lzdHJ5S2V5cy5wdXNoKHBhdGgpO1xuXG4gICAgdmFyIHVuaWZvcm1zID0ga2V5VmFsdWVUb0FycmF5cyh7XG4gICAgICAgIHVfb3BhY2l0eTogMSxcbiAgICAgICAgdV90cmFuc2Zvcm06IGlkZW50aXR5LFxuICAgICAgICB1X3NpemU6IFswLCAwLCAwXSxcbiAgICAgICAgdV9iYXNlQ29sb3I6IFswLjUsIDAuNSwgMC41LCAxXSxcbiAgICAgICAgdV9wb3NpdGlvbk9mZnNldDogWzAsIDAsIDBdLFxuICAgICAgICB1X25vcm1hbHM6IFswLCAwLCAwXSxcbiAgICAgICAgdV9mbGF0U2hhZGluZzogMCxcbiAgICAgICAgdV9nbG9zc2luZXNzOiBbMCwgMCwgMCwgMF1cbiAgICB9KTtcbiAgICB0aGlzLm1lc2hSZWdpc3RyeVtwYXRoXSA9IHtcbiAgICAgICAgZGVwdGg6IG51bGwsXG4gICAgICAgIHVuaWZvcm1LZXlzOiB1bmlmb3Jtcy5rZXlzLFxuICAgICAgICB1bmlmb3JtVmFsdWVzOiB1bmlmb3Jtcy52YWx1ZXMsXG4gICAgICAgIGJ1ZmZlcnM6IHt9LFxuICAgICAgICBnZW9tZXRyeTogbnVsbCxcbiAgICAgICAgZHJhd1R5cGU6IG51bGwsXG4gICAgICAgIHRleHR1cmVzOiBbXSxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMubWVzaFJlZ2lzdHJ5W3BhdGhdO1xufTtcblxuLyoqXG4gKiBTZXRzIGZsYWcgb24gaW5kaWNhdGluZyB3aGV0aGVyIHRvIGRvIHNraXAgZHJhdyBwaGFzZSBmb3JcbiAqIGN1dG91dCBtZXNoIGF0IGdpdmVuIHBhdGguXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiB0YXJnZXQgY3V0b3V0IG1lc2guXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZXNDdXRvdXQgSW5kaWNhdGVzIHRoZSBwcmVzZW5jZSBvZiBhIGN1dG91dCBtZXNoXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuc2V0Q3V0b3V0U3RhdGUgPSBmdW5jdGlvbiBzZXRDdXRvdXRTdGF0ZShwYXRoLCB1c2VzQ3V0b3V0KSB7XG4gICAgdmFyIGN1dG91dCA9IHRoaXMuZ2V0T3JTZXRDdXRvdXQocGF0aCk7XG5cbiAgICBjdXRvdXQudmlzaWJsZSA9IHVzZXNDdXRvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgb3IgcmV0cmVpdmVzIGN1dG91dFxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBQYXRoIHVzZWQgYXMgaWQgb2YgdGFyZ2V0IGN1dG91dCBtZXNoLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gTmV3bHkgY3JlYXRlZCBjdXRvdXQgc3BlYy5cbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuZ2V0T3JTZXRDdXRvdXQgPSBmdW5jdGlvbiBnZXRPclNldEN1dG91dChwYXRoKSB7XG4gICAgaWYgKHRoaXMuY3V0b3V0UmVnaXN0cnlbcGF0aF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3V0b3V0UmVnaXN0cnlbcGF0aF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdW5pZm9ybXMgPSBrZXlWYWx1ZVRvQXJyYXlzKHtcbiAgICAgICAgICAgIHVfb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHVfdHJhbnNmb3JtOiBpZGVudGl0eS5zbGljZSgpLFxuICAgICAgICAgICAgdV9zaXplOiBbMCwgMCwgMF0sXG4gICAgICAgICAgICB1X29yaWdpbjogWzAsIDAsIDBdLFxuICAgICAgICAgICAgdV9iYXNlQ29sb3I6IFswLCAwLCAwLCAxXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1dG91dFJlZ2lzdHJ5S2V5cy5wdXNoKHBhdGgpO1xuXG4gICAgICAgIHRoaXMuY3V0b3V0UmVnaXN0cnlbcGF0aF0gPSB7XG4gICAgICAgICAgICB1bmlmb3JtS2V5czogdW5pZm9ybXMua2V5cyxcbiAgICAgICAgICAgIHVuaWZvcm1WYWx1ZXM6IHVuaWZvcm1zLnZhbHVlcyxcbiAgICAgICAgICAgIGdlb21ldHJ5OiB0aGlzLmN1dG91dEdlb21ldHJ5LnNwZWMuaWQsXG4gICAgICAgICAgICBkcmF3VHlwZTogdGhpcy5jdXRvdXRHZW9tZXRyeS5zcGVjLnR5cGUsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3V0b3V0UmVnaXN0cnlbcGF0aF07XG4gICAgfVxufTtcblxuLyoqXG4gKiBTZXRzIGZsYWcgb24gaW5kaWNhdGluZyB3aGV0aGVyIHRvIGRvIHNraXAgZHJhdyBwaGFzZSBmb3JcbiAqIG1lc2ggYXQgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBQYXRoIHVzZWQgYXMgaWQgb2YgdGFyZ2V0IG1lc2guXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHZpc2liaWxpdHkgSW5kaWNhdGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRhcmdldCBtZXNoLlxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbldlYkdMUmVuZGVyZXIucHJvdG90eXBlLnNldE1lc2hWaXNpYmlsaXR5ID0gZnVuY3Rpb24gc2V0TWVzaFZpc2liaWxpdHkocGF0aCwgdmlzaWJpbGl0eSkge1xuICAgIHZhciBtZXNoID0gdGhpcy5tZXNoUmVnaXN0cnlbcGF0aF0gfHwgdGhpcy5jcmVhdGVNZXNoKHBhdGgpO1xuXG4gICAgbWVzaC52aXNpYmxlID0gdmlzaWJpbGl0eTtcbn07XG5cbi8qKlxuICogRGVsZXRlcyBhIG1lc2ggZnJvbSB0aGUgbWVzaFJlZ2lzdHJ5LlxuICpcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiB0YXJnZXQgbWVzaC5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5yZW1vdmVNZXNoID0gZnVuY3Rpb24gcmVtb3ZlTWVzaChwYXRoKSB7XG4gICAgdmFyIGtleUxvY2F0aW9uID0gdGhpcy5tZXNoUmVnaXN0cnlLZXlzLmluZGV4T2YocGF0aCk7XG4gICAgdGhpcy5tZXNoUmVnaXN0cnlLZXlzLnNwbGljZShrZXlMb2NhdGlvbiwgMSk7XG4gICAgdGhpcy5tZXNoUmVnaXN0cnlbcGF0aF0gPSBudWxsO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG9yIHJldHJlaXZlcyBjdXRvdXRcbiAqXG4gKiBAbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBQYXRoIHVzZWQgYXMgaWQgb2YgY3V0b3V0IGluIGN1dG91dCByZWdpc3RyeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB1bmlmb3JtTmFtZSBJZGVudGlmaWVyIHVzZWQgdG8gdXBsb2FkIHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSB1bmlmb3JtVmFsdWUgVmFsdWUgb2YgdW5pZm9ybSBkYXRhXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuc2V0Q3V0b3V0VW5pZm9ybSA9IGZ1bmN0aW9uIHNldEN1dG91dFVuaWZvcm0ocGF0aCwgdW5pZm9ybU5hbWUsIHVuaWZvcm1WYWx1ZSkge1xuICAgIHZhciBjdXRvdXQgPSB0aGlzLmdldE9yU2V0Q3V0b3V0KHBhdGgpO1xuXG4gICAgdmFyIGluZGV4ID0gY3V0b3V0LnVuaWZvcm1LZXlzLmluZGV4T2YodW5pZm9ybU5hbWUpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodW5pZm9ybVZhbHVlKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdW5pZm9ybVZhbHVlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjdXRvdXQudW5pZm9ybVZhbHVlc1tpbmRleF1baV0gPSB1bmlmb3JtVmFsdWVbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGN1dG91dC51bmlmb3JtVmFsdWVzW2luZGV4XSA9IHVuaWZvcm1WYWx1ZTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEVkaXRzIHRoZSBvcHRpb25zIGZpZWxkIG9uIGEgbWVzaFxuICpcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiB0YXJnZXQgbWVzaFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgTWFwIG9mIGRyYXcgb3B0aW9ucyBmb3IgbWVzaFxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4qKi9cbldlYkdMUmVuZGVyZXIucHJvdG90eXBlLnNldE1lc2hPcHRpb25zID0gZnVuY3Rpb24ocGF0aCwgb3B0aW9ucykge1xuICAgIHZhciBtZXNoID0gdGhpcy5tZXNoUmVnaXN0cnlbcGF0aF0gfHwgdGhpcy5jcmVhdGVNZXNoKHBhdGgpO1xuXG4gICAgbWVzaC5vcHRpb25zID0gb3B0aW9ucztcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2hhbmdlcyB0aGUgY29sb3Igb2YgdGhlIGZpeGVkIGludGVuc2l0eSBsaWdodGluZyBpbiB0aGUgc2NlbmVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggUGF0aCB1c2VkIGFzIGlkIG9mIGxpZ2h0XG4gKiBAcGFyYW0ge051bWJlcn0gciByZWQgY2hhbm5lbFxuICogQHBhcmFtIHtOdW1iZXJ9IGcgZ3JlZW4gY2hhbm5lbFxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYmx1ZSBjaGFubmVsXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbioqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuc2V0QW1iaWVudExpZ2h0Q29sb3IgPSBmdW5jdGlvbiBzZXRBbWJpZW50TGlnaHRDb2xvcihwYXRoLCByLCBnLCBiKSB7XG4gICAgdGhpcy5hbWJpZW50TGlnaHRDb2xvclswXSA9IHI7XG4gICAgdGhpcy5hbWJpZW50TGlnaHRDb2xvclsxXSA9IGc7XG4gICAgdGhpcy5hbWJpZW50TGlnaHRDb2xvclsyXSA9IGI7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBsaWdodCBpbiB0aGUgc2NlbmVcbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggUGF0aCB1c2VkIGFzIGlkIG9mIGxpZ2h0XG4gKiBAcGFyYW0ge051bWJlcn0geCB4IHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0geSB5IHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0geiB6IHBvc2l0aW9uXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbioqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuc2V0TGlnaHRQb3NpdGlvbiA9IGZ1bmN0aW9uIHNldExpZ2h0UG9zaXRpb24ocGF0aCwgeCwgeSwgeikge1xuICAgIHZhciBsaWdodCA9IHRoaXMubGlnaHRSZWdpc3RyeVtwYXRoXSB8fCB0aGlzLmNyZWF0ZUxpZ2h0KHBhdGgpO1xuXG4gICAgbGlnaHQucG9zaXRpb25bMF0gPSB4O1xuICAgIGxpZ2h0LnBvc2l0aW9uWzFdID0geTtcbiAgICBsaWdodC5wb3NpdGlvblsyXSA9IHo7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgdGhlIGNvbG9yIG9mIGEgZHluYW1pYyBpbnRlbnNpdHkgbGlnaHRpbmcgaW4gdGhlIHNjZW5lXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiBsaWdodCBpbiBsaWdodCBSZWdpc3RyeS5cbiAqIEBwYXJhbSB7TnVtYmVyfSByIHJlZCBjaGFubmVsXG4gKiBAcGFyYW0ge051bWJlcn0gZyBncmVlbiBjaGFubmVsXG4gKiBAcGFyYW0ge051bWJlcn0gYiBibHVlIGNoYW5uZWxcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuKiovXG5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5zZXRMaWdodENvbG9yID0gZnVuY3Rpb24gc2V0TGlnaHRDb2xvcihwYXRoLCByLCBnLCBiKSB7XG4gICAgdmFyIGxpZ2h0ID0gdGhpcy5saWdodFJlZ2lzdHJ5W3BhdGhdIHx8IHRoaXMuY3JlYXRlTGlnaHQocGF0aCk7XG5cbiAgICBsaWdodC5jb2xvclswXSA9IHI7XG4gICAgbGlnaHQuY29sb3JbMV0gPSBnO1xuICAgIGxpZ2h0LmNvbG9yWzJdID0gYjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcGlsZXMgbWF0ZXJpYWwgc3BlYyBpbnRvIHByb2dyYW0gc2hhZGVyXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiBjdXRvdXQgaW4gY3V0b3V0IHJlZ2lzdHJ5LlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSB0aGF0IHRoZSByZW5kZXJpbmcgaW5wdXQgdGhlIG1hdGVyaWFsIGlzIGJvdW5kIHRvXG4gKiBAcGFyYW0ge09iamVjdH0gbWF0ZXJpYWwgTWF0ZXJpYWwgc3BlY1xuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4qKi9cbldlYkdMUmVuZGVyZXIucHJvdG90eXBlLmhhbmRsZU1hdGVyaWFsSW5wdXQgPSBmdW5jdGlvbiBoYW5kbGVNYXRlcmlhbElucHV0KHBhdGgsIG5hbWUsIG1hdGVyaWFsKSB7XG4gICAgdmFyIG1lc2ggPSB0aGlzLm1lc2hSZWdpc3RyeVtwYXRoXSB8fCB0aGlzLmNyZWF0ZU1lc2gocGF0aCk7XG4gICAgbWF0ZXJpYWwgPSBjb21waWxlTWF0ZXJpYWwobWF0ZXJpYWwsIG1lc2gudGV4dHVyZXMubGVuZ3RoKTtcblxuICAgIC8vIFNldCB1bmlmb3JtcyB0byBlbmFibGUgdGV4dHVyZSFcblxuICAgIG1lc2gudW5pZm9ybVZhbHVlc1ttZXNoLnVuaWZvcm1LZXlzLmluZGV4T2YobmFtZSldWzBdID0gLW1hdGVyaWFsLl9pZDtcblxuICAgIC8vIFJlZ2lzdGVyIHRleHR1cmVzIVxuXG4gICAgdmFyIGkgPSBtYXRlcmlhbC50ZXh0dXJlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBtZXNoLnRleHR1cmVzLnB1c2goXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVNYW5hZ2VyLnJlZ2lzdGVyKG1hdGVyaWFsLnRleHR1cmVzW2ldLCBtZXNoLnRleHR1cmVzLmxlbmd0aCArIGkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmVnaXN0ZXIgbWF0ZXJpYWwhXG5cbiAgICB0aGlzLnByb2dyYW0ucmVnaXN0ZXJNYXRlcmlhbChuYW1lLCBtYXRlcmlhbCk7XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGVTaXplKCk7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgdGhlIGdlb21ldHJ5IGRhdGEgb2YgYSBtZXNoXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFBhdGggdXNlZCBhcyBpZCBvZiBjdXRvdXQgaW4gY3V0b3V0IHJlZ2lzdHJ5LlxuICogQHBhcmFtIHtPYmplY3R9IGdlb21ldHJ5IEdlb21ldHJ5IG9iamVjdCBjb250YWluaW5nIHZlcnRleCBkYXRhIHRvIGJlIGRyYXduXG4gKiBAcGFyYW0ge051bWJlcn0gZHJhd1R5cGUgUHJpbWl0aXZlIGlkZW50aWZpZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZHluYW1pYyBXaGV0aGVyIGdlb21ldHJ5IGlzIGR5bmFtaWNcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuKiovXG5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5zZXRHZW9tZXRyeSA9IGZ1bmN0aW9uIHNldEdlb21ldHJ5KHBhdGgsIGdlb21ldHJ5LCBkcmF3VHlwZSwgZHluYW1pYykge1xuICAgIHZhciBtZXNoID0gdGhpcy5tZXNoUmVnaXN0cnlbcGF0aF0gfHwgdGhpcy5jcmVhdGVNZXNoKHBhdGgpO1xuXG4gICAgbWVzaC5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuICAgIG1lc2guZHJhd1R5cGUgPSBkcmF3VHlwZTtcbiAgICBtZXNoLmR5bmFtaWMgPSBkeW5hbWljO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFVwbG9hZHMgYSBuZXcgdmFsdWUgZm9yIHRoZSB1bmlmb3JtIGRhdGEgd2hlbiB0aGUgbWVzaCBpcyBiZWluZyBkcmF3blxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBQYXRoIHVzZWQgYXMgaWQgb2YgbWVzaCBpbiBtZXNoIHJlZ2lzdHJ5XG4gKiBAcGFyYW0ge1N0cmluZ30gdW5pZm9ybU5hbWUgSWRlbnRpZmllciB1c2VkIHRvIHVwbG9hZCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gdW5pZm9ybVZhbHVlIFZhbHVlIG9mIHVuaWZvcm0gZGF0YVxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4qKi9cbldlYkdMUmVuZGVyZXIucHJvdG90eXBlLnNldE1lc2hVbmlmb3JtID0gZnVuY3Rpb24gc2V0TWVzaFVuaWZvcm0ocGF0aCwgdW5pZm9ybU5hbWUsIHVuaWZvcm1WYWx1ZSkge1xuICAgIHZhciBtZXNoID0gdGhpcy5tZXNoUmVnaXN0cnlbcGF0aF0gfHwgdGhpcy5jcmVhdGVNZXNoKHBhdGgpO1xuXG4gICAgdmFyIGluZGV4ID0gbWVzaC51bmlmb3JtS2V5cy5pbmRleE9mKHVuaWZvcm1OYW1lKTtcblxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgbWVzaC51bmlmb3JtS2V5cy5wdXNoKHVuaWZvcm1OYW1lKTtcbiAgICAgICAgbWVzaC51bmlmb3JtVmFsdWVzLnB1c2godW5pZm9ybVZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1lc2gudW5pZm9ybVZhbHVlc1tpbmRleF0gPSB1bmlmb3JtVmFsdWU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgJ2RyYXcnIHBoYXNlIG9mIHRoZSBXZWJHTFJlbmRlcmVyLiBJdGVyYXRlcyB0aHJvdWdoIHJlZ2lzdHJpZXNcbiAqIHRvIHNldCB1bmlmb3Jtcywgc2V0IGF0dHJpYnV0ZXMgYW5kIGlzc3VlIGRyYXcgY29tbWFuZHMgZm9yIHJlbmRlcmFibGVzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBQYXRoIHVzZWQgYXMgaWQgb2YgbWVzaCBpbiBtZXNoIHJlZ2lzdHJ5XG4gKiBAcGFyYW0ge051bWJlcn0gZ2VvbWV0cnlJZCBJZCBvZiBnZW9tZXRyeSBpbiBnZW9tZXRyeSByZWdpc3RyeVxuICogQHBhcmFtIHtTdHJpbmd9IGJ1ZmZlck5hbWUgQXR0cmlidXRlIGxvY2F0aW9uIG5hbWVcbiAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlclZhbHVlIFZlcnRleCBkYXRhXG4gKiBAcGFyYW0ge051bWJlcn0gYnVmZmVyU3BhY2luZyBUaGUgZGltZW5zaW9ucyBvZiB0aGUgdmVydGV4XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzRHluYW1pYyBXaGV0aGVyIGdlb21ldHJ5IGlzIGR5bmFtaWNcbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5idWZmZXJEYXRhID0gZnVuY3Rpb24gYnVmZmVyRGF0YShwYXRoLCBnZW9tZXRyeUlkLCBidWZmZXJOYW1lLCBidWZmZXJWYWx1ZSwgYnVmZmVyU3BhY2luZywgaXNEeW5hbWljKSB7XG4gICAgdGhpcy5idWZmZXJSZWdpc3RyeS5hbGxvY2F0ZShnZW9tZXRyeUlkLCBidWZmZXJOYW1lLCBidWZmZXJWYWx1ZSwgYnVmZmVyU3BhY2luZywgaXNEeW5hbWljKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgJ2RyYXcnIHBoYXNlIG9mIHRoZSBXZWJHTFJlbmRlcmVyLiBJdGVyYXRlcyB0aHJvdWdoIHJlZ2lzdHJpZXNcbiAqIHRvIHNldCB1bmlmb3Jtcywgc2V0IGF0dHJpYnV0ZXMgYW5kIGlzc3VlIGRyYXcgY29tbWFuZHMgZm9yIHJlbmRlcmFibGVzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyU3RhdGUgUGFyYW1ldGVycyBwcm92aWRlZCBieSB0aGUgY29tcG9zaXRvciwgdGhhdCBhZmZlY3QgdGhlIHJlbmRlcmluZyBvZiBhbGwgcmVuZGVyYWJsZXMuXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIGRyYXcocmVuZGVyU3RhdGUpIHtcbiAgICB2YXIgdGltZSA9IHRoaXMuY29tcG9zaXRvci5nZXRUaW1lKCk7XG5cbiAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgdGhpcy50ZXh0dXJlTWFuYWdlci51cGRhdGUodGltZSk7XG5cbiAgICB0aGlzLm1lc2hSZWdpc3RyeUtleXMgPSBzb3J0ZXIodGhpcy5tZXNoUmVnaXN0cnlLZXlzLCB0aGlzLm1lc2hSZWdpc3RyeSk7XG5cbiAgICB0aGlzLnNldEdsb2JhbFVuaWZvcm1zKHJlbmRlclN0YXRlKTtcbiAgICB0aGlzLmRyYXdDdXRvdXRzKCk7XG4gICAgdGhpcy5kcmF3TWVzaGVzKCk7XG59O1xuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggYW5kIGRyYXdzIGFsbCByZWdpc3RlcmVkIG1lc2hlcy4gVGhpcyBpbmNsdWRlc1xuICogYmluZGluZyB0ZXh0dXJlcywgaGFuZGxpbmcgZHJhdyBvcHRpb25zLCBzZXR0aW5nIG1lc2ggdW5pZm9ybXNcbiAqIGFuZCBkcmF3aW5nIG1lc2ggYnVmZmVycy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuZHJhd01lc2hlcyA9IGZ1bmN0aW9uIGRyYXdNZXNoZXMoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcbiAgICB2YXIgYnVmZmVycztcbiAgICB2YXIgbWVzaDtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLm1lc2hSZWdpc3RyeUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWVzaCA9IHRoaXMubWVzaFJlZ2lzdHJ5W3RoaXMubWVzaFJlZ2lzdHJ5S2V5c1tpXV07XG4gICAgICAgIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlclJlZ2lzdHJ5LnJlZ2lzdHJ5W21lc2guZ2VvbWV0cnldO1xuXG4gICAgICAgIGlmICghbWVzaC52aXNpYmxlKSBjb250aW51ZTtcblxuICAgICAgICBpZiAobWVzaC51bmlmb3JtVmFsdWVzWzBdIDwgMSkge1xuICAgICAgICAgICAgZ2wuZGVwdGhNYXNrKGZhbHNlKTtcbiAgICAgICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XG4gICAgICAgICAgICBnbC5kaXNhYmxlKGdsLkJMRU5EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYnVmZmVycykgY29udGludWU7XG5cbiAgICAgICAgdmFyIGogPSBtZXNoLnRleHR1cmVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGotLSkgdGhpcy50ZXh0dXJlTWFuYWdlci5iaW5kVGV4dHVyZShtZXNoLnRleHR1cmVzW2pdKTtcblxuICAgICAgICBpZiAobWVzaC5vcHRpb25zKSB0aGlzLmhhbmRsZU9wdGlvbnMobWVzaC5vcHRpb25zLCBtZXNoKTtcblxuICAgICAgICB0aGlzLnByb2dyYW0uc2V0VW5pZm9ybXMobWVzaC51bmlmb3JtS2V5cywgbWVzaC51bmlmb3JtVmFsdWVzKTtcbiAgICAgICAgdGhpcy5kcmF3QnVmZmVycyhidWZmZXJzLCBtZXNoLmRyYXdUeXBlLCBtZXNoLmdlb21ldHJ5KTtcblxuICAgICAgICBpZiAobWVzaC5vcHRpb25zKSB0aGlzLnJlc2V0T3B0aW9ucyhtZXNoLm9wdGlvbnMpO1xuICAgIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBhbmQgZHJhd3MgYWxsIHJlZ2lzdGVyZWQgY3V0b3V0IG1lc2hlcy4gQmxlbmRpbmdcbiAqIGlzIGRpc2FibGVkLCBjdXRvdXQgdW5pZm9ybXMgYXJlIHNldCBhbmQgZmluYWxseSBidWZmZXJzIGFyZSBkcmF3bi5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuZHJhd0N1dG91dHMgPSBmdW5jdGlvbiBkcmF3Q3V0b3V0cygpIHtcbiAgICB2YXIgY3V0b3V0O1xuICAgIHZhciBidWZmZXJzO1xuICAgIHZhciBsZW4gPSB0aGlzLmN1dG91dFJlZ2lzdHJ5S2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuKSB7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgICAgICB0aGlzLmdsLmRlcHRoTWFzayh0cnVlKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGN1dG91dCA9IHRoaXMuY3V0b3V0UmVnaXN0cnlbdGhpcy5jdXRvdXRSZWdpc3RyeUtleXNbaV1dO1xuICAgICAgICBidWZmZXJzID0gdGhpcy5idWZmZXJSZWdpc3RyeS5yZWdpc3RyeVtjdXRvdXQuZ2VvbWV0cnldO1xuXG4gICAgICAgIGlmICghY3V0b3V0LnZpc2libGUpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbS5zZXRVbmlmb3JtcyhjdXRvdXQudW5pZm9ybUtleXMsIGN1dG91dC51bmlmb3JtVmFsdWVzKTtcbiAgICAgICAgdGhpcy5kcmF3QnVmZmVycyhidWZmZXJzLCBjdXRvdXQuZHJhd1R5cGUsIGN1dG91dC5nZW9tZXRyeSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHVuaWZvcm1zIHRvIGJlIHNoYXJlZCBieSBhbGwgbWVzaGVzLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyU3RhdGUgRHJhdyBzdGF0ZSBvcHRpb25zIHBhc3NlZCBkb3duIGZyb20gY29tcG9zaXRvci5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5zZXRHbG9iYWxVbmlmb3JtcyA9IGZ1bmN0aW9uIHNldEdsb2JhbFVuaWZvcm1zKHJlbmRlclN0YXRlKSB7XG4gICAgdmFyIGxpZ2h0O1xuICAgIHZhciBzdHJpZGU7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5saWdodFJlZ2lzdHJ5S2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsaWdodCA9IHRoaXMubGlnaHRSZWdpc3RyeVt0aGlzLmxpZ2h0UmVnaXN0cnlLZXlzW2ldXTtcbiAgICAgICAgc3RyaWRlID0gaSAqIDQ7XG5cbiAgICAgICAgLy8gQnVpbGQgdGhlIGxpZ2h0IHBvc2l0aW9ucycgNHg0IG1hdHJpeFxuXG4gICAgICAgIHRoaXMubGlnaHRQb3NpdGlvbnNbMCArIHN0cmlkZV0gPSBsaWdodC5wb3NpdGlvblswXTtcbiAgICAgICAgdGhpcy5saWdodFBvc2l0aW9uc1sxICsgc3RyaWRlXSA9IGxpZ2h0LnBvc2l0aW9uWzFdO1xuICAgICAgICB0aGlzLmxpZ2h0UG9zaXRpb25zWzIgKyBzdHJpZGVdID0gbGlnaHQucG9zaXRpb25bMl07XG5cbiAgICAgICAgLy8gQnVpbGQgdGhlIGxpZ2h0IGNvbG9ycycgNHg0IG1hdHJpeFxuXG4gICAgICAgIHRoaXMubGlnaHRDb2xvcnNbMCArIHN0cmlkZV0gPSBsaWdodC5jb2xvclswXTtcbiAgICAgICAgdGhpcy5saWdodENvbG9yc1sxICsgc3RyaWRlXSA9IGxpZ2h0LmNvbG9yWzFdO1xuICAgICAgICB0aGlzLmxpZ2h0Q29sb3JzWzIgKyBzdHJpZGVdID0gbGlnaHQuY29sb3JbMl07XG4gICAgfVxuXG4gICAgZ2xvYmFsVW5pZm9ybXMudmFsdWVzWzBdID0gdGhpcy5udW1MaWdodHM7XG4gICAgZ2xvYmFsVW5pZm9ybXMudmFsdWVzWzFdID0gdGhpcy5hbWJpZW50TGlnaHRDb2xvcjtcbiAgICBnbG9iYWxVbmlmb3Jtcy52YWx1ZXNbMl0gPSB0aGlzLmxpZ2h0UG9zaXRpb25zO1xuICAgIGdsb2JhbFVuaWZvcm1zLnZhbHVlc1szXSA9IHRoaXMubGlnaHRDb2xvcnM7XG5cbiAgICAvKlxuICAgICAqIFNldCB0aW1lIGFuZCBwcm9qZWN0aW9uIHVuaWZvcm1zXG4gICAgICogcHJvamVjdGluZyB3b3JsZCBzcGFjZSBpbnRvIGEgMmQgcGxhbmUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBUaGUgeCBhbmQgeSBzY2FsZSAodGhpcy5wcm9qZWN0aW9uVHJhbnNmb3JtWzBdIGFuZCB0aGlzLnByb2plY3Rpb25UcmFuc2Zvcm1bNV0gcmVzcGVjdGl2ZWx5KVxuICAgICAqIGNvbnZlcnQgdGhlIHByb2plY3RlZCBnZW9tZXRyeSBiYWNrIGludG8gY2xpcHNwYWNlLlxuICAgICAqIFRoZSBwZXJwZWN0aXZlIGRpdmlkZSAodGhpcy5wcm9qZWN0aW9uVHJhbnNmb3JtWzExXSksIGFkZHMgdGhlIHogdmFsdWUgb2YgdGhlIHBvaW50XG4gICAgICogbXVsdGlwbGllZCBieSB0aGUgcGVyc3BlY3RpdmUgZGl2aWRlIHRvIHRoZSB3IHZhbHVlIG9mIHRoZSBwb2ludC4gSW4gdGhlIHByb2Nlc3NcbiAgICAgKiBvZiBjb252ZXJ0aW5nIGZyb20gaG9tb2dlbm91cyBjb29yZGluYXRlcyB0byBOREMgKG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGVzKVxuICAgICAqIHRoZSB4IGFuZCB5IHZhbHVlcyBvZiB0aGUgcG9pbnQgYXJlIGRpdmlkZWQgYnkgdywgd2hpY2ggaW1wbGVtZW50cyBwZXJzcGVjdGl2ZS5cbiAgICAgKi9cbiAgICB0aGlzLnByb2plY3Rpb25UcmFuc2Zvcm1bMF0gPSAxIC8gKHRoaXMuY2FjaGVkU2l6ZVswXSAqIDAuNSk7XG4gICAgdGhpcy5wcm9qZWN0aW9uVHJhbnNmb3JtWzVdID0gLTEgLyAodGhpcy5jYWNoZWRTaXplWzFdICogMC41KTtcbiAgICB0aGlzLnByb2plY3Rpb25UcmFuc2Zvcm1bMTFdID0gcmVuZGVyU3RhdGUucGVyc3BlY3RpdmVUcmFuc2Zvcm1bMTFdO1xuXG4gICAgZ2xvYmFsVW5pZm9ybXMudmFsdWVzWzRdID0gdGhpcy5wcm9qZWN0aW9uVHJhbnNmb3JtO1xuICAgIGdsb2JhbFVuaWZvcm1zLnZhbHVlc1s1XSA9IHRoaXMuY29tcG9zaXRvci5nZXRUaW1lKCkgKiAwLjAwMTtcbiAgICBnbG9iYWxVbmlmb3Jtcy52YWx1ZXNbNl0gPSByZW5kZXJTdGF0ZS52aWV3VHJhbnNmb3JtO1xuXG4gICAgdGhpcy5wcm9ncmFtLnNldFVuaWZvcm1zKGdsb2JhbFVuaWZvcm1zLmtleXMsIGdsb2JhbFVuaWZvcm1zLnZhbHVlcyk7XG59O1xuXG4vKipcbiAqIExvYWRzIHRoZSBidWZmZXJzIGFuZCBpc3N1ZXMgdGhlIGRyYXcgY29tbWFuZCBmb3IgYSBnZW9tZXRyeS5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZlcnRleEJ1ZmZlcnMgQWxsIGJ1ZmZlcnMgdXNlZCB0byBkcmF3IHRoZSBnZW9tZXRyeS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBtb2RlIEVudW1lcmF0b3IgZGVmaW5pbmcgd2hhdCBwcmltaXRpdmUgdG8gZHJhd1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkIElEIG9mIGdlb21ldHJ5IGJlaW5nIGRyYXduLlxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbldlYkdMUmVuZGVyZXIucHJvdG90eXBlLmRyYXdCdWZmZXJzID0gZnVuY3Rpb24gZHJhd0J1ZmZlcnModmVydGV4QnVmZmVycywgbW9kZSwgaWQpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuICAgIHZhciBsZW5ndGggPSAwO1xuICAgIHZhciBhdHRyaWJ1dGU7XG4gICAgdmFyIGxvY2F0aW9uO1xuICAgIHZhciBzcGFjaW5nO1xuICAgIHZhciBvZmZzZXQ7XG4gICAgdmFyIGJ1ZmZlcjtcbiAgICB2YXIgaXRlcjtcbiAgICB2YXIgajtcbiAgICB2YXIgaTtcblxuICAgIGl0ZXIgPSB2ZXJ0ZXhCdWZmZXJzLmtleXMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBpdGVyOyBpKyspIHtcbiAgICAgICAgYXR0cmlidXRlID0gdmVydGV4QnVmZmVycy5rZXlzW2ldO1xuXG4gICAgICAgIC8vIERvIG5vdCBzZXQgdmVydGV4QXR0cmliUG9pbnRlciBpZiBpbmRleCBidWZmZXIuXG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ2luZGljZXMnKSB7XG4gICAgICAgICAgICBqID0gaTsgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXRyZWl2ZSB0aGUgYXR0cmlidXRlIGxvY2F0aW9uIGFuZCBtYWtlIHN1cmUgaXQgaXMgZW5hYmxlZC5cblxuICAgICAgICBsb2NhdGlvbiA9IHRoaXMucHJvZ3JhbS5hdHRyaWJ1dGVMb2NhdGlvbnNbYXR0cmlidXRlXTtcblxuICAgICAgICBpZiAobG9jYXRpb24gPT09IC0xKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLnByb2dyYW0sIGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0uYXR0cmlidXRlTG9jYXRpb25zW2F0dHJpYnV0ZV0gPSBsb2NhdGlvbjtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVuYWJsZWRBdHRyaWJ1dGVzW2F0dHJpYnV0ZV0pIHtcbiAgICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZW5hYmxlZEF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmVuYWJsZWRBdHRyaWJ1dGVzS2V5cy5wdXNoKGF0dHJpYnV0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXRyZWl2ZSBidWZmZXIgaW5mb3JtYXRpb24gdXNlZCB0byBzZXQgYXR0cmlidXRlIHBvaW50ZXIuXG5cbiAgICAgICAgYnVmZmVyID0gdmVydGV4QnVmZmVycy52YWx1ZXNbaV07XG4gICAgICAgIHNwYWNpbmcgPSB2ZXJ0ZXhCdWZmZXJzLnNwYWNpbmdbaV07XG4gICAgICAgIG9mZnNldCA9IHZlcnRleEJ1ZmZlcnMub2Zmc2V0W2ldO1xuICAgICAgICBsZW5ndGggPSB2ZXJ0ZXhCdWZmZXJzLmxlbmd0aFtpXTtcblxuICAgICAgICAvLyBTa2lwIGJpbmRCdWZmZXIgaWYgYnVmZmVyIGlzIGN1cnJlbnRseSBib3VuZC5cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5ib3VuZEFycmF5QnVmZmVyICE9PSBidWZmZXIpIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoYnVmZmVyLnRhcmdldCwgYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmJvdW5kQXJyYXlCdWZmZXIgPSBidWZmZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5sYXN0RHJhd24gIT09IGlkKSB7XG4gICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBzcGFjaW5nLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDQgKiBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSBhbnkgYXR0cmlidXRlcyB0aGF0IG5vdCBjdXJyZW50bHkgYmVpbmcgdXNlZC5cblxuICAgIHZhciBsZW4gPSB0aGlzLnN0YXRlLmVuYWJsZWRBdHRyaWJ1dGVzS2V5cy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLnN0YXRlLmVuYWJsZWRBdHRyaWJ1dGVzS2V5c1tpXTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW5hYmxlZEF0dHJpYnV0ZXNba2V5XSAmJiB2ZXJ0ZXhCdWZmZXJzLmtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucHJvZ3JhbS5hdHRyaWJ1dGVMb2NhdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmVuYWJsZWRBdHRyaWJ1dGVzW2tleV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChsZW5ndGgpIHtcblxuICAgICAgICAvLyBJZiBpbmRleCBidWZmZXIsIHVzZSBkcmF3RWxlbWVudHMuXG5cbiAgICAgICAgaWYgKGogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnVmZmVyID0gdmVydGV4QnVmZmVycy52YWx1ZXNbal07XG4gICAgICAgICAgICBvZmZzZXQgPSB2ZXJ0ZXhCdWZmZXJzLm9mZnNldFtqXTtcbiAgICAgICAgICAgIHNwYWNpbmcgPSB2ZXJ0ZXhCdWZmZXJzLnNwYWNpbmdbal07XG4gICAgICAgICAgICBsZW5ndGggPSB2ZXJ0ZXhCdWZmZXJzLmxlbmd0aFtqXTtcblxuICAgICAgICAgICAgLy8gU2tpcCBiaW5kQnVmZmVyIGlmIGJ1ZmZlciBpcyBjdXJyZW50bHkgYm91bmQuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmJvdW5kRWxlbWVudEJ1ZmZlciAhPT0gYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihidWZmZXIudGFyZ2V0LCBidWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmJvdW5kRWxlbWVudEJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsW21vZGVdLCBsZW5ndGgsIGdsLlVOU0lHTkVEX1NIT1JULCAyICogb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXMoZ2xbbW9kZV0sIDAsIGxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmxhc3REcmF3biA9IGlkO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHBhcmVudCBjYW52YXMsIHNldHMgdGhlIHZpZXdwb3J0IHNpemUgb25cbiAqIHRoZSBXZWJHTCBjb250ZXh0IGFuZCB1cGRhdGVzIHRoZSByZXNvbHV0aW9uIHVuaWZvcm0gZm9yIHRoZSBzaGFkZXIgcHJvZ3JhbS5cbiAqIFNpemUgaXMgcmV0cmVpdmVkIGZyb20gdGhlIGNvbnRhaW5lciBvYmplY3Qgb2YgdGhlIHJlbmRlcmVyLlxuICpcbiAqIEBtZXRob2RcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzaXplIHdpZHRoLCBoZWlnaHQgYW5kIGRlcHRoIG9mIGNhbnZhc1xuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbldlYkdMUmVuZGVyZXIucHJvdG90eXBlLnVwZGF0ZVNpemUgPSBmdW5jdGlvbiB1cGRhdGVTaXplKHNpemUpIHtcbiAgICBpZiAoc2l6ZSkge1xuICAgICAgICB0aGlzLmNhY2hlZFNpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICB0aGlzLmNhY2hlZFNpemVbMV0gPSBzaXplWzFdO1xuICAgICAgICB0aGlzLmNhY2hlZFNpemVbMl0gPSAoc2l6ZVswXSA+IHNpemVbMV0pID8gc2l6ZVswXSA6IHNpemVbMV07XG4gICAgfVxuXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmNhY2hlZFNpemVbMF0sIHRoaXMuY2FjaGVkU2l6ZVsxXSk7XG5cbiAgICB0aGlzLnJlc29sdXRpb25WYWx1ZXNbMF0gPSB0aGlzLmNhY2hlZFNpemU7XG4gICAgdGhpcy5wcm9ncmFtLnNldFVuaWZvcm1zKHRoaXMucmVzb2x1dGlvbk5hbWUsIHRoaXMucmVzb2x1dGlvblZhbHVlcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgc3RhdGUgb2YgdGhlIFdlYkdMIGRyYXdpbmcgY29udGV4dCBiYXNlZCBvbiBjdXN0b20gcGFyYW1ldGVyc1xuICogZGVmaW5lZCBvbiBhIG1lc2guXG4gKlxuICogQG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIERyYXcgc3RhdGUgb3B0aW9ucyB0byBiZSBzZXQgdG8gdGhlIGNvbnRleHQuXG4gKiBAcGFyYW0ge01lc2h9IG1lc2ggQXNzb2NpYXRlZCBNZXNoXG4gKlxuICogQHJldHVybiB7dW5kZWZpbmVkfSB1bmRlZmluZWRcbiAqL1xuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuaGFuZGxlT3B0aW9ucyA9IGZ1bmN0aW9uIGhhbmRsZU9wdGlvbnMob3B0aW9ucywgbWVzaCkge1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgaWYgKCFvcHRpb25zKSByZXR1cm47XG5cbiAgICBpZiAob3B0aW9ucy5zaWRlID09PSAnZG91YmxlJykge1xuICAgICAgICB0aGlzLmdsLmN1bGxGYWNlKHRoaXMuZ2wuRlJPTlQpO1xuICAgICAgICB0aGlzLmRyYXdCdWZmZXJzKHRoaXMuYnVmZmVyUmVnaXN0cnkucmVnaXN0cnlbbWVzaC5nZW9tZXRyeV0sIG1lc2guZHJhd1R5cGUsIG1lc2guZ2VvbWV0cnkpO1xuICAgICAgICB0aGlzLmdsLmN1bGxGYWNlKHRoaXMuZ2wuQkFDSyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuYmxlbmRpbmcpIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORSk7XG4gICAgaWYgKG9wdGlvbnMuc2lkZSA9PT0gJ2JhY2snKSBnbC5jdWxsRmFjZShnbC5GUk9OVCk7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0aGUgc3RhdGUgb2YgdGhlIFdlYkdMIGRyYXdpbmcgY29udGV4dCB0byBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAbWV0aG9kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRHJhdyBzdGF0ZSBvcHRpb25zIHRvIGJlIHNldCB0byB0aGUgY29udGV4dC5cbiAqXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IHVuZGVmaW5lZFxuICovXG5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5yZXNldE9wdGlvbnMgPSBmdW5jdGlvbiByZXNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgaWYgKCFvcHRpb25zKSByZXR1cm47XG4gICAgaWYgKG9wdGlvbnMuYmxlbmRpbmcpIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIGlmIChvcHRpb25zLnNpZGUgPT09ICdiYWNrJykgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG59O1xuXG5XZWJHTFJlbmRlcmVyLkRFRkFVTFRfU1RZTEVTID0ge1xuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6IDEsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBsZWZ0OiAnMHB4J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJHTFJlbmRlcmVyO1xuIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRmFtb3VzIEluZHVzdHJpZXMgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHR5cGVzID0ge1xuICAgIDE6ICdmbG9hdCAnLFxuICAgIDI6ICd2ZWMyICcsXG4gICAgMzogJ3ZlYzMgJyxcbiAgICA0OiAndmVjNCAnXG59O1xuXG4vKipcbiAqIFRyYXZlcnNlcyBtYXRlcmlhbCB0byBjcmVhdGUgYSBzdHJpbmcgb2YgZ2xzbCBjb2RlIHRvIGJlIGFwcGxpZWQgaW5cbiAqIHRoZSB2ZXJ0ZXggb3IgZnJhZ21lbnQgc2hhZGVyLlxuICpcbiAqIEBtZXRob2RcbiAqIEBwcm90ZWN0ZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbWF0ZXJpYWwgTWF0ZXJpYWwgdG8gYmUgY29tcGlsZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gdGV4dHVyZVNsb3QgTmV4dCBhdmFpbGFibGUgdGV4dHVyZSBzbG90IGZvciBNZXNoLlxuICpcbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGVNYXRlcmlhbChtYXRlcmlhbCwgdGV4dHVyZVNsb3QpIHtcbiAgICB2YXIgZ2xzbCA9ICcnO1xuICAgIHZhciB1bmlmb3JtcyA9IHt9O1xuICAgIHZhciB2YXJ5aW5ncyA9IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0ge307XG4gICAgdmFyIGRlZmluZXMgPSBbXTtcbiAgICB2YXIgdGV4dHVyZXMgPSBbXTtcblxuICAgIF90cmF2ZXJzZShtYXRlcmlhbCwgZnVuY3Rpb24gKG5vZGUsIGRlcHRoKSB7XG4gICAgICAgIGlmICghIG5vZGUuY2h1bmspIHJldHVybjtcblxuICAgICAgICB2YXIgdHlwZSA9IHR5cGVzW19nZXRPdXRwdXRMZW5ndGgobm9kZSldO1xuICAgICAgICB2YXIgbGFiZWwgPSBfbWFrZUxhYmVsKG5vZGUpO1xuICAgICAgICB2YXIgb3V0cHV0ID0gX3Byb2Nlc3NHTFNMKG5vZGUuY2h1bmsuZ2xzbCwgbm9kZS5pbnB1dHMsIHRleHR1cmVzLmxlbmd0aCArIHRleHR1cmVTbG90KTtcblxuICAgICAgICBnbHNsICs9IHR5cGUgKyBsYWJlbCArICcgPSAnICsgb3V0cHV0ICsgJ1xcbiAnO1xuXG4gICAgICAgIGlmIChub2RlLnVuaWZvcm1zKSBfZXh0ZW5kKHVuaWZvcm1zLCBub2RlLnVuaWZvcm1zKTtcbiAgICAgICAgaWYgKG5vZGUudmFyeWluZ3MpIF9leHRlbmQodmFyeWluZ3MsIG5vZGUudmFyeWluZ3MpO1xuICAgICAgICBpZiAobm9kZS5hdHRyaWJ1dGVzKSBfZXh0ZW5kKGF0dHJpYnV0ZXMsIG5vZGUuYXR0cmlidXRlcyk7XG4gICAgICAgIGlmIChub2RlLmNodW5rLmRlZmluZXMpIGRlZmluZXMucHVzaChub2RlLmNodW5rLmRlZmluZXMpO1xuICAgICAgICBpZiAobm9kZS50ZXh0dXJlKSB0ZXh0dXJlcy5wdXNoKG5vZGUudGV4dHVyZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBfaWQ6IG1hdGVyaWFsLl9pZCxcbiAgICAgICAgZ2xzbDogZ2xzbCArICdyZXR1cm4gJyArIF9tYWtlTGFiZWwobWF0ZXJpYWwpICsgJzsnLFxuICAgICAgICBkZWZpbmVzOiBkZWZpbmVzLmpvaW4oJ1xcbicpLFxuICAgICAgICB1bmlmb3JtczogdW5pZm9ybXMsXG4gICAgICAgIHZhcnlpbmdzOiB2YXJ5aW5ncyxcbiAgICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyxcbiAgICAgICAgdGV4dHVyZXM6IHRleHR1cmVzXG4gICAgfTtcbn1cblxuLy8gUmVjdXJzaXZlbHkgaXRlcmF0ZXMgb3ZlciBhIG1hdGVyaWFsJ3MgaW5wdXRzLCBpbnZva2luZyBhIGdpdmVuIGNhbGxiYWNrXG4vLyB3aXRoIHRoZSBjdXJyZW50IG1hdGVyaWFsXG5mdW5jdGlvbiBfdHJhdmVyc2UobWF0ZXJpYWwsIGNhbGxiYWNrKSB7XG5cdHZhciBpbnB1dHMgPSBtYXRlcmlhbC5pbnB1dHM7XG4gICAgdmFyIGxlbiA9IGlucHV0cyAmJiBpbnB1dHMubGVuZ3RoO1xuICAgIHZhciBpZHggPSAtMTtcblxuICAgIHdoaWxlICgrK2lkeCA8IGxlbikgX3RyYXZlcnNlKGlucHV0c1tpZHhdLCBjYWxsYmFjayk7XG5cbiAgICBjYWxsYmFjayhtYXRlcmlhbCk7XG5cbiAgICByZXR1cm4gbWF0ZXJpYWw7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB1c2VkIHRvIGluZmVyIGxlbmd0aCBvZiB0aGUgb3V0cHV0XG4vLyBmcm9tIGEgZ2l2ZW4gbWF0ZXJpYWwgbm9kZS5cbmZ1bmN0aW9uIF9nZXRPdXRwdXRMZW5ndGgobm9kZSkge1xuXG4gICAgLy8gSGFuZGxlIGNvbnN0YW50IHZhbHVlc1xuXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnbnVtYmVyJykgcmV0dXJuIDE7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHJldHVybiBub2RlLmxlbmd0aDtcblxuICAgIC8vIEhhbmRsZSBtYXRlcmlhbHNcblxuICAgIHZhciBvdXRwdXQgPSBub2RlLmNodW5rLm91dHB1dDtcbiAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gJ251bWJlcicpIHJldHVybiBvdXRwdXQ7XG5cbiAgICAvLyBIYW5kbGUgcG9seW1vcnBoaWMgb3V0cHV0XG5cbiAgICB2YXIga2V5ID0gbm9kZS5pbnB1dHMubWFwKGZ1bmN0aW9uIHJlY3Vyc2Uobm9kZSkge1xuICAgICAgICByZXR1cm4gX2dldE91dHB1dExlbmd0aChub2RlKTtcbiAgICB9KS5qb2luKCcsJyk7XG5cbiAgICByZXR1cm4gb3V0cHV0W2tleV07XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBydW4gcmVwbGFjZSBpbnB1dHMgYW5kIHRleHR1cmUgdGFncyB3aXRoXG4vLyBjb3JyZWN0IGdsc2wuXG5mdW5jdGlvbiBfcHJvY2Vzc0dMU0woc3RyLCBpbnB1dHMsIHRleHR1cmVTbG90KSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAucmVwbGFjZSgvJVxcZC9nLCBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIF9tYWtlTGFiZWwoaW5wdXRzW3NbMV0tMV0pO1xuICAgICAgICB9KVxuICAgICAgICAucmVwbGFjZSgvXFwkVEVYVFVSRS8sICd1X3RleHR1cmVzWycgKyB0ZXh0dXJlU2xvdCArICddJyk7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB1c2VkIHRvIGNyZWF0ZSBnbHNsIGRlZmluaXRpb24gb2YgdGhlXG4vLyBpbnB1dCBtYXRlcmlhbCBub2RlLlxuZnVuY3Rpb24gX21ha2VMYWJlbCAobikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG4pKSByZXR1cm4gX2FycmF5VG9WZWMobik7XG4gICAgaWYgKHR5cGVvZiBuID09PSAnb2JqZWN0JykgcmV0dXJuICdmYV8nICsgKG4uX2lkKTtcbiAgICBlbHNlIHJldHVybiBuLnRvRml4ZWQoNik7XG59XG5cbi8vIEhlbHBlciB0byBjb3B5IHRoZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBvbnRvIGFub3RoZXIgb2JqZWN0LlxuZnVuY3Rpb24gX2V4dGVuZCAoYSwgYikge1xuXHRmb3IgKHZhciBrIGluIGIpIGFba10gPSBiW2tdO1xufVxuXG4vLyBIZWxwZXIgdG8gY3JlYXRlIGdsc2wgdmVjdG9yIHJlcHJlc2VudGF0aW9uIG9mIGEgamF2YXNjcmlwdCBhcnJheS5cbmZ1bmN0aW9uIF9hcnJheVRvVmVjKGFycmF5KSB7XG4gICAgdmFyIGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICByZXR1cm4gJ3ZlYycgKyBsZW4gKyAnKCcgKyBhcnJheS5qb2luKCcsJykgICsgJyknO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVNYXRlcmlhbDtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gR2VuZXJhdGVzIGEgY2hlY2tlcmJvYXJkIHBhdHRlcm4gdG8gYmUgdXNlZCBhcyBhIHBsYWNlaG9sZGVyIHRleHR1cmUgd2hpbGUgYW5cbi8vIGltYWdlIGxvYWRzIG92ZXIgdGhlIG5ldHdvcmsuXG5mdW5jdGlvbiBjcmVhdGVDaGVja2VyQm9hcmQoKSB7XG4gICAgdmFyIGNvbnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gMTI4O1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgY29udGV4dC5jYW52YXMuaGVpZ2h0OyB5ICs9IDE2KSB7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgY29udGV4dC5jYW52YXMud2lkdGg7IHggKz0gMTYpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gKHggXiB5KSAmIDE2ID8gJyNGRkYnIDogJyNEREQnO1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCh4LCB5LCAxNiwgMTYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQuY2FudmFzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNoZWNrZXJCb2FyZDtcbiIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IEZhbW91cyBJbmR1c3RyaWVzIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciByYWRpeEJpdHMgPSAxMSxcbiAgICBtYXhSYWRpeCA9IDEgPDwgKHJhZGl4Qml0cyksXG4gICAgcmFkaXhNYXNrID0gbWF4UmFkaXggLSAxLFxuICAgIGJ1Y2tldHMgPSBuZXcgQXJyYXkobWF4UmFkaXggKiBNYXRoLmNlaWwoNjQgLyByYWRpeEJpdHMpKSxcbiAgICBtc2JNYXNrID0gMSA8PCAoKDMyIC0gMSkgJSByYWRpeEJpdHMpLFxuICAgIGxhc3RNYXNrID0gKG1zYk1hc2sgPDwgMSkgLSAxLFxuICAgIHBhc3NDb3VudCA9ICgoMzIgLyByYWRpeEJpdHMpICsgMC45OTk5OTk5OTk5OTk5OTkpIHwgMCxcbiAgICBtYXhPZmZzZXQgPSBtYXhSYWRpeCAqIChwYXNzQ291bnQgLSAxKSxcbiAgICBub3JtYWxpemVyID0gTWF0aC5wb3coMjAsIDYpO1xuXG52YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDQpO1xudmFyIGZsb2F0VmlldyA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyLCAwLCAxKTtcbnZhciBpbnRWaWV3ID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCAwLCAxKTtcblxuLy8gY29tcGFyYXRvciBwdWxscyByZWxldmFudCBzb3J0aW5nIGtleXMgb3V0IG9mIG1lc2hcbmZ1bmN0aW9uIGNvbXAobGlzdCwgcmVnaXN0cnksIGkpIHtcbiAgICB2YXIga2V5ID0gbGlzdFtpXTtcbiAgICB2YXIgaXRlbSA9IHJlZ2lzdHJ5W2tleV07XG4gICAgcmV0dXJuIChpdGVtLmRlcHRoID8gaXRlbS5kZXB0aCA6IHJlZ2lzdHJ5W2tleV0udW5pZm9ybVZhbHVlc1sxXVsxNF0pICsgbm9ybWFsaXplcjtcbn1cblxuLy9tdXRhdG9yIGZ1bmN0aW9uIHJlY29yZHMgbWVzaCdzIHBsYWNlIGluIHByZXZpb3VzIHBhc3NcbmZ1bmN0aW9uIG11dGF0b3IobGlzdCwgcmVnaXN0cnksIGksIHZhbHVlKSB7XG4gICAgdmFyIGtleSA9IGxpc3RbaV07XG4gICAgcmVnaXN0cnlba2V5XS5kZXB0aCA9IGludFRvRmxvYXQodmFsdWUpIC0gbm9ybWFsaXplcjtcbiAgICByZXR1cm4ga2V5O1xufVxuXG4vL2NsZWFuIGZ1bmN0aW9uIHJlbW92ZXMgbXV0YXRvciBmdW5jdGlvbidzIHJlY29yZFxuZnVuY3Rpb24gY2xlYW4obGlzdCwgcmVnaXN0cnksIGkpIHtcbiAgICByZWdpc3RyeVtsaXN0W2ldXS5kZXB0aCA9IG51bGw7XG59XG5cbi8vY29udmVydHMgYSBqYXZhc2NyaXB0IGZsb2F0IHRvIGEgMzJiaXQgaW50ZWdlciB1c2luZyBhbiBhcnJheSBidWZmZXJcbi8vb2Ygc2l6ZSBvbmVcbmZ1bmN0aW9uIGZsb2F0VG9JbnQoaykge1xuICAgIGZsb2F0Vmlld1swXSA9IGs7XG4gICAgcmV0dXJuIGludFZpZXdbMF07XG59XG4vL2NvbnZlcnRzIGEgMzIgYml0IGludGVnZXIgdG8gYSByZWd1bGFyIGphdmFzY3JpcHQgZmxvYXQgdXNpbmcgYW4gYXJyYXkgYnVmZmVyXG4vL29mIHNpemUgb25lXG5mdW5jdGlvbiBpbnRUb0Zsb2F0KGspIHtcbiAgICBpbnRWaWV3WzBdID0gaztcbiAgICByZXR1cm4gZmxvYXRWaWV3WzBdO1xufVxuXG4vL3NvcnRzIGEgbGlzdCBvZiBtZXNoIElEcyBhY2NvcmRpbmcgdG8gdGhlaXIgei1kZXB0aFxuZnVuY3Rpb24gcmFkaXhTb3J0KGxpc3QsIHJlZ2lzdHJ5KSB7XG4gICAgdmFyIHBhc3MgPSAwO1xuICAgIHZhciBvdXQgPSBbXTtcblxuICAgIHZhciBpLCBqLCBrLCBuLCBkaXYsIG9mZnNldCwgc3dhcCwgaWQsIHN1bSwgdHN1bSwgc2l6ZTtcblxuICAgIHBhc3NDb3VudCA9ICgoMzIgLyByYWRpeEJpdHMpICsgMC45OTk5OTk5OTk5OTk5OTkpIHwgMDtcblxuICAgIGZvciAoaSA9IDAsIG4gPSBtYXhSYWRpeCAqIHBhc3NDb3VudDsgaSA8IG47IGkrKykgYnVja2V0c1tpXSA9IDA7XG5cbiAgICBmb3IgKGkgPSAwLCBuID0gbGlzdC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgZGl2ID0gZmxvYXRUb0ludChjb21wKGxpc3QsIHJlZ2lzdHJ5LCBpKSk7XG4gICAgICAgIGRpdiBePSBkaXYgPj4gMzEgfCAweDgwMDAwMDAwO1xuICAgICAgICBmb3IgKGogPSAwLCBrID0gMDsgaiA8IG1heE9mZnNldDsgaiArPSBtYXhSYWRpeCwgayArPSByYWRpeEJpdHMpIHtcbiAgICAgICAgICAgIGJ1Y2tldHNbaiArIChkaXYgPj4+IGsgJiByYWRpeE1hc2spXSsrO1xuICAgICAgICB9XG4gICAgICAgIGJ1Y2tldHNbaiArIChkaXYgPj4+IGsgJiBsYXN0TWFzayldKys7XG4gICAgfVxuXG4gICAgZm9yIChqID0gMDsgaiA8PSBtYXhPZmZzZXQ7IGogKz0gbWF4UmFkaXgpIHtcbiAgICAgICAgZm9yIChpZCA9IGosIHN1bSA9IDA7IGlkIDwgaiArIG1heFJhZGl4OyBpZCsrKSB7XG4gICAgICAgICAgICB0c3VtID0gYnVja2V0c1tpZF0gKyBzdW07XG4gICAgICAgICAgICBidWNrZXRzW2lkXSA9IHN1bSAtIDE7XG4gICAgICAgICAgICBzdW0gPSB0c3VtO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICgtLXBhc3NDb3VudCkge1xuICAgICAgICBmb3IgKGkgPSAwLCBuID0gbGlzdC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGRpdiA9IGZsb2F0VG9JbnQoY29tcChsaXN0LCByZWdpc3RyeSwgaSkpO1xuICAgICAgICAgICAgb3V0WysrYnVja2V0c1tkaXYgJiByYWRpeE1hc2tdXSA9IG11dGF0b3IobGlzdCwgcmVnaXN0cnksIGksIGRpdiBePSBkaXYgPj4gMzEgfCAweDgwMDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dhcCA9IG91dDtcbiAgICAgICAgb3V0ID0gbGlzdDtcbiAgICAgICAgbGlzdCA9IHN3YXA7XG4gICAgICAgIHdoaWxlICgrK3Bhc3MgPCBwYXNzQ291bnQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIG4gPSBsaXN0Lmxlbmd0aCwgb2Zmc2V0ID0gcGFzcyAqIG1heFJhZGl4LCBzaXplID0gcGFzcyAqIHJhZGl4Qml0czsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIGRpdiA9IGZsb2F0VG9JbnQoY29tcChsaXN0LCByZWdpc3RyeSwgaSkpO1xuICAgICAgICAgICAgICAgIG91dFsrK2J1Y2tldHNbb2Zmc2V0ICsgKGRpdiA+Pj4gc2l6ZSAmIHJhZGl4TWFzayldXSA9IGxpc3RbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3YXAgPSBvdXQ7XG4gICAgICAgICAgICBvdXQgPSBsaXN0O1xuICAgICAgICAgICAgbGlzdCA9IHN3YXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwLCBuID0gbGlzdC5sZW5ndGgsIG9mZnNldCA9IHBhc3MgKiBtYXhSYWRpeCwgc2l6ZSA9IHBhc3MgKiByYWRpeEJpdHM7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgZGl2ID0gZmxvYXRUb0ludChjb21wKGxpc3QsIHJlZ2lzdHJ5LCBpKSk7XG4gICAgICAgIG91dFsrK2J1Y2tldHNbb2Zmc2V0ICsgKGRpdiA+Pj4gc2l6ZSAmIGxhc3RNYXNrKV1dID0gbXV0YXRvcihsaXN0LCByZWdpc3RyeSwgaSwgZGl2IF4gKH5kaXYgPj4gMzEgfCAweDgwMDAwMDAwKSk7XG4gICAgICAgIGNsZWFuKGxpc3QsIHJlZ2lzdHJ5LCBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhZGl4U29ydDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGdsc2xpZnkgPSByZXF1aXJlKFwiZ2xzbGlmeVwiKTtcbnZhciBzaGFkZXJzID0gcmVxdWlyZShcImdsc2xpZnkvc2ltcGxlLWFkYXB0ZXIuanNcIikoXCJcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbm1hdDMgYV94X2dldE5vcm1hbE1hdHJpeChpbiBtYXQ0IHQpIHtcXG4gIG1hdDMgbWF0Tm9ybTtcXG4gIG1hdDQgYSA9IHQ7XFxuICBmbG9hdCBhMDAgPSBhWzBdWzBdLCBhMDEgPSBhWzBdWzFdLCBhMDIgPSBhWzBdWzJdLCBhMDMgPSBhWzBdWzNdLCBhMTAgPSBhWzFdWzBdLCBhMTEgPSBhWzFdWzFdLCBhMTIgPSBhWzFdWzJdLCBhMTMgPSBhWzFdWzNdLCBhMjAgPSBhWzJdWzBdLCBhMjEgPSBhWzJdWzFdLCBhMjIgPSBhWzJdWzJdLCBhMjMgPSBhWzJdWzNdLCBhMzAgPSBhWzNdWzBdLCBhMzEgPSBhWzNdWzFdLCBhMzIgPSBhWzNdWzJdLCBhMzMgPSBhWzNdWzNdLCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCwgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSwgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCwgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSwgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XFxuICBkZXQgPSAxLjAgLyBkZXQ7XFxuICBtYXROb3JtWzBdWzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XFxuICBtYXROb3JtWzBdWzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XFxuICBtYXROb3JtWzBdWzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XFxuICBtYXROb3JtWzFdWzBdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XFxuICBtYXROb3JtWzFdWzFdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XFxuICBtYXROb3JtWzFdWzJdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XFxuICBtYXROb3JtWzJdWzBdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XFxuICBtYXROb3JtWzJdWzFdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XFxuICBtYXROb3JtWzJdWzJdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XFxuICByZXR1cm4gbWF0Tm9ybTtcXG59XFxuZmxvYXQgYl94X2ludmVyc2UoZmxvYXQgbSkge1xcbiAgcmV0dXJuIDEuMCAvIG07XFxufVxcbm1hdDIgYl94X2ludmVyc2UobWF0MiBtKSB7XFxuICByZXR1cm4gbWF0MihtWzFdWzFdLCAtbVswXVsxXSwgLW1bMV1bMF0sIG1bMF1bMF0pIC8gKG1bMF1bMF0gKiBtWzFdWzFdIC0gbVswXVsxXSAqIG1bMV1bMF0pO1xcbn1cXG5tYXQzIGJfeF9pbnZlcnNlKG1hdDMgbSkge1xcbiAgZmxvYXQgYTAwID0gbVswXVswXSwgYTAxID0gbVswXVsxXSwgYTAyID0gbVswXVsyXTtcXG4gIGZsb2F0IGExMCA9IG1bMV1bMF0sIGExMSA9IG1bMV1bMV0sIGExMiA9IG1bMV1bMl07XFxuICBmbG9hdCBhMjAgPSBtWzJdWzBdLCBhMjEgPSBtWzJdWzFdLCBhMjIgPSBtWzJdWzJdO1xcbiAgZmxvYXQgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxO1xcbiAgZmxvYXQgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMDtcXG4gIGZsb2F0IGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMDtcXG4gIGZsb2F0IGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcXG4gIHJldHVybiBtYXQzKGIwMSwgKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpLCAoYTEyICogYTAxIC0gYTAyICogYTExKSwgYjExLCAoYTIyICogYTAwIC0gYTAyICogYTIwKSwgKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApLCBiMjEsICgtYTIxICogYTAwICsgYTAxICogYTIwKSwgKGExMSAqIGEwMCAtIGEwMSAqIGExMCkpIC8gZGV0O1xcbn1cXG5tYXQ0IGJfeF9pbnZlcnNlKG1hdDQgbSkge1xcbiAgZmxvYXQgYTAwID0gbVswXVswXSwgYTAxID0gbVswXVsxXSwgYTAyID0gbVswXVsyXSwgYTAzID0gbVswXVszXSwgYTEwID0gbVsxXVswXSwgYTExID0gbVsxXVsxXSwgYTEyID0gbVsxXVsyXSwgYTEzID0gbVsxXVszXSwgYTIwID0gbVsyXVswXSwgYTIxID0gbVsyXVsxXSwgYTIyID0gbVsyXVsyXSwgYTIzID0gbVsyXVszXSwgYTMwID0gbVszXVswXSwgYTMxID0gbVszXVsxXSwgYTMyID0gbVszXVsyXSwgYTMzID0gbVszXVszXSwgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCwgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMiwgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCwgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMiwgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xcbiAgcmV0dXJuIG1hdDQoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5LCBhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDksIGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMywgYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzLCBhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcsIGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNywgYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxLCBhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEsIGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNiwgYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2LCBhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDAsIGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCwgYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2LCBhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYsIGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCwgYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAvIGRldDtcXG59XFxuZmxvYXQgY194X3RyYW5zcG9zZShmbG9hdCBtKSB7XFxuICByZXR1cm4gbTtcXG59XFxubWF0MiBjX3hfdHJhbnNwb3NlKG1hdDIgbSkge1xcbiAgcmV0dXJuIG1hdDIobVswXVswXSwgbVsxXVswXSwgbVswXVsxXSwgbVsxXVsxXSk7XFxufVxcbm1hdDMgY194X3RyYW5zcG9zZShtYXQzIG0pIHtcXG4gIHJldHVybiBtYXQzKG1bMF1bMF0sIG1bMV1bMF0sIG1bMl1bMF0sIG1bMF1bMV0sIG1bMV1bMV0sIG1bMl1bMV0sIG1bMF1bMl0sIG1bMV1bMl0sIG1bMl1bMl0pO1xcbn1cXG5tYXQ0IGNfeF90cmFuc3Bvc2UobWF0NCBtKSB7XFxuICByZXR1cm4gbWF0NChtWzBdWzBdLCBtWzFdWzBdLCBtWzJdWzBdLCBtWzNdWzBdLCBtWzBdWzFdLCBtWzFdWzFdLCBtWzJdWzFdLCBtWzNdWzFdLCBtWzBdWzJdLCBtWzFdWzJdLCBtWzJdWzJdLCBtWzNdWzJdLCBtWzBdWzNdLCBtWzFdWzNdLCBtWzJdWzNdLCBtWzNdWzNdKTtcXG59XFxudmVjNCBhcHBseVRyYW5zZm9ybSh2ZWM0IHBvcykge1xcbiAgbWF0NCBNVk1hdHJpeCA9IHVfdmlldyAqIHVfdHJhbnNmb3JtO1xcbiAgcG9zLnggKz0gMS4wO1xcbiAgcG9zLnkgLT0gMS4wO1xcbiAgcG9zLnh5eiAqPSB1X3NpemUgKiAwLjU7XFxuICBwb3MueSAqPSAtMS4wO1xcbiAgdl9wb3NpdGlvbiA9IChNVk1hdHJpeCAqIHBvcykueHl6O1xcbiAgdl9leWVWZWN0b3IgPSAodV9yZXNvbHV0aW9uICogMC41KSAtIHZfcG9zaXRpb247XFxuICBwb3MgPSB1X3BlcnNwZWN0aXZlICogTVZNYXRyaXggKiBwb3M7XFxuICByZXR1cm4gcG9zO1xcbn1cXG4jdmVydF9kZWZpbml0aW9uc1xcblxcbnZlYzMgY2FsY3VsYXRlT2Zmc2V0KHZlYzMgSUQpIHtcXG4gIFxcbiAgI3ZlcnRfYXBwbGljYXRpb25zXFxuICByZXR1cm4gdmVjMygwLjApO1xcbn1cXG52b2lkIG1haW4oKSB7XFxuICB2X3RleHR1cmVDb29yZGluYXRlID0gYV90ZXhDb29yZDtcXG4gIHZlYzMgaW52ZXJ0ZWROb3JtYWxzID0gYV9ub3JtYWxzICsgKHVfbm9ybWFscy54IDwgMC4wID8gY2FsY3VsYXRlT2Zmc2V0KHVfbm9ybWFscykgKiAyLjAgLSAxLjAgOiB2ZWMzKDAuMCkpO1xcbiAgaW52ZXJ0ZWROb3JtYWxzLnkgKj0gLTEuMDtcXG4gIHZfbm9ybWFsID0gY194X3RyYW5zcG9zZShtYXQzKGJfeF9pbnZlcnNlKHVfdHJhbnNmb3JtKSkpICogaW52ZXJ0ZWROb3JtYWxzO1xcbiAgdmVjMyBvZmZzZXRQb3MgPSBhX3BvcyArIGNhbGN1bGF0ZU9mZnNldCh1X3Bvc2l0aW9uT2Zmc2V0KTtcXG4gIGdsX1Bvc2l0aW9uID0gYXBwbHlUcmFuc2Zvcm0odmVjNChvZmZzZXRQb3MsIDEuMCkpO1xcbn1cIiwgXCJcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbiNmbG9hdF9kZWZpbml0aW9uc1xcblxcbmZsb2F0IGFfeF9hcHBseU1hdGVyaWFsKGZsb2F0IElEKSB7XFxuICBcXG4gICNmbG9hdF9hcHBsaWNhdGlvbnNcXG4gIHJldHVybiAxLjtcXG59XFxuI3ZlYzNfZGVmaW5pdGlvbnNcXG5cXG52ZWMzIGFfeF9hcHBseU1hdGVyaWFsKHZlYzMgSUQpIHtcXG4gIFxcbiAgI3ZlYzNfYXBwbGljYXRpb25zXFxuICByZXR1cm4gdmVjMygwKTtcXG59XFxuI3ZlYzRfZGVmaW5pdGlvbnNcXG5cXG52ZWM0IGFfeF9hcHBseU1hdGVyaWFsKHZlYzQgSUQpIHtcXG4gIFxcbiAgI3ZlYzRfYXBwbGljYXRpb25zXFxuICByZXR1cm4gdmVjNCgwKTtcXG59XFxudmVjNCBiX3hfYXBwbHlMaWdodChpbiB2ZWM0IGJhc2VDb2xvciwgaW4gdmVjMyBub3JtYWwsIGluIHZlYzQgZ2xvc3NpbmVzcykge1xcbiAgaW50IG51bUxpZ2h0cyA9IGludCh1X251bUxpZ2h0cyk7XFxuICB2ZWMzIGFtYmllbnRDb2xvciA9IHVfYW1iaWVudExpZ2h0ICogYmFzZUNvbG9yLnJnYjtcXG4gIHZlYzMgZXllVmVjdG9yID0gbm9ybWFsaXplKHZfZXllVmVjdG9yKTtcXG4gIHZlYzMgZGlmZnVzZSA9IHZlYzMoMC4wKTtcXG4gIGJvb2wgaGFzR2xvc3NpbmVzcyA9IGdsb3NzaW5lc3MuYSA+IDAuMDtcXG4gIGJvb2wgaGFzU3BlY3VsYXJDb2xvciA9IGxlbmd0aChnbG9zc2luZXNzLnJnYikgPiAwLjA7XFxuICBmb3IoaW50IGkgPSAwOyBpIDwgNDsgaSsrKSB7XFxuICAgIGlmKGkgPj0gbnVtTGlnaHRzKVxcbiAgICAgIGJyZWFrO1xcbiAgICB2ZWMzIGxpZ2h0RGlyZWN0aW9uID0gbm9ybWFsaXplKHVfbGlnaHRQb3NpdGlvbltpXS54eXogLSB2X3Bvc2l0aW9uKTtcXG4gICAgZmxvYXQgbGFtYmVydGlhbiA9IG1heChkb3QobGlnaHREaXJlY3Rpb24sIG5vcm1hbCksIDAuMCk7XFxuICAgIGlmKGxhbWJlcnRpYW4gPiAwLjApIHtcXG4gICAgICBkaWZmdXNlICs9IHVfbGlnaHRDb2xvcltpXS5yZ2IgKiBiYXNlQ29sb3IucmdiICogbGFtYmVydGlhbjtcXG4gICAgICBpZihoYXNHbG9zc2luZXNzKSB7XFxuICAgICAgICB2ZWMzIGhhbGZWZWN0b3IgPSBub3JtYWxpemUobGlnaHREaXJlY3Rpb24gKyBleWVWZWN0b3IpO1xcbiAgICAgICAgZmxvYXQgc3BlY3VsYXJXZWlnaHQgPSBwb3cobWF4KGRvdChoYWxmVmVjdG9yLCBub3JtYWwpLCAwLjApLCBnbG9zc2luZXNzLmEpO1xcbiAgICAgICAgdmVjMyBzcGVjdWxhckNvbG9yID0gaGFzU3BlY3VsYXJDb2xvciA/IGdsb3NzaW5lc3MucmdiIDogdV9saWdodENvbG9yW2ldLnJnYjtcXG4gICAgICAgIGRpZmZ1c2UgKz0gc3BlY3VsYXJDb2xvciAqIHNwZWN1bGFyV2VpZ2h0ICogbGFtYmVydGlhbjtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG4gIHJldHVybiB2ZWM0KGFtYmllbnRDb2xvciArIGRpZmZ1c2UsIGJhc2VDb2xvci5hKTtcXG59XFxudm9pZCBtYWluKCkge1xcbiAgdmVjNCBtYXRlcmlhbCA9IHVfYmFzZUNvbG9yLnIgPj0gMC4wID8gdV9iYXNlQ29sb3IgOiBhX3hfYXBwbHlNYXRlcmlhbCh1X2Jhc2VDb2xvcik7XFxuICBib29sIGxpZ2h0c0VuYWJsZWQgPSAodV9mbGF0U2hhZGluZyA9PSAwLjApICYmICh1X251bUxpZ2h0cyA+IDAuMCB8fCBsZW5ndGgodV9hbWJpZW50TGlnaHQpID4gMC4wKTtcXG4gIHZlYzMgbm9ybWFsID0gbm9ybWFsaXplKHZfbm9ybWFsKTtcXG4gIHZlYzQgZ2xvc3NpbmVzcyA9IHVfZ2xvc3NpbmVzcy54IDwgMC4wID8gYV94X2FwcGx5TWF0ZXJpYWwodV9nbG9zc2luZXNzKSA6IHVfZ2xvc3NpbmVzcztcXG4gIHZlYzQgY29sb3IgPSBsaWdodHNFbmFibGVkID8gYl94X2FwcGx5TGlnaHQobWF0ZXJpYWwsIG5vcm1hbGl6ZSh2X25vcm1hbCksIGdsb3NzaW5lc3MpIDogbWF0ZXJpYWw7XFxuICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXG4gIGdsX0ZyYWdDb2xvci5hICo9IHVfb3BhY2l0eTtcXG59XCIsIFtdLCBbXSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNoYWRlcnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRmFtb3VzRW5naW5lID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRmFtb3VzRW5naW5lJyk7XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vRE9NJyk7XG5cbkZhbW91c0VuZ2luZS5pbml0KCk7XG5cblxudmFyIHNjZW5lID0gRmFtb3VzRW5naW5lLmNyZWF0ZVNjZW5lKCk7XG5cbnZhciBkaXYgPSBET00uRElWKCdIZWxsbyBXb3JsZCcpO1xuXG5zY2VuZS5hZGRDaGlsZChkaXYpXG5cbmRpdi5hZGRVSUV2ZW50KCdjbGljaycpO1xuXG5kaXYub25DbGljayA9IGZ1bmN0aW9uKGV2KSB7XG5cdGNvbnNvbGUubG9nKGV2KVxufTtcbiJdfQ==
