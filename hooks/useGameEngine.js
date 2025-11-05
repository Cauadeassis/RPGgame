import { useGameStats } from "./useGameStats";
import { useGameCards } from "./useGameCards";
import { useGameEffects } from "./useGameEffects";

export function useGameEngine(initialStats) {
  const { stats, applyEffects, checkStats } = useGameStats(initialStats);
  const { currentCard, displayedText, isTyping, drawCard, setCurrentCard } = useGameCards();
  const { applyEffects: applyAllEffects } = useGameEffects(stats, applyEffects);

  function handleButtonClick(buttonEffects) {
    const updatedStats = applyAllEffects(buttonEffects);
    const result = checkStats(updatedStats);

    if (result.type === "defeat" || result.type === "evolution") {
      setCurrentCard(result.card);
      return;
    }

    const nextCard = drawCard();
    setCurrentCard(nextCard);
  }

  return {
    stats,
    currentCard,
    displayedText,
    isTyping,
    handleButtonClick,
  };
}
