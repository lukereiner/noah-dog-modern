export interface GameState {
    wallet: number;
    wager: number;
    wins: number;
    losses: number;
}

// TODO: Define what happens after a spin
export interface SpinResult {
    outcome: 'win' | 'loss';
    type: 'noah' | 'dog';
    image: string;
}

export interface GameState{};
export interface SpinResult{};
