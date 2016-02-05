/**
 * JAVASCRIPT FIGURES DRAG'N'DROP
 * 
 * 040216
 * @author mor
 */

var correctDrop = false;
var figureToCopy;

// HANDLERS DE LES FIGURES PER JUGAR
function playerDragStartHandler(e) { // AL COGER UN ELEMENTO DRAGNDROP
    // e.target o this és l'origen
    if(!this.classList.contains('pick')) {
        this.classList.add('pick');
        figureToCopy = this.id;
        //getElementSrc(e);
    }
    
    console.log(this.id + ' drag start: ' + this.classList.toString()
            + '; img id=' + figureToCopy);
}

function playerDragEndHandler(e) { // LO QUE LE PASA AL ELEMENTO QUE HAS COGIDO CUANDO LO SUELTAS
    
    //e.target o this és l'origen
    this.classList.remove('pick');
    this.classList.remove('over');
    console.log('dragend ' + this.id + ': ' + this.classList.toString());
    
}

// HANDLERS DELS DIVS DE DESTINACIÓ
function systemDragOverHandler(e) { // AL PASAR POR ENCIMA DE OTRO ELEMENTO DRAGNDROP
    // e.target o this és el desti
    
    if (this.classList.contains("systemBox")) {
        if (e.preventDefault) {
            // evita otras movidas del comportamiento de la página, como los hipervínculos 
            // (sino alomejor al pasar por encima te envia para otra página, y no queremos eso D: )
            e.preventDefault();
        }
        
        e.dataTransfer.dropEffect = 'move';
        console.log(this.id + ' drag over: ' + this.classList.toString() + '; ' + 
                figureToCopy + ' to copy');
        return false;
    }
}

function systemDragEnterHandler(e) { // AL ENTRAR EN EL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
    //e.target o this és el desti
    if (this.childNodes.length === 0) {
        this.classList.add('over'); // le pone la clase over al div para q el css haga algo
        console.log('drag enter ' + this.id + ': ' + this.classList.toString());
    }
    
}

function systemDragLeaveHandler(e) { // AL SALIR DEL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
    //e.target o this és el desti
    this.classList.remove('over'); // le quita la clase over al div para q el css haga algo

    console.log('drag leave ' + this.id + ': ' + this.classList.toString());
}

// no rula bien
function systemDropHandler(e) { // LO QUE LE PASA AL ELEMENTO EN EL CUAL SUELTAS LA MOVIDA
    //e.target o this és el desti

    //console.log('data: ' + e.dataTransfer.getData('text'));
    if (this.childNodes.length <= 0) { // si el destino no tiene una imagen asociada
        
        this.appendChild(document.getElementById(figureToCopy));
        this.childNodes[0].setAttribute("draggable", false);
        //this.setAttribute("src", e.dataTransfer.getData('text'));

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        console.log('drop on ' + this.id + ': ' + this.classList.toString());
    }
    
    this.classList.remove('over');
    
}

function setDndHandlers(items) {
    [].forEach.call(items, function (item) {
        item.addEventListener('dragstart', playerDragStartHandler, false);
        item.addEventListener('dragend', playerDragEndHandler, false);
        console.log(item.id + ' set');
    });
}

function setSystemBoxHandlers(items) {
    [].forEach.call(items, function (item) {
        item.addEventListener('dragenter', systemDragEnterHandler, false);
        item.addEventListener('dragover', systemDragOverHandler, false);
        item.addEventListener('dragleave', systemDragLeaveHandler, false);
        item.addEventListener('drop', systemDropHandler, false);
        console.log(item.id + ' set');
    });
}