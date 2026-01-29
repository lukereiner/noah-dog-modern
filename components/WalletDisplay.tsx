"use client";

interface WalletDisplayProps {
  wallet: number;
  wager: number;
  onWagerChange: (newWager: number) => void;
  disabled?: boolean;
  minWager?: number;
  maxWager?: number;
}

export function WalletDisplay({
  wallet,
  wager,
  onWagerChange,
  disabled = false,
  minWager = 100,
  maxWager = 1000,
}: WalletDisplayProps) {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const increaseWager = () => {
    const newWager = Math.min(wager + 100, maxWager, wallet);
    onWagerChange(newWager);
  };

  const decreaseWager = () => {
    const newWager = Math.max(wager - 100, minWager);
    onWagerChange(newWager);
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg border-2 border-gray-700 p-2 space-y-2">
      <div id="balance-wager-wrapper" className="grid grid-cols-2 gap-4">
        {/* Wallet Balance and Wager */}
        <div className="col-span-2 flex justify-evenly items-center">
          <div className="text-center">
            <div className="text-sm text-gray-400 uppercase">
              Balance
            </div>
            <div
              className={`text-2xl font-bold ${
                wallet <= 200 ? "text-red-500" : "text-white"
              }`}
            >
              {formatCurrency(wallet)}
            </div>
{/*             {wallet <= 200 && (
              <div className="text-xs text-red-500 mt-1">⚠️ Low balance!</div>
            )} */}
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 uppercase">Wager</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(wager)}
            </div>
          </div>
        </div>

        {/* Wager Controls */}
        <div className="col-span-2 flex justify-center items-center gap-12 mt-2">
          <button
            onClick={decreaseWager}
            disabled={disabled || wager <= minWager}
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600
disabled:opacity-30 disabled:cursor-not-allowed
font-bold text-xl transition-colors text-white"
            aria-label="Decrease wager"
          >
            -
          </button>
          <button
            onClick={increaseWager}
            disabled={disabled || wager == maxWager || wager >= wallet}
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600
disabled:opacity-30 disabled:cursor-not-allowed
font-bold text-xl transition-colors text-white"
            aria-label="Increase wager"
          >
            +
          </button>
        </div>

        {/* Wager Range Info */}
{/*         <div className="col-span-2 text-xs text-muted-foreground text-center mt-2">
          Range: {formatCurrency(minWager)} - {formatCurrency(maxWager)}
        </div> */}
      </div>
    </div>
  );
}
