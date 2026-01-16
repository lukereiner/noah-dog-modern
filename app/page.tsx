"use client"

import GenerateSpinResult from "./components/GenerateSpinResult"

// TODO: Import your components here as you build them
// import { WalletDisplay } from '@/components/wallet-display'
// import { SlotDisplay } from '@/components/slot-display'
// import { Lever } from '@/components/lever'
// import { StatsDisplay } from '@/components/stats-display'

export default function GamePage() {
  // TODO: Task 3.3 - Import and use your game state hook here
  // const { gameState, placeBet, pullLever, resetGame } = useGameState()

  // TODO: Task 2.3 - Style this layout with Tailwind CSS
  // Hint: Use flexbox to center everything
  // Hint: Use a dark background like your original (bg-gray-900)
  // Hint: Make it responsive with min-h-screen

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* TODO: Create a centered container */}
      <div className="max-w-4xl mx-auto">
        {/* TODO: Add game title */}
        <h1 className="text-4xl font-bold text-center mb-8">Does Noah got that DOG in 'em?</h1>
        <div className="text-2xl font-bold text-center mb-4">We shall see!</div>

        <GenerateSpinResult />

        {/* TODO: Task 2.4 - Add WalletDisplay component here */}
        <div className="mb-8">
          {/* <WalletDisplay 
            wallet={0} 
            wager={0} 
            onWagerChange={(newWager) => {}}
          /> */}
          <p className="text-gray-400 text-center">[Wallet Display Component Goes Here]</p>
        </div>

        {/* TODO: Task 2.5 - Add SlotDisplay component here */}
        <div className="mb-8">
          {/* <SlotDisplay 
            slots={[]} 
            isSpinning={false}
          /> */}
          <p className="text-gray-400 text-center">[Slot Display Component Goes Here]</p>
        </div>

        {/* TODO: Task 2.6 - Add Lever component here */}
        <div className="mb-8 flex justify-center">
          {/* <Lever 
            onPull={() => {}}
            disabled={false}
            isPulling={false}
          /> */}
          <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">[Lever Component Goes Here]</button>
        </div>

        {/* TODO: Task 2.7 - Add StatsDisplay component here */}
        <div>
          {/* <StatsDisplay 
            wins={0} 
            losses={0} 
            ties={0}
          /> */}
          <p className="text-gray-400 text-center">[Stats Display Component Goes Here]</p>
        </div>
      </div>
    </div>
  )
}
