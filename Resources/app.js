/*
 * Titanium Label Bender
 * Proof of concept for a factory function(string, angle) returning a single view 
 * with the single char labels composed along an arc, resulting in a curved label
 *
 * Copyright (c) 2013 Patrick De Marta
 * License MIT
 */

var win = Titanium.UI.createWindow({  
    backgroundColor:'black'
});

var createArcLabel = function(options){

  var radiansToDegree = function(r) {
    return r * ( 180 / Math.PI);
  }

  var text = options.curvedText,
    fontSize = options.font.fontSize,
    angle = options.angle,
    len = text.length,
    dimensions = fontSize * len,
    origin = (dimensions - fontSize)/2,
    arc = len * Math.PI - angle,
    kerning_coeff = 2*Math.PI / angle;
    
  var self = Ti.UI.createView({
    width: dimensions,
    height: dimensions,
    backgroundColor: options.backgroundColor
  });
  
  for (var i=0; i<len; i++) {

    var rotate = Ti.UI.create2DMatrix({
        rotate: radiansToDegree(i * angle/len - Math.PI/2)
    });

    var charLabel = Ti.UI.createLabel({
      color: options.color,
      font: {fontSize:fontSize},
      transform: rotate
    });
    
    var character = text[i];

    charLabel.width = fontSize;
    charLabel.height = fontSize;
    charLabel.text = character;
    charLabel.bottom = origin + arc * kerning_coeff * Math.sin(i * angle/len);
    charLabel.left = origin + arc * kerning_coeff * Math.cos(i * angle/len - Math.PI);

    self.add(charLabel);
  }

  return self
};

var label = createArcLabel({
    curvedText: "Curved label are nice",
    angle: Math.PI,
    color: "yellow",
    font: {fontSize:22},
    backgroundColor:"blue"
});

win.add(label);
win.open();
