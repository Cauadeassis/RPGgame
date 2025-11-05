import { useState, useEffect } from "react";
import { commonCards } from "../data/cards";

export function useGameEffects(stats, setStats, persistentEffects) {
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
    console.log("applyEffects rodou!", buttonEffects, stats);
    return newStats;
  }

  return { applyEffects };
}