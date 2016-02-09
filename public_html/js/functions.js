/**
 * JAVASCRIPT FUNCIONS DRAG'N'DROP
 * 
 * 040216
 * @author mor
 */

function main(_folder, _ext) {

    var figureGame = new DndHandler(_folder, _ext);

    var playerItems = document.querySelectorAll('.playerBox');
    var systemItems = document.querySelectorAll('.systemBox');
    
    // ASSIGNA LISTENERS ALS ELEMENTS DIV
    figureGame.setFigures(playerItems);
    figureGame.setSystemBoxes(systemItems);
    
    // CRIDA A LA FUNCIÓ DE CÀRREGA DE LES IMATGES
    figureGame.game.loadLevel();
    
}

function playerDragStartHandler(e) { // AL COGER UN ELEMENTO DRAGNDROP
        // e.target o this és l'origen
        if (!e.target.classList.contains('pick')) {
            e.target.classList.add('pick');
            this.figureToCopy = e.target;
        }

        console.log(e.target.id + ' drag start: ' + e.target.classList.toString()
                + '; img id=' + this.figureToCopy.id);
    }