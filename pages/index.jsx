import React from "react";
import styles from "../styles/game.module.css";
import { game } from "../models/gameModel";

export default function Game() {
  const initialStats = {
    ecology: { value: 50, maxValue: 100 },
    population: { value: 50, maxValue: 100 },
    army: { value: 50, maxValue: 100 },
    economy: { value: 50, maxValue: 100 },
  };
  const { stats, currentCard, displayedText, isTyping, handleButtonClick } =
    game(initialStats);
  const statKeys = Object.keys(stats);
  return (
    <div className={styles.body}>
      <header className={styles.gameHeader}>
        <h1 className={styles.countryName}>Inglaterra</h1>
        <div className={styles.stats}>
          {statKeys.map((key) => (
            <div className={styles.singleStat} key={key}>
              {key[0].toUpperCase() + key.slice(1)}:{" "}
              <span className={styles.singleStatSpan}>{stats[key].value}</span>
            </div>
          ))}
        </div>
      </header>
      {currentCard && (
        <>
          <div className={styles.card}>
            <p className={styles.cardText}>{displayedText}</p>
          </div>

          <div className={styles.cardChoicesDiv}>
            <button
              disabled={isTyping}
              className={styles.cardChoices}
              onClick={() =>
                handleButtonClick(currentCard.effects.leftButtonEffects)
              }
            >
              {currentCard.leftButtonText}
            </button>

            <button
              disabled={isTyping}
              className={styles.cardChoices}
              onClick={() =>
                handleButtonClick(currentCard.effects.rightButtonEffects)
              }
            >
              {currentCard.rightButtonText}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
