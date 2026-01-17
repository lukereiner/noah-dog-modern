"use client"

// TODO: Import your components here as you build them
import { useState } from 'react'
// import { WalletDisplay } from '@/components/wallet-display'
import { ResultDisplay } from '@/components/ResultDisplay'
import { canPlaceBet, generateSpinResult } from '@/lib/game-logic'
import type { SpinResult } from '@/types/game'
import { Lever } from '@/components/Lever'
// import { StatsDisplay } from '@/components/stats-display'

export default function GamePage() {
  const [result, setResult] = useState<SpinResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);

    // Simulate spinning delay
    setTimeout(() => {
      const newResult = generateSpinResult();
      setResult(newResult);
      setIsSpinning(false);
    }, 2000); // 2 second spin
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* TODO: Create a centered container */}
      <div className="max-w-4xl mx-auto">
        {/* TODO: Add game title */}
        <h1 className="text-4xl font-bold text-center mb-8">Does Noah got that DOG in 'em? 🦴</h1>

        {/* TODO: Task 3.1 - Add WalletDisplay component here */}
        <div className="mb-8">
          {/* <WalletDisplay 
            wallet={0} 
            wager={0} 
            onWagerChange={(newWager) => {}}
          /> */}
          <p className="text-gray-400 text-center">[Wallet Display Component Goes Here]</p>
        </div>

        {/* TODO: Task 3.1 - Add ResultDisplay component here (shows single Noah or Dog result) */}
        <div className="mb-8">
        <ResultDisplay result={result} isSpinning={isSpinning}/>
        </div>

        {/* TODO: Task 3.2 - Add Lever component here */}
        <div className="mb-8 flex justify-center">
          {/* <Lever 
            onClick={() => {}}
            disabled={false}
            isSpinning={false}
          /> */}
      <Lever
        onClick={handleSpin}
        disabled={isSpinning}
        isSpinning={isSpinning}
      />
        </div>

        {/* TODO: Task 3.3 - Add StatsDisplay component here (only wins and losses, NO ties) */}
        <div>
          {/* <StatsDisplay 
            wins={0} 
            losses={0}
          /> */}
          <p className="text-gray-400 text-center">[Stats Display Component Goes Here - Wins & Losses Only]</p>
        </div>
      </div>
    </div>
  )
}
