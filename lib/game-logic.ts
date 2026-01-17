import type { SpinResult } from "@/types/game"

export function generateSpinResult(): SpinResult {

  const type: 'noah' | 'dog' = Math.random() < 0.5 ? 'noah' : 'dog';

  const outcome: 'win' | 'loss' =  type === 'dog' ? 'win' : 'loss';

 const imageIndex = Math.floor(Math.random() * 12) + 1;

  const image = type === 'noah'
    ? `/noah/noah-${imageIndex}.jpg`
    : `/dogs/dog-${imageIndex}.jpg`

  return { outcome, type, image };
}

/**
 *
 * @param wager - The amount bet
 * @param outcome - 'win', 'loss', or 'tie'
 * @returns The amount to add/subtract from wallet (negative for loss)
 */
export function calculatePayout(wager: number, outcome: "win" | "loss" ): number {
  if (outcome = 'win') {
    return wager;
  } else {
    return -wager;
  }
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
  return wager > 0 && wager <= wallet;
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
  const newBalance = current + change;

  return Math.max(0, newBalance);
}

