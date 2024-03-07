import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const {board, correctWord, currAttempt, disabledLetters, setDisabledLetters} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord[letterPos] === letter
    const almost = !correct && letter !== "" && correctWord.includes(letter)
    const letterState = currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
        // Deshabilitamos las letras del teclado que no sean correctas ni almost
        console.log("letter", letter)
        if(letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter])
        }
    }, [currAttempt.attempt]) // Se ejecuta con cada intento (fila completa+enter)
    
    return (
        <div className="letter" id={letterState}>
            {letter}
        </div>
    ) 
}

export default Letter;