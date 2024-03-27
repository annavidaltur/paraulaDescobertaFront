import React, { useContext } from "react";
import { AppContext } from "../App";
import { formatDate } from "../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function GameOver() {
    const {gameOver, correctWord, correctWordClean, currAttempt, elapsedTime, board} = useContext(AppContext);

    const formatted = formatDate(elapsedTime)

    const generateMiniBoard = () => {
        let miniBoardText = "";
    
        for (let rowIndex = currAttempt.attempt - 1; rowIndex >= 0; rowIndex--) {
            const row = board[rowIndex];
            let rowText = "";
    
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                const letter = row[colIndex];
                const isCorrect = letter === correctWordClean[colIndex];
                const isAlmost = !isCorrect && correctWordClean.includes(letter);
                
                if (isCorrect) 
                    rowText += '🟢';
                else if (isAlmost)
                    rowText += '🟡';
                else 
                    rowText += '⚫';
            }
    
            miniBoardText = miniBoardText + rowText + '\n';
        }
    
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

    const shareOnFacebook = () => {
        let text = "";
        if(gameOver.guessedWord)
            text = `Acabe de resoldre la paraula secreta d'@encreuada en ${currAttempt.attempt} intents en ${formatted}! Prova'l tu també!\n${generateMiniBoard()}`;        
        else text = `He fallat després de ${currAttempt.attempt} intents en ${formatted}. Intenta-ho tu també!\n${generateMiniBoard()}`;
        
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const shareOnWhatsApp = () => {
        let text = "";
        if(gameOver.guessedWord)
            text = `Acabe de resoldre la paraula secreta d'@encreuada en ${currAttempt.attempt} intents en ${formatted}! Prova'l tu també!\n${generateMiniBoard()}`;        
        else text = `He fallat després de ${currAttempt.attempt} intents en ${formatted}. Intenta-ho tu també!\n${generateMiniBoard()}`;
        
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
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

                <h3>Comparteix el teu resultat!</h3>
                <div className="share-buttons-container">
                    <button onClick={shareOnTwitter} className="share-button">
                        <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '18px' }} /> 
                    </button>
                    <button onClick={shareOnFacebook} className="share-button">
                        <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '18px' }} />
                    </button>
                    <button onClick={shareOnWhatsApp} className="share-button">
                        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '18px' }} />
                    </button>
                </div>
        </div>
    )
}

export default GameOver;