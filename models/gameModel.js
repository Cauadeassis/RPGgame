import { useState, useEffect } from "react";
import { commonCards, defeatCards, evolutionCards } from "../data/cards";

export function game(initialStats) {
  const [stats, setStats] = useState(initialStats);
  const [currentCard, setCurrentCard] = useState(null);
  const [persistentEffects, setPersistentEffects] = useState({});
  const [cardsAlreadyDrawn, setCardsAlreadyDrawn] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const statKeys = Object.keys(stats);
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
      Object.entries(stats).map(([key, val]) => [key, { ...val }])
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
          [stat]: { ...updatedStats[stat], maxValue: maxValue + 50 },
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
  useEffect(() => {
    const firstIndex = drawCard();
    setCurrentCard(commonCards[firstIndex]);
  }, []);
  return {
    stats,
    currentCard,
    displayedText,
    isTyping,
    handleButtonClick,
  };
}
