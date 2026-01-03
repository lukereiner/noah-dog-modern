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

**Hint:** Copy your logic from `main.js` but add TypeScript types

---

#### Task 2.3: Style the Main Layout
**What to do:**
1. Open `app/page.tsx`
2. Use Tailwind to create:
   - Dark background (like your original)
   - Centered container
   - Responsive grid layout
   - Gradient or background styling

**Learning Goal:** Practice Tailwind utility classes and flexbox

**Resources:**
- Tailwind Docs: https://tailwindcss.com/docs
- Use `bg-gray-900`, `flex`, `items-center`, `justify-center`

---

#### Task 2.4: Create Wallet Component
**What to do:**
1. Create `components/wallet-display.tsx`
2. Show wallet balance with proper formatting
3. Show wager input with increment/decrement buttons
4. Use Tailwind for styling
5. Add TypeScript props interface

**Learning Goal:** Create a controlled component with TypeScript

**Hint:**
```tsx
interface WalletDisplayProps {
  wallet: number;
  wager: number;
  onWagerChange: (newWager: number) => void;
}
```

---

#### Task 2.5: Create Slot Display Component
**What to do:**
1. Create `components/slot-display.tsx`
2. Display three slots (images)
3. Add "spinning" animation state (use CSS Modules)
4. Create `slot-display.module.css` for animations
5. Use Next.js `<Image>` component for optimization

**Learning Goal:** Combine Tailwind + CSS Modules, use Next.js Image

**Hint:**
```tsx
import Image from 'next/image';
import styles from './slot-display.module.css';
```

---

#### Task 2.6: Create Lever Component
**What to do:**
1. Create `components/lever.tsx`
2. Build an interactive lever button
3. Create pull animation with CSS Modules (`lever.module.css`)
4. Disable during spin
5. Add click handler

**Learning Goal:** Create animated interactive components

**Styling Hint:** Use `@keyframes` in CSS Module for pull animation

---

#### Task 2.7: Create Stats Display Component
**What to do:**
1. Create `components/stats-display.tsx`
2. Show wins, losses, ties count
3. Use Tailwind for grid layout
4. Make it responsive

**Learning Goal:** Layout with Tailwind grid

---

### Phase 3: State Management with React Query (YOU BUILD THIS)

#### Task 3.1: Set Up React Query
**What to do:**
1. Follow Setup Guide in `docs/REACT_QUERY_SETUP.md`
2. Wrap app in `QueryClientProvider`
3. Create custom hooks in `hooks/use-game-state.ts`

**Learning Goal:** Understand React Query setup and providers

---

#### Task 3.2: Create Game State Hook
**What to do:**
1. Create `hooks/use-game-state.ts`
2. Use `useQuery` to load state from localStorage
3. Use `useMutation` to update state
4. Implement save to localStorage on mutations

**Learning Goal:** Manage client-side state with React Query

---

#### Task 3.3: Connect Components to State
**What to do:**
1. Import `useGameState` hook in `app/page.tsx`
2. Pass data to child components via props
3. Connect button click handlers to mutations

**Learning Goal:** Connect data flow from hooks to components

---

### Phase 4: Testing (YOU BUILD THIS)

#### Task 4.1: Set Up Jest
**What to do:**
1. Follow Setup Guide in `docs/JEST_SETUP.md`
2. Create `jest.config.js`
3. Add test scripts to `package.json`

---

#### Task 4.2: Write Logic Tests
**What to do:**
1. Create `lib/__tests__/game-logic.test.ts`
2. Test each pure function
3. Test edge cases (negative wagers, insufficient funds)

**Learning Goal:** Write unit tests for business logic

---

#### Task 4.3: Write Component Tests
**What to do:**
1. Create `components/__tests__/wallet-display.test.tsx`
2. Use React Testing Library
3. Test rendering and interactions

**Learning Goal:** Test React components

---

#### Task 4.4: Add Accessibility Tests
**What to do:**
1. Install `jest-axe`
2. Add axe tests to component tests
3. Fix any violations found

**Learning Goal:** Ensure components are accessible

---

### Phase 5: Storybook (YOU BUILD THIS)

#### Task 5.1: Set Up Storybook
**What to do:**
1. Run `npx storybook@latest init`
2. Configure for Next.js and Tailwind
3. Create first story

---

#### Task 5.2: Create Component Stories
**What to do:**
1. Create `.stories.tsx` files for each component
2. Show different states (default, loading, error, disabled)
3. Add controls for interactive props

**Learning Goal:** Document components visually

---

### Phase 6: Polish & Deploy (YOU BUILD THIS)

#### Task 6.1: Add Chart (Optional)
**What to do:**
1. Research chart libraries (Recharts recommended)
2. Create `components/stats-chart.tsx`
3. Visualize win/loss data

---

#### Task 6.2: Responsive Design
**What to do:**
1. Test on mobile (use browser dev tools)
2. Add responsive Tailwind classes (`md:`, `lg:`)
3. Ensure touch-friendly interactions

---

#### Task 6.3: Deploy to Vercel
**What to do:**
1. Push code to GitHub
2. Connect to Vercel
3. Deploy with one click

---

## 📖 Learning Resources

### Official Documentation
- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Query**: https://tanstack.com/query/latest/docs/react
- **Jest**: https://jestjs.io/docs/getting-started
- **Storybook**: https://storybook.js.org/docs

### Key Concepts to Study
1. **React Hooks**: `useState`, `useEffect`, `useCallback`, `useMemo`
2. **TypeScript Basics**: Types, Interfaces, Generics
3. **Async JavaScript**: Promises, async/await
4. **CSS Flexbox**: `flex`, `items-center`, `justify-between`
5. **Testing Philosophy**: Unit tests vs Integration tests

---

## 🎓 How to Use This Guide

1. **Read the Technology Breakdown** - Understand what each tool does
2. **Start with Phase 2** - Build one task at a time
3. **Don't rush** - Take time to understand, not just copy
4. **Experiment** - Break things and fix them
5. **Use the docs** - Look up concepts you don't understand
6. **Ask questions** - If stuck, ask for hints (not answers)
7. **Test as you go** - Don't wait until Phase 4 to start testing

---

## 🚀 Getting Started

1. Read through this entire guide first
2. Review the starter code in `app/page.tsx`
3. Start with Task 2.1 (Type Definitions)
4. Work through each task sequentially
5. Commit your code after each task
6. Celebrate small wins!

---

## 💡 Tips for Success

- **Type everything**: Don't use `any` in TypeScript
- **Component first**: Build components in isolation, then connect
- **Mobile first**: Design for mobile, then add desktop styles
- **Test early**: Write tests as you build, not after
- **Read errors**: TypeScript/React errors are helpful, not scary
- **Use the docs**: Official documentation is your best friend
- **Git commit often**: Small commits make it easy to undo mistakes

---

Good luck! Remember, the goal is to **learn**, not to finish quickly. Take your time with each technology and really understand what it does and why it's useful.
