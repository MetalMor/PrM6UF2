/**
 * JAVASCRIPT FIGURES LEVELS
 * 
 * No implementat :(
 * 
 * 050216
 * @author mor
 */

var folder = "img/figure/";
var ext = ".png";

var circle = folder + "circle" + ext;
var square = folder + "square" + ext;
var triangle = folder + "triangle" + ext;
var diamond = folder + "diamond" + ext;

var currentLevel = 1;

var levels = {
    level01: { 
        code: 1,
        figures: [circle, square, triangle, diamond] 
    },
    level02: { 
        code: 2,
        figures: [diamond, diamond, diamond, diamond] 
    },
    level03: {
        code: 3,
        figures: [triangle, square, triangle, square] 
    },
    level04: { 
        code: 4,
        figures: [diamond, triangle, square, circle] 
    }
}

function addFigureElement(element, figure) {
    document.getElementById(element).appendChild(
            document.createElement('img').setAttribute('src', figure)
    );
}

function setLevel() {
    var parent = document.getElementById('system');
    var counter = 0;
    for (var node in parent.getElementsByTagName('div')) {
        console.log('setting image' + node.id);
        if (node.hasOwnProperty('name'))
            addFigureElement(node, levels.level01.figures[counter]);
        counter++;
    }
}

/*function setLevel() {
    
    var lv = currentLevel - 1;
    var divElement;
    var figure;
    var counter;
    
    console.log('setting level');
    
    for (counter = 0; counter === 2; counter++) {
        
        console.log('level ' + currentLevel);
        
        divElement = 'sb0' + (counter + 1);
        figure = levels[lv][counter];
        
        addFigureElement(divElement, figure);

    }
    
}*/