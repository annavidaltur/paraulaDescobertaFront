import React, { useContext } from "react";
import { AppContext } from "../App";
import { formatDate } from "../utils/utils";

function GameOver() {
    const {gameOver, correctWord, currAttempt, elapsedTime, board} = useContext(AppContext);

    const formatted = formatDate(elapsedTime)

    const generateMiniBoard = () => {
        const reversedBoard = [...board].reverse();
        return reversedBoard.map((row, rowIndex) => (
            <div key={rowIndex} className="mini-row">
                {row.map((letter, colIndex) => {
                    const isCorrect = letter === correctWord[colIndex];
                    const isAlmost = !isCorrect && correctWord.includes(letter)
                    return (
                        <span key={colIndex} >
                            {isCorrect ? '🟢' : (isAlmost ? '🟡' : '⚫')}
                        </span>
                    );
                })}
            </div>
        ));
    };

    return(
        <div className="gameOver">
            <h1>Correct: {correctWord}</h1>
            <h1>{formatted}</h1>
            {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts and {formatted}</h3>)}
            
            <div className="mini-board">
                {generateMiniBoard()}
            </div>
        </div>
    )
}

export default GameOver;