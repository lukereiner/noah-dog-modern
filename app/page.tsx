"use client"

import { useState } from 'react'
import { useGameState } from '@/hooks/use-game-state'
import { ResultDisplay } from '@/components/ResultDisplay'
import { StatsDisplay } from '@/components/StatsDisplay'
import { Lever } from '@/components/Lever'
import { WalletDisplay } from '@/components/WalletDisplay'
import { canPlaceBet, generateSpinResult, calculatePayout } from '@/lib/game-logic'
import type { SpinResult } from '@/types/game'

export default function GamePage() {
  const {gameState, placeBet, processSpin, updateWager, resetGame } = useGameState();
  const [result, setResult] = useState<SpinResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastOutcome, setLastOutcome] = useState<'win' | 'loss' | null>(null);

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
        Result display here
        </div>

        {/* TODO: Task 3.2 - Add Lever component here */}
        <div className="mb-8 flex justify-center">
          {/* <Lever 
            onClick={() => {}}
            disabled={false}
            isSpinning={false}
          /> */}
      <button>lever goes here</button>
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
