import React, { useContext } from "react";
import { AppContext } from "../App";
import { formatDate } from "../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function GameOver() {
    const {gameOver, correctWord, currAttempt, elapsedTime, board} = useContext(AppContext);

    const formatted = formatDate(elapsedTime)

    const generateMiniBoard = () => {
        const reversedBoard = [...board].reverse();
        let miniBoardText = "";
    
        reversedBoard.forEach((row) => {
            row.forEach((letter, colIndex) => {
                const isCorrect = letter === correctWord[colIndex];
                const isAlmost = !isCorrect && correctWord.includes(letter);
                
                if (isCorrect) 
                    miniBoardText += '🟢';
                else if (isAlmost)
                    miniBoardText += '🟡';
                else miniBoardText += '⚫';
            });
    
            miniBoardText += '\n';
        });
    
        return miniBoardText;
    };
    
    const shareOnTwitter = () => {
        let text = "";
        if(gameOver.guessedWord)
            text = `Acabe de resoldre la paraula secreta d'@encreuada en ${currAttempt.attempt} intents en ${formatted}! Prova'l tu també!\n${generateMiniBoard()}`;        
        else text = `He fallat després de ${currAttempt.attempt} intents en ${formatted}. Intenta-ho tu també!\n${generateMiniBoard()}`;
        
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const miniBoardLines = generateMiniBoard().split('\n').map((line, index) => (
        <div key={index}>{line}</div>
    ));

    return(
        <div className="gameOver">
            <h1>Paraula correcta: {correctWord}</h1>
            {gameOver.guessedWord && (<h3>Ho has endevinat en {currAttempt.attempt} {currAttempt.attempt === 1 ? 'intent' : 'intents'} i {formatted}</h3>)}
            
                <div className="mini-board">
                    {miniBoardLines}
                </div>

            <button onClick={shareOnTwitter} className="round-button">
                <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '18px' }} /> 
            </button>
        </div>
    )
}

export default GameOver;