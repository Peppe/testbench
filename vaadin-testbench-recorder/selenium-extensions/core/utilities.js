
/**
 * Resizes the browser window size so the canvas has the given width and height.
 * <p>
 * Note: Does not work in Opera as Opera does not allow window.resize(w,h).
 * Opera is resized during startup using custom profiles.
 * </p>
 */
function vaadin_testbench_calculateAndSetCanvasSize(width, height) {
	var win = selenium.browserbot.getUserWindow();
	var body = win.document.body;
	
    // Need to move browser to top left before resize to avoid the
    // possibility that it goes below or to the right of the screen.
    
    win.moveTo(1,1);

    var innerWidth = win.innerWidth;
    var innerHeight = win.innerHeight;
	if (typeof innerWidth == 'undefined') {
		vaadin_testbench_hideIEScrollBar();
		innerWidth = body.clientWidth;
		innerHeight = body.clientHeight;
		if (vaadin_testbench_isIE9_in_compatibility_mode()) {
			// IE9 runs in compatibility mode at startup and has the extra
			// IE6-IE8 2px borders present which we want to exclude so the
			// canvas will be correctly sized when we are in native mode.
			innerWidth+=4;
			innerHeight+=4;
		}
	}

	win.resizeBy(width-innerWidth, height-innerHeight);
	
//	if (navigator.userAgent.indexOf("Chrome") != -1) {
//		// Window resize functions are pretty broken in Chrome 6..
//		innerWidth = win.innerWidth;
//		innerHeight = win.innerHeight;
//		win.resizeBy(width-innerWidth, height-innerHeight);
//	}

    if (navigator.userAgent.indexOf("Linux") != -1 && navigator.userAgent.indexOf("Chrome") != -1) {
        // window.resizeTo() is pretty badly broken in Linux Chrome...

        // Need to wait for innerWidth to stabilize (Chrome issue #55409)
    	//sleep(500);

    	innerWidth = win.innerWidth;
        innerHeight = win.innerHeight;

        // Hide main view scrollbar to get correct measurements in IE
        // (overflow=hidden)
        if (typeof innerWidth == 'undefined') {
        	body.style.overflow='hidden';
        	innerWidth = body.clientWidth;
        	innerHeight = body.clientHeight;
        }
        var getSize = innerWidth+','+innerHeight;
        var newSizes = getSize().split(",");
        var newWidth = parseInt(newSizes[0]);
        var newHeight = parseInt(newSizes[1]);

        var widthError = width - newWidth;
        var heightError = height - newHeight;

        // Correct the window size
        win.resizeTo(win.outerWidth - win.innerWidth + width + widthError,
        		win.outerHeight - win.innerHeight + height + heightError);
    }

    var outerWidth = win.outerWidth;
    var outerHeight = win.outerHeight;
    if (typeof outerWidth == 'undefined') {
      // Find the outerWidth/outerHeight for IE by
      // resizing the window twice and measuring the
      // differences.
      var offsWidth = body.offsetWidth;
      var offsHeight = body.offsetHeight;
      win.resizeTo(500,500);
      var barsWidth = 500 - body.offsetWidth;
      var barsHidth = 500 - body.offsetHeight;
      outerWidth = barsWidth + offsWidth;
      outerHeight = barsHidth + offsHeight;
      win.resizeTo(outerWidth, outerHeight);
    }
    return outerWidth + "," + outerHeight;
}

function vaadin_testbench_hideIEScrollBar() {
    // Hide main view scrollbar to get correct measurements in IE
    // (overflow=hidden)
    if (vaadin_testbench_isIE()) {
    	selenium.browserbot.getUserWindow().document.body.style.overflow='hidden';
    }
}

function vaadin_testbench_setWindowSize(width, height) {
    var win = selenium.browserbot.getUserWindow();
    win.moveTo(1,1);
	win.resizeTo(width, height);
}

function vaadin_testbench_getCanvasWidth() {
	var win = selenium.browserbot.getUserWindow();
    if (win.innerWidth) {
    	return win.innerWidth;
    }
    if (win.document.body) {
    	var width = win.document.body.clientWidth;
		if (vaadin_testbench_isIE9_in_compatibility_mode()) {
			// IE9 runs in compatibility mode at startup and has the extra
			// IE6-IE8 2px borders present which we want to exclude so the
			// canvas will be correctly sized when we are in native mode.
			width += 4;
		}
		
		return width;
    }
    if (win.document.documentElement) {
    	return win.document.documentElement.clientWidth;
    }
    return 0;
}

function vaadin_testbench_getCanvasHeight() {
	var win = selenium.browserbot.getUserWindow();
    if (win.innerHeight) {
    	return win.innerHeight;
    }
	if (win.document.body.clientHeight) {
    	var height = win.document.body.clientHeight;
		if (vaadin_testbench_isIE9_in_compatibility_mode()) {
			// IE9 runs in compatibility mode at startup and has the extra
			// IE6-IE8 2px borders present which we want to exclude so the
			// canvas will be correctly sized when we are in native mode.
			height += 4;
		}
		
		return height;
    }
	if (win.document.documentElement.clientHeight) {
		return win.document.documentElement.clientHeight;
	}
	return 0;
}

/**
 * Gets or calculates the x position of the canvas in the upper left corner on
 * screen
 * 
 * @return the x coordinate of the canvas
 */
function vaadin_testbench_getCanvasX() {
	var win = selenium.browserbot.getUserWindow();

    if (vaadin_testbench_isIE()) {
    	var left = win.screenLeft;
   		// Canvas position given by IE6-IE8 is 2px off due to using
		// body.clientWidth/clientHeight and IE6-IE8 adds a two pixel
		// gradient/shadow around the body
    	if (vaadin_testbench_isIE8OrEarlier()) {
    		left += 2;
    	}
    	
    	// IE9 in compatibility mode adds the shadow but IE9 in native mode does
		// not. This will result in the extra 2 pixel bordes appearing if
		// running IE9 in compatibility mode. It cannot be taken into account
		// here as we do not know whether we will run parts of the test in
		// compatibility mode or not.
    	return left;
    }
    var horizontalDecorations = win.outerWidth - win.innerWidth;
    return horizontalDecorations / 2 + win.screenX;
}

function vaadin_testbench_isIE() {
	return (navigator.userAgent.indexOf("MSIE") != -1);
}

function vaadin_testbench_isIE8OrEarlier() {
	return vaadin_testbench_isIE() && !vaadin_testbench_isIE9();
}

function vaadin_testbench_isIE9() {
	return vaadin_testbench_isIE() && (navigator.userAgent.indexOf("Trident/5.") != -1);
}

function vaadin_testbench_isIE9_in_compatibility_mode() {
	return vaadin_testbench_isIE() && (navigator.userAgent.indexOf("Trident/5.") != -1) && document.documentMode < 9;
}

/**
 * Gets or calculates the y position of the canvas in the upper left corner on
 * screen
 * 
 * @param canvasHeight
 * @return
 */
function vaadin_testbench_getCanvasY(canvasHeight) {
    if (vaadin_testbench_isIE()) {
    	var top = selenium.browserbot.getUserWindow().screenTop;
   		// Canvas position given by IE6-IE8 is 2px off due to using
		// body.clientWidth/clientHeight and IE6-IE8 adds a two pixel
		// gradient/shadow around the body
    	if (vaadin_testbench_isIE8OrEarlier()) {
    		top += 2;
    	}

    	// IE9 in compatibility mode adds the shadow but IE9 in native mode does
		// not. This will result in the extra 2 pixel bordes appearing if
		// running IE9 in compatibility mode. It cannot be taken into account
		// here as we do not know whether we will run parts of the test in
		// compatibility mode or not.
    	return top;
    }

    // We need to guess a location that is within the canvas. The window
    // is positioned at (0,0) or (1,1) at this point.

    // Using 0.95*canvasHeight we should always be inside the canvas.
    // 0.95 is used because the detection routine used later on also
    // checks some pixels below this position (for some weird reason).
    return (canvasHeight * 0.95) | 0;
}

function vaadin_testbench_getDimensions() {
    var screenWidth = screen.availWidth;
	var screenHeight = screen.availHeight;
	var canvasWidth = vaadin_testbench_getCanvasWidth();
	var canvasHeight = vaadin_testbench_getCanvasHeight();
	var canvasX = vaadin_testbench_getCanvasX();
	var canvasY = vaadin_testbench_getCanvasY(canvasHeight);
	return "" + screenWidth + "," + screenHeight + "," + canvasWidth
				+ "," + canvasHeight + "," + canvasX + "," + canvasY;
}