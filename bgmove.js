var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var bgImage = new Image();
bgImage.src = './bgmove.jpg';

var x = 0;
function animate() {
    ctx.drawImage(bgImage, x--, 0, 2400, 600);

    if(x <= -1600){
        x = 0;
    }
}

var animateInterval = setInterval(animate, 30);