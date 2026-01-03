# Noah Dog Game - Modern Stack Migration Guide

## 🎯 Project Overview

You're going to rebuild your "Does Noah got that DOG in 'em?" gambling game using a modern professional web development stack. This guide will teach you each technology through hands-on implementation.

**What You'll Learn:**
- Next.js 16 (React Framework)
- TypeScript (Type Safety)
- Tailwind CSS (Utility-First Styling)
- CSS Modules (Scoped Styles)
- React Query (Data Management)
- Jest (Testing)
- Jest-axe (Accessibility Testing)
- Storybook (Component Development)

---

## 📚 Technology Breakdown

### 1. **Next.js 16** - The React Framework

**What is it?**  
Next.js is a React framework that provides structure, routing, and optimization out of the box. Instead of manually setting up React, Next.js gives you a production-ready application structure.

**Why use it?**  
- **File-based routing**: Files in `app/` folder automatically become routes
- **Server & Client Components**: Choose where code runs (server vs browser)
- **Built-in optimization**: Images, fonts, and code are automatically optimized
- **Easy deployment**: Deploy to Vercel with one click

**Key Concepts:**
- `app/page.tsx` = Your main page (like `index.html`)
- `app/layout.tsx` = Wrapper around all pages (like a template)
- `"use client"` = Marks components that run in the browser (need interactivity)
- Server Components (default) = Run on server, better performance

**In Your Project:**
- Your game will be a Client Component (needs interactivity)
- You'll use the App Router structure
- Images will be optimized automatically

---

### 2. **TypeScript** - JavaScript with Types

**What is it?**  
TypeScript is JavaScript with type definitions. It catches errors before you run your code.

**Why use it?**  
- **Catch bugs early**: Typos and wrong data types are caught while coding
- **Better autocomplete**: Your editor knows what properties exist
- **Self-documenting**: Types show what data functions expect
- **Refactoring confidence**: Change code safely with type checking

**Key Concepts:**
```typescript
// JavaScript (old way)
function addWager(amount) {
  return wallet - amount; // What if amount is a string?
}

// TypeScript (new way)
function addWager(amount: number): number {
  return wallet - amount; // TypeScript ensures amount is a number
}

// Interfaces define object shapes
interface GameState {
  wallet: number;
  wager: number;
  wins: number;
  losses: number;
}
```

**In Your Project:**
- Define types for your game state
- Type your functions (wager, spin, updateStats)
- Create interfaces for props passed to components

---

### 3. **Tailwind CSS** - Utility-First Styling

**What is it?**  
Instead of writing custom CSS classes, you compose styles using pre-built utility classes directly in your HTML/JSX.

**Why use it?**  
- **Fast development**: No switching between files
- **Consistent design**: Uses a design system (spacing, colors)
- **Responsive design**: Built-in mobile-first breakpoints
- **No naming conflicts**: No need to think of class names

**Key Concepts:**
```tsx
// Old CSS way
<div className="game-container">
  <button className="lever-button">Pull Lever</button>
</div>

// styles.css
.game-container { padding: 20px; background: #1a1a1a; }
.lever-button { padding: 10px 20px; background: blue; }

// Tailwind way
<div className="p-5 bg-gray-900">
  <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded">
    Pull Lever
  </button>
</div>
```

**Common Utilities:**
- `p-4` = padding: 1rem (16px)
- `mt-2` = margin-top: 0.5rem (8px)
- `bg-blue-500` = background color
- `text-xl` = font-size: 1.25rem
- `flex items-center justify-between` = flexbox layout
- `md:text-2xl` = responsive (only on medium screens+)

**In Your Project:**
- Style your game UI with Tailwind classes
- Use `flex` for layout instead of floats/absolute positioning
- Use responsive classes for mobile support

---

### 4. **CSS Modules** - Scoped Styling

**What is it?**  
CSS files that are scoped to a single component. Classes won't conflict with other components.

**Why use it?**  
- **No conflicts**: `.button` in one file won't affect `.button` in another
- **Co-located**: CSS lives next to the component that uses it
- **Best for complex animations**: When Tailwind isn't enough

**Key Concepts:**
```tsx
// lever.module.css
.leverHandle {
  animation: pull 0.5s ease-in-out;
}

@keyframes pull {
  0% { transform: translateY(0); }
  50% { transform: translateY(100px); }
  100% { transform: translateY(0); }
}

// lever.tsx
import styles from './lever.module.css'

<div className={styles.leverHandle}>Pull Me!</div>
```

**In Your Project:**
- Use CSS Modules for your lever pull animation
- Use CSS Modules for complex transitions
- Use Tailwind for everything else

---

### 5. **React Query (TanStack Query)** - Data State Management

**What is it?**  
A library for fetching, caching, and updating data. Even though your game doesn't fetch from an API, it's useful for managing client-side state.

**Why use it?**  
- **Automatic caching**: Don't recalculate data unnecessarily
- **Optimistic updates**: Update UI before data is saved
- **Synchronization**: Keep multiple components in sync
- **Better than localStorage alone**: More control over data flow

**Key Concepts:**
```tsx
// Old way (useState + useEffect)
const [gameState, setGameState] = useState(null);
useEffect(() => {
  const saved = localStorage.getItem('gameState');
  setGameState(JSON.parse(saved));
}, []);

// React Query way
const { data: gameState, mutate } = useQuery({
  queryKey: ['gameState'],
  queryFn: () => {
    const saved = localStorage.getItem('gameState');
    return JSON.parse(saved) || defaultState;
  }
});

// Update data
mutate({ wallet: 1000, wins: 5 });
```

**In Your Project:**
- Use React Query to manage game state
- Use mutations for actions (placeBet, pullLever, resetGame)
- Cache statistics and wallet data

---

### 6. **Jest** - JavaScript Testing Framework

**What is it?**  
A testing framework that lets you write automated tests for your code.

**Why use it?**  
- **Catch regressions**: Know if changes break existing features
- **Confidence**: Refactor without fear
- **Documentation**: Tests show how code should work
- **Professional standard**: All companies use tests

**Key Concepts:**
```typescript
// game-logic.test.ts
import { calculateWin } from './game-logic';

describe('Game Logic', () => {
  test('should return true when all three are Noah', () => {
    const result = calculateWin(['noah', 'noah', 'noah']);
    expect(result).toBe(true);
  });

  test('should return false when mixed', () => {
    const result = calculateWin(['noah', 'dog', 'noah']);
    expect(result).toBe(false);
  });
});
```

**In Your Project:**
- Test your game logic functions (win calculation, wallet updates)
- Test edge cases (wagering more than wallet, negative numbers)
- Test component rendering

---

### 7. **Jest-axe** - Accessibility Testing

**What is it?**  
A Jest plugin that checks your components for accessibility issues.

**Why use it?**  
- **Inclusive design**: Make your app usable by everyone
- **Legal compliance**: Many places require accessibility
- **Better UX**: Accessible apps are better for all users
- **Automated checks**: Catch issues automatically

**Key Concepts:**
```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<GameButton>Pull Lever</GameButton>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Accessibility Basics:**
- Use semantic HTML (`<button>` not `<div onClick>`)
- Add `alt` text to images
- Use proper heading hierarchy (`<h1>`, `<h2>`)
- Ensure color contrast is sufficient
- Add ARIA labels for screen readers

**In Your Project:**
- Add alt text to Noah/dog images
- Ensure lever button is keyboard accessible
- Test wallet display for screen readers
- Check color contrast on text

---

### 8. **Storybook** - Component Development Tool

**What is it?**  
A tool that lets you develop and test UI components in isolation, outside of your main app.

**Why use it?**  
- **Visual testing**: See all component states at once
- **Faster development**: No need to navigate through app
- **Documentation**: Living style guide for your components
- **Collaboration**: Designers can review components

**Key Concepts:**
```tsx
// Lever.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Lever } from './Lever';

const meta: Meta<typeof Lever> = {
  title: 'Game/Lever',
  component: Lever,
};

export default meta;
type Story = StoryObj<typeof Lever>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Pulling: Story = {
  args: {
    disabled: false,
    isPulling: true,
  },
};
```

**In Your Project:**
- Create stories for Lever component (default, pulling, disabled)
- Create stories for SlotDisplay (spinning, winning, losing)
- Create stories for WalletDisplay (different amounts)
- Create stories for StatsChart (different win/loss ratios)

---

## 🗺️ Migration Roadmap

### Phase 1: Project Setup ✅ (Completed for you)
- [x] Initialize Next.js project with TypeScript
- [x] Install and configure Tailwind CSS
- [x] Set up project structure

### Phase 2: Core Components (YOU BUILD THIS)

#### Task 2.1: Create Type Definitions
**What to do:**
1. Create `types/game.ts`
2. Define interfaces for:
   - `GameState` (wallet, wager, wins, losses, ties)
   - `SlotResult` (type: 'noah' | 'dog', image: string)
   - `SpinResult` (outcome: 'win' | 'loss' | 'tie', slots: SlotResult[])

**Learning Goal:** Understand TypeScript interfaces and type safety

**🎯 Breaking Down Task 2.1**

**Step 1: Understanding Interfaces**

An interface is like a blueprint that describes the shape of an object. Think of it like a contract - any object that claims to follow this interface MUST have these properties.

```typescript
// Example: A simple interface
interface Person {
  name: string;        // This person must have a name (text)
  age: number;         // This person must have an age (number)
  isStudent: boolean;  // This person must have isStudent (true/false)
}

// Valid - matches the interface
const alice: Person = {
  name: "Alice",
  age: 25,
  isStudent: true
};

// ERROR - missing 'age' property
const bob: Person = {
  name: "Bob",
  isStudent: false
  // TypeScript will complain!
};
```

**Step 2: Plan Your Game's Data**

Before writing code, think about what data your game needs to track. Look at your old `main.js` file:

**Questions to ask yourself:**
1. What numbers do I need to store about money? (Hint: look at `wallet` and `wager` in your old code)
2. What statistics am I tracking? (Hint: look at `wins`, `losses`, `ties`)
3. When a slot shows a result, what information does it need? (Hint: is it Noah or a dog? which image?)
4. When the lever is pulled, what information describes the whole result? (Hint: did you win? what are all three slots showing?)

**Step 3: Create the GameState Interface**

**Think about these questions:**
- What is the player's current wallet balance? (What type: number or string?)
- How much are they betting per spin? (What type?)
- How many times have they won? (What type?)
- How many times have they lost? (What type?)
- How many times have they tied? (What type?)

**Your task:**
```typescript
// types/game.ts

// TODO: Define the GameState interface
// This represents ALL the data about the current game session
export interface GameState {
  // TODO: Add property for wallet balance
  wallet: number;
  
  // TODO: Add property for current wager amount
  wager: number;
  
  // TODO: Add property for total wins
  wins: number;
  
  // TODO: Add property for total losses
  losses: number;
  
  // TODO: Add property for total ties
  ties: number;
}
```

**Hints:**
- All five properties should be `number` type
- Use clear, descriptive names (wallet, wager, wins, losses, ties)
- Remember: interfaces don't store values, they just describe the shape

**Step 4: Create the SlotResult Interface**

A `SlotResult` represents ONE slot machine position (left, middle, or right).

**Think about these questions:**
- Is the slot showing Noah or a dog? (How do you represent only 2 options?)
- What image file should be displayed? (What type stores file paths?)

**Your task:**
```typescript
// TODO: Define the SlotResult interface
// This represents a single slot position
export interface SlotResult {
  // TODO: Add property for type - should be ONLY 'noah' or 'dog'
  // Hint: Use a union type: 'noah' | 'dog'
  type: 'noah' | 'dog';
  
  // TODO: Add property for which image to show
  // Hint: This will be a string like '/noah-dog-media/noah/noah-1.jpg'
  image: string;
}
```

**TypeScript Concept - Union Types:**
```typescript
// Instead of just 'string' (could be anything)
type Animal = string;  // Could be "cat", "elephant", "spaceship" - no restriction!

// Use union type (can ONLY be specific values)
type Animal = 'noah' | 'dog';  // Can ONLY be "noah" or "dog" - TypeScript enforces this!
```

**Step 5: Create the SpinResult Interface**

A `SpinResult` represents the complete result of pulling the lever - all three slots AND whether you won.

**Think about these questions:**
- Did the player win, lose, or tie?
- What are the three slots showing? (You need an array of SlotResult)

**Your task:**
```typescript
// TODO: Define the SpinResult interface
// This represents the complete result of one lever pull
export interface SpinResult {
  // TODO: Add property for outcome - should be ONLY 'win', 'loss', or 'tie'
  // Hint: Use union type again: 'win' | 'loss' | 'tie'
  outcome: 'win' | 'loss' | 'tie';
  
  // TODO: Add property for all three slots
  // Hint: This is an ARRAY of SlotResult. How do you type an array in TypeScript?
  // Answer format: SlotResult[]
  slots: SlotResult[];
}
```

**TypeScript Concept - Arrays:**
```typescript
// Array of numbers
const ages: number[] = [25, 30, 42];

// Array of strings
const names: string[] = ["Alice", "Bob", "Charlie"];

// Array of your custom interface
const slots: SlotResult[] = [
  { type: 'noah', image: '/path/to/noah.jpg' },
  { type: 'dog', image: '/path/to/dog.jpg' },
  { type: 'noah', image: '/path/to/noah2.jpg' }
];
```

**Step 6: Export Everything**

Make sure all your interfaces are exported so other files can use them:

```typescript
export interface GameState { /* ... */ }
export interface SlotResult { /* ... */ }
export interface SpinResult { /* ... */ }
```

**Step 7: Verify Your Work**

After creating your interfaces, ask yourself:
1. ✅ Does GameState have 5 number properties?
2. ✅ Does SlotResult have a type that can ONLY be 'noah' or 'dog'?
3. ✅ Does SlotResult have an image property (string)?
4. ✅ Does SpinResult have an outcome that can ONLY be 'win', 'loss', or 'tie'?
5. ✅ Does SpinResult have a slots property that is an array of SlotResult?
6. ✅ Are all interfaces exported?

**Common Mistakes to Avoid:**

❌ **Don't do this:**
```typescript
interface GameState {
  wallet: any;  // 'any' defeats the purpose of TypeScript!
}
```

✅ **Do this:**
```typescript
interface GameState {
  wallet: number;  // Specific type!
}
```

❌ **Don't do this:**
```typescript
interface SlotResult {
  type: string;  // Too loose! Could be anything
}
```

✅ **Do this:**
```typescript
interface SlotResult {
  type: 'noah' | 'dog';  // Restricted to only valid values
}
```

**Testing Your Types (After You Write Them)**

Once you've created your interfaces, you can test them by trying to create objects:

```typescript
// In types/game.ts or create a temporary test file

// Test GameState
const testGame: GameState = {
  wallet: 1000,
  wager: 50,
  wins: 3,
  losses: 2,
  ties: 1
};

// Test SlotResult
const testSlot: SlotResult = {
  type: 'noah',
  image: '/noah-dog-media/noah/noah-1.jpg'
};

// Test SpinResult
const testSpin: SpinResult = {
  outcome: 'win',
  slots: [
    { type: 'noah', image: '/noah-dog-media/noah/noah-1.jpg' },
    { type: 'noah', image: '/noah-dog-media/noah/noah-2.jpg' },
    { type: 'noah', image: '/noah-dog-media/noah/noah-3.jpg' }
  ]
};

// If TypeScript doesn't show any errors, your interfaces are correct!
```

**Next Steps:**

After completing this task:
1. Move on to Task 2.2 (Build Game Logic)
2. You'll use these interfaces to type your functions
3. Example: `function generateSpinResult(): SpinResult { /* ... */ }`

---

#### Task 2.2: Build Game Logic (Pure Functions)
**What to do:**
1. Create `lib/game-logic.ts`
2. Write functions (WITHOUT React):
   - `generateSpinResult(): SpinResult` - Random outcome logic
   - `calculatePayout(wager: number, outcome: string): number`
   - `canPlaceBet(wallet: number, wager: number): boolean`
   - `updateWallet(current: number, change: number): number`

**Learning Goal:** Separate business logic from UI components

**🎯 Breaking Down Task 2.2**

**What are Pure Functions?**

A pure function is a function that:
1. Always returns the same output for the same input
2. Has no side effects (doesn't modify external variables, doesn't call APIs, doesn't change the DOM)
3. Only depends on its parameters

```typescript
// Pure function - always returns the same result
function add(a: number, b: number): number {
  return a + b;
}

// Impure function - depends on external state
let total = 0;
function addToTotal(amount: number) {
  total += amount;  // Modifies external variable!
  return total;
}
```

**Why Pure Functions?**
- Easy to test (predictable)
- Easy to debug (no hidden dependencies)
- Can be reused anywhere
- Business logic separated from UI

---

**Step 1: Set Up the File Structure**

Create `lib/game-logic.ts` and import your types:

```typescript
// lib/game-logic.ts
import type { SpinResult, SlotResult } from '@/types/game';

// Your functions will go here
```

---

**Step 2: Understand the Game Logic Flow**

Look at your old `main.js` file and trace through what happens when you pull the lever:

1. Generate 3 random slots (Noah or Dog)
2. Check if all 3 match (win), none match (loss), or some match (tie)
3. Calculate payout based on outcome
4. Update wallet balance
5. Update statistics

---

**Step 3: Create `generateSpinResult()` Function**

**Think about these questions:**
- How many slots do I need? (Answer: 3)
- How do I randomly choose between Noah and Dog?
- How do I randomly pick an image file?
- How do I determine if it's a win, loss, or tie?

**Your task:**
```typescript
/**
 * Generates a random spin result with 3 slots
 * @returns SpinResult with outcome and 3 slot results
 */
export function generateSpinResult(): SpinResult {
  // TODO: Create an array to hold 3 SlotResult objects
  const slots: SlotResult[] = [];
  
  // TODO: Loop 3 times to generate 3 slots
  for (let i = 0; i < 3; i++) {
    // TODO: Randomly decide if this slot is 'noah' or 'dog'
    // Hint: Use Math.random() - if < 0.5 it's noah, else dog
    const type: 'noah' | 'dog' = Math.random() < 0.5 ? 'noah' : 'dog';
    
    // TODO: Randomly pick an image file for this type
    // Hint: Look at noah-dog-media folder structure
    // Noah images: noah-dog-media/noah/noah-1.jpg through noah-10.jpg
    // Dog images: noah-dog-media/dogs/dog-1.jpg through dog-12.jpg
    
    const imageNumber = type === 'noah' 
      ? Math.floor(Math.random() * 10) + 1  // TODO: How many Noah images? (10)
      : Math.floor(Math.random() * 12) + 1; // TODO: How many dog images? (12)
    
    const image = type === 'noah'
      ? `/noah-dog-media/noah/noah-${imageNumber}.jpg`
      : `/noah-dog-media/dogs/dog-${imageNumber}.jpg`;
    
    // TODO: Add this SlotResult to the slots array
    slots.push({ type, image });
  }
  
  // TODO: Determine the outcome based on the three slots
  // Win = all 3 the same (noah, noah, noah OR dog, dog, dog)
  // Loss = all 3 different types (can't happen with just noah/dog, so loss = not all same)
  // Tie = 2 match, 1 different
  
  const types = slots.map(slot => slot.type);
  const noahCount = types.filter(t => t === 'noah').length;
  const dogCount = types.filter(t => t === 'dog').length;
  
  let outcome: 'win' | 'loss' | 'tie';
  
  // TODO: Write the logic to determine outcome
  if (noahCount === 3 || dogCount === 3) {
    outcome = 'win';  // All three match
  } else if (noahCount === 2 || dogCount === 2) {
    outcome = 'tie';  // Two match
  } else {
    outcome = 'loss';  // Should only happen if logic is flawed or 3+ types
  }
  
  return { outcome, slots };
}
```

**Hints:**
- `Math.random()` returns a number between 0 and 1
- `Math.floor(Math.random() * 10) + 1` returns a number between 1 and 10
- Count the Noah/Dog occurrences in the slots array to determine outcome

---

**Step 4: Create `calculatePayout()` Function**

**Think about these questions:**
- If the player wins, how much do they get? (Look at your old code)
- If they tie, do they get anything?
- If they lose, do they lose the wager?

**Your task:**
```typescript
/**
 * Calculates the payout amount based on wager and outcome
 * @param wager - The amount bet
 * @param outcome - 'win', 'loss', or 'tie'
 * @returns The amount to add to wallet (positive for win, negative for loss)
 */
export function calculatePayout(wager: number, outcome: 'win' | 'loss' | 'tie'): number {
  // TODO: Implement payout logic
  // Win = 2x wager (you get your wager back + 1x wager profit)
  // Tie = Get wager back (0 change)
  // Loss = Lose the wager (-wager)
  
  if (outcome === 'win') {
    return wager;  // Your wager back + profit = 2x wager total
  } else if (outcome === 'tie') {
    return 0;  // Wager is returned, no profit or loss
  } else {
    return -wager;  // Lose the wager
  }
}
```

**Verification:**
- If wager = 50 and outcome = 'win', what should return? (Check old code) → 50
- If wager = 50 and outcome = 'tie', what should return? → 0
- If wager = 50 and outcome = 'loss', what should return? → -50

---

**Step 5: Create `canPlaceBet()` Function**

**Think about these questions:**
- Can you bet if you have $0 in your wallet?
- Can you bet $100 if you only have $50?
- Can you bet a negative amount?

**Your task:**
```typescript
/**
 * Checks if the player can afford to place a bet
 * @param wallet - Current wallet balance
 * @param wager - Amount to bet
 * @returns true if bet is valid, false otherwise
 */
export function canPlaceBet(wallet: number, wager: number): boolean {
  // TODO: Return true only if:
  // 1. Wager is greater than 0
  // 2. Wager is less than or equal to wallet balance
  // 3. Wallet is greater than 0 (implicit if wager <= wallet and wallet is 0, but good to be explicit)
  
  return wager > 0 && wager <= wallet && wallet > 0;
}
```

**Test Cases to Think About:**
- `canPlaceBet(100, 50)` → should return true
- `canPlaceBet(100, 150)` → should return false (not enough money)
- `canPlaceBet(0, 50)` → should return false (no money left)
- `canPlaceBet(100, 0)` → should return false (can't bet nothing)
- `canPlaceBet(100, -10)` → should return false (can't bet negative)

---

**Step 6: Create `updateWallet()` Function**

**Think about these questions:**
- If wallet is $100 and change is +$50, what's the new wallet?
- If wallet is $100 and change is -$50, what's the new wallet?
- Should wallet ever go below $0?

**Your task:**
```typescript
/**
 * Updates the wallet balance
 * @param current - Current wallet amount
 * @param change - Amount to add (positive) or subtract (negative)
 * @returns New wallet balance (never below 0)
 */
export function updateWallet(current: number, change: number): number {
  // TODO: Calculate new wallet balance
  const newBalance = current + change;
  
  // TODO: Make sure it never goes below 0
  return Math.max(0, newBalance);
}
```

**Verification:**
- `updateWallet(100, 50)` → should return 150
- `updateWallet(100, -30)` → should return 70
- `updateWallet(20, -50)` → should return 0 (not -30!)

---

**Step 7: Add Helper Functions (Optional but Useful)**

```typescript
/**
 * Gets a random image path for a given type
 * @param type - 'noah' or 'dog'
 * @returns Full path to a random image
 */
export function getRandomImage(type: 'noah' | 'dog'): string {
  const imageNumber = type === 'noah' 
    ? Math.floor(Math.random() * 10) + 1 
    : Math.floor(Math.random() * 12) + 1;
  
  return type === 'noah'
    ? `/noah-dog-media/noah/noah-${imageNumber}.jpg`
    : `/noah-dog-media/dogs/dog-${imageNumber}.jpg`;
}

/**
 * Checks if an array of slots represents a win
 * @param slots - Array of 3 SlotResult objects
 * @returns true if all three types match
 */
export function isWinningCombination(slots: SlotResult[]): boolean {
  if (slots.length !== 3) return false;
  return slots[0].type === slots[1].type && slots[1].type === slots[2].type;
}

// Adjust generateSpinResult to use these helpers:
export function generateSpinResult(): SpinResult {
  const slots: SlotResult[] = [];
  for (let i = 0; i < 3; i++) {
    const type: 'noah' | 'dog' = Math.random() < 0.5 ? 'noah' : 'dog';
    slots.push({ type, image: getRandomImage(type) });
  }

  const outcome = isWinningCombination(slots) ? 'win' : 'tie'; // simplified for now
  // Note: Tie logic needs to be more nuanced if not all are wins.

  return { outcome, slots };
}
```

---

**Common Mistakes to Avoid:**

❌ **Don't use React hooks in these functions:**
```typescript
export function generateSpinResult(): SpinResult {
  const [result, setResult] = useState();  // NO! This is UI logic, not business logic
}
```

✅ **Keep them pure:**
```typescript
export function generateSpinResult(): SpinResult {
  const slots = [];
  // Pure logic only
  return { outcome, slots };
}
```

❌ **Don't modify external state:**
```typescript
let globalWallet = 1000;

export function updateWallet(change: number) {
  globalWallet += change;  // NO! Side effect!
}
```

✅ **Return new values:**
```typescript
export function updateWallet(current: number, change: number): number {
  return current + change;  // Pure! Returns new value
}
```

---

**Testing Your Functions**

Create a test file or add this to the bottom of `game-logic.ts` temporarily:

```typescript
// TEMPORARY - Remove after testing
if (typeof window !== 'undefined') {
  console.log('Testing game logic...');
  
  const spin = generateSpinResult();
  console.log('Spin result:', spin);
  
  const payout = calculatePayout(50, spin.outcome);
  console.log('Payout for $50 wager:', payout);
  
  console.log('Can bet $50 with $100 wallet?', canPlaceBet(100, 50));
  console.log('Can bet $150 with $100 wallet?', canPlaceBet(100, 150));
  
  console.log('Update $100 wallet with +$50:', updateWallet(100, 50));
  console.log('Update $20 wallet with -$50:', updateWallet(20, -50));
}
```

**Next Steps:**

After completing this task:
1. Move on to Task 2.3 (React Query Setup)
2. You'll connect these functions to your React components
3. Example: Call `generateSpinResult()` when lever is pulled

---

#### Task 2.3: Set Up React Query for State Management

**What to do:**
1. Follow Setup Guide in `docs/REACT_QUERY_SETUP.md`
2. Wrap app in `QueryClientProvider`
3. Create custom hook `hooks/use-game-state.ts`

**Learning Goal:** Understand React Query setup and data management

**🎯 Breaking Down Task 2.3**

**What is React Query Solving?**

In your old project, you used `localStorage` directly in your code:
```javascript
// Old way - tightly coupled
function updateWallet(amount) {
  wallet += amount;
  localStorage.setItem('wallet', wallet);
  updateDisplay();
}
```

Problems with this approach:
- Logic mixed with storage
- Hard to test
- No caching strategy
- Manual synchronization

React Query separates data management from UI components.

---

**Step 1: Install React Query**

Check if it's already in your `package.json`:
```json
"@tanstack/react-query": "^5.0.0"
```

If not, run: `npm install @tanstack/react-query`

---

**Step 2: Create Query Client Provider**

React Query needs to wrap your entire app to provide data access to all components.

**Your task:**

Open `app/layout.tsx`:

```tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

**What's happening:**
- `QueryClient` manages all your queries and cache
- `QueryClientProvider` makes the client available to all child components
- Now any component can use React Query hooks

---

**Step 3: Understand Query vs Mutation**

React Query has two main concepts:

**Query** = Reading data (GET)
```typescript
// Example: Load game state from localStorage
const { data, isLoading } = useQuery({
  queryKey: ['gameState'],
  queryFn: () => loadGameStateFromLocalStorage()
});
```

**Mutation** = Writing data (POST/PUT/DELETE)
```typescript
// Example: Update wallet balance
const { mutate } = useMutation({
  mutationFn: (newWallet: number) => saveWalletToLocalStorage(newWallet),
  onSuccess: () => {
    // Refetch game state to update UI
  }
});
```

---

**Step 4: Create Storage Helper Functions**

Before building the hook, create functions to interact with localStorage.

Create `lib/storage.ts`:

```typescript
// lib/storage.ts
import type { GameState } from '@/types/game';

const STORAGE_KEY = 'noahDogGameState';

/**
 * Default game state for new players
 */
export const DEFAULT_GAME_STATE: GameState = {
  wallet: 1000,
  wager: 50,
  wins: 0,
  losses: 0,
  ties: 0,
};

/**
 * Load game state from localStorage
 * @returns GameState from storage or default state
 */
export function loadGameState(): GameState {
  // TODO: Check if we're in the browser (not server-side)
  if (typeof window === 'undefined') {
    return DEFAULT_GAME_STATE;
  }
  
  // TODO: Try to load from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    
    // TODO: If nothing saved, return default
    if (!saved) {
      return DEFAULT_GAME_STATE;
    }
    
    // TODO: Parse the JSON string
    const parsed = JSON.parse(saved);
    
    // TODO: Return parsed data
    return parsed as GameState;
  } catch (error) {
    // TODO: If error (corrupted data), return default
    console.error('Error loading game state:', error);
    return DEFAULT_GAME_STATE;
  }
}

/**
 * Save game state to localStorage
 * @param state - GameState to save
 */
export function saveGameState(state: GameState): void {
  // TODO: Check if we're in the browser
  if (typeof window === 'undefined') {
    return;
  }
  
  // TODO: Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
}

/**
 * Clear all game data (reset)
 */
export function clearGameState(): void {
  // TODO: Remove from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
```

**Why separate storage from React Query?**
- Storage logic is reusable
- Easy to swap localStorage for a database later
- Easy to test
- Clean separation of concerns

---

**Step 5: Create the Game State Hook**

Create `hooks/use-game-state.ts`:

```typescript
// hooks/use-game-state.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { GameState } from '@/types/game';
import { loadGameState, saveGameState, clearGameState, DEFAULT_GAME_STATE } from '@/lib/storage';

const QUERY_KEY = ['gameState'];

/**
 * Custom hook for managing game state with React Query
 */
export function useGameState() {
  const queryClient = useQueryClient();
  
  // TODO: Create query to load game state
  const { data: gameState, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: loadGameState,
    // TODO: Add these options:
    staleTime: Infinity, // Data never goes stale (it's local)
    gcTime: Infinity, // Never garbage collect (keep in memory)
  });
  
  // TODO: Create mutation to update game state
  const updateStateMutation = useMutation({
    mutationFn: (newState: GameState) => {
      // TODO: Save to localStorage
      saveGameState(newState);
      return Promise.resolve(newState);
    },
    onSuccess: (newState) => {
      // TODO: Update the cache immediately
      queryClient.setQueryData(QUERY_KEY, newState);
    },
  });
  
  // TODO: Create mutation to reset game
  const resetGameMutation = useMutation({
    mutationFn: () => {
      // TODO: Clear localStorage
      clearGameState();
      return Promise.resolve(DEFAULT_GAME_STATE);
    },
    onSuccess: () => {
      // TODO: Reset cache to default
      queryClient.setQueryData(QUERY_KEY, DEFAULT_GAME_STATE);
    },
  });
  
  // TODO: Return an object with state and update functions
  return {
    gameState: gameState || DEFAULT_GAME_STATE,
    isLoading,
    updateGameState: updateStateMutation.mutate,
    resetGame: resetGameMutation.mutate,
  };
}
```

**What's happening:**
- `useQuery` loads initial state from localStorage
- `useMutation` handles updates and cache invalidation
- `queryClient.setQueryData` immediately updates UI without refetching
- Hook returns clean API for components to use

---

**Step 6: Create Helper Mutations**

Add specific mutation functions to your hook for common actions:

```typescript
// hooks/use-game-state.ts (continued)

export function useGameState() {
  
  // TODO: Add mutation for placing a bet
  const placeBetMutation = useMutation({
    mutationFn: ({ wager }: { wager: number }) => {
      const current = queryClient.getQueryData<GameState>(QUERY_KEY) || DEFAULT_GAME_STATE;
      
      // TODO: Deduct wager from wallet
      const newState: GameState = {
        ...current,
        wallet: current.wallet - wager,
      };
      
      saveGameState(newState);
      return Promise.resolve(newState);
    },
    onSuccess: (newState) => {
      queryClient.setQueryData(QUERY_KEY, newState);
    },
  });
  
  // TODO: Add mutation for processing spin result
  const processSpinMutation = useMutation({
    mutationFn: ({ outcome, payout }: { outcome: 'win' | 'loss' | 'tie'; payout: number }) => {
      const current = queryClient.getQueryData<GameState>(QUERY_KEY) || DEFAULT_GAME_STATE;
      
      // TODO: Update wallet and statistics
      const newState: GameState = {
        ...current,
        wallet: current.wallet + payout,
        wins: outcome === 'win' ? current.wins + 1 : current.wins,
        losses: outcome === 'loss' ? current.losses + 1 : current.losses,
        ties: outcome === 'tie' ? current.ties + 1 : current.ties,
      };
      
      saveGameState(newState);
      return Promise.resolve(newState);
    },
    onSuccess: (newState) => {
      queryClient.setQueryData(QUERY_KEY, newState);
    },
  });
  
  // TODO: Add mutation for updating wager amount
  const updateWagerMutation = useMutation({
    mutationFn: (newWager: number) => {
      const current = queryClient.getQueryData<GameState>(QUERY_KEY) || DEFAULT_GAME_STATE;
      
      // TODO: Update wager
      const newState: GameState = {
        ...current,
        wager: newWager,
      };
      
      saveGameState(newState);
      return Promise.resolve(newState);
    },
    onSuccess: (newState) => {
      queryClient.setQueryData(QUERY_KEY, newState);
    },
  });
  
  return {
    gameState: gameState || DEFAULT_GAME_STATE,
    isLoading,
    updateGameState: updateStateMutation.mutate,
    resetGame: resetGameMutation.mutate,
    placeBet: placeBetMutation.mutate,
    processSpin: processSpinMutation.mutate,
    updateWager: updateWagerMutation.mutate,
  };
}
```

---

**Step 7: Use the Hook in Your Components**

Example usage in `app/page.tsx`:

```tsx
'use client';

import { useGameState } from '@/hooks/use-game-state';

export default function Home() {
  const { gameState, placeBet, processSpin, updateWager, resetGame } = useGameState();
  
  const handleLeverPull = () => {
    // TODO: Use the mutations
    placeBet({ wager: gameState.wager });
    
    // Generate spin result...
    // const result = generateSpinResult();
    // const payout = calculatePayout(gameState.wager, result.outcome);
    
    // processSpin({ outcome: result.outcome, payout });
  };
  
  return (
    <div>
      <p>Wallet: ${gameState.wallet}</p>
      <p>Wager: ${gameState.wager}</p>
      <button onClick={handleLeverPull}>Pull Lever</button>
      <button onClick={() => resetGame()}>Reset Game</button>
    </div>
  );
}
```

---

**Common Mistakes to Avoid:**

❌ **Don't call hooks conditionally:**
```typescript
if (someCondition) {
  const { gameState } = useGameState(); // NO!
}
```

✅ **Call hooks at the top level:**
```typescript
const { gameState } = useGameState();

if (someCondition) {
  // Use gameState here
}
```

❌ **Don't mutate state directly:**
```typescript
const { gameState } = useGameState();
gameState.wallet = 500; // NO! State is immutable
```

✅ **Use mutations:**
```typescript
const { gameState, updateGameState } = useGameState();
updateGameState({ ...gameState, wallet: 500 }); // YES!
```

---

**Verification Checklist:**

1. ✅ Is `QueryClientProvider` wrapping your app in `layout.tsx`?
2. ✅ Does `lib/storage.ts` have load, save, and clear functions?
3. ✅ Does `useGameState` return gameState and mutation functions?
4. ✅ Can you see game state in React DevTools?
5. ✅ Does state persist when you refresh the page?

**Next Steps:**

After completing this task:
1. Move on to Task 3.1 (Build Components)
2. Use `useGameState()` in all your components
3. Connect components to call mutations instead of directly modifying state

---

### Phase 3: Component Development (YOU BUILD THIS)

#### Task 3.1: Create Slot Machine Component

**What to do:**
1. Create `components/slot-display.tsx`
2. Display three slot images
3. Add spinning animation
4. Use CSS Modules for animations
5. Create `components/slot-display.module.css`

**Learning Goal:** Build animated React components with TypeScript

**🎯 Breaking Down Task 3.1**

---

**Step 1: Understand Component Requirements**

Your slot display needs to:
- Show 3 images side by side (Noah or Dog)
- Animate when spinning (blur effect, movement)
- Update when spin completes
- Be responsive (look good on mobile)

---

**Step 2: Create the TypeScript Interface for Props**

**Think about:**
- What data does this component need to display?
- Should it show spinning animation?
- What slots are currently displayed?

**Your task:**

```typescript
// components/slot-display.tsx
'use client';

import Image from 'next/image';
import type { SlotResult } from '@/types/game';
import styles from './slot-display.module.css';

interface SlotDisplayProps {
  // TODO: Add prop for array of 3 slot results
  slots: SlotResult[];
  
  // TODO: Add prop for whether slots are spinning
  isSpinning: boolean;
  
  // TODO: Add optional outcome prop for visual feedback
  outcome?: 'win' | 'loss' | 'tie';
}
```

---

**Step 3: Build the Component Structure**

```typescript
export function SlotDisplay({ slots, isSpinning, outcome }: SlotDisplayProps) {
  return (
    <div className="flex gap-4 justify-center items-center">
      {/* TODO: Map over slots array and render each slot */}
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`
            relative w-32 h-32 rounded-lg overflow-hidden border-4 border-gray-700
            ${isSpinning && styles.spinning}
            ${outcome === 'win' ? styles.winning : ''}
            ${outcome === 'win' ? 'border-yellow-400' : ''}
            ${outcome === 'loss' ? 'border-red-500' : ''}
          `}
        >
          {/* TODO: Use Next.js Image component */}
          <Image
            src={slot.image || "/placeholder.svg"}
            alt={`Slot ${index + 1}: ${slot.type === 'noah' ? 'Noah' : 'Dog'}`}
            fill
            className="object-cover"
            priority={index === 0} // Prioritize loading first image
          />
        </div>
      ))}
    </div>
  );
}
```

**What's happening:**
- `flex gap-4` creates horizontal layout with spacing
- `map()` renders one div for each slot
- `${isSpinning && styles.spinning}` conditionally adds animation class
- `Image` component from Next.js optimizes images automatically
- `fill` makes image fill the parent container
- `alt` text for accessibility

---

**Step 4: Create the CSS Module for Animations**

Create `components/slot-display.module.css`:

```css
/* components/slot-display.module.css */

/* TODO: Create spinning animation */
.spinning {
  animation: spin 0.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
    filter: blur(4px);
  }
  100% {
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* TODO: Add winning glow effect (optional) */
.winning {
  animation: winGlow 1s ease-in-out infinite alternate;
  border-color: gold !important; /* Override Tailwind border */
}

@keyframes winGlow {
  from {
    box-shadow: 0 0 10px gold;
  }
  to {
    box-shadow: 0 0 30px gold, 0 0 50px gold;
  }
}
```

**Animation Breakdown:**
- `translateY` moves slots up and down
- `scale` makes slots slightly bigger
- `blur` creates motion blur effect
- `infinite` makes animation loop
- `alternate` makes glow pulse back and forth

---

**Step 5: Add Different Slot States (Optional Enhancement)**

You can add different visual states:

```typescript
export function SlotDisplay({ slots, isSpinning, outcome }: SlotDisplayProps) {
  return (
    <div className="flex gap-4 justify-center items-center">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`
            relative w-32 h-32 rounded-lg overflow-hidden border-4
            ${isSpinning && styles.spinning}
            ${outcome === 'win' && styles.winning}
            ${outcome === 'win' ? 'border-yellow-400' : 'border-gray-700'}
            ${outcome === 'loss' ? 'border-red-500' : ''}
          `}
        >
          <Image
            src={slot.image || "/placeholder.svg"}
            alt={`Slot ${index + 1}: ${slot.type === 'noah' ? 'Noah' : 'Dog'}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
```

---

**Step 6: Make It Responsive**

Update the component to look good on mobile:

```typescript
export function SlotDisplay({ slots, isSpinning, outcome }: SlotDisplayProps) {
  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`
            relative 
            w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32
            rounded-lg overflow-hidden border-4
            ${isSpinning && styles.spinning}
            ${outcome === 'win' && styles.winning}
            ${outcome === 'win' ? 'border-yellow-400' : 'border-gray-700'}
          `}
        >
          <Image
            src={slot.image || "/placeholder.svg"}
            alt={`Slot ${index + 1}: ${slot.type === 'noah' ? 'Noah' : 'Dog'}`}
            fill
            className="object-cover"
            priority={index === 0} // Prioritize loading first image
          />
        </div>
      ))}
    </div>
  );
}
```

**Responsive Classes Explained:**
- `gap-2 md:gap-4` - Smaller gap on mobile, larger on desktop
- `w-20 sm:w-28 md:w-32` - Slot size increases on larger screens
  - Mobile: 80px (w-20)
  - Tablet: 112px (sm:w-28)
  - Desktop: 128px (md:w-32)

---

**Step 7: Add Loading State**

Show placeholder when images are loading:

```typescript
export function SlotDisplay({ slots, isSpinning, outcome }: SlotDisplayProps) {
  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`
            relative 
            w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32
            rounded-lg overflow-hidden border-4
            bg-gray-800
            ${isSpinning && styles.spinning}
            ${outcome === 'win' && styles.winning}
            ${outcome === 'win' ? 'border-yellow-400' : 'border-gray-700'}
          `}
        >
          {/* TODO: Show loading state */}
          {!slot.image ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              ?
            </div>
          ) : (
            <Image
              src={slot.image || "/placeholder.svg"}
              alt={`Slot ${index + 1}: ${slot.type === 'noah' ? 'Noah' : 'Dog'}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

---

**Common Mistakes to Avoid:**

❌ **Don't use regular <img> tag:**
```tsx
<img src={slot.image || "/placeholder.svg"} /> // No optimization!
```

✅ **Use Next.js Image component:**
```tsx
<Image src={slot.image || "/placeholder.svg"} fill className="object-cover" />
```

❌ **Don't forget alt text:**
```tsx
<Image src={slot.image || "/placeholder.svg"} alt="" /> // Bad for accessibility
```

✅ **Always add descriptive alt text:**
```tsx
<Image src={slot.image || "/placeholder.svg"} alt={`Slot ${index + 1}: ${slot.type === 'noah' ? 'Noah' : 'Dog'}`} />
```

❌ **Don't use inline styles for animations:**
```tsx
<div style={{ animation: 'spin 1s' }}> // Hard to maintain
```

✅ **Use CSS Modules:**
```tsx
<div className={styles.spinning}> // Clean and reusable
```

---

**Verification Checklist:**

1. ✅ Does the component show 3 slots?
2. ✅ Do images load correctly?
3. ✅ Does spinning animation work?
4. ✅ Is it responsive (check mobile view)?
5. ✅ Do you have TypeScript types for props?
6. ✅ Is there alt text for accessibility?

---

**Testing Your Component:**

Temporarily add this to `app/page.tsx` to test:

```tsx
'use client';

import { SlotDisplay } from '@/components/slot-display';
import { useState } from 'react';

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  
  const testSlots = [
    { type: 'noah' as const, image: '/noah-dog-media/noah/noah-1.jpg' },
    { type: 'noah' as const, image: '/noah-dog-media/noah/noah-2.jpg' },
    { type: 'noah' as const, image: '/noah-dog-media/noah/noah-3.jpg' },
  ];
  
  const handleTest = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8">
      <SlotDisplay 
        slots={testSlots} 
        isSpinning={isSpinning}
        outcome="win"
      />
      <button 
        onClick={handleTest}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Test Spin Animation
      </button>
    </div>
  );
}
```

**Next Steps:**

After completing this task:
1. Move on to Task 3.2 (Stats Display Component)
2. You'll integrate SlotDisplay into your main game page
3. Connect it to the game state from React Query

---

#### Task 3.2: Create Stats Display Component

**What to do:**
1. Create `components/stats-display.tsx`
2. Show wins, losses, ties counts
3. Use Tailwind grid for layout
4. Make it responsive

**Learning Goal:** Practice Tailwind layouts and prop typing

**🎯 Breaking Down Task 3.2**

---

**Step 1: Plan the Component Layout**

Your stats display should show:
- Total wins (with count)
- Total losses (with count)
- Total ties (with count)
- Maybe a win rate percentage

**Layout options:**
- Horizontal row (flex)
- Grid (2x2 or 3 columns)
- Vertical stack on mobile, horizontal on desktop

---

**Step 2: Create the Props Interface**

```typescript
// components/stats-display.tsx
'use client';

interface StatsDisplayProps {
  // TODO: What data does this component need?
  wins: number;
  losses: number;
  ties: number;
}
```

---

**Step 3: Build the Component with Tailwind Grid**

```typescript
export function StatsDisplay({ wins, losses, ties }: StatsDisplayProps) {
  // TODO: Calculate total games and win rate
  const totalGames = wins + losses + ties;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* TODO: Create grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Win Card */}
        <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 uppercase mb-2">Wins</div>
          <div className="text-4xl font-bold text-green-500">{wins}</div>
        </div>
        
        {/* Loss Card */}
        <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 uppercase mb-2">Losses</div>
          <div className="text-4xl font-bold text-red-500">{losses}</div>
        </div>
        
        {/* Tie Card */}
        <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 uppercase mb-2">Ties</div>
          <div className="text-4xl font-bold text-yellow-500">{ties}</div>
        </div>
      </div>
      
      {/* TODO: Add win rate display */}
      <div className="mt-6 text-center bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Win Rate</div>
        <div className="text-2xl font-bold text-white">{winRate}%</div>
        <div className="text-gray-500 text-xs">
          {totalGames} {totalGames === 1 ? 'game' : 'games'} played
        </div>
      </div>
    </div>
  );
}
```

**Tailwind Classes Breakdown:**
- `grid grid-cols-1 sm:grid-cols-3` - 1 column on mobile, 3 on tablet+
- `gap-4` - Spacing between grid items
- `bg-gray-800` - Dark background
- `border-2 border-green-500` - Colored border
- `rounded-lg` - Rounded corners
- `p-6` - Padding inside card
- `text-center` - Center text
- `text-4xl font-bold` - Large, bold numbers

---

**Step 4: Add Icons (Optional Enhancement)**

You can add icons to make it more visual:

```typescript
export function StatsDisplay({ wins, losses, ties }: StatsDisplayProps) {
  const totalGames = wins + losses + ties;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : '0.0';
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Win Card */}
        <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Wins</div>
          <div className="text-4xl font-bold text-green-500">{wins}</div>
        </div>
        
        {/* Loss Card */}
        <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
          <div className="text-4xl mb-2">💔</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Losses</div>
          <div className="text-4xl font-bold text-red-500">{losses}</div>
        </div>
        
        {/* Tie Card */}
        <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
          <div className="text-4xl mb-2">🤝</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Ties</div>
          <div className="text-4xl font-bold text-yellow-500">{ties}</div>
        </div>
      </div>
      
      {/* Win Rate with Progress Bar */}
      <div className="mt-6 text-center bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm mb-1">Win Rate</div>
        <div className="text-2xl font-bold text-white">{winRate}%</div>
        <div className="text-gray-500 text-xs mt-1">
          {totalGames} {totalGames === 1 ? 'game' : 'games'} played
        </div>
      </div>
    </div>
  );
}
```

---

**Step 5: Make It More Interactive (Progress Bar)**

Add a visual win rate progress bar:

```typescript
export function StatsDisplay({ wins, losses, ties }: StatsDisplayProps) {
  const totalGames = wins + losses + ties;
  const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
  const winRateDisplay = winRate.toFixed(1);
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Win Card */}
        <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Wins</div>
          <div className="text-4xl font-bold text-green-500">{wins}</div>
        </div>
        
        {/* Loss Card */}
        <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
          <div className="text-4xl mb-2">💔</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Losses</div>
          <div className="text-4xl font-bold text-red-500">{losses}</div>
        </div>
        
        {/* Tie Card */}
        <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
          <div className="text-4xl mb-2">🤝</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Ties</div>
          <div className="text-4xl font-bold text-yellow-500">{ties}</div>
        </div>
      </div>
      
      {/* Win Rate with Progress Bar */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="text-gray-400 text-sm mb-1">Win Rate</div>
          <div className="text-3xl font-bold text-white">{winRateDisplay}%</div>
          <div className="text-gray-500 text-xs mt-1">
            {totalGames} {totalGames === 1 ? 'game' : 'games'} played
          </div>
        </div>
        
        {/* TODO: Add progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
            style={{ width: `${Math.min(winRate, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

**Progress Bar Breakdown:**
- Outer div is gray background (track)
- Inner div is green (progress)
- `style={{ width }}` sets width dynamically based on win rate
- `transition-all duration-500` smoothly animates width changes
- `Math.min(winRate, 100)` ensures it never exceeds 100%

---

**Common Mistakes to Avoid:**

❌ **Don't hardcode colors everywhere:**
```tsx
<div style={{ color: '#10b981' }}>Wins</div> // Hard to maintain
```

✅ **Use Tailwind color classes:**
```tsx
<div className="text-green-500">Wins</div> // Consistent design system
```

❌ **Don't forget mobile layout:**
```tsx
<div className="grid-cols-3"> // Breaks on mobile!
```

✅ **Make it responsive:**
```tsx
<div className="grid-cols-1 sm:grid-cols-3"> // Works on all screens
```

❌ **Don't divide by zero:**
```tsx
const winRate = (wins / totalGames) * 100; // Error if totalGames is 0!
```

✅ **Check for zero first:**
```tsx
const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
```

---

**Verification Checklist:**

1. ✅ Does it show wins, losses, and ties?
2. ✅ Does it calculate win rate correctly?
3. ✅ Is layout responsive (mobile vs desktop)?
4. ✅ Do colors match your theme?
5. ✅ Does it handle zero games gracefully?

---

**Testing Your Component:**

Add this to `app/page.tsx` temporarily:

```tsx
'use client';

import { StatsDisplay } from '@/components/stats-display';
import { useState } from 'react';

export default function Home() {
  const [wins, setWins] = useState(5);
  const [losses, setLosses] = useState(3);
  const [ties, setTies] = useState(2);
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-8">
      <StatsDisplay wins={wins} losses={losses} ties={ties} />
      
      <div className="flex gap-2">
        <button 
          onClick={() => setWins(w => w + 1)}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Add Win
        </button>
        <button 
          onClick={() => setLosses(l => l + 1)}
          className="px-4 py-2 bg-red-600 rounded"
        >
          Add Loss
        </button>
        <button 
          onClick={() => setTies(t => t + 1)}
          className="px-4 py-2 bg-yellow-600 rounded"
        >
          Add Tie
        </button>
      </div>
    </div>
  );
}
```

**Next Steps:**

After completing this task:
1. Move on to Task 3.3 (Chart Component)
2. Integrate StatsDisplay into your main game page
3. Connect it to game state from React Query

---

#### Task 3.3: Create Chart Component

**What to do:**
1. Create `components/stats-chart.tsx`
2. Use Chart.js (react-chartjs-2) for pie chart
3. Show win/loss/tie distribution
4. Style to match your theme

**Learning Goal:** Integrate third-party libraries with TypeScript

**🎯 Breaking Down Task 3.3**

---

**Step 1: Understand Chart.js and React Integration**

**Chart.js** is a popular JavaScript charting library. **react-chartjs-2** is a React wrapper that makes it easy to use in React components.

You already have these installed in `package.json`:
- `chart.js` - Core charting library
- `react-chartjs-2` - React components for Chart.js

---

**Step 2: Register Chart.js Components**

Chart.js requires you to register the components you want to use.

Create `lib/chart-setup.ts`:

```typescript
// lib/chart-setup.ts
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// TODO: Register the components needed for pie charts
ChartJS.register(
  ArcElement,    // For pie/doughnut charts
  Tooltip,       // For hover tooltips
  Legend         // For the legend
);
```

**What's happening:**
- `ChartJS.register()` tells Chart.js which features to include
- `ArcElement` is needed for pie/doughnut slices
- `Tooltip` shows data on hover
- `Legend` shows the color key

---

**Step 3: Create the Props Interface**

```typescript
// components/stats-chart.tsx
'use client';

import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

// TODO: Make sure chart components are registered
import '@/lib/chart-setup';

interface StatsChartProps {
  // TODO: What data does the chart need?
  wins: number;
  losses: number;
  ties: number;
}
```

---

**Step 4: Build the Chart Component**

```typescript
export function StatsChart({ wins, losses, ties }: StatsChartProps) {
  // TODO: Prepare data for Chart.js
  const data: ChartData<'pie'> = {
    labels: ['Wins', 'Losses', 'Ties'],
    datasets: [
      {
        label: 'Game Results',
        data: [wins, losses, ties],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green for wins (Tailwind green-500 approx)
          'rgba(239, 68, 68, 0.8)',    // Red for losses (Tailwind red-500 approx)
          'rgba(234, 179, 8, 0.8)',    // Yellow for ties (Tailwind yellow-500 approx)
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',      // Darker green border
          'rgba(239, 68, 68, 1)',      // Darker red border
          'rgba(234, 179, 8, 1)',      // Darker yellow border
        ],
        borderWidth: 2,
      },
    ],
  };
  
  // TODO: Configure chart options
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container better
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e5e7eb', // Light gray text (Tailwind gray-200)
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        // TODO: Customize tooltip content
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return `${label}: ${value} (${percentage}%)`;
          }
        },
      },
    },
  };
  
  // TODO: Render the chart
  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white text-center mb-4">
        Game Statistics
      </h3>
      <div className="relative h-64"> {/* Fixed height for chart */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
```

**Chart Configuration Breakdown:**

**Data Object:**
- `labels` - Names shown in legend and tooltip
- `data` - Array of numbers [wins, losses, ties]
- `backgroundColor` - Colors for each slice (with transparency)
- `borderColor` - Border colors for each slice
- `borderWidth` - Thickness of borders

**Options Object:**
- `responsive: true` - Chart resizes with container
- `maintainAspectRatio: false` - Allows chart to fill its container's aspect ratio
- `plugins.legend` - Configure the legend appearance
- `plugins.tooltip` - Configure hover tooltips

---

**Step 5: Handle Empty State**

What if there are no games played yet? Show a placeholder:

```typescript
export function StatsChart({ wins, losses, ties }: StatsChartProps) {
  const totalGames = wins + losses + ties;
  
  // TODO: Show message if no games played
  if (totalGames === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white text-center mb-4">
          Game Statistics
        </h3>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-center">No games played yet.</p>
          <p className="text-sm text-center mt-2">Pull the lever to start!</p>
        </div>
      </div>
    );
  }
  
  // ... existing chart code ...
}
```

---

**Step 6: Add Animation and Interaction**

Chart.js has built-in animations. You can customize them:

```typescript
const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  // TODO: Add animation configuration
  animation: {
    animateRotate: true,
    animateScale: true,
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#e5e7eb',
        font: {
          size: 14,
        },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 14,
      },
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
          return `${label}: ${value} (${percentage}%)`;
        }
      },
    },
  },
};
```

**Animation Options:**
- `animateRotate` - Chart spins in when loaded
- `animateScale` - Chart grows from center
- `callbacks.label` - Customize what shows in tooltip

---

**Step 7: Make It Responsive**

Ensure the chart looks good on all screen sizes:

```typescript
export function StatsChart({ wins, losses, ties }: StatsChartProps) {
  const totalGames = wins + losses + ties;
  
  if (totalGames === 0) {
    // ... empty state ...
  }
  
  // ... data and options ...
  
  return (
    <div className="w-full max-w-xs sm:max-w-md mx-auto bg-gray-800 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4">
        Game Statistics
      </h3>
      <div className="relative h-64"> {/* Use aspect-square or fixed height */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
```

**Responsive Classes:**
- `max-w-xs sm:max-w-md` - Smaller on mobile, larger on tablet+
- `p-4 sm:p-6` - Less padding on mobile
- `text-lg sm:text-xl` - Smaller heading on mobile
- `h-64` or `aspect-square` - Ensures chart container has appropriate dimensions

---

**Common Mistakes to Avoid:**

❌ **Don't forget to register Chart.js components:**
```typescript
import { Pie } from 'react-chartjs-2';
// Missing import '@/lib/chart-setup'; - Chart won't work!
```

✅ **Always register first:**
```typescript
import '@/lib/chart-setup';
import { Pie } from 'react-chartjs-2';
```

❌ **Don't use colors that don't match:**
```typescript
backgroundColor: ['#ff0000', '#00ff00', '#0000ff'] // Random colors
```

✅ **Use your theme colors:**
```typescript
backgroundColor: [
  'rgba(34, 197, 94, 0.8)',  // Matches Tailwind green-500
  'rgba(239, 68, 68, 0.8)',  // Matches Tailwind red-500
  'rgba(234, 179, 8, 0.8)',  // Matches Tailwind yellow-500
]
```

❌ **Don't ignore TypeScript types:**
```typescript
const data: any = { ... } // Defeats purpose of TypeScript
```

✅ **Use proper types:**
```typescript
const data: ChartData<'pie'> = { ... } // Type-safe!
```

---

**Verification Checklist:**

1. ✅ Did you create and import `lib/chart-setup.ts`?
2. ✅ Does the chart show three colored sections?
3. ✅ Do the colors match your wins/losses/ties?
4. ✅ Does the legend show at the bottom?
5. ✅ Do tooltips show on hover?
6. ✅ Does it handle zero games gracefully?
7. ✅ Is it responsive on mobile?

---

**Testing Your Component:**

Add to `app/page.tsx` temporarily:

```tsx
'use client';

import { StatsChart } from '@/components/stats-chart';
import { useState } from 'react';

export default function Home() {
  const [wins, setWins] = useState(5);
  const [losses, setLosses] = useState(3);
  const [ties, setTies] = useState(2);
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-8">
      <StatsChart wins={wins} losses={losses} ties={ties} />
      
      <div className="flex gap-2">
        <button 
          onClick={() => setWins(w => w + 1)}
          className="px-4 py-2 bg-green-600 rounded text-white"
        >
          Add Win
        </button>
        <button 
          onClick={() => setLosses(l => l + 1)}
          className="px-4 py-2 bg-red-600 rounded text-white"
        >
          Add Loss
        </button>
        <button 
          onClick={() => setTies(t => t + 1)}
          className="px-4 py-2 bg-yellow-600 rounded text-white"
        >
          Add Tie
        </button>
        <button 
          onClick={() => {
            setWins(0);
            setLosses(0);
            setTies(0);
          }}
          className="px-4 py-2 bg-gray-600 rounded text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

**Next Steps:**

After completing this task:
1. Move on to Task 4.1 (Complete Main Page Integration)
2. Combine all your components into the full game
3. Connect everything to game state and logic

---

### Phase 4: Integration & Polish (YOU BUILD THIS)

#### Task 4.1: Integrate Everything in Main Page

**What to do:**
1. Open `app/page.tsx`
2. Import all your components
3. Connect them to `useGameState` hook
4. Implement lever pull logic
5. Wire up all interactions

**Learning Goal:** Bring everything together into a working app

**🎯 Breaking Down Task 4.1**

This is where everything comes together! You'll connect all your pieces:
- Game logic functions
- React Query state management
- All UI components

---

**Step 1: Import Everything You Need**

```tsx
// app/page.tsx
'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/use-game-state';
import { SlotDisplay } from '@/components/slot-display';
import { StatsDisplay } from '@/components/stats-display';
import { StatsChart } from '@/components/stats-chart';
import { generateSpinResult, calculatePayout, canPlaceBet } from '@/lib/game-logic';
import type { SlotResult } from '@/types/game';

// Import CSS Modules for animations
import styles from '@/components/lever.module.css';

export default function Home() {
  // TODO: Your code goes here
}
```

---

**Step 2: Set Up Component State**

```typescript
export default function Home() {
  // TODO: Get game state from React Query
  const { gameState, placeBet, processSpin, updateWager, resetGame } = useGameState();
  
  // TODO: Add local state for UI interactions
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSlots, setCurrentSlots] = useState<SlotResult[]>([
    { type: 'noah', image: '/noah-dog-media/noah/noah-1.jpg' },
    { type: 'noah', image: '/noah-dog-media/noah/noah-2.jpg' },
    { type: 'noah', image: '/noah-dog-media/noah/noah-3.jpg' },
  ]);
  const [lastOutcome, setLastOutcome] = useState<'win' | 'loss' | 'tie' | null>(null);
  
  // TODO: Add your handler functions here
}
```

**Think about:**
- Why do we need both `gameState` (from React Query) and `isSpinning` (local state)?
- What's the difference between persistent state (wallet, wins) and temporary UI state (spinning animation)?

---

**Step 3: Implement Wager Controls**

```typescript
export default function Home() {
  // ... state declarations ...
  
  // TODO: Handle wager increase
  const handleIncreaseWager = () => {
    const newWager = gameState.wager + 10;
    // Don't let wager exceed wallet
    if (newWager <= gameState.wallet) {
      updateWager(newWager);
    }
  };
  
  // TODO: Handle wager decrease
  const handleDecreaseWager = () => {
    const newWager = gameState.wager - 10;
    // Don't let wager go below 10 (or a minimum defined value)
    if (newWager >= 10) {
      updateWager(newWager);
    }
  };
  
  // TODO: Your render code goes here
}
```

**Questions to think about:**
- What's the minimum wager amount? ($10?)
- What's the maximum wager amount? (Your wallet balance?)
- Should you be able to change wager while spinning? (No)

---

**Step 4: Implement Lever Pull Logic (MOST IMPORTANT)**

This is the core game interaction!

```typescript
export default function Home() {
  // ... state and wager handlers ...
  
  // TODO: Handle lever pull
  const handleLeverPull = async () => {
    // Step 1: Validate the bet
    if (!canPlaceBet(gameState.wallet, gameState.wager)) {
      alert('Insufficient funds or invalid wager!');
      return;
    }
    
    if (isSpinning) {
      return; // Don't allow multiple spins at once
    }
    
    // Step 2: Start spinning animation
    setIsSpinning(true);
    setLastOutcome(null); // Clear previous outcome
    
    // Step 3: Deduct wager from wallet (this updates React Query state)
    placeBet({ wager: gameState.wager });
    
    // Step 4: Wait a moment (simulate spinning time)
    await new Promise(resolve => setTimeout(resolve, 2000)); // Spin for 2 seconds
    
    // Step 5: Generate random result
    const spinResult = generateSpinResult();
    
    // Step 6: Calculate payout based on wager and outcome
    const payout = calculatePayout(gameState.wager, spinResult.outcome);
    
    // Step 7: Update slots display with the result
    setCurrentSlots(spinResult.slots);
    setLastOutcome(spinResult.outcome);
    
    // Step 8: Stop spinning animation
    setIsSpinning(false);
    
    // Step 9: Update wallet and stats in React Query state
    processSpin({ outcome: spinResult.outcome, payout });
  };
  
  // TODO: Your render code goes here
}
```

**Flow breakdown:**
1. Validate player has enough money and wager is valid.
2. Start UI animation (spinning state).
3. Deduct wager from wallet (updates persistent state).
4. Wait for animation to complete.
5. Generate random outcome.
6. Calculate winnings/losses.
7. Update UI to show the result images and outcome.
8. Stop animation.
9. Update permanent state (wallet balance, win/loss/tie counts).

---

**Step 5: Build the Main Layout**

```tsx
export default function Home() {
  // ... all your handlers ...
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="py-6 px-4 text-center border-b border-gray-700">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          Does Noah got that DOG in 'em?
        </h1>
        <p className="text-gray-400">Pull the lever and find out!</p>
      </header>
      
      {/* Main Game Area */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Wallet & Controls */}
          <div className="space-y-6">
            {/* Wallet Display */}
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-yellow-500 shadow-md">
              <div className="text-sm text-gray-400 mb-2 uppercase">Wallet Balance</div>
              <div className="text-4xl font-bold text-yellow-500">
                ${gameState.wallet.toLocaleString()}
              </div>
            </div>
            
            {/* Wager Controls */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="text-sm text-gray-400 mb-4 uppercase">Current Wager</div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleDecreaseWager}
                  disabled={isSpinning || gameState.wager <= 10}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-2xl font-bold shadow-sm transform transition-transform active:scale-95"
                >
                  −
                </button>
                
                <div className="text-3xl font-bold text-white">
                  ${gameState.wager}
                </div>
                
                <button
                  onClick={handleIncreaseWager}
                  disabled={isSpinning || gameState.wager >= gameState.wallet}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-2xl font-bold shadow-sm transform transition-transform active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Lever Button */}
            <button
              onClick={handleLeverPull}
              disabled={isSpinning || !canPlaceBet(gameState.wallet, gameState.wager)}
              className={`
                ${styles.lever}
                ${isSpinning ? styles.leverPulling : ''}
                w-full py-6 bg-gradient-to-b from-red-600 to-red-800 
                hover:from-red-700 hover:to-red-900 
                disabled:from-gray-600 disabled:to-gray-700 
                disabled:cursor-not-allowed rounded-lg text-2xl font-bold 
                shadow-lg transform transition-transform active:scale-95
              `}
              aria-busy={isSpinning}
              aria-label="Pull lever to spin the slots"
            >
              {isSpinning ? '🎰 SPINNING...' : '🎰 PULL LEVER'}
            </button>

            {/* Reset Button */}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all progress?')) {
                  resetGame();
                  setLastOutcome(null);
                  // Reset slots to default for visual clarity after reset
                  setCurrentSlots([
                    { type: 'noah', image: '/noah-dog-media/noah/noah-1.jpg' },
                    { type: 'noah', image: '/noah-dog-media/noah/noah-2.jpg' },
                    { type: 'noah', image: '/noah-dog-media/noah/noah-3.jpg' },
                  ]);
                }
              }}
              disabled={isSpinning}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold shadow-sm"
            >
              Reset Game
            </button>
          </div>
          
          {/* Middle Column: Slot Machine */}
          <div className="lg:col-span-2 space-y-6">
            {/* Slot Display */}
            <div className="bg-gray-800 rounded-lg p-8 shadow-md">
              <SlotDisplay 
                slots={currentSlots}
                isSpinning={isSpinning}
                outcome={lastOutcome || undefined}
              />
            </div>
            
            {/* Result Message */}
            {lastOutcome && !isSpinning && (
              <div className={`
                text-center py-6 px-4 rounded-lg font-bold text-2xl shadow-lg
                ${lastOutcome === 'win' ? 'bg-green-900 text-green-100' : ''}
                ${lastOutcome === 'loss' ? 'bg-red-900 text-red-100' : ''}
                ${lastOutcome === 'tie' ? 'bg-yellow-900 text-yellow-100' : ''}
              `}>
                {lastOutcome === 'win' && '🎉 YOU WIN! 🎉'}
                {lastOutcome === 'loss' && '💔 YOU LOSE 💔'}
                {lastOutcome === 'tie' && '🤝 TIE - MONEY BACK 🤝'}
              </div>
            )}
             {/* Announce dynamic changes to screen readers */}
            <div 
              role="status" 
              aria-live="polite" 
              aria-atomic="true"
              className="sr-only" // Visually hidden but read by screen readers
            >
              {lastOutcome === 'win' && 'You won!'}
              {lastOutcome === 'loss' && 'You lost.'}
              {lastOutcome === 'tie' && 'It is a tie.'}
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <StatsDisplay 
              wins={gameState.wins}
              losses={gameState.losses}
              ties={gameState.ties}
            />
          </div>
          
          <div>
            <StatsChart 
              wins={gameState.wins}
              losses={gameState.losses}
              ties={gameState.ties}
            />
          </div>
        </div>
      </main>
       {/* Footer */}
      <footer className="text-center py-6 px-4 mt-12 border-t border-gray-700 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Noah Dog Game. All rights reserved.</p>
      </footer>
    </div>
  );
}
```

---

**Step 6: Add Wallet Display**

(Already integrated into Step 5's main layout code.)

---

**Step 7: Add Lever Button**

(Already integrated into Step 5's main layout code.)

---

**Step 8: Add Slot Display and Result Message**

(Already integrated into Step 5's main layout code.)

---

**Step 9: Add Stats Section**

(Already integrated into Step 5's main layout code.)

---

**Common Mistakes to Avoid:**

❌ **Don't forget async/await:**
```typescript
const handleLeverPull = () => {
  setTimeout(() => { ... }, 2000); // No way to wait!
}
```

✅ **Use async/await:**
```typescript
const handleLeverPull = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
}
```

❌ **Don't allow multiple spins:**
```typescript
const handleLeverPull = async () => {
  // If user clicks twice, both run!
}
```

✅ **Guard against multiple spins:**
```typescript
const handleLeverPull = async () => {
  if (isSpinning) return;
  setIsSpinning(true);
  // ...
}
```

❌ **Don't forget to validate:**
```typescript
const handleLeverPull = async () => {
  placeBet({ wager: gameState.wager }); // What if they don't have money?
}
```

✅ **Always validate first:**
```typescript
if (!canPlaceBet(gameState.wallet, gameState.wager)) {
  alert('Insufficient funds!');
  return;
}
```

---

**Verification Checklist:**

1. ✅ Can you increase/decrease wager?
2. ✅ Does pulling lever deduct money?
3. ✅ Do slots spin and show animation?
4. ✅ Does the result display after spinning?
5. ✅ Do stats update correctly?
6. ✅ Does chart reflect current stats?
7. ✅ Does reset button work?
8. ✅ Does state persist after page refresh?
9. ✅ Is layout responsive on mobile?

**Next Steps:**

After completing this task:
1. Move on to Phase 5 (Testing)
2. Test your game thoroughly
3. Add accessibility improvements
4. Write tests for your code

---

#### Task 4.2: Add CSS Modules for Lever Animation

**What to do:**
1. Create `components/lever.module.css`
2. Add pull animation for lever button
3. Import and use in your lever button

**Learning Goal:** Advanced CSS animations with modules

**🎯 Breaking Down Task 4.2**

You can enhance your lever button with a realistic pull animation using CSS Modules.

---

**Step 1: Create the CSS Module**

Create `components/lever.module.css`:

```css
/* components/lever.module.css */

.lever {
  position: relative;
  transition: transform 0.1s ease-out; /* Smoother transition for active state */
  will-change: transform; /* Optimize for transform animations */
}

.lever:active:not(:disabled) {
  transform: translateY(8px); /* Simulate button press */
}

/* Decorative elements for the lever handle */
.lever::before {
  content: '';
  position: absolute;
  top: -20px; /* Position above the main button area */
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 20px;
  background: linear-gradient(to bottom, #9ca3af, #4b5563); /* Gray gradient */
  border-radius: 4px;
  z-index: 1; /* Ensure it's above the button background */
}

.lever::after {
  content: '';
  position: absolute;
  top: -30px; /* Position even higher */
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, #f87171, #b91c1c); /* Red gradient for the knob */
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

/* Change appearance when actively being pressed */
.lever:active:not(:disabled)::before {
  height: 10px; /* Shorter handle when pressed */
  top: -10px;
}

.lever:active:not(:disabled)::after {
  top: -20px; /* Slightly higher knob when pressed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Smaller shadow */
}

/* Animation class applied when spinning */
.leverPulling {
  animation: pullLever 0.6s ease-in-out;
}

@keyframes pullLever {
  0% {
    transform: translateY(0); /* Start at original position */
  }
  30% {
    transform: translateY(20px); /* Move down */
  }
  100% {
    transform: translateY(0); /* Return to original position */
  }
}
```

---

**Step 2: Use in Your Button**

Update your lever button in `app/page.tsx`:

```tsx
// app/page.tsx (add this import at the top)
import styles from '@/components/lever.module.css';

// ... in your component's return statement ...

<button
  onClick={handleLeverPull}
  disabled={isSpinning || !canPlaceBet(gameState.wallet, gameState.wager)}
  className={`
    ${styles.lever} /* Apply base lever styles */
    ${isSpinning ? styles.leverPulling : ''} /* Apply pulling animation when spinning */
    w-full py-6 bg-gradient-to-b from-red-600 to-red-800 
    hover:from-red-700 hover:to-red-900 
    disabled:from-gray-600 disabled:to-gray-700 
    disabled:cursor-not-allowed rounded-lg text-2xl font-bold 
    shadow-lg transform transition-transform active:scale-95 
  `}
  aria-busy={isSpinning}
  aria-label="Pull lever to spin the slots"
>
  {isSpinning ? '🎰 SPINNING...' : '🎰 PULL LEVER'}
</button>
```

**Next Steps:**

Move on to Phase 5 (Testing & Accessibility)

---

### Phase 5: Testing & Accessibility (YOU BUILD THIS)

#### Task 5.1: Write Jest Tests

**What to do:**
1. Create test files for your functions
2. Test game logic (win/loss calculation)
3. Test component rendering
4. Run tests with `npm test`

**Learning Goal:** Write unit tests for functions and components

**🎯 Breaking Down Task 5.1**

---

**Step 1: Understand What to Test**

**Test Priority:**
1. **Critical business logic** - Game outcome calculation, wallet updates
2. **Edge cases** - Zero wallet, negative wager, insufficient funds
3. **Component rendering** - Do components display correct data?
4. **User interactions** - Do buttons work correctly?

**Don't test:**
- Third-party libraries (Chart.js, React Query)
- Next.js framework code
- Trivial functions (getters, simple formatting)

---

**Step 2: Test Your Game Logic Functions**

Create `lib/game-logic.test.ts`:

```typescript
// lib/game-logic.test.ts
import { 
  generateSpinResult, 
  calculatePayout, 
  canPlaceBet, 
  updateWallet 
} from './game-logic';

describe('Game Logic', () => {
  describe('generateSpinResult', () => {
    test('should return a SpinResult with 3 slots', () => {
      // TODO: Call the function
      const result = generateSpinResult();
      
      // TODO: Check the result
      expect(result.slots).toHaveLength(3);
      expect(result.outcome).toMatch(/win|loss|tie/);
    });
    
    test('should have valid image paths and types', () => {
      // Test multiple times to ensure variety
      for (let i = 0; i < 10; i++) {
        const result = generateSpinResult();
        // Check each slot has a valid image path and type
        result.slots.forEach(slot => {
          expect(slot.image).toMatch(/\/noah-dog-media\/(noah|dogs)\/.*\.jpg$/);
          expect(slot.type).toMatch(/noah|dog/);
        });
      }
    });
    
    test('should produce outcomes (win, loss, tie) over many spins', () => {
      // This test checks if all outcomes are possible with random generation.
      // It's not deterministic, so we run it many times and check for presence.
      const outcomes = new Set<string>();
      const numSpins = 1000; // Sufficiently large number for statistical probability

      for (let i = 0; i < numSpins; i++) {
        const result = generateSpinResult();
        outcomes.add(result.outcome);
      }
      
      // Expect that we see at least one of each outcome over many spins
      expect(outcomes.size).toBeGreaterThanOrEqual(1); // At least one outcome
      expect(outcomes.has('win')).toBe(true);
      expect(outcomes.has('loss')).toBe(true);
      expect(outcomes.has('tie')).toBe(true);
    });

    // Specific test for win condition logic if helpers were used:
    // Mocking generateSpinResult to return specific values to test outcome calculation
    // This requires refactoring generateSpinResult to accept a random number generator or use mocking.
    // For simplicity in this guide, we rely on the statistical test above.
  });
  
  describe('calculatePayout', () => {
    test('should return positive payout on win', () => {
      // TODO: Test win payout
      expect(calculatePayout(50, 'win')).toBe(50); // Wins wager back + 1x profit
    });
    
    test('should return zero on tie', () => {
      // TODO: Test tie payout
      expect(calculatePayout(50, 'tie')).toBe(0); // Wager returned, no profit/loss
    });
    
    test('should return negative payout on loss', () => {
      // TODO: Test loss payout
      expect(calculatePayout(50, 'loss')).toBe(-50); // Lose the wager
    });
  });
  
  describe('canPlaceBet', () => {
    test('should return true when wager is valid and affordable', () => {
      // TODO: Test valid bet
      expect(canPlaceBet(100, 50)).toBe(true);
    });
    
    test('should return false when wager exceeds wallet', () => {
      // TODO: Test invalid bet (not enough money)
      expect(canPlaceBet(50, 100)).toBe(false);
    });
    
    test('should return false when wager is zero', () => {
      // TODO: Test zero wager
      expect(canPlaceBet(100, 0)).toBe(false);
    });
    
    test('should return false when wager is negative', () => {
      // TODO: Test negative wager
      expect(canPlaceBet(100, -10)).toBe(false);
    });
    
    test('should return false when wallet is zero', () => {
      // TODO: Test empty wallet
      expect(canPlaceBet(0, 50)).toBe(false);
    });

    test('should return false if wallet is zero and wager is zero', () => {
      expect(canPlaceBet(0, 0)).toBe(false);
    });
  });
  
  describe('updateWallet', () => {
    test('should add positive change to wallet', () => {
      // TODO: Test adding money
      expect(updateWallet(100, 50)).toBe(150);
    });
    
    test('should subtract negative change from wallet', () => {
      // TODO: Test losing money
      expect(updateWallet(100, -30)).toBe(70);
    });
    
    test('should never return negative balance', () => {
      // TODO: Test going below zero
      expect(updateWallet(20, -50)).toBe(0);
    });

    test('should return 0 if wallet is already 0 and change is negative', () => {
      expect(updateWallet(0, -50)).toBe(0);
    });
  });
});
```

**Run tests:**
```bash
npm test
```

---

**Step 3: Test React Components**

Create `components/stats-display.test.tsx`:

```typescript
// components/stats-display.test.tsx
import { render, screen } from '@testing-library/react';
import { StatsDisplay } from './stats-display';

describe('StatsDisplay', () => {
  test('should display wins, losses, and ties correctly', () => {
    // TODO: Render the component with sample data
    render(<StatsDisplay wins={5} losses={3} ties={2} />);
    
    // TODO: Check if the numbers are displayed in the document
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
  
  test('should calculate win rate correctly', () => {
    // TODO: Render with specific stats
    render(<StatsDisplay wins={7} losses={3} ties={0} />);
    
    // 7 wins out of 10 games (7+3+0) = 70%
    expect(screen.getByText('70.0%')).toBeInTheDocument();
  });
  
  test('should show 0.0% win rate when no games have been played', () => {
    // TODO: Render with zero stats
    render(<StatsDisplay wins={0} losses={0} ties={0} />);
    
    expect(screen.getByText('0.0%')).toBeInTheDocument();
  });
  
  test('should display the correct total number of games played', () => {
    // TODO: Render the component
    render(<StatsDisplay wins={5} losses={3} ties={2} />);
    
    // 5 + 3 + 2 = 10 games
    expect(screen.getByText(/10 games played/i)).toBeInTheDocument();
  });

  test('should display "game played" for a single game', () => {
    render(<StatsDisplay wins={1} losses={0} ties={0} />);
    expect(screen.getByText(/1 game played/i)).toBeInTheDocument();
  });
});
```

---

**Step 4: Write Snapshot Tests (Optional)**

Snapshot tests capture the rendered output and warn if it changes unexpectedly:

```typescript
// components/stats-display.test.tsx (add this test to the file)
import renderer from 'react-test-renderer'; // Need to install react-test-renderer

test('should match snapshot for stats display', () => {
  const { container } = render(<StatsDisplay wins={5} losses={3} ties={2} />);
  expect(container).toMatchSnapshot();
});
```

To run snapshot tests: `npm test -- -u` (The `-u` flag updates snapshots).

**When to use snapshots:**
- For complex components or UI elements where visual regressions are critical.
- To catch unintended changes in structure or styling.

**When NOT to use:**
- For very simple components with minimal rendering logic.
- If the UI is highly dynamic and expected to change often.
- Over-reliance can lead to brittle tests.

---

**Common Testing Mistakes:**

❌ **Don't test implementation details:**
```typescript
test('should call useState internally', () => {
  // Testing React internals is fragile and not recommended.
});
```

✅ **Test behavior and outcomes:**
```typescript
test('should display updated value when props change', () => {
  // Test what the user sees and how the component behaves.
});
```

❌ **Don't make tests dependent on each other:**
```typescript
let wallet = 100; // Global state shared between tests

test('should deduct money', () => {
  wallet = updateWallet(wallet, -50); // Modifies shared state
  expect(wallet).toBe(50);
});

test('should add money', () => {
  wallet = updateWallet(wallet, 50); // Depends on previous test's modification!
  expect(wallet).toBe(100);
});
```

✅ **Make tests independent:**
Each test should set up its own environment and not rely on the side effects of previous tests.
```typescript
test('should deduct money correctly', () => {
  const initialWallet = 100;
  expect(updateWallet(initialWallet, -50)).toBe(50);
});

test('should add money correctly', () => {
  const initialWallet = 100;
  expect(updateWallet(initialWallet, 50)).toBe(150);
});
```

---

**Verification Checklist:**

1. ✅ Do all tests pass (`npm test`)?
2. ✅ Did you test critical game logic functions?
3. ✅ Did you test edge cases (zero, negative values, insufficient funds)?
4. ✅ Did you test component rendering and display of data?
5. ✅ Is your `jest.config.js` set up correctly with `setupFilesAfterEnv`?

**Next Steps:**

Move on to Task 5.2 (Accessibility Testing)

---

#### Task 5.2: Add Accessibility Testing

**What to do:**
1. Install and configure jest-axe
2. Add accessibility tests to components
3. Fix any violations found
4. Add proper ARIA labels and alt text

**Learning Goal:** Make your app accessible to everyone

**🎯 Breaking Down Task 5.2**

**What is Accessibility (a11y)?**

Accessibility means making your app usable by everyone, including people with:
- Visual impairments (screen readers, low vision)
- Motor impairments (keyboard-only navigation)
- Cognitive impairments (clear language, simple layouts)
- Hearing impairments (captions, transcripts)

**Why it matters:**
- **Ethical imperative**: It's the right thing to do.
- **Legal requirement**: Many countries have laws mandating digital accessibility.
- **Wider audience**: Expands your user base.
- **Improved UX**: Accessible designs often benefit all users.
- **SEO benefits**: Search engines can better understand accessible content.

---

**Step 1: Install jest-axe**

It should already be in your `package.json`'s `devDependencies` if you followed the setup instructions. Verify:
```json
"jest-axe": "^9.0.0" // Or a similar recent version
```

If not, run: `npm install --save-dev jest-axe`

---

**Step 2: Set Up jest-axe**

You need to tell Jest to load `jest-axe` matchers. This is typically done in a test setup file.

Create or update `setupTests.ts` (or a similar file specified in `jest.config.js`'s `setupFilesAfterEnv`):

```typescript
// setupTests.ts
import '@testing-library/jest-dom'; // For additional DOM matchers
import { toHaveNoViolations } from 'jest-axe'; // Import the jest-axe matcher

// Extend Jest's expect with the new matchers
expect.extend(toHaveNoViolations);
```

Ensure your `jest.config.js` points to this file:
```javascript
// jest.config.js
module.exports = {
  // ... other configurations ...
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Path to your setup file
  // ...
};
```

---

**Step 3: Write Accessibility Tests**

Add accessibility checks to your component tests.

Example for `components/slot-display.test.tsx`:

```typescript
// components/slot-display.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe'; // Import axe and the matcher
import { SlotDisplay } from './slot-display';

// Extend expect with the jest-axe matcher
expect.extend(toHaveNoViolations);

describe('SlotDisplay Accessibility', () => {
  const testSlots = [
    { type: 'noah' as const, image: '/noah-dog-media/noah/noah-1.jpg' },
    { type: 'dog' as const, image: '/noah-dog-media/dogs/dog-1.jpg' },
    { type: 'noah' as const, image: '/noah-dog-media/noah/noah-2.jpg' },
  ];

  test('should have no accessibility violations', async () => {
    // TODO: Render the component with necessary props
    const { container } = render(
      <SlotDisplay slots={testSlots} isSpinning={false} />
    );
    
    // TODO: Run axe accessibility checker on the rendered DOM
    const results = await axe(container);
    
    // TODO: Expect no accessibility violations
    expect(results).toHaveNoViolations();
  });
  
  test('should have descriptive alt text for all slot images', () => {
    const { getAllByRole } = render(
      <SlotDisplay slots={testSlots} isSpinning={false} />
    );
    
    // TODO: Get all image elements
    const images = getAllByRole('img');
    
    // TODO: Check that each image has an alt attribute that is not empty
    expect(images).toHaveLength(3); // We expect 3 slots
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt');
      // Check that alt text is descriptive and not just an empty string
      expect(img.getAttribute('alt')).not.toBe(''); 
      expect(img.getAttribute('alt')).not.toBeNull();
      // You can add more specific checks if your alt text generation is complex
      expect(img.getAttribute('alt')).toContain(`Slot ${index + 1}`);
    });
  });

  test('should announce spin outcome via ARIA live region when it changes', async () => {
    const { getByRole } = render(
      <SlotDisplay slots={testSlots} isSpinning={false} outcome="win" />
    );
    
    // Find the status element (visually hidden)
    const statusElement = getByRole('status');
    
    // Check that the correct text is present for the 'win' outcome
    expect(statusElement).toHaveTextContent('You won!');

    // Re-render with a different outcome to test updates (this requires more complex state management in tests)
    // For simplicity, we'll assume the component correctly renders based on props.
  });
});
```

---

**Step 4: Fix Common Accessibility Issues**

Here are common pitfalls and how to fix them:

**1. Missing or Empty Alt Text for Images:**
   - **Problem**: Screen readers cannot describe the image content.
   - **Fix**: Provide meaningful `alt` text. For decorative images, use `alt=""`.
     ```tsx
     // Correct for your SlotDisplay component:
     <Image
       src={slot.image || "/placeholder.svg"}
       alt={`Slot ${index + 1}: ${slot.type === 'noah' ? 'Noah' : 'Dog'}`} // Descriptive alt text
       fill
       className="object-cover"
     />
     ```

**2. Using Divs Instead of Semantic HTML Elements:**
   - **Problem**: Interactive elements like buttons or links aren't recognized by assistive technologies.
   - **Fix**: Use native HTML elements (`<button>`, `<a>`, `<input>`, etc.).
     ```tsx
     // Correct: Use a button for interactive elements
     <button onClick={handleLeverPull}>Pull Lever</button> 
     
     // Incorrect:
     // <div onClick={handleLeverPull} role="button" tabIndex={0}>Pull Lever</div> 
     ```
     (Note: Using `role="button"` and `tabIndex={0}` can make a div *behave* like a button, but native elements are always preferred.)

**3. Insufficient Color Contrast:**
   - **Problem**: Text is hard to read for users with low vision or color blindness.
   - **Fix**: Ensure text color and background color meet WCAG contrast ratio requirements (4.5:1 for normal text, 3:1 for large text). Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
     ```css
     /* Tailwind example for good contrast */
     .text-gray-900.bg-gray-100 { /* Dark text on light background */ }
     
     /* Poor contrast example: */
     /* .text-gray-400.bg-gray-300 { /* Light gray text on slightly lighter gray background */ } */
     ```

**4. Lack of Keyboard Navigation Support:**
   - **Problem**: Users who cannot use a mouse cannot interact with your application.
   - **Fix**:
     - Ensure all interactive elements are focusable using the `Tab` key.
     - Ensure a logical tab order.
     - Make sure focus is visible (e.g., using `focus-visible` styles).
     ```tsx
     // Tailwind example for focus indicator:
     <button className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
       Click Me
     </button>
     ```

**5. Missing Labels for Form Controls:**
   - **Problem**: Screen readers cannot associate labels with their corresponding input fields.
   - **Fix**: Use the `<label>` element with a `htmlFor` attribute matching the input's `id`. If a visible label isn't appropriate, use `aria-label`.
     ```tsx
     // For your wager input (if it were an input field):
     <label htmlFor="wager-input" className="sr-only">Wager Amount</label> 
     <input 
       id="wager-input" 
       type="number" 
       value={gameState.wager} 
       onChange={(e) => updateWager(parseInt(e.target.value, 10))}
       aria-label="Wager amount" // Use aria-label if label is hidden or implicit
       className="text-center w-24 p-2 rounded bg-gray-700"
     />
     ```
     (Note: Your current wager display uses buttons, which don't require explicit labels in the same way as inputs, but `aria-label` on the button itself is good practice.)

**6. Using `aria-busy` for Loading States:**
   - **Problem**: Users need to know when content is being updated or loaded.
   - **Fix**: Use `aria-busy="true"` on the container element while content is loading/updating.
     ```tsx
     // Applied to the main game container or specific section
     <main aria-busy={isLoading}> 
       {/* ... game content ... */}
     </main>
     ```
     (In your case, `isLoading` from `useGameState` could be used.)

**7. ARIA Live Regions for Dynamic Content:**
   - **Problem**: Screen readers don't automatically announce changes to dynamically updated content.
   - **Fix**: Use `role="status"` or `role="alert"` with `aria-live="polite"` (or `"assertive"`) on an element that announces changes. Ensure it's visually hidden if not needed on screen.
     ```tsx
     // Already added in app/page.tsx for spin outcome:
     <div 
       role="status" 
       aria-live="polite" 
       aria-atomic="true"
       className="sr-only" 
     >
       {/* Content updates dynamically */}
     </div>
     ```

---

**Step 5: Test Keyboard Navigation**

Thoroughly test your application using only the keyboard:
1. **Tab Navigation**: Ensure you can tab through all interactive elements (buttons, links, wager controls).
2. **Tab Order**: Verify the tab order is logical (usually top-to-bottom, left-to-right).
3. **Activation**: Check that buttons can be activated with `Enter` or `Spacebar`.
4. **Focus Visibility**: Make sure the focus indicator is clear on all elements.
5. **Modal Focus Trapping** (if applicable): If you add modals, ensure focus stays within the modal while it's open.

---

**Step 6: Test with Screen Readers**

Familiarize yourself with a screen reader and navigate your application:
- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA (free) or JAWS
- **Browser Extensions**: ChromeVox (Chrome)

**Focus on:**
- **Image Descriptions**: Are `alt` texts accurate and informative?
- **Element Roles**: Are buttons announced as buttons, links as links?
- **Dynamic Updates**: Are changes (like winning messages) announced?
- **Form Labels**: Is it clear what each input field is for?
- **Heading Structure**: Does the content flow logically using headings?

---

**Common Accessibility Mistakes:**

❌ **Don't rely on color alone to convey information.**
   - Use icons, text labels, or other visual cues in addition to color.

❌ **Don't skip heading levels.**
   - Maintain a logical hierarchy (`h1` > `h2` > `h3`, etc.).

❌ **Don't create custom widgets without proper ARIA roles and states.**
   - If you build complex custom UI components, use ARIA attributes (`role`, `aria-label`, `aria-expanded`, etc.) to convey their purpose and state.

❌ **Don't disable focus outlines unless absolutely necessary and provide an alternative.**
   - Focus indicators are crucial for keyboard navigation.

---

**Verification Checklist:**

1. ✅ Are all images descriptive with `alt` text?
2. ✅ Are interactive elements native HTML elements (`<button>`, `<a>`)?
3. ✅ Is keyboard navigation fully supported and logical?
4. ✅ Are focus indicators clearly visible?
5. ✅ Is color contrast sufficient according to WCAG standards?
6. ✅ Are ARIA attributes used correctly for dynamic content and custom controls?
7. ✅ Do `jest-axe` tests pass without violations?
8. ✅ Does the application function correctly when tested with a screen reader?

---

**Resources:**

- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM (Web Accessibility In Mind)](https://webaim.org/)
- [The A11y Project](https://www.a11yproject.com/)
- [axe DevTools Browser Extension](https://www.deque.com/axe/devtools/) (for manual testing)

---

### Phase 6: Polish & Deploy (YOU BUILD THIS)

#### Task 6.1: Add Optional Features

**What to do:**
1. Research and implement sound effects.
2. Add more visual flair (e.g., particle effects on win).
3. Consider adding a history log of spins.

**Learning Goal:** Enhance user experience with additional features

---

#### Task 6.2: Responsive Design Review

**What to do:**
1. Test on various devices and screen sizes (use browser dev tools).
2. Ensure touch targets are large enough for mobile.
3. Refine spacing and layout for optimal viewing on all screen sizes.

**Learning Goal:** Achieve a consistent experience across all devices

---

#### Task 6.3: Deploy to Vercel

**What to do:**
1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Connect your repository to Vercel.
3. Deploy your Next.js application with one click.

**Learning Goal:** Deploy a modern web application to production

---

## 📖 Learning Resources

### Official Documentation
- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Query (TanStack Query)**: https://tanstack.com/query/latest/docs/react
- **Jest**: https://jestjs.io/docs/getting-started
- **Storybook**: https://storybook.js.org/docs

### Key Concepts to Study
1. **React Hooks**: `useState`, `useEffect`, `useCallback`, `useMemo`, `useContext`
2. **TypeScript Basics**: Types, Interfaces, Union Types, Generics, Utility Types
3. **Async JavaScript**: Promises, `async`/`await`, Event Loop
4. **CSS Flexbox & Grid**: `display: flex`, `display: grid` and their properties
5. **Testing Philosophy**: Unit tests vs. Integration tests vs. End-to-end tests
6. **Web Accessibility (WCAG)**: Principles, guidelines, and ARIA attributes

---

## 📎 How to Use This Guide

1. **Read the Technology Breakdown** - Understand what each tool does conceptually.
2. **Start with Phase 2** - Build the core components and logic step by step.
3. **Don't Rush**: Focus on understanding the "why" behind each step, not just the "how."
4. **Experiment**: Modify code, see what breaks, and learn to fix it.
5. **Use the Docs**: Official documentation is your best friend for deeper dives.
6. **Ask Questions**: If you're stuck, articulate your problem and ask for hints, not direct answers.
7. **Test as You Go**: Don't wait until Phase 5 to start testing. Write tests alongside your code.

---

## 🚀 Getting Started

1. **Review the Project Structure**: Familiarize yourself with the `app`, `components`, `hooks`, `lib`, and `types` directories.
2. **Read Through This Guide**: Get an overview of the entire migration process.
3. **Start with Task 2.1**: Begin by defining your TypeScript types.
4. **Work Sequentially**: Progress through each phase and task in order.
5. **Commit Frequently**: Use Git to commit your code after completing each task. This makes it easy to track progress and revert if necessary.
6. **Celebrate Small Wins!**: Completing each task is a step towards the final goal.

---

## 💡 Tips for Success

- **Type Everything**: Leverage TypeScript to catch errors early and improve code clarity. Avoid using `any` unless absolutely necessary.
- **Component-First Approach**: Develop UI components in isolation before integrating them into the main application. Storybook is excellent for this.
- **Mobile-First Design**: Design and build for mobile screens first, then progressively enhance for larger screens using responsive utilities.
- **Test Early and Often**: Write tests as you build features. This helps ensure correctness and provides a safety net for refactoring.
- **Read Error Messages Carefully**: TypeScript and React errors often provide valuable clues about what went wrong.
- **Use Official Documentation**: The docs for Next.js, TypeScript, Tailwind, React Query, etc., are comprehensive and up-to-date.
- **Understand Immutability**: Especially with React state and React Query, treat state as immutable. Create new objects/arrays when updating instead of modifying existing ones directly.

---

Congratulations! You've successfully migrated your old JavaScript game to a modern, robust tech stack. This journey has equipped you with valuable skills in contemporary web development practices. Keep building, keep learning, and enjoy your powerful new Noah Dog Game! 🚀
