import { useState } from "react";
import { defeatCards, evolutionCards } from "../data/cards";

export function useGameStats(initialStats) {
  const [stats, setStats] = useState(initialStats);
  const [persistentEffects, setPersistentEffects] = useState({});
  const statKeys = Object.keys(stats);
  function applyEffects(buttonEffects) {
    const newStats = Object.fromEntries(
      Object.entries(stats).map(([key, val]) => [
        key,
        { ...val, value: Number(val.value) || 0 }
      ])
    );
    const totalEffects = { ...(buttonEffects?.commonEffects || {}) };
    for (const stat of Object.keys(persistentEffects)) {
      const effectValue = Number(persistentEffects[stat]) || 0;
      totalEffects[stat] = (totalEffects[stat] || 0) + effectValue;
    }
    for (const stat of Object.keys(totalEffects)) {
      if (!(stat in newStats)) {
        console.warn(`Stat "${stat}" não existe em stats, ignorando efeito.`);
        continue;
      }
      newStats[stat].value += Number(totalEffects[stat]) || 0;
    }

    setStats(newStats);
    return newStats;
  }
  function checkStats(updatedStats) {
    for (const stat of statKeys) {
      const { value, maxValue } = updatedStats[stat];
      if (value <= 0) {
        return {
          type: "defeat",
          card: defeatCards.find((card) => card.stat === stat),
        };
      }
      if (value >= maxValue) {
        const evolvedStats = {
          ...updatedStats,
          [stat]: { ...updatedStats[stat], maxValue: maxValue + 50 },
        };
        setStats(evolvedStats);
        return {
          type: "evolution",
          card: evolutionCards.find((card) => card.stat === stat),
        };
      }
    }
    return { type: "normal" };
  }

  return {
    stats,
    applyEffects,
    checkStats,
    setPersistentEffects,
  };
}