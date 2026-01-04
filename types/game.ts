export interface GameState {
    wallet: number;
    wager: number;
    wins: number;
    losses: number;
}

// TODO: Define what a slot result looks like
export interface SlotResult {
    type: 'noah' | 'dog';
    randomNumber: number;
    image: string;
}

// TODO: Define what happens after a spin
export interface SpinResult {
    outcome: 'win' | 'loss';
    slot: SlotResult[];
}

export interface GameState{};
export interface SlotResult{};
export interface SpinResult{};
