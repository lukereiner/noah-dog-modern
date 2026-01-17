import type { GameState } from "@/types/game";

const STORAGE_KEY = 'noahDogGameState';

export const DEFAULT_GAME_STATE: GameState = {
    wallet: 1000,
    wager: 50,
    wins: 0,
    losses: 0,
};

export function loadGameState(): GameState {
    if (typeof window === 'undefined') {
        return DEFAULT_GAME_STATE;
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return DEFAULT_GAME_STATE;
        }

        const parsed = JSON.parse(saved);

        return parsed as GameState;
    } catch (error) {
        console.error('Error loading game state:', error);
        return DEFAULT_GAME_STATE;
    }
};

export function saveGameState(state: GameState): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Error saving game state:', error);
    }
};

export function clearGameState(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}