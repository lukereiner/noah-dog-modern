// Quick manual testing script for game logic functions
// Run this with: npx tsx lib/test-game-logic.ts

import { generateSpinResult, calculatePayout, canPlaceBet } from "./game-logic"

console.log("=== Testing generateSpinResult ===\n")

// Test 1: Single result
console.log("Test 1: Generate a single result")
const result = generateSpinResult()
console.log("Result:", result)
console.log("")

// Test 2: Generate 10 results to see variety
console.log("Test 2: Generate 10 results to see distribution")
for (let i = 1; i <= 10; i++) {
  const spin = generateSpinResult()
  console.log(`Spin ${i}: ${spin.outcome} - ${spin.type} - ${spin.image}`)
}
console.log("")

// Test 3: Check distribution over 100 spins
console.log("Test 3: Distribution test (100 spins)")
let wins = 0
let losses = 0
let noahCount = 0
let dogCount = 0

for (let i = 0; i < 100; i++) {
  const spin = generateSpinResult()
  if (spin.outcome === "win") wins++
  if (spin.outcome === "loss") losses++
  if (spin.type === "noah") noahCount++
  if (spin.type === "dog") dogCount++
}

console.log(`Wins: ${wins} (${wins}%)`)
console.log(`Losses: ${losses} (${losses}%)`)
console.log(`Noah: ${noahCount} (${noahCount}%)`)
console.log(`Dog: ${dogCount} (${dogCount}%)`)
console.log("")

// Test 4: Verify noah = win, dog = loss
console.log("Test 4: Verify noah always means win, dog always means loss")
let errors = 0
for (let i = 0; i < 50; i++) {
  const spin = generateSpinResult()
  if (spin.type === "noah" && spin.outcome !== "win") {
    console.log(`ERROR: Noah should be a win, got ${spin.outcome}`)
    errors++
  }
  if (spin.type === "dog" && spin.outcome !== "loss") {
    console.log(`ERROR: Dog should be a loss, got ${spin.outcome}`)
    errors++
  }
}
if (errors === 0) {
  console.log("✓ All 50 tests passed: Noah = win, Dog = loss")
} else {
  console.log(`✗ Found ${errors} errors`)
}

// Test 4: Calculate Payout function
const spinTest4 = generateSpinResult();
const payout = calculatePayout(50, spinTest4.outcome);
console.log('Payout for $50 wage:', payout);

// Test 5: Can I bet $50 with $100 wallet?
console.log('Can bet $50 with $100 wallet?', canPlaceBet(100,50));
console.log('Can bet $150 with $100 wallet?', canPlaceBet(100,150));