'use client';

import Image from 'next/image';
import type { SpinResult } from "@/types/game";
import styles from './ResultDisplay.module.css';
import { useEffect } from 'react';

interface ResultDisplayProps {
    result: SpinResult | null;
    isSpinning: boolean;
};

const randomWordList = [
    `LOL I don't think so...`,
    `I got money he doesn't 😄`,
    `He's all talk...`,
    `Does he really tho?`,
    `Doubt he's even about it`,
    `He barks like a poodle 🐩`,
    `His knee wasn't even injured 🏀`,
    `Only did 1 week of Titus 10`,
    `Lives by the Irish goodbye...`,
    `Drives under 200 yards 🏌🏻`,
    `Dude, he 3 putts ⛳`,
]

export function ResultDisplay({ result, isSpinning }: ResultDisplayProps) {
    const displayImage = result?.image || '/noah/noah-1.jpg';
    const displayOutcome = result?.outcome;

    useEffect(() => {
        if (result?.outcome === 'win') {
            const dogAudio = new Audio('/got-that-dog-audio.wav');
            dogAudio.play();
        }
    }, [result])

    const randomWordIndex = Math.floor(Math.random() * randomWordList.length)

    return (
        <div className='flex flex-col items-center gap-4'>
            <div className={
                `relative w-64 h-64 rounded-lg overflow-hidden border-4
                ${isSpinning ? styles.spinning : ''}
                ${displayOutcome === 'win' ? 'border-green-500' : ''}
                ${displayOutcome === 'loss' ? 'border-red-500' : 'border-gray-700'}`
            }>
                <Image src={displayImage || '/noah/noah-1.jpg'}
                alt={result?.type === 'noah' ? 'Noah' : 'Dog'}
                fill
                className='object-fill'/>
            </div>
            {isSpinning && (
                <div className='flex items-cetner jsutify-center'>
                    <p className='text-white text-2xl font-bold animate-pule'>
                        {randomWordList[randomWordIndex]}
                    </p>
                </div>
            )}


        {!isSpinning && result && (
            <div className={
                `text-2xl font-bold
                ${result?.outcome === 'win' ? 'text-green-500' : 'text-red-500'}`
            }>
            {result?.outcome === 'win' ? '🐕‍🦺 GOT THAT DOG! 🦴': '🧸 Just Noah... 🎀'}
            </div>
        )}
        </div>
    )
}