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
    this.figureList = document.getElementById('player');
    /*
    this.figureList = [
        this.figures.circle,
        this.figures.square,
        this.figures.triangle,
        this.figures.diamond
    ];
    */
    this.solutionList = [
        this.figures.diamond,
        this.figures.circle,
        this.figures.triangle,
        this.figures.square
    ];
    this.setKey = function () {
        var curLvl = this.currentLevel - 1;
        this.key = this.solutionList[curLvl];
    };
    this.setTime = function () {
        this.timeCounter[this.currentLevel - 1] = timeCount;
    }
    this.setCurrentLevel = function () {
        if (this.currentLevel == 4) {
            this.restartAllLevels();
        }
        this.resetAllImages();
        this.currentLevel < 4 ? 
                this.currentLevel++ : 
                this.currentLevel = 1;
        this.setTime();
        this.completedLevel = false;
    };
    this.resetAllImages = function () {
        var imagesDiv = document.getElementsByClassName('figure');
        
        for (var counter = 0;
                counter < 4;
                counter++) {
            var currImage = this.figureList[counter];
            imagesDiv[counter].childNodes[1] = this.resetImage(currImage.name, currImage.src);
        }
        
        /*
        while (playerNodeList[counter].firstChild) {
            playerNodeList[counter].removeChild(playerNodeList[counter].firstChild);
            counter++;
        }
        
        for (var x in figures) {
            var newImg = document.createElement('img');
            newImg.setAttribute('id', figures[x].name);
            newImg.setAttribute('src', figures[x].src);
            playerNodeList[x].appendChild(newImg);
        }
        
        for (var counter = 0;
            counter < figures.length;
            counter++) {
                
            var tmpNode = playerNode[counter];
            var _figure = this.figureList[counter];
            
            if(playerNode.length < 4) {
                var newImageChild = document.createElement('img');

                newImageChild.setAttribute('id', _figure.name);
                newImageChild.setAttribute('src', _figure.src);

                tmpNode.appendChild(newImageChild);
            }
            
        }*/
        
    }
    this.resetImage = function(id, src) {
        var newImageNode = document.createElement('img');
        newImageNode.setAttribute('id', id);
        newImageNode.setAttribute('src', src);
        newImageNode.setAttribute('draggable', true);
        return newImageNode;
    }
    this.restartAllLevels = function () {
        var systemNodeList = document.querySelectorAll('#b04');
        var solutions = this.solutionList;
        
        console.log('restarting levels');
        for (var counter = 0;
            counter < solutions.length;
            counter++) {
            
            var imgToRemove = systemNodeList[counter].getElementsByTagName('img')[0];
            console.log('removing img: ' + imgToRemove.src);
            systemNodeList[counter].removeChild(imgToRemove);
            
        }
        
    }
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
    }
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
            e.target.appendChild(figureGame.figureToCopy);
            //e.target.childNodes[1].setAttribute("draggable", false);
            //e.target.childNodes[0].setAttribute("draggable", false);

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            figureGame.gameHandler.completedLevel = true;

            console.log('drop on ' + e.target.id + ': ' + e.target.classList.toString());
        } else if (!figureGame.correctDrop()) {
            timeCount += 5;
        }

        e.target.classList.remove('over');

    };
}