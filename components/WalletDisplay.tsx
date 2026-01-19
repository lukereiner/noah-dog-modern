"use client";

import { useState } from "react";

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
    <div className="bg-card rounded-lg border-2 border-border p-6 space-y-4">
      {/* Wallet Balance Section */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground uppercase mb-2">
          Wallet Balance
        </div>
        <div
          className={`text-3xl font-bold ${
            wallet < 50 ? "text-red-500" : "text-foreground"
          }`}
        >
          {formatCurrency(wallet)}
        </div>
        {wallet < 50 && (
            <div className="text-xs text-red-500 mt-1">⚠️ Low balance!</div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border">
        {/* Wager controls go here */}
        <div>
            <div className="text-sm text-muted-foreground uppercase text-center mb-3">Current Wager</div>
            {/* Wager controls */}
            <div className="flex items-center justify-center gap-4">
                {/* Decrease button */}
                <button
                onClick={decreaseWager}
                disabled={disabled || wager <= minWager}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     font-bold text-xl transition-colors"
                aria-label="Decrease wager">
                    -
                </button>
                {/* Current wager amount */}
                <div className="min-w-[120px] text-center">
                    <div className="text-2xl font-bold text-foreground">{formatCurrency(wager)}</div>
                </div>
                {/* Increase button */}
                <button
                onClick={increaseWager}
                disabled={disabled || wager == maxWager || wager >= wallet}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     font-bold text-xl transition-colors"
          aria-label="Increase wager">
                    +
                </button>
            </div>
            {/* Wager range info */}
            <div className="text-xs text-muted-foreground text-center mt-2">
                Range: {formatCurrency(minWager)} - {formatCurrency(maxWager)}
            </div>
        </div>
      </div>
    </div>
  );
}
