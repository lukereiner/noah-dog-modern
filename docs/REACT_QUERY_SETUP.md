# React Query Setup Guide

## What You'll Learn
- How to install React Query
- How to set up the QueryClient
- How to create custom hooks for your game state
- How to use localStorage with React Query

---

## Step 1: Install React Query

```bash
npm install @tanstack/react-query
```

---

## Step 2: Set Up QueryClient Provider

You need to wrap your app in a `QueryClientProvider`. This gives all components access to React Query.

### TODO: Update `app/layout.tsx`

```tsx
// Add these imports at the top
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

// Inside your RootLayout component, create a QueryClient
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Create a client (only once per app)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      },
    },
  }))

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

---

## Step 3: Create Game State Hook

Create a custom hook that manages your game state using React Query.

### TODO: Create `hooks/use-game-state.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { GameState } from '@/types/game'
import { generateSpinResult, calculatePayout, updateWallet } from '@/lib/game-logic'

const GAME_STATE_KEY = 'noah-dog-game-state'

// Default state when starting fresh
const DEFAULT_STATE: GameState = {
  wallet: 1000,
  wager: 10,
  wins: 0,
  losses: 0,
  ties: 0,
}

// Load state from localStorage
function loadGameState(): GameState {
  // TODO: Implement loading from localStorage
  // Hint: Use localStorage.getItem() and JSON.parse()
  // Return DEFAULT_STATE if nothing is saved
}

// Save state to localStorage
function saveGameState(state: GameState): void {
  // TODO: Implement saving to localStorage
  // Hint: Use localStorage.setItem() and JSON.stringify()
}

export function useGameState() {
  const queryClient = useQueryClient()

  // Load game state
  const { data: gameState } = useQuery({
    queryKey: ['gameState'],
    queryFn: loadGameState,
    // TODO: Add initialData option with DEFAULT_STATE
  })

  // Mutation to update wager
  const updateWager = useMutation({
    mutationFn: async (newWager: number) => {
      // TODO: Return updated game state with new wager
    },
    onSuccess: (newState) => {
      // TODO: Save to localStorage and update cache
      queryClient.setQueryData(['gameState'], newState)
    },
  })

  // Mutation to pull lever (play the game)
  const pullLever = useMutation({
    mutationFn: async () => {
      // TODO: Implement game logic
      // 1. Generate spin result
      // 2. Calculate payout
      // 3. Update wallet
      // 4. Update win/loss/tie counts
      // 5. Return new game state
    },
    onSuccess: (newState) => {
      // TODO: Save to localStorage and update cache
      queryClient.setQueryData(['gameState'], newState)
    },
  })

  // Mutation to reset game
  const resetGame = useMutation({
    mutationFn: async () => {
      return DEFAULT_STATE
    },
    onSuccess: (newState) => {
      saveGameState(newState)
      queryClient.setQueryData(['gameState'], newState)
    },
  })

  return {
    gameState: gameState || DEFAULT_STATE,
    updateWager: updateWager.mutate,
    pullLever: pullLever.mutate,
    resetGame: resetGame.mutate,
    isSpinning: pullLever.isPending,
  }
}
```

---

## Step 4: Use the Hook in Your Page

In `app/page.tsx`, import and use your hook:

```tsx
import { useGameState } from '@/hooks/use-game-state'

export default function GamePage() {
  const { gameState, updateWager, pullLever, resetGame, isSpinning } = useGameState()

  // Now you can use gameState.wallet, gameState.wager, etc.
  // And call updateWager(), pullLever(), resetGame()
}
```

---

## Understanding React Query Concepts

### useQuery
- Used for **reading** data
- Automatically caches results
- Can refetch data automatically

### useMutation
- Used for **changing** data
- Returns loading/error states
- Can update cache optimistically

### queryClient
- Global cache manager
- Use `setQueryData` to manually update cache
- Use `invalidateQueries` to refetch data

---

## Your Tasks

1. [ ] Install React Query
2. [ ] Set up QueryClientProvider in layout.tsx
3. [ ] Implement `loadGameState()` function
4. [ ] Implement `saveGameState()` function
5. [ ] Complete the `updateWager` mutation
6. [ ] Complete the `pullLever` mutation
7. [ ] Use the hook in your page component
8. [ ] Test that state persists across page refreshes

---

## Testing Your Implementation

1. Open the app in your browser
2. Place a bet and pull the lever
3. Check the wallet balance updates
4. Refresh the page - state should persist!
5. Open browser dev tools → Application → Local Storage
6. You should see your game state saved there

---

## Common Issues

**Issue**: State doesn't persist after refresh  
**Solution**: Make sure you're calling `saveGameState()` in `onSuccess` callbacks

**Issue**: TypeScript errors about types  
**Solution**: Make sure your `GameState` interface matches what you're saving/loading

**Issue**: "Cannot read property of undefined"  
**Solution**: Use optional chaining (`gameState?.wallet`) or provide default values
