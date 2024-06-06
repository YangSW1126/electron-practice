const {ipcRenderer} = require('electron');


window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('switch-cat', (event, args) => switchCat(args));
});


function switchCat(number){
    const img = document.getElementById('cat');
    img.src = `img/cat_0${number}.gif`;
}