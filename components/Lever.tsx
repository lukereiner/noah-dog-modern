"use client"

import styles from "./Lever.module.css"

interface LeverProps {
  onClick: () => void
  disabled?: boolean
  isSpinning?: boolean
}

export function Lever({ onClick, disabled = false, isSpinning = false }: LeverProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.leverContainer} ${isSpinning ? styles.pulling : ""}`}
        aria-busy={isSpinning}
        aria-label="Pull lever to spin"
      >
        {/* Ball/Knob at the top */}
        <div className={styles.leverBall}></div>

        {/* Lever handle shaft */}
        <div className={styles.leverShaft}>
          <div className={styles.leverTrack}></div>
        </div>
      </button>

      {/* Text below the lever */}
      <span className="mt-4 text-sm font-semibold text-muted-foreground">
        {isSpinning ? "SPINNING..." : "PULL LEVER"}
      </span>
    </div>
  )
}
