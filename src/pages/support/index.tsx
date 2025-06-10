import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Gift, Star } from 'lucide-react';

const Support = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [moves, setMoves] = useState(0);

  const icons = [
    { id: 0, icon: <Coffee size={24} /> },
    { id: 1, icon: <Heart size={24} /> },
    { id: 2, icon: <Gift size={24} /> },
    { id: 3, icon: <Star size={24} /> }
  ];

  // Initialize game
  useEffect(() => {
    const shuffledCards = [...Array(8)].map((_, i) => i % 4);
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  }, []);

  // Check for matches
  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves(m => m + 1);

      if (cards[flipped[0]] === cards[flipped[1]]) {
        setMatched([...matched, ...flipped]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped, cards, matched]);

  // Check for game completion
  useEffect(() => {
    if (matched.length >= 4) { // At least 2 pairs matched
      setShowSupport(true);
    }
  }, [matched]);

  const handleClick = (index: number) => {
    if (!disabled && !flipped.includes(index) && !matched.includes(index)) {
      if (flipped.length === 0) {
        setFlipped([index]);
      } else if (flipped.length === 1) {
        setFlipped([...flipped, index]);
      }
    }
  };

  const resetGame = () => {
    const shuffledCards = [...Array(8)].map((_, i) => i % 4);
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setShowSupport(false);
    setDisabled(false);
  };

  return (
    <section id="support" className="py-16 bg-stone-900 text-stone-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Support My Work</h2>
          <p className="text-stone-300 mb-4">
            Match two pairs to unlock a support option! Your support helps me create more content.
          </p>
          <div className="flex justify-center gap-4 text-sm text-stone-400">
            <p>Moves: {moves}</p>
            <p>Matches: {matched.length / 2}</p>
            <button 
              onClick={resetGame}
              className="text-stone-300 hover:text-white transition-colors"
            >
              Reset Game
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`
                aspect-square rounded-lg cursor-pointer
                ${flipped.includes(index) || matched.includes(index) ? 'bg-stone-700' : 'bg-stone-800'}
                hover:bg-stone-700 transition-colors
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(index)}
            >
              <div className="w-full h-full flex items-center justify-center">
                {(flipped.includes(index) || matched.includes(index)) ? (
                  icons[card].icon
                ) : (
                  <span className="text-2xl">?</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {showSupport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-stone-800 p-6 rounded-lg max-w-2xl mx-auto text-center"
          >
            <h3 className="text-xl font-bold mb-4">🎉 Support Option Unlocked!</h3>
            <div className="flex justify-center">
              <a
                href="https://www.buymeacoffee.com/mutsvedutafara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FFDD00] text-stone-900 rounded-lg hover:bg-[#FFED4A] transition-colors"
              >
                <Coffee size={20} />
                Buy me a coffee
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Support;