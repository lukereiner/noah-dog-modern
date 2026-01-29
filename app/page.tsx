"use client";

import { useState } from "react";
import { useGameState } from "@/hooks/use-game-state";
import { ResultDisplay } from "@/components/ResultDisplay";
import { StatsDisplay } from "@/components/StatsDisplay";
import { Lever } from "@/components/Lever";
import { WalletDisplay } from "@/components/WalletDisplay";
import {
  canPlaceBet,
  generateSpinResult,
  calculatePayout,
} from "@/lib/game-logic";
import type { SpinResult } from "@/types/game";

export default function GamePage() {
  const { gameState, processSpin, updateWager, resetGame } = useGameState();
  const [result, setResult] = useState<SpinResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastOutcome, setLastOutcome] = useState<"win" | "loss" | null>(null);

  const handleLeverPull = async () => {
    // Step 1: Validate the bet
    if (!canPlaceBet(gameState.wallet, gameState.wager)) {
      alert("Insufficient funds or invalid wager!");
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
    /* placeBet({wager: gameState.wager}); */

    // Step 4: Wait a moment (simulate spinning time)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // spin for two seconds

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
  };

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-lg mx-auto">
        <header className="py-0 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-0">
            Does Noah got that DOG in 'em? 🦴
          </h1>
        </header>
        {/* Main game area */}
        <main className="container mx-auto px-4 py-2 max-w-6xl">
          <div className="grid grid-cols-1 gap-4">
            {/* Stats Section */}
            <div className="mt-0 grid grid-cols-1 gap-8">
              <div>
                <StatsDisplay wins={gameState.wins} losses={gameState.losses} />
              </div>
            </div>

            {/* Middle Column: result display */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center justify-center">
                <ResultDisplay result={result} isSpinning={isSpinning} />
              </div>
            </div>

            {/* Wallet and Lever Row */}
            <div className="flex items-center gap-4">
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
                disabled={
                  isSpinning || !canPlaceBet(gameState.wallet, gameState.wager)
                }
                isSpinning={isSpinning}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                if (confirm("Are you sure you want to reset all progress?")) {
                  resetGame();
                  setLastOutcome(null);
                  setResult(null); // Clear result on reset
                }
              }}
              disabled={isSpinning}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold shadow-sm pt-4 mt-4"
            >
              Reset Game
            </button>
          </div>
        </main>

        {/* Footer */}

      </div>
    </div>
            <footer className="bg-gray-800 text-white p-3 text-center">
          <p>&copy; {new Date().getFullYear()} Noah Dog. All rights reserved.</p>
        </footer>
    </>
  );
}
