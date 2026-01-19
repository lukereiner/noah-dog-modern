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
  const { gameState, placeBet, processSpin, updateWager, resetGame } = useGameState();
  const [result, setResult] = useState<SpinResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastOutcome, setLastOutcome] = useState<'win' | 'loss' | null>(null);

  const handleLeverPull = async () => {
    // Step 1: Validate the bet
    if (!canPlaceBet(gameState.wallet, gameState.wager)) {
      alert('Insufficient funds or invalid wager!');
      return;
    }

    if (isSpinning) {
      return;
    }

    // Step 2: Start spinning animation
    setIsSpinning(true);
    setLastOutcome(null); // clear previous outcome
    setResult(null); // clear previous result image

    // Step 3: deduct wager from wallet (this updates react query state)
    placeBet({wager: gameState.wager});

    // Step 4: Wait a moment (simulate spinning time)
    await new Promise(resolve => setTimeout(resolve, 2000)); // spin for two seconds

    // Step 5: generate random result
    const spinResult = generateSpinResult();

    // Step 6: Calculate payout based on wager and outcome
    const payout = calculatePayout(gameState.wager, spinResult.outcome);

    // Step 7: Update result display with the final result
    setResult(spinResult); // Set the result for ResultDisplay
    setLastOutcome(spinResult.outcome);

    // Step 8: Stop spinning animation
    setIsSpinning(false);

    // Step 9: Update wallet and stats in React Query state
    processSpin({ outcome: spinResult.outcome, payout });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <header className='py-6 px-4 text-center border-b border-gray-700'>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Does Noah got that DOG in 'em? 🦴</h1>
          <p className='text-gray-400'>Pull the lever and find out!</p>
        </header>
        
        {/* Main game area */}
        <main className='container mx-auto px-4 py-8 max-w-6xl'>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: wallet and controls */}
            <div className='dpace-y-6'>
              {/* WalletDisplay component - shows balance and wager controls */}
              <WalletDisplay 
                wallet={gameState.wallet}
                wager={gameState.wager}
                onWagerChange={updateWager}
                disabled={isSpinning}
                minWager={100}
                maxWager={1000}
              />
              {/* Lever Button */}
              <Lever 
                onClick={handleLeverPull}
                disabled={isSpinning || !canPlaceBet(gameState.wallet, gameState.wager)}
                isSpinning={isSpinning}
              />
              {/* Reset Button */}
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all progress?')) {
                    resetGame();
                    setLastOutcome(null);
                    setResult(null); // Clear result on reset
                  }
                }}
                disabled={isSpinning}
                className='w-full py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold shadow-sm'
              >
                Reset Game
              </button>
            </div>

            {/* Middle Column: result display */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-lg p-8 shadow-md flex items-center justify-center">
                <ResultDisplay 
                  result={result}
                  isSpinning={isSpinning}
                />
              </div>
            </div>

            {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <StatsDisplay 
                wins={gameState.wins}
                losses={gameState.losses}
              />
            </div>
          </div>
          </div>
        </main>

        {/* Footer */}
        <footer>
          <p>&copy; {new Date().getFullYear()} Noah Dog Game. All rights reserved</p>
        </footer>

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
