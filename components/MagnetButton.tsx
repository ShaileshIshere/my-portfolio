"use client"

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { Red_Hat_Text } from 'next/font/google';

const Red_Hat_Text_Font = Red_Hat_Text({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-red-hat-text'
})

interface MagnetButtonProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    magneticStrength?: number;
    magneticContentStrength?: number;
    width: string;
    height: string;
    rounded?: string;
    position?: string;
}

const MagnetButton = ({ 
    children,
    className = "",
    style = {},
    onClick,
    magneticStrength = 60,
    magneticContentStrength = 120,
    width,
    height,
    rounded = "full",
    position = "relative"
}: MagnetButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const activateMagneto = (event: MouseEvent) => {
        const magneto = buttonRef.current;
        const magnetoContent = contentRef.current;
        const boundBox = magneto?.getBoundingClientRect();
        
        if (!boundBox || !magneto || !magnetoContent) return;
        
        const newX = ((event.clientX - boundBox.left)/(magneto?.offsetWidth || 1)) - 0.5;
        const newY = ((event.clientY - boundBox.top)/(magneto?.offsetHeight || 1)) - 0.5;

        gsap.to(magneto, {
            duration: 1, 
            x: newX * magneticStrength,
            y: newY * magneticStrength,
            ease: "power4.easeOut"
        });

        gsap.to(magnetoContent, {
            duration: 1, 
            x: newX * magneticContentStrength,
            y: newY * magneticContentStrength,
            ease: "power4.easeOut"
        });
    };

    const resetMagneto = () => {
        const magneto = buttonRef.current;
        const magnetoContent = contentRef.current;
        
        if (!magneto || !magnetoContent) return;

        gsap.to(magneto, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });

        gsap.to(magnetoContent, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });
    };

    useEffect(() => {
        const magneto = buttonRef.current;
        
        const handleMouseMove = (e: MouseEvent) => {
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
    }, [magneticStrength, magneticContentStrength]);

    return(
        <button 
            ref={buttonRef}
            onClick={onClick}
            className={`${position} rounded-${rounded} border-none cursor-pointer flex justify-center items-center z-10 ${className}`}
            style={{
                width,
                height,
                ...style
            }}
        >
            <div ref={contentRef} className={`${Red_Hat_Text_Font.className}`}>
                {children}
            </div>
        </button>
    );
};

export default MagnetButton;