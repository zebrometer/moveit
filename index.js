
var builder = function(rootElementSelector) {
	'use strict';

	var rootElement = $(rootElementSelector)

	if (rootElement.length === 0) {
		throw Error('No elements that match selector "' + rootElementSelector + '""')
	}

	return {
		addElement: function addElement(features) {
			var element = new BuilderElement(rootElement, features)
		}
	}
}
