import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const {board, correctWord, currAttempt, setDisabledLetters} = useContext(AppContext);
    const letter = board[attemptVal][letterPos]; // La letra de la celda actual

    // Obtenemos el estado de la letra: correcta, exista pero no en esa posición, no existe
    const correct = correctWord[letterPos] === letter
    const almost = !correct && letter !== "" && correctWord.includes(letter)
    const letterState = currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");
    
    // Para seleccionar la letra sobre el tablero
    const isCurrentCell = currAttempt.attempt === attemptVal && currAttempt.letterPos === letterPos;
    const cellClassName = isCurrentCell ? "current-cell" : "";

    useEffect(() => {
        // Deshabilitamos las letras del teclado que no sean correctas ni almost
        if(letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter])
        }
    }, [currAttempt.attempt]) // Se ejecuta con cada intento (fila completa+enter)
    
    return (
        <div className={`letter ${cellClassName}`} id={letterState}>
            {letter}
        </div>
    ) 
}

export default Letter;