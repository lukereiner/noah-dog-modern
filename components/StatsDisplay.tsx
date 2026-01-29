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
    <div className="w-full max-w-2xl mx-auto px-0">
      <div className="grid grid-cols-3 gap-2 items-center bg-gray-800 border border-gray-600 rounded-lg p-2">
        {/* Wins */}
        <div className="text-center">
          <div className="text-md text-gray-400 uppercase mb-0">Wins</div>
          <div className="text-xl font-bold text-green-500">{wins}</div>
        </div>
        {/* Losses */}
        <div className="text-center">
          <div className="text-md text-gray-400 uppercase mb-0">Losses</div>
          <div className="text-xl font-bold text-red-500">{losses}</div>
        </div>
        {/* Win Rate */}
        <div className="text-center">
          <div className="text-md text-gray-400">Win Rate</div>
          <div className="text-xl font-bold text-white">{winRate}%</div>
{/*           <div className="text-gray-500 text-xs">
            {totalGames} {totalGames === 1 ? "game" : "games"} played
          </div> */}
        </div>
      </div>
      {/* Progress bar across all columns */}
      <div className="w-full bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
          style={{ width: `${Math.min(parseFloat(winRate), 100)}%` }}
        />
      </div>
    </div>
  );
}
