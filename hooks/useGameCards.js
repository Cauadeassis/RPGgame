import { useState, useEffect, useRef } from "react";
import { commonCards } from "../data/cards";

export function useGameCards() {
  const [currentCard, setCurrentCard] = useState(null);
  const [cardsAlreadyDrawn, setCardsAlreadyDrawn] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);

  function drawCard() {
    if (cardsAlreadyDrawn.length === commonCards.length) return null;
    let cardIndex;
    do {
      cardIndex = Math.floor(Math.random() * commonCards.length);
    } while (cardsAlreadyDrawn.includes(cardIndex));
    setCardsAlreadyDrawn((prev) => [...prev, cardIndex]);
    return commonCards[cardIndex];
  }

  useEffect(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (!currentCard || typeof currentCard.text !== "string") {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }
    setDisplayedText("");
    setIsTyping(true);
    let characterIndex = 0;
    const fullText = currentCard.text;
    typingIntervalRef.current = setInterval(() => {
      const hasReachedEndOfText = characterIndex >= fullText.length;
      if (hasReachedEndOfText) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
        return;
      }
      const nextCharacter = fullText.charAt(characterIndex);
      setDisplayedText((previousText) => previousText + nextCharacter);
      characterIndex++;
    }, 20);
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [currentCard]);
  useEffect(() => {
    const first = drawCard();
    setCurrentCard(first);
  }, []);

  return {
    currentCard,
    displayedText,
    isTyping,
    drawCard,
    setCurrentCard,
  };
}