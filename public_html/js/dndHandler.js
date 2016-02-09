/**
 * JAVASCRIPT FIGURES DRAG'N'DROP
 * 
 * 040216
 * @author mor
 */

function DndHandler() {
    var figureToCopy;
    this.figureToCopy = figureToCopy;
    this.playerDragStart = playerDragStartHandler();
    this.playerDragEnd = playerDragEndHandler();
    this.systemDragEnter = systemDragEnterHandler();
    this.systemDragOver = systemDragOverHandler();
    this.systemDragLeave = systemDragLeaveHandler();
    this.systemDrop = systemDropHandler();
    this.setFigures = setFigureHandlers();
    this.setSystemBoxes = setSystemBoxHandlers();
}

// HANDLERS DE LES FIGURES PER JUGAR
function playerDragStartHandler(e) { // AL COGER UN ELEMENTO DRAGNDROP
    // e.target o this és l'origen
    if(!e.target.classList.contains('pick')) {
        e.target.classList.add('pick');
        this.figureToCopy = e.target;
        //getElementSrc(e);
    }
    
    console.log(e.target.id + ' drag start: ' + e.target.classList.toString()
            + '; img id=' + this.figureToCopy.id);
}

function playerDragEndHandler(e) { // LO QUE LE PASA AL ELEMENTO QUE HAS COGIDO CUANDO LO SUELTAS
    
    //e.target o this és l'origen
    e.target.classList.remove('pick');
    e.target.classList.remove('over');
    console.log('dragend ' + e.target.id + ': ' + e.target.classList.toString());
    
}

// HANDLERS DELS DIVS DE DESTINACIÓ
function systemDragOverHandler(e) { // AL PASAR POR ENCIMA DE OTRO ELEMENTO DRAGNDROP
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
}

function systemDragEnterHandler(e) { // AL ENTRAR EN EL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
    //e.target o this és el desti
    if (e.target.childNodes.length === 0) {
        e.target.classList.add('over'); // le pone la clase over al div para q el css haga algo
        console.log('drag enter ' + e.target.id + ': ' + e.target.classList.toString());
    }
    
}

function systemDragLeaveHandler(e) { // AL SALIR DEL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
    //e.target o this és el desti
    e.target.classList.remove('over'); // le quita la clase over al div para q el css haga algo

    console.log('drag leave ' + e.target.id + ': ' + e.target.classList.toString());
}

// no rula bien
function systemDropHandler(e) { // LO QUE LE PASA AL ELEMENTO EN EL CUAL SUELTAS LA MOVIDA
    //e.target o this és el desti
    
    //console.log('data: ' + e.dataTransfer.getData('text'));
    if (e.target.childNodes.length <= 0 && 
            this.figureToCopy.src === game.key) { // si el destino no tiene una imagen asociada
        
        e.target.appendChild(document.getElementById(figureToCopy));
        e.target.childNodes[0].setAttribute("draggable", false);
        //this.setAttribute("src", e.dataTransfer.getData('text'));

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        console.log('drop on ' + e.target.id + ': ' + e.target.classList.toString());
        document.getElementById("newGame").setAttribute("type", "button");
    }
    
    e.target.classList.remove('over');
    
}

function setFigureHandlers(items) {
    
    [].forEach.call(items, function (item) {
        item.addEventListener('dragstart', this.playerDragStart, false);
        item.addEventListener('dragend', this.playerDragEnd, false);
        console.log(item.id + ' set');
    });
    
}

function setSystemBoxHandlers(items) {
    
    document.getElementById("newGame")
            .addEventListener("onclick", game.loadLevel(), false);
    
    [].forEach.call(items, function (item) {
        item.addEventListener('dragenter', this.systemDragEnterHandler, false);
        item.addEventListener('dragover', this.systemDragOverHandler, false);
        item.addEventListener('dragleave', this.systemDragLeaveHandler, false);
        item.addEventListener('drop', this.systemDropHandler, false);
        console.log(item.id + ' set');
    });
    
}