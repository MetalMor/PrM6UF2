window.onload = function () {

    var playerItems = document.querySelectorAll('.playerBox');
    var systemItems = document.querySelectorAll('.systemBox');
    
    // ASSIGNA LISTENERS ALS ELEMENTS DIV
    setDndHandlers(playerItems);
    setSystemBoxHandlers(systemItems);
    
};