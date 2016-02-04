/**
 * JAVASCRIPT FIGURES DRAG'N'DROP
 * 
 * 040216
 * @author mor
 */

var file = "img/";
var ext = ".png";
var circle = "circle" + ext;
var square = "square" + ext;
var triangle = "triangle" + ext;
var diamond = "diamond" + ext;

var figureArray01 = [circle, square, triangle, diamond];
var figureArray02 = [diamond, diamond, diamond, diamond];
var figureArray03 = [triangle, square, triangle, square];
var figureArray04 = [diamond, triangle, square, circle];

var correctDrop = false;

// HANDLERS DE DRAG AND DROP
function dragStartHandler(i) { // AL COGER UN ELEMENTO DRAGNDROP
    if(!this.classList.hasOwnProperty('pick'))
        this.classList.add('pick');
    
    console.log(this.id + ' drag start: ' + this.classList.toString());
}

function dragOverHandler(e) { // AL PASAR POR ENCIMA DE OTRO ELEMENTO DRAGNDROP
    // e.target o this és el desti
    
    if (e.preventDefault) {
        // evita otras movidas del comportamiento de la página, como los hipervínculos 
        // (sino alomejor al pasar por encima te envia para otra página y no queremos eso D: )
        e.preventDefault();
        //ens permet deixar
    }
    e.dataTransfer.dropEffect = 'move';
    console.log('drag over ' + this.id + ': ' + this.classList.toString());
    return false;
}

function dragEnterHandler(e) { // AL ENTRAR EN EL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
    //e.target o this és el desti
    this.classList.add('over'); // le pone la clase over al div para q el css haga algo
    console.log('drag enter ' + this.id + ': ' + this.classList.toString());
    
}

function dragLeaveHandler(e) { // AL SALIR DEL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
    //e.target o this és el desti
    this.classList.remove('over'); // le pone la clase over al div para q el css haga algo

    console.log('drag leave ' + this.id + ': ' + this.classList.toString());
}

function dropHandler(e) { // LO QUE LE PASA AL ELEMENTO EN EL CUAL SUELTAS LA MOVIDA
    //e.target o this és el desti

    this.innerHTML = '<b>final</b>';
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    console.log('drop on ' + this.id + ': ' + this.classList.toString());
    return false;
}

function dragEndHandler(e) { // LO QUE LE PASA AL ELEMENTO QUE HAS COGIDO CUANDO LO SUELTAS
    
    //e.target o this és l'origen
    this.classList.remove('pick');
    this.classList.remove('over');
    
    console.log('dragend ' + this.id + ': ' + this.classList.toString());
    
}

function setDndHandlers(items) {
    [].forEach.call(items, function (item) {
        item.addEventListener('dragstart', dragStartHandler, false);
        item.addEventListener('dragenter', dragEnterHandler, false);
        item.addEventListener('dragover', dragOverHandler, false);
        item.addEventListener('dragleave', dragLeaveHandler, false);
        item.addEventListener('drop', dropHandler, false);
        item.addEventListener('dragend', dragEndHandler, false);

    });
}

function setSystemBoxes(items) {
    
}

window.onload = function () {

    var playerItems = document.querySelectorAll('.playerBox');
    var systemItems = document.querySelectorAll('.systemBox');
    
    // ASSIGNA LISTENERS ALS ELEMENTS DIV
    setDndHandlers(playerItems);
    
    

};