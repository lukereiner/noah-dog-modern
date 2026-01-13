# Noah Dog Game - Modern Stack Version

This is a learning project to rebuild the "Does Noah got that DOG in 'em?" game using modern web development tools.

## 🎯 Purpose

This project is designed to teach you:
- Next.js 16 (React Framework)
- TypeScript (Type Safety)
- Tailwind CSS (Utility-First Styling)
- CSS Modules (Scoped Styles)
- React Query (State Management)
- Jest (Testing)
- Jest-axe (Accessibility Testing)
- Storybook (Component Development)

## 📚 Getting Started

1. **Read the Learning Guide**: Open `LEARNING_GUIDE.md` for a complete explanation of all technologies and step-by-step tasks

2. **Start Development Server**:
```bash
npm install
npm run dev
```

3. **Open in Browser**: Navigate to `http://localhost:3000`

4. **Begin Task 2.1**: Start with creating type definitions in `types/game.ts`

## 📁 Project Structure

```
noah-dog-game/
├── app/
│   ├── page.tsx          # Main game page (start here)
│   ├── layout.tsx        # App wrapper
│   └── globals.css       # Global styles
├── components/           # React components (you build these)
├── lib/
│   └── game-logic.ts     # Pure functions (you build this)
├── types/
│   └── game.ts           # TypeScript definitions (you build this)
├── hooks/
│   └── use-game-state.ts # React Query hook (you build this)
├── docs/
│   ├── REACT_QUERY_SETUP.md  # React Query guide
│   └── JEST_SETUP.md         # Testing guide
├── noah-dog-media/       # Original game assets
└── LEARNING_GUIDE.md     # Your main guide (READ THIS FIRST)
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linting
npm test             # Run tests (after you set up Jest)
npm run test:watch   # Run tests in watch mode
npm run storybook    # Start Storybook (after you set it up)
```

## 📖 Documentation

- **LEARNING_GUIDE.md** - Complete learning guide with all tasks
- **docs/REACT_QUERY_SETUP.md** - How to set up and use React Query
- **docs/JEST_SETUP.md** - How to set up and write tests

## 🎓 Learning Approach

1. **Don't rush** - Take time to understand each concept
2. **Build incrementally** - Complete one task before moving to the next
3. **Read the docs** - Official documentation is your best resource
4. **Experiment** - Try things and learn from mistakes
5. **Ask for hints** - If stuck, ask for guidance (not complete answers)

## 📝 Task Progress

Track your progress through the guide:

### Phase 2: Core Components
- [ :white_check_mark: ] Task 2.1: Create Type Definitions
- [ ] Task 2.2: Build Game Logic
- [ ] Task 2.3: Style Main Layout
- [ ] Task 2.4: Create Wallet Component
- [ ] Task 2.5: Create Slot Display Component
- [ ] Task 2.6: Create Lever Component
- [ ] Task 2.7: Create Stats Display Component

### Phase 3: State Management
- [ ] Task 3.1: Set Up React Query
- [ ] Task 3.2: Create Game State Hook
- [ ] Task 3.3: Connect Components to State

### Phase 4: Testing
- [ ] Task 4.1: Set Up Jest
- [ ] Task 4.2: Write Logic Tests
- [ ] Task 4.3: Write Component Tests
- [ ] Task 4.4: Add Accessibility Tests

### Phase 5: Storybook
- [ ] Task 5.1: Set Up Storybook
- [ ] Task 5.2: Create Component Stories

### Phase 6: Polish
- [ ] Task 6.1: Add Chart (Optional)
- [ ] Task 6.2: Responsive Design
- [ ] Task 6.3: Deploy to Vercel

## 🚀 Next Steps

1. Open `LEARNING_GUIDE.md`
2. Read through the Technology Breakdown section
3. Start with Phase 2, Task 2.1
4. Work through each task sequentially

Good luck and happy learning! 🎉
