# Jest & Testing Setup Guide

## What You'll Learn
- How to set up Jest for Next.js and TypeScript
- How to write unit tests for pure functions
- How to write component tests with React Testing Library
- How to add accessibility tests with jest-axe

---

## Step 1: Install Dependencies

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom jest-axe
```

---

## Step 2: Create Jest Config

Create `jest.config.js` in your project root:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to your Next.js app
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

---

## Step 3: Create Jest Setup File

Create `jest.setup.js` in your project root:

```javascript
import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'
```

---

## Step 4: Add Test Scripts to package.json

TODO: Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Writing Your First Test

### Example 1: Testing Pure Functions (Task 4.2)

Create `lib/__tests__/game-logic.test.ts`:

```typescript
import { generateSpinResult, calculatePayout, canPlaceBet, updateWallet } from '../game-logic'

describe('Game Logic', () => {
  // Test calculatePayout
  describe('calculatePayout', () => {
    test('should return positive amount on win', () => {
      const result = calculatePayout(100, 'win')
      expect(result).toBe(100) // Or whatever your win payout is
    })

    test('should return negative amount on loss', () => {
      // TODO: Write this test
    })

    test('should return zero on tie', () => {
      // TODO: Write this test
    })
  })

  // Test canPlaceBet
  describe('canPlaceBet', () => {
    test('should return true when wallet has enough', () => {
      const result = canPlaceBet(1000, 50)
      expect(result).toBe(true)
    })

    test('should return false when wager exceeds wallet', () => {
      // TODO: Write this test
    })

    test('should return false for negative wager', () => {
      // TODO: Write this test
    })

    test('should return false for zero wager', () => {
      // TODO: Write this test
    })
  })

  // Test updateWallet
  describe('updateWallet', () => {
    test('should add positive amounts', () => {
      // TODO: Write this test
    })

    test('should subtract negative amounts', () => {
      // TODO: Write this test
    })

    test('should not go below zero', () => {
      // TODO: Write this test
    })
  })

  // Test generateSpinResult
  describe('generateSpinResult', () => {
    test('should return a valid SpinResult object', () => {
      const result = generateSpinResult()
      
      // TODO: Check that result has the right shape
      expect(result).toHaveProperty('outcome')
      expect(result).toHaveProperty('slots')
      expect(result.slots).toHaveLength(3)
    })

    test('should mark all same as win', () => {
      // This is tricky because of randomness
      // You might need to test the logic separately
      // Or run it many times and check probabilities
    })
  })
})
```

---

### Example 2: Testing React Components (Task 4.3)

Create `components/__tests__/wallet-display.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WalletDisplay } from '../wallet-display'

describe('WalletDisplay', () => {
  test('renders wallet amount', () => {
    render(
      <WalletDisplay 
        wallet={1000} 
        wager={50} 
        onWagerChange={() => {}} 
      />
    )
    
    // TODO: Check that "$1000" or "1000" appears on screen
    expect(screen.getByText(/1000/)).toBeInTheDocument()
  })

  test('renders wager amount', () => {
    // TODO: Write this test
  })

  test('calls onWagerChange when wager is updated', async () => {
    const mockOnChange = jest.fn()
    const user = userEvent.setup()
    
    render(
      <WalletDisplay 
        wallet={1000} 
        wager={50} 
        onWagerChange={mockOnChange} 
      />
    )
    
    // TODO: Find the increment button and click it
    // TODO: Expect mockOnChange to have been called
    // Hint: screen.getByRole('button', { name: /increment/i })
    // Hint: await user.click(button)
    // Hint: expect(mockOnChange).toHaveBeenCalledWith(60)
  })

  test('does not allow wager to exceed wallet', async () => {
    // TODO: Write this test
    // Try to set wager higher than wallet
    // Expect it to be capped at wallet amount
  })
})
```

---

### Example 3: Accessibility Testing (Task 4.4)

Add to your component test:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('WalletDisplay Accessibility', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <WalletDisplay 
        wallet={1000} 
        wager={50} 
        onWagerChange={() => {}} 
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('buttons have accessible labels', () => {
    render(
      <WalletDisplay 
        wallet={1000} 
        wager={50} 
        onWagerChange={() => {}} 
      />
    )
    
    // TODO: Check that buttons have proper labels
    expect(screen.getByLabelText(/increase wager/i)).toBeInTheDocument()
    // Or check aria-label attributes
  })
})
```

---

## Running Your Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

---

## What to Test

### Pure Functions (lib/game-logic.ts)
- ✅ All input combinations
- ✅ Edge cases (0, negative, very large numbers)
- ✅ Return value types
- ✅ Error conditions

### Components
- ✅ Renders with props
- ✅ User interactions (clicks, typing)
- ✅ Conditional rendering (loading, error states)
- ✅ Accessibility (keyboard navigation, screen readers)

### Integration Tests
- ✅ Multiple components working together
- ✅ Data flow from hooks to components
- ✅ Complete user workflows (place bet → pull lever → see result)

---

## Your Tasks

1. [ ] Install testing dependencies
2. [ ] Create jest.config.js
3. [ ] Create jest.setup.js
4. [ ] Add test scripts to package.json
5. [ ] Write tests for `calculatePayout()`
6. [ ] Write tests for `canPlaceBet()`
7. [ ] Write tests for `updateWallet()`
8. [ ] Write tests for `generateSpinResult()`
9. [ ] Write tests for WalletDisplay component
10. [ ] Write tests for Lever component
11. [ ] Write tests for SlotDisplay component
12. [ ] Add accessibility tests to all components
13. [ ] Aim for 80%+ code coverage

---

## Testing Best Practices

1. **Test behavior, not implementation** - Test what the user sees/does
2. **One assertion per test** - Makes failures easier to diagnose
3. **Use descriptive test names** - "should return false when wager exceeds wallet"
4. **Test edge cases** - 0, negative, null, undefined, very large numbers
5. **Mock external dependencies** - Don't test localStorage, test your code
6. **Keep tests fast** - No real API calls, no setTimeout delays

---

## Common Testing Patterns

```typescript
// Arrange - Set up test data
const wallet = 1000
const wager = 50

// Act - Do the thing you're testing
const result = canPlaceBet(wallet, wager)

// Assert - Check the result
expect(result).toBe(true)
```

```typescript
// Test async code
test('async example', async () => {
  const result = await someAsyncFunction()
  expect(result).toBe(expected)
})
```

```typescript
// Test user interactions
test('button click', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)
  
  const button = screen.getByRole('button')
  await user.click(button)
  
  expect(screen.getByText(/success/i)).toBeInTheDocument()
})
