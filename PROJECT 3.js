import React, { useState } from 'react';
import './Game.css'; // Import the CSS file for styling

const Game = () => {
  const [player1Deck, setPlayer1Deck] = useState([1, 2, 3, 4]); // Player 1's deck
  const [player2Deck, setPlayer2Deck] = useState([5, 6, 7, 8]); // Player 2's deck
  const [player1Spaces, setPlayer1Spaces] = useState(Array(4).fill(null)); // Player 1's spaces
  const [player2Spaces, setPlayer2Spaces] = useState(Array(4).fill(null)); // Player 2's spaces
  const [selectedCard, setSelectedCard] = useState(null); // Currently selected card
  const [currentTurn, setCurrentTurn] = useState(1); // Current turn

  const handleCardSelection = (card) => {
    setSelectedCard(card);
  };

  const handleCardPlacement = (index) => {
    if (selectedCard) {
      if (currentTurn === 1 && !player1Spaces[index]) {
        const updatedSpaces = [...player1Spaces];
        updatedSpaces[index] = selectedCard;
        setPlayer1Spaces(updatedSpaces);
        setSelectedCard(null);
        switchTurn();
      } else if (currentTurn === 2 && !player2Spaces[index]) {
        const updatedSpaces = [...player2Spaces];
        updatedSpaces[index] = selectedCard;
        setPlayer2Spaces(updatedSpaces);
        setSelectedCard(null);
        switchTurn();
      }
    }
  };

  const switchTurn = () => {
    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };

  return (
    <div className="game">
      <div className="player-deck">
        <h3>Player 1</h3>
        {player1Deck.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCard === card ? 'selected' : ''}`}
            onClick={() => handleCardSelection(card)}
          >
            {card}
          </div>
        ))}
      </div>

      <div className="player-spaces">
        <div className="player1-spaces">
          {player1Spaces.map((card, index) => (
            <div
              key={index}
              className={`space ${!card && selectedCard ? 'droppable' : ''}`}
              onClick={() => handleCardPlacement(index)}
            >
              {card}
            </div>
          ))}
        </div>

        <div className="player2-spaces">
          {player2Spaces.map((card, index) => (
            <div
              key={index}
              className={`space ${!card && selectedCard ? 'droppable' : ''}`}
              onClick={() => handleCardPlacement(index)}
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      <div className="player-deck">
        <h3>Player 2</h3>
        {player2Deck.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCard === card ? 'selected' : ''}`}
            onClick={() => handleCardSelection(card)}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
