/**
 * JAVASCRIPT FUNCIONS DRAG'N'DROP
 * 
 * 040216
 * @author mor
 */

function timeCounter() {
    timeCount++;
    return timeCount;
}

function nextLevel() {
    var handler = figureGame.gameHandler;
    if(handler.completedLevel) {
        handler.timeCounter[handler.currentLevel] = timeCount;
        handler.setCurrentLevel();
        handler.setKey();
        handler.loadLevel();
        timeCount = 0;
    }
}

function setFigures(items) {

    [].forEach.call(items, function (item) {
        item.addEventListener('dragstart', figureGame.playerDragStart, false);
        item.addEventListener('dragend', figureGame.playerDragEnd, false);
        console.log(item.id + ' set');
    });

}

    // Afegeix els handlers com a listeners d'HTML5
function setSystemBoxes(items) {

    /*document.getElementById("newGame")
     .addEventListener("onclick", this.game.loadLevel(), false);*/

    [].forEach.call(items, function (item) {
        item.addEventListener('dragenter', figureGame.systemDragEnter, false);
        item.addEventListener('dragover', figureGame.systemDragOver, false);
        item.addEventListener('dragleave', figureGame.systemDragLeave, false);
        item.addEventListener('drop', figureGame.systemDrop, false);
        console.log(item.id + ' set');
    });

}

function main() {
    
    figureGame = new FigureGame();
    
    var playerItems = document.querySelectorAll('.figure');
    var systemItems = document.querySelectorAll('#b04');
    
    timeCount = 0;
    var tc = timeCounter;
    
    window.setInterval(function() {
        document.querySelector('#time').innerHTML = tc();
    }, 1000);
    
    setFigures(playerItems);
    setSystemBoxes(systemItems);
    
    nextLevel(figureGame);
    
}