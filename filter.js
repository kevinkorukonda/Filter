// Constants for the image
var IMAGE_URL = "https://codehs.com/uploads/7a1168472fdf06ca644ce40d0c37a9e6";
var IMAGE_WIDTH = 350;
var IMAGE_HEIGHT = 250;
var IMAGE_X = getWidth() / 2 - IMAGE_WIDTH / 2;
var IMAGE_Y = getHeight() / 2 - IMAGE_HEIGHT / 2;
var DARKENING_FACTOR = 220;
var REDDENING_FACTOR = 155;

// Constants for the pixel array
var RED = 0;
var GREEN = 1;
var BLUE = 2;

// Constants for the pixel filter
var MAX_COLOR_VALUE = 255;

// We need to wait for the image to load before modifying it
var IMAGE_LOAD_WAIT_TIME = 50;

/*
 * Given a pixel array with 3 values [R, G, B]
 * Modifies the pixel array such that each value is inverted ie:
 * R = 255 - R
 * G = 255 - G
 * B = 255 - B
 * Returns the modified pixel array
 */

function invertPixel(pixel) {
    var red = pixel[RED];
    var green = pixel[GREEN];
    var blue = pixel[BLUE];
    
    var newRed = 255 - red;
    var newGreen = 255 - green;
    var newBlue = 255 - blue;
    
    pixel[RED] = 0;
    pixel[GREEN] = newGreen;
    pixel[BLUE] = newBlue;
    
    return pixel;
    
}

// Inverts the colors of each pixel in the WebImage image
function removeBlue(image) {
    for(var x = 0; x < image.getWidth() ; x++) {
        for (var y = 0; y < image.getHeight(); y++) {
            // Get the current pixel
            var pixel = image.getPixel(x, y);
            
            // Modify the current pixel
            pixel = invertPixel(pixel);
            
            // Update the image with the modified pixel
            image.setRed(x, y, pixel[RED]);
            image.setGreen(x, y, pixel[GREEN]);
            image.setBlue(x, y, pixel[BLUE]);
        }
    }
}

function start() {
    // Set up the image
    var image = new WebImage(IMAGE_URL);
    image.setSize(IMAGE_WIDTH, IMAGE_HEIGHT);
    image.setPosition(IMAGE_X, IMAGE_Y);
    
    // Add it to the canvas
    add(image);
    

    // Wait for it to load before applying the filter
    setTimeout(function(){
        removeBlue(image);
        darkenFilter(image);
        redFilter(image);
        ///customFilter(image);
    }, IMAGE_LOAD_WAIT_TIME);
}

function getDarkenPixel(pixel) {
    var red = pixel[RED];
    var green = pixel[GREEN];
    var blue = pixel[BLUE];
    
    var newRed = red - DARKENING_FACTOR;
    var newGreen = green - DARKENING_FACTOR;
    var newBlue = blue - DARKENING_FACTOR;
    
    pixel[RED] = newRed;
    pixel[GREEN] = newGreen;
    pixel[BLUE] = newBlue;
    
    return pixel;
    
}

// Inverts the colors of each pixel in the WebImage image
function darkenFilter(image) {
    for(var x = 0; x < image.getWidth() / 2; x++) {
        for (var y = 0; y < image.getHeight() / 2; y++) {
            // Get the current pixel
            var pixel = image.getPixel(x, y);
            
            // Modify the current pixel
            pixel = getDarkenPixel(pixel);
            
            // Update the image with the modified pixel
            image.setRed(x, y, pixel[RED]);
            image.setGreen(x, y, pixel[GREEN]);
            image.setBlue(x, y, pixel[BLUE]);
        }
    }
}

function customFilter(pixel) {
    var red = pixel[RED];
    var green = pixel[GREEN];
    var blue = pixel[BLUE];
    
    var newRed = red + REDDENING_FACTOR;
    var newGreen = green + REDDENING_FACTOR;
    var newBlue = blue + REDDENING_FACTOR;
    
    pixel[RED] = newRed;
    pixel[GREEN] = newGreen;
    pixel[BLUE] = newBlue;
    
    return pixel;
    
}
function redFilter(image) {
    for(var x = 0; x < image.getWidth() / 2; x++) {
        for (var y = 0; y < image.getHeight(); y++) {
            // Get the current pixel
            var pixel = image.getPixel(x, y);
            
            // Modify the current pixel
            pixel = customFilter(pixel);
            
            // Update the image with the modified pixel
            image.setRed(x, y, pixel[RED]);
            image.setGreen(x, y, pixel[GREEN]);
            image.setBlue(x, y, pixel[BLUE]);
        }
    }
}