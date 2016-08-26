

var builder = function(){
	'use strict';

	var activeElement

	/**
	 * Utitlities (BEGIN)
	 */
	 function findClosestOutside($elements, pointX, pointY) {
		 console.log('pointY: ' + pointY)
		 var boundElements = $elements.map(function(index, element) {
			 var $element = $(element)
			 return {
				 el  : $element,
				 rect: getRectangle($element)
			 }
		 })

		 var outBoundElements = boundElements.filter(function(index, boundElement) {
			 console.log(boundElement.rect.y1)
			 //return (pointX < boundElement.rect.x1 || pointX > boundElement.rect.x2)
			//  console.log(pointY)
			//  console.log(boundElement.rect.y2)
			 return (pointY < boundElement.rect.y1 || pointY > boundElement.rect.y2)
					 //   && (pointY < boundElement.rect.y1 || pointY > boundElement.rect.y2)
		 })

		 console.log('outBoundElements: ' + outBoundElements.length)
	 }

	 function getRectangle($element) {
		 var top  = parseInt($element.css('top'))
		 var left = parseInt($element.css('left'))

		 return {
			 x1: left,
			 y1: top,
			 x2: left + $element.width(),
			 y2: top  + $element.height()
		 }
	 }
	 /**
 	 * Utitlities (END)
 	 */

	registerEventListeners()

	function addElement() {
		var $el = $('<div class="draggable transformable" style="position: absolute; top: 10px; left: 10px; width: 150px; height: 90px; background-color: green;"></div>')
		$('.builder').append($el)

		$el.on('mousedown', function(e) { activeElement = $el    })
		$el.on('mouseup'  , function(e) { activeElement = void 0 })
	}

	function registerEventListeners() {
		var $builderEl = $('.builder')
		var x = 0
		var y = 0

		$('.add-element').on('click', addElement)

		var dragMoveHandler = function (e) {
			var offsetX = e.clientX - x
			var offsetY = e.clientY - y

			x = e.clientX
			y = e.clientY

			var elX  = parseInt(activeElement.css('left'))
			var elY  = parseInt(activeElement.css('top'))

			var newY = elY + offsetY
			var newX = elX + offsetX

			newY = newY < 0 ? 0 : newY
			newX = newX < 0 ? 0 : newX

			activeElement.css('top',  newY)
			activeElement.css('left', newX)
		}

		function rotateMoveHandler (e) {			
			var transformables = $builderEl.find('.transformable')
			findClosestOutside(transformables, e.clientX, e.clientY)
		}

		$builderEl.on('mousemove', rotateMoveHandler)

		$builderEl.on('mousedown', function(e) {
			if (activeElement) {
				x = e.clientX
				y = e.clientY

				$builderEl.on('mousemove', dragMoveHandler)
			}
		})

		$builderEl.on('mouseup', function(e) {
			x = 0
			y = 0

			$builderEl.off('mousemove', dragMoveHandler)
		})
	}
}
