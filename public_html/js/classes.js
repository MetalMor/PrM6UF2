/**
 * JAVASCRIPT DRAG'N'DROP CLASSES
 * 
 * Fitxer amb els constructors necessaris
 * 
 * 050216
 * @author mor
 */

// constructor de les diferents imatges que necessita el programa
var ImageSrcSet = function () {
    var folder = 'img/figures/';
    var ext = '.png';
    this.circle = folder + "circle" + ext;
    console.log('circle: ' + this.circle);
    this.square = folder + "square" + ext;
    console.log('square: ' + this.square);
    this.triangle = folder + "triangle" + ext;
    console.log('triangle: ' + this.triangle);
    this.diamond = folder + "diamond" + ext;
    console.log('diamond: ' + this.diamond);
};

// constructor del conjunt de figures utilitzades pel programa
var FigureSet = function () {
    this.images = new ImageSrcSet();
    console.log('all images loaded');
    this.addFigure = function (node, figure) {

        var _reqdId = node.id;
        var _figureElement = document.createElement('img');
        var _figureSrc = figure;

        _figureElement.setAttribute('src', _figureSrc);

        console.log('src: ' + _figureElement.src);
        document.getElementById(_reqdId).appendChild(_figureElement);

    };
    this.loadImages = function (currLvl) {

        var _nodeList = document.getElementsByClassName('staticSystemBox');
        var _currentLevel = currLvl;

        for (var counter = 0;
                counter < _nodeList.length;
                counter++) {
            console.log('current node: ' + _nodeList.item(counter).id);
            console.log('current figure: ' + _currentLevel.figures[counter]);
            this.addFigure(_nodeList.item(counter), _currentLevel.figures[counter]);
        }
        ;
    };
    
};
// Constructor d'un objecte nivell individual
var Level = function (number, figures) {
    this.number = number;
    this.figures = figures;
    console.log('loaded level ' + this.number);
};

// Constructor dels diferents nivells del joc
var LevelList = function (figures) {
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
};

// Constructor de l'objecte partida
var Game = function (_figureSet) {
    this.key = "any";
    this.currentLevel = 0;
    this.levels = new LevelList(_figureSet);
    this.figures = _figureSet;
    console.log('loaded levels');

    // Mira de carregar el següent nivell
    this.loadLevel = function () {

        var _levelList = this.levels;
        var lvl;

        this.setCurrentLevel();
        console.log("loading level " + this.currentLevel);

        for (lvl in _levelList) {

            console.log('level ' + _levelList[lvl].number + '?');
            if (_levelList[lvl].number == this.currentLevel) {
                console.log('yup! loading :D lvl ' + _levelList[lvl].number);
                this.figures.loadImages(_levelList[lvl]);
                this.setKey(_levelList[lvl]);
                console.log(this.key);

            } else {
                console.log('nope :(');
            }

        }

    };

    // Estableix l'últim objecte figura de l'array com a solució del joc.
    this.setKey = function (lvl) {

        var lastFigure = lvl.figures.length - 1;
        key = lvl.figures[lastFigure];

    };

    // Funció que canvia al següent nivell. En cas d'estar a l'últim, torna
    // a començar pel primer.
    this.setCurrentLevel = function setCurrentLevel() {

        this.currentLevel < 4 ?
                this.currentLevel++ :
                this.currentLevel = 1;

    };

};

var DndHandler = function () {

    var figureToCopy = "anyNodeElement";
    this.figureToCopy = figureToCopy;

    // FUNCIONS MANEGADORES DE L'API DRAG'N'DROP
    this.playerDragStart = function (e) { // AL COGER UN ELEMENTO DRAGNDROP
        // e.target o this és l'origen
        if (!e.target.classList.contains('pick')) {
            e.target.classList.add('pick');
            this.figureToCopy = e.target;
        }

        console.log(e.target.id + ' drag start: ' + e.target.classList.toString()
                + '; img id=' + this.figureToCopy.id);
    };

    this.playerDragEnd = function (e) { // LO QUE LE PASA AL ELEMENTO QUE HAS COGIDO CUANDO LO SUELTAS

        //e.target o this és l'origen
        e.target.classList.remove('pick');
        e.target.classList.remove('over');
        console.log('dragend ' + e.target.id + ': ' + e.target.classList.toString());

    };

    this.systemDragEnter = function (e) { // AL ENTRAR EN EL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
        //e.target o this és el desti
        if (e.target.childNodes.length === 0) {
            e.target.classList.add('over'); // le pone la clase over al div para q el css haga algo
            console.log('drag enter ' + e.target.id + ': ' + e.target.classList.toString());
        }

    };

    this.systemDragOver = function (e) { // AL PASAR POR ENCIMA DE OTRO ELEMENTO DRAGNDROP
        // e.target o this és el desti

        if (e.target.classList.contains("systemBox")) {
            if (e.preventDefault) {
                // evita otras movidas del comportamiento de la página, como los hipervínculos 
                // (sino alomejor al pasar por encima te envia para otra página, y no queremos eso D: )
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            console.log(e.target.id + ' drag over: ' + e.target.classList.toString() + '; ' +
                    this.figureToCopy.id + ' to copy');
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

        //console.log('data: ' + e.dataTransfer.getData('text'));
        if (e.target.childNodes.length <= 0 &&
                this.figureToCopy.src === this.game.key) { // si el destino no tiene una imagen asociada

            e.target.appendChild(document.getElementById(this.figureToCopy));
            e.target.childNodes[0].setAttribute("draggable", false);
            //this.setAttribute("src", e.dataTransfer.getData('text'));

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            console.log('drop on ' + e.target.id + ': ' + e.target.classList.toString());
            document.getElementById("newGame").setAttribute("type", "button");
        }

        e.target.classList.remove('over');

    };

    // Afegeix els handlers com a listeners d'HTML5
    this.setFigures = function (items) {

        [].forEach.call(items, function (item) {
            item.addEventListener('dragstart', this.playerDragStart, false);
            item.addEventListener('dragend', this.playerDragEnd, false);
            console.log(item.id + ' set');
        });

    };

    // Afegeix els handlers com a listeners d'HTML5
    this.setSystemBoxes = function (items) {

        /*document.getElementById("newGame")
         .addEventListener("onclick", this.game.loadLevel(), false);*/

        [].forEach.call(items, function (item) {
            item.addEventListener('dragenter', this.systemDragEnterHandler, false);
            item.addEventListener('dragover', this.systemDragOverHandler, false);
            item.addEventListener('dragleave', this.systemDragLeaveHandler, false);
            item.addEventListener('drop', this.systemDropHandler, false);
            console.log(item.id + ' set');
        });

    };

};

var FigureGame = function () {
    this.game = new Game(new FigureSet());
    this.dndHandler = new DndHandler();
};