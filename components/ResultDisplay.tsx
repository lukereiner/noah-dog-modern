'use client';

import Image from 'next/image';
import type { SpinResult } from "@/types/game";
import styles from './ResultDisplay.module.css';
import { useEffect, useState } from 'react';

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
    `His knee wasn't injured..`,
    `Only did 1 week of Titus 10`,
    `Loves the Irish goodbye`,
    `Drives under 200 yards 🏌🏻`,
    `Dude, he 3 putts ⛳`,
    `He drives a post-90s 4R 🚙`,
    `Shoots 72 at par 3 👏🏻`,
    `Plays 🎾 w/ untied shoes`,
]

export function ResultDisplay({ result, isSpinning }: ResultDisplayProps) {
    const displayImage = result?.image || `/noah/noah-9.jpg`;
    const displayOutcome = result?.outcome;
    const [randomWordIndex, setRandomWordIndex] = useState(0)

    useEffect(() => {
        if (result?.outcome === 'win') {
            const dogAudio = new Audio('/got-that-dog-audio.wav');
            dogAudio.play();
        }
    }, [result])

    useEffect(() => {
        if (isSpinning) {
            setRandomWordIndex(Math.floor(Math.random() * randomWordList.length));
        }
    }, [isSpinning])

    return (
        <div className='flex flex-col items-center gap-4'>
            <div className={
                `relative w-42 h-42 rounded-lg overflow-hidden border-4
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
                <div className='flex items-cetner justify-center'>
                    <p className='text-white text-xl font-bold animate-pulse'>
                        {randomWordList[randomWordIndex]}
                    </p>
                </div>
            )}


        {!isSpinning && result && (
            <div className={
                `text-xl font-bold
                ${result?.outcome === 'win' ? 'text-green-500' : 'text-red-500'}`
            }>
            {result?.outcome === 'win' ? '🐕‍🦺 GOT THAT DOG! 🦴': '🧸 Just Noah... 🎀'}
            </div>
        )}

        <div role='status' aria-live='polite' className='sr-only'>
            {result?.outcome === 'win' ? 'GOT THAT DOG!' : 'Just Noah...'}
            </div>
        </div>
    )
}