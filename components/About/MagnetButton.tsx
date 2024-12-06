"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Red_Hat_Text } from 'next/font/google';

const Red_Hat_Text_Font = Red_Hat_Text({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-red-hat-text'
})

const MagnetButton = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const activateMagneto = (event: MouseEvent) => {
        const magneto = buttonRef.current;
        const magnetoText = textRef.current;
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
        const magneto = buttonRef.current;
        const magnetoText = textRef.current;
        
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
        const magneto = buttonRef.current;
        
        const handleMouseMove = (e: MouseEvent) => {
            // Only handle if the event target is our button
            if (e.target === magneto || magneto?.contains(e.target as Node)) {
                activateMagneto(e);
            }
        };

        magneto?.addEventListener('mousemove', handleMouseMove);
        magneto?.addEventListener('mouseleave', resetMagneto);

        return () => {
            magneto?.removeEventListener('mousemove', handleMouseMove);
            magneto?.removeEventListener('mouseleave', resetMagneto);
        };
    }, []);

    return(
        <button 
            ref={buttonRef}
            className="relative w-[17rem] h-[17rem] rounded-full border-none cursor-pointer flex justify-center items-center z-10" 
            style={{
                background: 'linear-gradient(to bottom, #446681 50%, #446681 30%, white)'
            }}
        >
            <span ref={textRef} className={`text-2xl font-medium text-white ${Red_Hat_Text_Font.className}`}>Get In Touch</span>
        </button>
    );
};

export default MagnetButton;