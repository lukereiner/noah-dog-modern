"use client";

interface StatsDisplayProps {
  wins: number;
  losses: number;
}

export function StatsDisplay({ wins, losses }: StatsDisplayProps) {
  const totalGames = wins + losses;
  const winRate =
    totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : "0.0";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        {/* Win card */}
        <div className="bg-gray-800 border-2 border-green-500 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Wins</div>
          <div className="text-4xl font-bold text-green-500">{wins}</div>
        </div>
        {/* Loss card */}
        <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">💔</div>
          <div className="text-sm text-gray-400 uppercase mb-2">Losses</div>
          <div className="text-4xl font-bold text-red-500">{losses}</div>
        </div>
        {/* Win rate display */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-gray-400 text-sm">Win Rate</div>
            <div className="text-2xl font-bold text-white">{winRate}%</div>
            <div className="text-gray-500 text-xs mt-1">
              {totalGames} {totalGames === 1 ? "game" : "games"} played
            </div>
          </div>

          {/* TODO: Add progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
              style={{ width: `${Math.min(parseFloat(winRate), 100)}%` }} // Ensure winRate is a number
            />
          </div>
        </div>
      </div>
    </div>
  );
}
