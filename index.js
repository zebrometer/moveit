
var builder = function(rootElementSelector) {
	'use strict';

	var rootElement = $(rootElementSelector)
	var elements    = []

	if (rootElement.length === 0) {
		throw Error('No elements that match selector "' + rootElementSelector + '""')
	}

	rootElement.on('mouseup',  function() {
		elements.forEach(function(element) {
			element.clear()
		})
	})

	return {
		addElement: function addElement(features) {
			elements.push(new BuilderElement(rootElement, features))
		}
	}
}
