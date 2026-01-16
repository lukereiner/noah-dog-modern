import type { SpinResult } from "@/types/game"

/**
 * TODO: Implement this function
 *
 * This should generate a random spin result
 * Hint: Look at your old main.js randomizeOutcome() function
 * Steps:
 * 1. Generate 3 random slots (each can be 'noah' or 'dog')
 * 2. Pick random images for each slot
 * 3. Determine if it's a win (all same), loss (all different), or tie
 * 4. Return a SpinResult object
 */
export function generateSpinResult(): SpinResult {

  const type: 'noah' | 'dog' = Math.random() < 0.5 ? 'noah' : 'dog';

  const outcome: 'win' | 'loss' =  type === 'noah' ? 'win' : 'loss';

 const imageIndex = Math.floor(Math.random() * 12) + 1;

  const image = type === 'noah'
    ? `/public/noah/noah-${imageIndex}.jpg`
    : `/public/dogs/dog-${imageIndex}.jpg`

  return { outcome, type, image };
}

/**
 * TODO: Implement this function
 *
 * Calculate how much money the player wins or loses
 *
 * @param wager - The amount bet
 * @param outcome - 'win', 'loss', or 'tie'
 * @returns The amount to add/subtract from wallet (negative for loss)
 */
export function calculatePayout(wager: number, outcome: "win" | "loss" | "tie"): number {
  // TODO: Implement payout logic
  // Hint: Win = +wager, Loss = -wager, Tie = 0?
  throw new Error("Not implemented yet - Task 2.2")
}

/**
 * TODO: Implement this function
 *
 * Check if the player has enough money to place a bet
 *
 * @param wallet - Current wallet amount
 * @param wager - Bet amount
 * @returns true if bet is valid, false otherwise
 */
export function canPlaceBet(wallet: number, wager: number): boolean {
  // TODO: Implement validation
  // Check: wager > 0, wager <= wallet, etc.
  throw new Error("Not implemented yet - Task 2.2")
}

/**
 * TODO: Implement this function
 *
 * Update the wallet amount
 *
 * @param current - Current wallet amount
 * @param change - Amount to add (positive) or subtract (negative)
 * @returns New wallet amount
 */
export function updateWallet(current: number, change: number): number {
  // TODO: Implement wallet update
  // Make sure wallet never goes negative!
  throw new Error("Not implemented yet - Task 2.2")
}

// TODO: Add more helper functions as needed
