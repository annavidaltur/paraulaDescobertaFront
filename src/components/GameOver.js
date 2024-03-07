import React, { useContext } from "react";
import { AppContext } from "../App";
import { formatDate } from "../utils/utils";

function GameOver() {
    const {gameOver, correctWord, currAttempt, elapsedTime} = useContext(AppContext);

    const formatted = formatDate(elapsedTime)

    return(
        <div className="gameOver">
            <h3>{gameOver.guessedWord ? "You correctly guessed" : "You failed"}</h3>
            <h1>Correct: {correctWord}</h1>
            <h1>{formatted}</h1>
            {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts and {formatted}</h3>)}
        </div>
    )
}

export default GameOver;