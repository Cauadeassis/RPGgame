import React, { useState, useEffect } from "react";
import styles from "../styles/game.module.css";
import { commonCards, defeatCards, evolutionCards } from "../data/cards";

export default function Game() {
  const initialStats = {
    ecology: { value: 50, maxValue: 100 },
    population: { value: 50, maxValue: 100 },
    army: { value: 50, maxValue: 100 },
    economy: { value: 50, maxValue: 100 },
  };
  const [stats, setStats] = useState(initialStats);
  const [currentCard, setCurrentCard] = useState(null);
  const [persistentEffects, setPersistentEffects] = useState({});
  const [cardsAlreadyDrawn, setCardsAlreadyDrawn] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const statKeys = Object.keys(stats);
  useEffect(() => {
    if (!currentCard) return;
    setDisplayedText("");
    setIsTyping(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + currentCard.text[i]);
      i++;
      if (i === currentCard.text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [currentCard]);

  function drawCard() {
    if (cardsAlreadyDrawn.length === commonCards.length) return null;
    let index;
    do {
      index = Math.floor(Math.random() * commonCards.length);
    } while (cardsAlreadyDrawn.includes(index));
    setCardsAlreadyDrawn((prev) => [...prev, index]);
    return index;
  }
  function applyEffects(buttonEffects) {
    const newStats = Object.fromEntries(
      Object.entries(stats).map(([key, val]) => [key, { ...val }]),
    );
    const totalEffects = { ...buttonEffects.commonEffects };
    for (const stat in persistentEffects) {
      totalEffects[stat] = (totalEffects[stat] || 0) + persistentEffects[stat];
    }
    for (const stat in totalEffects) {
      if (!newStats[stat]) continue;
      newStats[stat].value += totalEffects[stat];
    }
    setStats(newStats);
    return newStats;
  }
  function checkStats(updatedStats) {
    for (const stat of statKeys) {
      const { value, maxValue } = updatedStats[stat];
      if (value <= 0) {
        return defeatCards.find((card) => card.stat === stat);
      }
      if (value >= maxValue) {
        const evolvedStats = {
          ...updatedStats,
          [stat]: {
            ...updatedStats[stat],
            maxValue: maxValue + 50,
          },
        };
        setStats(evolvedStats);
        return evolutionCards.find((card) => card.stat === stat);
      }
    }
    const index = drawCard();
    if (index === null) {
      return {
        text: "Fim do jogo! Você usou todas as cartas.",
        leftButtonText: "Reiniciar",
        rightButtonText: "Sair",
        effects: {
          leftButtonEffects: {},
          rightButtonEffects: {},
        },
      };
    }
    return commonCards[index];
  }
  function handleButtonClick(effects) {
    const updatedStats = applyEffects(effects);
    const nextCard = checkStats(updatedStats);
    setCurrentCard(nextCard);
  }
  useEffect(() => {
    const firstIndex = drawCard();
    setCurrentCard(commonCards[firstIndex]);
  }, []);

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
