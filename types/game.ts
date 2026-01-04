export interface GameState {
    wallet: number;
    wager: number;
    wins: number;
    losses: number;
}

// TODO: Define what a slot result looks like
export interface SlotResult {
    type: 'noah' | 'dog';
    image: string;
}

// TODO: Define what happens after a spin
export interface SpinResult {
    
}

// TODO: Add more types as needed
