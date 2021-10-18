var canvas; // 도화지 객체
var context; // 화가 객체

// 플레이어 이동 방향과 속도
var dx = 0;
var dy = 0;

// 키 이벤트로 인해 인식된 keycode 변수
var keycode;

// 이미지 객체 생성
var imgChar = new Image(); // 캐릭터
imgChar.src = './ch.png';
var imgBg = new Image(); // 배경
imgBg.src = './bg.jpg';

// 플레이어 캐릭터의 중심좌표
var x = 300, y = 300; // 정 가운데로 위치
var w = 40, h = 40; // 플레이어 이미지의 절반 사이즈

function loaded() {
    canvas = document.querySelector('#c1'); // 도화지가 될 
    context = canvas.getContext('2d'); // 캔버스의 드로잉 컨텍스트를 반환 ('2d' => 2차원 렌더링 컨텍스트)

    runGame(); // 게임 진행 함수
    setInterval(runGame, 10); // 10ms 마다 runGame()을 다시 호출
}

function runGame(){
    moveAll(); // 캐릭터 움직이기
    drawAll(); // 이미지들 그리기
}

function moveAll(){
    // 플레이어 좌표 변경
    x += dx;
    y += dy;
}

function drawAll(){
    // 배경 그리기
    context.drawImage(imgBg, 0, 0, 400, 800);

    // 플레이어 그리기
    context.drawImage(imgChar, x-w, y-h, w*2, h*2);

    // 키 코드값 글씨 그리기
    context.fillStyle = 'white';
    context.font = '30px sans-serif';
    context.fillText(keycode, 10, 40);
}

function keydown(e){
    // 눌러진 key의 코드값
    keycode = e.keyCode;
    switch(keycode){
        case 37: dx = -1; break; // left
        case 38: dy = -1; break; // up
        case 39: dx = 1; break; // right
        case 40: dy = 1; break; // down
    }
}
function keyup(e){
    // 떨어진 key의 코드값
    keycode = e.keyCode;
    switch(keycode){
        case 37:
        case 39: dx = 0; break;
        case 38:
        case 40: dy = 0; break;
    }
}

window.addEventListener("DOMContentLoaded", ()=> {
    loaded();
    var body = document.querySelector('body');
    body.addEventListener('keydown', keydown);
    body.addEventListener('keyup', keyup);
})


// 참고 : https://lcw126.tistory.com/182