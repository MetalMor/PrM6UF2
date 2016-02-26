/**
 * JAVASCRIPT FUNCIONS DRAG'N'DROP
 * 
 * 040216
 * @author mor
 */

function timeCounter() {
    if(!window.pause)
        window.timeCount++;
    return window.timeCount;
}

function nextLevel() {
    var handler = figureGame.gameHandler;
    if(handler.completedLevel) {
        handler.setCurrentLevel();
        handler.setKey();
        handler.loadLevel();
        handler.pause();
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

function validateBrowser() {
    var isSupported;
    var body = document.getElementsByTagName('body')[0];
    if (navigator.userAgent.indexOf("Chrome") > -1) {
        alert('supported');
        isSupported = 'supported';
    } else {
        alert('.notSupported');
        isSupported = 'notSupported';
    }
    var nodeList = body.getElementsByClassName(isSupported);
    for (var node in nodeList) {
        nodeList[node].classList.remove('hidden');
    }
}

function main() {
    
    figureGame = new FigureGame();
    
    var playerItems = document.querySelectorAll('.figure');
    var systemItems = document.querySelectorAll('#b04');
    
    window.timeCount = 0;
    window.tc = timeCounter;
    window.pause = true;
    
    window.intervalRef = window.setInterval(function() {
        document.querySelector('#time').innerHTML = window.tc();
    }, 1000);
    
    setFigures(playerItems);
    setSystemBoxes(systemItems);
    
    nextLevel();
    
}