"use client"

import { useEffect } from 'react';
import gsap from 'gsap';

const MagnetButton = () => {
    const activateMagneto = (event: MouseEvent) => {
        const magneto = document.querySelector('button');
        const magnetoText = document.querySelector('button span');
        const boundBox = magneto?.getBoundingClientRect();
        
        if (!boundBox || !magneto || !magnetoText) return;
        
        const magnetoStrength = 60;
        const magnetoTextStrength = 120;
        const newX = ((event.clientX - boundBox.left)/(magneto?.offsetWidth || 1)) - 0.5;
        const newY = ((event.clientY - boundBox.top)/(magneto?.offsetHeight || 1)) - 0.5;

        gsap.to(magneto, {
            duration: 1, 
            x: newX * magnetoStrength,
            y: newY * magnetoStrength,
            ease: "power4.easeOut"
        });

        gsap.to(magnetoText, {
            duration: 1, 
            x: newX * magnetoTextStrength,
            y: newY * magnetoTextStrength,
            ease: "power4.easeOut"
        });
    };

    const resetMagneto = () => {
        const magneto = document.querySelector('button');
        const magnetoText = document.querySelector('button span');
        
        if (!magneto || !magnetoText) return;

        gsap.to(magneto, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });

        gsap.to(magnetoText, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });
    };

    useEffect(() => {
        const magneto = document.querySelector('button');
        magneto?.addEventListener('mousemove', activateMagneto);
        magneto?.addEventListener('mouseleave', resetMagneto);

        return () => {
            magneto?.removeEventListener('mousemove', activateMagneto);
            magneto?.removeEventListener('mouseleave', resetMagneto);
        };
    }, []);

    return(
        <button className="w-[17rem] h-[17rem] rounded-full border-none cursor-pointer flex justify-center items-center" 
            style={{
                background: 'linear-gradient(to bottom, #446681 50%, #446681 30%, white)'
            }}
        >
            <span className="text-2xl font-medium text-white">Get In Touch</span>
        </button>
    );
};

export default MagnetButton;