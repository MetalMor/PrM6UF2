/* global lvl */

/**
 * JAVASCRIPT FIGURES LEVELS
 * 
 * No implementat :(
 * 
 * 050216
 * @author mor
 */
function ImageSet(_folder, _ext) {
    this.circle = _folder + "circle" + _ext;
    this.square = _folder + "square" + _ext;
    this.triangle = _folder + "triangle" + _ext;
    this.diamond = _folder + "diamond" + _ext;
}

function FigureSet(_folder, _ext) {
    this.folder = _folder;
    this.ext = _ext;
    this.images = new ImageSet(_folder, _ext);
    this.addFigureImage = function (_node, _figure) {
        
        var figureElement = document.createElement("img");
        figureElement.setAttribute("src", _figure);
        _node.appendChild(figureElement);
        
    };
    this.loadImages = function (_currLvl) {
        
        var nodeList = document.getElementsByClassName('staticSystemBox');
        var counter = 0;
        
        for (_divNode in nodeList)
            addFigureImage(_divNode, _currLvl.figures[counter++]);
        
    };
};

function Level(_number, _figures) {
    this.number = _number;
    this.figures = _figures;
}

function LevelSet() {
    this.one = new Level(1, [
        figures.images.circle,
        figures.images.square,
        figures.images.triangle,
        figures.images.diamond
    ]);
    this.two = new Level(2, [
        figures.images.diamond,
        figures.images.diamond,
        figures.images.square,
        figures.images.square
    ]);
    this.three = new Level(3, [
        figures.images.triangle,
        figures.images.circle,
        figures.images.triangle,
        figures.images.circle
    ]);
    this.four = new Level(4, [
        figures.images.triangle,
        figures.images.triangle,
        figures.images.triangle,
        figures.images.triangle
    ]);
}

function Game(_figureSet) {
    this.key = "any";
    this.currentLevel = 0;
    this.figures = new FigureSet();
    this.levels = new LevelSet();
    this.loadLevel = function () {

        this.setCurrentLevel();
        console.log("loading level " + this.currentLevel);

        var levelList = this.levels;

        for (lvl in levelList) {
            
            console.log('level ' + lvl.number + '?');
            if (lvl.number === this.currentLevel) {
                
                console.log('yup! loading :D lvl ' + lvl.number);
                figures.loadImages();
                this.setKey(lvl);
                
                
            } else {
                console.log('no :(');
            }

        }

    }
    
    this.setKey = function (_lvl) {
        
        var lastFigure = _lvl.figures.length - 1;
        key = _lvl.figures[lastFigure];
        
    }
    
    this.setCurrentLevel = function() {
        
        this.currentLevel < 4 ?
            this.currentLevel++ :
            this.currentLevel = 1;
    
    }
    
}

var figures = {
    
    folder: "img/figure/",
    ext: ".png",
    
    images: {
        circle: folder + "circle" + ext,
        square: folder + "square" + ext,
        triangle: folder + "triangle" + ext,
        diamond: folder + "diamond" + ext
    },
    
    addFigureImage: function (_node, _figure) {
        
        var figureElement = document.createElement("img");
        figureElement.setAttribute("src", _figure);
        _node.appendChild(figureElement);
        
    },
    
    loadImages: function (_currLvl) {
        
        var nodeList = document.getElementsByClassName('staticSystemBox');
        var counter = 0;
        
        for (_divNode in nodeList)
            addFigureImage(_divNode, _currLvl.figures[counter++]);
        
    }

};

var game = {
    
    key: "any",
    
    currentLevel: 0,
    
    levels: {
        
        one: {
            
            number: 1,
            figures: [figures.circle, figures.square, figures.triangle, figures.diamond]
            
        },
        
        two: {
            
            number: 2,
            figures: [figures.diamond, figures.diamond, figures.square, figures.square]
            
        },
        
        three: {
            
            number: 3,
            figures: [figures.triangle, figures.circle, figures.triangle, figures.circle]
            
        },
        
        four: {
            
            number: 4,
            figures: [figures.triangle, figures.triangle, figures.triangle, figures.triangle]
            
        }
        
    },
    
    loadLevel: function () {

        this.setCurrentLevel();

        for (lvl in this.levels) {
            
            if (lvl.number === this.currentLevel) {
                
                figures.loadImages();
                this.setKey(lvl);
                
            }

        }

    },
    
    setKey: function (_lvl) {
        
        var lastFigure = _lvl.figures.length - 1;
        key = _lvl.figures[lastFigure];
        
    },

    setCurrentLevel: function() {
        
        this.currentLevel < 4 ?
            this.currentLevel++ :
            this.currentLevel = 1;
    
    }

};



/*
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
 
 function setLevel() {
 
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