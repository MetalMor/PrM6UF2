/**
 * JAVASCRIPT DRAG'N'DROP CLASSES
 * 
 * Fitxer amb els constructors necessaris
 * 
 * 050216
 * @author mor
 */

function Figure(folder, name, ext) {
    this.name = name;
    this.src = folder + name + ext;
}

function Game() {
    this.currentLevel = 0;
    this.completedLevel = true;
    this.key = "any";
    this.figures = new FigureSet();
    this.timeCounter = [
        0,
        0,
        0,
        0
    ];
    this.systemNodeList = document.querySelectorAll('#b04');
    this.figureDiv = document.getElementById('player');
    this.figureList = [
        this.figures.circle,
        this.figures.square,
        this.figures.triangle,
        this.figures.diamond
    ];
    this.solutionList = [
        this.figures.diamond,
        this.figures.circle,
        this.figures.triangle,
        this.figures.square
    ];
    this.showTimeCount = function () {
        var count = this.timeCounter;
        var counter = 1;
        clearInterval(window.intervalRef);
        document.getElementById('timeCount').classList.remove("hidden");
        var nodeList = document.getElementsByClassName('timeCount');
        var rubbish = count.shift();
        for (var level in count) {
           nodeList[level].innerHTML = count[level].toString();
        }
    };
    this.hideTimeCount = function() {
        var timeCountDiv = document.getElementById('timeCount');
        if(!timeCountDiv.classList.contains('hidden'))
            timeCountDiv.classList.add("hidden");
    };
    this.pause = function () {
        if (!window.pause)
            window.pause = true;
        else
            window.pause = false;
    }
    this.setKey = function () {
        var curLvl = this.currentLevel - 1;
        this.key = this.solutionList[curLvl];
    };
    this.setTime = function () {
        if (this.currentLevel > 0) {
            console.log('time set for level: ' + this.currentLevel)
            this.timeCounter[this.currentLevel] = window.timeCount;
            window.timeCount = 0;
        }
    };
    this.setCurrentLevel = function () {
        this.setTime();
        if (this.currentLevel === 4) {
            this.gameOver();
        }
        this.currentLevel < 4 ? 
                this.currentLevel++ : 
                this.currentLevel = 1;
        this.completedLevel = false;
    };
    this.gameOver = function () {
        this.showTimeCount();
    };
    this.loadLevel = function () {
        var nodeList = document.querySelectorAll('.level');
        var currLvl = this.currentLevel - 1;
        var solutions = this.solutionList;
        
        console.log('loading current level: ' + this.currentLevel);
        for (var counter = 0; 
            counter < solutions.length; 
            counter++) {
                
            console.log('node to hide: ' + nodeList[counter].id);
            var nodeToHide = nodeList[counter];
            nodeToHide.classList.add('hidden');
            
        }
        nodeList[currLvl].classList.remove('hidden');
    };
}

function FigureSet() {
    var folder = 'img/figure/';
    var ext = '.png';
    this.circle = new Figure(folder, "circle", ext);
    this.square = new Figure(folder, "square", ext);
    this.triangle = new Figure(folder, "triangle", ext);
    this.diamond = new Figure(folder, "diamond", ext);
}

function FigureGame() {
    this.gameHandler = new Game();
    this.correctDrop = function () {
        if(figureGame.figureToCopy.id === figureGame.gameHandler.key.name)
            return true;
        return false;
    }
    // FUNCIONS MANEGADORES DE L'API DRAG'N'DROP
    this.playerDragStart = function (e) { // AL COGER UN ELEMENTO DRAGNDROP
        // e.target o this és l'origen
        if (!e.target.classList.contains('pick')) {
            e.target.classList.add('pick');
            figureGame.figureToCopy = e.target;
        }

        console.log(e.target.id + ' drag start: ' + e.target.classList.toString()
                + '; img id=' + figureGame.figureToCopy.id);
    };

    this.playerDragEnd = function (e) { // LO QUE LE PASA AL ELEMENTO QUE HAS COGIDO CUANDO LO SUELTAS

        //e.target o this és l'origen
        e.target.classList.remove('pick');
        e.target.classList.remove('over');
        console.log('dragend ' + e.target.id + ': ' + e.target.classList.toString());

    };

    this.systemDragEnter = function (e) { // AL ENTRAR EN EL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
        //e.target o this és el desti
        if (e.target.id === 'b04') {
            e.target.classList.add('over'); // le pone la clase over al div para q el css haga algo
            console.log('drag enter ' + e.target.id + ': ' + e.target.classList.toString() + 
                    '; current level: ' + figureGame.gameHandler.currentLevel);
        }

    };

    this.systemDragOver = function (e) { // AL PASAR POR ENCIMA DE OTRO ELEMENTO DRAGNDROP
        // e.target o this és el desti

        if (e.target.classList.contains("system")) {
            if (e.preventDefault) {
                // evita otras movidas del comportamiento de la página, como los hipervínculos 
                // (sino alomejor al pasar por encima te envia para otra página, y no queremos eso D: )
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            console.log(e.target.id + ' drag over: ' + e.target.classList.toString() + '; ' +
                    figureGame.figureToCopy.id + ' to copy');
            return false;
        }
    };

    this.systemDragLeave = function (e) { // AL SALIR DEL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
        //e.target o this és el desti
        e.target.classList.remove('over'); // le quita la clase over al div para q el css haga algo

        console.log('drag leave ' + e.target.id + ': ' + e.target.classList.toString());
    };

    this.systemDrop = function (e) { // LO QUE LE PASA AL ELEMENTO EN EL CUAL SUELTAS LA MOVIDA
        //e.target o this és el desti
        
        if ((e.target.id === 'b04') &&
                figureGame.correctDrop()) {

            console.log(figureGame.figureToCopy);
            figureGame.figureToCopy.classList.remove('pick');
            e.target.appendChild(figureGame.figureToCopy.cloneNode());
            //e.target.childNodes[1].setAttribute("draggable", false);
            //e.target.childNodes[0].setAttribute("draggable", false);

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            figureGame.gameHandler.completedLevel = true;
            figureGame.gameHandler.pause();
            
            console.log('drop on ' + e.target.id + ': ' + e.target.classList.toString());
        } else if (!figureGame.correctDrop()) {
            window.timeCount += 5;
        }

        e.target.classList.remove('over');

    };
}