import React, { useEffect, useRef, useState } from 'react';

function Eyes() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const eyeLeft = useRef();
    const eyeRight = useRef();

    function Angle(element, eyeName) {
        if (!element.current) return;
    
        let elementX = element.current.offsetLeft + element.current.clientWidth / 2;
        let elementY = element.current.offsetTop + element.current.clientHeight / 2;
    
        const radians = Math.atan2(mouse.y - elementY, mouse.x - elementX);
        const rotation = radians * (180 / Math.PI);
    
        console.log(`${eyeName} - Element: x=${elementX}, y=${elementY}`);
        console.log(`${eyeName} - Mouse: x=${mouse.x}, y=${mouse.y}`);
        console.log(`${eyeName} - Rotation: ${rotation}`);
    
        return rotation + 90;
    }
    

    const getMouse = (e) => {
        setMouse({ x: e.clientX, y: e.clientY });
        console.log(`Mouse Coordinates: x=${e.clientX}, y=${e.clientY}`);
    };

    useEffect(() => {
        console.log('Adding event listener...');
        window.addEventListener('mousemove', getMouse);

        return () => {
            console.log('Removing event listener...');
            window.removeEventListener('mousemove', getMouse);
        };
    }, []);

    return (
        <div className='eyeContainer w-full h-screen bg-zinc-700 items-center flex justify-center gap-12'>
            <div
                ref={eyeLeft}
                style={{ transform: `rotate(${Angle(eyeLeft, 'Left')}deg)` }}
                className="eyeLeft w-[12rem] h-[12rem] bg-zinc-100 rounded-full "
            >
                <div className="lens w-[9rem] h-[9rem] bg-zinc-900 rounded-full relative mt-6 ml-6 after:w-[1.5rem] after:h-[1.5rem] after:bg-zinc-100 after:rounded-full after:absolute after:ml-14 after:mt-[1.5px] "></div>
            </div>

            <div
                ref={eyeRight}
                style={{ transform: `rotate(${Angle(eyeRight, 'Right')}deg)` }}
                className="eyeRight w-[12rem] h-[12rem] bg-zinc-100 rounded-full "
            >
                <div className="lens w-[9rem] h-[9rem] bg-zinc-900 rounded-full relative mt-6 ml-6 after:w-[1.5rem] after:h-[1.5rem] after:bg-zinc-100 after:rounded-full after:absolute after:ml-14 after:mt-[1.5px] "></div>
            </div>
        </div>
    );
}

export default Eyes;
