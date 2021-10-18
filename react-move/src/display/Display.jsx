import React, {useEffect, useRef, useState} from 'react';
import bg from '../images/bg-divebar.png';
import character from '../images/character.png';

const Display = () => {
    const canvasRef = useRef();
    const requestAnimationRef = useRef(null);
    const positionRef = useRef({x: 200, y: 200, direction: 0, frame: 0});
    const [pressKey, setPressKey] = useState();

    const positionHandler = () => {
        switch(pressKey){
            case "ArrowLeft": 
                moveCharacter({x: -2, y: 0, direction: 3});
                return;
            case "ArrowUp": 
                moveCharacter({x: 0, y: -2, direction: 6});
                return;
            case "ArrowRight": 
                moveCharacter({x: 2, y: 0, direction: 9});
                return;
            case "ArrowDown": 
                moveCharacter({x: 0, y: 2, direction: 0});
                return;
            case "z": 
                moveCharacter({x: 0, y: 0, direction: 12});
                return;
            case "default":
                moveCharacter({x: 0, y: 0, direction: 0});
                return;
        }
        
    }

    const moveCharacter = ({x, y, direction}) => {
        positionRef.current.x += x;
        positionRef.current.y += y;
        positionRef.current.direction = direction;
        positionRef.current.frame = (positionRef.current.frame + 0.1) % 3;
    }

    const drawAll = () => {
        let imgBg = new Image();
        imgBg.src = bg;

        let imgChar = new Image();
        imgChar.src = character;

        const {x, y, direction, frame} = positionRef.current;

        imgBg.onload = () => {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(imgBg, 0, 0, 800, 800);
            context.drawImage(imgChar, 32 * parseInt(direction + frame), 0, 32, 32, x, y, 32, 32);
        }

        positionHandler();
        // requestAnimationRef.current = requestAnimationFrame(drawAll);
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            setPressKey(e.key);
        });
        window.addEventListener('keyup', (e) => setPressKey(null));
        // requestAnimationRef.current = requestAnimationFrame(drawAll);
        // return () => cancelAnimationFrame(requestAnimationRef.current);
        const interval = setInterval(drawAll, 10);
        return () => clearInterval(interval);
    }, [pressKey])

    return (
        <canvas width='800' height='800' ref={canvasRef} />
    )
}

export default Display;


/*
아래 : 0 1 2
왼쪽 : 3 4 5
위로 : 6 7 8
오른 : 9 10 11
춤 : 12 13 14 15

위 값들을 방향에 맞춰서 2번에서 32 * 0, 1, 2, ... 하면 됨

drawImage(1, 2, 3, 4, 5, 6, 7, 8, 9)
1 : 이미지 소스
2 : 이미지의 x좌표
3 : 이미지의 y좌표
4 : x크기만큼 이미지 사용
5 : y크기만큼 이미지 사용
6 : 캔버스 내부에 이미지가 존재할 x 위치
7 : 캔버스 내부에 이미지가 존재할 y 위치
8 : 이미지의 가로 길이 (x)
9 : 이미지의 세로 길이 (y)
 */