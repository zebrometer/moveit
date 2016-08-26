

function BuilderElement($rootElement, features) {
	'use strict';

	this.checkFeatures(features)

	this.$el = $('<div style="position: absolute; top: 10px; left: 10px; width: 150px; height: 90px; background-color: green;"></div>')
	this.x   = 0 // Transient drag/move tracking...
	this.y   = 0 // Transient drag/move tracking...

	features.forEach(function(feature) {
		this.$el.addClass(feature)
	}, this)

	this.installFeatures(features, this.$el)

	$($rootElement).append(this.$el)
}

BuilderElement.prototype.clear = function clear() {
	this.handleMouseUp()
}

BuilderElement.prototype.supportedFeatures = [
	'draggable',
	'resizable'
]

BuilderElement.prototype.checkFeatures = function checkFeatures(features) {
	features = typeof features === 'string'
		? [features]
		: features

	if (!Array.isArray(features)) {
		throw Error('Features argument should be an Array or string type')
	}

	features.forEach(function(feature) {
		if (BuilderElement.prototype.supportedFeatures.indexOf(feature) < 0) {
			throw Error('Feature "' + feature + '" is not supported"')
		}
	})
}

BuilderElement.prototype.installFeatures = function installFeatures(features) {
	if (this.$el.hasClass('draggable')/* || $el.hasClass('resizable')*/) {
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseUp   = this.handleMouseUp.bind(this)

		this.$el.on('mousedown', this.handleMouseDown)
		this.$el.on('mouseup',   this.handleMouseUp)
	}
}

BuilderElement.prototype.handleMouseDown = function handleMouseDown(e) {
	this.x = e.clientX
	this.y = e.clientY

	this.$el.on('mousemove', this.handleMouseMove)
}

BuilderElement.prototype.handleMouseUp = function handleMouseUp() {
	this.x = 0
	this.y = 0

	this.$el.off('mousemove', this.handleMouseMove)
}

BuilderElement.prototype.handleMouseMove = function handleMouseMove(e) {
	var offsetX = e.clientX - this.x
	var offsetY = e.clientY - this.y

	console.log(offsetY)

	this.x = e.clientX
	this.y = e.clientY

	var elX  = parseInt(this.$el.css('left'))
	var elY  = parseInt(this.$el.css('top'))

	var newY = elY + offsetY
	var newX = elX + offsetX

	newY = newY < 0 ? 0 : newY
	newX = newX < 0 ? 0 : newX

	this.$el.css('top',  newY)
	this.$el.css('left', newX)
}
