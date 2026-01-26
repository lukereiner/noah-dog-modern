// lib/__tests__/game-logic.test.ts
import { generateSpinResult, calculatePayout, canPlaceBet } from '../game-logic'

describe('Game Logic', () => {
  describe('generateSpinResult', () => {
    test('should return a SpinResult with outcome, type, and image', () => {
      // calling the function
      const result = generateSpinResult();

      // check the result
      expect(result.outcome).toMatch(/win|loss/);
      expect(result.type).toMatch(/noah|dog/);
      expect(result.image).toMatch(/(noah|dogs)\/.*\.jpg$/);
    });

    test('should have valid image paths and types', () => {
      // testing multiple times to ensure variety
      for (let i = 0; i < 10; i++) {
        const result = generateSpinResult();

        // check each slot has a valid image path and type
        expect(result.image).toMatch(/(noah|dogs)\/.*\.jpg$/);
        expect(result.type).toMatch(/noah|dog/);
      }
    });

    test('should produce win and loss outcome over many spins', () => {
      // test checks if all outcome are possible with random generation
      // it's not deterministic, so we run it many times and check for presence
      const outcomes = new Set<string>();
      const numSpins = 1000; // large number for statistical probability

      for (let i = 0; i < numSpins; i++) {
        const result = generateSpinResult();
        outcomes.add(result.outcome);
      }

      // expect to see at least on of each outcome over many spins
      expect(outcomes.size).toBeGreaterThanOrEqual(1); // at least one outcome
      expect(outcomes.has('win')).toBe(true);
      expect(outcomes.has('loss')).toBe(true);
    });
  });

  describe('calculatePayout', () => {
    test('should return positive payout on win', () => {
      expect(calculatePayout(50, 'win')).toBe(50); // wins wager back + 1x profit
    });

    test('should return negative payout on loss', () => {
      expect(calculatePayout(50, 'loss')).toBe(-50); // lose the wager
    });
  });

  describe('canPlaceBet', () => {
    test('should return true when wager is valid and affordable', () => {
      // test valid bet
      expect(canPlaceBet(100, 50)).toBe(true);
    });

    test('should return false when wager exceeds wallet', () => {
      expect(canPlaceBet(50, 100)).toBe(false);
    });

    test('should return false when wager is zero', () => {
      expect(canPlaceBet(100, 0)).toBe(false);
    });

    test('should return false when wager is negative', () => {
      expect(canPlaceBet(100, -30)).toBe(false);
    });

    test('should return false when wallet is zero', () => {
      expect(canPlaceBet(0, 50)).toBe(false);
    });

    test('should return false if wallet is zero and wager is zero', () => {
      expect(canPlaceBet(0, 0)).toBe(false);
    });
  });
})